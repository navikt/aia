import { Link, Heading, BodyShort, Button } from "@navikt/ds-react";
import { useAmplitudeData } from "../../contexts/amplitude-context";
import { settIBrowserStorage } from "../../utils/browserStorage-utils";
import { loggAktivitet } from "../../metrics/metrics";
import { behovsvurderingLenke } from "../../innhold/lenker";
import lagHentTekstForSprak from "../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../contexts/sprak";

export const INTRO_KEY_12UKER = "12uker-egenvurdering";

const TEKSTER = {
  nb: {
    heading: "Du har vært registrert i",
    uker: "uker",
    beskrivelse:
      "Har du fortsatt tro på at du greier å skaffe deg jobb på egenhånd, eller tenker du det er behov for hjelp og støtte fra en veileder ved NAV-kontoret ditt?",
    hjelp: "Jeg ønsker hjelp",
    kss: "Jeg klarer meg fint selv",
  },
  en: {
    heading: "You have been registered for",
    uker: "weeks",
    beskrivelse:
      "Do you still think you can manage to get a job on your own, or do you want help from a NAV counselor?",
    hjelp: "I want help",
    kss: "I want to handle it on my own",
  },
};

function EgenvurderingUke12() {
  const amplitudeData = useAmplitudeData();
  const { ukerRegistrert } = amplitudeData;

  function avslaarEgenvurdering() {
    settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
    loggAktivitet({ aktivitet: "Avslår 12 ukers egenvurdering fra lenke", ...amplitudeData });
  }

  function sendTilEgenvurdering() {
    settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
    loggAktivitet({ aktivitet: "Går til 12 ukers egenvurdering", ...amplitudeData });
    window.location.assign(`${behovsvurderingLenke}/hvilken-veiledning-trengs`);
  }

  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

  return (
    <div>
      <Heading level="2" size="medium" className="blokk-xs">
        {`${tekst("heading")} ${ukerRegistrert} ${tekst("uker")}`}
      </Heading>
      <BodyShort className="blokk-xs">{tekst("beskrivelse")}</BodyShort>
      <div className="flex flex-column space-between">
        <Button variant="secondary" onClick={sendTilEgenvurdering} className="blokk-s">
          {tekst("hjelp")}
        </Button>
        <BodyShort>
          <Link href="" onClick={avslaarEgenvurdering}>
            {tekst("kss")}
          </Link>
        </BodyShort>
      </div>
    </div>
  );
}

export default EgenvurderingUke12;
