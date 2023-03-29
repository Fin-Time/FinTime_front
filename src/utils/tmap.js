export function markMap(place, x, y, width = "100%", height = "400px") {
  const map = new Tmapv2.Map(place, {
    center: new Tmapv2.LatLng(x, y),
    width: width,
    height: height,
    zoom: 16,
    zoomControl: true,
    scrollwheel: true,
  });

  const marker = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(x, y),
    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_a.png",
    iconSize: new Tmapv2.Size(24, 38),
    map: map,
  });
}
