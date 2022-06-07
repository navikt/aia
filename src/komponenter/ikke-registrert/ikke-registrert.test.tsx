import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IkkeRegistrert from "./ikke-registrert";
import { mockIntersectionObserver } from "../../mocks/intersection-observer-mock";

describe("Tester IkkeRegistrert-komponenten", () => {
  const oldLocation = global.window.location;

  beforeEach(() => {
    mockIntersectionObserver();
  });

  afterEach(() => {
    delete (global as any).window.location;
    global.window.location = Object.assign({}, oldLocation);
  });

  test("SKJULES når man ikke skal se registrering", async () => {
    const { container } = render(<IkkeRegistrert skalTilRegistrering={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("VISES når den skal", async () => {
    render(<IkkeRegistrert skalTilRegistrering={true} />);
    expect(screen.getByText(/du er ikke registrert som arbeidssøker/i)).toBeTruthy();
  });

  test("knapp fungerer som forventet", async () => {
    render(<IkkeRegistrert skalTilRegistrering={true} />);
    const mockHandleClick = jest.fn();
    const mockLocationAssign = jest.fn();

    delete (global as any).window.location;
    global.window.location = { assign: mockLocationAssign } as unknown as Location;

    const knapp = screen.getByText(/registrer deg som arbeidssøker/i);
    knapp.onclick = mockHandleClick;
    userEvent.click(knapp);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockLocationAssign).toHaveBeenCalledTimes(1);
  });
});
