/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientDuplexStream,
  ClientOptions,
  ClientReadableStream,
  ClientUnaryCall,
  ClientWritableStream,
  handleBidiStreamingCall,
  handleClientStreamingCall,
  handleServerStreamingCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "";

export interface Point {
  latitude: number;
  longitude: number;
}

export interface Feature {
  name: string;
  location: Point | undefined;
}

export interface Rectangle {
  lo: Point | undefined;
  hi: Point | undefined;
}

export interface RouteSummary {
  pointCount: number;
  featureCount: number;
  distance: number;
  elapsedTime: number;
}

export interface RouteNote {
  location: Point | undefined;
  message: string;
}

function createBasePoint(): Point {
  return { latitude: 0, longitude: 0 };
}

export const Point = {
  encode(message: Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.latitude !== 0) {
      writer.uint32(8).int32(message.latitude);
    }
    if (message.longitude !== 0) {
      writer.uint32(16).int32(message.longitude);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Point {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.latitude = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.longitude = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Point {
    return {
      latitude: isSet(object.latitude) ? Number(object.latitude) : 0,
      longitude: isSet(object.longitude) ? Number(object.longitude) : 0,
    };
  },

  toJSON(message: Point): unknown {
    const obj: any = {};
    message.latitude !== undefined && (obj.latitude = Math.round(message.latitude));
    message.longitude !== undefined && (obj.longitude = Math.round(message.longitude));
    return obj;
  },

  create<I extends Exact<DeepPartial<Point>, I>>(base?: I): Point {
    return Point.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Point>, I>>(object: I): Point {
    const message = createBasePoint();
    message.latitude = object.latitude ?? 0;
    message.longitude = object.longitude ?? 0;
    return message;
  },
};

function createBaseFeature(): Feature {
  return { name: "", location: undefined };
}

export const Feature = {
  encode(message: Feature, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.location !== undefined) {
      Point.encode(message.location, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Feature {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.location = Point.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Feature {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      location: isSet(object.location) ? Point.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: Feature): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.location !== undefined && (obj.location = message.location ? Point.toJSON(message.location) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Feature>, I>>(base?: I): Feature {
    return Feature.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Feature>, I>>(object: I): Feature {
    const message = createBaseFeature();
    message.name = object.name ?? "";
    message.location = (object.location !== undefined && object.location !== null)
      ? Point.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseRectangle(): Rectangle {
  return { lo: undefined, hi: undefined };
}

export const Rectangle = {
  encode(message: Rectangle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lo !== undefined) {
      Point.encode(message.lo, writer.uint32(10).fork()).ldelim();
    }
    if (message.hi !== undefined) {
      Point.encode(message.hi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rectangle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRectangle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lo = Point.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hi = Point.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Rectangle {
    return {
      lo: isSet(object.lo) ? Point.fromJSON(object.lo) : undefined,
      hi: isSet(object.hi) ? Point.fromJSON(object.hi) : undefined,
    };
  },

  toJSON(message: Rectangle): unknown {
    const obj: any = {};
    message.lo !== undefined && (obj.lo = message.lo ? Point.toJSON(message.lo) : undefined);
    message.hi !== undefined && (obj.hi = message.hi ? Point.toJSON(message.hi) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Rectangle>, I>>(base?: I): Rectangle {
    return Rectangle.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Rectangle>, I>>(object: I): Rectangle {
    const message = createBaseRectangle();
    message.lo = (object.lo !== undefined && object.lo !== null) ? Point.fromPartial(object.lo) : undefined;
    message.hi = (object.hi !== undefined && object.hi !== null) ? Point.fromPartial(object.hi) : undefined;
    return message;
  },
};

function createBaseRouteSummary(): RouteSummary {
  return { pointCount: 0, featureCount: 0, distance: 0, elapsedTime: 0 };
}

export const RouteSummary = {
  encode(message: RouteSummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pointCount !== 0) {
      writer.uint32(8).int32(message.pointCount);
    }
    if (message.featureCount !== 0) {
      writer.uint32(16).int32(message.featureCount);
    }
    if (message.distance !== 0) {
      writer.uint32(24).int32(message.distance);
    }
    if (message.elapsedTime !== 0) {
      writer.uint32(32).int32(message.elapsedTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RouteSummary {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouteSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pointCount = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.featureCount = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.distance = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.elapsedTime = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RouteSummary {
    return {
      pointCount: isSet(object.pointCount) ? Number(object.pointCount) : 0,
      featureCount: isSet(object.featureCount) ? Number(object.featureCount) : 0,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
      elapsedTime: isSet(object.elapsedTime) ? Number(object.elapsedTime) : 0,
    };
  },

  toJSON(message: RouteSummary): unknown {
    const obj: any = {};
    message.pointCount !== undefined && (obj.pointCount = Math.round(message.pointCount));
    message.featureCount !== undefined && (obj.featureCount = Math.round(message.featureCount));
    message.distance !== undefined && (obj.distance = Math.round(message.distance));
    message.elapsedTime !== undefined && (obj.elapsedTime = Math.round(message.elapsedTime));
    return obj;
  },

  create<I extends Exact<DeepPartial<RouteSummary>, I>>(base?: I): RouteSummary {
    return RouteSummary.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RouteSummary>, I>>(object: I): RouteSummary {
    const message = createBaseRouteSummary();
    message.pointCount = object.pointCount ?? 0;
    message.featureCount = object.featureCount ?? 0;
    message.distance = object.distance ?? 0;
    message.elapsedTime = object.elapsedTime ?? 0;
    return message;
  },
};

function createBaseRouteNote(): RouteNote {
  return { location: undefined, message: "" };
}

export const RouteNote = {
  encode(message: RouteNote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      Point.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RouteNote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouteNote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.location = Point.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RouteNote {
    return {
      location: isSet(object.location) ? Point.fromJSON(object.location) : undefined,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: RouteNote): unknown {
    const obj: any = {};
    message.location !== undefined && (obj.location = message.location ? Point.toJSON(message.location) : undefined);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<RouteNote>, I>>(base?: I): RouteNote {
    return RouteNote.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RouteNote>, I>>(object: I): RouteNote {
    const message = createBaseRouteNote();
    message.location = (object.location !== undefined && object.location !== null)
      ? Point.fromPartial(object.location)
      : undefined;
    message.message = object.message ?? "";
    return message;
  },
};

export type RouteGuideService = typeof RouteGuideService;
export const RouteGuideService = {
  getFeature: {
    path: "/RouteGuide/GetFeature",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Point) => Buffer.from(Point.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Point.decode(value),
    responseSerialize: (value: Feature) => Buffer.from(Feature.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Feature.decode(value),
  },
  listFeatures: {
    path: "/RouteGuide/ListFeatures",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: Rectangle) => Buffer.from(Rectangle.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Rectangle.decode(value),
    responseSerialize: (value: Feature) => Buffer.from(Feature.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Feature.decode(value),
  },
  recordRoute: {
    path: "/RouteGuide/RecordRoute",
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: Point) => Buffer.from(Point.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Point.decode(value),
    responseSerialize: (value: RouteSummary) => Buffer.from(RouteSummary.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RouteSummary.decode(value),
  },
  routeChat: {
    path: "/RouteGuide/RouteChat",
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: RouteNote) => Buffer.from(RouteNote.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RouteNote.decode(value),
    responseSerialize: (value: RouteNote) => Buffer.from(RouteNote.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RouteNote.decode(value),
  },
} as const;

export interface RouteGuideServer extends UntypedServiceImplementation {
  getFeature: handleUnaryCall<Point, Feature>;
  listFeatures: handleServerStreamingCall<Rectangle, Feature>;
  recordRoute: handleClientStreamingCall<Point, RouteSummary>;
  routeChat: handleBidiStreamingCall<RouteNote, RouteNote>;
}

export interface RouteGuideClient extends Client {
  getFeature(request: Point, callback: (error: ServiceError | null, response: Feature) => void): ClientUnaryCall;
  getFeature(
    request: Point,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Feature) => void,
  ): ClientUnaryCall;
  getFeature(
    request: Point,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Feature) => void,
  ): ClientUnaryCall;
  listFeatures(request: Rectangle, options?: Partial<CallOptions>): ClientReadableStream<Feature>;
  listFeatures(request: Rectangle, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<Feature>;
  recordRoute(callback: (error: ServiceError | null, response: RouteSummary) => void): ClientWritableStream<Point>;
  recordRoute(
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RouteSummary) => void,
  ): ClientWritableStream<Point>;
  recordRoute(
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RouteSummary) => void,
  ): ClientWritableStream<Point>;
  recordRoute(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RouteSummary) => void,
  ): ClientWritableStream<Point>;
  routeChat(): ClientDuplexStream<RouteNote, RouteNote>;
  routeChat(options: Partial<CallOptions>): ClientDuplexStream<RouteNote, RouteNote>;
  routeChat(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<RouteNote, RouteNote>;
}

export const RouteGuideClient = makeGenericClientConstructor(RouteGuideService, "RouteGuide") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): RouteGuideClient;
  service: typeof RouteGuideService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
