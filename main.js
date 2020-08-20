// var currentLocation = {};
// //   var sf = { lat: 37.7749, lng: -122.4194 };

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(pos) {
//   var crd = pos.coords;

//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
//   currentLocation.lat = parseFloat(crd.latitude);
//   currentLocation.lng = parseFloat(crd.longitude);

//   getAllBike(crd);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

const titleSub = document.querySelector(".title-sub");
const bikeTable = document.querySelector("table");
const bikeTableBody = document.getElementById("bike-table-body");
const exampleMapText = document.getElementById("example-map");
const exploreBtn = document.querySelector(".explore-btn");
const cityBtn = document.getElementById("city-list-btn");
const countryBtn = document.getElementById("country-list-btn");
const citySelect = document.getElementById("city-select");
const countrySelect = document.getElementById("country-select");

var countryShort = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States Of",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

// list of country codes
const countries = {
  Afghanistan: "AF",
  "Aland Islands": "AX",
  Albania: "AL",
  Algeria: "DZ",
  "American Samoa": "AS",
  Andorra: "AD",
  Angola: "AO",
  Anguilla: "AI",
  Antarctica: "AQ",
  "Antigua And Barbuda": "AG",
  Argentina: "AR",
  Armenia: "AM",
  Aruba: "AW",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bermuda: "BM",
  Bhutan: "BT",
  Bolivia: "BO",
  "Bosnia And Herzegovina": "BA",
  Botswana: "BW",
  "Bouvet Island": "BV",
  Brazil: "BR",
  "British Indian Ocean Territory": "IO",
  "Brunei Darussalam": "BN",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Cape Verde": "CV",
  "Cayman Islands": "KY",
  "Central African Republic": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  "Christmas Island": "CX",
  "Cocos (Keeling) Islands": "CC",
  Colombia: "CO",
  Comoros: "KM",
  Congo: "CG",
  "Congo, Democratic Republic": "CD",
  "Cook Islands": "CK",
  "Costa Rica": "CR",
  "Cote D'Ivoire": "CI",
  Croatia: "HR",
  Cuba: "CU",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  "Dominican Republic": "DO",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  Eritrea: "ER",
  Estonia: "EE",
  Ethiopia: "ET",
  "Falkland Islands (Malvinas)": "FK",
  "Faroe Islands": "FO",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  "French Guiana": "GF",
  "French Polynesia": "PF",
  "French Southern Territories": "TF",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Gibraltar: "GI",
  Greece: "GR",
  Greenland: "GL",
  Grenada: "GD",
  Guadeloupe: "GP",
  Guam: "GU",
  Guatemala: "GT",
  Guernsey: "GG",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Guyana: "GY",
  Haiti: "HT",
  "Heard Island & Mcdonald Islands": "HM",
  "Holy See (Vatican City State)": "VA",
  Honduras: "HN",
  "Hong Kong": "HK",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  "Iran, Islamic Republic Of": "IR",
  Iraq: "IQ",
  Ireland: "IE",
  "Isle Of Man": "IM",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jersey: "JE",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kiribati: "KI",
  Korea: "KR",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  "Lao People's Democratic Republic": "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  "Libyan Arab Jamahiriya": "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Macao: "MO",
  Macedonia: "MK",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  "Marshall Islands": "MH",
  Martinique: "MQ",
  Mauritania: "MR",
  Mauritius: "MU",
  Mayotte: "YT",
  Mexico: "MX",
  "Micronesia, Federated States Of": "FM",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Montserrat: "MS",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Netherlands: "NL",
  "Netherlands Antilles": "AN",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  Niue: "NU",
  "Norfolk Island": "NF",
  "Northern Mariana Islands": "MP",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palau: "PW",
  "Palestinian Territory, Occupied": "PS",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Pitcairn: "PN",
  Poland: "PL",
  Portugal: "PT",
  "Puerto Rico": "PR",
  Qatar: "QA",
  Reunion: "RE",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  "Saint Barthelemy": "BL",
  "Saint Helena": "SH",
  "Saint Kitts And Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Martin": "MF",
  "Saint Pierre And Miquelon": "PM",
  "Saint Vincent And Grenadines": "VC",
  Samoa: "WS",
  "San Marino": "SM",
  "Sao Tome And Principe": "ST",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "Solomon Islands": "SB",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Georgia And Sandwich Isl.": "GS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  "Svalbard And Jan Mayen": "SJ",
  Swaziland: "SZ",
  Sweden: "SE",
  Switzerland: "CH",
  "Syrian Arab Republic": "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Togo: "TG",
  Tokelau: "TK",
  Tonga: "TO",
  "Trinidad And Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  "Turks And Caicos Islands": "TC",
  Tuvalu: "TV",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  "United States Outlying Islands": "UM",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  Venezuela: "VE",
  Vietnam: "VN",
  "Virgin Islands, British": "VG",
  "Virgin Islands, U.S.": "VI",
  "Wallis And Futuna": "WF",
  "Western Sahara": "EH",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

getAllBike();

let form = document.getElementById("location-form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const country = formData.get("country");
  const city = formData.get("city");

  console.log(country, city);

  const countryCode = countries[country];

  removeTable();
  removeNav(document.getElementById("nav"));
  console.log(country, countryCode, city);
  getBike(country, countryCode, city);
}

// Google Maps API
let map;
// Initialize and add the map
function initMap() {
  var sf = { lat: 37.7946, lng: -122.3999 };
  // var barcelona = { lat: 41.4851, lng: 2.1734 };
  // The map, centered at user's current location
  // console.log(currentLocation);
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: sf,
  });
}

var worldData = [];
var city = [];
var country = [];
// get SF Bike Stations as dafault : initial plan was to get stations all over the world by default but that is too much network requests.
function getAllBike() {
  $.ajax({
    method: "GET",
    url: "http://api.citybik.es/v2/networks",
    success: function (data) {
      worldData = data;
      for (var i = 0; i < worldData.networks.length; i++) {
        city.push(worldData.networks[i].location.city);
        country.push(worldData.networks[i].location.country);
      }

      city = [...new Set(city)];
      country = [...new Set(country)];

      createCitySelectTags(city);
      createCountrySelectTags(country);
      for (var i = 0; i < data.networks.length; i++) {
        if (data.networks[i].location.city === "San Francisco Bay Area, CA") {
          $.ajax({
            method: "GET",
            url: "http://api.citybik.es" + data.networks[i].href,
            success: function (data) {
              console.log(data);
              for (let j = 0; j < data.network.stations.length; j++) {
                const marker = new google.maps.Marker({
                  position: {
                    lat: data.network.stations[j].latitude,
                    lng: data.network.stations[j].longitude,
                  },
                });
                marker.setMap(map);
                map.setZoom(11);
              }
            },
            error: function (err) {
              console.log(err);
            },
          });
        }
      }
    },

    error: function (err) {
      console.log(err);
    },
  });
}

function createCitySelectTags(cityArr) {
  cityArr = cityArr.sort();
  for (var i = 0; i < cityArr.length; i++) {
    var option = document.createElement("option");
    option.value = cityArr[i];
    option.textContent = cityArr[i];
    citySelect.appendChild(option);
  }
}

function createCountrySelectTags(countryArr) {
  for (var i = 0; i < countryArr.length; i++) {
    countryArr[i] = countryShort[countryArr[i]];
  }
  countryArr = countryArr.sort();
  for (var i = 0; i < countryArr.length; i++) {
    var option = document.createElement("option");
    option.value = countryArr[i];
    option.textContent = countryArr[i];
    countrySelect.appendChild(option);
  }
}

var totalStations = 0;
function getBike(country, countryCode, city) {
  $.ajax({
    method: "GET",
    url: "http://api.citybik.es/v2/networks",
    success: function (data) {
      totalStations = 0;
      bikeTable.classList.remove("d-none");
      exampleMapText.classList.add("d-none");
      const regionData = [];
      // let totalStations = 0;

      if (!city) {
        city = "";
        for (let i = 0; i < data.networks.length; i++) {
          if (data.networks[i].location.country.includes(countryCode)) {
            regionData.push(data.networks[i]);
          }
        }
      } else if (!country) {
        country = "";
        for (let i = 0; i < data.networks.length; i++) {
          if (data.networks[i].location.city.includes(city)) {
            regionData.push(data.networks[i]);
          }
        }
      } else {
        for (let i = 0; i < data.networks.length; i++) {
          if (
            data.networks[i].location.city.includes(city) &&
            data.networks[i].location.country.includes(countryCode)
          ) {
            regionData.push(data.networks[i]);
          }
        }
      }
      console.log(regionData);
      if (regionData.length != 0) {
        let totalLat = 0;
        let totalLng = 0;
        for (let i = 0; i < regionData.length; i++) {
          totalLat += regionData[i].location.latitude;
          totalLng += regionData[i].location.longitude;
        }

        // change the center of the map and zoom in
        map.setCenter({
          lat: totalLat / regionData.length,
          lng: totalLng / regionData.length,
        });
      }

      for (let i = 0; i < regionData.length; i++) {
        $.ajax({
          method: "GET",
          url: "http://api.citybik.es" + regionData[i].href,
          success: function (data) {
            console.log(data);
            console.log(data.network.stations); // this has lat and long of stations and emply slots and free bikes number

            if (city && country) {
              titleSub.textContent =
                "Bike stations in " + city + ", " + country;
            } else if (!country) {
              titleSub.textContent = "Bike stations in " + city;
            } else if (!city) {
              titleSub.textContent = "Bike stations in " + country;
            }

            totalStations += data.network.stations.length;
            console.log("total stations:", totalStations);
            displayTotal(totalStations);
            for (let j = 0; j < data.network.stations.length; j++) {
              const marker = new google.maps.Marker({
                position: {
                  lat: data.network.stations[j].latitude,
                  lng: data.network.stations[j].longitude,
                },
              });

              var content =
                "<h5>" +
                data.network.stations[j].name +
                "</h5>" +
                "<div><h6>Available Bikes: " +
                data.network.stations[j].empty_slots +
                "</h6></div>" +
                "<div><h6>" +
                "Available E-Bikes: " +
                data.network.stations[j].extra.ebikes +
                "</h6></div>";

              var infowindow = new google.maps.InfoWindow();

              google.maps.event.addListener(
                marker,
                "click",
                (function (content) {
                  return function () {
                    infowindow.setContent(content);
                    infowindow.open(map, this);
                  };
                })(content)
              );

              marker.setMap(map);

              // fill in the table in DOM
              const stationName = data.network.stations[j].name;
              const totalBikes = data.network.stations[j].free_bikes;
              const availableBikes = data.network.stations[j].empty_slots;
              let eBikes = data.network.stations[j].extra.ebikes;

              if (!eBikes) {
                eBikes = 0;
              }

              addToTable(
                stationName,
                totalBikes,
                availableBikes,
                eBikes,
                country,
                city
              );
            }
            map.setZoom(5);
            pageTable();
          },
          error: function (err) {
            console.log(err);
          },
        });
      }

      exploreBtn.textContent = "Explore Another Location";
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function displayTotal(totalStations) {
  document.getElementById("stats").textContent =
    "There are total " + totalStations + " Bike Stations in this area";
}

function removeNav(nav) {
  console.log("hello from nav");
  console.log(nav);
  if (nav) {
    nav.remove();
  }
}

function removeTable() {
  while (bikeTableBody.firstElementChild) {
    bikeTableBody.removeChild(bikeTableBody.firstElementChild);
  }
}

function addToTable(
  stationName,
  totalBikes,
  availableBikes,
  eBikes,
  country,
  city
) {
  exampleMapText.classList.add("d-none");
  const newRow = document.createElement("tr");
  const stationTd = document.createElement("td");
  const totalBikesTd = document.createElement("td");
  const availableBikesTd = document.createElement("td");
  const eBikesTd = document.createElement("td");
  const cityTd = document.createElement("td");
  const countryTd = document.createElement("td");

  stationTd.classList.add("station");
  totalBikesTd.classList.add("total-bikes");
  availableBikesTd.classList.add("available-bikes");
  eBikesTd.classList.add("e-bikes");
  cityTd.classList.add("city");
  countryTd.classList.add("country");

  stationTd.textContent = stationName;
  totalBikesTd.textContent = totalBikes;
  availableBikesTd.textContent = availableBikes;
  eBikesTd.textContent = eBikes;
  cityTd.textContent = city;
  countryTd.textContent = country;

  newRow.append(
    stationTd,
    cityTd,
    countryTd,
    totalBikesTd,
    availableBikesTd,
    eBikesTd
  );
  bikeTableBody.appendChild(newRow);
}

function pageTable() {
  $(document).ready(function () {
    $("#data").after('<div id="nav"></div>');
    var rowsShown = 10;
    var rowsTotal = $("#data tbody tr").length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      $("#nav").append('<a href="#" rel="' + i + '">' + pageNum + "</a> ");
    }
    $("#data tbody tr").hide();
    $("#data tbody tr").slice(0, rowsShown).show();
    $("#nav a:first").addClass("active");
    $("#nav a").bind("click", function () {
      $("#nav a").removeClass("active");
      $(this).addClass("active");
      var currPage = $(this).attr("rel");
      var startItem = currPage * rowsShown;
      var endItem = startItem + rowsShown;
      $("#data tbody tr")
        .css("opacity", "0.0")
        .hide()
        .slice(startItem, endItem)
        .css("display", "table-row")
        .animate({ opacity: 1 }, 300);
    });
  });
}
