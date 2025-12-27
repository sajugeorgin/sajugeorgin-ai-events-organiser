export type GBState = {
  name: string;
  isoCode: string;
  countryCode: "GB";
  latitude: string;
  longitude: string;
};

export const GB_STATES: GBState[] = [
  {
    name: "England",
    isoCode: "ENG",
    countryCode: "GB",
    latitude: "52.35551770",
    longitude: "-1.17431970",
  },
  {
    name: "Scotland",
    isoCode: "SCT",
    countryCode: "GB",
    latitude: "56.49067120",
    longitude: "-4.20264580",
  },
  {
    name: "Wales",
    isoCode: "WLS",
    countryCode: "GB",
    latitude: "52.13066070",
    longitude: "-3.78371170",
  },
  {
    name: "Northern Ireland",
    isoCode: "NIR",
    countryCode: "GB",
    latitude: "54.78771490",
    longitude: "-6.49231450",
  },
];
