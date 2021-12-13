#!/bin/bash

GREEN='\033[0;32m'
NC="\033[0m" # No Color

echo "🔨 Building game!!"
lix lime build html5 -debug --connect 8000
# osascript is Mac specific
osascript -e 'display notification "🎉 Build finished!!!" with title "HaxeFlixel"'
echo "${GREEN}🎉 Buidling finished!!!${NC}"
