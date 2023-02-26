import Provider from "./provider";
import {
  QueryForecastCampaignDataArgs,
  QueryResolvers,
} from "../../codegen/resolver-types";

interface IResolvers {
  forecastCampaignData: QueryResolvers["forecastCampaignData"];
}

const resolvers: IResolvers = {
  forecastCampaignData: (_, args: QueryForecastCampaignDataArgs) => {
    const { sports, zipCode } = { ...args.option };
    const provider = new Provider();
    return provider.forecastCampaignData({
      sportsFilter: sports,
      zipCodeFilter: zipCode,
    });
  },
};

export default resolvers;
