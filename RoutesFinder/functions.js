// import AirportData from "./AirportData.json" assert { type: "json" };
// import AirportID from "./AirportID.json" assert { type: "json" };
// // const { Airport, Plane, Cargo } = require("./classes.js");
// import { Airport, Plane, Cargo } from "./classes.js";

// import AircraftData from "./AircraftData.json" assert { type: "json" };
// import AircraftID from "./AircraftID.json" assert { type: "json" };

const { Airport, Plane, Cargo } = require("./classes.js");
const AirportData = require("./AirportData.json");
const AirportID = require("./AirportID.json");
const AircraftData = require("./AircraftData.json");
const AircraftID = require("./AircraftID.json");
const CargoData = require("./CargoData.json");
const CargoID = require("./CargoID.json");

const fetch = require("node-fetch");

let allRoutes = {};

const Func = {
  distance: (lat1, lon1, lat2, lon2) => {
    function degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }
    var earthRadiusKm = 6371;
    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  },
  flpd: (speed, distance) => {
    return Math.floor(24 / (distance / speed));
  },
  mod: (ac, sm, fm, qm) => {
    if (sm) {
      ac.speed = Math.round(ac.speed * 1.1);
    }
    if (fm) {
      ac.fConsmp = Math.round(ac.fConsmp * 0.9 * 100) / 100;
    }
    if (qm) {
      ac.cConsmp = Math.round(ac.cConsmp * 0.9 * 100) / 100;
    }
    return ac;
  },
  cargoTraining: (query) => {
    switch (query) {
      case 0:
        return 1;
      case 1:
        return 1.01;
      case 2:
        return 1.02;
      case 3:
        return 1.03;
      case 4:
        return 1.04;
      case 5:
        return 1.05;
      case 6:
        return 1.06;
      default:
        return 1;
    }
  },
  cn: (query) => {
    return query.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  addDollar: (query) => {
    return query.substring(0, 2) + "$" + query.substring(2);
  },
  getCargoUnit: (capacity) => {
    if (capacity > 700) return " kg/1k/km";
    else return " kg/p/km";
  },
  compGetColor: (data, isHighGood) => {
    if (data.includes("+ 0") || data.includes("- 0")) return "#28a745";
    if (data.includes("-")) {
      if (isHighGood) return "#dc3545";
      else if (!isHighGood) return "#28a745";
    } else if (data.includes("+")) {
      if (isHighGood) return "#28a745";
      else if (!isHighGood) return "#dc3545";
    }
  },
  compGetColor2: (data, isHighGood) => {
    if (data == "+ 0" || data == "- 0") return "#28a745";
    if (data.includes("-")) {
      if (isHighGood) return "#dc3545";
      else if (!isHighGood) return "#28a745";
    } else if (data.includes("+")) {
      if (isHighGood) return "#28a745";
      else if (!isHighGood) return "#dc3545";
    }
  },
  getRelation: (val1, val2) => {
    if (val1 < 0 && val2 > 0) return "∞ ";
    if (val1 > 0 && val2 < 0) return "∞ ";
    return Math.round((val1 / val2) * 1000) / 1000;
  },
  data: {
    set: {
      airport: () => {
        if (Storage) {
          if (localStorage.getItem("apt") == null) {
            let e = document.createElement("script");
            e.src = "airportdata/database.js";
            document.body.appendChild(e);
          } else AirportData = JSON.parse(localStorage.getItem("apt"));
        } else {
          let e = document.createElement("script");
          e.src = "airportdata/database.js";
          document.body.appendChild(e);
        }
      },
      airportID: () => {
        if (Storage) {
          if (localStorage.getItem("aptID") == null) {
            let e = document.createElement("script");
            e.src = "airportdata/id.js";
            document.body.appendChild(e);
          } else AirportID = JSON.parse(localStorage.getItem("aptID"));
        } else {
          let e = document.createElement("script");
          e.src = "airportdata/id.js";
          document.body.appendChild(e);
        }
      },
      plane: () => {
        if (Storage) {
          if (localStorage.getItem("plane-a") == null) {
            let e = document.createElement("script");
            e.src = "aircraftdata/database.js";
            document.body.appendChild(e);
          } else AircraftData = JSON.parse(localStorage.getItem("plane-a"));
          localStorage.removeItem("plane");
        } else {
          let e = document.createElement("script");
          e.src = "aircraftdata/database.js";
          document.body.appendChild(e);
        }
      },
      planeID: () => {
        if (Storage) {
          if (localStorage.getItem("planeID-a") == null) {
            let e = document.createElement("script");
            e.src = "aircraftdata/id.js";
            document.body.appendChild(e);
          } else AircraftID = JSON.parse(localStorage.getItem("planeID-a"));
          localStorage.removeItem("planeID");
        } else {
          let e = document.createElement("script");
          e.src = "aircraftdata/id.js";
          document.body.appendChild(e);
        }
      },
      cargo: () => {
        if (Storage) {
          if (localStorage.getItem("cargo") == null) {
            let e = document.createElement("script");
            e.src = "cargodata/database.js";
            document.body.appendChild(e);
          } else CargoData = JSON.parse(localStorage.getItem("cargo"));
        } else {
          let e = document.createElement("script");
          e.src = "cargodata/database.js";
          document.body.appendChild(e);
        }
      },
      cargoID: () => {
        if (Storage) {
          if (localStorage.getItem("cargoID") == null) {
            let e = document.createElement("script");
            e.src = "cargodata/id.js";
            document.body.appendChild(e);
          } else CargoID = JSON.parse(localStorage.getItem("cargoID"));
        } else {
          let e = document.createElement("script");
          e.src = "cargodata/id.js";
          document.body.appendChild(e);
        }
      },
    },
    get: {
      //get airport objects in tools
      airport: (query) => {
        // console.log(query.toLowerCase());
        let data = AirportData[AirportID[Func.data.checkQuery(query)]];
        if (!data) return false;
        return new Airport(
          query,
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7]
        );
      },
      plane: (query) => {
        let data = AircraftData[AircraftID[query.toLowerCase()]];
        if (!data) return false;
        return new Plane(
          query,
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          Func.data.getCompany(data[10]),
          data[11]
        );
      },
      cargo: (query) => {
        let data = CargoData[CargoID[query.toLowerCase()]];
        if (!data) return false;
        return new Cargo(
          query,
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          Func.data.getCompany(data[10]),
          data[11]
        );
      },
      paxcargo: (query) => {
        let data = AircraftData[AircraftID[query.toLowerCase()]];
        if (!data) data = CargoData[CargoID[query.toLowerCase()]];
        if (!data) return false;
        return new Plane(
          query,
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          Func.data.getCompany(data[10]),
          data[11]
        );
      },
      paxcargoID: (query) => {
        let data = AircraftData[query];
        if (query > 325) query -= 325;
        if (!data) data = CargoData[query];
        if (!data) return false;
        return new Plane(
          query,
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          Func.data.getCompany(data[10]),
          data[11]
        );
      },
    },
    autocomplete: {
      apt: {
        ia: () => {
          let i = 0,
            x,
            y = [];
          while (i < 4000) {
            x = AirportData[i];
            if (x != null) {
              y.push(x[5]);
            }
            i++;
          }
          return y;
        },
        ic: () => {
          let i = 0,
            x,
            y = [];
          while (i < 4000) {
            x = AirportData[i];
            if (x != null) {
              y.push(x[6]);
            }
            i++;
          }
          return y;
        },
        nm: () => {
          let i = 0,
            x,
            y = [];
          while (i < 4000) {
            x = AirportData[i];
            if (x != null) {
              y.push(`${x[4]}, ${x[3]}`);
            }
            i++;
          }
          return y;
        },
      },
      ac: () => {
        let i = 0,
          x,
          y = [];
        while (i < 340) {
          x = AircraftData[i];
          if (x != null) {
            if (y.includes(x[9])) console.log(i);
            y.push(x[9]);
          }
          i++;
        }
        return y;
      },
    },
    checkQuery: (query) => {
      if (query.includes(", ")) {
        return query.toLowerCase();
      }
      return query.toUpperCase();
    },
    getCompany: (query) => {
      switch (query) {
        case 1:
          return "Aerospatiale";
        case 2:
        case "Airbus":
          return "Airbus";
        case 3:
        case "Antonov":
          return "Antonov";
        case 4:
          return "Beechcraft";
        case 5:
        case "Boeing":
          return "Boeing";
        case 6:
          return "Bombardier";
        case 7:
          return "British Aerospace";
        case 8:
          return "Cessna";
        case 9:
          return "Comac";
        case 10:
          return "Embraer";
        case 11:
          return "Fokker";
        case 12:
        case "Ilyushin":
          return "Ilyushin";
        case 13:
          return "Lockheed";
        case 14:
        case "McDonnell Douglas":
          return "McDonnell Douglas";
        case 15:
          return "Saab";
        case 16:
          return "Sud Aviation";
        case 17:
          return "Sukhoi";
        case 18:
          return "Tupolev";
        case 19:
          return "Dornier";
        case 20:
          return "Martin";
        case 21:
          return "Vickers";
        case 22:
          return "Convair";
        case 23:
          return "Dassault Aviation";
        case 24:
          return "Mitsubishi";
        case 25:
          return "Irkut";
        default:
          return "An error occured.";
      }
    },
  },
  api: {
    planeID: async (query) => {
      let url = `https://www.airline4.net/api/aircraft/search?access_token=&type=pax&mode=normal&model=${query.toLowerCase()}`;
      const baseUrl = "https://api.am4help.com";
      const endpoint = "/aircraft/search";

      const parameters = new URLSearchParams();
      parameters.append("type", "pax");
      parameters.append("mode", "normal");
      parameters.append("model", query.toLowerCase());

      const requestOptions = {
        headers: {
          "x-access-token":
            "g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H",
          "Access-Control-Allow-Origin": "*",
        },
      };

      let res = await fetch(
        baseUrl + endpoint + "?" + parameters,
        requestOptions
      ).then((response) => response.json());
      if (res.status.request != "success") {
        return { status: status };
      }
      return res;
    },
    player: async (query, searchType) => {
      let url = `https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&${searchType}=${query}`;
      let { status, user, share_development, awards, fleet } = await fetch(
        url
      ).then((response) => response.json());
      if (status.request != "success") {
        return { status: status };
      }
      let obj = {
        status: status,
        user: user,
        share: share_development,
        awards: awards,
        fleet: fleet,
      };
      return obj;
    },
    alliance: async (query) => {
      let url = `https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&search=${query}`;
      let { status, alliance, members } = await fetch(url).then((response) =>
        response.json()
      );
      if (status.request != "success") {
        return { status: status };
      }
      let obj = {
        status: status,
        alliance: alliance[0],
        members: members,
      };
      return obj;
    },
    researchFetch: async (dep, rwy, maxDist, minDist) => {
      // console.log(dep, AircraftData[AircraftID[dep]][6], "hehe");
      let res = [];
      try {
        // let url = `https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&fields=research&dep_icao=${dep}&min_runway=${rwy}&max_distance=${i}`
        let url = `https://cdn.jsdelivr.net/gh/itswhocares/temp@master/${dep}.json`;
        let { status, route } = await fetch(url).then((response) => {
          const res = response.json();
          return res;
        });
        if (status.request != "success") {
          return [false, status.description];
        }
        res = res.concat(route.data);
      } catch (err) {
        console.log(dep);
        throw "Invalid ICAO OR Hub Data not aviailable";
      }

      //console.log("this")
      //console.log(res, "this")
      res = res.filter((a) => a.runway >= rwy);
      res = res.filter((a) => a.distance <= maxDist);
      //res = allRoutes[dep].route.data
      //console.log(res, "this")
      res.forEach((a) => {
        a["cargo_large_demand"] /= 1000;
        a["cargo_heavy_demand"] /= 1000;
      });
      //console.log(res);

      return [{ status: true, route: res }];
    },
    research: async (dep, rwy, dist) => {
      //allRoutes = await fetch("https://cdn.jsdelivr.net/gh/itswhocares/AM4BOT@latest/allRoutes.json")
      //allRoutes = await allRoutes.json()
      return Func.api.researchFetch(dep, rwy, dist, dist);
      // let url = `https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&fields=research&dep_icao=${dep}&min_runway=${rwy}&max_distance=${dist}`
      // let url2 = `https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&fields=research&dep_icao=${dep}&min_runway=${rwy}&max_distance=${dist-100}`
      // let { status, route } = await fetch(url).then(response => response.json())
      // if(status.request != 'success') {
      //     return [false, status.description]
      // }
      // let hehe = await fetch(url2).then(response => response.json())
      // console.log(hehe)
      // if(hehe.status.request != 'success') {
      //     return [false, status2.description]
      // }

      // let obj = [{ status: status, route: route.data}]
      // let obj2= [{status: hehe.status, route: hehe.route.data}]
      // //return obj
      // let res = [{status: status, route: route.data.concat(hehe.route.data)}]
      // return res;
    },
    route: async (dep, arr) => {
      let url = `https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&fields=demand&dep_icao=${dep}&arr_icao=${arr}`;
      let { status, route, demand } = await fetch(url).then((response) =>
        response.json()
      );
      if (status.request != "success") {
        return { status: status };
      }
      let obj = {
        status: status,
        dist: route.distance,
        route: route,
        y: demand.economy_class_demand,
        j: demand.business_class_demand,
        f: demand.first_class_demand,
        l: demand.cargo_large_demand,
        h: demand.cargo_heavy_demand,
      };
      return obj;
    },
  },
  error: {
    check: (obj, errMsg) => {
      let i = 0;
      while (i < obj[1].length) {
        if (obj[1][i] == errMsg) {
          return true;
        }
        i++;
      }
      return false;
    },
  },
  user: {
    icia: () => {
      if (Storage) {
        let a = localStorage.getItem("aptautocomplete");
        if (a != null) {
          return a;
        }
        return "City NameICAOIATA";
      } else return "City NameICAOIATA";
    },
    map: () => {
      if (Storage) {
        if ($("#settings-map-1")[0].checked)
          localStorage.setItem("map", "light");
        else localStorage.setItem("map", "dark");
      }
    },
  },
  img: {
    y: '<img src="assets@V2.1/images/other/economy.png" class="tool-icon">',
    j: '<img src="assets@V2.1/images/other/business.png" class="tool-icon">',
    f: '<img src="assets@V2.1/images/other/first.png" class="tool-icon">',
    h: '<i class="glyphicons glyphicons-cargo i-col-cred"></i>',
    l: '<i class="glyphicons glyphicons-cargo i-col-cyellow"></i>',
    f_low:
      '<img src="assets@V2.1/images/other/first.png" class="tool-icon" style="height: 16px">',
  },
};

module.exports = Func;
