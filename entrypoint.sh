#!/bin/bash
set -e

export PATH="$(yarn global bin):$PATH"

# Entrypoint for docker container, basically works as a stand-in for
# bashrc stuff, setting up the env and then executes whatever command is passed
# to it
echo 'Hello from entrypoint.sh'

# NOTE: use exec to make sure that npm receives SIGTERM, etc.
exec "$@"
