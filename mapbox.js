import { auto } from "@popperjs/core";
import { autoComplete } from "./autocomplete";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmxhcnNhbWlvIiwiYSI6ImNsZHZnZGkxajA4MmMzcHBvdDlyd3R2cGYifQ.R3ziQthrUx4rYtcuhR72qw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/blarsamio/cldx5aczo005g01plm6fuv7rw",
  center: [2.163, 41.399],
  zoom: 5,
});

const teacherButton = document.querySelector("#teacher");
const studentButton = document.querySelector("#student");

teacherButton.addEventListener("click", () => {
  fetching("geojson.json", "teacher");
  autoComplete("geojson.json");
  flyingTo("geojson.json");
});

studentButton.addEventListener("click", () => {
  fetching("sgeojson.json", "student");
  autoComplete("sgeojson.json");
  flyingTo("sgeojson.json");
});

const fetching = (geojson, markerType) => {
  fetch(geojson)
    .then((response) => response.json())
    .then((data) => {
      document.querySelectorAll(".marker").forEach((marker) => {
        if (marker.dataset.type != markerType) {
          marker.remove();
        }
      });

      for (const feature of data.feature) {
        const role = feature.properties.role;

        const el = document.createElement("div");
        el.className = "marker";
        el.setAttribute("data-type", role);
        document.querySelector(".toa").innerText = role;

        const marker = new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<div class="big-cont">
                          <div class="img-cont">
                            <img src="${feature.properties.image}"
                          </div>
                          <div class="content">
                            <h2>${feature.properties.title}</h2>
                            <p>${feature.properties.description}</p>
                          </div>
                          </div>`
              )
          )
          .addTo(map);
      }
    });
};

const flyingTo = (geojson) => {
  const searchButton = document.querySelector(".fa-magnifying-glass");
  searchButton.addEventListener("click", (target) => {
    target = document.querySelector("input").value;
    fetch(geojson).then((response) => response.json()).then((data) => {
      for (const feature of data.feature) {
        if (feature.properties.title == target) {
          const coor = feature.geometry.coordinates;
          map.flyTo({
            center: coor,
            zoom: 10,
            speed: 1,
          });
        };
      };
    });
  });
};
