import { BodyLong } from "@navikt/ds-react";

import ByttKortLenke from "./bytt-kort-lenke";
import { useSprakValg } from "../../contexts/sprak";
import lagHentTekstForSprak, { Tekster } from "../../lib/lag-hent-tekst-for-sprak";
import SkrivTilOssChatOgMineDagpenger from "./dagpenger/skriv-til-oss-chat-og-mine-dagpenger";
import { DagpengeStatus } from "../../lib/beregn-dagpenge-status";

interface Props {
  valgtYtelse: string;
  handleByttKortKlikk: (e: React.MouseEvent) => void;
  kanViseDagpengerKomponent: boolean;
  dagpengeStatus: DagpengeStatus;
}

interface InnholdProps {
  dagpengeStatus: DagpengeStatus;
}

function FotnoterInnholdDagpenger(props: InnholdProps) {
  const TEKSTER: Tekster<string> = {
    nb: {
      heading: "Du har ikke sendt inn søknad om dagpenger",
      ingress: "Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.",
      sok: "Søk om dagpenger",
      feil: "Mener du dette er feil, kan du sjekke",
      mineDagpenger: "Mine dagpenger",
    },
    en: {
      heading: "You have not submitted an application for unemployment benefits",
      ingress: "You can receive unemployment benefits at the earliest from the day you submit the application.",
      sok: "Apply for unemployment benefits",
      feil: "If you think this is wrong, you can check",
      mineDagpenger: "My unemployment benefits",
    },
  };
  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

  if (props.dagpengeStatus !== ("ukjent" as DagpengeStatus)) return null;

  return (
    <>
      <BodyLong className={"blokk-xs"}>{tekst("ingress")}</BodyLong>

      <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - ikke søkt dagpenger"' />
    </>
  );
}

function FotnoterYtelser(props: Props) {
  const { valgtYtelse, handleByttKortKlikk, kanViseDagpengerKomponent, dagpengeStatus } = props;
  return (
    <>
      {valgtYtelse === "dagpenger" && <FotnoterInnholdDagpenger dagpengeStatus={dagpengeStatus} />}
      {kanViseDagpengerKomponent && (
        <ByttKortLenke valgtYtelserVisning={valgtYtelse} handleByttKortKlikk={handleByttKortKlikk} />
      )}
    </>
  );
}

export default FotnoterYtelser;
