import React from "react";
import DataProvider from "./komponenter/hent-initial-data/data-provider";
import OppfolgingBrukerregistreringProvider from "./komponenter/hent-initial-data/oppfolging-brukerregistrering-provider";
import Innholdslaster from "./komponenter/innholdslaster/innholdslaster";
import * as Autentisering from "./contexts/autentisering";
import Feilmelding from "./komponenter/feilmeldinger/feilmelding";
import { contextpathDittNav, erMikrofrontend } from "./utils/app-state-utils";
import { fetchData } from "./ducks/api-utils";
import App from "./App";
import "./App.css";

export const AUTH_API = "/api/auth";

const Mikrofrontend = () => {
  const [state, setState] = React.useState<Autentisering.State>(Autentisering.initialState);
  const contextpath = erMikrofrontend() ? contextpathDittNav : "";

  React.useEffect(() => {
    fetchData<Autentisering.State, Autentisering.Data>(state, setState, `${contextpath}${AUTH_API}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Innholdslaster feilmeldingKomponent={<Feilmelding />} storrelse="XXL" avhengigheter={[state]}>
      <Autentisering.AutentiseringContext.Provider value={state}>
        <OppfolgingBrukerregistreringProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </OppfolgingBrukerregistreringProvider>
      </Autentisering.AutentiseringContext.Provider>
    </Innholdslaster>
  );
};

export default Mikrofrontend;
