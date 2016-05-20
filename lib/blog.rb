require 'erb'
require 'date'

include Nanoc::Helpers::Blogging
include Nanoc::Helpers::LinkTo

def grouped_articles
  sorted_articles.group_by do |a|
    [ Time.parse(a[:created_at]).year, Time.parse(a[:created_at]).month ]
  end.sort.reverse
end
