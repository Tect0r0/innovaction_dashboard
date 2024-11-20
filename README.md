# Innovaction Events Dashboard

Dashboard de eventos para el Tec Innovaction Gym.

## Información

Este Dashboard fue creado con el fin de desplegar los eventos que tomarán lugar en el Innovaction Gym del Tecnológico de Monterrey. Esto se hace mediante la lectura de un excel, y su despliegue de manera de calendario.

## Autores

- Gerardo Leiva Diaz (gerardo.leiva.d@gmail.com / a01198479@tec.mx)
- Isaac Rojas Sosa (isaacrojassosa@gmail.com / a01198693@tec.mx)
- Saúl Emilio Delgado Garza (saul10emilio@gmail.com/ a01285188@tec.mx)

## Tech Stack
- React
- Vite
- TypeScript
- Flask
- MySQL
- CSS

## Codigo MYSQL

CREATE TABLE eventos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre_contacto VARCHAR(50),
info_contacto VARCHAR(100),
tipo_colaborador VARCHAR(50),
asociacion VARCHAR(255),
colaboracion_externa VARCHAR(10),
ubicacion VARCHAR(255),
titulo_evento VARCHAR(255) NOT NULL,
descripcion_evento TEXT,
tipo_evento VARCHAR(50),
fecha_inicio DATETIME NOT NULL,
fecha_fin DATETIME NOT NULL,
impacto VARCHAR(50),
tipo_innovacion VARCHAR(50),
usuarios_estimados int NOT null,
asistencias_confirmadas int NOT NULL
);

## Python modules needed (copy + paste in terminal)
pip install flask
pip install flask_cors
pip install mysql
pip install mysql-connector-python

## Run app:
# Split terminal
# Terminal 1:
python agendar_evento.py

# Terminal 2:
npm i
npm run dev
