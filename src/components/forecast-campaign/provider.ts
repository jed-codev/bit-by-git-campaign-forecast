import { PrismaClient } from "@prisma/client";
import zipState from "zip-state";
import { IForecastData } from "../../codegen/resolver-types";

export interface ICampaignDataOptions {
  sportsFilter?: string;
  zipCodeFilter?: string;
}

export default class ForecastCampaign {
  public async forecastCampaignData(options: ICampaignDataOptions) {
    const { sportsFilter, zipCodeFilter } = options;
    const prisma = new PrismaClient();

    const data = <IForecastData[]>(
      await prisma.$queryRaw`select sum(fundraisers.net_raised_cents) as total_net_raised_cents, 
      sum(fundraisers.team_size) as total_team_size, fundraisers.created_at, groups.activity, addresses.zip 
      from fundraisers 
      LEFT JOIN groups ON groups.id = fundraisers.group_id 
      LEFT JOIN fundraiser_addresses ON fundraiser_addresses.fundraiser_id  = fundraisers.id
      LEFT JOIN addresses ON addresses.id = fundraiser_addresses.address_id 
      WHERE fundraisers.created_at  between "2021-01-01" and "2022-12-31" and fundraisers.net_raised_cents > 0 
      and activity in ("football", "band", "baseball", "basketball", "robotics") 
      group by year(fundraisers.created_at), month(fundraisers.created_at), addresses.zip, groups.activity; `
    );

    const forecastData = data
      .filter(
        (result) =>
          zipState(result.zip as string) === zipState(zipCodeFilter as string)
      )
      .filter((result) => result.activity === sportsFilter)
      .map((result) => {
        const date = new Date(result.created_at as string);
        const year = date.getFullYear().toString();
        const month = date.toLocaleString("default", { month: "long" });
        const state = zipState(result.zip as string);

        return { ...result, year, month, state };
      });
    return forecastData;
  }
}
