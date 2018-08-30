const menuButton = document.querySelector(".main-nav__button");
const menu = document.querySelector(".main-nav");

menu.classList.remove("no-js");

menuButton.addEventListener("click", function(evt) {
  evt.preventDefault();

  menu.classList.toggle("main-nav--shown");
});


function initMap() {
  var point = {lat: 59.9387, lng: 30.3230};
  var center = {lat: 59.9388, lng: 30.3230};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: center
  });
  var image = {
    url: "img/icon-map-marker.png",
    size: new google.maps.Size(36, 36),
    anchor: new google.maps.Point(18, 18)
  }
  var marker = new google.maps.Marker({
    position: point,
    map: map,
    icon: image
  });
}
