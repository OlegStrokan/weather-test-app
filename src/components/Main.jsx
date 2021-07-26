import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getWeatherDataSelector} from "../redux/weather-reducer/selectors";
import {getWeatherData} from "../redux/weather-reducer/thunks";
import Preloader from '../assets/preloader.gif'
import {
    Button,
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
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
    item: {
        width: '70vw',
        margin: '50px auto',
        padding: '25px',
        backgroundColor: '#efefef',
    },
    icon: {
        width: '30px',
    },
    cellIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        textDecoration: 'none',
        position: 'absolute',
        top: '20px',
        left: '20px',
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


    return <Card data-test="mainPage">
        <NavLink data-test="toDocumentationPage" className={classes.button} to={'/'}><Button variant="contained" color="primary">Back</Button></NavLink>
        <CardContent>
            <Typography align="center" variant="h5">Data in table</Typography>
            <TableContainer component={Paper} className={classes.item}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Time:</TableCell>
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
                                <TableCell align="center" className={classes.cellIcon}><img className={classes.icon} src={`http://openweathermap.org/img/w/${row.weather[0].icon}.png`}/>{row.weather[0].main}</TableCell>
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
