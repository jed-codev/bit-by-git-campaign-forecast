/**
 * loading env variables in dev environment
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: `${__dirname}/../.env` });
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
// import resolvers
import { resolvers } from "./resolvers";
import { json } from "body-parser";
import { loadTypeDefs } from "./utils/helpers";

interface IServerContext {
  token?: string;
}

const app = async () => {
  const typeDefs = await loadTypeDefs();
  const app = express();
  const httpServer = http.createServer(app);
  // instantiate the apollo server
  const server = new ApolloServer<IServerContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  // Apply middleware after starting the server
  app.use(
    (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // allowed methods
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      ); // allowed headers
      res.setHeader("Access-Control-Allow-Credentials", "true");
      if (req.method === "OPTIONS") {
        res.sendStatus(200); // respond with 200 OK to preflight requests
      } else {
        next();
      }
    },
    json(),
    expressMiddleware(server)
  );
};
app();
