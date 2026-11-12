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

# Configure useful Git aliases for learners (run as learner user)
RUN su - learner -c 'git config --global alias.st status' \
    && su - learner -c 'git config --global alias.co checkout' \
    && su - learner -c 'git config --global alias.br branch' \
    && su - learner -c 'git config --global alias.ci commit' \
    && su - learner -c 'git config --global alias.lg "log --oneline --graph --all --decorate"' \
    && su - learner -c 'git config --global alias.unstage "reset HEAD --"' \
    && su - learner -c 'git config --global alias.last "log -1 HEAD"' \
    && su - learner -c 'git config --global alias.visual "!gitk"' \
    && su - learner -c 'git config --global user.name "Learner"' \
    && su - learner -c 'git config --global user.email "learner@example.test"'

# Add comprehensive shell aliases from https://gist.github.com/filidorwiese/d228588ee8023c6fdfb24c85979172ab
COPY bashrc-aliases /tmp/bashrc-aliases
RUN cat /tmp/bashrc-aliases >> /home/learner/.bashrc && rm /tmp/bashrc-aliases

USER learner

EXPOSE 3000

CMD ["node", "server/src/server.js"]
