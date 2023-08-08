const UI = {
    popup: {
        appendCtrlBtn: (content, icon, clickFunc, remove, style, id) => {
            if(remove) {
                $("#popup-tab-ctrl-btns-box").empty()
            }
            $("#popup-tab-ctrl-btns-box").append(`<button class="popup-tab-ctrl-btns font-baloo transition" style="${style}" id="${id}">
                ${icon}
                ${content.toUpperCase()}
            </button>`)
            $(`#${id}`).click(clickFunc)
        },
        open: (title, btnsArray) => {
            $("#popup-tab-header-title-text").text(title.toUpperCase())
            let i = 0
            while(i < btnsArray.length) {
                UI.popup.appendCtrlBtn(btnsArray[i][0], btnsArray[i][1], btnsArray[i][2], btnsArray[i][3], btnsArray[i][4], btnsArray[i][5])
                i++
            }
            $("#popup-tab-ctrl").show()
            $("#popup-background, #popup-tab").show()
            $("#settings-tab, #mapfilter-tab, #ac-tab").hide()
        },
        buttonFocus: button => {
            $(".popup-tab-ctrl-btns").removeClass("popup-tab-ctrl-btns-selected")
            $(`#${button}`).addClass("popup-tab-ctrl-btns-selected")
        }
    },
    tools: {
        add: async tool => {
            let res = UI.tools.get(tool)
            let input = res[0]
            let answer = res[1]
            await $("#tool-inp").empty().append(input)
            await $("#tool-ans").empty().append(answer)
        },
        get: tool => {
            switch(tool) {
                case 1:
                    return [
                        `<h4 class="tool-title">Pax All-In-One</h4>${UI.create.sw(["inp-mode-1", "inp-mode-2"], ["Realism", "Easy"], "Game Mode")}
                        ${UI.create.sw(["inp-sm-1", "inp-sm-2"], ["Enabled", "Disabled"], "Speed Modification")}
                        ${UI.create.sw(["inp-fm-1", "inp-fm-2"], ["Enabled", "Disabled"], "Fuel Modification")}
                        ${UI.create.sw(["inp-qm-1", "inp-qm-2"], ["Enabled", "Disabled"], "CO2 Modification")}
                        ${UI.create.input(["text", "text", "text"], ["inp-dep", "inp-arr", "inp-ac"], [false, false, false], [false, false, false], [S.inp.dep, S.inp.arr, S.inp.ac], [S.placeholders.icia(Func.user.icia()), S.placeholders.icia(Func.user.icia()), S.placeholders.ac])}
                        <div class="input-group">
                            <p class="input-header input-normal-label" style="justify-content: center; width: 100%">${S.optional}</p>
                            <div class="input-group-input-box">
                                ${UI.create.input(["tel", "tel", "tel", "tel"], ["inp-flpd", "inp-rep", "inp-fp", "inp-cp"], [2, 2, 4, 3], [true, true, true, true], [S.inp.flpd, S.inp.rep, S.inp.fp, S.inp.cp], [S.placeholders.blank, S.placeholders.blank, S.placeholders.blank, S.placeholders.blank])}
                            </div>
                        </div>
                        ${UI.create.button("<i class='fa fa-search'></i> Calculate!", "execute", "Tools.pax()")}`,
                        `${UI.create.returnButton()}<h4 id="result-title"></h4>${UI.create.table(["<i class='fa fa-ticket-alt i-col-cred'></i>", "Tickets"], [Func.img.y, Func.img.j, Func.img.f_low], ["ans-yp", "ans-jp", "ans-fp"], "ans-t-1", 1)}
                        ${UI.create.table(["<i class='fa fa-couch i-col-0c0'></i>", "Configuration"], [Func.img.y, Func.img.j, Func.img.f_low], ["ans-ys", "ans-js", "ans-fs"], "ans-t-2", 2)}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i>", "Profit"], ['<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>', '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>', '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>', '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>'], ["ans-ph1", "ans-pf", "ans-ph2", "ans-pd"], "ans-t-3", 3)}
                        ${UI.create.table(["<i class='fa fa-plane-arrival i-col-107'></i>", "Stopover"], ['<i class="fa fa-plane-arrival i-col-999"></i>', '<i class="fa fa-plane-arrival i-col-999"></i>', '<i class="fa fa-plus-square i-col-107"></i>', '<i class="fa fa-plus-square i-col-107"></i>', '<i class="fa fa-globe i-col-107"></i>', '<i class="fa fa-globe i-col-107"></i>'], ["ans-name", "ans-icia", "ans-ph3", "ans-exd", "ans-ph4", "ans-totd"], "ans-t-4", 4)}`
                    ]
                case 2:
                   return [
                        `<h4 class="tool-title">Cargo All-In-One</h4>${UI.create.sw(["inp-mode-1", "inp-mode-2"], ["Realism", "Easy"], "Game Mode")}
                        ${UI.create.sw(["inp-sm-1", "inp-sm-2"], ["Enabled", "Disabled"], "Speed Modification")}
                        ${UI.create.sw(["inp-fm-1", "inp-fm-2"], ["Enabled", "Disabled"], "Fuel Modification")}
                        ${UI.create.sw(["inp-qm-1", "inp-qm-2"], ["Enabled", "Disabled"], "CO2 Modification")}
                        ${UI.create.slider("inp-lt", 0, 6, "Large Load Training", "label-lt")}
                        ${UI.create.slider("inp-ht", 0, 6, "Heavy Load Training", "label-ht")}
                        ${UI.create.input(["text", "text", "text"], ["inp-dep", "inp-arr", "inp-ac"], [false, false, false], [false, false, false], [S.inp.dep, S.inp.arr, S.inp.ac], [S.placeholders.icia(Func.user.icia()), S.placeholders.icia(Func.user.icia()), S.placeholders.ac])}
                        <div class="input-group">
                            <p class="input-header input-normal-label" style="justify-content: center; width: 100%">${S.optional}</p>
                            <div class="input-group-input-box">
                                ${UI.create.input(["tel", "tel", "tel", "tel"], ["inp-flpd", "inp-rep", "inp-fp", "inp-cp"], [2, 2, 4, 3], [true, true, true, true], [S.inp.flpd, S.inp.rep, S.inp.fp, S.inp.cp], [S.placeholders.blank, S.placeholders.blank, S.placeholders.blank, S.placeholders.blank])}
                            </div>
                        </div>
                        ${UI.create.button("<i class='fa fa-search'></i> Calculate!", "execute", "Tools.cargo()")}`,
                        `${UI.create.returnButton()}<h4 id="result-title"></h4>${UI.create.table(["<i class='fa fa-ticket-alt i-col-cred'></i>", "Tickets"], [Func.img.l, Func.img.h], ["ans-lp", "ans-hp"], "ans-t-1", 1)}
                        ${UI.create.table(["<i class='fa fa-couch i-col-0c0'>", "Configuration"], [Func.img.l, Func.img.h], ["ans-ll", "ans-hl"], "ans-t-2", 2)}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i>", "Profit"], ['<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>', '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>', '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>', '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>'], ["ans-ph1", "ans-pf", "ans-ph2", "ans-pd"], "ans-t-3", 3)}
                        ${UI.create.table(["<i class='fa fa-plane-arrival i-col-107'></i>", "Stopover"], ['<i class="fa fa-plane-arrival i-col-999"></i>', '<i class="fa fa-plane-arrival i-col-999"></i>', '<i class="fa fa-plus-square i-col-107"></i>', '<i class="fa fa-plus-square i-col-107"></i>', '<i class="fa fa-globe i-col-107"></i>', '<i class="fa fa-globe i-col-107"></i>'], ["ans-name", "ans-icia", "ans-ph3", "ans-exd", "ans-ph4", "ans-totd"], "ans-t-4", 4)}`
                    ]
                case 3:
                    return [
                        `<h4 class="tool-title">Stopover Finder</h4>
                        ${UI.create.input(["text", "text", "tel"], ["inp-dep", "inp-arr", "inp-range"], [false, false, 5], [false, false, true], [S.inp.dep, S.inp.arr, S.inp.range], [S.placeholders.icia(Func.user.icia()), S.placeholders.icia(Func.user.icia()), S.placeholders.range])}
                        <div class="input-group">
                            <p class="input-header input-normal-label" style="justify-content: center; width: 100%">${S.optional}</p>
                            <div class="input-group-input-box">
                                ${UI.create.input(["tel"], ["inp-rwy"], [5], [true], [S.inp.rwy], [S.placeholders.blank])}
                            </div>
                        </div>
                        ${UI.create.button("<i class='fa fa-search'></i> Search!", "execute", "Tools.stopover()")}`,
                        `${UI.create.returnButton()}<h4><span id="ans-name"></span><br><span id="ans-icia"></span></h4>
                        <table style="width: 90%; max-width: 175px; margin: auto">
                            <tr><td style="text-align: left"><i class="fa fa-plus"></i></td><td style="text-align: right" id="ans-exd"></td></tr>
                            <tr><td style="text-align: left"><i class="extended-glyphicons glyphicons glyphicons-vector-path-curve"></i></td><td style="text-align: right" id="ans-totd"></td></tr>
                        </table>`
                    ]
                case 4:
                    return [
                        `<h4 class="tool-title">Market% Finder</h4>${UI.create.slider("inp-minm", 80, 90, "Min. Market%", "label-minm", "%", "90")}
                        ${UI.create.input(["text"], ["inp-dep"], [false], [false], [S.inp.dep], [S.placeholders.icia(Func.user.icia())])}
                        <div class="input-group">
                            <p class="input-header input-normal-label" style="justify-content: center; width: 100%">${S.optional}</p>
                            <div class="input-group-input-box">
                                ${UI.create.input(["tel"], ["inp-rwy"], [5], [true], [S.inp.rwy], [S.placeholders.blank])}
                            </div>
                        </div>
                        ${UI.create.button("<i class='fa fa-search'></i> Search!", "execute", "Tools.mfind()")}`,
                        `${UI.create.returnButton()}<h4 id="ans-nameicia"></h4>
                        ${UI.create.oldtable("", ["<i class='fa fa-arrows-alt-h'></i>", "<i class='fa fa-percent'></i>", "<i class='fa fa-road'></i>"], ["Distance", "Market%", "Runway"], ["ans-dist", "ans-pct", "ans-rwy"], "ans-t-1")}`
                    ]
                case 5:
                    return [
                        `<h4 class="tool-title">Resell Value Calculator</h4>
                        ${UI.create.input(["text", "tel", "tel", "tel", "tel"], ["inp-ac", "inp-mkt", "inp-js", "inp-fs", "inp-fh"], [false, 2, 3, 3, 5], [false, true, true, true, true], [S.inp.ac, S.inp.mkt, S.inp.js, S.inp.fs, S.inp.fh], [S.placeholders.ac, S.placeholders.mkt, S.placeholders.js, S.placeholders.fs, S.placeholders.fh])}
                        ${UI.create.button("<i class='fa fa-search'></i> Calculate!", "execute", "Tools.resell()")}`,
                        `${UI.create.returnButton()}<br>
                        <span style='line-height: 4'>Resell Value</span><br><b id='ans-v'></b>`
                    ]
                case 6:
                    return [
                        `<h4 class="tool-title">Profit Estimation Tool</h4>${UI.create.sw(["inp-mode-1", "inp-mode-2"], ["Realism", "Easy"], "Game Mode")}
                        ${UI.create.sw(["inp-sm-1", "inp-sm-2"], ["Enabled", "Disabled"], "Speed Modification")}
                        ${UI.create.sw(["inp-fm-1", "inp-fm-2"], ["Enabled", "Disabled"], "Fuel Modification")}
                        ${UI.create.sw(["inp-qm-1", "inp-qm-2"], ["Enabled", "Disabled"], "CO2 Modification")}
                        ${UI.create.input(["text", "text", "text", "tel"], ["inp-ac", "inp-dep", "inp-arr", "inp-fh"], [false, false, false, 5], [false, false, false, true], [S.inp.ac, S.inp.dep, S.inp.arr, S.inp.fh], [S.placeholders.ac, S.placeholders.icia(Func.user.icia()), S.placeholders.icia(Func.user.icia()), S.placeholders.fh])}
                        <div class="input-group">
                            <p class="input-header input-normal-label" style="justify-content: center; width: 100%">${S.optional}</p>
                            <div class="input-group-input-box">
                                ${UI.create.input(["tel", "tel", "tel"], ["inp-rep", "inp-fp", "inp-cp"], [2, 4, 3], [true, true, true], [S.inp.rep, S.inp.fp, S.inp.cp], [S.placeholders.blank, S.placeholders.blank, S.placeholders.blank])}
                            </div>
                        </div>
                        ${UI.create.button("<i class='fa fa-search'></i> Calculate!", "execute", "Tools.estimate()")}`,
                        `${UI.create.returnButton()}<h4 id="result-title"></h4>
                        ${UI.create.oldtable("", ['<b id="ans-title-bold">Estimated Profit</b>', '<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i>', " "], ["", "", ""], ["ans-ph1", "ans-prf", ""], "ans-t-1")}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-tint'></i>", "MORE"], ["<i class='extended-glyphicons glyphicons glyphicons-tint'></i>", "<i class='extended-glyphicons glyphicons glyphicons-tint'></i>", "<i class='extended-glyphicons glyphicons glyphicons-leaf i-col-0f0'></i>", "<i class='extended-glyphicons glyphicons glyphicons-leaf i-col-0f0'></i>", "<i class='extended-glyphicons glyphicons glyphicons-wrench i-col-777'></i>", "<i class='extended-glyphicons glyphicons glyphicons-wrench i-col-777'></i>"], ["ans-ph2", "ans-f", "ans-ph3", "ans-q", "ans-ph4", "ans-m"], "ans-t-2", 1)}`
                    ]
                case 7:
                    return [
                        `<h4 class="tool-title">Fleet Profit Estimation</h4>
                        <div id='plane-add' style='margin: auto' onclick="UI.openAddPlane()"><i class='fa fa-plus'></i> Add Aircraft</div>
                        <div id='plane-add-window' style="display: none">
                            <label for='plane-add-name'>${S.inp.ac}</label><br>
                            <div>
                                <input id='plane-add-name' class='input-old' type='text' autocomplete="off" placeholder='${S.placeholders.ac}' style='margin-bottom: 3px'>
                            </div>
                            <label for='plane-add-amount'>${S.inp.amount}</label><br>
                            <input id='plane-add-amount' class='input-old' autocomplete="off" type='tel' placeholder="${S.placeholders.amount}" style='margin-bottom: 13px' maxlength="3" oninput='UI.filterInput("plane-add-amount")'>
                            <button onclick='UI.addPlane()' id='plane-add-button'><i class="fa fa-plus"></i> ADD</button>
                        </div>
                        <div id='plane-container'></div>
                        ${UI.create.button("<i class='fa fa-search'></i> Calculate!", "execute", "Tools.fleet()")}`,
                        `${UI.create.returnButtonDeletePlanes()}<h4>RESULT</h4>
                        <table style="margin: auto; width: 200px">
                            <tr><th colspan="2" style="font-weight: 550">Total Profit</tr>
                            <tr class="i-col-real"><td style="text-align: left">Realism</td><td style="text-align: right"><span id='total-profit-realism'></span></td></tr>
                            <tr class="i-col-easy"><td style="text-align: left">Easy</td><td style="text-align: right"><span id='total-profit-easy'></span></td></tr>
                        </table>
                        <div id='plane-result-box'></div>`
                    ]
                case 8:
                    return [
                        `<h4 class="tool-title">A/C Search Tool</h4>
                        <div id="acs-color-labels">${UI.create.input(["tel", "tel", "tel", "tel", "tel", "tel", "tel"], ["inp-speed", "inp-cap", "inp-fuel", "inp-co2", "inp-range", "inp-rwy", "inp-cost"], [4, 6, 2, 5, 5, 5, 9], [true, true, true, "d", true, true, true], [S.acs.speed, S.acs.cap, S.acs.fuel, S.acs.co2, S.acs.range, S.acs.rwy, S.acs.cost], [S.placeholders.blank, S.placeholders.blank, S.placeholders.blank, S.placeholders.blank, S.placeholders.blank, S.placeholders.blank, S.placeholders.blank])}</div>
                        ${UI.create.button("<i class='fa fa-search'></i> Search!", "execute", "Tools.acs()")}`,
                        ``
                    ]
                case 9:
                    return [
                        `<h4 class="tool-title">Route Research Tool</h4>
                        ${UI.create.sw(["inp-mode-1", "inp-mode-2"], ["Realism", "Easy"], "Game Mode")}
                        ${UI.create.sw(["inp-sm-1", "inp-sm-2"], ["Enabled", "Disabled"], "Speed Modification")}
                        ${UI.create.sw(["inp-filter-1", "inp-filter-2"], ["Total", "F-Class"], "Sort By")}
                        ${UI.create.input(["text", "text", "tel"], ["inp-dep", "inp-ac", "inp-dist"], [false, false, 5], [false, false, true], [S.inp.dep, S.inp.ac, S.inp.target_dist], [S.placeholders.icia(Func.user.icia()), S.placeholders.ac, S.placeholders.target_dist])}
                        <div class="input-group">
                            <p class="input-header input-normal-label" style="justify-content: center; width: 100%">${S.optional}</p>
                            <div class="input-group-input-box">
                            ${UI.create.input(["tel"], ["inp-fl"], [2], [true], [S.inp.flpd], [S.placeholders.blank])}
                            </div>
                        </div>
                        ${UI.create.button("<i class='fa fa-search'></i> Search!", "execute", "Tools.research()")}`,
                        `${UI.create.returnButton()}<h4>RESULT</h4>
                        <div id='rsc-box'></div>`
                    ]
                case 10:
                    return [
                        `<h4 class="tool-title">Plane Comparison Tool</h4>
                        ${UI.create.sw(["inp-mode-1", "inp-mode-2"], ["Realism", "Easy"], "Game Mode")}
                        ${UI.create.input(["text", "text"], ["inp-ac-1", "inp-ac-2"], [false, false], [false, false], [S.inp.ac1, S.inp.ac2], [S.placeholders.ac, S.placeholders.ac])}
                        ${UI.create.button("<i class='fa fa-search'></i> Compare!", "execute", "Tools.compac()")}`,
                        `${UI.create.returnButton()}<h4>RESULT</h4>
                        <div id='ans-rel'>
                            <p id='ans-rel-1'></p>
                            <p id='ans-rel-2'></p>
                        </div>
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i>", "PROFIT"], ["<span id='ans-label-1'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "", "<span id='ans-label-2'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-3'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-4'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>"], ["", "ans-sec1-prf-org", "ans-sec1-prf-dif", "", "", "ans-sec1-fuel-org", "ans-sec1-fuel-dif", "", "ans-sec1-co2-org", "ans-sec1-co2-dif", "", "ans-sec1-mt-org", "ans-sec1-mt-dif"], "ans-sec1-table", 1)}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-stats i-col-107'></i>", "STATS"], ["<span id='ans-label-5'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-6'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-7'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-8'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-9'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-10'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-11'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-12'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>", "<span id='ans-label-13'></span>", "<span class='ans-plane-1'></span>", "<span class='ans-plane-2'></span>"], ["", "ans-sec2-speed-org", "ans-sec2-speed-dif", "", "ans-sec2-cap-org", "ans-sec2-cap-dif", "", "ans-sec2-fuel-org", "ans-sec2-fuel-dif", "", "ans-sec2-co2-org", "ans-sec2-co2-dif", "", "ans-sec2-mc-org", "ans-sec2-mc-dif", "", "ans-sec2-mh-org", "ans-sec2-mh-dif", "", "ans-sec2-range-org", "ans-sec2-range-dif", "", "ans-sec2-rwy-org", "ans-sec2-rwy-dif", "", "ans-sec2-cost-org", "ans-sec2-cost-dif"], "ans-sec2-table", 2)}`
                    ]
                case 11:
                    return [
                        `<h4 class="tool-title">Route Comparison Tool</h4>
                        ${UI.create.sw(["inp-mode-1", "inp-mode-2"], ["Realism", "Easy"], "Game Mode")}
                        ${UI.create.sw(["inp-sm-1", "inp-sm-2"], ["Enabled", "Disabled"], "Speed Modification")}
                        ${UI.create.input(["text"], ["inp-ac"], [false], [false], [S.inp.ac], [S.placeholders.ac])}
                        <div class="input-group">
                            <p class='input-header input-normal-label' style="justify-content: center; width: 100%">${S.other.route_1}</p>
                            <div class="input-group-input-box">
                                ${UI.create.input(["text", "text"], ["inp-r1-dep", "inp-r1-arr"], [false, false], [false, false], [S.inp.dep, S.inp.arr], [S.placeholders.icia(Func.user.icia()), S.placeholders.icia(Func.user.icia())])}
                            </div>
                        </div>
                        <div class="input-group">
                            <p class='input-header input-normal-label' style="justify-content: center; width: 100%">${S.other.route_2}</p>
                            <div class="input-group-input-box">
                                ${UI.create.input(["text", "text"], ["inp-r2-dep", "inp-r2-arr"], [false, false], [false, false], [S.inp.dep, S.inp.arr], [S.placeholders.icia(Func.user.icia()), S.placeholders.icia(Func.user.icia())])}
                            </div>
                        </div>
                        ${UI.create.button("<i class='fa fa-search'></i> Compare!", "execute", "Tools.comprt()")}`,
                        `${UI.create.returnButton()}<h4>RESULT</h4>
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-stats i-col-107'></i>", "GENERAL"], ["<span id='ans-label-9'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`, "<span id='ans-label-1'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`, "<span id='ans-label-2'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`, "<span id='ans-label-3'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`,"<span id='ans-label-4'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`, "<span id='ans-label-5'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`], ["", "ans-sec1-dist-org", "ans-sec1-dist-dif", "", "ans-sec1-yd-org", "ans-sec1-yd-dif", "", "ans-sec1-jd-org", "ans-sec1-jd-dif", "", "ans-sec1-fd-org", "ans-sec1-fd-dif", "", "ans-sec1-ld-org", "ans-sec1-ld-dif", "", "ans-sec1-hd-org", "ans-sec1-hd-dif"], "ans-sec1-table", 1)}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-usd i-col-dol'></i>", "PROFIT"], ["<span id='ans-label-6'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`, "<span id='ans-label-7'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`, "<span id='ans-label-8'></span>", `<i>${S.other.route_1}</i>`, `<i>${S.other.route_2}</i>`], ["", "ans-sec2-fl-org", "ans-sec2-fl-dif", "", "ans-sec2-pf-org", "ans-sec2-pf-dif", "", "ans-sec2-pd-org", "ans-sec2-pd-dif"], "ans-sec2-table", 3)}`
                    ]
                case 12:
                    return [
                        `<h4 class="tool-title">Player Comparison Tool</h4>
                        ${UI.create.input(["text", "text"], ["inp-pl-1", "inp-pl-2"], [false, false], [false, false], [S.inp.pl_1, S.inp.pl_2], [S.placeholders.pl, S.placeholders.pl])}
                        ${UI.create.button("<i class='fa fa-search'></i> Compare!", "execute", "Stats.comparePlayer()")}`,
                        `${UI.create.returnButton()}<h4>RESULT</h4>
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-stats i-col-107'></i>", "STATS"], ["<span id='ans-label-1'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>", "<span id='ans-label-2'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>", "<span id='ans-label-3'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>", "<span id='ans-label-4'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>", "<span id='ans-label-5'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>", "<span id='ans-label-6'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>", "<span id='ans-label-7'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>", "<span id='ans-label-8'></span>", "<span class='ans-plc-pl1'></span>", "<span class='ans-plc-pl2'></span>"], ["", "ans-mode-org", "ans-mode-dif", "", "ans-sv-org", "ans-sv-dif", "", "ans-rank-org", "ans-rank-dif", "", "ans-flt-org", "ans-flt-dif", "", "ans-rts-org", "ans-rts-dif", "", "ans-ach-org", "ans-ach-dif", "", "ans-lvl-org", "ans-lvl-dif", "", "ans-founded-org", "ans-founded-dif"], "ans-stats-table", 1)}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-star i-col-ffc'></i>", "CONTRIBUTION"], [`<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i> ${S.ally.cont}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>", `<i class="extended-glyphicons glyphicons glyphicons-sun i-col-dol"></i> ${S.ally.cd}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>", `<i class="extended-glyphicons glyphicons glyphicons-usd i-col-dol"></i> ${S.user.sv}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>", `<i class="extended-glyphicons glyphicons glyphicons-plane i-col-888"></i> ${S.ally.flights}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>", `<i class="extended-glyphicons glyphicons glyphicons-clock i-col-aaa"></i> ${S.ally.onl}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>", `<i class='extended-glyphicons glyphicons glyphicons-clock i-col-aaa'></i> ${S.ally.joined}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>", `<i class="extended-glyphicons glyphicons glyphicons-stats i-col-107"></i> ${S.ally.oneM}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>", `<i class="extended-glyphicons glyphicons glyphicons-stats i-col-107"></i> ${S.ally.tenM}`, "<span class='mc-1'></span>", "<span class='mc-2'></span>"], ["", "mc-cont-org", "mc-cont-dif", "", "mc-cd-org", "mc-cd-dif", "", "mc-sv-org", "mc-sv-dif", "", "mc-flights-org", "mc-flights-dif", "", "mc-onl-org", "mc-onl-dif", "", "mc-join-org", "mc-join-dif", "", "mc-1m-org", "mc-1m-dif", "", "mc-10m-org", "mc-10m-dif"], "mc-general", 2)}`
                    ]
                case 13:
                    return [
                        `<h4 class="tool-title">Alliance Comparison Tool</h4>
                        ${UI.create.input(["text", "text"], ["inp-al-1", "inp-al-2"], [false, false], [false, false], [S.inp.al_1, S.inp.al_2], [S.placeholders.al, S.placeholders.al])}
                        ${UI.create.button("<i class='fa fa-search'></i> Compare!", "execute", "Stats.compareAlliance()")}`,
                        `${UI.create.returnButton()}<h4>RESULT</h4>
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-cup i-col-dol'></i>", "GENERAL"], ["<span id='ans-label-1'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-2'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-3'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-4'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>"], ["", "ans-rank-org", "ans-rank-dif", "", "ans-sv-org", "ans-sv-dif", "", "ans-members-org", "ans-members-dif", "", "ans-req-org", "ans-req-dif"], "ans-general-table", 1)}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-stats i-col-107'></i>", "CONTRIBUTION"], ["<span id='ans-label-5'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-6'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-7'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-8'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-9'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>", "<span id='ans-label-10'></span>", "<span class='ans-alc-al1'></span>", "<span class='ans-alc-al2'></span>"], ["", "ans-av-c-org", "ans-av-c-dif", "", "ans-av-sv-org", "ans-av-sv-dif", "", "ans-av-cd-org", "ans-av-cd-dif", "", "ans-av-cf-org", "ans-av-cf-dif", "", "ans-total-c-org", "ans-total-c-dif", "", "ans-total-cd-org", "ans-total-cd-dif"], "ans-cont-table", 2)}`
                    ]
                case 14:
                    return [
                        `<h4 class="tool-title">Player Statistics</h4>
                        ${UI.create.input(["text"], ["inp-pl"], [false], [false], [S.inp.pl], [S.placeholders.pl])}
                        ${UI.create.button("<i class='fa fa-search'></i> Search!", "execute", "Stats.player()")}`,
                        `${UI.create.returnButton()}
                        <div id='player-stats-main-box'></div>`
                    ]
                case 15:
                    return [
                        `<h4 class="tool-title">Alliance Statistics</h4>
                        ${UI.create.input(["text"], ["inp-al"], [false], [false], [S.inp.al], [S.placeholders.al])}
                        ${UI.create.button("<i class='fa fa-search'></i> Search!", "execute", "Stats.alliance()")}`,
                        `${UI.create.returnButton()}
                        <div id='alliance-stats-main-box' style="margin-top: 1rem"></div>`
                    ]
                case 16:
                    return [
                        `<h4 class="tool-title">Ticket Price Calculator</h4>
                        ${UI.create.sw(["inp-gm-1", "inp-gm-2"], ["Realism", "Easy"], "Game Mode")}
                        ${UI.create.input(["tel"], ["inp-dist"], [5], [true], [S.general.distance], [S.general.distance + " (km)"])}
                        ${UI.create.button("<i class='fa fa-search'></i> Calculate!", "execute", "Tools.ticket()")}`,
                        `${UI.create.returnButton()}<h4 id="result-title"></h4>
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-user i-col-108'></i>", "PAX"], [Func.img.y, Func.img.j, Func.img.f_low], ["ans-yp", "ans-jp", "ans-fp"], "ans-table-pax", 1)}
                        ${UI.create.table(["<i class='extended-glyphicons glyphicons glyphicons-cargo i-col-108'></i>", "CARGO"], [Func.img.l, Func.img.h], ["ans-lp", "ans-hp"], "ans-table-2", 2)}`
                    ]
                default:
                return ["", "ERR"]
            }
        }
    },
    create: {
        sw: (id, text, label) => {
            return `<div class="input-normal-box">
                <div class="input-normal-label" style="background-image: linear-gradient(to right, #1010e0, #1aa4ff)"><div>${label}</div></div>
                <button class="switch-left switch-selected transition" id="${id[0]}" onclick="UI.buttonSwitch('${id[0]}', '${id[1]}'); UI.colorDirection(this.parentNode.firstElementChild, true)">${text[0]}</button
                ><button class="switch-right transition" id="${id[1]}" onclick="UI.buttonSwitch('${id[1]}', '${id[0]}'); UI.colorDirection(this.parentNode.firstElementChild, false)">${text[1]}</button>
            </div>`
        }, //"tel", ["inp-dep", "inp-arr", "inp-plane", "inp-flpd", "inp-rep", "inp-fp", "inp-cp"], ["apt", "apt", "ac", false, false, false, false], [false, false, false, 2, 2, 4, 3])
        input: (type, id, maxLength, filter, label, placeholder) => {
            let i = 0, result = "", specialLabel, focusFunction = "UI.focus(this)"
            while(i < type.length) {
                if(placeholder[i] == S.placeholders.blank) specialLabel = "input-normal-label-special"
                else specialLabel = ""
                result += `<div class="input-normal-box"><div class="input-normal-label ${specialLabel}"><div>${label[i]}</div></div>
                <input type="${type[i]}" id="${id[i]}" class="input-normal transition" autocomplete="off" ${UI.create.maxLength(maxLength[i])} placeholder="${placeholder[i]}" ${UI.create.filter(filter[i], id[i])} onfocus="${focusFunction}" onblur="UI.blur(this)"></div>`
                i++
            }
            return result
        },
        button: (content, id, func) => {
            return `<button id="${id}" class="execute transition" onclick="${func}">${content}</button>`
        },
        table: (header, images, ids, tid, count) => {
            let i = 0, content = ""
            while(i < images.length) {
                content += `<tr>
                    <td class="ans-td-1">${images[i]}</td>
                    <td class="ans-td-2" id="${ids[i]}"></td>
                </tr>`
                i++
            }
            return `<div class="ans-table-box-outer" id="${tid}">
                <div class="ans-table-header">
                    <table style="width: 80%; margin: auto; text-transform: uppercase">
                        <tr>
                            <td style="text-align: left"><p>${header[0]}</p></td>
                            <td style="text-align: right"><p>${header[1]}</p></td>
                        </tr>
                    </table>
                </div>
                <div class="ans-table-box-inner" id="ans-table-box-inner-${count}">
                    <div id="ans-table-box-inner-box-${count}">
                        <table class="ans-table">
                            ${content}
                        </table>
                    </div>
                </div>
                <button class="ans-table-button" onclick="$(\`#ans-table-box-inner-${count}\`).slideToggle()"><i class="fa fa-caret-down"></i></button>
            </div>`
        },
        oldtable: (header, images, labels, ids, tid, headerCenter) => {
            let i = 0, content = "", isHeaderCenter = headerCenter
            while(i < images.length) {
                content += `<tr>
                    <td class="ans-td-1">${images[i]}</td>
                    <td style="text-align: left">${labels[i]}</td>
                    <td class="ans-td-2" id="${ids[i]}"></td>
                </tr>`
                i++
            }
            if(!isHeaderCenter) {
                headerStyle = 'style="text-align: left"'
            } else headerStyle = 'style="text-align: center"'
            return `<div id="${tid}">
                <table class="ans-table-old">
                    <tr ${headerStyle}><th colspan="3">${header}</th></tr>
                    ${content}
                </table>
            </div>`
        },
        slider: (id, min, max, label, labelid, unit, value) => {
            if(!value) value = 0
            if(!unit) unit = ""
            return `<div class="input-normal-box"><div class="input-normal-label"><div id="${labelid}">${label} -- 0/${max}${unit}</div></div><input type="range" class="slider" id="${id}" min="${min}" max="${max}" oninput="UI.slider(this.value, ${max}, '${labelid}', '${label}')" value="${value}"></div>`
        },
        returnButton: () => {
            return `<button class="ans-return" onclick="UI.inpans()"><i class="fa fa-long-arrow-alt-left"></i> Return</button>`
        },
        returnButtonDeletePlanes: () => {
            return `<button class="ans-return" onclick="UI.inpans(); $('#plane-result-box').empty()"><i class="fa fa-long-arrow-alt-left"></i> Return</button>`
        },
        maxLength: query => {
            if(!query) {
                return "maxlength=100"
            }
            return `maxlength=${query}`
        },
        filter: (query, id) => {
            if(!query) {
                return "oninput=''"
            }
            if(query == "d") {
                return `oninput="UI.filterInputDots('${id}')"`
            }
            return `oninput="UI.filterInput('${id}')"`
        }
    },
    autocomplete: {
        execute: (inp, arr) => {
            let currentFocus
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value
                closeAllLists()
                if(!val) {
                    return false
                }
                currentFocus = -1
                a = document.createElement("DIV")
                a.setAttribute("id", this.id + "autocomplete-list")
                a.setAttribute("class", "autocomplete-items")
                let hasChild = false
                this.parentNode.appendChild(a)
                for(i = 0; i < arr.length; i++) {
                    if(arr[i].toUpperCase().includes(val.toUpperCase())) {
                        hasChild = true
                        b = document.createElement("DIV")
                        b.innerHTML += arr[i]//<span class='autocomplete-vertical-align'>
                        b.innerHTML += `<input type='hidden' value="` + arr[i] + `">`
                        b.addEventListener("click", function (e) {
                            inp.value = this.getElementsByTagName("input")[0].value
                            closeAllLists()
                        })
                        a.appendChild(b)
                    }
                }
                if(!hasChild) {
                    closeAllLists()
                }
            })
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list")
                if(x) x = x.getElementsByTagName("div")
                if(e.keyCode == 40) {
                    currentFocus++
                    addActive(x)
                } else if(e.keyCode == 38) {
                    currentFocus--
                    addActive(x)
                } else if(e.keyCode == 9) {
                    if (currentFocus > -1) {
                        if (x) x[currentFocus].click()
                    }
                }
            })
            function addActive(x) {
                if(!x) return false
                removeActive(x)
                if(currentFocus >= x.length) currentFocus = 0
                if(currentFocus < 0) currentFocus = (x.length - 1)
                x[currentFocus].classList.add("autocomplete-active")
            }
            function removeActive(x) {
                for(var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active")
                }
            }
            function closeAllLists(elmnt) {
                var x = document.getElementsByClassName("autocomplete-items");
                for(var i = 0; i < x.length; i++) {
                    if(elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i])
                    } 
                }
            }
            document.addEventListener("click", e => {
                closeAllLists(e.target)
            })
        },
        execute2: (inp, arr) => {
            let currentFocus
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value
                closeAllLists()
                if(!val) {
                    return false
                }
                currentFocus = -1
                a = document.createElement("DIV")
                a.setAttribute("id", this.id + "autocomplete-list")
                a.setAttribute("class", "autocomplete-items")
                let hasChild = false
                this.parentNode.appendChild(a)
                for(i = 0; i < arr.length; i++) {
                    if(arr[i].toUpperCase().startsWith(val.toUpperCase())) {
                        hasChild = true
                        b = document.createElement("DIV")
                        b.innerHTML += `<b>${arr[i].substr(0, val.length)}</b>${arr[i].substr(val.length)}`
                        b.innerHTML += `<input type='hidden' value="` + arr[i] + `">`
                        b.addEventListener("click", function (e) {
                            inp.value = this.getElementsByTagName("input")[0].value
                            closeAllLists()
                        })
                        a.appendChild(b)
                    }
                }
                if(!hasChild) {
                    closeAllLists()
                }
            })
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list")
                if(x) x = x.getElementsByTagName("div")
                if(e.keyCode == 40) {
                    currentFocus++
                    addActive(x)
                } else if(e.keyCode == 38) {
                    currentFocus--
                    addActive(x)
                } else if(e.keyCode == 9) {
                    if(currentFocus > -1) {
                        if (x) x[currentFocus].click()
                    }
                }
            })
            function addActive(x) {
                if(!x) return false
                removeActive(x)
                if(currentFocus >= x.length) currentFocus = 0
                if(currentFocus < 0) currentFocus = (x.length - 1)
                x[currentFocus].classList.add("autocomplete-active")
            }
            function removeActive(x) {
                for(var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active")
                }
            }
            function closeAllLists(elmnt) {
                var x = document.getElementsByClassName("autocomplete-items");
                for(var i = 0; i < x.length; i++) {
                    if(elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i])
                    } 
                }
            }
            document.addEventListener("click", function (e) {
                closeAllLists(e.target)
            })
        },
        apt: id => {
            if(!AirportAutocomplete) {
                let lcsItem = Func.user.icia()
                let part1 = [], part2 = [], part3 = []
                if(lcsItem.includes("City Name")) {
                    part3 = Func.data.autocomplete.apt.nm(id)
                }
                if(lcsItem.includes("IATA")) {
                    part2 = Func.data.autocomplete.apt.ia(id)
                }
                if(lcsItem.includes("ICAO")) {
                    part1 = Func.data.autocomplete.apt.ic(id)
                }
                AirportAutocomplete = part1.concat(part2)
                AirportAutocomplete = AirportAutocomplete.concat(part3)
            }
            UI.autocomplete.execute2(document.getElementById(id), AirportAutocomplete)
        },
        ac: id => {
            if(!AircraftAutocomplete) {
                AircraftAutocomplete = Func.data.autocomplete.ac(id)
            }
            UI.autocomplete.execute(document.getElementById(id), AircraftAutocomplete)
        },
        car: id => {
            UI.autocomplete.execute(document.getElementById(id), ["DC3", "DC9", "B727-200F", "B377SG", "A310-300F", "A400M", "A300-600ST", "IL-76D", "B757-200F", "A300-600F", "IL-96T", "B767-300F", "A330-200F", "B777 Freighter", "B747-400F", "B747-8F", "AN-124", "A380-800F", "AN-225"])
        },
        paxcargo: id => {
            let PCAutocomplete = Func.data.autocomplete.ac(), i = 0, arr = ["DC3", "DC9", "B727-200F", "B377SG", "A310-300F", "A400M", "A300-600ST", "IL-76D", "B757-200F", "A300-600F", "IL-96T", "B767-300F", "A330-200F", "B777 Freighter", "B747-400F", "B747-8F", "AN-124", "A380-800F", "AN-225"]
            if(!PCAutocomplete.includes("AN-225")) {
                while(i < arr.length) {
                    PCAutocomplete.push(arr[i])
                    i++
                }
            }
            UI.autocomplete.execute(document.getElementById(id), PCAutocomplete)
        }
    },
    onoff: {
        //changeboth: elementToClick => elementToClick[0].checked = (elementToClick[0].checked == false) ? true : false,
        lightMap: () => {
            if($("#settings-map-1")[0].checked) $("#settings-map-2")[0].checked = false
            else if(!$("#settings-map-1")[0].checked) $("#settings-map-2")[0].checked = true
        },
        darkMap: () => {
            if($("#settings-map-2")[0].checked) $("#settings-map-1")[0].checked = false
            else if(!$("#settings-map-2")[0].checked) $("#settings-map-1")[0].checked = true
        },
        airport: element => {
            let element1 = $("#settings-code-1")[0]
            let element2 = $("#settings-code-2")[0]
            let element3 = $("#settings-code-3")[0]
            if(!element1.checked && !element2.checked && !element3.checked) element.checked = true
        },
        lang: languageCode => {
            if(Storage) localStorage.setItem("lang", languageCode)
        }
    },
    alertBox: (msg, col, btncol) => {
        if(!btncol) {
           btncol = '#fa5555'
        }
        $("#alert-text").html(msg)
        $("#alert-box").css({ backgroundColor: col, display: 'flex' })
        $("#alert-background").show()
        $("#alert-close").css({ backgroundColor: btncol })
    },
    switch: element => {
        let a = $(`#${element}`)[0]
        if(a.classList.contains("switch-selected")) {
            return true
        }
        return false
    },
    buttonSwitch: (id1, id2) => {
        $(`#${id1}`).addClass("switch-selected")
        $(`#${id2}`).removeClass("switch-selected")
    },
    filterInput: id => {
        let v = document.getElementById(id).value
        let i = 0, z = "", k
        while(i < 10) {
            k = v.charAt(i)
            if(parseInt(k) == 1 || parseInt(k) == 2 || parseInt(k) == 3 || parseInt(k) == 4 || parseInt(k) == 5 || parseInt(k) == 6 || parseInt(k) == 7 || parseInt(k) == 8 || parseInt(k) == 9 || parseInt(k) == 0) {
                z = z + k
            }
            i++
        }
        document.getElementById(id).value = z
    },
    filterInputDots: id => {
        let v = document.getElementById(id).value
        let i = 0, z = "", k
        while(i < 10) {
            k = v.charAt(i)
            if(parseInt(k) == 1 || parseInt(k) == 2 || parseInt(k) == 3 || parseInt(k) == 4 || parseInt(k) == 5 || parseInt(k) == 6 || parseInt(k) == 7 || parseInt(k) == 8 || parseInt(k) == 9 || parseInt(k) == 0 || k == ".") {
                z = z + k
            }
            i++
        }
        document.getElementById(id).value = z
    },
    inpans: () => {
        $('#tool-inp').show()
        $('#tool-ans').hide()
    },
    slider: (current, max, id, label) => {
        let a = $(`#${id}`)
        a.text(`${label} -- ${current}/${max}`)
    },
    openAddPlane: () => {
        $("#plane-add-window").slideToggle()
    },
    addPlane: () => {
        let plane = Func.data.get.paxcargo($("#plane-add-name").val())
        let amount = $("#plane-add-amount").val()
        if(!plane) return UI.alertBox(S.err.vac, '#fa3737')
        if(!amount) return UI.alertBox(S.err.inps, '#fa3737')
        let existing = $(".plane-added-name"), i = 0
        while(i < existing.length) {
            if(existing[i].innerHTML == plane.n) return UI.alertBox(S.err.already_added, '#fa3737')
            i++
        }
        $("#plane-container").append(`
        <div class='plane-added' style="background-color: #fff; cursor: initial">
            <div class='plane-added-1'>
                <img src='assets@V2.1/images/ac/${plane.pc}.png' class='plane-added-1-img'>
            </div>
            <p class='plane-added-2'>
                <b>
                    <span class='plane-added-name'>${plane.n}</span><br>
                    x <span class='plane-added-amount'>${amount}</span>
                </b>
                <button class='plane-added-remove' onclick="this.parentElement.parentElement.remove()"><i class='fa fa-times'></i></button>
            </p>
        </div>`)
    },
    actab: {
        open: ac => {
            $("#ac-tab").show()
            $("#popup-tab").hide()
            let data = Func.data.get.paxcargo(ac.toLowerCase())
            let data2 = Func.data.get.paxcargo(ac.toLowerCase())
            let mcString = (data.cap > 700) ? `$${Func.cn(data.mC * 2)}<br>$${Func.cn(data.mC)}` : `$${Func.cn(data.mC)}<br>$${Func.cn(Math.round(data.mC / 2))}`
            $("#ac-stats-output-1").text(Func.cn(data.speed) + " kph")
            $("#ac-stats-output-2").text(Func.cn(data.cap))
            $("#ac-stats-output-3").text(data.fConsmp + " lbs/km")
            $("#ac-stats-output-4").text(`${data.cConsmp} ${(data.cap > 700) ? "kg/1k/km" : "kg/p/km"}`)
            $("#ac-stats-output-5").html(`${mcString}`)
            $("#ac-stats-output-6").text(data.mH + " H")
            $("#ac-stats-output-7").text(Func.cn(data.range) + " km")
            $("#ac-stats-output-8").text(Func.cn(data.rwy) + " ft")
            $("#ac-stats-output-9").text("$" + Func.cn(data.price))
            if(data.cap > 700) data.mC = data.mC * 2
            if(data.cap < 700) data2.mC = data2.mC / 2
            let profit = [Basics.pax.profit.general(data, true), Basics.pax.profit.general(data2, false)]
            $("#ac-stats-output-10").html(`$${Func.cn(profit[0])}<br>$${Func.cn(profit[1])}`)
            $("#ac-tab-name").text(`${data.c}, ${data.n}`).css({ textTransform: 'uppercase' })
            $("#ac-head-img").attr("src", `assets@V2.1/images/ac/${data.pc}.png`)
        },
        close: () => {
            $("#ac-tab").hide()
            $("#popup-tab").show()
        }
    },
    announceResize: () => {
        if(window.getComputedStyle($("#announce-box")[0], null).getPropertyValue("left") != "0px") {
            $("#announce-box").css({ left: `-${window.getComputedStyle($("#announce-box")[0], null).getPropertyValue("width")}` })
        }
    },
    addTools: () => {
        if(!tools) {
            $("body").append('<script src="assets@V2.1/javascript/basics.js" type="text/javascript"></script>')
            $("body").append('<script src="assets@V2.1/javascript/tools.js" type="text/javascript"></script>')
            tools = true
        }
    },
    addStats: () => {
        if(!stats) {
            $("body").append('<script src="assets@V2.1/javascript/stats.js" type="text/javascript"></script>')
            $("body").append('<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>')
            stats = true
        }
    },
    sendReport: () => {
        $("#report-send").addClass("loading-animation").html("<i class='extended-glyphicons glyphicons glyphicons-refresh'></i>")
        let title = $("#report-title").val()
        let name = $("#report-airline").val()
        let content = $("#report-description").val()
        if(title == "" || name == "" || content == "") return UI.alertBox(S.err.inps, '#fa3737')
        $.get(`assets@V2.1/php/processFeedback.php/?title=${title}&name=${name}&content=${content}`, () => {
            $("#report-send").html("<i class='fa fa-check-circle'></i> SUCCESS!").css({
                boxShadow: 'none',
                backgroundColor: '#268129',
                cursor: "not-allowed"
            })
        })
    },
    saveSettings: () => {
        Func.user.map()
        let element1 = $("#settings-code-1")[0], element2 = $("#settings-code-2")[0], element3 = $("#settings-code-3")[0], finalString = ""
        if(element1.checked) finalString += "IATA"
        if(element2.checked) finalString += "ICAO"
        if(element3.checked) finalString += "City Name"
        if(Storage) localStorage.setItem("aptautocomplete", finalString)
        UI.onoff.lang($("#settings-language-select").val())
        location.reload()
    },
    colorDirection: (element, direction) => {
        if(direction) element.style.backgroundImage = 'linear-gradient(to right, #1010e0, #1aa4ff)' 
        else if(!direction) element.style.backgroundImage = 'linear-gradient(to left, #1010e0, #1aa4ff)'
    },
    // focus: {
    //     grey: element => {
    //         $(element).prev().addClass("input-normal-label-grey")
    //     },
    //     blue: element => {
    //         $(element).prev().addClass("input-normal-label-blue")
    //     }
    // },
    focus: element => {
        if($(element).prev().css("background-image") == "linear-gradient(to left, rgb(16, 80, 255), rgb(26, 148, 255))") $(element).prev().addClass("input-normal-label-blue")
        else $(element).prev().addClass("input-normal-label-grey")
    },
    blur: element => {
        $(element).prev().removeClass("input-normal-label-grey")
        $(element).prev().removeClass("input-normal-label-blue")
    }
}
$(".topnav-icon-filter").click(() => {
    $("#popup-background, #mapfilter-tab").show()
    $("#popup-tab, #settings-tab, #ac-tab").hide()
})
$(".topnav-icon-mail").click(() => {
    // UI.alertBox(S.contact, 'rgb(40, 167, 69)', 'rgb(40, 204, 119)')
    UI.popup.open("FEEDBACK", [])
    UI.inpans()
    $("#tool-inp").html(`<h4>CONTACT US!</h4>
    <label for="report-title">${S.report.lb.title}</label><br>
    <div><input type="text" id="report-title" class="input-old transition" autocomplete="off" maxlength="100" placeholder="${S.report.ph.title}"></div>
    <label for="report-airline">${S.report.lb.airline}</label><br>
    <div><input type="text" id="report-airline" class="input-old transition" autocomplete="off" maxlength="100" placeholder="${S.report.ph.airline}"></div>
    <label for="report-description">${S.report.lb.description}</label><br>
    <textarea id="report-description" class="input-old transition" maxlength="500" placeholder="${S.report.ph.description}" autocomplete="off"></textarea><br>
    ${UI.create.button("<i class='fa fa-paper-plane'></i> SEND", "report-send", "UI.sendReport()")}`)
    $("#popup-tab-ctrl").hide()
})
$(".topnav-icon-settings").click(() => {
    $("#popup-background, #settings-tab").show()
    $("#popup-tab, #mapfilter-tab, #ac-tab").hide()
})
$("#navbtns-2").click(() => {
    UI.popup.open("BASIC TOOLS", [["PAX", "<span class='fa fa-users'></span>", async () => { await UI.tools.add(1); UI.popup.buttonFocus("tool-ctrl-1"); UI.inpans(); UI.autocomplete.apt("inp-dep"); UI.autocomplete.apt("inp-arr"); UI.autocomplete.ac("inp-ac") }, true, "width: 33.3%", "tool-ctrl-1"], ["Cargo", "<span class='glyphicons glyphicons-cargo'></span>", async () => { await UI.tools.add(2); UI.popup.buttonFocus("tool-ctrl-2"); UI.inpans(); UI.autocomplete.apt("inp-dep"); UI.autocomplete.apt("inp-arr"); UI.autocomplete.car("inp-ac") }, false, "width: 33.3%", "tool-ctrl-2"], ["TICKET", "<span class='fa fa-ticket'></span>", async () => { await UI.tools.add(16); UI.popup.buttonFocus("tool-ctrl-3"); UI.inpans() }, false, "width: 33.3%", "tool-ctrl-3"]])
    $("#tool-ctrl-1").click()
    UI.addTools()
})
$("#navbtns-3").click(async () => {
    UI.popup.open("ROUTE TOOLS", [["STOPOVER", "<span class='fa fa-plane-arrival'></span>", async () => { await UI.tools.add(3); UI.popup.buttonFocus("tool-ctrl-1"); UI.inpans(); UI.autocomplete.apt("inp-dep"); UI.autocomplete.apt("inp-arr") }, true, "width: 50%", "tool-ctrl-1"], ["MARKET", "<span class='fa fa-search-dollar'></span>", async () => { await UI.tools.add(4); UI.popup.buttonFocus("tool-ctrl-2"); UI.inpans(); UI.autocomplete.apt("inp-dep"); $("#label-minm").text("Min. Market% -- 90/90%") }, false, "width: 50%", "tool-ctrl-2"]])
    $("#tool-ctrl-1").click()
    UI.addTools()
})
$("#navbtns-4").click(async () => {
    UI.popup.open("PLANE TOOLS", [["RESELL", "<span class='fa fa-paper-plane'></span>", async () => { await UI.tools.add(5); UI.popup.buttonFocus("tool-ctrl-1"); UI.inpans(); UI.autocomplete.ac("inp-ac") }, true, "width: 33.3%", "tool-ctrl-1"], ["ESTIMATE", "<span class='fa fa-search-dollar'></span>", async () => { await UI.tools.add(6); UI.popup.buttonFocus("tool-ctrl-2"); UI.inpans(); UI.autocomplete.paxcargo("inp-ac"); UI.autocomplete.apt("inp-dep"); UI.autocomplete.apt("inp-arr") }, false, "width: 33.3%", "tool-ctrl-2"], ["FLEET", "<span class='fa fa-plane'></span>", async () => { await UI.tools.add(7); UI.popup.buttonFocus("tool-ctrl-3"); UI.inpans(); UI.autocomplete.paxcargo("plane-add-name") }, false, "width: 33.3%", "tool-ctrl-3"]])
    $("#tool-ctrl-1").click()
    UI.addTools()
})
$("#navbtns-5").click(async () => {
    UI.popup.open("RESEARCH", [["PLANE", "<span class='fa fa-plane'></span>", async () => { await UI.tools.add(8); UI.popup.buttonFocus("tool-ctrl-1"); UI.inpans() }, true, "width: 50%", "tool-ctrl-1"], ["ROUTE", "<span class='fa fa-route'></span>", async () => { await UI.tools.add(9); UI.popup.buttonFocus("tool-ctrl-2"); UI.inpans(); UI.autocomplete.apt("inp-dep"); UI.autocomplete.paxcargo("inp-ac") }, false, "width: 50%", "tool-ctrl-2"]])
    $("#tool-ctrl-1").click()
    UI.addTools()
})
$("#navbtns-6").click(async () => {
    UI.popup.open("COMPARISON", [["PLANE", "<span class='fa fa-plane'></span>", async () => { await UI.tools.add(10); UI.popup.buttonFocus("tool-ctrl-1"); UI.inpans(); UI.autocomplete.paxcargo("inp-ac-1"); UI.autocomplete.paxcargo("inp-ac-2") }, true, "width: 50%", "tool-ctrl-1"], ["ROUTE", "<span class='fa fa-route'></span>", async () => { await UI.tools.add(11); UI.popup.buttonFocus("tool-ctrl-2"); UI.inpans(); UI.autocomplete.apt("inp-r1-dep"); UI.autocomplete.apt("inp-r1-arr"); UI.autocomplete.apt("inp-r2-dep"); UI.autocomplete.apt("inp-r2-arr"); UI.autocomplete.paxcargo("inp-ac") }, false, "width: 50%", "tool-ctrl-2"], ["PLAYER", "<span class='fa fa-user'></span>", async () => { await UI.tools.add(12); UI.popup.buttonFocus("tool-ctrl-3"); UI.inpans(); UI.addStats() }, false, "width: 50%", "tool-ctrl-3"], ["ALLIANCE", "<span class='fa fa-star'></span>", async () => { await UI.tools.add(13); UI.popup.buttonFocus("tool-ctrl-4"); UI.inpans(); UI.addStats() }, false, "width: 50%", "tool-ctrl-4"]])
    $("#tool-ctrl-1").click()
    UI.addTools()
})
$("#navbtns-7").click(async () => {
    UI.popup.open("STATS", [["PLAYER", "<span class='fa fa-user'></span>", async () => { await UI.tools.add(14); UI.popup.buttonFocus("tool-ctrl-1"); UI.inpans() }, true, "width: 50%", "tool-ctrl-1"], ["ALLIANCE", "<span class='fa fa-star'></span>", async () => { await UI.tools.add(15); UI.popup.buttonFocus("tool-ctrl-2"); UI.inpans() }, false, "width: 50%", "tool-ctrl-2"]])
    $("#tool-ctrl-1").click()
    UI.addTools()
    UI.addStats()
})
$("#popup-tab-header-title-closebtn, #settings-tab-header-title-closebtn, #mapfilter-tab-header-title-closebtn").click(() => {
    $("#popup-background, #popup-tab, #settings-tab, #mapfilter-tab").hide()
})
$("#ac-tab-header-title-closebtn").click(() => {
    UI.actab.close()
})
$("#alert-close").click(() => {
    $("#alert-background").hide()
})
$("#ac-stats-box table tr").addClass("text-left")
$("#announce-ctrl, #navbtns-1").click(() => {
    let element = $("#announce-box")[0]
    if(window.getComputedStyle(element, null).getPropertyValue("left") == "0px") element.style.left = `-${window.getComputedStyle($("#announce-box")[0], null).getPropertyValue("width")}`
    else element.style.left = "0px"
    // $("#announce-ctrl-icon").toggleClass("fa-chevron-left").toggleClass("fa-chevron-right")
})
$("#announce-box").css({ left: `-${$("#announce-box").prev().css("width")}` })
// document.onkeyup = e => {
//     e.preventDefault()
//     let key = e.which || e.keyCode
//     if(e.altKey && key == 65) {
//         location.href = "https://airline4.net"
//     } else if(e.altKey && key == 68) {
//         location.href = "https://discord.gg/snps6Ye"
//     } /*else if(key == 8) {
//         $("#popup-background, #popup-tab, #settings-tab, #mapfilter-tab, #ac-tab").hide()
//     } */else if(key == 13) {
//         if($("#execute").length > 0) {
//             if(window.getComputedStyle($("#execute")[0], null).getPropertyValue("display") != "none") {
//                 $("#execute").click()
//             }
//         }
//     } else if(e.altKey && key == 49) {
//         $("#navbtns-2").click()
//     } else if(e.altKey && key == 50) {
//         $("#navbtns-3").click()
//     } else if(e.altKey && key == 51) {
//         $("#navbtns-4").click()
//     } else if(e.altKey && key == 52) {
//         $("#navbtns-5").click()
//     } else if(e.altKey && key == 53) {
//         $("#navbtns-6").click()
//     } else if(e.altKey && key == 54) {
//         $("#navbtns-7").click()
//     }
// }
$(document).on('keyup', e => {
    if(!$(e.target).is(':input')){
        e.preventDefault()
        let key = e.which || e.keyCode
        if(e.shiftKey && key == 65) {
            location.href = "https://airline4.net"
        } else if(e.shiftKey && key == 68) {
            location.href = "https://discord.gg/snps6Ye"
        } /*else if(key == 8) {
            $("#popup-background, #popup-tab, #settings-tab, #mapfilter-tab, #ac-tab").hide()
        } */else if(e.shiftKey && key == 49) {
            $("#navbtns-2").click()
        } else if(e.shiftKey && key == 50) {
            $("#navbtns-3").click()
        } else if(e.shiftKey && key == 51) {
            $("#navbtns-4").click()
        } else if(e.shiftKey && key == 52) {
            $("#navbtns-5").click()
        } else if(e.shiftKey && key == 53) {
            $("#navbtns-6").click()
        } else if(e.shiftKey && key == 54) {
            $("#navbtns-7").click()
        }
    }
})
$(document).on('keyup', e => {
    e.preventDefault()
    let key = e.which || e.keyCode
    if(key == 13) {
        if($("#execute").length > 0 && $("#tool-inp").css("display") == "block" && $("#popup-tab").css("display") == "block") {
            if($("#execute").prev().css("display") != "none") {
                $("#execute").click()
            }
        }
    }
})
setTimeout(() => {
    Func.data.set.airport()
    Func.data.set.airportID()
    Func.data.set.plane()
    Func.data.set.planeID()
    Func.data.set.cargo()
    Func.data.set.cargoID()
}, 2000)