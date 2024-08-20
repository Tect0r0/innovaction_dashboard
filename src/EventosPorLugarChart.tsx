import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    eventos: {
        titulo_evento: string;
        ubicacion: string;
    }[];
}

// Esta es la grafica
const EventosPorLugarChart: React.FC<ChartProps> = ({ eventos }) => {
    // Colores
    const colors = [
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
    ];
    // Lugares
    const lugares = [
        "Fractal",
        "Esferas",
        "Maker Space",
        "Sparring",
        "Atenas",
        "Todo Innovaction",
    ];

    // Agregar todos los eventos
    const eventosPorLugar = lugares.map((lugar) => {
        return eventos.filter((evento) => evento.ubicacion === lugar).length;
    }); 

    // Datos
    const data = {
        labels: lugares,
        datasets: [
        {
            label: "Numero de eventos",
            data: eventosPorLugar,
            backgroundColor: lugares.map(
            (_, index) => colors[index % colors.length]
            ),
        },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                display: false,
            },
            title: {
                display: true,
                text: "Numero de eventos agendados por espacio",
            },
        },
        scales: {
        y: {
                beginAtZero: true,
                ticks: {
                stepSize: 1,
                callback: function (value: number | string) {
                return value;
            },
            },
        },
        },
    };

    return <Bar data={data} options={options} />;
};

export default EventosPorLugarChart;
