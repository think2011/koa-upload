FROM       daocloud.io/library/node:6.0
MAINTAINER think2011 <452125301.hzplay@gmail.com>

ENV TZ "Asia/Shanghai"
ENV PORT 1991

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm i

EXPOSE 1991

CMD npm run start
