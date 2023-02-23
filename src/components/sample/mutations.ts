import Provider from "./provider";

export default {
  sampleMutation: () => {
    const Sample = new Provider();
    return Sample.sample();
  },
};
