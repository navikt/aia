import harUbehandletDpSoknad from "./har-ubehandlet-dp-soknad";

describe("Tester funksjonen harUbehandletDpSoknad", () => {
  test("Gir nei på tomt array", () => {
    expect(harUbehandletDpSoknad([])).toBe("nei");
  });

  test("Gir ja om nyeste behandling er UNDER_BEHANDLING", () => {
    const behandlingskjeder = [
      { status: "UNDER_BEHANDLING", sistOppdatert: "2021-03-15T09:31:57.507+01:00" },
      { status: "FERDIG_BEHANDLET", sistOppdatert: "2016-11-17T13:01:40+01:00" },
      { status: "UNDER_BEHANDLING", sistOppdatert: "2015-10-23T10:19:21+02:00" },
    ];
    expect(harUbehandletDpSoknad(behandlingskjeder)).toBe("ja");
  });

  test("Gir nei om siste søknad har status FERDIG_BEHANDLET", () => {
    const behandlingskjeder = [
      { status: "FERDIG_BEHANDLET", sistOppdatert: "2021-03-15T09:31:57.507+01:00" },
      { status: "FERDIG_BEHANDLET", sistOppdatert: "2017-03-13T03:18:00.709+01:00" },
      { status: "UNDER_BEHANDLING", sistOppdatert: "2016-11-17T13:01:40+01:00" },
      { status: "UNDER_BEHANDLING", sistOppdatert: "2015-10-23T10:19:21+02:00" },
    ];
    expect(harUbehandletDpSoknad(behandlingskjeder)).toBe("nei");
  });
});
