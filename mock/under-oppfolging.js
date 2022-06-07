export default [
  {
    url: "/person/dittnav/veientilarbeid/bakveientilarbeid/underoppfolging",
    method: "get",
    response: () => {
      return {
        underOppfolging: true,
      };
    },
  },
];
