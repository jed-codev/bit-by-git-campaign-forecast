/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * loading env variables in dev enviroment
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: `${__dirname}/../../../.env` });
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, GraphQLSchema } from "graphql";
import { resolvers } from "../../resolvers";
import { loadTypeDefs } from "../../utils/helpers";

// jest.setTimeout(20000);

describe("Send Grid", () => {
  let schema: GraphQLSchema;

  it("should load the schema", async () => {
    const typeDefs = await loadTypeDefs();
    schema = makeExecutableSchema({ typeDefs, resolvers });
  });

  describe("sample", () => {
    it("should fetch sample", async () => {
      return true;
    });
  });
});
