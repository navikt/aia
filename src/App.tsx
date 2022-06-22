import React from "react";
import Rad from "./innhold/rad";
import ReaktiveringKort from "./komponenter/reaktivering/reaktivering-kort";
import KrrMelding from "./komponenter/krr-melding/krr-melding";
import StatusTittel from "./komponenter/registrert/status-tittel";
import OnboardingStandard from "./komponenter/onboarding-standard/onboarding-standard";
import ReaktiveringKvittering from "./komponenter/reaktivering/reaktivering-kvittering";
import Registrert from "./komponenter/registrert/registrert";
import EkspanderbartInnsyn from "./komponenter/innsyn/ekspanderbart-innsyn";
import AktivitetDialogMeldekort from "./innhold/aktivitet-dialog-meldekort";
import Egenvurdering from "./komponenter/egenvurdering/egenvurdering";
import Motestotte from "./komponenter/motestotte/motestotte";
import InnholdMetrics from "./innhold/innhold-metrics";
import InViewport from "./komponenter/in-viewport/in-viewport";
import GenerelleFliser from "./komponenter/dittnav/generelle-fliser";
import AapRad from "./komponenter/aap/aap";
import "@navikt/ds-css";
import "./App.css";

const App: React.FC<{}> = () => {
  // const { data } = useQuery(apiUrl, fetcher);

  return (
    <div className="arbeidsflate-for-innlogget-arbeidssoker">
      <InnholdMetrics />
      <InViewport loggTekst="Veien til arbeid i viewport" />
      <Rad>
        <ReaktiveringKort />
        <KrrMelding />
        <StatusTittel />
        <OnboardingStandard />
        <ReaktiveringKvittering />
        <Registrert />
        <EkspanderbartInnsyn />
        <Egenvurdering />
        <Motestotte />
        <AktivitetDialogMeldekort />
        <GenerelleFliser />
      </Rad>

      <AapRad />
      <InViewport loggTekst="Bunnen av veien til arbeid i viewport" />
    </div>
  );
};

export default App;
