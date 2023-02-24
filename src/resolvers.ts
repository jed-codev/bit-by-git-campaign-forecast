import sampleQueries from "./components/sample/queries";
import sampleMutations from "./components/sample/mutations";
import campaignForecastQueries from "./components/campaign-forecast/queries";
import activities from "./components/activities/queries";

import type { Resolvers } from "./codegen/resolver-types";

export const resolvers: Resolvers = {
  Query: {
    ...sampleQueries,
    ...campaignForecastQueries,
    ...activities,
  },
  Mutation: {
    ...sampleMutations,
  },
};
