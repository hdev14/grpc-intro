import * as grpc from '@grpc/grpc-js';
import { RouteGuideService } from './dist/protobuffs/route_guide';
import routeGuideServer from './routeGuideServer';

const {
  HOST = '0.0.0.0',
  PORT = 50052,
} = process.env;

const server = new grpc.Server();

server.addService(RouteGuideService, routeGuideServer);

server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) throw error;
  
  server.start();
  
  console.info('Server is running on port', port);
})