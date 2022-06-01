import { dialogLenke } from "../../../innhold/lenker";
import EgenvurderingIVURD, { AVSLAATT_EGENVURDERING } from "../egenvurderingIVURD";
import { kanViseIVURDEgenvurdering } from "../../../lib/kan-vise-IVURD-egenvurdering";
import { useUnderOppfolgingData } from "../../../contexts/under-oppfolging";
import { useAutentiseringData } from "../../../contexts/autentisering";
import { useEgenvurderingData } from "../../../contexts/egenvurdering";
import { useOppfolgingData } from "../../../contexts/oppfolging";
import { useFeatureToggleData } from "../../../contexts/feature-toggles";
import RegistrertTeller from "../registrert-teller";
import Lenkepanel14A from "../lenkepanel-14a";
import { hentFraBrowserStorage } from "../../../utils/browserStorage-utils";
import { useAmplitudeData } from "../../../contexts/amplitude-context";
import { useBrukerregistreringData } from "../../../contexts/brukerregistrering";
import { useUlesteDialogerData } from "../../../contexts/ulestedialoger";
import EgenvurderingUke12, { INTRO_KEY_12UKER } from "../egenvurdering-uke12";
import { kanVise12UkerEgenvurdering } from "../../../lib/kan-vise-12-uker-egenvurdering";
import { useBrukerinfoData } from "../../../contexts/bruker-info";
import { Heading } from "@navikt/ds-react";
import lagHentTekstForSprak from "../../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../../contexts/sprak";

const TEKSTER = {
  nb: {
    for12uker: "Ønsker du oppfølging før 12 uker må du gi oss beskjed",
    etter12uker: "Ta kontakt om du ønsker hjelp",
  },
  en: {
    for12uker: "Get in touch if you need help",
    etter12uker: "Get in touch if you need help",
  },
};

function Sluttkort() {
  const amplitudeData = useAmplitudeData();
  const { ukerRegistrert } = amplitudeData;

  const registreringData = useBrukerregistreringData();
  const underOppfolgingData = useUnderOppfolgingData();
  const autentiseringData = useAutentiseringData();
  const egenvurderingData = useEgenvurderingData();
  const oppfolgingData = useOppfolgingData();
  const brukerInfoData = useBrukerinfoData();
  const featuretoggleData = useFeatureToggleData();
  const { antallUleste } = useUlesteDialogerData();

  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

  const registrertDato = registreringData?.registrering?.opprettetDato;
  const registrertOver12Uker = ukerRegistrert > 12;
  const kortTittel = registrertOver12Uker ? tekst("etter12uker") : tekst("for12uker");

  const featuretoggleEgenvurderingAktivert =
    featuretoggleData && featuretoggleData["veientilarbeid.vis-egenvurdering-med-14a"];

  const skalViseIVUREgenvurdering = kanViseIVURDEgenvurdering({
    underOppfolgingData,
    registreringData,
    autentiseringData,
    egenvurderingData,
    oppfolgingData,
  });

  const sistSettEgenvurdering = Number(hentFraBrowserStorage(INTRO_KEY_12UKER)) ?? 0;
  const visEgenvurderingsUke12 = kanVise12UkerEgenvurdering({
    brukerInfoData,
    egenvurderingData,
    oppfolgingData,
    registreringData,
    amplitudeData,
    featuretoggleData,
    sistVistFraLocalstorage: sistSettEgenvurdering,
  });

  const harAvslattEgenvurdering = hentFraBrowserStorage(AVSLAATT_EGENVURDERING);
  if (featuretoggleEgenvurderingAktivert && skalViseIVUREgenvurdering && !harAvslattEgenvurdering)
    return <EgenvurderingIVURD />;

  if (visEgenvurderingsUke12) {
    return <EgenvurderingUke12 />;
  }

  return (
    <>
      <Heading size="medium" className={"blokk-xs"}>
        {kortTittel}
      </Heading>
      <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />
      <Lenkepanel14A amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
    </>
  );
}

export default Sluttkort;
