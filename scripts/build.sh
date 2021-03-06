#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

pushd $ROOT_DIR
./scripts/env.sh
popd
webpack --config $ROOT_DIR/webpack.config.js
sass $ROOT_DIR/src/app/styles/styles.scss:$ROOT_DIR/src/client/styles.css