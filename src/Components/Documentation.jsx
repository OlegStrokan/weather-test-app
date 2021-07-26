import React from 'react'
import {NavLink} from "react-router-dom";
import {
    Button,
    Card,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableRow,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '450px',
        height: '300px',
        margin: '200px auto',
        backgroundColor: '#efefef',
        padding: '30px',
        textAlign: 'center',
    },
    button: {
        textDecoration: 'none',
    },
    middleText: {
        margin: '10px',
    },
    queryParams: {
        margin: '10px',
        minHeight: '130px',
    }

});

export const Documentation = () => {
    const classes = useStyles();
    return <Card className={classes.root}>
        <Typography variant="h5">Documentation</Typography>
                <Typography variant="subtitle1" className={classes.middleText}>REST API: <a href="http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1627305861&appid=55598e00e9fc9fb8f3777e1dd9e2aef8">http://api.openweathermap.org</a></Typography>
        <Typography variant="h6">Query params for request:</Typography>
        <TableContainer component={Paper} className={classes.queryParams}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableBody>
                        <TableRow>
                            <TableCell>lat: 60.99</TableCell>
                        </TableRow>
                    <TableRow>
                        <TableCell>lon: 30.9</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>dt: 1627305861</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>appid: 55598e00e9fc9fb8f3777e1dd9e2aef8</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
            <NavLink className={classes.button} to={'/main'}><Button variant="contained" color="primary">Go To App</Button></NavLink>
    </Card>
}
