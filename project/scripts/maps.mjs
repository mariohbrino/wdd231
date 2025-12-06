import { mapboxToken } from "./config.mjs";

const state = {};

// Helper function to add passive event listeners where possible
const addPassiveEventSupport = () => {
  // Override addEventListener to make touchmove passive by default
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    // For touch events, default to passive unless explicitly set to false
    if (type === 'touchmove' || type === 'touchstart' || type === 'touchend') {
      if (typeof options === 'boolean') {
        options = { capture: options, passive: true };
      } else if (typeof options === 'object' && options !== null) {
        if (options.passive === undefined) {
          options.passive = true;
        }
      } else {
        options = { passive: true };
      }
    }
    
    return originalAddEventListener.call(this, type, listener, options);
  };
};

const displayMap = async (drawPolygon = false, drawLine = false) => {
  // Apply passive event listener support
  addPassiveEventSupport();
  
  const latitude = 40.52;
  const longitude = -111.86;
  
  if (typeof mapboxgl !== "undefined") {
    mapboxgl.accessToken = await mapboxToken();
    
    const mapConfig = {
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [longitude, latitude],
      zoom: 11,
    };
    
    state.map = new mapboxgl.Map(mapConfig);

    // Wait for map to load before adding controls to reduce touch event conflicts
    state.map.on('load', () => {
      // Add navigation control with better touch handling
      const navControl = new mapboxgl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
        showZoom: true
      });
      
      state.map.addControl(navControl);
    });

    if (drawPolygon) {
      state.polygonControl = polygonControl();
      if (state.polygonControl) {
        state.map.addControl(state.polygonControl);
        state.map.on("draw.create", updateArea);
        state.map.on("draw.delete", updateArea);
        state.map.on("draw.update", updateArea);
      }
    }

    if (drawLine) {
      state.lineControl = lineControl();
      if (state.lineControl) {
        state.map.addControl(state.lineControl);
        state.map.on("draw.create", updateDistance);
        state.map.on("draw.delete", updateDistance);
        state.map.on("draw.update", updateDistance);
      }
    }

    state.map.dragPan.disable();
  }
};

const recenterMap = () => {
  const latitude = 40.52;
  const longitude = -111.86;

  const recenterMap = document.querySelector("#recenterMap");

  recenterMap.addEventListener("click", (event) => {
    state.map.flyTo({
      center: [longitude, latitude],
      zoom: 11,
      speed: 0.8,
      curve: 3
    });
  });
};

const toggleDragButton = () => {
  const dragMap = document.querySelector("#dragMap");
  
  dragMap.addEventListener("click", (event) => {
    if (event.target.getAttribute("aria-pressed") === "true") {
      event.target.setAttribute("aria-pressed", "false");
      event.target.textContent = "Disable Drag";
    } else {
      event.target.setAttribute("aria-pressed", "true");
      event.target.textContent = "Enable Drag";
    }
    toggleDrag();
  });
};

const toggleDrag = () => {
  if (state.map.dragPan.isEnabled()) {
    state.map.dragPan.disable();
  } else {
    state.map.dragPan.enable();
  }
};

const displayModal = (data) => {
  const modalDetails = document.querySelector("#modalDetails");
  modalDetails.innerHTML = '';
  modalDetails.innerHTML = `
    <div class="modal-header">
      <h3>${data.name}</h3>
    </div>
    <div class="modal-body">
      <p>Longitude: ${data.longitude}</p>
      <p>Latitude: ${data.latitude}</p>
    </div>
    <div class="modal-footer">
      <button id="closeModal">Close</button>
    </div>
  `;
  modalDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    modalDetails.close();
  });
}

const populateMarkers = (data) => {
  data.forEach((item) => {
    const marker = new mapboxgl.Marker()
      .setLngLat([item.longitude, item.latitude])
      .addTo(state.map);
    
    marker.getElement().addEventListener("click", (event) => {
      displayModal(item);
    })
  });
};

const polygonControl = () => {
  if (typeof MapboxDraw !== "undefined") {
    return new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            polygon: true,
            trash: true
        },
        defaultMode: "draw_polygon"
    });
  };
  return null;
};

const lineControl = () => {
  if (typeof MapboxDraw !== "undefined") {
    return new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            line_string: true,
            trash: true
        },
        defaultMode: "draw_line_string"
    });
  };
  return null;
};

const updateArea = (event) => {
    const polygonInstance = state.polygonControl;
    const calculateGrid = document.querySelector("#calculateGrid");
    calculateGrid.innerHTML = "";
    if (polygonInstance) {
      const data = polygonInstance.getAll();
      if (data.features.length > 0) {
          const cards = document.createElement("ul");
          data.features.forEach((polygon) => {
            const area = turf.area(polygon, { units: "feet" });
            const rounded_area = Math.round(area * 100) / 100;
            const card = document.createElement("li");

            const cardHeader = document.createElement("div");
            cardHeader.className = "calculate-header";
            cardHeader.innerHTML = `<strong>Polygon ${polygon.id}</strong>`;
            
            const cardBody = document.createElement("div");
            cardBody.className = "calculate-body";
            cardBody.innerHTML = `
              <p>Type: ${polygon.geometry.type}</p>
              <p>Area: ${rounded_area} sqft</p>
            `;
            
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            card.className = "area-card";

            cards.appendChild(card);
          });
          calculateGrid.appendChild(cards);
      } else {
        calculateGrid.innerHTML = "No areas rounded. Use the drawing control and add your areas.";
      }
    }
  };

const updateDistance = (event) => {
  const lineInstance = state.lineControl;
  const distanceGrid = document.querySelector("#distanceGrid");
  distanceGrid.innerHTML = "";
  if (lineInstance) {
    const data = lineInstance.getAll();
    if (data.features.length > 0) {
      data.features.forEach((line) => {
        const length = turf.length(line, { units: "feet" });
        const rounded_length = Math.round(length * 100) / 100;

        const cards = document.createElement("ul");
        const card = document.createElement("li");

        const cardHeader = document.createElement("div");
        cardHeader.className = "calculate-header";
        cardHeader.innerHTML = `<strong>Line ${line.id}</strong>`;
        
        const cardBody = document.createElement("div");
        cardBody.className = "calculate-body";
        cardBody.innerHTML = `
          <p>Type: ${line.geometry.type}</p>
          <p>Distance: ${rounded_length} ft</p>
        `;
        
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.className = "distance-card";

        cards.appendChild(card);
        distanceGrid.appendChild(cards);
      });
    } else {
      distanceGrid.innerHTML = "No distance found. Use drawing control and add your distances.";
    }
  }
};

export {
  displayMap,
  recenterMap,
  toggleDrag,
  toggleDragButton,
  populateMarkers
};
