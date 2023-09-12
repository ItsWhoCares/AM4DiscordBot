console.log("local version");

console.log("local version");

const Func = require("./functions.js");
const Basics = require("./Basics.js");
const AirportData = require("./AirportData.json");
const AirportID = require("./AirportID.json");
const AircraftData = require("./AircraftData.json");
const AircraftID = require("./AircraftID.json");
const CargoData = require("./CargoData.json");
const CargoID = require("./CargoID.json");
const fetch = () => import("node-fetch");

const createOrder = (data) => {
  console.log(data);
};

const Tools = {
  pax: async () => {
    $("#execute")
      .addClass("loading-animation")
      .html(
        "<i class='extended-glyphicons glyphicons glyphicons-refresh'></i>"
      );
    let tickets, config, route, profit, stopover, demand;
    let dep = Func.data.get.airport($("#inp-dep").val());
    let arr = Func.data.get.airport($("#inp-arr").val());
    let ac = Func.data.get.plane($("#inp-ac").val());
    if (!dep) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.vdep, "#fa3737");
    }
    if (!arr) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.varr, "#fa3737");
    }
    if (!ac) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.vac, "#fa3737");
    }
    let flpd = $("#inp-flpd").val();
    let rep = $("#inp-rep").val();
    let fp = $("#inp-fp").val();
    let cp = $("#inp-cp").val();
    let mode = UI.switch("inp-mode-1");
    let sm = UI.switch("inp-sm-1");
    let fm = UI.switch("inp-fm-1");
    let qm = UI.switch("inp-qm-1");
    ac = Func.mod(ac, sm, fm, qm);
    if (!mode) {
      ac.rwy = 0;
      ac.speed = Math.round(ac.speed * 1.5);
      ac.mC = Math.round(ac.mC / 2);
    }
    route = await Func.api.route(dep.ic, arr.ic);
    if (!flpd) flpd = Func.flpd(ac.speed, route.dist);

    if (!rep) rep = 90;
    if (!fp) fp = 600;
    if (!cp) cp = 120;
    if (rep < 11)
      UI.alertBox("Reputation must be greater than 10%!", "#fa3737");
    if (flpd > Func.flpd(ac.speed, route.dist))
      UI.alertBox(
        "You can't operate the desired amount of flights!",
        "#fa3737"
      );
    if (dep.r < ac.rwy || arr.r < ac.rwy) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.rwy_short, "#fa3737");
    }
    if (mode) {
      tickets = [
        Basics.pax.ticket.realY(route.dist - 1.5),
        Basics.pax.ticket.realJ(route.dist - 1.5),
        Basics.pax.ticket.realF(route.dist - 1.5),
      ];
    } else
      tickets = [
        Basics.pax.ticket.easyY(route.dist - 1.5),
        Basics.pax.ticket.easyJ(route.dist - 1.5),
        Basics.pax.ticket.easyF(route.dist - 1.5),
      ];
    console.log(route, flpd, ac);
    config = Basics.pax.config(
      ac.cap,
      route.dist,
      flpd,
      route.y,
      route.j,
      route.f,
      mode,
      true
    );
    profit = Basics.pax.profit.specific(
      ac,
      mode,
      route.dist,
      config[0],
      config[1],
      config[2],
      fp,
      cp,
      rep,
      flpd,
      false
    );
    if (route.dist > ac.range) {
      stopover = Basics.airports.stopover(dep, arr, ac.range, ac.rwy);
    } else stopover = false;
    demand = [route.y, route.j, route.f];
    if (!config[3]) UI.alertBox(S.err.no_dem, "#fa3737");
    $("#ans-yp").text("$" + tickets[0]);
    $("#ans-jp").text("$" + tickets[1]);
    $("#ans-fp").text("$" + tickets[2]);
    $("#ans-ys").text("x " + config[0]);
    $("#ans-js").text("x " + config[1]);
    $("#ans-fs").text("x " + config[2]);
    $("#ans-pf").text("$" + Func.cn(profit[0]));
    $("#ans-pd").text("$" + Func.cn(profit[1]));
    $("#ans-ph1").text("Profit/Flight");
    $("#ans-ph2").text("Profit/Day");
    if (stopover && Func.error.check(stopover, "ERR_DESTINATION_UNREACHABLE")) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.unreachable);
    }
    if (!stopover) {
      $("#ans-t-4").hide();
    } else {
      $("#ans-t-4").show();
      $("#ans-table-box-inner-box-4 table").empty()
        .append(`<h4><span id="ans-name"></span><br><span id="ans-icia"></span></h4>
            <table style="width: 90%; max-width: 175px; margin: auto">
                <tr><td style="text-align: left"><i class="fa fa-plus"></i></td><td style="text-align: right" id="ans-exd"></td></tr>
                <tr><td style="text-align: left"><i class="extended-glyphicons glyphicons glyphicons-vector-path-curve"></i></td><td style="text-align: right" id="ans-totd"></td></tr>
            </table>`);
      $("#ans-name").text(`${stopover[0].n}, ${stopover[0].c}`);
      $("#ans-icia").text(`${stopover[0].ia} | ${stopover[0].ic}`);
      $("#ans-exd").text("+ " + stopover[0].extdist + " km");
      $("#ans-totd").text(stopover[0].dist + " km");
      // $("#ans-ph3").text("Add. Distance")
      // $("#ans-ph4").text("Total Distance")
    }
    $("#result-title").html(
      `${dep.ic} <i class="fa fa-exchange-alt"></i> ${arr.ic}`
    );
    $("#tool-inp").hide();
    $("#tool-ans").show();
    $("#execute")
      .removeClass("loading-animation")
      .html("<i class='fa fa-search'></i> Calculate!");
  },
  cargo: async () => {
    $("#execute")
      .addClass("loading-animation")
      .html(
        "<i class='extended-glyphicons glyphicons glyphicons-refresh'></i>"
      );
    let tickets, config, route, profit, stopover, demand;
    let dep = Func.data.get.airport($("#inp-dep").val());
    let arr = Func.data.get.airport($("#inp-arr").val());
    let ac = Func.data.get.cargo($("#inp-ac").val());
    let lTraining = $("#inp-lt").val(),
      hTraining = $("#inp-ht").val();
    if (!dep) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.vdep, "#fa3737");
    }
    if (!arr) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.varr, "#fa3737");
    }
    if (!ac) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.vac, "#fa3737");
    }
    let flpd = $("#inp-flpd").val();
    let rep = $("#inp-rep").val();
    let fp = $("#inp-fp").val();
    let cp = $("#inp-cp").val();
    let mode = UI.switch("inp-mode-1");
    let sm = UI.switch("inp-sm-1");
    let fm = UI.switch("inp-fm-1");
    let qm = UI.switch("inp-qm-1");
    ac = Func.mod(ac, sm, fm, qm);
    if (!mode) {
      ac.rwy = 0;
      ac.speed = Math.round(ac.speed * 1.5);
    } else ac.mC = ac.mC * 2;
    route = await Func.api.route(dep.ic, arr.ic);
    if (!flpd) flpd = Func.flpd(ac.speed, route.dist);
    if (!rep) rep = 90;
    if (!fp) fp = 600;
    if (!cp) cp = 120;
    if (rep < 11)
      UI.alertBox("Reputation must be greater than 10%!", "#fa3737");
    if (flpd > Func.flpd(ac.speed, route.dist))
      UI.alertBox(
        "You can't operate the desired amount of flights!",
        "#fa3737"
      );
    if (dep.r < ac.rwy || arr.r < ac.rwy) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.rwy_short, "#fa3737");
    }
    if (mode) {
      tickets = [
        Basics.cargo.ticket.realLarge(route.dist - 1.5),
        Basics.cargo.ticket.realHeavy(route.dist - 1.5),
      ];
    } else
      tickets = [
        Basics.cargo.ticket.easyLarge(route.dist - 1.5),
        Basics.cargo.ticket.easyHeavy(route.dist - 1.5),
      ];
    config = Basics.cargo.config(
      ac.cap,
      route.l,
      route.h,
      flpd,
      lTraining,
      hTraining,
      true
    );
    let parsedLT = Func.cargoTraining(Number(lTraining)),
      parsedHT = Func.cargoTraining(Number(hTraining));
    let lc = Math.round(ac.cap * 0.7 * parsedLT * (config[0] / 100)),
      hc = Math.round(ac.cap * parsedHT * (config[1] / 100));
    profit = Basics.cargo.profit.specific(
      ac,
      mode,
      route.dist,
      lc,
      hc,
      fp,
      cp,
      rep,
      flpd,
      false
    );
    if (route.dist > ac.range) {
      stopover = Basics.airports.stopover(dep, arr, ac.range, ac.rwy);
    } else stopover = false;
    demand = [route.l, route.h];
    if (!config[2]) UI.alertBox(S.err.no_dem, "#fa3737");
    $("#ans-lp").text("$" + tickets[0]);
    $("#ans-hp").text("$" + tickets[1]);
    $("#ans-ll").text(config[0] + "%");
    $("#ans-hl").text(config[1] + "%");
    $("#ans-pf").text("$" + Func.cn(profit[0]));
    $("#ans-pd").text("$" + Func.cn(profit[1]));
    $("#ans-ph1").text("Profit/Flight");
    $("#ans-ph2").text("Profit/Day");
    if (stopover && Func.error.check(stopover, "ERR_DESTINATION_UNREACHABLE")) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.unreachable);
    }
    if (!stopover) {
      $("#ans-t-4").hide();
    } else {
      $("#ans-t-4").show();
      $("#ans-table-box-inner-box-4 table").empty()
        .append(`<h4><span id="ans-name"></span><br><span id="ans-icia"></span></h4>
            <table style="width: 90%; max-width: 175px; margin: auto">
                <tr><td style="text-align: left"><i class="fa fa-plus"></i></td><td style="text-align: right" id="ans-exd"></td></tr>
                <tr><td style="text-align: left"><i class="extended-glyphicons glyphicons glyphicons-vector-path-curve"></i></td><td style="text-align: right" id="ans-totd"></td></tr>
            </table>`);
      $("#ans-name").text(`${stopover[0].n}, ${stopover[0].c}`);
      $("#ans-icia").text(`${stopover[0].ia} | ${stopover[0].ic}`);
      $("#ans-exd").text("+ " + stopover[0].extdist + " km");
      $("#ans-totd").text(stopover[0].dist + " km");
      // $("#ans-ph3").text("Add. Distance")
      // $("#ans-ph4").text("Total Distance")
    }
    $("#result-title").html(
      `${dep.ic} <i class="fa fa-exchange-alt"></i> ${arr.ic}`
    );
    $("#tool-inp").hide();
    $("#tool-ans").show();
    $("#execute")
      .removeClass("loading-animation")
      .html("<i class='fa fa-search'></i> Calculate!");
  },
  stopover: () => {
    let dep = Func.data.get.airport($("#inp-dep").val());
    let arr = Func.data.get.airport($("#inp-arr").val());
    let range = $("#inp-range").val();
    let rwy = $("#inp-rwy").val();
    if (!dep) return UI.alertBox(S.err.vdep, "#fa3737");
    if (!arr) return UI.alertBox(S.err.varr, "#fa3737");
    if (!range) return UI.alertBox(S.err.range, "#fa3737");
    if (!rwy) rwy = 0;
    let res = Basics.airports.stopover(dep, arr, range, rwy);
    if (
      Func.error.check(res, "ERR_DEPARTURE_RUNWAY_TOO_SHORT") ||
      Func.error.check(res, "ERR_DESTINATION_RUNWAY_TOO_SHORT")
    ) {
      return UI.alertBox(S.err.rwy_short, "#fa3737");
    }
    if (Func.error.check(res, "ERR_DIRECT_FLIGHT")) {
      return UI.alertBox(S.err.direct_flight, "#fa3737");
    }
    if (Func.error.check(res, "ERR_DESTINATION_UNREACHABLE")) {
      return UI.alertBox(S.err.unreachable, "#fa3737");
    }
    $("#ans-name").text(`${res[0].n}, ${res[0].c}`);
    $("#ans-icia").text(`${res[0].ia} | ${res[0].ic}`);
    $("#ans-exd").text("+ " + res[0].extdist + " km");
    $("#ans-totd").text(res[0].dist + " km");
    // $("#ans-ph3").text("Extra Distance")
    // $("#ans-ph4").text("Total Distance")
    $("#tool-inp").hide();
    $("#tool-ans").show();
  },
  mfind: () => {
    let dep = Func.data.get.airport($("#inp-dep").val());
    let m = $("#inp-minm").val();
    let rwy = $("#inp-rwy").val();
    if (!dep) return UI.alertBox(S.err.vdep, "#fa3737");
    if (!rwy) rwy = 0;
    let res = Basics.airports.mfind(dep, m, rwy);
    if (Func.error.check(res, "ERR_NO_RESULT")) {
      return UI.alertBox(S.err.no_result, "#fa3737");
    }
    $("#ans-nameicia").html(
      `${res[0].n}, ${res[0].c}<br>${res[0].ia} | ${res[0].ic}`
    );
    $("#ans-dist").text(Math.round(res[0].dist) + " km");
    $("#ans-pct").text(res[0].m + "%");
    $("#ans-rwy").text(res[0].r + " ft");
    $("#tool-inp").hide();
    $("#tool-ans").show();
  },
  resell: () => {
    let res = Basics.planes.resell(
      Func.data.get.plane($("#inp-ac").val()),
      $("#inp-mkt").val(),
      $("#inp-js").val(),
      $("#inp-fs").val(),
      $("#inp-fh").val()
    );
    if (res[0]) {
      $("#ans-v").text("$" + Func.cn(res[0]));
      $("#tool-inp").hide();
      $("#tool-ans").show();
    }
  },
  estimate: async () => {
    $("#execute")
      .addClass("loading-animation")
      .html(
        "<i class='extended-glyphicons glyphicons glyphicons-refresh'></i>"
      );
    let ac = Func.data.get.plane($("#inp-ac").val());
    let dep = Func.data.get.airport($("#inp-dep").val());
    let arr = Func.data.get.airport($("#inp-arr").val());
    let fh = $("#inp-fh").val();
    let fp = $("#inp-fp").val();
    let cp = $("#inp-cp").val();
    let rep = $("#inp-rep").val();
    let mode = UI.switch("inp-mode-1");
    let sm = UI.switch("inp-sm-1");
    let fm = UI.switch("inp-fm-1");
    let qm = UI.switch("inp-qm-1");
    ac = Func.mod(ac, sm, fm, qm);
    if (!ac) {
      ac = Func.data.get.cargo($("#inp-ac").val());
      if (!ac) return UI.alertBox(S.err.vac, "#fa3737");
      if (mode) ac.mC = ac.mC * 2;
    } else if (!mode) ac.mC = ac.mC / 2;
    if (!dep) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.vdep, "#fa3737");
    }
    if (!arr) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.varr, "#fa3737");
    }
    if (!fh) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Calculate!");
      return UI.alertBox(S.err.inps, "#fa3737");
    }
    if (!fp) fp = 600;
    if (!cp) cp = 120;
    if (!rep) rep = 90;
    if (rep < 11)
      UI.alertBox("Reputation must be greater than 10%!", "#fa3737");
    let route = await Func.api.route(dep.ic, arr.ic);
    let res = Basics.planes.estimation(
      dep,
      arr,
      ac,
      fh,
      route,
      mode,
      fp,
      cp,
      rep
    );
    // $("#ans-ph1").text("Estimated Profit")
    $("#ans-title-bold")[0].parentElement.colSpan = "3";
    $("#ans-ph2").text("Fuel");
    $("#ans-ph3").text("Quotas");
    $("#ans-ph4").text("Maint.");
    $("#ans-prf").text("$" + Func.cn(Math.round(res[0][0] * res[1])));
    $("#ans-f").text(Func.cn(Math.round(res[0][2] * res[1])) + " lbs");
    $("#ans-q").text(Func.cn(Math.round(res[0][4] * res[1])));
    $("#ans-m").text("$" + Func.cn(Math.round(res[0][6] * res[1])));
    $("#result-title").html(
      `${dep.ic} <i class="fa fa-exchange-alt"></i> ${arr.ic}`
    );
    $("#tool-inp").hide();
    $("#tool-ans").show();
    $("#execute")
      .removeClass("loading-animation")
      .html("<i class='fa fa-search'></i> Calculate!");
  },
  allFleet: () => {
    $("#plane-result-box").empty();
    let names = $(".plane-added-name");
    let amounts = 1;
    let i = 0,
      profit,
      easyplane,
      realplane,
      total = [0, 0];
    if (names.length != amounts.length)
      return UI.alertBox(S.err.admin_contact, "#fa3737");
    while (i < names.length) {
      easyplane = Func.data.get.paxcargo(names[i].innerHTML);
      realplane = Func.data.get.paxcargo(names[i].innerHTML);
      if (easyplane.cap > 700) realplane.mC = realplane.mC * 2;
      if (easyplane.cap < 700) easyplane.mC = easyplane.mC / 2;
      profit = [
        Basics.pax.profit.general(realplane, true),
        Basics.pax.profit.general(easyplane, false),
      ];
      if (!isNaN(profit[0]) && !isNaN(profit[1])) {
        total[0] += profit[0] * amounts[i].innerHTML;
        total[1] += profit[1] * amounts[i].innerHTML;
      }
      $("#plane-result-box").append(`
            <div class='plane-added' onclick="UI.actab.open('${easyplane.n}')">
                <div class='plane-added-1'>
                    <img src='assets@V2.1/images/ac/${
                      easyplane.pc
                    }.png' class='plane-added-1-img'>
                </div>
                <p class='plane-added-2'>
                    <b>
                        <span class='plane-added-name'>${easyplane.n}</span><br>
                        <span class='plane-added-amount'>x ${
                          amounts[i].innerHTML
                        }</span>
                    </b><br>
                    <span class='i-col-real'>${S.general.realism} $${Func.cn(
        profit[0] * amounts[i].innerHTML
      )}</span><br>
                    <span class='i-col-easy'>${S.general.easy} $${Func.cn(
        profit[1] * amounts[i].innerHTML
      )}
                </p>
            </div>`);
      i++;
    }
    $("#total-profit-realism").text(`$${Func.cn(total[0])}`);
    $("#total-profit-easy").text(`$${Func.cn(total[1])}`);
    $("#tool-inp").hide();
    $("#tool-ans").show();
  },
  fleet: () => {
    $("#plane-result-box").empty();
    let names = $(".plane-added-name");
    let amounts = $(".plane-added-amount");
    let i = 0,
      profit,
      easyplane,
      realplane,
      total = [0, 0];
    if (names.length != amounts.length)
      return UI.alertBox(S.err.admin_contact, "#fa3737");
    let mydata = [];
    while (i < names.length) {
      easyplane = Func.data.get.paxcargo(names[i].innerHTML);
      realplane = Func.data.get.paxcargo(names[i].innerHTML);
      if (easyplane.cap > 700) realplane.mC = realplane.mC * 2;
      if (easyplane.cap < 700) easyplane.mC = easyplane.mC / 2;
      profit = [
        Basics.pax.profit.general(realplane, true),
        Basics.pax.profit.general(easyplane, false),
      ];
      if (!isNaN(profit[0]) && !isNaN(profit[1])) {
        total[0] += profit[0] * amounts[i].innerHTML;
        total[1] += profit[1] * amounts[i].innerHTML;
      }
      mydata.push({ aircraft: easyplane, profit });
      $("#plane-result-box").append(`
            <div class='plane-added' onclick="UI.actab.open('${easyplane.n}')">
                <div class='plane-added-1'>
                    <img src='assets@V2.1/images/ac/${
                      easyplane.pc
                    }.png' class='plane-added-1-img'>
                </div>
                <p class='plane-added-2'>
                    <b>
                        <span class='plane-added-name'>${easyplane.n}</span><br>
                        <span class='plane-added-amount'>x ${
                          amounts[i].innerHTML
                        }</span>
                    </b><br>
                    <span class='i-col-real'>${S.general.realism} $${Func.cn(
        profit[0] * amounts[i].innerHTML
      )}</span><br>
                    <span class='i-col-easy'>${S.general.easy} $${Func.cn(
        profit[1] * amounts[i].innerHTML
      )}
                </p>
            </div>`);
      i++;
    }
    $("#total-profit-realism").text(`$${Func.cn(total[0])}`);
    $("#total-profit-easy").text(`$${Func.cn(total[1])}`);
    $("#tool-inp").hide();
    $("#tool-ans").show();
    console.log(mydata);
  },
  acs: () => {
    $("#tool-ans")
      .empty()
      .append(`${UI.create.returnButton()}<h4 id="result-title"></h4>`);
    let speed = $("#inp-speed").val();
    let cap = $("#inp-cap").val();
    let fuel = $("#inp-fuel").val();
    let co2 = $("#inp-co2").val();
    let range = $("#inp-range").val();
    let rwy = $("#inp-rwy").val();
    let cost = $("#inp-cost").val();
    if (!speed) speed = "-";
    if (!cap) cap = "-";
    if (!fuel) fuel = "-";
    if (!co2) co2 = "-";
    if (!range) range = "-";
    if (!rwy) rwy = "-";
    if (!cost) cost = "-";
    if (
      speed == cap &&
      speed == fuel &&
      speed == co2 &&
      speed == range &&
      speed == rwy &&
      speed == cost &&
      speed == "-"
    )
      return UI.alertBox(S.acs.one_filter, "#fa3737");
    let res = Basics.planes.search(speed, cap, cost, range, rwy, fuel, co2);
    if (!res) return UI.alertBox(S.err.no_result, "#fa3737");
    let i = 0;
    while (i < res.length) {
      $("#tool-ans").append(`
            <div class="acs-content" onclick="UI.actab.open('${
              res[i][4]
            }')" data-plane="${res[i][4]}" style="cursor: pointer">
                <div class="acs-image-smallscreen-box">
                    <img src="assets@V2.1/images/ac/${
                      res[i][5]
                    }.png" class="acs-image-smallscreen">
                </div>
                <div class="acs-image-normal-box">
                    <img src="assets@V2.1/images/ac/${
                      res[i][5]
                    }.png" class="acs-image-normal">
                </div>
                <div class="acs-maininfo-outer">
                    <div class="acs-maininfo-inner">
                        <div class="acs-col-data">
                            <b>${res[i][4]}</b><br>
                            <span class="acs-text">${res[i][3]} km / ${
        res[i][1]
      } kph / ${res[i][2]} pax / ${res[i][6]} lbs/km</span>
                        </div>
                        <div class="acs-col-cost">
                            <b>Cost</b><br>
                            <b class="acs-price">$${Func.cn(res[i][0])}</b>
                        </div>
                    </div>
                </div>
            </div>
            `);
      i++;
    }
    $("#result-title").text(`RESULTS: ${res.length}`);
    $("#tool-inp").hide();
    $("#tool-ans").show();
  },
  research: async ({
    isReal,
    speedMod,
    sortBy,
    departure,
    aircraft,
    range,
    flpd,
  }) => {
    aircraft = aircraft.toLowerCase();
    if (
      !AircraftData[AircraftID[aircraft.toLowerCase()]] &&
      !CargoData[CargoID[aircraft.toLowerCase()]]
    ) {
      console.log(
        AircraftData[AircraftID[aircraft]],
        CargoData[CargoID[aircraft]]
      );
      throw "Invalid aircraft";
    }
    function getTable(i) {
      if (!Air)
        if (ac.cap < 700)
          return `${UI.create.table(
            ["<i class='fa fa-ticket-alt i-col-cred'></i>", "Tickets"],
            [Func.img.y, Func.img.j, Func.img.f_low],
            [`ans-yp-${i}`, `ans-jp-${i}`, `ans-fp-${i}`],
            `ans-t-1-${i}`,
            `1-${i}`
          )}
            ${UI.create.table(
              ["<i class='fa fa-couch i-col-0c0'></i>", "Configuration"],
              [Func.img.y, Func.img.j, Func.img.f_low],
              [`ans-ys-${i}`, `ans-js-${i}`, `ans-fs-${i}`],
              `ans-t-2-${i}`,
              `2-${i}`
            )}
            ${UI.create.table(
              [
                "<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i>",
                "Profit",
              ],
              [
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
              ],
              [`ans-ph1-${i}`, `ans-pf-${i}`, `ans-ph2-${i}`, `ans-pd-${i}`],
              `ans-t-3-${i}`,
              `3-${i}`
            )}
            ${UI.create.table(
              ["<i class='fa fa-plane-arrival i-col-107'></i>", "Stopover"],
              [
                '<i class="fa fa-plane-arrival i-col-999"></i>',
                '<i class="fa fa-plane-arrival i-col-999"></i>',
                '<i class="fa fa-plus-square i-col-107"></i>',
                '<i class="fa fa-plus-square i-col-107"></i>',
                '<i class="fa fa-globe i-col-107"></i>',
                '<i class="fa fa-globe i-col-107"></i>',
              ],
              [
                `ans-name-${i}`,
                `ans-icia-${i}`,
                `ans-ph3-${i}`,
                `ans-exd-${i}`,
                `ans-ph4-${i}`,
                `ans-totd-${i}`,
              ],
              `ans-t-4-${i}`,
              `4-${i}`
            )}`;
      if (ac.cap > 700)
        return `${UI.create.table(
          ["<i class='fa fa-ticket-alt i-col-cred'></i>", "Tickets"],
          [Func.img.l, Func.img.h],
          [`ans-lp-${i}`, `ans-hp-${i}`],
          `ans-t-1-${i}`,
          `1-${i}`
        )}
            ${UI.create.table(
              ["<i class='fa fa-couch i-col-0c0'>", "Configuration"],
              [Func.img.l, Func.img.h],
              [`ans-ll-${i}`, `ans-hl-${i}`],
              `ans-t-2-${i}`,
              `2-${i}`
            )}
            ${UI.create.table(
              [
                "<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i>",
                "Profit",
              ],
              [
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
                '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>',
              ],
              [`ans-ph1-${i}`, `ans-pf-${i}`, `ans-ph2-${i}`, `ans-pd-${i}`],
              `ans-t-3-${i}`,
              `3-${i}`
            )}
            ${UI.create.table(
              ["<i class='fa fa-plane-arrival i-col-107'></i>", "Stopover"],
              [
                '<i class="fa fa-plane-arrival i-col-999"></i>',
                '<i class="fa fa-plane-arrival i-col-999"></i>',
                '<i class="fa fa-plus-square i-col-107"></i>',
                '<i class="fa fa-plus-square i-col-107"></i>',
                '<i class="fa fa-globe i-col-107"></i>',
                '<i class="fa fa-globe i-col-107"></i>',
              ],
              [
                `ans-name-${i}`,
                `ans-icia-${i}`,
                `ans-ph3-${i}`,
                `ans-exd-${i}`,
                `ans-ph4-${i}`,
                `ans-totd-${i}`,
              ],
              `ans-t-4-${i}`,
              `4-${i}`
            )}`;
    }

    let dep = Func.data.get.airport(departure);
    //console.log(dep, departure);
    //console.log($("#inp-dep").val())
    let ac = Func.data.get.paxcargo(aircraft);
    let acid = {
      "MC-21-400": 344,
      "B727-100": 336,
      "IL-96-400": 258,
      "DC-9-10": 212,
      "Global 7500": 341,
      "A380-800": 2,
      "B747-8": 35,
      "B747-400D": 69,
    };
    let acname = {
      "DC-9-10": "DC",
      "MC-21-400": "MC",
      "B727-100": "B2",
      "IL-96-400": "IL",
      "Global 7500": "G7",
      "A380-800": "A3",
      "B747-8": "B8",
      "B747-400D": "B4",
    };
    let apname = {
      "Bangalore, India": "BA",
      "Dubai, United Arab Emirates": "DU",
      "Caracas, Venezuela": "CV",
      "Dallas-Fort Worth, United States": "DA",
      "New York John F. Kennedy, United States": "NY",
      "London Heathrow Intl, United Kingdom": "LH",
      "Addis Ababa, Ethiopia": "AA",
      "Phoenix Int, United States": "PI",
      SBGR: "SB",
      "Tarawa, Kiribati": "TK",
      "New Delhi, India": "ND",
      LOWW: "AV",
      SBBR: "SR",
    };
    let hubID = {
      "Bangalore, India": "6729176",
      "Dubai, United Arab Emirates": "6962617",
      "Caracas, Venezuela": "6992139",
      "Dallas-Fort Worth, United States": "7012340",
      "New York John F. Kennedy, United States": "",
      "London Heathrow Intl, United Kingdom": "7013457",
      "Addis Ababa, Ethiopia": "7043052",
      "Phoenix Int, United States": "7045391",
      SBGR: "7079820",
      "New Delhi, India": "6923722",
      LOWW: "7156637",
      SBBR: "7278739",
    };
    let engineID = {
      "IL-96-400": 251,
      "MC-21-400": 312,
      "Global 7500": 319,
      "A380-800": 7,
      "B747-8": 50,
      "B747-400D": 90,
    };

    //console.log(acid[$('#inp-ac').val()], ac, apname[$("#inp-dep").val()]);
    let dist = range;
    let rwy = ac.rwy;
    let mode = isReal;
    let sm = speedMod;
    let filterByTotal = true;
    ac = Func.mod(ac, sm, false, false);
    //console.log(ac)
    if (!dist) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Search!");
      return UI.alertBox(S.err.inps, "#fa3737");
    }
    if (dist < 500) {
      throw "Minimum Distance is 500 km";
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Search!");
      return UI.alertBox(S.err.dist_min_500, "#fa3737");
    }
    if (dist > ac.range) {
      throw "Step Over Currently Not Supported";
    }
    if (dist > ac.range * 2) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Search!");
      return UI.alertBox(S.err.no_possible_result, "#fa3737");
    }
    if (rwy > 16000) rwy = 0;
    if (!mode) {
      if (ac.cap < 700) {
        ac.mC = ac.mC / 2;
      }
      ac.speed = Math.round(ac.speed * 1.5);
      ac.rwy = 0;
    } else {
      if (ac.cap > 700) {
        ac.mC = ac.mC * 2;
      }
    }
    if (dep.r < ac.rwy) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Search!");
      return UI.alertBox(S.err.dep_rwy_short, "#fa3737");
    }
    let data = await Func.api.research(dep.ic, rwy, dist);
    if (!data[0]) {
      //   $("#execute")
      //     .removeClass("loading-animation")
      //     .html("<i class='fa fa-search'></i> Search!");
      //   return UI.alertBox(S.err.no_result, "#fa3737");
    }
    data = data[0];
    let totalDemandArray = [];
    //console.log(data)
    // console.log(data);
    for (let e of data.route) {
      if (ac.cap < 700) {
        if (filterByTotal)
          totalDemandArray.push([
            e.economy_class_demand +
              e.business_class_demand * 2 +
              e.first_class_demand * 3,
            e.iata,
            e.economy_class_demand,
            e.business_class_demand,
            e.first_class_demand,
            e.cargo_large_demand,
            e.cargo_heavy_demand,
          ]);
        else
          totalDemandArray.push([
            e.first_class_demand * 3,
            e.iata,
            e.economy_class_demand,
            e.business_class_demand,
            e.first_class_demand,
            e.cargo_large_demand,
            e.cargo_heavy_demand,
          ]);
      } else {
        if (filterByTotal)
          totalDemandArray.push([
            e.cargo_large_demand * 1.428 + e.cargo_heavy_demand,
            e.iata,
            e.economy_class_demand,
            e.business_class_demand,
            e.first_class_demand,
            e.cargo_large_demand,
            e.cargo_heavy_demand,
          ]);
        else
          totalDemandArray.push([
            e.cargo_large_demand,
            e.iata,
            e.economy_class_demand,
            e.business_class_demand,
            e.first_class_demand,
            e.cargo_large_demand,
            e.cargo_heavy_demand,
          ]);
      }
    }
    totalDemandArray.sort(function (a, b) {
      return b[0] - a[0];
    });
    let i = 0,
      airportObject,
      specificData,
      fl = flpd,
      routeDistance;
    //console.log(totalDemandArray);
    let count = 0;
    let income = 0;
    let prev = 0;
    let saveData = [];
    while (i < totalDemandArray.length) {
      fl = flpd;
      airportObject = Func.data.get.airport(totalDemandArray[i][1]);
      if (prev == airportObject.ic) {
        i++;
        continue;
      } else {
        prev = airportObject.ic;
      }
      routeDistance = Func.distance(
        airportObject.lat,
        airportObject.lon,
        dep.lat,
        dep.lon
      );
      if (!fl || fl > Func.flpd(ac.speed, routeDistance))
        fl = Func.flpd(ac.speed, routeDistance);
      specificData = Tools.detailedRoute(
        totalDemandArray[i][2],
        totalDemandArray[i][3],
        totalDemandArray[i][4],
        totalDemandArray[i][5] * 1000,
        totalDemandArray[i][6] * 1000,
        routeDistance,
        ac,
        mode,
        dep,
        airportObject,
        fl
      );
      //console.log(specificData);
      // let minProfit = {
      //   "Global 7500": 10000,
      //   "Global 8000": 10000,
      //   "A380-800": 8000000,
      //   "MC-21-400": 4000000,
      //   "IL-96-400": 4600000,
      //   "B747-8": 6600000,
      //   "B747-400D": 7400000,
      // };
      let isCargo = ac.cap > 700;
      if (isCargo) throw "Cargo Not Supported";
      if (!isCargo) {
        if (!specificData[1][3]) {
          i++;
          continue;
        }
      } else {
        if (!specificData[1][2]) {
          i++;
          continue;
        }
      }

      // if (fl < flpd) {
      //   i++;
      //   continue;
      // }

      income += specificData[2][1];
      count++;
      //console.log(specificData[1])
      // let g = {
      //   from_ic: departure,
      //   to_ic: airportObject.ic,
      //   airport: airportObject.n + ", " + airportObject.c,
      //   seatLayout: specificData[1],
      //   seatPrice: specificData[0],
      //   profit: specificData[2],
      //   distance: Func.cn(
      //     Math.round(
      //       Func.distance(
      //         airportObject.lat,
      //         airportObject.lon,
      //         dep.lat,
      //         dep.lon
      //       )
      //     )
      //   ),
      //   //"orderLink": `https://www.airlinemanager.com/ac_order_do.php?id=${acid[$('#inp-ac').val()]}&hub=${$('#inp-dep').val()}&e=${specificData[1][0]}&b=${specificData[1][1]}&f=${specificData[1][2]}&r=placeholder%20${acname[$('#inp-ac').val()]}%20${airportObject.ic}&engine=${engineID[$('#inp-ac').val()]}&amount=1&charter=0&fbSig=false`

      //   orderLink: `https://www.airlinemanager.com/ac_order_do.php?id=${acid[aircraft]}&hub=${hubID[departure]}&e=${specificData[1][0]}&b=${specificData[1][1]}&f=${specificData[1][2]}&r=${apname[departure]}%20${acname[aircraft]}%20${airportObject.ic}&engine=${engineID[aircraft]}&amount=1&charter=0&fbSig=false`,
      // };
      let ddp = AirportData[AirportID[departure]];
      // console.log(ddp);
      let g = {
        to: airportObject.n + ", " + airportObject.c,
        from: ddp[4] + ", " + ddp[3],
        flpd: fl,
        aircraft: aircraft.toUpperCase(),
        routeDemand: totalDemandArray[i],
        seatLayout: specificData[1],
        seatPrice: specificData[0],
        profit: specificData[2],
        distance: Func.cn(
          Math.round(
            Func.distance(
              airportObject.lat,
              airportObject.lon,
              dep.lat,
              dep.lon
            )
          )
        ),
        reputation: 90,
        fuel: 500,
        co2: 120,
        mode: isReal ? "Realism" : "Easy",
        speed: speedMod ? "Modified Speed" : "Normal Speed",
        ppf: specificData[2][0].toLocaleString("en-US"),
        ppd: specificData[2][1].toLocaleString("en-US"),
        orderLink: `https://www.airlinemanager.com/ac_order_do.php?id=${aircraft}&hub=${hubID[departure]}&e=${specificData[1][0]}&b=${specificData[1][1]}&f=${specificData[1][2]}&r=${apname[departure]}%20${acname[aircraft]}%20${airportObject.ic}&engine=${engineID[aircraft]}&amount=1&charter=0&fbSig=false`,
      };

      i++;
      saveData.push(g);
      //console.log(g);
    }
    // if (flpd) {
    //   saveData = saveData.filter((e) => e.flpd == flpd);
    // }

    let toSlice = 10;
    saveData.sort((a, b) => b.profit[1] - a.profit[1]);

    if (saveData.length > toSlice) return saveData.slice(0, toSlice);
    return saveData;
  },
  detailedRoute: (
    yDem,
    jDem,
    fDem,
    lDem,
    hDem,
    dist,
    plane,
    mode,
    dep,
    arr,
    flightsDay
  ) => {
    if (plane.cap < 700) {
      let tickets;
      if (mode)
        tickets = [
          Basics.pax.ticket.realY(dist - 1.5),
          Basics.pax.ticket.realJ(dist - 1.5),
          Basics.pax.ticket.realF(dist - 1.5),
        ];
      else
        tickets = [
          Basics.pax.ticket.easyY(dist - 1.5),
          Basics.pax.ticket.easyJ(dist - 1.5),
          Basics.pax.ticket.easyF(dist - 1.5),
        ];
      let config = Basics.pax.config(
        plane.cap,
        dist,
        flightsDay,
        yDem,
        jDem,
        fDem,
        mode,
        true
      );
      let profit = Basics.pax.profit.specific(
        plane,
        mode,
        dist,
        config[0],
        config[1],
        config[2],
        600,
        120,
        90,
        flightsDay,
        false
      );
      let stopover = Basics.airports.stopover(dep, arr, plane.range, plane.rwy);
      //console.log(tickets)
      return [tickets, config, profit, stopover];
    } else {
      let tickets;
      if (mode)
        tickets = [
          Basics.cargo.ticket.realLarge(dist - 1.5),
          Basics.cargo.ticket.realHeavy(dist - 1.5),
        ];
      else
        tickets = [
          Basics.cargo.ticket.easyLarge(dist - 1.5),
          Basics.cargo.ticket.easyHeavy(dist - 1.5),
        ];
      let config = Basics.cargo.config(
        plane.cap,
        lDem,
        hDem,
        flightsDay,
        3,
        3,
        true
      );
      let lc = Math.round(plane.cap * 0.7 * 1.03 * (config[0] / 100)),
        hc = Math.round(plane.cap * 1.03 * (config[1] / 100));
      let profit = Basics.cargo.profit.specific(
        plane,
        mode,
        dist,
        lc,
        hc,
        600,
        120,
        90,
        flightsDay,
        false
      );
      let stopover = Basics.airports.stopover(dep, arr, plane.range, plane.rwy);
      return [tickets, config, profit, stopover];
    }
  },
  compac: async () => {
    $(".based-on-8h").hide();
    let ac1 = Func.data.get.paxcargo($("#inp-ac-1").val());
    let ac2 = Func.data.get.paxcargo($("#inp-ac-2").val());
    let mode = UI.switch("inp-mode-1");
    if (!ac1 || !ac2) return UI.alertBox(S.err.vac2, "#fa3737");
    if (!mode) {
      if (ac1.cap < 700) {
        ac1.mC = Math.round(ac1.mC / 2);
      }
      if (ac2.cap < 700) {
        ac2.mC = Math.round(ac2.mC / 2);
      }
    } else {
      if (ac1.cap > 700) {
        ac1.mC = ac1.mC * 2;
      }
      if (ac2.cap > 700) {
        ac2.mC = ac2.mC * 2;
      }
    }
    let res = Basics.planes.compare.pax(ac1, ac2, mode);
    if (ac1.n.toLowerCase() == ac2.n.toLowerCase())
      return UI.alertBox(S.err.two_different_planes, "#fa3737");
    if (Func.error.check(res, "ERR_MIXED_TYPES"))
      return UI.alertBox(S.err.mixed_types, "#fa3737");
    if (Func.error.check(res, "ERR_USE_CARGOCOMPARE"))
      res = Basics.planes.compare.cargo(ac1, ac2, mode);
    let profit = res[0][0];
    let stats = res[0][1];
    let orig = res[0][2];
    $("#ans-sec1-table").css({ maxWidth: "400px", whiteSpace: "nowrap" });
    $("#ans-sec2-table").css({ maxWidth: "400px", whiteSpace: "nowrap" });
    $("#ans-label-1").html(
      "<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i> " +
        S.ans.daily_p
    );
    $("#ans-label-2").html(
      "<i class='extended-glyphicons glyphicons glyphicons-tint'></i> " +
        S.ans.f
    );
    $("#ans-label-3").html(
      "<i class='extended-glyphicons glyphicons glyphicons-leaf i-col-0f0'></i> " +
        S.ans.c
    );
    $("#ans-label-4").html(
      "<i class='extended-glyphicons glyphicons glyphicons-wrench i-col-777'></i> " +
        S.ans.m
    );
    $("#ans-label-5").html(
      "<i class='extended-glyphicons glyphicons glyphicons-plane i-col-777'></i> " +
        S.st.speed
    );
    $("#ans-label-6").html(
      "<i class='extended-glyphicons glyphicons glyphicons-user'></i> " +
        S.st.cap
    );
    $("#ans-label-7").html(
      "<i class='extended-glyphicons glyphicons glyphicons-tint'></i> " + S.st.f
    );
    $("#ans-label-8").html(
      "<i class='extended-glyphicons glyphicons glyphicons-leaf i-col-0f0'></i> " +
        S.st.c
    );
    $("#ans-label-9").html(
      "<i class='extended-glyphicons glyphicons glyphicons-wrench i-col-777'></i> " +
        S.st.mc
    );
    $("#ans-label-10").html(
      "<i class='extended-glyphicons glyphicons glyphicons-clock i-col-aaa'></i> " +
        S.st.mh
    );
    $("#ans-label-11").html(
      "<i class='extended-glyphicons glyphicons glyphicons-vector-path-curve i-col-888'></i> " +
        S.st.r
    );
    $("#ans-label-12").html(
      "<i class='extended-glyphicons glyphicons glyphicons-road i-col-777'></i> " +
        S.st.rwy
    );
    $("#ans-label-13").html(
      "<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i> " +
        S.st.p
    );
    $("#ans-label-5").parent().siblings().remove();
    $("#ans-label-6").parent().siblings().remove();
    $("#ans-label-7").parent().siblings().remove();
    $("#ans-label-8").parent().siblings().remove();
    $("#ans-label-9").parent().siblings().remove();
    $("#ans-label-10").parent().siblings().remove();
    $("#ans-label-11").parent().siblings().remove();
    $("#ans-label-12").parent().siblings().remove();
    $("#ans-label-13").parent().siblings().remove();
    $("#ans-label-1")
      .parent()
      .parent()
      .parent()
      .prepend(
        "<tr class='based-on-8h'><th colspan='3' style='text-align: left; font-style: italic'><i class='fa fa-info-circle' style='color: #17a2b8'></i> Based on a perfect 8h route</th></tr>"
      );
    $(".ans-td-1").attr("colspan", 3);
    $("#ans-table-box-inner-box-1").css({ minWidth: "200px" });
    $("#ans-table-box-inner-box-2").css({ minWidth: "200px" });
    $("#ans-table-box-inner-1").css({ overflowX: "scroll" });
    $("#ans-table-box-inner-2").css({ overflowX: "scroll" });
    $(".ans-plane-1").html(`<i>${ac1.n}</i>`);
    $(".ans-plane-2").html(`<i>${ac2.n}</i>`);
    $("#ans-sec1-prf-org").text("$" + Func.cn(orig.ppd[0]));
    $("#ans-sec1-prf-dif")
      .text(Func.addDollar(profit.ppd))
      .css({ color: Func.compGetColor(profit.ppd, true) });
    $("#ans-sec1-fuel-org").text("$" + Func.cn(orig.fx[0] * 3));
    $("#ans-sec1-fuel-dif")
      .text(Func.addDollar(profit.fx))
      .css({ color: Func.compGetColor(profit.fx, false) });
    $("#ans-sec1-co2-org").text("$" + Func.cn(orig.cx[0] * 3));
    $("#ans-sec1-co2-dif")
      .text(Func.addDollar(profit.cx))
      .css({ color: Func.compGetColor(profit.cx, false) });
    $("#ans-sec1-mt-org").text("$" + Func.cn(orig.mx[0] * 3));
    $("#ans-sec1-mt-dif")
      .text(Func.addDollar(profit.mx))
      .css({ color: Func.compGetColor(profit.mx, false) });
    $("#ans-sec2-speed-org").text(Func.cn(ac1.speed) + " kph");
    $("#ans-sec2-speed-dif")
      .text(Func.cn(stats.speed) + " kph")
      .css({ color: Func.compGetColor(stats.speed, true) });
    $("#ans-sec2-cap-org").text(Func.cn(ac1.cap));
    $("#ans-sec2-cap-dif")
      .text(Func.cn(stats.cap))
      .css({ color: Func.compGetColor(stats.cap, true) });
    $("#ans-sec2-fuel-org").text(ac1.fConsmp + " lbs/km");
    $("#ans-sec2-fuel-dif")
      .text(stats.fConsmp + " lbs/km")
      .css({ color: Func.compGetColor2(stats.fConsmp, false) });
    $("#ans-sec2-co2-org").text(ac1.cConsmp + Func.getCargoUnit(ac1.cap));
    $("#ans-sec2-co2-dif")
      .text(stats.cConsmp + Func.getCargoUnit(ac1.cap))
      .css({ color: Func.compGetColor2(stats.cConsmp, false) });
    $("#ans-sec2-mc-org").text("$" + Func.cn(ac1.mC));
    $("#ans-sec2-mc-dif")
      .text(Func.addDollar(stats.mC))
      .css({ color: Func.compGetColor(stats.mC, false) });
    $("#ans-sec2-mh-org").text(ac1.mH);
    $("#ans-sec2-mh-dif")
      .text(stats.mH)
      .css({ color: Func.compGetColor(stats.mH, true) });
    $("#ans-sec2-range-org").text(ac1.range + " km");
    $("#ans-sec2-range-dif")
      .text(stats.range + " km")
      .css({ color: Func.compGetColor(stats.range, true) });
    $("#ans-sec2-rwy-org").text(ac1.rwy + " ft");
    $("#ans-sec2-rwy-dif")
      .text(stats.rwy + " ft")
      .css({ color: Func.compGetColor(stats.rwy, false) });
    $("#ans-sec2-cost-org").text("$" + Func.cn(ac1.price));
    $("#ans-sec2-cost-dif")
      .text(Func.addDollar(stats.price))
      .css({ color: Func.compGetColor(stats.price, false) });
    if (profit.ppd.includes("+"))
      $("#ans-rel-1").text(
        `${ac2.n}: ${Func.getRelation(orig.ppd[1], orig.ppd[0])}x ${
          S.other.more_profitable
        }`
      );
    else
      $("#ans-rel-1").text(
        `${ac1.n}: ${Func.getRelation(orig.ppd[0], orig.ppd[1])}x ${
          S.other.more_profitable
        }`
      );
    if (stats.price.includes("+"))
      $("#ans-rel-2").text(
        `${ac2.n}: ${Func.getRelation(ac2.price, ac1.price)}x ${
          S.other.more_expensive
        }`
      );
    else
      $("#ans-rel-2").text(
        `${ac1.n}: ${Func.getRelation(ac1.price, ac2.price)}x ${
          S.other.more_expensive
        }`
      );
    $("#tool-inp").hide();
    $("#tool-ans").show();
  },
  comprt: async () => {
    $("#execute")
      .addClass("loading-animation")
      .html(
        "<i class='extended-glyphicons glyphicons glyphicons-refresh'></i>"
      );
    let dep1 = Func.data.get.airport($("#inp-r1-dep").val());
    let arr1 = Func.data.get.airport($("#inp-r1-arr").val());
    let dep2 = Func.data.get.airport($("#inp-r2-dep").val());
    let arr2 = Func.data.get.airport($("#inp-r2-arr").val());
    let ac = Func.data.get.paxcargo($("#inp-ac").val());
    let mode = UI.switch("inp-mode-1");
    let sm = UI.switch("inp-sm-1");
    if (!dep1 || !arr1 || !dep2 || !arr2) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Compare!");
      return UI.alertBox(S.err.apt, "#fa3737");
    }
    if (!ac) {
      $("#execute")
        .removeClass("loading-animation")
        .html("<i class='fa fa-search'></i> Compare!");
      return UI.alertBox(S.err.vac);
    }
    if (!mode) {
      if (ac.cap < 700) ac.mC = Math.round(ac.mC / 2);
      ac.rwy = 0;
      ac.speed = Math.round(ac.speed * 1.5);
    } else if (ac.cap > 700) ac.mC = ac.mC * 2;
    ac = Func.mod(ac, sm, false, false);
    let r1 = await Func.api.route(dep1.ic, arr1.ic);
    let r2 = await Func.api.route(dep2.ic, arr2.ic);
    let demand = [
      [r1.y, r1.j, r1.f, r1.l, r1.h],
      [r2.y, r2.j, r2.f, r2.l, r2.h],
    ];
    let flpd = [Func.flpd(ac.speed, r1.dist), Func.flpd(ac.speed, r2.dist)];
    let config, profit;
    if (ac.cap < 700) {
      config = [
        Basics.pax.config(
          ac.cap,
          r1.dist,
          flpd[0],
          r1.y,
          r1.j,
          r1.f,
          mode,
          true
        ),
        Basics.pax.config(
          ac.cap,
          r2.dist,
          flpd[1],
          r2.y,
          r2.j,
          r2.f,
          mode,
          true
        ),
      ];
      profit = [
        Basics.pax.profit.specific(
          ac,
          mode,
          r1.dist,
          config[0][0],
          config[0][1],
          config[0][2],
          600,
          120,
          90,
          flpd[0],
          false
        ),
        Basics.pax.profit.specific(
          ac,
          mode,
          r2.dist,
          config[1][0],
          config[1][1],
          config[1][2],
          600,
          120,
          90,
          flpd[1],
          false
        ),
      ];
    } else if (ac.cap > 700) {
      config = [
        Basics.cargo.config(ac.cap, r1.l, r1.h, flpd[0], 3, 3, true),
        Basics.cargo.config(ac.cap, r2.l, r2.h, flpd[1], 3, 3, true),
      ];
      let lc = [
        Math.round(ac.cap * 0.7 * 1.03 * (config[0][0] / 100)),
        Math.round(ac.cap * 0.7 * 1.03 * (config[1][0] / 100)),
      ];
      let hc = [
        Math.round(ac.cap * 1.03 * (config[0][1] / 100)),
        Math.round(ac.cap * 1.03 * (config[0][1] / 100)),
      ];
      profit = [
        Basics.cargo.profit.specific(
          ac,
          mode,
          r1.dist,
          lc[0],
          hc[0],
          600,
          120,
          90,
          flpd[0],
          false
        ),
        Basics.cargo.profit.specific(
          ac,
          mode,
          r2.dist,
          lc[1],
          hc[1],
          600,
          120,
          90,
          flpd[1],
          false
        ),
      ];
    }
    $("#ans-sec1-table").css({ maxWidth: "400px", whiteSpace: "nowrap" });
    $("#ans-sec2-table").css({ maxWidth: "400px", whiteSpace: "nowrap" });
    $("#ans-label-1").html(
      `<div class='ans-comp-space-div'>${Func.img.y}</div> ${S.cl.y}`
    );
    $("#ans-label-2").html(
      `<div class='ans-comp-space-div'>${Func.img.j}</div> ${S.cl.j}`
    );
    $("#ans-label-3").html(
      `<div class='ans-comp-space-div'>${Func.img.f_low}</div> ${S.cl.f}`
    );
    $("#ans-label-4").html(
      `<div class='ans-comp-space-div'>${Func.img.l}</div> ${S.cl.l}`
    );
    $("#ans-label-5").html(
      `<div class='ans-comp-space-div'>${Func.img.h}</div> ${S.cl.h}`
    );
    $("#ans-label-6").html(
      "<i class='extended-glyphicons glyphicons glyphicons-clock i-col-aaa'></i> " +
        S.inp.flpd
    );
    $("#ans-label-7").html(
      "<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i> " +
        S.ans.prff
    );
    $("#ans-label-8").html(
      "<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i> " +
        S.ans.prfd
    );
    $("#ans-label-9").html(
      `<div class='ans-comp-space-div'><i class='glyphicons glyphicons-vector-path-curve i-col-888'></i></div> ${S.general.distance}`
    );
    $("#ans-table-box-inner-box-1").css({ minWidth: "200px" });
    $("#ans-table-box-inner-box-2").css({ minWidth: "200px" });
    $("#ans-table-box-inner-1").css({ overflowX: "scroll" });
    $("#ans-table-box-inner-2").css({ overflowX: "scroll" });
    $(".ans-td-1").attr("colspan", 3);
    $("#ans-sec1-dist-org").html(Func.cn(r1.dist) + " km");
    $("#ans-sec1-dist-dif").html(Func.cn(r2.dist) + " km");
    $("#ans-sec1-yd-org")
      .text(Func.cn(demand[0][0]))
      .css({ color: demand[0][0] > demand[1][0] ? "#28a745" : "#dc3545" });
    $("#ans-sec1-yd-dif")
      .text(Func.cn(demand[1][0]))
      .css({ color: demand[0][0] > demand[1][0] ? "#dc3545" : "#28a745" });
    $("#ans-sec1-jd-org")
      .text(Func.cn(demand[0][1]))
      .css({ color: demand[0][1] > demand[1][1] ? "#28a745" : "#dc3545" });
    $("#ans-sec1-jd-dif")
      .text(Func.cn(demand[1][1]))
      .css({ color: demand[0][1] > demand[1][1] ? "#dc3545" : "#28a745" });
    $("#ans-sec1-fd-org")
      .text(Func.cn(demand[0][2]))
      .css({ color: demand[0][2] > demand[1][2] ? "#28a745" : "#dc3545" });
    $("#ans-sec1-fd-dif")
      .text(Func.cn(demand[1][2]))
      .css({ color: demand[0][2] > demand[1][2] ? "#dc3545" : "#28a745" });
    $("#ans-sec1-ld-org")
      .text(Func.cn(demand[0][3]))
      .css({ color: demand[0][3] > demand[1][3] ? "#28a745" : "#dc3545" });
    $("#ans-sec1-ld-dif")
      .text(Func.cn(demand[1][3]))
      .css({ color: demand[0][3] > demand[1][3] ? "#dc3545" : "#28a745" });
    $("#ans-sec1-hd-org")
      .text(Func.cn(demand[0][4]))
      .css({ color: demand[0][4] > demand[1][4] ? "#28a745" : "#dc3545" });
    $("#ans-sec1-hd-dif")
      .text(Func.cn(demand[1][4]))
      .css({ color: demand[0][4] > demand[1][4] ? "#dc3545" : "#28a745" });
    $("#ans-sec2-fl-org")
      .text(flpd[0])
      .css({ color: flpd[0] > flpd[1] ? "#28a745" : "#dc3545" });
    $("#ans-sec2-fl-dif")
      .text(flpd[1])
      .css({ color: flpd[0] > flpd[1] ? "#dc3545" : "#28a745" });
    $("#ans-sec2-pf-org")
      .text("$" + Func.cn(profit[0][0]))
      .css({ color: profit[0][0] > profit[1][0] ? "#28a745" : "#dc3545" });
    $("#ans-sec2-pf-dif")
      .text("$" + Func.cn(profit[1][0]))
      .css({ color: profit[0][0] > profit[1][0] ? "#dc3545" : "#28a745" });
    $("#ans-sec2-pd-org")
      .text("$" + Func.cn(profit[0][1]))
      .css({ color: profit[0][1] > profit[1][1] ? "#28a745" : "#dc3545" });
    $("#ans-sec2-pd-dif")
      .text("$" + Func.cn(profit[1][1]))
      .css({ color: profit[0][1] > profit[1][1] ? "#dc3545" : "#28a745" });
    if (demand[0][0] == demand[1][0]) {
      $("#ans-sec1-yd-org").css({ color: "#28a745" });
      $("#ans-sec1-yd-dif").css({ color: "#28a745" });
    }
    if (demand[0][1] == demand[1][1]) {
      $("#ans-sec1-jd-org").css({ color: "#28a745" });
      $("#ans-sec1-jd-dif").css({ color: "#28a745" });
    }
    if (demand[0][2] == demand[1][2]) {
      $("#ans-sec1-fd-org").css({ color: "#28a745" });
      $("#ans-sec1-fd-dif").css({ color: "#28a745" });
    }
    if (demand[0][3] == demand[1][3]) {
      $("#ans-sec1-ld-org").css({ color: "#28a745" });
      $("#ans-sec1-ld-dif").css({ color: "#28a745" });
    }
    if (demand[0][4] == demand[1][4]) {
      $("#ans-sec1-hd-org").css({ color: "#28a745" });
      $("#ans-sec1-hd-dif").css({ color: "#28a745" });
    }
    if (flpd[0] == flpd[1]) {
      $("#ans-sec2-fl-org").css({ color: "#28a745" });
      $("#ans-sec2-fl-dif").css({ color: "#28a745" });
    }
    if (profit[0][0] == profit[1][0]) {
      $("#ans-sec2-pf-org").css({ color: "#28a745" });
      $("#ans-sec2-pf-dif").css({ color: "#28a745" });
    }
    if (profit[0][1] == profit[1][1]) {
      $("#ans-sec2-pd-org").css({ color: "#28a745" });
      $("#ans-sec2-pd-dif").css({ color: "#28a745" });
    }
    $("#tool-inp").hide();
    $("#tool-ans").show();
    $("#execute")
      .removeClass("loading-animation")
      .html("<i class='fa fa-search'></i> Compare!");
  },
  ticket: () => {
    let mode = UI.switch("inp-gm-1");
    let dist = $("#inp-dist").val() - 1.5;
    if (mode) {
      $("#ans-yp").text(`$${Basics.pax.ticket.realY(dist)}`);
      $("#ans-jp").text(`$${Basics.pax.ticket.realJ(dist)}`);
      $("#ans-fp").text(`$${Basics.pax.ticket.realF(dist)}`);
      $("#ans-lp").text(`$${Basics.cargo.ticket.realLarge(dist)}`);
      $("#ans-hp").text(`$${Basics.cargo.ticket.realHeavy(dist)}`);
    } else {
      $("#ans-yp").text(`$${Basics.pax.ticket.easyY(dist)}`);
      $("#ans-jp").text(`$${Basics.pax.ticket.easyJ(dist)}`);
      $("#ans-fp").text(`$${Basics.pax.ticket.easyF(dist)}`);
      $("#ans-lp").text(`$${Basics.cargo.ticket.easyLarge(dist)}`);
      $("#ans-hp").text(`$${Basics.cargo.ticket.easyHeavy(dist)}`);
    }
    $("#result-title").text(`${$("#inp-dist").val()} KM`);
    $("#tool-inp").hide();
    $("#tool-ans").show();
  },
};

let acnames = [
  "ATR 42-320",
  "ATR 42-500",
  "ATR 42-400",
  "SN-601 Corvette",
  "ATR 42-600",
  "ATR 72-500",
  "N262",
  "ATR 72-200",
  "ATR 72-210",
  "ATR 42-300",
  "ATR 72-600",
  "Concorde",
  "A220-100",
  "A318-100",
  "A319-200",
  "A220-300",
  "A320-200",
  "A319neo",
  "A321-200",
  "A300B2-200",
  "A320neo",
  "A340-200",
  "A300B4-200",
  "A321neo",
  "A300-600",
  "A310-200",
  "A300-600R",
  "A321XLR",
  "A310-300",
  "A330-300",
  "A330-200",
  "A340-300",
  "A350-800",
  "A340-500",
  "A340-600",
  "A350-900",
  "A350-1000",
  "A350-900R",
  "A330-800neo",
  "A330-900neo",
  "A380-800",
  "AN-74VIP",
  "AN-74-200",
  "AN-140",
  "AN-74TK-100",
  "AN-10",
  "AN-12",
  "AN-10A",
  "AN-74TK-300",
  "Beechcraft 1900D",
  "Beechcraft 1900",
  "King Air 350i",
  "Beechcraft 1900C",
  "B377 Stratocruiser",
  "B727-100",
  "B737-100",
  "B737-200C",
  "B737-500",
  "B737-200Adv",
  "B737-200",
  "B717-200",
  "B737-600",
  "B737-300",
  "B737-700C",
  "B737-400",
  "B737-700",
  "B707",
  "B737-800",
  "B727-200",
  "B737-900",
  "B737-700ER",
  "B757-300",
  "B767-200",
  "B737-900ER",
  "B757-200",
  "B767-200ER",
  "B737 Max 7",
  "B737 Max 8",
  "B737 Max 9",
  "B787-8",
  "B737 Max 10",
  "B767-300",
  "B767-300ER",
  "B767-400ER",
  "B747SP",
  "B747-100",
  "B747-200B",
  "B777-200",
  "B747-300",
  "B777-200LR",
  "B777-300ER",
  "B787-9",
  "B747-400C",
  "B787-10",
  "B777-8X",
  "B747-400D",
  "B777-200ER",
  "B777-300",
  "B777-9X",
  "B747-400",
  "B747-400ER",
  "B747-8",
  "B777-300LR",
  "DHC-8-Q200",
  "DHC-8-100",
  "Learjet 25B",
  "DHC-8-Q300",
  "Challenger 300",
  "DHC-7",
  "CRJ 100",
  "Challenger 600",
  "CRJ 100ER",
  "Challenger 601",
  "Challenger 605",
  "CRJ 200",
  "Global 7500",
  "CRJ 100LR",
  "Global 8000",
  "CRJ 200LR",
  "DHC-8-Q400",
  "CRJ 701",
  "Challenger 604",
  "CRJ 700",
  "CRJ 701ER",
  "CRJ 700NG",
  "CRJ 702",
  "CRJ 705",
  "CRJ 700ER",
  "CRJ 701LR",
  "CRJ 900NG",
  "CRJ 900",
  "CRJ 705ER",
  "CRJ 705LR",
  "CRJ 1000",
  "CRJ 900ER",
  "CRJ 900LR",
  "CS 100",
  "CL-44D",
  "CS 300",
  "Jetstream 31",
  "Jetstream 41",
  "BAe 146-300",
  "BAe146",
  "Cessna 172",
  "Cessna 208B",
  "Citation X",
  "ARJ21-700",
  "ARJ21-900",
  "ARJ21-700ER",
  "C919",
  "Phenom 100",
  "EMB 121 Xingu I",
  "Phenom 300",
  "Legacy 450",
  "Legacy 500",
  "EMB 120",
  "Praetor 500",
  "Praetor 600",
  "ERJ 135ER",
  "Legacy 600",
  "Lineage 1000",
  "ERJ 135LR",
  "ERJ 145ER",
  "ERJ 140LR",
  "ERJ 145LR",
  "ERJ 145XR",
  "ERJ 190-200",
  "ERJ 170-200",
  "ERJ 170-100",
  "ERJ 190-100",
  "ERJ 170-200LR",
  "ERJ 190-200LR",
  "ERJ 170-100LR",
  "ERJ 170-200AR",
  "ERJ 190-100LR",
  "ERJ 190-100AR",
  "ERJ 170-100AR",
  "ERJ 190-200AR",
  "E175 E2",
  "E190 E2",
  "E195 E2",
  "F27-600",
  "F27-200",
  "F27-500",
  "F28-1000",
  "F27-400",
  "F28-600",
  "F28-3000",
  "F-50",
  "F-70",
  "F27-100",
  "F28-4000",
  "F-70A",
  "F-100",
  "F28-2000",
  "IL-114",
  "IL-114-100",
  "IL-14P",
  "IL-114-300",
  "IL-14M",
  "IL-18B",
  "IL-18A",
  "IL-18V",
  "IL-18I",
  "IL-18D",
  "IL-62",
  "IL-62M",
  "IL-62MK",
  "IL-96-300",
  "IL-96-400",
  "IL-96M",
  "L-1329 JetStar",
  "L-188 Electra",
  "L-1049G Super Constellation",
  "L-1011-200",
  "L-1011-500",
  "DC-1",
  "DC-2",
  "DC-5",
  "DC-4",
  "DC-3",
  "DC-9-10",
  "DC-6",
  "DC-9-50",
  "DC-6B",
  "DC-9-30",
  "DC-9-40",
  "DC-9-21",
  "DC-7",
  "DC-7B",
  "DC-7C",
  "MD-87",
  "MD-80",
  "MD-81",
  "MD-88",
  "MD-90-30",
  "MD-90-30ER",
  "MD-83",
  "DC-8-10",
  "DC-8-61",
  "DC-8-20",
  "DC-8-71",
  "DC-8-40",
  "DC-10-10",
  "DC-8-62",
  "DC-8-50",
  "DC-8-72",
  "DC-8-63",
  "DC-10-15",
  "DC-8-73",
  "DC-10-30",
  "DC-10-40",
  "MD-11C",
  "MD-11",
  "MD-11ER",
  "Saab 340",
  "Saab 90 Scandia",
  "Saab 2000",
  "Caravelle III",
  "Caravelle IV-R",
  "Caravelle IV-N",
  "Caravelle 11-R",
  "Caravelle 10-B",
  "Caravelle 10-R",
  "Caravelle 12",
  "SU-80GP",
  "SuperJet 100-75",
  "SuperJet 100-95",
  "SuperJet 100-60",
  "SuperJet 100-95LR",
  "Tu-104",
  "Tu-124",
  "Tu-104A",
  "Tu-134A",
  "Tu-104D",
  "Tu-104B",
  "Tu-110",
  "Tu-334-200",
  "Tu-334-220",
  "Tu-334-100",
  "Tu-334-100D",
  "Tu-334-120D",
  "Tu-154M",
  "Tu-154",
  "Tu-204-300",
  "Tu-204-120",
  "Tu-204-100",
  "Tu-214",
  "328-100",
  "328-310JET",
  "428JET",
  "4-0-4",
  "2-0-2",
  "Viscount",
  "CV-880",
  "CV-990A",
  "Falcon 2000LX",
  "Falcon 2000",
  "Mercure",
  "Spacejet M90",
  "Spacejet M100",
  "MC-21-200",
  "MC-21-300",
  "MC-21-400",
  "DC3",
  "DC9",
  "B727-200F",
  "B377SG",
  "A310-300F",
  "A400M",
  "A300-600ST",
  "IL-76D",
  "B757-200F",
  "A300-600F",
  "IL-96T",
  "B767-300F",
  "A330-200F",
  "B777 Freighter",
  "B747-400F",
  "B747-8F",
  "AN-124",
  "A380-800F",
  "AN-225",
];

function allFleet() {
  let nm = document.getElementById("plane-add-name");
  let am = document.getElementById("plane-add-amount");
  for (x in acnames) {
    //console.log(nm, am);
    nm.value = acnames[x];
    am.value = 1;
    UI.addPlane();
  }
}

module.exports = Tools;
