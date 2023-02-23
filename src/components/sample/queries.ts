import Provider from "./provider";

export default {
  sampleQuery: () => {
    const Sample = new Provider();
    return Sample.sample();
  },
};
