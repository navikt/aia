import { BodyShort, Heading } from "@navikt/ds-react";
import { useDpInnsynVedtakData, Vedtak } from "../../../contexts/dp-innsyn-vedtak";
import prettyPrintDato from "../../../utils/pretty-print-dato";
import SkrivTilOssChatOgMineDagpenger from "./skriv-til-oss-chat-og-mine-dagpenger";
import lagHentTekstForSprak, { Tekster } from "../../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../../contexts/sprak";

const TEKSTER: Tekster<string> = {
  nb: {
    heading: "Du har fått et vedtak om dagpenger",
    fattet: "Vedtaket ble fattet",
    status: "og status er",
  },
  en: {
    heading: "You have received a decision on unemployment benefits",
    fattet: "The decision was made on",
    status: "and the status is",
  },
};

const Sluttkort = () => {
  const vedtakData = useDpInnsynVedtakData();
  const nyesteInnvilgedeVedtak = vedtakData
    .filter((vedtak) => vedtak.status === "INNVILGET")
    .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];

  const sprak = useSprakValg().sprak;
  const tekst = lagHentTekstForSprak(TEKSTER, sprak);

  if (!nyesteInnvilgedeVedtak) return null;

  return (
    <>
      <Heading size="medium" className={"blokk-xs"}>
        {tekst("heading")}
      </Heading>

      <BodyShort className={"blokk-xs"}>
        {`${tekst("fattet")} ${prettyPrintDato(nyesteInnvilgedeVedtak.datoFattet, sprak)} ${tekst("status")} `}
        <b>{nyesteInnvilgedeVedtak.status.toLocaleLowerCase()}</b>.
      </BodyShort>
      <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - dagpenger innvilget"' />
    </>
  );
};

export default Sluttkort;
