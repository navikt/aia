import * as React from "react";
import DittNAVFliser from "./components/DittnavFliser";
import "./css/generelle-fliser.css";
import { UnderOppfolgingContext } from "../../contexts/under-oppfolging";
import IkkeRegistrert from "../ikke-registrert/ikke-registrert";

const GenerelleFliser = () => {
  const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
  const goto = new URLSearchParams(window.location.search).get("goTo");
  const skalTilRegistrering = goto === "registrering";

  const kanViseKomponent = !underOppfolging;

  if (!kanViseKomponent) {
    return null;
  }

  return (
    <>
      <IkkeRegistrert skalTilRegistrering={skalTilRegistrering} />
      <DittNAVFliser />
    </>
  );
};

export default GenerelleFliser;
