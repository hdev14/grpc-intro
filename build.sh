#!/bin/bash
protoc --plugin=$(npm root)/.bin/protoc-gen-ts_proto \
  --ts_proto_out=src/dist \
  --ts_proto_opt=outputServices=grpc-js \
  --ts_proto_opt=esModuleInterop=true \
  --ts_proto_opt=importSuffix=.js \
  -I=src/ src/protobuffs/*.proto
