// connect firebase
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsJBR0Mm23RUBqmdjEhvY8huGOU0egqAs",
    authDomain: "iot-weather-f35d1.firebaseapp.com",
    databaseURL: "https://iot-weather-f35d1-default-rtdb.firebaseio.com",
    projectId: "iot-weather-f35d1",
    storageBucket: "iot-weather-f35d1.appspot.com",
    messagingSenderId: "581915043211",
    appId: "1:581915043211:web:0ef0b32593561c677f3b8e",
    measurementId: "G-FP2D1M48SG"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
function startMeasurement(latitude, longitude) {
    // Reference to the root of the database
    const dataRef = firebase.ref(database, 'yourDataPath/locations');

    // Find the location with matching latitude and longitude
    firebase.orderByChild(dataRef, 'latitude').equalTo(latitude).once('value')
        .then(snapshot => {
            const location = snapshot.val();
            if (location) {
                // Update HTML elements with the retrieved data
                document.getElementById('heartRate').innerText = `Nhịp Tim: ${location.heartRate} bpm`;
                document.getElementById('breathRate').innerText = `Nhịp Thở: ${location.breathRate} %`;
            } else {
                console.log('No data found for the given location.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
let heartRate = 'Nhịp Tim: ' + '80 bpm';
let breathRate = 'Nhịp Thở: ' + '80 %';
document.getElementById("heartRate").innerHTML = heartRate;
document.getElementById('breathRate').innerHTML = breathRate;

