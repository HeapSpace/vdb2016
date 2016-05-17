FROM ruby:2.3.1

VOLUME root/output

COPY . /root/
WORKDIR /root

ENV LANG C.UTF-8

RUN rm Gemfile.lock
RUN bundle install
