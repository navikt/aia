const isProduction = window.location.href.includes("www.intern.nav.no");
const isDevelopment = window.location.href.includes("arbeid.dev.nav.no");

const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }

  return "local";
};

const BAKVEIENTILARBEID_URL = {
  local: 'http://localhost:3000/bakveientilarbeid',
  development: 'https://arbeid.dev.nav.no/bakveientilarbeid',
  production: 'https://www.nav.no/bakveientilarbeid',
};

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://person.dev.nav.no/tms-min-side-proxy",
  production: "https://person.intern.nav.no/tms-min-side-proxy",
};

const MINE_DAGPENGER_URL = {
  local: 'https://localhost:3000/arbeid/dagpenger/mine-dagpenger',
  development: 'https://arbeid.dev.nav.no/arbeid/dagpenger/mine-dagpenger',
  production: 'https://www.nav.no/arbeid/dagpenger/mine-dagpenger',
};

export const bakveienTilArbeidUrl = BAKVEIENTILARBEID_URL[getEnvironment()];
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const mineDagpengerUrl = MINE_DAGPENGER_URL[getEnvironment()];
