import { mapboxToken } from "./config.mjs";

const state = {};

const displayMap = async (drawPolygon = false, drawLine = false) => {
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

    state.map.addControl(new mapboxgl.NavigationControl(
      {
        visualizePitch: true,
      }
    ));

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
      console.log(event.type);
      if (polygonInstance) {
        const data = polygonInstance.getAll();
        if (data.features.length > 0) {
            data.features.forEach((polygon) => {
              const area = turf.area(polygon);
              const rounded_area = Math.round(area * 100) / 100;
              console.log(rounded_area);
            });
        }
      }
    };

    const updateDistance = (event) => {
      const lineInstance = state.lineControl;
      console.log(event.type);
      if (lineInstance) {
        const data = lineInstance.getAll();
        if (data.features.length > 0) {
          data.features.forEach((line) => {
            const length = turf.length(line, { units: "kilometers" });
            const rounded_length = Math.round(length * 100) / 100;
            console.log(`Distance: ${rounded_length} km`);
          });
        }
      }
    };

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
    if (event.target.role === "enabled") {
      event.target.role = "disabled";
      event.target.textContent = "Disable Drag";
    } else {
      event.target.role = "enabled";
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

const populateMarkers = (data) => {
  data.forEach((item) => {
    const marker = new mapboxgl.Marker()
      .setLngLat([item.longitude, item.latitude])
      .addTo(state.map);
    
    const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
      .setHTML(`<h3>${item.name}</h3>`);
    
    marker.setPopup(popup);
  });
};

export {
  displayMap,
  recenterMap,
  toggleDrag,
  toggleDragButton,
  populateMarkers
};
