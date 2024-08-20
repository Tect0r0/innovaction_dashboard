import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    eventos: {
        titulo_evento: string;
        usuarios_estimados: number;
        asistencias_confirmadas: number;
    }[];
}

const UsuariosVsAsistenciasChart: React.FC<ChartProps> = ({ eventos }) => {

    const colors = [
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
    ];

    const data = {
        labels: eventos.map((evento) => evento.titulo_evento),
        datasets: [
            {
            label: "Porcentaje de asistencias confirmadas",
            data: eventos.map(
                (evento) =>
                (evento.asistencias_confirmadas / evento.usuarios_estimados) * 100
            ),
            backgroundColor: eventos.map((_, index) => colors[(index + 1) % colors.length]),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                display: false,
            },
            title: {
                display: true,
                text: 'Porcentaje de asistencias para cada evento',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value: number | string) {
                        return value + '%';
                    }
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default UsuariosVsAsistenciasChart;