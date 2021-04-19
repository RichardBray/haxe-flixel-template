#!/bin/bash

GREEN='\033[0;32m'
NC="\033[0m" # No Color

echo "🔨 Building game!!"
lix lime build html5 -debug --connect 7000
# osascript is Mac specific
osascript -e 'display notification "🎉 Build finished!!!" with title "HaxeFlixel" sound name "Ping"'
echo "${GREEN}🎉 Buidling finished!!!${NC}"
