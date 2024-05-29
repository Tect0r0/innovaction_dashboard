# Innovaction Events Dashboard
Dashboard de eventos para el Tec Innovaction Gym.

## Información
Este Dashboard fue creado con el fin de desplegar los eventos que tomarán lugar en el Innovaction Gym del Tecnológico de Monterrey. Esto se hace mediante la lectura de un excel, y su despliegue de manera de calendario.

## Autores
- Gerardo Leiva Diaz (gerardo.leiva.d@gmail.com / a01198479@tec.mx)
- Isaac Rojas Sosa (isaacrojassosa@gmail.com / a01198693@tec.mx)
- Saúl Emilio Delgado Garza (saul10emilio@gmail.com/ a01285188@tec.mx)


## Codigo MYSQL
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_contacto VARCHAR(50),
    info_contacto VATCHAR(100),
    asociacion VARCHAR(255),
    ubicacion VARCHAR(255),
    titulo_evento VARCHAR(255) NOT NULL,
    tipo_evento VARCHAR(50),
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    nivel_ruido ENUM('Bajo', 'Medio', 'Alto') DEFAULT 'Bajo',
    descripcion_evento TEXT,
);