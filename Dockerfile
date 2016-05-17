FROM ruby:2.3.1

VOLUME ~/output

COPY . ~/
WORKDIR /~

RUN rm Gemfile.lock
RUN bundle install

CMD ["bundle exec nanoc -v"]