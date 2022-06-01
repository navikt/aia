import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { contextProviders, ProviderProps } from "../../test/test-context-providers";
import { Formidlingsgruppe, Servicegruppe } from "../../contexts/oppfolging";
import { mockIntersectionObserver } from "../../mocks/intersection-observer-mock";
import Onboarding14a from "./Onboarding14a";

const providerProps: ProviderProps = {
  brukerInfo: {
    rettighetsgruppe: "DAGP",
    geografiskTilknytning: "110302",
    alder: 42,
  },
  amplitude: {
    ukerRegistrert: 2,
    gruppe: "kss",
    eksperimenter: ["onboarding14a"],
  },
  oppfolging: {
    formidlingsgruppe: Formidlingsgruppe.ARBS,
    servicegruppe: Servicegruppe.IKVAL,
  },
  brukerregistrering: {
    registrering: {
      opprettetDato: "2020-06-01",
    },
  },
};

describe("tester onboarding komponenten for 14a-intro", () => {
  beforeEach(() => {
    mockIntersectionObserver();
  });

  test("komponenten vises også når featuretoggle ikke er satt", () => {
    const { container } = render(<Onboarding14a />, { wrapper: contextProviders(providerProps) });
    expect(container).not.toBeEmptyDOMElement();
  });

  test("komponenten vises når bruker ikke har standard innsats", () => {
    const { container } = render(<Onboarding14a />, {
      wrapper: contextProviders({
        ...providerProps,
        oppfolging: {
          formidlingsgruppe: Formidlingsgruppe.ARBS,
          servicegruppe: Servicegruppe.BFORM,
        },
        brukerInfo: { alder: 29 },
      }),
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  test("komponenten vises også når bruker er 29 år", () => {
    const { container } = render(<Onboarding14a />, {
      wrapper: contextProviders({
        ...providerProps,
        featureToggle: { "veientilarbeid.14a-intro": true },
        brukerInfo: { alder: 29 },
      }),
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  test("komponenten VISES også når bruker har vært registrert i 13 uker", () => {
    const { container } = render(<Onboarding14a />, {
      wrapper: contextProviders({
        ...providerProps,
        featureToggle: { "veientilarbeid.14a-intro": true },
        amplitude: { ...providerProps.amplitude, ukerRegistrert: 13 },
      }),
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  test("komponenten vises også når eksperimentet onboarding14a ikke er med", () => {
    const { container } = render(<Onboarding14a />, {
      wrapper: contextProviders({
        ...providerProps,
        featureToggle: { "veientilarbeid.14a-intro": true },
        amplitude: { ...providerProps.amplitude, eksperimenter: [] },
      }),
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  test("komponenten vises når featuretoggle er satt og men hører til kontor som deltar på eksperimentet", () => {
    const { container } = render(<Onboarding14a />, {
      wrapper: contextProviders({ ...providerProps, featureToggle: { "veientilarbeid.14a-intro": true } }),
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  test("komponenten starter på sluttkortet når man er forbi uke 0", () => {
    render(<Onboarding14a />, {
      wrapper: contextProviders({ ...providerProps, featureToggle: { "veientilarbeid.14a-intro": true } }),
    });
    expect(screen.getByText(/ønsker du oppfølging/i)).toBeInTheDocument();
  });

  test("komponenten starter i pre-state når man er på uke 0", () => {
    render(<Onboarding14a />, {
      wrapper: contextProviders({
        ...providerProps,
        featureToggle: { "veientilarbeid.14a-intro": true },
        amplitude: {
          ...providerProps.amplitude,
          ukerRegistrert: 0,
        },
      }),
    });
    expect(screen.getByText(/start introduksjonen/i)).toBeInTheDocument();
  });

  test("man kan navigere seg gjennom kortene", () => {
    render(<Onboarding14a />, {
      wrapper: contextProviders({
        ...providerProps,
        featureToggle: { "veientilarbeid.14a-intro": true },
        amplitude: {
          ...providerProps.amplitude,
          ukerRegistrert: 0,
        },
      }),
    });
    const startKnapp = screen.getByRole("button", { name: /start introduksjonen/i });
    userEvent.click(startKnapp);
    const forrigeKnapp = screen.getByRole("button", { name: /forrige/i });
    const nesteKnapp = screen.getByRole("button", { name: /neste/i });
    // Sjekker at vi er på første kortet
    expect(screen.getByText(/Hva slags hjelp kan jeg få/i)).toBeInTheDocument();
    expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
    // sjekker at vi ikke kan gå bakover fra første kort
    userEvent.click(forrigeKnapp);
    expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
    // Går til neste kort
    userEvent.click(nesteKnapp);
    expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
    userEvent.click(nesteKnapp);
    expect(screen.getByText(/3 av 4/i)).toBeInTheDocument();
    // Går et steg tilbakeog frem igjen
    userEvent.click(forrigeKnapp);
    expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
    userEvent.click(nesteKnapp);
    expect(screen.getByText(/3 av 4/i)).toBeInTheDocument();
    userEvent.click(nesteKnapp);
    // Sjekker  avslutningsknapp
    const avsluttKnapp = screen.getByRole("button", { name: /fullfør/i });
    userEvent.click(avsluttKnapp);
    expect(screen.getByText(/Ønsker du oppfølging/i)).toBeInTheDocument();
    // sjekker les igjen knapp
    const lesIgjenKnapp = screen.getByText(/Les om hva slags hjelp du kan få/i);
    userEvent.click(lesIgjenKnapp);
    expect(screen.getByText(/Hva slags hjelp kan jeg få/i)).toBeInTheDocument();
    expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
  });
});
