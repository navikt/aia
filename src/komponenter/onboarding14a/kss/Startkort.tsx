import ErRendret from "../../er-rendret/er-rendret";
import InViewport from "../../in-viewport/in-viewport";
import { Heading } from "@navikt/ds-react";
import lagHentTekstForSprak from "../../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../../contexts/sprak";

const TEKSTER = {
  nb: {
    heading: "Hva slags hjelp kan jeg få?",
  },
  en: {
    heading: "What kind of help can I get?",
  },
};

function Startkort() {
  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
  return (
    <>
      <ErRendret loggTekst="Rendrer 14a pre-state" />
      <Heading size="large" className={"blokk-xs"}>
        {tekst("heading")}
      </Heading>
      <InViewport loggTekst="Viser 14a pre-state i viewport" />
    </>
  );
}

export default Startkort;
