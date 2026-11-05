# Git Workshop — single container holding the web UI and the execution
# environment. The Node server serves the frontend and runs every terminal
# command as a real process inside this image.
FROM node:20-alpine

# Real git for the in-container terminal
RUN apk add --no-cache git

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
