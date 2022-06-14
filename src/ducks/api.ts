import { contextpathDittNav, erMikrofrontend } from "../utils/app-state-utils";
// import { nanoid } from "nanoid";
import { bakveienTilArbeidUrl, minSideProxyUrl } from "../url";

export enum STATUS {
  OK = "OK",
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
  RELOADING = "RELOADING",
  ERROR = "ERROR",
}

export interface DataElement {
  status: STATUS;
}
/*
const getCookie = (name: string) => {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match !== null ? match[1] : "";
};
*/

export const requestConfig = (): RequestInit => {
  return {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      //  NAV_CSRF_PROTECTION: getCookie("NAV_CSRF_PROTECTION"),
      //  "NAV-Consumer-Id": "veientilarbeid",
      //  "NAV-Call-Id": nanoid(),
    },
  };
};

const contextpath = erMikrofrontend() ? contextpathDittNav : "";
const MELDEKORT_URL = `/meldekort/meldekort-api/api`;
export const AUTH_URL = `${minSideProxyUrl}/login/status`,
  VEILARBOPPFOLGING_URL = `${bakveienTilArbeidUrl}/oppfolging`,
  UNDER_OPPFOLGING_URL = `${bakveienTilArbeidUrl}/underoppfolging`,
  BRUKERINFO_URL = `${bakveienTilArbeidUrl}/startregistrering`,
  BRUKERREGISTRERING_URL = `${bakveienTilArbeidUrl}/registrering`,
  ULESTEDIALOGER_URL = `${bakveienTilArbeidUrl}/dialog/antallUleste`,
  EGENVURDERINGBESVARELSE_URL = `${bakveienTilArbeidUrl}/vedtakinfo/besvarelse`,
  FEATURE_URL = `${bakveienTilArbeidUrl}/unleash`,
  MOTESTOTTE_URL = `${bakveienTilArbeidUrl}/vedtakinfo/motestotte`,
  NESTE_MELDEKORT_URL = `${MELDEKORT_URL}/person/meldekort`,
  PAABEGYNTE_SOKNADER_URL = `${contextpath}/saksoversikt-api/tjenester/saker/hentPaabegynteSoknader`,
  SAKSTEMA_URL = `${contextpath}/saksoversikt-api/tjenester/sakstema`,
  DP_INNSYN_URL = `${bakveienTilArbeidUrl}/dagpenger`,
  MELDEKORTSTATUS_URL = `${MELDEKORT_URL}/person/meldekortstatus`;
