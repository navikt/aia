export default [
  {
    url: "/bakveientilarbeid/underoppfolging",
    method: "get",
    response: () => {
      return {
        underOppfolging: true,
      };
    },
  },
];
