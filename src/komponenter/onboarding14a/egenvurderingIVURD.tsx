import { Next } from "@navikt/ds-icons/cjs";
import { Heading, BodyShort, Button, Link } from "@navikt/ds-react";
import { useAmplitudeData } from "../../contexts/amplitude-context";
import { loggAktivitet } from "../../metrics/metrics";
import { behovsvurderingLenke } from "../../innhold/lenker";
import { settIBrowserStorage } from "../../utils/browserStorage-utils";
import ErRendret from "../er-rendret/er-rendret";
import InViewport from "../in-viewport/in-viewport";
import lagHentTekstForSprak from "../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../contexts/sprak";

export const AVSLAATT_EGENVURDERING = "egenvurdering-avslaatt";

const TEKSTER = {
  nb: {
    heading: "Hva trenger du for å komme i jobb?",
    beskrivelse:
      "Du har krav på en skriftlig vurdering av behovet ditt for hjelp fra NAV. Derfor vil vi vite hva du selv mener.",
    svar: "Svar her",
    kss: "Jeg ønsker å klare meg selv",
  },
  en: {
    heading: "How can you get back to work?",
    beskrivelse:
      "You have a right to get a textual assessment of your need to get help from NAV. Tell us about your needs.",
    svar: "Answer here",
    kss: "I want to handle it on my own",
  },
};

const EgenvurderingIVURD = () => {
  const amplitudeData = useAmplitudeData();

  const handleButtonClick = () => {
    settIBrowserStorage(AVSLAATT_EGENVURDERING, Date.now().toString());
    loggAktivitet({ aktivitet: "Går til egenvurdering fra sluttkort", ...amplitudeData });
    window.location.assign(behovsvurderingLenke);
  };

  function avslaarEgenvurdering() {
    settIBrowserStorage(AVSLAATT_EGENVURDERING, Date.now().toString());
    loggAktivitet({ aktivitet: "Avslår egenvurdering fra sluttkort", ...amplitudeData });
  }

  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
  return (
    <>
      <ErRendret loggTekst="Rendrer egenvurdering på sluttkort" />
      <Heading level="2" size="medium" className="blokk-xs">
        {tekst("heading")}
      </Heading>
      <BodyShort className="blokk-xs ">{tekst("beskrivelse")}</BodyShort>
      <Button variant="primary" size="small" onClick={handleButtonClick} className="blokk-xs">
        <span>{tekst("svar")}</span>
        <Next />
      </Button>
      <BodyShort className={"blokk-xs"}>
        <Link href={""} onClick={avslaarEgenvurdering}>
          {tekst("kss")}
        </Link>
      </BodyShort>
      <InViewport loggTekst="Viser egenvurdering i viewport på sluttkort" />
    </>
  );
};

export default EgenvurderingIVURD;
