import React from "react";
import { Heading, Ingress, Panel } from "@navikt/ds-react";
import "./Komponent.css";

interface Props {
  tekst: string;
}

const Komponent = ({ tekst }: Props) => {
  return (
    <div className="komponent">
      <Panel>
        <Heading size="medium">{tekst}</Heading>
      </Panel>
    </div>
  );
};

export default Komponent;
