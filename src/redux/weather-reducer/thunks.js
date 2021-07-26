import {weatherAPI} from "../../api/main-api";
import {actions} from "./reducer";

export const getWeatherData = (lat, lon, time) => (dispatch) => {
     weatherAPI(lat, lon, time).then(response => {
        dispatch(actions.setWeatherData(response))
    });
};
