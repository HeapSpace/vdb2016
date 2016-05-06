require 'htmlcompressor'

class HtmlCompressorFilter < Nanoc::Filter
  identifier :htmlcompressor

  def run(content, params = {})
    compressor = HtmlCompressor::Compressor.new
    compressor.compress(content)
  end
end