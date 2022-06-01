import { BodyShort, Heading, Link } from "@navikt/ds-react";

import { useAmplitudeData } from "../../../contexts/amplitude-context";
import { loggAktivitet } from "../../../metrics/metrics";
import lagHentTekstForSprak, { Tekster } from "../../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../../contexts/sprak";
import ErRendret from "../../er-rendret/er-rendret";
import InViewport from "../../in-viewport/in-viewport";

const TEKSTER: Tekster<string> = {
  nb: {
    heading: "Har du spørsmål om å søke eller motta pengestøtte?",
    stillSporsmal: "Du kan stille spørsmål om ytelser via",
    skrivTilOss: "skriv til oss",
    og: "og",
    chat: "chat",
    lesOm: "Du kan lese om livssituasjoner NAV kan hjelpe med på",
    forsiden: "forsiden",
    av: "av",
  },
  en: {
    heading: "Do you have questions about applying for or receiving financial support?",
    stillSporsmal: "You can ask questions about benefits via",
    skrivTilOss: "write to us",
    og: "and",
    chat: "chat",
    lesOm: "You can read about life situations in which NAV can help on",
    forsiden: "the frontpage",
    av: "of",
  },
};
const Sluttkort = () => {
  const amplitudeData = useAmplitudeData();

  function loggLenkeKlikk(action: string, url: string) {
    loggAktivitet({ aktivitet: action, ...amplitudeData });
    window.location.assign(url);
  }

  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

  return (
    <>
      <ErRendret loggTekst="Rendrer ytelser sluttkort" />
      <Heading size="medium" className={"blokk-xs"}>
        {tekst("heading")}
      </Heading>
      <BodyShort className={"blokk-xs"}>
        {`${tekst("stillSporsmal")} `}
        <Link
          href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
          onClick={() =>
            loggLenkeKlikk("Går til STO fra ytelser-kort", "https://mininnboks.nav.no/sporsmal/skriv/ARBD")
          }
        >
          {tekst("skrivTilOss")}
        </Link>
        {` ${tekst("og")} `}
        <Link
          href="https://www.nav.no/person/kontakt-oss/chat/"
          onClick={() => loggLenkeKlikk("Går til chat fra ytelser-kort", "https://www.nav.no/person/kontakt-oss/chat/")}
        >
          {tekst("chat")}
        </Link>
        .
      </BodyShort>
      <BodyShort>
        {`${tekst("lesOm")} `}
        <Link
          href="https://www.nav.no/"
          onClick={() => loggLenkeKlikk("Går til forsiden fra ytelse kort", "https://www.nav.no/")}
        >
          {tekst("forsiden")}
        </Link>
        {` ${tekst("av")} nav.no`}
      </BodyShort>
      <InViewport loggTekst="Viser ytelser sluttkort i viewport" />
    </>
  );
};

export default Sluttkort;
