export default [
  {
    url: "/person/dittnav/veientilarbeid/bakveientilarbeid/startregistrering",
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
