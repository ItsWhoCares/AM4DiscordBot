const Tools = require("./RoutesFinder/Tools.js");

Tools.research({
  isReal: false,
  speedMod: true,
  departure: "SBBR",
  range: 14500,
  aircraft: "A380-800",
  flpd: null,
}).then((res) => console.log(res));
