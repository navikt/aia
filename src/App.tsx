import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { apiUrl } from "./api/urls";
import Komponent from "./components/Komponent";
import "@navikt/ds-css";
import "./App.css";

function App() {
  // const { data } = useQuery(apiUrl, fetcher);

  return (
    <main className="main">
      <div className="app">
        <Komponent tekst="ArbeibedsflateForInnloggetArbeidssøker" />
      </div>
    </main>
  );
}

export default App;
