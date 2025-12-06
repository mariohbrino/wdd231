const mapboxToken = async () => {
 const token = import.meta.env.VITE_MAPBOX_TOKEN;
 
 try {
   const response = await fetch('../config.json');
   if (response.ok) {
     const config = await response.json();
     if (config.mapbox_token) {
       token = config.mapbox_token;
     }
   }
 } catch (error) {
   console.log('Using Vite environment variable for Mapbox token');
 }

 return token;
};

export { mapboxToken };
