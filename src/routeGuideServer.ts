import { status } from '@grpc/grpc-js';
import _ from 'lodash';
import db from './db.json';
import { RouteGuideServer, RouteNote } from './dist/protobuffs/route_guide';

const routeNotes: Record<string, RouteNote[]> = {};

const server: RouteGuideServer = {
  getFeature(call, callback) {
    const point = call.request;

    for (let idx = 0, length = db.length; idx < length; idx++) {
      const feature = db[idx];
      if (feature.location.latitude === point.latitude && feature.location.longitude === point.longitude) {
        return callback(null, feature);
      }
    }

    return callback(null, { name: '', location: point });
  },

  listFeatures(call) {
    const { lo, hi } = call.request;

    const left = _.min([lo?.longitude, hi?.longitude])!;
    const right = _.max([lo?.longitude, hi?.longitude])!;
    const top = _.max([lo?.latitude, hi?.latitude])!;
    const bottom = _.min([lo?.latitude, hi?.latitude])!;
    
    db.forEach((feature) => {
      if (feature.name === '') {
        return;
      }

      if (feature.location.longitude >= left
        && feature.location.longitude <= right
        && feature.location.latitude >= bottom
        && feature.location.latitude <= top) {
        call.write(feature);
      }
    })

    call.end();
  },

  recordRoute(_, callback) {
    return callback({ code: status.UNIMPLEMENTED });
  },

  routeChat(call) {
    call.on('data', (note: RouteNote) => {
      const key = `${note.location?.latitude} ${note.location?.longitude}`;

      if (routeNotes.hasOwnProperty(key)) {
        routeNotes[key].forEach((note) => {
          call.write(note);
        });
      } else {
        routeNotes[key] = [];
      }

      routeNotes[key].push(note);
    });
    
    call.on('end', () => {
      call.end();
    });
  },
}

export default server;
