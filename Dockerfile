# Git Workshop — single container holding the web UI and the execution
# environment. The Node server serves the frontend and runs every terminal
# command as a real process inside this image.
FROM node:20-alpine

# Bash and real git for the in-container terminal.
RUN apk add --no-cache bash git \
    && mkdir -p /opt/git-workshop/bin \
    && printf '%s\n' \
        '#!/bin/sh' \
        '/usr/bin/git "$@"' \
        'status=$?' \
        'if [ "${GIT_WORKSHOP_GIT_LOG_FD:-}" = "3" ]; then printf "git\000%s\000" "$status" >&3; fi' \
        'exit "$status"' \
        > /opt/git-workshop/bin/git \
    && printf '%s\n' \
        '#!/bin/sh' \
        'if [ "$#" -eq 2 ] && [ "$1" = "--" ]; then shift; fi' \
        'if [ "$#" -ne 1 ] || [ "${1#-}" != "$1" ]; then echo "Usage: vi [--] <file> (one repository file at a time)" >&2; exit 2; fi' \
        'if [ "${GIT_WORKSHOP_GIT_LOG_FD:-}" != "3" ]; then echo "vi is available in the Git Workshop terminal editor." >&2; exit 2; fi' \
        'case "$1" in /*) file="$1" ;; *) file="$PWD/$1" ;; esac' \
        'printf "editor\000%s\000" "$file" >&3' \
        > /opt/git-workshop/bin/vi \
    && chmod 755 /opt/git-workshop/bin/git /opt/git-workshop/bin/vi \
    && ln -s vi /opt/git-workshop/bin/vim

WORKDIR /app

COPY server/package.json ./server/package.json
COPY server/src ./server/src
COPY shared ./shared
COPY index.html style.css app.js ./

ENV NODE_ENV=production \
    PORT=3000 \
    GIT_WORKSHOP_WORKSPACE=/workspace

# Present the runtime account as "learner" (same uid) so shell prompts and
# `whoami` inside the container read naturally.
RUN sed -i 's/^node:/learner:/; s|/home/node|/home/learner|' /etc/passwd \
    && sed -i 's/^node:/learner:/' /etc/group \
    && if [ -d /home/node ]; then mv /home/node /home/learner; fi \
    && mkdir -p /workspace \
    && chown -R learner:learner /workspace /app

USER learner

EXPOSE 3000

CMD ["node", "server/src/server.js"]
