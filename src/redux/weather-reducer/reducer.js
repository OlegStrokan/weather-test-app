
const initialState = {
    weatherData: null,
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_WEATHER_DATA': {
            return { ...state, weatherData: action.weatherData}
        }
        default: return state
    }
}


export const actions = {
    setWeatherData: (weatherData) => ({type: 'SET_WEATHER_DATA', weatherData})
};
