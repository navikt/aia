import { DinSituasjonSvar, FremtidigSituasjonSvar } from "../contexts/brukerregistrering";
import { plussDager } from "../utils/date-utils";
import { kanViseOnboardingYtelser } from "./kan-vise-ytelser";
import { Formidlingsgruppe, Servicegruppe } from "../contexts/oppfolging";
import { POAGruppe } from "../utils/get-poa-group";
import { EksperimentId } from "../eksperiment/eksperimenter";
import { InnloggingsNiva } from "../contexts/autentisering";

const eksperiment: EksperimentId = "onboarding14a";
const poagruppeKSS: POAGruppe = "kss";
const dpVenter: "nei" = "nei";

const grunndata = {
  brukerInfoData: {
    rettighetsgruppe: "DAGP",
    geografiskTilknytning: "3811",
    alder: 42,
    erSykmeldtMedArbeidsgiver: false,
  },
  oppfolgingData: {
    formidlingsgruppe: Formidlingsgruppe.ARBS,
    servicegruppe: Servicegruppe.IKVAL,
    kanReaktiveres: false,
    reservasjonKRR: false,
  },
  registreringData: {
    registrering: {
      opprettetDato: plussDager(new Date(), -78).toISOString(),
      manueltRegistrertAv: null,
      besvarelse: {
        dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
        fremtidigSituasjon: FremtidigSituasjonSvar.INGEN_PASSER,
        sisteStilling: "",
        tilbakeIArbeid: "",
        andreForhold: "",
        helseHinder: "",
        utdanning: "",
        utdanningBestatt: "",
        utdanningGodkjent: "",
      },
      teksterForBesvarelse: [],
    },
  },
  egenvurderingData: {
    sistOppdatert: plussDager(new Date(), -78).toISOString(),
  },
  amplitudeData: {
    gruppe: poagruppeKSS,
    geografiskTilknytning: "INGEN_VERDI",
    isKSSX: "nei",
    isKSSK: "nei",
    erSamarbeidskontor: "nei",
    ukerRegistrert: 11,
    dagerRegistrert: 78,
    nivaa: InnloggingsNiva.LEVEL_4,
    kanReaktiveres: "nei",
    formidlingsgruppe: "INGEN_VERDI",
    servicegruppe: "IVURD",
    rettighetsgruppe: "INGEN_VERDI",
    meldegruppe: "INGEN_VERDI",
    registreringType: "INGEN_VERDI",
    underOppfolging: "nei",
    antallDagerEtterFastsattMeldingsdag: "ikke meldekortbruker",
    antallMeldekortKlareForLevering: 0,
    gitVersion: "INGEN_VERDI",
    buildTimestamp: new Date().toISOString(),
    antallSynligeInfomeldinger: 0,
    erSykmeldtMedArbeidsgiver: "ukjent",
    dinSituasjon: DinSituasjonSvar.INGEN_VERDI,
    reservasjonKRR: "ukjent",
    eksperimenter: [],
    dagpengerVedleggEttersendes: 0,
    dagpengerSoknadMellomlagret: 0,
    dagpengerSoknadVenterPaSvar: dpVenter,
    dagpengerDagerMellomPaabegyntSoknadOgRegistrering: 0,
    dagpengerDagerMellomInnsendtSoknadOgRegistrering: 0,
    dagpengerStatusBeregning: "INGEN_DATA",
  },
  sistVistFraLocalstorage: 0,
};

describe("Tester funksjonen ytelser-onboarding", () => {
  test("Nei hvis AAP", () => {
    const testdata = JSON.parse(JSON.stringify(grunndata));
    testdata.brukerInfoData.rettighetsgruppe = "AAP";
    expect(kanViseOnboardingYtelser(testdata)).toBe(false);
  });

  test("Ja hvis eksperiment og situasjonsbestemt", () => {
    const testdata = JSON.parse(JSON.stringify(grunndata));
    testdata.amplitudeData.eksperimenter = [eksperiment];
    testdata.oppfolgingData.servicegruppe = "BFORM";
    expect(kanViseOnboardingYtelser(testdata)).toBe(true);
  });

  test("NEI hvis ikke eksperiment og situasjonsbestemt", () => {
    const testdata = JSON.parse(JSON.stringify(grunndata));
    testdata.amplitudeData.eksperimenter = [];
    testdata.oppfolgingData.servicegruppe = "BFORM";
    expect(kanViseOnboardingYtelser(testdata)).toBe(false);
  });

  test("NEI hvis bruker kan reaktveres", () => {
    const testdata = JSON.parse(JSON.stringify(grunndata));
    testdata.oppfolgingData.kanReaktiveres = true;
    expect(kanViseOnboardingYtelser(testdata)).toBe(false);
  });

  test("NEI hvis ikke bruker ikke er standard innsatsgruppe", () => {
    const testdata = JSON.parse(JSON.stringify(grunndata));
    testdata.oppfolgingData.servicegruppe = "BKART";
    expect(kanViseOnboardingYtelser(testdata)).toBe(false);
  });

  test("JA hvis ikke kan reaktivers og er standard innsatsgruppe", () => {
    const testdata = JSON.parse(JSON.stringify(grunndata));
    testdata.oppfolgingData.kanReaktiveres = false;
    testdata.oppfolgingData.servicegruppe = "IKVAL";
    testdata.oppfolgingData.formidlingsgruppe = "ARBS";
    expect(kanViseOnboardingYtelser(testdata)).toBe(true);
  });
});
