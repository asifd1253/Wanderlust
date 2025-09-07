mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

console.log(listing.geometry.coordinates);

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${listing.location}</h3><p>This is the location ${listing.owner.username} has provided.</p>`
    )
  )
  .addTo(map);
