export default [
  {
    url: "/person/dittnav/veientilarbeid/api/auth",
    method: "get",
    response: () => {
      return {
        loggedIn: true,
        securityLevel: "Level4",
      };
    },
  },
];
