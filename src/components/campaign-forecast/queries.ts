import Provider from "./provider";
import {
  QueryCampaignDataArgs,
  QueryResolvers,
} from "../../codegen/resolver-types";

interface IResolvers {
  campaignData: QueryResolvers["campaignData"];
}

const resolvers: IResolvers = {
  campaignData: (_, args: QueryCampaignDataArgs) => {
    const { sports, month, zipCode } = { ...args.option };
    const provider = new Provider();
    return provider.campaignData({
      sportsFilter: sports,
      monthFilter: month,
      zipCodeFilter: zipCode,
    });
  },
};

export default resolvers;
