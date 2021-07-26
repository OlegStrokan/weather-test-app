import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getWeatherDataSelector} from "../redux/weather-reducer/selectors";
import {getWeatherData} from "../redux/weather-reducer/thunks";
import Preloader from '../assets/preloader.gif'
import {
    Card,
    CardContent,
    makeStyles,
    Paper,
    Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {ArgumentAxis, Chart, LineSeries, ValueAxis} from "@devexpress/dx-react-chart-material-ui";

const useStyles = makeStyles({
    item: {
        width: '70vw',
        margin: '50px auto',
        backgroundColor: '#efefef',
    },

});


export const Main = () => {
    const classes = useStyles();

    const convertToUtcData = (unix_timestamp) => {
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    let temp, time;

    const getTempForGraph = (array) => {
         temp = array.hourly.map(arr => arr.temp + ',')
        return temp
    }
    const getTimeForGraph = (array) => {
        time = array.hourly.map(arr => arr.dt + ',')
        return time
    }


    const weatherData = useSelector(getWeatherDataSelector);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWeatherData(60.99, 30.9, 1627305861));
    },[])

    if (!weatherData) return <img src={Preloader}/>;

    const getDataForGraph = (weather) => {
        const dataForGraph = [
            weather.hourly.map((data) => {
                return {
                    argument: convertToUtcData(data.dt).slice(0, -3),
                    value: Math.round(data.temp),
                }})
        ]
        return dataForGraph
    }
    const dataForGraph2 = (getDataForGraph(weatherData))


    return <Card>
        <CardContent>
            <Typography align="center" variant="h5">Data in table</Typography>
            <TableContainer component={Paper} className={classes.item}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Time (unix):</TableCell>
                            <TableCell align="center">Humidity:</TableCell>
                            <TableCell align="center">Visibility:</TableCell>
                            <TableCell align="center">Main:</TableCell>
                            <TableCell align="center">Temp:</TableCell>
                            <TableCell align="center">Fells like:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weatherData.hourly.map((row) => (
                            <TableRow>
                                <TableCell align="center">{convertToUtcData(row.dt).slice(0, -3)}</TableCell>
                                <TableCell align="center">{row.humidity}</TableCell>
                               <TableCell align="center">{row.visibility}</TableCell>
                                <TableCell align="center">{row.weather[0].main}</TableCell>
                                <TableCell align="center">{row.temp}</TableCell>
                                <TableCell align="center">{row.feels_like}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
        <CardContent>
            <Typography  align="center" variant="h5">Data in graph</Typography>
            <Paper className={classes.item}>
                <Chart
                    data={dataForGraph2[0]}
                >
                    <ArgumentAxis />
                    <ValueAxis />
                    <LineSeries valueField="value" argumentField="argument" />
                </Chart>
            </Paper>
        </CardContent>
    </Card>
};
