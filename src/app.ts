import axios from "axios";

const form = document.querySelector("form")!;
const mapPlace = document.getElementById('map')!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

//const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";
const GOOGLE_API_KEY = "AIzaSyDhaTVJ0AfiIsLpuHsr5ogYuN1XdeMQoFI";
//declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }      
      
      const coordinates = response.data.results[0].geometry.location;

      const map = new google.maps.Map(mapPlace, {
        center: coordinates,
        zoom: 8
      });
      const marker = new google.maps.Marker({position: coordinates, map});
      console.log(marker);
      
      
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
