import { PrismaClient } from "@prisma/client";
import zipState from "zip-state";

export interface ICampaignData {
  total_net_raised_cents: number;
  total_team_size: number;
  created_at: string;
  activity: string;
  zip: string;
}

export interface ICampaignDataOptions {
  sportsFilter?: string;
  monthFilter?: string;
  zipCodeFilter?: string;
}

export default class CampaignForecast {
  public async campaignData(options: ICampaignDataOptions) {
    const { sportsFilter, monthFilter, zipCodeFilter } = options;
    const prisma = new PrismaClient();

    const data = <ICampaignData[]>(
      await prisma.$queryRaw`select sum(fundraisers.net_raised_cents) as total_net_raised_cents, 
      sum(fundraisers.team_size) as total_team_size, fundraisers.created_at, groups.activity, addresses.zip 
      from fundraisers 
      LEFT JOIN groups ON groups.id = fundraisers.group_id 
      LEFT JOIN fundraiser_addresses ON fundraiser_addresses.fundraiser_id  = fundraisers.id
      LEFT JOIN addresses ON addresses.id = fundraiser_addresses.address_id 
      WHERE fundraisers.created_at  between "2021-01-01" and "2022-12-31" and fundraisers.net_raised_cents > 0 
      group by year(fundraisers.created_at), month(fundraisers.created_at), addresses.zip, groups.activity;`
    );

    const result: any = {};

    for (const i in data) {
      const item = data[i];
      const date = new Date(item.created_at);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });
      const state = zipState(item.zip);

      if (
        monthFilter &&
        month.toLocaleLowerCase() !== monthFilter?.toLocaleLowerCase()
      ) {
        continue;
      }
      if (
        sportsFilter &&
        item.activity.toLocaleLowerCase() !== sportsFilter?.toLocaleLowerCase()
      ) {
        continue;
      }
      if (zipCodeFilter && item.zip !== zipCodeFilter) {
        continue;
      }
      if (!state || !item.zip) {
        continue;
      }

      if (!Object.keys(result).includes(`${year}`)) {
        result[year] = {};
      }
      if (!Object.keys(result[year]).includes(month)) {
        result[year][month] = {};
      }
      if (!Object.keys(result[year][month]).includes(state)) {
        result[year][month][state] = {};
      }
      if (!Object.keys(result[year][month][state]).includes(item.zip)) {
        result[year][month][state][item.zip] = {};
      }
      if (
        !Object.keys(result[year][month][state][item.zip]).includes(
          item.activity
        )
      ) {
        result[year][month][state][item.zip][item.activity] = {};
      }
      result[year][month][state][item.zip][item.activity] = {
        totalNetRaisedCents: item.total_net_raised_cents,
        totalTeamSize: item.total_team_size,
      };
    }
    return result;
  }
}
