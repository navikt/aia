import sjekkOmBrukerErStandardInnsatsgruppe from "../../lib/er-standard-innsatsgruppe";
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from "../../lib/er-situasjonsbestemt-innsatsgruppe";
import { useBrukerregistreringData } from "../../contexts/brukerregistrering";
import Kortbunke from "./StandardKortbunke";
import SituasjonsbestemtKortbunke from "./SituasjonsbestemtKortbunke";
import { kanViseOnboarding14A } from "../../lib/kan-vise-onboarding14a";
import { useOppfolgingData } from "../../contexts/oppfolging";
import { useBrukerinfoData } from "../../contexts/bruker-info";
import finnKvitteringstype from "../../lib/finn-kvitteringstype";
import BehovsvurderingKvittering from "../kvitteringer/behovsvurdering";
import { useState, useEffect } from "react";

function Onboarding14a(): JSX.Element | null {
  const registreringData = useBrukerregistreringData();
  const oppfolgingData = useOppfolgingData();
  const brukerInfoData = useBrukerinfoData();
  const [kvittering, setKvittering] = useState("");
  const [visKvittering, setVisKvittering] = useState<boolean>(finnKvitteringstype(kvittering) === "behovsvurdering");

  const brukerregistreringData = registreringData?.registrering ?? null;
  const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
  const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
    brukerregistreringData,
    oppfolgingData,
  });

  const kanViseSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe;

  const kanViseKomponent = kanViseOnboarding14A({
    oppfolgingData,
    brukerInfoData,
    registreringData,
  });

  useEffect(() => {
    setKvittering(new URLSearchParams(window.location.search).get("visKvittering") || "");
  }, []);

  useEffect(() => {
    setVisKvittering(finnKvitteringstype(kvittering) === "behovsvurdering");
  }, [kvittering]);

  if (!kanViseKomponent) return null;
  if (visKvittering)
    return <BehovsvurderingKvittering kvittering={kvittering} onClose={() => setVisKvittering(false)} />;
  if (kanViseSituasjonsbestemt) return <SituasjonsbestemtKortbunke />;
  if (erStandardInnsatsgruppe) return <Kortbunke />;

  return null;
}

export default Onboarding14a;
