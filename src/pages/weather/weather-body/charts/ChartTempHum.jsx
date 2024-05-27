import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import {useContext, useEffect, useState} from "react";
import {DataChartsContext} from "../WeatherBody.jsx";
import {getHourChart, getWeekDayChart} from "./Charts.jsx";
import {BarPlot} from "@mui/x-charts/BarChart";

export const ChartTempHum = () => {
    const {dataF, isloadingF} = useContext(DataChartsContext);
    const [timeData, setTimeData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [humData, setHumData] = useState([]);

    useEffect(() => {
        if (dataF) {
            const temp = dataF.list.map((d) => d.main.temp);
            const hum = dataF.list.map((d) => d.main.humidity);
            const time = dataF.list.map((d) => new Date(d.dt * 1000));
            setTempData(temp);
            setTimeData(time);
            setHumData(hum);
        }
    }, [dataF]);


    if (isloadingF) {
        return <h1>Loading..</h1>;
    }

    const config = {
        yAxis: [{ id: 'tempLine' }, { id: 'tempBar' }],
        series: [
            { type: 'line', data: tempData, yAxisKey: 'tempLine', color:'#f28e2c'},
            { type: 'bar', data: humData, yAxisKey: 'tempBar', color: '#94bdff' },
        ],
        height: 500,
        xAxis: [
            {
                id: 'bandtype',
                data: timeData,
                scaleType: 'band',
                valueFormatter: (date) => {
                    // if ((date.getHours()+1) !== 0) {
                    //     return getHourChart(date);
                    // } else if (date.getHours() === 0) {
                    //     return getWeekDayChart(date);
                    // }
                    // return getHourChart(date, false);
                    date.getHours() % 12 === 0
                    //     ? getWeekDayChart(date)
                    //     : getHourChart(date),
                },

            },
            {
                id: 'timetype',
                data: timeData,
                scaleType: 'time',
                valueFormatter: (date) => {
                    if ((date.getHours()) !== 0) {
                        return getHourChart(date, true);
                    } else if (date.getHours() === 0) {
                        return getWeekDayChart(date);
                    }
                },

            },
        ],
    };

    return (
        <Box sx={{ width: '100%' }}>
            <ResponsiveChartContainer {...config}>
                <BarPlot />
                <LinePlot />
                <ChartsXAxis axisId={'bandtype'} position={'top'} tickFontSize={0}/>
                <ChartsXAxis axisId={'timetype'} label={'Time'}/>
                <ChartsYAxis axisId={'tempLine'} label={'Temperature'}/>
                <ChartsYAxis axisId={'tempBar'} position={"right"} label={'Humidity %'}/>
            </ResponsiveChartContainer>
        </Box>
    );
}
