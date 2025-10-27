let map; 
let directionsService;
let directionsRender; 
function initMap(){ 
     map = new google.maps.Map(document.getElementById("map"),{
    center: { lat: 43.2557, lng: -79.8711 },
    zoom: 10,
     
  });
 
  
   const icon = document.createElement('img'); 
  icon.src = "https://cdn.iconscout.com/icon/premium/png-512-thumb/map-park-tree-forest-garden-51241.png";
  const park = [
  { name: "Bayfront Park",         lat: 43.26917,    lng: -79.8699 },
  { name: "Pier 4 Park",           lat:43.2738084,  lng:-79.868134},
  { name: "Gage Park",             lat: 43.240774,   lng: -79.829029 },
  { name: "Sam Lawrence Park",     lat: 43.245152,   lng: -79.866045 },
  { name: "Churchill Park",        lat: 43.266083,   lng: -79.903756},  
  { name: "Mohawk Sports Park",    lat:43.2089945,    lng:-79.8204416 },  
  { name: "Beasley Park",         lat:43.2585278, lng:-79.864723},    
  { name: "Parkdale Park",        lat:43.2355236,lng:-79.7940909},     
  {name: "Confederation Park", lat:43.2515424,lng: -79.7586036},
  {name: "Victoria Park", lat: 43.263614,lng:-79.8835263 }
  ]
  const parkAddress = [
  " 200 Harbour Front Drive, Hamilton, ON L8L 1C8",
  "64 Leander Drive, Hamilton, ON L8L 1N6",
  "1000 Main Street East, Hamilton, ON L8M 1N2",
  "255 Concession Street, Hamilton, ON L9A 1B2",
  "199 Glen Road, Hamilton, ON L8S 4A1",
  "1100 Mohawk Road East, Hamilton, ON L8T 1G2",
  "96 Mary Street, Hamilton, ON L8R 1K4",
  "1770 Main Street East, Hamilton, ON L8H 1C8",
  "9050 Birch Avenue, Hamilton, ON L8K 5N3",
  "130 Victoria Avenue North, Hamilton, ON L8L 5G8",
];
  for (let i = 0; i < park.length; i++) {
    const marker = new google.maps.Marker({
      position: { lat: park[i].lat, lng: park[i].lng }, 
      map: map,
      title: park[i].name, 
      icon: {
        url: icon.src,
        scaledSize: new google.maps.Size(20, 20)
      }
    });
     const infoWindow = new google.maps.InfoWindow({
content: `<h5>${park[i].name}</h5> 
            <p>${parkAddress[i]}</p>`
     }); 
     

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
  
  }
    
    directionsService = new google.maps.DirectionsService();
    directionsRender = new google.maps.DirectionsRenderer({ map: map });

}
function findUserLocation() {
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(userLocation);
         map.setZoom(16);
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location ",
          icon: {

            url: "https://img.icons8.com/?size=100&id=99790&format=png&color=228BE6",
            scaledSize: new google.maps.Size(40, 40)
          }
        });
      },
      function(error) {
        alert("Error: Location cannot be traced" + error.message);
      }
    );
  } else {
    alert("Geolocation is not supported .");
  }
  
}
document.getElementById("findLocation").addEventListener("click",findUserLocation);

function searchAddress() {
  const address = document.getElementById("location-input").value;
  if (!address) {
    alert("Please enter an address!");
    return;
  }

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK" && results[0]) {
      const location = results[0].geometry.location;

      map.setCenter(location);
      map.setZoom(16);

      new google.maps.Marker({
        map: map,
        position: location,
        title: address,
      });
    } else {
      alert( "Geocode is not working" + status);
    }
  });
}
document.getElementById("searchLocation").addEventListener("click",searchAddress);
let iceMarker = [];
function showInIceRinks(){
  const indoorIce = [
      { name: "Chedoke Twin Pad Arena",        lat:43.238429,lng:-79.9210739 },
  { name: "Bill Friday Lawfield Arena",          lat:43.214668,lng: -79.850131},
  { name: "Rosedale Arena",            lat:43.217951,lng: -79.808145},
  ];
    indoorIce.forEach(rink => {
    const marker = new google.maps.Marker({
      position: { lat: rink.lat, lng: rink.lng },
      map: map,
      title: rink.name
    });

   
    iceMarker.push(marker);
  });
 
}
function showOutIceRinks(){
  const outdoorIce = [
      { name: "Outdoor Skating Rink at Pier ",        lat:43.276534, lng:-79.859464 },
  { name: "Outdoor Hockey Rink",       lat:43.239815, lng:-79.901174

},
  ];
    outdoorIce.forEach(rink => {
    const marker = new google.maps.Marker({
      position: { lat: rink.lat, lng: rink.lng },
      map: map,
      title: rink.name
    });

   
    iceMarker.push(marker);
  });
 
}
function showBothRinks(){
  showInIceRinks();
  showOutIceRinks();
}
function removeRinks(){
  iceMarker.forEach(marker => marker.setMap(null));
  iceMarker = [];
}


 document.getElementById("indoor").addEventListener("click",showInIceRinks);
  document.getElementById("outdoor").addEventListener("click",showOutIceRinks);
   document.getElementById("bothRinks").addEventListener("click",showBothRinks);
   document.getElementById("removeRinks").addEventListener("click",removeRinks);


   let attractionMarker = []; 

  function showMuseums(){
       const Museums = [
      { name: "The Hamilton Military Museum",    lat:43.2681423,lng:-79.8886064 },
  { name: "31 Service Battalion Museum",        lat:43.274637, lng:-79.854876},
  { name: "The Hamilton Toy Museum",           lat:43.255628,lng:-79.8635094},
       ]
           Museums.forEach(i => {
    const marker = new google.maps.Marker({
      position: { lat: i.lat, lng: i.lng },
      map: map,
      title: i.name
    });
     const infoWindow = new google.maps.InfoWindow({
            content: `<h6>${i.name}</h6>`
        });
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

   
    attractionMarker.push(marker);
      });
  }

  document.getElementById("findMuseum").addEventListener("click", showMuseums);

  function showWaterfalls(){
       const Waterfalls = [
      { name: "Buttermilk Falls",    lat:43.2059322, lng:-79.8315346 },
  { name: "Shaver Falls",        lat:43.2405589, lng:-79.9723314},
  { name: "Mills Falls", lat:43.2328457, lng:-80.0281293},
       ]
           Waterfalls.forEach(i => {
    const marker = new google.maps.Marker({
      position: { lat: i.lat, lng: i.lng },
      map: map,
      title: i.name
    });
     const infoWindow = new google.maps.InfoWindow({
            content: `<h6>${i.name}</h6>`
        });
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

   
    attractionMarker.push(marker);
      });
  }
document.getElementById("findWaterfall").addEventListener("click", showWaterfalls);
function removeMarkers(){
  attractionMarker.forEach(marker => marker.setMap(null));
  attractionMarker = [];
}
document.getElementById("removeMarkers").addEventListener("click", removeMarkers);
function showDirection(){
  let selection = document.getElementById('dir').value; 
let DesigA, DesigB;
    if (selection === "dir1") {
        DesigA = "Bayfront Park, Hamilton, ON";
        DesigB = "Gore Park, Hamilton, ON";
    } else if (selection === "dir2") {
       DesigA = "Gore Park, Hamilton, ON";
        DesigB = "Dundurn Park, Hamilton, ON";
    } else if (selection === "dir3") {
        DesigA = "Dundurn Park, Hamilton, ON";
        DesigB = "Sam Lawrence Park, Hamilton, ON";
    } else {
        directionsRender.set('directions', null);
        return;
    }

    const request = {
        origin: DesigA,
        destination: DesigB,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, (result, status) => {
        if (status === "OK") {
          
            directionsRender.setDirections(result);
        } else {
            alert("Direction Request Failed " + status);
        }
    });
}
document.getElementById("dir").addEventListener("change", showDirection);