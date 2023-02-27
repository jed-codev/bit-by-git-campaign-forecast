import { PrismaClient } from "@prisma/client";

interface IActivities {
  activity: string;
}

export default class filterActivities {
  public async activities() {
    const prisma = new PrismaClient();

    const data = <IActivities[]>(
      await prisma.$queryRaw`select distinct(activity) from groups WHERE activity IS NOT NULL AND activity <> '' AND activity <> 'undefined'
      and activity in ("football", "band", "baseball", "basketball", "robotics") 
;`
    );
    const getActivitiesArray = data.map(
      (result: IActivities) => result.activity
    );

    return getActivitiesArray;
  }
}
