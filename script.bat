echo "Starting development..."
START /B truffle migrate --reset
START /B truffle develop
START npm run serve
START ipfs daemon