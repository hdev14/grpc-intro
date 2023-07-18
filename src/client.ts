import { credentials } from "@grpc/grpc-js";
import { Feature, Point, Rectangle, RouteGuideClient, RouteNote } from "./dist/protobuffs/route_guide";

const {
  HOST = '0.0.0.0',
  PORT = 50052
} = process.env;

const routeGuide = new RouteGuideClient(`${HOST}:${PORT}`, credentials.createInsecure());

const COORD_FACTOR = 1e7;

const point = Point.create({ latitude: 409146138, longitude: -746188906 });

function printFeature(feature: Feature) {
  console.log(`
    Found feature called "${feature.name}" 
    at ${feature.location?.latitude! / COORD_FACTOR}, ${feature.location?.longitude! / COORD_FACTOR} \n
  `);
}

routeGuide.getFeature(point, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }

  printFeature(response);
});

const rectangle = Rectangle.create({
  lo: {
    latitude: 400000000,
    longitude: -750000000
  },
  hi: {
    latitude: 420000000,
    longitude: -730000000
  }
});

const call = routeGuide.listFeatures(rectangle);

call.on('data', (feature: Feature) => {
  printFeature(feature);
});

call.on('end', () => {
  console.info('Server ends the connection...');
});

call.on('error', (error) => {
  console.error('Error occurred in the server', error);
});

call.on('status', (status) => {
  console.info('Server status', status);
});




const duplexCall = routeGuide.routeChat();

const note = RouteNote.create({
  message: 'Test',
  location: {
    latitude: 144444,
    longitude: 155555,
  }
});


let count = 0;

duplexCall.on('data', (note: RouteNote) => {
  console.info(`${count} Server info: `, note);
  count++;
});

duplexCall.on('error', (error) => {
  console.error(error);
});

duplexCall.on('status', (status) => {
  console.info(status);
});

duplexCall.on('end', () => {
  console.info('server ending...');
});

duplexCall.write(note); // 1
duplexCall.write(note); // 2 

duplexCall.end();



