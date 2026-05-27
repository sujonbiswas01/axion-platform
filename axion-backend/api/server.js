// src/app.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String     @id @default(uuid())\n  name          String\n  email         String     @unique\n  role          Role       @default(USER)\n  status        UserStatus @default(ACTIVE)\n  phone         String?\n  image         String\n  isDeleted     Boolean    @default(false)\n  deletedAt     DateTime?\n  bgimage       String?    @default("https://images.pexels.com/photos/4303031/pexels-photo-4303031.jpeg")\n  isActive      Boolean    @default(false)\n  emailVerified Boolean    @default(false)\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum Role {\n  USER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  BLOCKED\n  DELETED\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"phone","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"bgimage","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","_count","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","Role","role","UserStatus","status","phone","image","isDeleted","deletedAt","bgimage","isActive","emailVerified","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany"]'),
  graph: "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_ACANUAEAAAABVEAAAAABVUAAAAABYQEAAAABYgEAAAABYwEAAAABZAEAAAABZQEAAAABZgEAAAABZ0AAAAABaEAAAAABaQEAAAABagEAAAABAQwAAEEAMAEMAABBADAOAwAAnQEAIFABAJUBACFUQACWAQAhVUAAlgEAIWEBAJUBACFiAQCVAQAhYwEAlQEAIWQBAJsBACFlAQCbAQAhZgEAmwEAIWdAAJwBACFoQACcAQAhaQEAmwEAIWoBAJsBACECAAAACQAgDAAARAAgDVABAJUBACFUQACWAQAhVUAAlgEAIWEBAJUBACFiAQCVAQAhYwEAlQEAIWQBAJsBACFlAQCbAQAhZgEAmwEAIWdAAJwBACFoQACcAQAhaQEAmwEAIWoBAJsBACECAAAABwAgDAAARgAgAgAAAAcAIAwAAEYAIAMAAAAJACATAAA_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_AQAwTgAAwAEAEE8AAL8BADBQAQByACFTQABzACFUQABzACFVQABzACFjAQByACFrAQByACFsAQCKAQAhbQEAigEAIQtNAAC_AQAwTgAAwAEAEE8AAL8BADBQAQByACFTQABzACFUQABzACFVQABzACFjAQByACFrAQByACFsAQCKAQAhbQEAigEAIQdQAQCVAQAhU0AAlgEAIVRAAJYBACFVQACWAQAhawEAlQEAIWwBAJsBACFtAQCbAQAhB1ABAJUBACFTQACWAQAhVEAAlgEAIVVAAJYBACFrAQCVAQAhbAEAmwEAIW0BAJsBACEHUAEAAAABU0AAAAABVEAAAAABVUAAAAABawEAAAABbAEAAAABbQEAAAABBBMAALgBADCAAQAAuQEAMIIBAAC7AQAghgEAALwBADAEEwAArAEAMIABAACtAQAwggEAAK8BACCGAQAAsAEAMAAABQQAAMYBACAFAADHAQAgdAAAlwEAIHcAAJcBACB4AACXAQAgB1ABAAAAAVNAAAAAAVRAAAAAAVVAAAAAAWsBAAAAAWwBAAAAAW0BAAAAAQxQAQAAAAFUQAAAAAFVQAAAAAFhAQAAAAFiAQAAAAFkAQAAAAFlAQAAAAFmAQAAAAFnQAAAAAFoQAAAAAFpAQAAAAFqAQAAAAEPBQAAxQEAIFABAAAAAVRAAAAAAVVAAAAAAW4BAAAAAW8BAAAAAXEAAABxAnMAAABzAnQBAAAAAXUBAAAAAXYgAAAAAXdAAAAAAXgBAAAAAXkgAAAAAXogAAAAAQIAAAABACATAADLAQAgAwAAAA4AIBMAAMsBACAUAADPAQAgEQAAAA4AIAUAAKsBACAMAADPAQAgUAEAlQEAIVRAAJYBACFVQACWAQAhbgEAlQEAIW8BAJUBACFxAACnAXEicwAAqAFzInQBAJsBACF1AQCVAQAhdiAAqQEAIXdAAJwBACF4AQCbAQAheSAAqQEAIXogAKkBACEPBQAAqwEAIFABAJUBACFUQACWAQAhVUAAlgEAIW4BAJUBACFvAQCVAQAhcQAApwFxInMAAKgBcyJ0AQCbAQAhdQEAlQEAIXYgAKkBACF3QACcAQAheAEAmwEAIXkgAKkBACF6IACpAQAhDwQAAMQBACBQAQAAAAFUQAAAAAFVQAAAAAFuAQAAAAFvAQAAAAFxAAAAcQJzAAAAcwJ0AQAAAAF1AQAAAAF2IAAAAAF3QAAAAAF4AQAAAAF5IAAAAAF6IAAAAAECAAAAAQAgEwAA0AEAIAMAAAAOACATAADQAQAgFAAA1AEAIBEAAAAOACAEAACqAQAgDAAA1AEAIFABAJUBACFUQACWAQAhVUAAlgEAIW4BAJUBACFvAQCVAQAhcQAApwFxInMAAKgBcyJ0AQCbAQAhdQEAlQEAIXYgAKkBACF3QACcAQAheAEAmwEAIXkgAKkBACF6IACpAQAhDwQAAKoBACBQAQCVAQAhVEAAlgEAIVVAAJYBACFuAQCVAQAhbwEAlQEAIXEAAKcBcSJzAACoAXMidAEAmwEAIXUBAJUBACF2IACpAQAhd0AAnAEAIXgBAJsBACF5IACpAQAheiAAqQEAIQMEBgIFCgMGAAQBAwABAQMAAQIECwAFDAAAAAADBgAJGQAKGgALAAAAAwYACRkAChoACwEDAAEBAwABAwYAEBkAERoAEgAAAAMGABAZABEaABIBAwABAQMAAQMGABcZABgaABkAAAADBgAXGQAYGgAZAAAAAwYAHxkAIBoAIQAAAAMGAB8ZACAaACEHAgEIDQEJEAEKEQELEgENFAEOFgUPFwYQGQERGwUSHAcVHQEWHgEXHwUbIggcIwwdJAIeJQIfJgIgJwIhKAIiKgIjLAUkLQ0lLwImMQUnMg4oMwIpNAIqNQUrOA8sORMtOgMuOwMvPAMwPQMxPgMyQAMzQgU0QxQ1RQM2RwU3SBU4SQM5SgM6SwU7ThY8Txo9URs-Uhs_VRtAVhtBVxtCWRtDWwVEXBxFXhtGYAVHYR1IYhtJYxtKZAVLZx5MaCI"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  USER: "USER",
  ADMIN: "ADMIN"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/lib/auth.ts
import { bearer, emailOTP, oAuthProxy } from "better-auth/plugins";

// src/app/config/env.ts
import dotenv from "dotenv";

// node_modules/.pnpm/http-status@2.1.0/node_modules/http-status/dist/chunk-CUNVWAK5.js
var e = { "1xx": "Informational", "1xx_NAME": "INFORMATIONAL", "1xx_MESSAGE": "Indicates an interim response for communicating connection status or request progress prior to completing the requested action and sending a final response.", INFORMATIONAL: "1xx", "2xx": "Successful", "2xx_NAME": "SUCCESSFUL", "2xx_MESSAGE": "Indicates that the client's request was successfully received, understood, and accepted.", SUCCESSFUL: "2xx", "3xx": "Redirection", "3xx_NAME": "REDIRECTION", "3xx_MESSAGE": "Indicates that further action needs to be taken by the user agent in order to fulfill the request.", REDIRECTION: "3xx", "4xx": "Client Error", "4xx_NAME": "CLIENT_ERROR", "4xx_MESSAGE": "Indicates that the client seems to have erred.", CLIENT_ERROR: "4xx", "5xx": "Server Error", "5xx_NAME": "SERVER_ERROR", "5xx_MESSAGE": "Indicates that the server is aware that it has erred or is incapable of performing the requested method.", SERVER_ERROR: "5xx" };
var t = { classes: e, 100: "Continue", "100_NAME": "CONTINUE", "100_MESSAGE": "The server has received the request headers and the client should proceed to send the request body.", "100_CLASS": e.INFORMATIONAL, CONTINUE: 100, 101: "Switching Protocols", "101_NAME": "SWITCHING_PROTOCOLS", "101_MESSAGE": "The requester has asked the server to switch protocols and the server has agreed to do so.", "101_CLASS": e.INFORMATIONAL, SWITCHING_PROTOCOLS: 101, 102: "Processing", "102_NAME": "PROCESSING", "102_MESSAGE": "A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet.[7] This prevents the client from timing out and assuming the request was lost.", "102_CLASS": e.INFORMATIONAL, PROCESSING: 102, 103: "Early Hints", "103_NAME": "EARLY_HINTS", "103_MESSAGE": "Used to return some response headers before final HTTP message.", "103_CLASS": e.INFORMATIONAL, EARLY_HINTS: 103, 200: "OK", "200_NAME": "OK", "200_MESSAGE": "Standard response for successful HTTP requests.", "200_CLASS": e.SUCCESSFUL, OK: 200, 201: "Created", "201_NAME": "CREATED", "201_MESSAGE": "The request has been fulfilled, resulting in the creation of a new resource.", "201_CLASS": e.SUCCESSFUL, CREATED: 201, 202: "Accepted", "202_NAME": "ACCEPTED", "202_MESSAGE": "The request has been accepted for processing, but the processing has not been completed.", "202_CLASS": e.SUCCESSFUL, ACCEPTED: 202, 203: "Non-Authoritative Information", "203_NAME": "NON_AUTHORITATIVE_INFORMATION", "203_MESSAGE": "The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response.", "203_CLASS": e.SUCCESSFUL, NON_AUTHORITATIVE_INFORMATION: 203, 204: "No Content", "204_NAME": "NO_CONTENT", "204_MESSAGE": "The server successfully processed the request and is not returning any content.", "204_CLASS": e.SUCCESSFUL, NO_CONTENT: 204, 205: "Reset Content", "205_NAME": "RESET_CONTENT", "205_MESSAGE": "The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.", "205_CLASS": e.SUCCESSFUL, RESET_CONTENT: 205, 206: "Partial Content", "206_NAME": "PARTIAL_CONTENT", "206_MESSAGE": "The server is delivering only part of the resource (byte serving) due to a range header sent by the client.", "206_CLASS": e.SUCCESSFUL, PARTIAL_CONTENT: 206, 207: "Multi Status", "207_NAME": "MULTI_STATUS", "207_MESSAGE": "The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.", "207_CLASS": e.SUCCESSFUL, MULTI_STATUS: 207, 208: "Already Reported", "208_NAME": "ALREADY_REPORTED", "208_MESSAGE": "The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.", "208_CLASS": e.SUCCESSFUL, ALREADY_REPORTED: 208, 226: "IM Used", "226_NAME": "IM_USED", "226_MESSAGE": "The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.", "226_CLASS": e.SUCCESSFUL, IM_USED: 226, 300: "Multiple Choices", "300_NAME": "MULTIPLE_CHOICES", "300_MESSAGE": "Indicates multiple options for the resource from which the client may choose.", "300_CLASS": e.REDIRECTION, MULTIPLE_CHOICES: 300, 301: "Moved Permanently", "301_NAME": "MOVED_PERMANENTLY", "301_MESSAGE": "This and all future requests should be directed to the given URI.", "301_CLASS": e.REDIRECTION, MOVED_PERMANENTLY: 301, 302: "Found", "302_NAME": "FOUND", "302_MESSAGE": 'This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours.', "302_CLASS": e.REDIRECTION, FOUND: 302, 303: "See Other", "303_NAME": "SEE_OTHER", "303_MESSAGE": "The response to the request can be found under another URI using the GET method.", "303_CLASS": e.REDIRECTION, SEE_OTHER: 303, 304: "Not Modified", "304_NAME": "NOT_MODIFIED", "304_MESSAGE": "Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.", "304_CLASS": e.REDIRECTION, NOT_MODIFIED: 304, 305: "Use Proxy", "305_NAME": "USE_PROXY", "305_MESSAGE": "The requested resource is available only through a proxy, the address for which is provided in the response.", "305_CLASS": e.REDIRECTION, USE_PROXY: 305, 306: "Switch Proxy", "306_NAME": "SWITCH_PROXY", "306_MESSAGE": 'No longer used. Originally meant "Subsequent requests should use the specified proxy.', "306_CLASS": e.REDIRECTION, SWITCH_PROXY: 306, 307: "Temporary Redirect", "307_NAME": "TEMPORARY_REDIRECT", "307_MESSAGE": "In this case, the request should be repeated with another URI; however, future requests should still use the original URI.", "307_CLASS": e.REDIRECTION, TEMPORARY_REDIRECT: 307, 308: "Permanent Redirect", "308_NAME": "PERMANENT_REDIRECT", "308_MESSAGE": "The request and all future requests should be repeated using another URI.", "308_CLASS": e.REDIRECTION, PERMANENT_REDIRECT: 308, 400: "Bad Request", "400_NAME": "BAD_REQUEST", "400_MESSAGE": "The server cannot or will not process the request due to an apparent client error.", "400_CLASS": e.CLIENT_ERROR, BAD_REQUEST: 400, 401: "Unauthorized", "401_NAME": "UNAUTHORIZED", "401_MESSAGE": "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.", "401_CLASS": e.CLIENT_ERROR, UNAUTHORIZED: 401, 402: "Payment Required", "402_NAME": "PAYMENT_REQUIRED", "402_MESSAGE": "Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed for example by GNU Taler, but that has not yet happened, and this code is not usually used.", "402_CLASS": e.CLIENT_ERROR, PAYMENT_REQUIRED: 402, 403: "Forbidden", "403_NAME": "FORBIDDEN", "403_MESSAGE": "The request was valid, but the server is refusing action.", "403_CLASS": e.CLIENT_ERROR, FORBIDDEN: 403, 404: "Not Found", "404_NAME": "NOT_FOUND", "404_MESSAGE": "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.", "404_CLASS": e.CLIENT_ERROR, NOT_FOUND: 404, 405: "Method Not Allowed", "405_NAME": "METHOD_NOT_ALLOWED", "405_MESSAGE": "A request method is not supported for the requested resource.", "405_CLASS": e.CLIENT_ERROR, METHOD_NOT_ALLOWED: 405, 406: "Not Acceptable", "406_NAME": "NOT_ACCEPTABLE", "406_MESSAGE": "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.", "406_CLASS": e.CLIENT_ERROR, NOT_ACCEPTABLE: 406, 407: "Proxy Authentication Required", "407_NAME": "PROXY_AUTHENTICATION_REQUIRED", "407_MESSAGE": "The client must first authenticate itself with the proxy.", "407_CLASS": e.CLIENT_ERROR, PROXY_AUTHENTICATION_REQUIRED: 407, 408: "Request Time-out", "408_NAME": "REQUEST_TIMEOUT", "408_MESSAGE": "The server timed out waiting for the request.", "408_CLASS": e.CLIENT_ERROR, REQUEST_TIMEOUT: 408, 409: "Conflict", "409_NAME": "CONFLICT", "409_MESSAGE": "Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.", "409_CLASS": e.CLIENT_ERROR, CONFLICT: 409, 410: "Gone", "410_NAME": "GONE", "410_MESSAGE": "Indicates that the resource requested is no longer available and will not be available again.", "410_CLASS": e.CLIENT_ERROR, GONE: 410, 411: "Length Required", "411_NAME": "LENGTH_REQUIRED", "411_MESSAGE": "The request did not specify the length of its content, which is required by the requested resource.", "411_CLASS": e.CLIENT_ERROR, LENGTH_REQUIRED: 411, 412: "Precondition Failed", "412_NAME": "PRECONDITION_FAILED", "412_MESSAGE": "The server does not meet one of the preconditions that the requester put on the request.", "412_CLASS": e.CLIENT_ERROR, PRECONDITION_FAILED: 412, 413: "Request Entity Too Large", "413_NAME": "REQUEST_ENTITY_TOO_LARGE", "413_MESSAGE": 'The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".', "413_CLASS": e.CLIENT_ERROR, REQUEST_ENTITY_TOO_LARGE: 413, 414: "Request-URI Too Large", "414_NAME": "REQUEST_URI_TOO_LONG", "414_MESSAGE": "The URI provided was too long for the server to process.", "414_CLASS": e.CLIENT_ERROR, REQUEST_URI_TOO_LONG: 414, 415: "Unsupported Media Type", "415_NAME": "UNSUPPORTED_MEDIA_TYPE", "415_MESSAGE": "The request entity has a media type which the server or resource does not support.", "415_CLASS": e.CLIENT_ERROR, UNSUPPORTED_MEDIA_TYPE: 415, 416: "Requested Range not Satisfiable", "416_NAME": "REQUESTED_RANGE_NOT_SATISFIABLE", "416_MESSAGE": "The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.", "416_CLASS": e.CLIENT_ERROR, REQUESTED_RANGE_NOT_SATISFIABLE: 416, 417: "Expectation Failed", "417_NAME": "EXPECTATION_FAILED", "417_MESSAGE": "The server cannot meet the requirements of the Expect request-header field.", "417_CLASS": e.CLIENT_ERROR, EXPECTATION_FAILED: 417, 418: "I'm a teapot", "418_NAME": "IM_A_TEAPOT", "418_MESSAGE": `Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.`, "418_CLASS": e.CLIENT_ERROR, IM_A_TEAPOT: 418, 421: "Misdirected Request", "421_NAME": "MISDIRECTED_REQUEST", "421_MESSAGE": "The request was directed at a server that is not able to produce a response.", "421_CLASS": e.CLIENT_ERROR, MISDIRECTED_REQUEST: 421, 422: "Unprocessable Entity", "422_NAME": "UNPROCESSABLE_ENTITY", "422_MESSAGE": "The request was well-formed but was unable to be followed due to semantic errors.", "422_CLASS": e.CLIENT_ERROR, UNPROCESSABLE_ENTITY: 422, 423: "Locked", "423_NAME": "LOCKED", "423_MESSAGE": "The resource that is being accessed is locked.", "423_CLASS": e.CLIENT_ERROR, LOCKED: 423, 424: "Failed Dependency", "424_NAME": "FAILED_DEPENDENCY", "424_MESSAGE": "The request failed because it depended on another request and that request failed.", "424_CLASS": e.CLIENT_ERROR, FAILED_DEPENDENCY: 424, 425: "Too Early", "425_NAME": "TOO_EARLY", "425_MESSAGE": "The server is unwilling to risk processing a request that might be replayed.", "425_CLASS": e.CLIENT_ERROR, TOO_EARLY: 425, 426: "Upgrade Required", "426_NAME": "UPGRADE_REQUIRED", "426_MESSAGE": "The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.", "426_CLASS": e.CLIENT_ERROR, UPGRADE_REQUIRED: 426, 428: "Precondition Required", "428_NAME": "PRECONDITION_REQUIRED", "428_MESSAGE": "The origin server requires the request to be conditional.", "428_CLASS": e.CLIENT_ERROR, PRECONDITION_REQUIRED: 428, 429: "Too Many Requests", "429_NAME": "TOO_MANY_REQUESTS", "429_MESSAGE": "The user has sent too many requests in a given amount of time.", "429_CLASS": e.CLIENT_ERROR, TOO_MANY_REQUESTS: 429, 431: "Request Header Fields Too Large", "431_NAME": "REQUEST_HEADER_FIELDS_TOO_LARGE", "431_MESSAGE": "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.", "431_CLASS": e.CLIENT_ERROR, REQUEST_HEADER_FIELDS_TOO_LARGE: 431, 451: "Unavailable For Legal Reasons", "451_NAME": "UNAVAILABLE_FOR_LEGAL_REASONS", "451_MESSAGE": "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.", "451_CLASS": e.CLIENT_ERROR, UNAVAILABLE_FOR_LEGAL_REASONS: 451, 500: "Internal Server Error", "500_NAME": "INTERNAL_SERVER_ERROR", "500_MESSAGE": "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.", "500_CLASS": e.SERVER_ERROR, INTERNAL_SERVER_ERROR: 500, 501: "Not Implemented", "501_NAME": "NOT_IMPLEMENTED", "501_MESSAGE": "The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability.", "501_CLASS": e.SERVER_ERROR, NOT_IMPLEMENTED: 501, 502: "Bad Gateway", "502_NAME": "BAD_GATEWAY", "502_MESSAGE": "The server was acting as a gateway or proxy and received an invalid response from the upstream server.", "502_CLASS": e.SERVER_ERROR, BAD_GATEWAY: 502, 503: "Service Unavailable", "503_NAME": "SERVICE_UNAVAILABLE", "503_MESSAGE": "The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.", "503_CLASS": e.SERVER_ERROR, SERVICE_UNAVAILABLE: 503, 504: "Gateway Time-out", "504_NAME": "GATEWAY_TIMEOUT", "504_MESSAGE": "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.", "504_CLASS": e.SERVER_ERROR, GATEWAY_TIMEOUT: 504, 505: "HTTP Version not Supported", "505_NAME": "HTTP_VERSION_NOT_SUPPORTED", "505_MESSAGE": "The server does not support the HTTP protocol version used in the request.", "505_CLASS": e.SERVER_ERROR, HTTP_VERSION_NOT_SUPPORTED: 505, 506: "Variant Also Negotiates", "506_NAME": "VARIANT_ALSO_NEGOTIATES", "506_MESSAGE": "Transparent content negotiation for the request results in a circular reference.", "506_CLASS": e.SERVER_ERROR, VARIANT_ALSO_NEGOTIATES: 506, 507: "Insufficient Storage", "507_NAME": "INSUFFICIENT_STORAGE", "507_MESSAGE": "The server is unable to store the representation needed to complete the request.", "507_CLASS": e.SERVER_ERROR, INSUFFICIENT_STORAGE: 507, 508: "Loop Detected", "508_NAME": "LOOP_DETECTED", "508_MESSAGE": "The server detected an infinite loop while processing the request.", "508_CLASS": e.SERVER_ERROR, LOOP_DETECTED: 508, 510: "Not Extended", "510_NAME": "NOT_EXTENDED", "510_MESSAGE": "Further extensions to the request are required for the server to fulfil it.", "510_CLASS": e.SERVER_ERROR, NOT_EXTENDED: 510, 511: "Network Authentication Required", "511_NAME": "NETWORK_AUTHENTICATION_REQUIRED", "511_MESSAGE": "The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network.", "511_CLASS": e.SERVER_ERROR, NETWORK_AUTHENTICATION_REQUIRED: 511, extra: { unofficial: { 103: "Checkpoint", "103_NAME": "CHECKPOINT", "103_MESSAGE": "Used in the resumable requests proposal to resume aborted PUT or POST requests.", "103_CLASS": e.INFORMATIONAL, CHECKPOINT: 103, 419: "Page Expired", "419_NAME": "PAGE_EXPIRED", "419_MESSAGE": "Used by the Laravel Framework when a CSRF Token is missing or expired.", "419_CLASS": e.CLIENT_ERROR, PAGE_EXPIRED: 419, 218: "This is fine", "218_NAME": "THIS_IS_FINE", "218_MESSAGE": "Used as a catch-all error condition for allowing response bodies to flow through Apache when ProxyErrorOverride is enabled. When ProxyErrorOverride is enabled in Apache, response bodies that contain a status code of 4xx or 5xx are automatically discarded by Apache in favor of a generic response or a custom response specified by the ErrorDocument directive.", "218_CLASS": e.SUCCESSFUL, THIS_IS_FINE: 218, 420: "Enhance Your Calm", "420_NAME": "ENHANCE_YOUR_CALM", "420_MESSAGE": "Returned by version 1 of the Twitter Search and Trends API when the client is being rate limited; versions 1.1 and later use the 429 Too Many Requests response code instead.", "420_CLASS": e.CLIENT_ERROR, ENHANCE_YOUR_CALM: 420, 450: "Blocked by Windows Parental Controls", "450_NAME": "BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS", "450_MESSAGE": "The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.", "450_CLASS": e.CLIENT_ERROR, BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS: 450, 498: "Invalid Token", "498_NAME": "INVALID_TOKEN", "498_MESSAGE": "Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.", "498_CLASS": e.CLIENT_ERROR, INVALID_TOKEN: 498, 499: "Token Required", "499_NAME": "TOKEN_REQUIRED", "499_MESSAGE": "Returned by ArcGIS for Server. Code 499 indicates that a token is required but was not submitted.", "499_CLASS": e.CLIENT_ERROR, TOKEN_REQUIRED: 499, 509: "Bandwidth Limit Exceeded", "509_NAME": "BANDWIDTH_LIMIT_EXCEEDED", "509_MESSAGE": "The server has exceeded the bandwidth specified by the server administrator.", "509_CLASS": e.SERVER_ERROR, BANDWIDTH_LIMIT_EXCEEDED: 509, 530: "Site is frozen", "530_NAME": "SITE_IS_FROZEN", "530_MESSAGE": "Used by the Pantheon web platform to indicate a site that has been frozen due to inactivity.", "530_CLASS": e.SERVER_ERROR, SITE_IS_FROZEN: 530, 598: "Network read timeout error", "598_NAME": "NETWORK_READ_TIMEOUT_ERROR", "598_MESSAGE": "Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.", "598_CLASS": e.SERVER_ERROR, NETWORK_READ_TIMEOUT_ERROR: 598 }, iis: { 440: "Login Time-out", "440_NAME": "LOGIN_TIME_OUT", "440_MESSAGE": "The client's session has expired and must log in again.", "440_CLASS": e.CLIENT_ERROR, LOGIN_TIME_OUT: 440, 449: "Retry With", "449_NAME": "RETRY_WITH", "449_MESSAGE": "The server cannot honour the request because the user has not provided the required information.", "449_CLASS": e.CLIENT_ERROR, RETRY_WITH: 449, 451: "Redirect", "451_NAME": "REDIRECT", "451_MESSAGE": "Used in Exchange ActiveSync when either a more efficient server is available or the server cannot access the users' mailbox.", "451_CLASS": e.CLIENT_ERROR, REDIRECT: 451 }, nginx: { 444: "No Response", "444_NAME": "NO_RESPONSE", "444_MESSAGE": "Used internally to instruct the server to return no information to the client and close the connection immediately.", "444_CLASS": e.CLIENT_ERROR, NO_RESPONSE: 444, 494: "Request header too large", "494_NAME": "REQUEST_HEADER_TOO_LARGE", "494_MESSAGE": "Client sent too large request or too long header line.", "494_CLASS": e.CLIENT_ERROR, REQUEST_HEADER_TOO_LARGE: 494, 495: "SSL Certificate Error", "495_NAME": "SSL_CERTIFICATE_ERROR", "495_MESSAGE": "An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.", "495_CLASS": e.CLIENT_ERROR, SSL_CERTIFICATE_ERROR: 495, 496: "SSL Certificate Required", "496_NAME": "SSL_CERTIFICATE_REQUIRED", "496_MESSAGE": "An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.", "496_CLASS": e.CLIENT_ERROR, SSL_CERTIFICATE_REQUIRED: 496, 497: "HTTP Request Sent to HTTPS Port", "497_NAME": "HTTP_REQUEST_SENT_TO_HTTPS_PORT", "497_MESSAGE": "An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.", "497_CLASS": e.CLIENT_ERROR, HTTP_REQUEST_SENT_TO_HTTPS_PORT: 497, 499: "Client Closed Request", "499_NAME": "CLIENT_CLOSED_REQUEST", "499_MESSAGE": "Used when the client has closed the request before the server could send a response.", "499_CLASS": e.CLIENT_ERROR, CLIENT_CLOSED_REQUEST: 499 }, cloudflare: { 520: "Unknown Error", "520_NAME": "UNKNOWN_ERROR", "520_MESSAGE": 'The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.', "520_CLASS": e.SERVER_ERROR, UNKNOWN_ERROR: 520, 521: "Web Server Is Down", "521_NAME": "WEB_SERVER_IS_DOWN", "521_MESSAGE": "The origin server has refused the connection from Cloudflare.", "521_CLASS": e.SERVER_ERROR, WEB_SERVER_IS_DOWN: 521, 522: "Connection Timed Out", "522_NAME": "CONNECTION_TIMED_OUT", "522_MESSAGE": "Cloudflare could not negotiate a TCP handshake with the origin server.", "522_CLASS": e.SERVER_ERROR, CONNECTION_TIMED_OUT: 522, 523: "Origin Is Unreachable", "523_NAME": "ORIGIN_IS_UNREACHABLE", "523_MESSAGE": "Cloudflare could not reach the origin server.", "523_CLASS": e.SERVER_ERROR, ORIGIN_IS_UNREACHABLE: 523, 524: "A Timeout Occurred", "524_NAME": "A_TIMEOUT_OCCURRED", "524_MESSAGE": "Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.", "524_CLASS": e.SERVER_ERROR, A_TIMEOUT_OCCURRED: 524, 525: "SSL Handshake Failed", "525_NAME": "SSL_HANDSHAKE_FAILED", "525_MESSAGE": "Cloudflare could not negotiate a SSL/TLS handshake with the origin server.", "525_CLASS": e.SERVER_ERROR, SSL_HANDSHAKE_FAILED: 525, 526: "Invalid SSL Certificate", "526_NAME": "INVALID_SSL_CERTIFICATE", "526_MESSAGE": "Cloudflare could not validate the SSL/TLS certificate that the origin server presented.", "526_CLASS": e.SERVER_ERROR, INVALID_SSL_CERTIFICATE: 526, 527: "Railgun Error", "527_NAME": "RAILGUN_ERROR", "527_MESSAGE": "Error 527 indicates that the request timed out or failed after the WAN connection had been established.", "527_CLASS": e.SERVER_ERROR, RAILGUN_ERROR: 527 } } };
var E = t;

// src/app/errorHelper/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/app/config/env.ts
dotenv.config();
var loadEnvVariables = () => {
  const requireEnvVariable = [
    "NODE_ENV",
    "PORT",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "FRONTEND_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "Email",
    "Password",
    "SENTRY_DSN"
  ];
  requireEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new AppError_default(
        E.INTERNAL_SERVER_ERROR,
        `Server configuration error: The required environment variable "${variable}" is not set. Verify your .env file or deployment environment settings.`
      );
    }
  });
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    EMAIL_SENDER: {
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM
    },
    STRIPE: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
    },
    FRONTEND_URL: process.env.FRONTEND_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    },
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    Email: process.env.Email,
    Password: process.env.Password,
    SENTRY_DSN: process.env.SENTRY_DSN
  };
};
var envVars = loadEnvVariables();

// src/app/lib/auth.ts
var auth = betterAuth({
  secret: envVars.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: `${envVars.FRONTEND_URL}`,
  trustedOrigins: [envVars.FRONTEND_URL],
  appName: "axion",
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.USER
      },
      emailVerified: {
        type: "boolean",
        returned: true,
        defaultValue: true
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: ""
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  plugins: [
    oAuthProxy(),
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (user?.role === "ADMIN") {
            await prisma.user.update({
              where: {
                email
              },
              data: {
                emailVerified: true
              }
            });
          }
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
        }
      },
      expiresIn: 10 * 60,
      otpLength: 6,
      resendStrategy: "rotate"
    })
  ],
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent",
      redirectURI: `${envVars.FRONTEND_URL}/api/auth/callback/google`,
      mapProfileToUser: () => {
        return {
          role: Role.USER,
          status: UserStatus.ACTIVE,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null
        };
      }
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    strategy: "jwt"
  },
  advanced: {
    // disableCSRFCheck: true,
    useSecureCookies: false,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      },
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      }
    }
  },
  redirectURLs: {
    signin: `${envVars.BETTER_AUTH_URL}`
  }
});

// src/app.ts
import path2 from "path";
import pinoHttp from "pino-http";

// src/app/lib/pino.ts
import { pino } from "pino";
var logger = pino({
  level: envVars.NODE_ENV === "production" ? "info" : "debug"
  // transport:envVars.NODE_ENV==="production"?undefined:{
  //           target: "pino-pretty",
  //         options: { colorize: true }
  // }
});

// src/app/lib/sentry.ts
import * as Sentry from "@sentry/browser";
function initSentry() {
  Sentry.init({
    dsn: envVars.SENTRY_DSN,
    tracesSampleRate: 1,
    environment: envVars.NODE_ENV || "development"
  });
  return Sentry;
}
var initsentry = initSentry;

// src/app.ts
var app = express();
app.use("/api/auth/:path*", toNodeHandler(auth));
app.set("view engine", "ejs");
app.set("views", path2.resolve(process.cwd(), `src/app/templates`));
app.use(express.urlencoded({ extended: true }));
app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      method: req.method,
      url: req.url,
      ip: req.ip,
      userId: req.user?.id || "guest"
    })
  })
);
initsentry();
app.use(express.json());
app.use("/", (req, res) => {
  res.status(200).json({ success: true, message: "home route" });
});
var app_default = app;

// src/server.ts
var server;
var port = 5e3;
var bootstrap = async () => {
  try {
    server = app_default.listen(envVars.PORT, () => {
      console.info("Server started on port 5000");
      console.info(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error({ error }, "Failed to start server");
  }
};
process.on("uncaughtException", (error) => {
  console.error({ error }, "Uncaught exception detected, shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("unhandledRejection", (error) => {
  console.error({ error }, "Unhandled rejection detected, shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
process.on("SIGTERM", (error) => {
  console.warn({ error }, "SIGTERM detected, shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
bootstrap();
