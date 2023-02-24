import { PrismaClient } from "@prisma/client";

interface IActivities {
  activity: string;
}

export default class filterActivities {
  public async activities() {
    const prisma = new PrismaClient();

    const data = <IActivities[]>(
      await prisma.$queryRaw`select distinct(activity) from groups;`
    );
    const getActivitiesArray = data.map(
      (result: IActivities) => result.activity
    );

    return getActivitiesArray;
  }
}
