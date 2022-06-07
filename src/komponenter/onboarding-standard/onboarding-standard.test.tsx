import { FunctionComponent } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { contextProviders, ProviderProps } from "../../test/test-context-providers";
import { Formidlingsgruppe, Servicegruppe } from "../../contexts/oppfolging";
import { InnloggingsNiva } from "../../contexts/autentisering";
import { DinSituasjonSvar, ForeslattInnsatsgruppe } from "../../contexts/brukerregistrering";
import OnboardingStandard from "./onboarding-standard";
import { mockIntersectionObserver } from "../../mocks/intersection-observer-mock";

describe("OnboardingStandard-komponenten", () => {
  const oldLocation = global.window.location;

  beforeEach(() => {
    mockIntersectionObserver();
  });

  afterEach(() => {
    delete (global as any).window.location;
    global.window.location = Object.assign({}, oldLocation);
  });

  let standardInnsatsBrukerregistrering = {
    registrering: {
      opprettetDato: new Date().toISOString(),
      profilering: { innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS },
      besvarelse: { dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN },
    },
  };

  let standardInnsatsBrukerregistreringGammel = {
    registrering: {
      opprettetDato: "2020-11-18",
      profilering: { innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS },
      besvarelse: { dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN },
    },
  };

  let standardInnsatsBrukerregistreringAldriJobbet = {
    registrering: {
      opprettetDato: new Date().toISOString(),
      profilering: { innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS },
      besvarelse: { dinSituasjon: DinSituasjonSvar.ALDRI_HATT_JOBB },
    },
  };

  let standardOppfolging = {
    servicegruppe: Servicegruppe.IKVAL,
    formidlingsgruppe: Formidlingsgruppe.ARBS,
  };

  let ikkeStandardOppfolging = {
    servicegruppe: Servicegruppe.VURDI,
    formidlingsgruppe: Formidlingsgruppe.IARBS,
  };

  it("rendres når den skal", async () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: true },
      oppfolging: standardOppfolging,
      brukerregistrering: standardInnsatsBrukerregistrering,
      autentisering: {
        securityLevel: InnloggingsNiva.LEVEL_4,
      },
      featureToggle: {
        "veientilarbeid.vis-onboarding-standard": true,
      },
    };
    render(<OnboardingStandard />, { wrapper: contextProviders(props) as FunctionComponent });
    expect(screen.getByText("Tre viktige ting i din første uke som registrert arbeidssøker")).toBeTruthy();
  });

  it("rendres ikke når ikke standard", async () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: true },
      oppfolging: ikkeStandardOppfolging,
      brukerregistrering: standardInnsatsBrukerregistrering,
      autentisering: {
        securityLevel: InnloggingsNiva.LEVEL_4,
      },
      featureToggle: {
        "veientilarbeid.vis-onboarding-standard": true,
      },
    };
    const { container } = render(<OnboardingStandard />, { wrapper: contextProviders(props) as FunctionComponent });
    expect(container).toBeEmptyDOMElement();
  });

  it("rendres når featureToggle veientilarbeid.vis-onboarding-standard er aktivert", async () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: true },
      oppfolging: standardOppfolging,
      brukerregistrering: standardInnsatsBrukerregistrering,
      autentisering: {
        securityLevel: InnloggingsNiva.LEVEL_4,
      },
      featureToggle: {
        "veientilarbeid.vis-onboarding-standard": true,
      },
    };
    render(<OnboardingStandard />, { wrapper: contextProviders(props) });
    expect(screen.getByText("Tre viktige ting i din første uke som registrert arbeidssøker")).toBeTruthy();
  });

  it("rendres ikke når featureToggle veientilarbeid.vis-onboarding-standard ikke er aktivert", async () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: true },
      oppfolging: standardOppfolging,
      brukerregistrering: standardInnsatsBrukerregistrering,
      autentisering: {
        securityLevel: InnloggingsNiva.LEVEL_4,
      },
      featureToggle: {
        "veientilarbeid.vis-onboarding-standard": false,
      },
    };
    const { container } = render(<OnboardingStandard />, { wrapper: contextProviders(props) });
    expect(container).toBeEmptyDOMElement();
  });

  it("rendres ikke når dinSituasjon er noe annet enn sagt opp/mistet jobben/permittert", async () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: true },
      oppfolging: standardOppfolging,
      brukerregistrering: standardInnsatsBrukerregistreringAldriJobbet,
      autentisering: {
        securityLevel: InnloggingsNiva.LEVEL_4,
      },
      featureToggle: {
        "veientilarbeid.vis-onboarding-standard": false,
      },
    };
    const { container } = render(<OnboardingStandard />, { wrapper: contextProviders(props) });
    expect(container).toBeEmptyDOMElement();
  });

  it("rendres ikke når du har vært registrert mer enn en uke", async () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: true },
      oppfolging: standardOppfolging,
      brukerregistrering: standardInnsatsBrukerregistreringGammel,
      autentisering: {
        securityLevel: InnloggingsNiva.LEVEL_4,
      },
      featureToggle: {
        "veientilarbeid.vis-onboarding-standard": false,
      },
    };
    const { container } = render(<OnboardingStandard />, { wrapper: contextProviders(props) });
    expect(container).toBeEmptyDOMElement();
  });
});
