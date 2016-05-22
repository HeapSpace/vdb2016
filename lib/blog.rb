require 'erb'
require 'date'

include Nanoc::Helpers::Blogging
include Nanoc::Helpers::LinkTo

def grouped_articles
  sorted_articles.group_by do |a|
    [ Time.parse(a[:created_at]).year, Time.parse(a[:created_at]).month ]
  end.sort.reverse
end

def link_blog(text, target, attributes = {})
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
  "<a #{attributes} href=\"#{h path}\">#{text}</a>"
end
