FROM alpine:3.22

RUN apk add --no-cache bash ttyd

# Root is intentional so learners can practice installing Git and packages.
WORKDIR /workspace
COPY entrypoint.sh /usr/local/bin/playground-entrypoint
RUN chmod 755 /usr/local/bin/playground-entrypoint

EXPOSE 7681
ENTRYPOINT ["/usr/local/bin/playground-entrypoint"]
