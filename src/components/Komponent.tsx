import React from "react";
import { Ingress, Panel } from "@navikt/ds-react";
import "./Komponent.css";

interface Props {
  tekst: string;
}

const Komponent = ({ tekst }: Props) => {
  return (
    <div className="komponent">
      <Panel>
        <Ingress>{tekst}</Ingress>
      </Panel>
    </div>
  );
};

export default Komponent;
