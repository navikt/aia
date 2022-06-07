import { DataElement, STATUS } from "../ducks/api";
import { createContext, useContext } from "react";

export interface State extends DataElement {
  data: Data;
}

export interface Vedtak {
  vedtakId: string;
  fagsakId: string;
  status: string;
  datoFattet: string;
  fraDato: string;
  tilDato?: string;
}

export type Data = Vedtak[];

export const initialState: State = {
  data: [],
  status: STATUS.NOT_STARTED,
};

export const DpInnsynVedtakContext = createContext<State>(initialState);

export const useDpInnsynVedtakData = () => useContext(DpInnsynVedtakContext).data;
