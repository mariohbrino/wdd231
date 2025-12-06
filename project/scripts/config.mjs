const mapboxToken = async () => {
 let token = import.meta.env?.VITE_MAPBOX_TOKEN || null;
 
 try {
   const response = await fetch('./config.json');
   if (response.ok) {
     const config = await response.json();
     if (config.mapbox_token && config.mapbox_token !== "YOUR_MAPBOX_TOKEN_HERE") {
       token = config.mapbox_token;
     }
   }
 } catch (error) {
   console.log('Using Vite environment variable for Mapbox token');
 }

 return token;
};

export { mapboxToken };
