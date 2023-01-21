import React, { useRef, useState, useEffect } from "react";

import Chart from "chart.js/auto";

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Statistiche = () => {

    const canvasEl = useRef(null);

    const colors = {
        purple: {
        default: "rgba(149, 76, 233, 1)",
        half: "rgba(149, 76, 233, 0.5)",
        quarter: "rgba(149, 76, 233, 0.25)",
        zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
        default: "rgba(80, 102, 120, 1)",
        quarter: "rgba(80, 102, 120, 0.25)"
        }
    };

    useEffect(() => {
        const ctx = canvasEl.current.getContext("2d");
        // const ctx = document.getElementById("myChart");

        const gradient = ctx.createLinearGradient(0, 16, 0, 600);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.65, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const weight = [2, 5.45, 10, 7.30, 0, 24, 10];

        const labels = [
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato",
        "Domenica"
        ];
        const data = {
        labels: labels,
        datasets: [
            {
            backgroundColor: gradient,
            label: "Ore guardate",
            data: weight,
            fill: false,
            borderWidth: 3,
            borderColor: 'rgb(220 135 255)',
            lineTension: 0.2,
            pointBackgroundColor: 'rgb(220 135 255)',
            pointRadius: 3
            }
        ]
        };
        const config = {
        type: "line",
        data: data
        };
        const myLineChart = new Chart(ctx, config);

        return function cleanup() {
            myLineChart.destroy();
        };
    });


    return(
        <div>
            <h5>Tempo di visualizzazione totale</h5>
            <span><h1 style={{padding:'0', margin:'0'}}>12</h1><h4 style={{padding:'0', margin:'0'}}>ore</h4></span>
            <div style={{display:'inline-flex'}}>
                <h6>dal 13/01/2023</h6>
                <Tooltip disableFocusListener title="La data dell'aggiornamento che ha introdotto questa funzione.">
                    <Button style={{justifyContent: 'flex-start'}}><InfoRoundedIcon style={{fontSize:'15px', color:'white'}}/></Button>
                </Tooltip>
            </div>
            
            <br></br>

            <canvas id="myChart" ref={canvasEl} height="auto" />
        </div>
    );
};
export default Statistiche;