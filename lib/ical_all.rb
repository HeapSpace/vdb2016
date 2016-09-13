require 'icalendar'
require 'pry'

class IcalAll < Nanoc::Filter
  identifier :ical_all
  def run(content, args = {})
    cal = Icalendar::Calendar.new
    args[:data].each do |a|
      # binding.pry
      if !a[:icaldate].to_s.empty? && !a[:start].to_s.empty? && !a[:end].to_s.empty? && (a[:speakers] != nil || a[:title] != nil)
        event = Icalendar::Event.new
        event.dtstart = Time.parse(a[:icaldate].to_s + ' ' + a[:start].to_s)
        event.dtend = Time.parse(a[:icaldate].to_s + ' ' + a[:end].to_s)
        event.summary = a[:speakers].to_s
        event.description = a[:title].to_s
        if a[:venue] != nil
          event.location = a[:venue]
        end
        cal.add_event(event)
      end
    end
    cal.publish
    cal.to_ical
  end
end
