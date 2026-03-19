const BASE_URL = "https://www.google.com/_/FlightsFrontendUi/data/batchexecute";

interface AutocompleteOptions {
  query: string;
  hl?: string; // language, e.g. "en"
  gl?: string; // country, e.g. "IN", "US"
}



export async function fetchFlightsAutocomplete(options: AutocompleteOptions) {
  const { query, hl = "en", gl = "US" } = options;

  // The f.req body — JSPB encoded request
  // [["H028ib", "[\"<QUERY>\",[1,2,3,5],null,[2],1]", null, "generic"]]
  const innerPayload = JSON.stringify([query, [1, 2, 3, 5], null, [2], 1]);
  const fReq = JSON.stringify([[["H028ib", innerPayload, null, "generic"]]]);

  const params = new URLSearchParams({
    rpcids: "H028ib",
    "source-path": "/travel/flights",
    "f.sid": "-1",           // session id, -1 works fine
    bl: "boq_travel-frontend-flights-ui_20260206.02_p0",
    hl,
    gl,
    "soc-app": "162",
    "soc-platform": "1",
    "soc-device": "1",
    _reqid: String(Math.floor(Math.random() * 900000) + 100000),
    rt: "c",
  });

  const url = `${BASE_URL}?${params.toString()}`;

  const body = new URLSearchParams({ "f.req": fReq });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Accept": "*/*",
      "Accept-Language": "en-GB,en;q=0.9",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const text = await response.text();
  return text // our parser from before
}


// ── Usage ──────────────────────────────────────────────────────────────────
const results = await fetchFlightsAutocomplete({ query: "N", gl: "US" });
console.log(results);