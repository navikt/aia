import * as React from "react";
import Innholdslaster from "../innholdslaster/innholdslaster";
import * as Oppfolging from "../../contexts/oppfolging";
import * as UnderOppfolging from "../../contexts/under-oppfolging";
import Feilmelding from "../feilmeldinger/feilmelding";
import * as Brukerregistrering from "../../contexts/brukerregistrering";
import * as FeatureToggle from "../../contexts/feature-toggles";
import * as Meldekortstatus from "../../contexts/meldekortstatus";
import { fetchData } from "../../ducks/api-utils";
import {
  BRUKERREGISTRERING_URL,
  FEATURE_URL,
  MELDEKORTSTATUS_URL,
  UNDER_OPPFOLGING_URL,
  VEILARBOPPFOLGING_URL,
} from "../../ducks/api";
import { useAutentiseringData, InnloggingsNiva } from "../../contexts/autentisering";
import KanViseVTA from "../kan-vise-vta/kan-vise-vta";

interface OwnProps {
  children: React.ReactElement<any>;
}

type OppfolgingProviderProps = OwnProps;

const OppfolgingBrukerregistreringProvider = ({ children }: OppfolgingProviderProps) => {
  const { level } = useAutentiseringData();

  const [meldekortstatusState, setMeldekortstatusState] = React.useState<Meldekortstatus.State>(
    Meldekortstatus.initialState
  );
  const [brukerregistreringState, setBrukerregistreringState] = React.useState<Brukerregistrering.State>(
    Brukerregistrering.initialState
  );
  const [oppfolgingState, setOppfolgingState] = React.useState<Oppfolging.State>(Oppfolging.initialState);
  const [underOppfolgingState, setUnderOppfolgingState] = React.useState<UnderOppfolging.State>(
    UnderOppfolging.initialState
  );
  const [featureToggleState, setFeatureToggleState] = React.useState<FeatureToggle.State>(FeatureToggle.initialState);
  const parameters = Object.values(FeatureToggle.FeatureToggles)
    .map((element) => "feature=" + element)
    .join("&");
  const featureTogglesUrl = `${FEATURE_URL}?${parameters}`;

  React.useEffect(() => {
    fetchData<Meldekortstatus.State, Meldekortstatus.Data>(
      meldekortstatusState,
      setMeldekortstatusState,
      MELDEKORTSTATUS_URL
    );
    fetchData<UnderOppfolging.State, UnderOppfolging.Data>(
      underOppfolgingState,
      setUnderOppfolgingState,
      UNDER_OPPFOLGING_URL
    );
    fetchData<FeatureToggle.State, FeatureToggle.Data>(featureToggleState, setFeatureToggleState, featureTogglesUrl);
    if (level === InnloggingsNiva.LEVEL_4) {
      fetchData<Oppfolging.State, Oppfolging.Data>(oppfolgingState, setOppfolgingState, VEILARBOPPFOLGING_URL);
      fetchData<Brukerregistrering.State, Brukerregistrering.Data>(
        brukerregistreringState,
        setBrukerregistreringState,
        BRUKERREGISTRERING_URL
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const avhengigheter: any[] = [underOppfolgingState];
  if (level === InnloggingsNiva.LEVEL_4) {
    avhengigheter.push(oppfolgingState, brukerregistreringState);
  }

  return (
    <Innholdslaster feilmeldingKomponent={<Feilmelding />} storrelse="XXL" avhengigheter={avhengigheter}>
      <Oppfolging.OppfolgingContext.Provider value={oppfolgingState}>
        <Meldekortstatus.MeldekortstatusContext.Provider value={meldekortstatusState}>
          <UnderOppfolging.UnderOppfolgingContext.Provider value={underOppfolgingState}>
            <Brukerregistrering.BrukerregistreringContext.Provider value={brukerregistreringState}>
              <FeatureToggle.FeaturetoggleContext.Provider value={featureToggleState}>
                <KanViseVTA>{children}</KanViseVTA>
              </FeatureToggle.FeaturetoggleContext.Provider>
            </Brukerregistrering.BrukerregistreringContext.Provider>
          </UnderOppfolging.UnderOppfolgingContext.Provider>
        </Meldekortstatus.MeldekortstatusContext.Provider>
      </Oppfolging.OppfolgingContext.Provider>
    </Innholdslaster>
  );
};

export default OppfolgingBrukerregistreringProvider;
