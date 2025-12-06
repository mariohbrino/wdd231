import config from "../config.json" with { type: "json" };

const mapboxToken = () => {
  // Prioritize Vite environment variable for local development
  if (import.meta.env?.VITE_MAPBOX_TOKEN) {
    console.log('Using Vite environment variable for Mapbox token');
    return import.meta.env.VITE_MAPBOX_TOKEN;
  }

  // Fall back to config.json for production (GitHub Pages)
  if (config.mapbox_token) {
    return config.mapbox_token;
  }

  // No valid token found
  console.error('No valid Mapbox token found. Please check your environment variables or config.json file.');
  throw new Error('No valid Mapbox token available');
};

export { mapboxToken };
