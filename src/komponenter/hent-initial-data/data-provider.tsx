import * as React from "react";
import Innholdslaster from "../innholdslaster/innholdslaster";
import Feilmelding from "../feilmeldinger/feilmelding";
import * as BrukerInfo from "../../contexts/bruker-info";

import {
  ForeslattInnsatsgruppe,
  selectForeslattInnsatsgruppe,
  useBrukerregistreringData,
} from "../../contexts/brukerregistrering";
import * as Motestotte from "../../contexts/motestotte";
import * as Meldekort from "../../contexts/meldekort";
import * as Egenvurdering from "../../contexts/egenvurdering";
import * as UlesteDialoger from "../../contexts/ulestedialoger";
import * as SprakValg from "../../contexts/sprak";
import { fetchData } from "../../ducks/api-utils";
import {
  BRUKERINFO_URL,
  EGENVURDERINGBESVARELSE_URL,
  MOTESTOTTE_URL,
  NESTE_MELDEKORT_URL,
  ULESTEDIALOGER_URL,
  DP_INNSYN_URL,
} from "../../ducks/api";

import { AmplitudeProvider } from "./amplitude-provider";
import { useAutentiseringData, InnloggingsNiva } from "../../contexts/autentisering";
import { UnderOppfolgingContext } from "../../contexts/under-oppfolging";
import * as DpInnsynSoknad from "../../contexts/dp-innsyn-soknad";
import * as DpInnsynVedtak from "../../contexts/dp-innsyn-vedtak";
import * as DpInnsynPaabegynt from "../../contexts/dp-innsyn-paabegynte-soknader";

const skalSjekkeEgenvurderingBesvarelse = (
  foreslaattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null
): boolean => {
  return (
    foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
    foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS
  );
};

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps;

export const hentSprakValgFraCookie = (): SprakValg.Sprak | null => {
  const decoratorLanguageCookie = document.cookie.match(/decorator-language=([a-z]{2})/);
  return decoratorLanguageCookie && (decoratorLanguageCookie[1] as SprakValg.Sprak);
};

const setGyldigSprak = (sprak: string): SprakValg.Sprak => {
  return (["en", "nb"].includes(sprak) ? sprak : "nb") as SprakValg.Sprak;
};

const hentSprakValg = (): SprakValg.State => {
  const urlParams = new URLSearchParams(window.location.search);
  const sprakFraUrl = urlParams.get("lang") || "nb";
  // const cookieVerdi = hentSprakValgFraCookie();

  return {
    // sprak: (urlParams.get('lang')) || cookieVerdi || 'nb') as SprakValg.Sprak,
    sprak: setGyldigSprak(sprakFraUrl),
  };
};

const DataProvider = ({ children }: Props) => {
  const { level } = useAutentiseringData();
  const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
  const [motestotteState, setMotestotteState] = React.useState<Motestotte.State>(Motestotte.initialState);
  const [meldekortState, setMeldekortState] = React.useState<Meldekort.State>(Meldekort.initialState);
  const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfo.State>(BrukerInfo.initialState);
  const [valgtSprak, setValgtSprak] = React.useState<SprakValg.State>(SprakValg.initialState);
  const [egenvurderingState, setEgenvurderingState] = React.useState<Egenvurdering.State>(Egenvurdering.initialState);
  const [ulesteDialogerState, setUlesteDialogerState] = React.useState<UlesteDialoger.State>(
    UlesteDialoger.initialState
  );
  const [dpInnsynSoknadState, setDpInnsynSoknadState] = React.useState<DpInnsynSoknad.State>(
    DpInnsynSoknad.initialState
  );
  const [dpInnsynVedtakState, setDpInnsynVedtakState] = React.useState<DpInnsynVedtak.State>(
    DpInnsynVedtak.initialState
  );
  const [DpInnsynPaabegyntState, setDpInnsynPaabegyntState] = React.useState<DpInnsynPaabegynt.State>(
    DpInnsynPaabegynt.initialState
  );

  const data = useBrukerregistreringData();
  const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

  React.useEffect(() => {
    if (level !== InnloggingsNiva.LEVEL_4) {
      return;
    }
    fetchData<Meldekort.State, Meldekort.Data>(meldekortState, setMeldekortState, NESTE_MELDEKORT_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  React.useEffect(() => {
    if (level !== InnloggingsNiva.LEVEL_4) {
      return;
    }

    fetchData<BrukerInfo.State, BrukerInfo.Data>(brukerInfoState, setBrukerInfoState, BRUKERINFO_URL);

    fetchData<DpInnsynSoknad.State, DpInnsynSoknad.Data>(
      dpInnsynSoknadState,
      setDpInnsynSoknadState,
      `${DP_INNSYN_URL}/soknad`
    );

    fetchData<DpInnsynVedtak.State, DpInnsynVedtak.Data>(
      dpInnsynVedtakState,
      setDpInnsynVedtakState,
      `${DP_INNSYN_URL}/vedtak`
    );

    fetchData<DpInnsynPaabegynt.State, DpInnsynPaabegynt.Data>(
      DpInnsynPaabegyntState,
      setDpInnsynPaabegyntState,
      `${DP_INNSYN_URL}/paabegynte`
    );

    fetchData<UlesteDialoger.State, UlesteDialoger.Data>(
      ulesteDialogerState,
      setUlesteDialogerState,
      ULESTEDIALOGER_URL
    );

    if (underOppfolging) {
      if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
        fetchData<Egenvurdering.State, Egenvurdering.Data>(
          egenvurderingState,
          setEgenvurderingState,
          EGENVURDERINGBESVARELSE_URL
        );
      } else if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
        fetchData<Motestotte.State, Motestotte.Data>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
      }
    }

    setValgtSprak(hentSprakValg());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, underOppfolging]);

  const avhengigheter: any[] = [];
  const ventPa: any[] = [];

  if (level === InnloggingsNiva.LEVEL_4) {
    avhengigheter.push(brukerInfoState);
    ventPa.push(ulesteDialogerState);

    if (underOppfolging) {
      if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
        ventPa.push(egenvurderingState);
      }

      if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
        ventPa.push(motestotteState);
      }
    }
  }

  return (
    <Innholdslaster
      feilmeldingKomponent={<Feilmelding />}
      storrelse="XXL"
      avhengigheter={avhengigheter}
      ventPa={ventPa}
    >
      <Meldekort.MeldekortContext.Provider value={meldekortState}>
        <BrukerInfo.BrukerInfoContext.Provider value={brukerInfoState}>
          <UlesteDialoger.UlesteDialogerContext.Provider value={ulesteDialogerState}>
            <Egenvurdering.EgenvurderingContext.Provider value={egenvurderingState}>
              <Motestotte.MotestotteContext.Provider value={motestotteState}>
                <DpInnsynPaabegynt.DpInnsynPaabegynteSoknaderContext.Provider value={DpInnsynPaabegyntState}>
                  <DpInnsynSoknad.DpInnsynSoknadContext.Provider value={dpInnsynSoknadState}>
                    <DpInnsynVedtak.DpInnsynVedtakContext.Provider value={dpInnsynVedtakState}>
                      <SprakValg.SprakContext.Provider value={valgtSprak}>
                        <AmplitudeProvider>{children}</AmplitudeProvider>
                      </SprakValg.SprakContext.Provider>
                    </DpInnsynVedtak.DpInnsynVedtakContext.Provider>
                  </DpInnsynSoknad.DpInnsynSoknadContext.Provider>
                </DpInnsynPaabegynt.DpInnsynPaabegynteSoknaderContext.Provider>
              </Motestotte.MotestotteContext.Provider>
            </Egenvurdering.EgenvurderingContext.Provider>
          </UlesteDialoger.UlesteDialogerContext.Provider>
        </BrukerInfo.BrukerInfoContext.Provider>
      </Meldekort.MeldekortContext.Provider>
    </Innholdslaster>
  );
};

export default DataProvider;
