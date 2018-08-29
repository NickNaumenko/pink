const menuButton = document.querySelector(".main-nav__button");
const menu = document.querySelector(".main-nav");

menu.classList.remove("no-js");

menuButton.addEventListener("click", function(evt) {
  evt.preventDefault();

  menu.classList.toggle("main-nav--shown");
});


function initMap() {
  var point = {lat: 59.93873, lng: 30.32310};
  var center = {lat: 59.9387, lng: 30.3230};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: center
  });
  var image = {
    url: "img/icon-map-marker.svg",
    size: new google.maps.Size(67, 100),
    anchor: new google.maps.Point(33.5, 100)
  }
  var marker = new google.maps.Marker({
    position: point,
    map: map,
    icon: image
  });
}
