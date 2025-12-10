import { mapboxToken } from "./config.mjs";

const displayModal = (title, message) => {
  const modalDetails = document.querySelector("#modalDetails");
  modalDetails.innerHTML = '';
  modalDetails.innerHTML = `
    <div class="modal-header">
      <h3>${title}</h3>
    </div>
    <div class="modal-body">
      ${message}
    </div>
    <div class="modal-footer">
      <button id="closeModal">Close</button>
    </div>
  `;
  modalDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    modalDetails.close();
  });
};

const performSearch = async (query, map, marker) => {
  if (!query.trim()) {
    displayModal("Form validation", "Search field must not be empty.");
    return;
  }

  try {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&types=place&limit=1`);

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const result = data.features[0];
      const [longitude, latitude] = result.center;

      if (marker) {
        marker.remove();
      }

      marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

      map.flyTo({
        center: [longitude, latitude],
        zoom: 12,
        essential: true
      });
    } else {
      displayModal("Search", "No results found for your search.");
    }
  } catch (error) {
    console.log("Search error:", error);
  }
};

const searchForm = async () => {
  if (typeof mapboxgl !== "undefined") {
    mapboxgl.accessToken = await mapboxToken();
    const latitude = 40.52;
    const longitude = -111.86;

    const form = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#search");
    
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [longitude, latitude],
      zoom: 11
    });

    let marker = null;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      performSearch(searchInput.value, map, marker);
    });
  }
};

const main = async () => {
  await searchForm();
}

await main();
