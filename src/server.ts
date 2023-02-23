/**
 * loading env variables in dev enviroment
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: `${__dirname}/../.env` });
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import customResponse, { ICustomErrorCodes } from "./utils/responses";

// import resolvers
import { resolvers } from "./resolvers";

import { loadTypeDefs } from "./utils/helpers";

interface IServerContext {
  token?: string;
}

const app = async () => {
  const typeDefs = await loadTypeDefs();

  // instantiate the apollo server
  const server = new ApolloServer<IServerContext>({
    typeDefs,
    resolvers,
  });

  // start the graphql server
  await startStandaloneServer(server, {
    context: async ({ req }) => {
      const bearer = req.headers.authorization;
      const token = bearer?.split("Bearer ")[1];
      if (process.env.SECRET_KEY !== token) {
        throw customResponse(
          ICustomErrorCodes.UNAUTHORIZED,
          401,
          "request is unauthorized"
        );
      }
      return { token };
    },
    listen: { port: parseInt(process.env.PORT || "4000") },
  });

  // dev
  // console.log(`🚀  Server ready at ${url}`);
};

app();
