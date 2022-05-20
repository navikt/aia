export default [
  {
    url: "/api/under-oppfolging",
    method: "get",
    response: () => {
      return {
        underOppfolging: true,
      };
    },
  },
];
