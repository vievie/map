#@IgnoreInspection BashAddShebang
FROM mhart/alpine-node

MAINTAINER Franz Josef Kaiser <wecodemore@gmail.com>

ARG APP
ENV APP ${APP:-/usr/src/app}

ARG SERVER
ENV SERVER ${SERVER:-/usr/src/server}

WORKDIR "${APP}"

RUN npm --force install

EXPOSE 3000

CMD