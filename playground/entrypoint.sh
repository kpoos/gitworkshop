#!/bin/sh
set -eu

password="$(head -c 32 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | cut -c1-24)"
printf 'Git Workshop playground login\nUsername: git\nPassword: %s\n' "$password"
exec ttyd --writable --credential "git:$password" --port 7681 /bin/bash
