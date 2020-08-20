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
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

const titleSub = document.querySelector(".title-sub");
const bikeTableBody = document.getElementById("bike-table-body");
const exampleMapText = document.getElementById("example-map");

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
  getBike(country, countryCode, city);
}

// Google Maps API
let map;
// Initialize and add the map
function initMap() {
  var sf = { lat: 37.7749, lng: -122.4194 };
  // var barcelona = { lat: 41.4851, lng: 2.1734 };
  // The map, centered at Barcelona
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2.5,
    center: sf,
  });
}

// get SF Bike Stations as dafault : initial plan was to get stations all over the world by default but that is too much network requests.
function getAllBike() {
  $.ajax({
    method: "GET",
    url: "http://api.citybik.es/v2/networks",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.networks.length; i++) {
        if (data.networks[i].location.country === "US") {
          $.ajax({
            method: "GET",
            url: "http://api.citybik.es" + data.networks[i].href,
            success: function (data) {
              console.log(data);
              // console.log(data.network.stations); // this has lat and long of stations and emply slots and free bikes number
              for (let j = 0; j < data.network.stations.length; j++) {
                const marker = new google.maps.Marker({
                  position: {
                    lat: data.network.stations[j].latitude,
                    lng: data.network.stations[j].longitude,
                  },
                });
                marker.setMap(map);
                map.setZoom(10);
              }
            },
            error: function (err) {
              console.log(err);
            },
          });
          // }
        }
      }

      // for (var i = 0; i < data.networks.length; i++) {
      //   if (
      //     data.networks[i].location.city === "Paris" &&
      //     data.networks[i].location.country === "FR"
      //   ) {
      //     $.ajax({
      //       method: "GET",
      //       url: "http://api.citybik.es" + data.networks[i].href,
      //       success: function (data) {
      //         console.log(data);

      //         // console.log(data.network.stations); // this has lat and long of stations and emply slots and free bikes number
      //         for (let j = 0; j < data.network.stations.length; j++) {
      //           if (
      //             data.network.stations[j].name ===
      //             "Bourg l'Abbé - Saint-Martin"
      //           ) {
      //             console.log(j);
      //             console.log("found!");
      //           }
      //           const marker = new google.maps.Marker({
      //             position: {
      //               lat: data.network.stations[j].latitude,
      //               lng: data.network.stations[j].longitude,
      //             },
      //           });
      //           marker.setMap(map);
      //           map.setZoom(10);
      //         }
      //       },
      //       error: function (err) {
      //         console.log(err);
      //       },
      //     });
      //     // }
      //   }
      // }
    },

    error: function (err) {
      console.log(err);
    },
  });
}

function getBike(country, countryCode, city) {
  $.ajax({
    method: "GET",
    url: "http://api.citybik.es/v2/networks",
    success: function (data) {
      // console.log(data.networks);
      // console.log(data.networks.length);
      // console.log(data.networks);
      // console.log(data.networks[0].location.country);

      const regionData = [];

      if (!city) {
        for (var i = 0; i < data.networks.length; i++) {
          if (data.networks[i].location.country === countryCode) {
            regionData.push(data.networks[i]);
          }
        }
      } else if (!country) {
        for (var i = 0; i < data.networks.length; i++) {
          if (data.networks[i].location.city === city) {
            regionData.push(data.networks[i]);
          }
        }
      } else {
        for (var i = 0; i < data.networks.length; i++) {
          if (
            data.networks[i].location.city === city &&
            data.networks[i].location.country === countryCode
          ) {
            regionData.push(data.networks[i]);
          }
        }
      }

      console.log(regionData);
      for (let i = 0; i < regionData.length; i++) {
        $.ajax({
          method: "GET",
          url: "http://api.citybik.es" + regionData[i].href,
          success: function (data) {
            console.log(data);
            console.log(data.network.stations); // this has lat and long of stations and emply slots and free bikes number
            //var uluru = { lat: -25.344, lng: 131.036 };
            titleSub.textContent = "Bike stations in " + city + ", " + country;
            // form.classList.add("d-none");
            // change the center of the map and zoom in
            map.setCenter({
              lat: data.network.location.latitude,
              lng: data.network.location.longitude,
            });

            for (let j = 0; j < data.network.stations.length; j++) {
              // var infowindow = new google.maps.InfoWindow({
              //   content: "<span>" + data.network.stations[j].name + "</span>",
              // });

              const marker = new google.maps.Marker({
                position: {
                  lat: data.network.stations[j].latitude,
                  lng: data.network.stations[j].longitude,
                },
              });

              var content =
                "<h3>" +
                data.network.stations[j].name +
                "</h3>" +
                "<h4>Available Bikes: " +
                data.network.stations[j].empty_slots +
                "</h4>" +
                "<h4>" +
                "Available E-Bikes: " +
                data.network.stations[j].extra.ebikes +
                "</h4>";

              // var content =
              //   "Station Name: " +
              //   data.network.stations[j].name +
              //   "\n" +
              //   " Available bikes: " +
              //   data.network.stations[j].empty_slots;
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

              // marker.addListener("click", () => {
              //   infowindow.open(map, marker);
              // });

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
            map.setZoom(10);
          },
          error: function (err) {
            console.log(err);
          },
        });
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
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
// get bike data
// $.ajax({
//   method: "GET",
//   url: "http://api.citybik.es/v2/networks",
//   success: function (data) {
//     console.log(data);
//     // console.log(data.networks.length);
//     // console.log(data.networks);
//     // console.log(data.networks[0].location.country);
//     // for (var i = 0; i < data.networks.length; i++) {
//     //   if (data.networks[i].location.city === "Barcelona") {
//     //     console.log(data.networks[i]);
//     //   }
//     // }
//   },
//   error: function (err) {
//     console.log(err);
//   },
// });
