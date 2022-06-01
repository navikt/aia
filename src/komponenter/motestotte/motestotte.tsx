import * as React from "react";
import {
  ForeslattInnsatsgruppe,
  selectDinSituasjonSvar,
  selectForeslattInnsatsgruppe,
  selectOpprettetRegistreringDato,
  useBrukerregistreringData,
} from "../../contexts/brukerregistrering";
import { motestotteLenke } from "../../innhold/lenker";
import { loggAktivitet } from "../../metrics/metrics";
import { OppfolgingContext, Servicegruppe } from "../../contexts/oppfolging";
import { MotestotteContext } from "../../contexts/motestotte";
import { useBrukerinfoData } from "../../contexts/bruker-info";
import { useAmplitudeData } from "../../contexts/amplitude-context";
import { UnderOppfolgingContext } from "../../contexts/under-oppfolging";
import { BodyShort, Button, Heading, Panel } from "@navikt/ds-react";
import lagHentTekstForSprak, { Tekster } from "../../lib/lag-hent-tekst-for-sprak";
import { useSprakValg } from "../../contexts/sprak";

const LANSERINGSDATO_MOTESTOTTE = new Date("2020-03-12");

const TEKSTER: Tekster<string> = {
  nb: {
    "sykmeldt-tittel": "Du kan få mer veiledning",
    "sykmeldt-avsnitt1": "Du har svart at du trenger mer veiledning nå som retten til sykepenger nærmer seg slutten.",
    "sykmeldt-avsnitt2":
      "Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.",
    "ikkeSykmeldt-tittel": "Du kan få veiledning",
    "ikkeSykmeldt-avsnitt1": "Du har svart at du har utfordringer som hindrer deg i å søke eller være i jobb.",
    "ikkeSykmeldt-avsnitt2":
      "Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.",
  },
};

const Motestotte = () => {
  const amplitudeData = useAmplitudeData();
  const data = useBrukerregistreringData();
  const oppfolgingData = React.useContext(OppfolgingContext).data;
  const motestotteData = React.useContext(MotestotteContext).data;
  const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
  const sykmeldtStatus = erSykmeldtMedArbeidsgiver ? "sykmeldt" : "ikkeSykmeldt";
  const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
  const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(data);
  const opprettetRegistreringDato = opprettetRegistreringDatoString ? new Date(opprettetRegistreringDatoString) : null;
  const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(data)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
  const dinSituasjon = selectDinSituasjonSvar(data) || "INGEN_VERDI";
  const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

  const harGyldigMotestottebesvarelse = (): boolean => {
    if (!opprettetRegistreringDato || !motestotteData) return false;
    return opprettetRegistreringDato <= new Date(motestotteData.dato);
  };

  const kanViseKomponent =
    dinSituasjon !== "ER_PERMITTERT" &&
    oppfolgingData.servicegruppe === Servicegruppe.BKART &&
    !harGyldigMotestottebesvarelse() &&
    opprettetRegistreringDato !== null &&
    opprettetRegistreringDato >= LANSERINGSDATO_MOTESTOTTE &&
    !oppfolgingData.reservasjonKRR &&
    foreslattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING &&
    underOppfolging;

  const handleClick = () => {
    loggAktivitet({ aktivitet: "Går til møtestøtte", ...amplitudeData });
    window.location.assign(motestotteLenke);
  };

  if (!kanViseKomponent) return null;

  return (
    <Panel border className="blokk-s">
      <Heading size="medium" level="1" className="blokk-xs">
        {tekst(`${sykmeldtStatus}-tittel`)}
      </Heading>
      <BodyShort className="blokk-xs">{tekst(`${sykmeldtStatus}-avsnitt1`)}</BodyShort>
      <BodyShort className="blokk-xs">{tekst(`${sykmeldtStatus}-avsnitt2`)}</BodyShort>
      <Button variant="primary" onClick={handleClick}>
        Start
      </Button>
    </Panel>
  );
};

export default Motestotte;
