require 'erb'
require 'date'

include Nanoc::Helpers::Blogging
include Nanoc::Helpers::LinkTo
include Nanoc::Helpers::Text

def grouped_articles
  sorted_articles.group_by do |a|
    [ Time.parse(a[:created_at]).year, Time.parse(a[:created_at]).month ]
  end.sort.reverse
end

def blog_post(article, target, attributes = {})
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

  text = article[:title]
  image = article[:image]

  colors = ['red', 'blue', 'green']
  # Create link
  "<a class=\"blog_link\" href=\"#{h path}\">#{text}
  <br>
  <div class=\"blog_thumb\" style=\"background-image: url(./#{image})\" alt=\"#{text}\"></div>
  <div class=\"excerpt\">" + article[:excerpt].to_s + "</div></a>"
end


def blog_image(article)

  text = article[:title]
  image = article[:image]

  # Create link
  "<img class=\"blog_image\" src=\"../#{image}\" alt=\"#{text}\" />"

end
