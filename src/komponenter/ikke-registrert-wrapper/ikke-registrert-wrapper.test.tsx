import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import IkkeRegistrertWrapper from "./ikke-registrert-wrapper";
import { contextProviders, ProviderProps } from "../../test/test-context-providers";

describe("Tester komponenten", () => {
  test("Komponenten VISES ikke om man er under oppfølging", () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: true },
    };
    const { container } = render(<IkkeRegistrertWrapper />, { wrapper: contextProviders(props) });
    expect(container).toBeEmptyDOMElement();
  });

  test("Komponenten VISES om man ikke er under oppfølging og aldri har vært det", () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: false },
      brukerregistrering: null,
    };
    const { container } = render(<IkkeRegistrertWrapper />, { wrapper: contextProviders(props) });
    expect(container).not.toBeEmptyDOMElement();
  });

  test("Komponenten VISES om man ikke er under oppfølging", () => {
    const props: ProviderProps = {
      underOppfolging: { underOppfolging: false },
    };
    render(<IkkeRegistrertWrapper />, { wrapper: contextProviders(props) });
    expect(screen.getByText("Din pensjon")).toBeInTheDocument();
    expect(screen.getByText("Mistet jobben?")).toBeInTheDocument();
    expect(screen.getByText("Skjemaer")).toBeInTheDocument();
    expect(screen.getByText("Ditt sykefravær")).toBeInTheDocument();
  });
});
