checkL()
function checkL() {
    if(typeof L != "object") {
        console.log("Failed to load map")
        setTimeout(checkL, 500)
    } else createMap()
}
function createMap() {
    LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'assets@V2.1/images/other/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            shadowAnchor: [12, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34] // finish this
        }
    })
    blueIcon = new LeafIcon({iconUrl: 'assets@V2.1/images/other/marker-blue.png'})
    redIcon = new LeafIcon({iconUrl: 'assets@V2.1/images/other/marker-red.png'})
    BackgroundMap = L.map('map', {
        zoomControl:false,
        minZoom: 3,
        maxZoom: 5,
        useCache: true,
        crossOrigin: true,
        attributionControl: false,
        maxBoundsViscosity: 1.0,
        worldCopyJump: true
    }).setView([40.63975, -73.778925], 3.5)
    // let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // let tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // let tiles = L.tileLayer(tileURL, { attribution })
    // tiles.addTo(BackgroundMap)
    if(Storage) {
        if(localStorage.getItem("map") == "light" || localStorage.getItem("map") == null) {
            L.tileLayer('https://tile.jawg.io/4e159650-d2ec-4395-bf40-db058de12603/{z}/{x}/{y}{r}.png?access-token={accessToken}&lang=en', {
                accessToken: 'xRaQuIu0JAWHEpAFuQ5xHxvgOuogAz21wX5aSGjS77e4tujtufZElluXPL50cpRQ',
                attribution: "<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors"
            }).addTo(BackgroundMap)
            $("#settings-map-1")[0].checked = true
            $("#settings-map-2")[0].checked = false
        } else if(localStorage.getItem("map") == "dark") {
            L.tileLayer("https://api.mapbox.com/styles/v1/shjorth/cjqmbmmfg0clf2so7pama2bpx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hqb3J0aCIsImEiOiJjanBndno3aGMwbzFmM3dwZm52dHd6ZjJxIn0.8DA0hdaUkaL4TlSz2H4ecA", { }).addTo(BackgroundMap)
            $("#settings-map-2")[0].checked = true
            $("#settings-map-1")[0].checked = false
        }
    } else {
        L.tileLayer('https://tile.jawg.io/4e159650-d2ec-4395-bf40-db058de12603/{z}/{x}/{y}{r}.png?access-token={accessToken}&lang=en', {
            accessToken: 'xRaQuIu0JAWHEpAFuQ5xHxvgOuogAz21wX5aSGjS77e4tujtufZElluXPL50cpRQ',
            attribution: "<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors"
        }).addTo(BackgroundMap)
        $("#settings-map-1")[0].checked = true
        $("#settings-map-2")[0].checked = false
    }
    // L.tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}&lang=en', {
    //     attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     minZoom: 0,
    //     maxZoom: 22,
    //     subdomains: 'abcd',
    //     accessToken: 'xRaQuIu0JAWHEpAFuQ5xHxvgOuogAz21wX5aSGjS77e4tujtufZElluXPL50cpRQ'
    // }).addTo(BackgroundMap)
    let i = 1, scndCount = 0, getData
    while(i < 387) {
        getData = GoodMarket[i]
        let lat = getData[0], lon = getData[1], m = getData[2], c = getData[3], n = getData[4], ia = getData[5], ic = getData[6], r = getData[7]
        if(m >= 85 && m < 90) {
            marker[scndCount] = new L.Marker([parseFloat(lat), parseFloat(lon)], {icon:blueIcon})
            BackgroundMap.addLayer(marker[scndCount])
            marker[scndCount].bindPopup(`<b>${n}, ${c}<br>${ia} | ${ic}</b><br>Market: ${m}%<br>Runway: ${r} ft`)
            scndCount++
        } else if(m == 90) {
            marker[scndCount] = new L.Marker([parseFloat(lat), parseFloat(lon)], {icon:redIcon})
            BackgroundMap.addLayer(marker[scndCount])
            marker[scndCount].bindPopup(`<b>${n}, ${c}<br>${ia} | ${ic}</b><br>Market: ${m}%<br>Runway: ${r} ft`)
            scndCount++
        }
        i++
    }
    setTimeout(() => {
        $("#preloader").css({ opacity: .9 })
        setTimeout(() => {
            $("#preloader").css({ opacity: .8 })
            setTimeout(() => {
                $("#preloader").css({ opacity: .7 })
                setTimeout(() => {
                    $("#preloader").css({ opacity: .6 })
                    setTimeout(() => {
                          $("#preloader").css({ opacity: .5 })
                        setTimeout(() => {
                            $("#preloader").css({ opacity: .4 })
                            setTimeout(() => {
                                $("#preloader").css({ opacity: .3 })
                                setTimeout(() => {
                                    $("#preloader").css({ opacity: .2 })
                                    setTimeout(() => {
                                        $("#preloader").css({ opacity: .1 })
                                        setTimeout(() => {
                                            $("#preloader").hide()
                                        }, 40)
                                    }, 40)
                                }, 40)
                            }, 40)
                        }, 40)
                    }, 40)
                }, 40)
            }, 40)
        }, 40)
    }, 40)
    BackgroundMap.invalidateSize()
    setInterval(() => {
        BackgroundMap.invalidateSize()
    }, 30000)
}
$("#map-rwy-execute").click(function(){
    let rwy = $("#map-rwy").val()
    if(rwy != "") {
        let ii = 0
        while(ii < marker.length) {
            BackgroundMap.removeLayer(marker[ii])
            ii++
        }
        marker = []
        let ml = 0, j = 1, mapData, lat, lon, m, c, n, ia, ic, r, checkLength = GoodMarket.length
        while(j < checkLength) {
            mapData = GoodMarket[j]
            lat = mapData[0]; lon = mapData[1]; m = mapData[2]; c = mapData[3]; n = mapData[4]; ia = mapData[5]; ic = mapData[6]; r = mapData[7]
            if(r >= rwy && m >= 85 && m < 90) {
                marker[ml] = new L.Marker([lat, lon], {icon:blueIcon})
                BackgroundMap.addLayer(marker[ml])
                marker[ml].bindPopup(`<b>${n}, ${c}</b><br>Market%: ${m}<br>Runway: ${r}ft<br>${ia}/${ic}`)
                ml++
            } else if(r >= rwy && m == 90) {
                marker[ml] = new L.Marker([lat, lon], {icon:redIcon})
                BackgroundMap.addLayer(marker[ml])
                marker[ml].bindPopup(`<b>${n}, ${c}</b><br>Market%: ${m}<br>Runway: ${r}ft<br>${ia}/${ic}`)
                ml++
            }
            j++
        }
    }
})