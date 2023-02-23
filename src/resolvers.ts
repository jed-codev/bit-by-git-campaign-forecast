import sampleQueries from "./components/sample/queries";
import sampleMutations from "./components/sample/mutations";
import type { Resolvers } from "./codegen/resolver-types";

export const resolvers: Resolvers = {
  Query: {
    ...sampleQueries,
  },
  Mutation: {
    ...sampleMutations,
  },
};
