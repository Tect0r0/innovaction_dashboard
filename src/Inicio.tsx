import React, { useEffect, useState } from 'react';

export default function Inicio() {
    const [mainImage, setMainImage] = useState('src/assets/imagen-Ino3.webp');
    const [leftImage, setLeftImage] = useState('src/assets/imagen-Ino2.webp');
    const [rightImage, setRightImage] = useState('src/assets/imagen-Ino1.webp');

    useEffect(() => {
        const timer = setInterval(() => {
            setMainImage(prevMainImage => {
                setRightImage(prevMainImage);
                return leftImage;
            });
            setLeftImage(prevLeftImage => {
                setMainImage(prevLeftImage);
                return rightImage;
            });
            setRightImage(prevRightImage => {
                setLeftImage(prevRightImage);
                return mainImage;
            });
        }, 3000);

        return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
    }, [mainImage, leftImage, rightImage]);

    return (
        <div className="page">
            <h1 className="tit-inicio">CONVIERTE TUS IDEAS EN INOVACIÓN</h1>
            <br />

            <div className='carousel-Container'>
                <div className='secondary-image'>
                    <div id='leftImage' className='imageContSec'>
                        <img className='secImg'src={leftImage} alt="Imagen izquierda" />
                    </div>
                </div>

                <div id='mainImage' className='main-image'>
                    <img className='mainImg' src={mainImage} alt="Imagen principal" />
                </div>

                <div id='RightImage' className='secondary-image'>
                    <div className='imageContSec'>
                        <img className='secImg' src={rightImage} alt="Imagen derecha" />
                    </div>
                </div>
            </div>

            <div className="text-container">
                <p className="p-inicio">El Innovaction GYM es un centro de creatividad, diseño, </p>
                <p className="p-inicio">innovación y emprendimiento tecnológico en la Escuela </p>
                <p className="p-inicio"> de Ingeniería del Tec de Monterrey.</p>
            </div>
        </div>
    );
}
