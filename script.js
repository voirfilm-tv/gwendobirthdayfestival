
window.onload = function () {
  function updateCountdown() {
    const festDate = new Date("2025-07-20T15:00:00").getTime();
    const now = new Date().getTime();
    const distance = festDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerText =
      `Début dans ${days}j ${hours}h ${minutes}m ${seconds}s`;
  }
  setInterval(updateCountdown, 1000);

  const map = L.map('festival-map').setView([45.8105, 4.7665], 17);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);
  map.invalidateSize();

  const points = [
    { name: "Entrée", lat: 45.810890, lon: 4.766623, icon: "🚪", links: true },
    { name: "WC", lat: 45.809698, lon: 4.766716, icon: "🚻" },
    { name: "Bar Tropical", lat: 45.809597, lon: 4.766440, icon: "🍹" },
    { name: "P1", lat: 45.811002, lon: 4.766020, icon: "🅿️" },
    { name: "P2", lat: 45.810998, lon: 4.764665, icon: "🅿️" }
  ];

  points.forEach(p => {
    const popup = `<strong>${p.name}</strong>` + (p.links ? `
      <br><a href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}" target="_blank">Google Maps</a>
      <br><a href="https://waze.com/ul?ll=${p.lat},${p.lon}&navigate=yes" target="_blank">Waze</a>
      <br><a href="http://maps.apple.com/?daddr=${p.lat},${p.lon}" target="_blank">Plans (Apple)</a>` : '');
    L.marker([p.lat, p.lon], {
      icon: L.divIcon({ html: p.icon, className: 'custom-icon', iconSize: [24, 24] })
    }).addTo(map).bindPopup(popup);
  });
};
