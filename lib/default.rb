require 'erb'
require 'yaml'

include Nanoc::Helpers::LinkTo
include Nanoc::Helpers::Rendering
include Nanoc::Helpers::XMLSitemap

include ERB::Util

# Output a meta-tag for use in your site header. The key you supply is looked
# up in the configuration under 'meta_data'. You can override it on a per-item
# basis.
#
# Usage:
#
#   <%= meta_tag :keywords %>
#
# This will output:
#
#   <meta name="keywords" value="...">
#
# Here, '...' is either the value of @item[:keywords] or that of
# @config[:keywords].
def meta_tag(key)
  value = @item[key] || @config[:site][key]
  '<meta name="%s" content="%s">' % [h(key), h(value)] if value
end

# Output a share meta-tags. Method expects title, description and image params.
# If params are not passed, values are looked up in site configuration
#
# Usage:
#
#  <%= meta_share %>
#
#   or
#
#  <%= meta_share <article_value>, <description_value>, <image_value> %>
#
def meta_share(title = nil, description = nil, image = nil)
    title = title || @item[:meta_title] || @config[:site][:meta_title]
    description = description || @item[:meta_description] || @config[:site][:meta_description]
    image = image || @item[:meta_image] || @config[:site][:meta_image]

    "<meta property='og:locale' content='en_US' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content='#{title}' />
    <meta property='og:description' content='#{description}' />
    <meta property='og:url' content='#{@config[:site][:base_url]}' />
    <meta property='og:site_name' content='#{@config[:site][:name]}' />
    <meta property='og:image' content='#{image}' />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content='#{title}' />
    <meta name='twitter:description' content='#{description}' />
    <meta name='twitter:site' content='@voxxedbelgrade' />
    <meta name='twitter:image' content='#{image}' />
    <meta name='twitter:creator' content='@voxxedbelgrade' />
    <meta name='viewport' content='width=device-width; initial-scale = 1.0; maximum-scale=1.0; user-scalable=no' />

"
end

#
# Usage:
#
#  <%= val :title %>
#
def val(key)
  value = @item[key] || @config[:site][key]
  '%s' % h(value) if value
end

# Creates a HTML link to the given path or item representation, and with
# the given text. All attributes of the `a` element, including the `href`
# attribute, will be HTML-escaped; the contents of the `a` element, which
# can contain markup, will not be HTML-escaped. The HTML-escaping is done
# using {Nanoc::Helpers::HTMLEscape#html_escape}.
#
# @param [String] text The visible link text
#
# @param [String, Nanoc::Int::Item, Nanoc::Int::ItemRep] target The path/URL,
#   item or item representation that should be linked to
#
# @param [Hash] attributes A hash containing HTML attributes (e.g.
#   `rel`, `title`, …) that will be added to the link.
#
# @return [String] The link text
#
# @example Linking to a path
#
#   link_to('Blog', '/blog/')
#   # => '<a href="/blog/">Blog</a>'
#
# @example Linking to an item
#
#   about = @items.find { |i| i.identifier == '/about/' }
#   link_to('About Me', about)
#   # => '<a href="/about.html">About Me</a>'
#
# @example Linking to an item representation
#
#   about = @items.find { |i| i.identifier == '/about/' }
#   link_to('My vCard', about.rep(:vcard))
#   # => '<a href="/about.vcf">My vCard</a>'
#
# @example Linking with custom attributes
#
#   link_to('Blog', '/blog/', :title => 'My super cool blog')
#   # => '<a title="My super cool blog" href="/blog/">Blog</a>'
def link_to(text, target, attributes = {})
  # Find path
  path =
    case target
    when String
      target
    when Nanoc::ItemWithRepsView, Nanoc::ItemWithoutRepsView, Nanoc::ItemRepView
      raise "Cannot create a link to #{target.inspect} because this target is not outputted (its routing rule returns nil)" if target.path.nil?
      target.path
    else
      raise ArgumentError, "Cannot link to #{target.inspect} (expected a string or an item, not a #{target.class.name})"
    end

  # Join attributes
  attributes = attributes.reduce('') do |memo, (key, value)|
    memo + key.to_s + '="' + h(value) + '" '
  end

  # Create link
  "<li role=\"presentation\" class=\"main-menu-item\"><a #{attributes} href=\"#{h path}\">#{text}</a></li>"
end

# Creates a HTML link using {#link_to}, except when the linked item is
# the current one. In this case, a span element with class “active” and
# with the given text will be returned. The HTML-escaping rules for
# {#link_to} apply here as well.
#
# @param [String] text The visible link text
#
# @param [String, Nanoc::Int::Item, Nanoc::Int::ItemRep] target The path/URL,
#   item or item representation that should be linked to
#
# @param [Hash] attributes A hash containing HTML attributes (e.g.
#   `rel`, `title`, …) that will be added to the link.
#
# @return [String] The link text
#
# @example Linking to a different page
#
#   link_to_unless_current('Blog', '/blog/')
#   # => '<a href="/blog/">Blog</a>'
#
# @example Linking to the same page
#
#   link_to_unless_current('This Item', @item)
#   # => '<span class="active">This Item</span>'

def get_schedule_data(day = nil, track = nil)

  schedule_raw = YAML.load_file('content/index.md')
  schedule_talks = schedule_raw["talks"]
  schedule_speakers = schedule_raw["speakers"]
  schedule_data = []

  schedule_talks.each do |talk|
    if !talk['tid'].to_s.empty?
      talk['talkspeakers'] = []
      if talk['sid'].kind_of?(Array)
        talk['sid'].each do |t|
          speaker = schedule_speakers.select{ |item| item['sid'] == t.to_i }
          talk['talkspeakers'] << speaker
        end
      else
        speaker = schedule_speakers.select{ |item| item['sid'] == talk['sid'] }
        talk['talkspeakers'] << speaker
      end
    end
    if (day && track)
        if (!talk["day"].to_s.empty? && talk["day"] == day && !talk["track"].to_s.empty? && talk["track"] == track)
          schedule_data << talk
        end
    end
  end

  schedule = schedule_data.sort_by { |k| k["slot"] }

  return schedule

end

def loadspeakersandtalks()
  speakersandtalks = YAML.load_file('content/index.md')
  return speakersandtalks
end

def get_featured_speakers(companies)

  featured_raw = YAML.load_file('content/index.md')
  featured_items = featured_raw["speakers"]

  featured_data = featured_items.select { |v| companies.include? v["company"]  }

  return featured_data

end
