var AirportAutocomplete = false,
  AircraftAutocomplete = false,
  CargoAutocomplete = false;
class Airport {
  constructor(ref, lat, lon, market, country, name, ia, ic, rwy) {
    this.ref = ref;
    this.lat = lat;
    this.lon = lon;
    this.m = market;
    this.c = country;
    this.n = name;
    this.ia = ia;
    this.ic = ic;
    this.r = rwy;
  }
}
class Plane {
  constructor(
    ref,
    speed,
    cap,
    rwy,
    mCost,
    range,
    fConsmp,
    cConsmp,
    mHours,
    price,
    name,
    company,
    pict
  ) {
    this.ref = ref;
    this.speed = speed;
    this.cap = cap;
    this.rwy = rwy;
    this.mC = mCost;
    this.range = range;
    this.fConsmp = fConsmp;
    this.cConsmp = cConsmp;
    this.mH = mHours;
    this.price = price;
    this.n = name;
    this.c = company;
    this.pc = pict;
  }
}
class Cargo {
  constructor(
    ref,
    speed,
    cap,
    rwy,
    mCost,
    range,
    fConsmp,
    cConsmp,
    mHours,
    price,
    name,
    company,
    pict
  ) {
    this.ref = ref;
    this.speed = speed;
    this.cap = cap;
    this.rwy = rwy;
    this.mC = mCost;
    this.range = range;
    this.fConsmp = fConsmp;
    this.cConsmp = cConsmp;
    this.mH = mHours;
    this.price = price;
    this.n = name;
    this.c = company;
    this.pc = pict;
  }
}
// if (
//   localStorage.getItem("lang") == null ||
//   !["en", "fr", "es", "de", "hi", "cn", "kr", "pt"].includes(
//     localStorage.getItem("lang")
//   )
// ) {
//   let e = document.createElement("script");
//   e.src = "assets@V2.1/strings/en.js";
//   document.body.appendChild(e);
// } else {
//   let e = document.createElement("script");
//   e.src = `assets@V2.1/strings/${localStorage.getItem("lang")}.js`;
//   document.body.appendChild(e);
// }

module.exports = { Airport, Plane, Cargo };
