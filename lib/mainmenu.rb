include Nanoc::Helpers::LinkTo

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
def link_menu(text, target, attributes = {})
  # Find path
  path = target.is_a?(String) ? target : target.path

  # Join attributes
  attributes = attributes.reduce('') do |memo, (key, value)|
    memo + key.to_s + '="' + h(value) + '" '
  end

  # Create link
  "<li><a #{attributes} href=\"#{h path}\" data-toggle=\"collapse\" data-target=\"#mainmenu\">#{text}</a></li>"
end

def links_for_submenu(submenu_array)
  allitems = ''
  submenu_array.each do |subitem|
    subtitle = subitem.gsub('-', ' ')
    itemlink = '/'+subitem+'/'

    allitems += "<li><a href=\"#{itemlink}\" data-toggle=\"collapse\" data-target=\"#mainmenu\">#{subtitle.slice(0,1).capitalize + subtitle.slice(1..-1)}</a></li>"
  end
  return allitems
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
def link_to_unless_current(text, target, submenu = [], attributes = {})
  # Find path

  path = target.is_a?(String) ? target : target.path
  itempath = @item_rep.path.to_s.delete('/')

  if submenu.include?(itempath)
    itemtitle = itempath.slice(0,1).capitalize + itempath.slice(1..-1)
    itemtitle = itemtitle.gsub('-', ' ')
    itemclass = "active"
  else
    itemtitle = text
    itemclass = ""
  end

  if submenu.kind_of?(Array) && submenu.any?
    "<li class=\"has-sub #{itemclass}\">
      <a href=\"#{target}\">#{itemtitle}</a>
      <ul>
          #{links_for_submenu(submenu)}
      </ul>
    </li>"
  else
    if @item_rep && @item_rep.path == path
      # Create message
      "<li class=\"active\"><a href=\"#\">#{text}</a></li>"
    else

      link_menu(text, target, attributes)
    end
  end
end

def logo_unless_page(target)
  # Find path
  path = target.is_a?(String) ? target : target.path

  if @item_rep && '.'+@item_rep.path != path
    # Create message
    "<li role=\"presentation\" class=\"main-menu-logo\"><img class=\"\" src=\"/images/home-logo.png\"></li>"
  end
end
