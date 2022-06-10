export default [
  {
    url: "/bakveientilarbeid/startregistrering",
    method: "get",
    response: () => {
      return {
        erSykmeldtMedArbeidsgiver: false,
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '3808',
        rettighetsgruppe: 'DAGP',
        alder: 32,
      };
    },
  },
];
