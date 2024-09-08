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
        tipo_evento: string;
    }[];
}

// Esta es la grafica
const EventosPorTipoChart: React.FC<ChartProps> = ({ eventos }) => {
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
    const tipo = [
        "Conferencia",
        "Taller",
        "Convivio Social",
        "Clase",
        "Otro",
    ];

    // Agregar todos los eventos
    const eventosPorTipo = tipo.map((tipo) => {
        return eventos.filter((evento) => evento.tipo_evento === tipo).length;
    }); 

    // Datos
    const data = {
        labels: tipo,
        datasets: [
        {
            label: "Numero de eventos",
            data: eventosPorTipo,
            backgroundColor: tipo.map(
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
                text: "Numero de eventos agendados por tipo",
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

export default EventosPorTipoChart;
