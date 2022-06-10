import { DataElement, STATUS } from "../ducks/api";
import { createContext, useContext } from "react";

export enum InnloggingsNiva {
  LEVEL_1 = "Level1",
  LEVEL_2 = "Level2",
  LEVEL_3 = "Level3",
  LEVEL_4 = "Level4",
  UKJENT = "Ukjent",
}

export interface State extends DataElement {
  data: Data;
}

export interface Data {
  level: InnloggingsNiva;
  authenticated: boolean;
}

export const initialState: State = {
  data: {
    level: InnloggingsNiva.UKJENT,
    authenticated: false,
  },
  status: STATUS.NOT_STARTED,
};

export const AutentiseringContext = createContext<State>(initialState);

export const useAutentiseringData = () => useContext(AutentiseringContext).data;
