import { BodyShort, Link } from "@navikt/ds-react";
import { mine_dagpenger_url } from "../../../url";
import { useAmplitudeData } from "../../../contexts/amplitude-context";
import lagHentTekstForSprak, { Tekster } from "../../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../../contexts/sprak";
import { loggAktivitet } from "../../../metrics/metrics";

interface Props {
  amplitudeTemaNavn: string;
}

const TEKSTER: Tekster<string> = {
  nb: {
    ettersend: "Du kan ettersende dokumentasjon og se mer informasjon via",
    mineDagpenger: "Mine dagpenger",
  },
  en: {
    ettersend: "You can send additional documentation and see more information via ",
    mineDagpenger: "My unemployment benefits",
  },
};

const EttersendDokumentasjon = ({ amplitudeTemaNavn }: Props) => {
  const amplitudeData = useAmplitudeData();
  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

  function loggLenkeKlikk(action: string, url: string) {
    loggAktivitet({ aktivitet: action, ...amplitudeData });
    window.location.assign(url);
  }

  return (
    <BodyShort className={"blokk-xs"}>
      {`${tekst("ettersend")} `}
      <Link
        href={mine_dagpenger_url}
        onClick={() => loggLenkeKlikk(`Går til Mine dagpenger fra ${amplitudeTemaNavn}`, mine_dagpenger_url)}
      >
        {tekst("mineDagpenger")}
      </Link>
    </BodyShort>
  );
};

export default EttersendDokumentasjon;
