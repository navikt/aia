export default [
  {
    url: "/api/oppfolging",
    method: "get",
    response: () => {
      return {
        underOppfolging: true,
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: 'IKVAL',
        formidlingsgruppe: 'ARBS',
      };
    },
  },
];
