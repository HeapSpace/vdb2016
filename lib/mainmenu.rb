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
  "<li class=\"menu_item\"><a #{attributes} href=\"#{h path}\" class=\"item_link \" data-toggle=\"collapse\" data-target=\"#mainmenu\">#{text}</a></li>"
end

def links_for_submenu(submenu_array)
  allitems = ''
  submenu_array.each do |subitem|
    itemlink = '/'+subitem+'/'

    allitems += "<li class=\"menu_item\"><a href=\"#{itemlink}\" class=\"item_link\" data-toggle=\"collapse\" data-target=\"#mainmenu\">#{subitem.capitalize}</a></li>"
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
    itemtitle = itempath.capitalize
    itemclass = "active"
  else
    itemtitle = text
    itemclass = ""
  end

  if submenu.kind_of?(Array) && submenu.any?
    "<li class=\"menu_item\">
      <a href=\"#{target}\" class=\"item_link #{itemclass} dropdown-toggle\" data-toggle=\"dropdown\">#{itemtitle} <b class=\"caret\"></b></a>
      <ul class=\"dropdown-menu multi-level\">
          #{links_for_submenu(submenu)}
      </ul>
    </li>"
  else
    if @item_rep && @item_rep.path == path
      # Create message
      "<li class=\"menu_item active\">#{text}</li>"
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
