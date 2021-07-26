
 import axios from "axios";

export const weatherAPI = (lat, lon, time) => {
        return axios.get(`http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=55598e00e9fc9fb8f3777e1dd9e2aef8`)
            .then(response => response.data)
}
