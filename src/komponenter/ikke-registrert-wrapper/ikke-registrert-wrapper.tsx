import * as React from "react";
import { UnderOppfolgingContext } from "../../contexts/under-oppfolging";
import IkkeRegistrert from "../ikke-registrert/ikke-registrert";

const IkkeRegistrertWrapper = () => {
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
    </>
  );
};

export default IkkeRegistrertWrapper;
