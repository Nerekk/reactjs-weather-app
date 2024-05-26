import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';

import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import {useContext, useEffect, useState} from "react";
import {DataChartsContext} from "../WeatherBody.jsx";
import {getHourChart, getWeekDayChart} from "./Charts.jsx";

export const ChartTemp = () => {
    const {dataF, isloadingF} = useContext(DataChartsContext);
    const [timeData, setTimeData] = useState([]);
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        if (dataF) {
            const temp = dataF.list.map((d) => d.main.temp);
            const time = dataF.list.map((d) => new Date(d.dt * 1000));
            setTempData(temp);
            setTimeData(time);
        }
    }, [dataF]);


    if (isloadingF) {
        return <h1>Loading..</h1>;
    }

    const config = {
        series: [
            { type: 'line', data: tempData },
        ],
        height: 300,
        xAxis: [
            {
                data: timeData,
                scaleType: 'time',
                valueFormatter: (date) =>
                    date.getHours() === 0
                        ? getWeekDayChart(date)
                        : getHourChart(date),
            },
        ],
    };

    return (
        <Box sx={{ width: '100%' }}>
            <ResponsiveChartContainer {...config}>
                <LinePlot />
                <ChartsXAxis />
                <ChartsYAxis />
            </ResponsiveChartContainer>
        </Box>
    );
}
