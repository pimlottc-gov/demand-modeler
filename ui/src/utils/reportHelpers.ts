export const lineColors: { [s: string]: string } = {
  NY: "69ABDD",
  NJ: "EF8D3D",
  CT: "B3B3B3",
  WA: "FFD122",
  CA: "326AB6",
  LA: "81BB54",
  MA: "206391",
  DC: "9E4D00",
  MI: "646464",
  CO: "987900",
  VT: "2D4B75",
  IL: "4D6D2B",
  RI: "8CBFE3",
  NV: "F8A869",
  PA: "C7C7C7",
  GA: "FEDD4A",
  MS: "7094CC",
  DE: "A0D175",
  TN: "3B87C8",
  FL: "D0670A",
  IN: "8A8A8A",
  UT: "D2A900",
  MD: "3D63A5",
  ID: "588732",
  NH: "AED4ED",
  WI: "FFC497",
  ME: "D9D9D9",
  AL: "FDEA7B",
  SC: "A2BBE7",
  MO: "B7E29D",
  AR: "1B5577",
  MT: "7C2500",
  OH: "555455",
  WY: "816707",
  AK: "001A4C",
  AZ: "3A5B1E",
  OR: "9BC9EB",
  ND: "F9B87F",
  HI: "D1D1D2",
  IA: "FFE367",
  NM: "8BAADD",
  KS: "A9D78A",
  NC: "206CA2",
  OK: "B7590D",
  VA: "6A6C6C",
  SD: "BA9200",
  KY: "C1CDDD",
  TX: "558031",
  MN: "C0DDF4",
  WV: "FDCCA6",
  NE: "E5E5E5"
};

export const metroAreas: { area: string; fipsCodes: string[] }[] = [
  {
    area: "Seattle, WA",
    fipsCodes: ["53053", "53061", "53033"]
  },
  {
    area: "Detroit, MI",
    fipsCodes: ["26125", "26163"]
  },
  {
    area: "New York, NY",
    fipsCodes: ["36061", "34003", "36059", "36119", "36087", "34037"].reverse()
  },
  // if value = 36061 and date is note today add 36005, 36081,36047, and 36085
  {
    area: "Chicago, IL",
    fipsCodes: ["17031"]
  },
  {
    area: "New Orleans, LA",
    fipsCodes: ["22051", "22071"]
  },
  {
    area: "Los Angeles, CA",
    fipsCodes: ["06111", "06071", "06059", "06065", "06037"]
  }
];
