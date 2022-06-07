import Startkort from "./Startkort";
import Kortliste from "./Kortliste";
import EngelskKortliste from "./en/Kortliste";
import Sluttkort from "./Sluttkort";
import { Sprak } from "../../../contexts/sprak";

const lagStandardinnsatsKort = (sprak: Sprak): [() => JSX.Element, JSX.Element[], () => JSX.Element] => {
  if (sprak === "en") {
    return [Startkort, EngelskKortliste, Sluttkort];
  }

  return [Startkort, Kortliste, Sluttkort];
};

export default lagStandardinnsatsKort;
