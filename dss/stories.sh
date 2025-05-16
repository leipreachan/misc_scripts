#!/bin/bash

function handler() 
{
  echo "Run npx nx reset"
  npx nx reset
  exit 0
}

if [ -z "$1" ]; then
echo "Please specify the DSS kit name as first argument"
exit 1

else
	DSS_KIT_NAME=$1
fi
KITTENS_NODE=$(kittens status | jq -r '.kits[] | select(.name == "'$DSS_KIT_NAME'") | .nodes[]')

if [ -z "$KITTENS_NODE" ]; then
	echo "We can't get status of kittens node $DSS_KIT_NAME - $KITTENS_NODE"
	echo ""
	echo " kittens status | jq -r '.kits[] | select(.name == "'"'$DSS_KIT_NAME'"'") | .nodes[]'" 
	exit 1
fi

function get_param() {
    param="$1"
    echo $KITTENS_NODE | jq -r 'select(.type == "design") ."'$param'"'
}

export PUPPETEER_EXECUTABLE_PATH='/Applications/Chromium.app/Contents/MacOS/Chromium'

export DATAIKU_DSS_URL="http://localhost:$(get_param 'port')"
export DIP_HOME=$(get_param "data-dir")
export DKU_STORY_PORT=8087

cd ~/workspace/story

echo "Run npx nx reset"
npx nx reset

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
echo "DATAIKU_DSS_URL=$DATAIKU_DSS_URL"
echo "DIP_HOME=$DIP_HOME"
echo "DKU_STORY_PORT=$DKU_STORY_PORT"

trap 'handler' SIGINT

echo "Run npm start api api-v2 ui"
npm start api api-v2 ui | tee $DIP_HOME/run/stories/backend.log
