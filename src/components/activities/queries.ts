import Provider from "./provider";

const resolvers = {
  activities: () => {
    const provider = new Provider();

    return provider.activities();
  },
};

export default resolvers;
