// firebaseScript.js
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {getDatabase, set, ref, get, update} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";


var firebaseConfig = {
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
console.log(database)
const locationRef = ref(database, "heartRate");
const locationRef2 = ref(database, "breathRate");
const locationRefList = ref(database, "data_save");
console.log('heartRate' + locationRef)
console.log('breathRate' + locationRef)

async function fetchData() {

    try {
        const snapshot1 = await get(locationRef);
        if (snapshot1.val()) {
            const heartRateData = snapshot1.val();
            console.log('Data - heartRate:', heartRateData);
            document.getElementById('heartRate').innerHTML = `Nhịp Tim: ${heartRateData} bpm`;
            const snapshot2 = await get(locationRef2);
            if (snapshot2.val()) {
                const breathRateData = snapshot2.val();
                console.log('Data - breathRate:', breathRateData);
                document.getElementById('breathRate').innerHTML = `SPO2: ${breathRateData} %`;
                const snapshot3 = await get(locationRefList);
                const dataList = snapshot3.val() || []
                console.log('dsadfadsf', dataList);

                function startMeasurement() {
                    const newData = {
                        heartRate: 84,
                        breathRate: 21.50
                    };
                    dataList.push(newData);
                    set(locationRefList, dataList);
                }

                document.getElementById('startButton').onclick = startMeasurement;
            } else {
                console.log('Null data - Longitude.');
            }

        } else {
            console.log('Null data - Latitude.');
        }

    } catch (error) {
        console.error('Error:', error);
    }

}

fetchData();
