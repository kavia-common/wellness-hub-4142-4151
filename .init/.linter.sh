#!/bin/bash
cd /home/kavia/workspace/code-generation/wellness-hub-4142-4151/wellness_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

