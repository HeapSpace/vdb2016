require 'erb'

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

#
# Usage:
#
#  <%= val :title %>
#
def val(key)
  value = @item[key] || @config[:site][key]
  '%s' % h(value) if value
end