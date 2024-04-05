import React from 'react';
import './Contacto.css'; // Importa tus estilos CSS

export default function Contacto() {
    return (
        <div className='container'>
            <div className='headLine'>
                <h1>Contacto</h1>
            </div>
            <div className="page">
                <h1>¿Quiénes somos?</h1>
                <p>El innovaction es una innovación</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <div style={{ marginTop: '30px' }}>
                    <h2>Dirección</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <iframe
                            title="Google Maps"
                            width="400"
                            height="300"
                            frameBorder="0"
                            scrolling="no"
                            src={`https://www.google.com/maps/embed/v1/place?q=25.65047286982371,-100.29096812009811&key=YOUR_API_KEY`}
                        ></iframe>
                    </div>
                    <p className="address">
                        Ave. Eugenio Garza Sada 2501 Sur, CETEC Torre Norte 2 piso
                        64700 Monterrey, Nuevo León, México
                    </p>
                </div>
            </div>
        </div>
    );
}
