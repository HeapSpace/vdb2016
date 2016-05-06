require 'Nokogiri'

class MdLinks < Nanoc::Filter
  identifier :md_links
  def run(content, args = {})
  	page = Nokogiri::HTML(content)
  	change = false

  	page.css("a").each{|link|
  		href = link['href']
  		if href.end_with? ".md"
  			href = href[0..-3] + "html"
  			link['href'] = href
  			change = true
  		end
  	}

  	if change == true
		  page.to_s
    else
		  content
    end
  end
end