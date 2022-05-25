import { useQuery } from "react-query";
import { fetcher } from "./api/api";
import { apiUrl } from "./api/urls";
import Komponent from "./components/Komponent";
import "@navikt/ds-css";
import "./App.css";

function App() {
  // const { data } = useQuery(apiUrl, fetcher);

  return (
    <div className="arbeidsflate-for-innlogget-arbeidssoker">
      <Komponent tekst="Arbeidsdflate for innlogget arbeidssøker 🎉" />
    </div>
  );
}

export default App;
