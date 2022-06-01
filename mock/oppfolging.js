export default [
  {
    url: "/person/dittnav/veientilarbeid/bakveientilarbeid/oppfolging",
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
