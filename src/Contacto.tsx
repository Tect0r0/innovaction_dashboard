import './Contacto.css'; // Importa tus estilos CSS

export default function Contacto() {
    return (
        <div className='container'>
            <div className='headLine'>
                <h1>Contacto</h1>
            </div><br/>
            <div className="page">
                <div style={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                    <h2>Encuéntranos en:</h2>
                    <div className="map_container">
                        <iframe 
                            src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1798.3139800668769!2d-100.29219272265408!3d25.650470451942223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bfb855143edb%3A0xf0e23f5a6520ff77!2sINNOVaction%20Gym!5e0!3m2!1sen!2smx!4v1712349248250!5m2!1sen!2smx"}
                            style={{ width: '100%', height: '100%'}}
                            allowFullScreen
                            loading="lazy"
                            >
                        </iframe>
                    </div>
                    <p className="address">
                        Ave. Eugenio Garza Sada 2501 Sur, CETEC Torre Norte 2 piso
                        64700 Monterrey, Nuevo León, México
                    </p>
                    <div className="contact_container">
                        <div className="contact_mail">
                            <h2 style={{margin: 0}}>Correo de contacto:</h2>
                            <a href={"mailto: innogym@mty.tec.mx"} style={{margin: 0}}>innogym@mty.tec.mx</a>
                        </div>
                        <div className="contact_phone">
                            <h2 style={{margin: 0}}>Teléfono de contacto:</h2>
                            <p style={{margin: 0}}>81 8350 2000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}