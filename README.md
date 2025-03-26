# Alquiler_Equipos

## Estudiantes:
Samuel Alvarez - A00394750

Sebastian Libreros - A00379813

Este proyecto es una API para gestionar dispositivos contratados en un sistema de alquiler. Se desarrolló utilizando **Node.js**, **Express**, **Sequelize** y **Zod** para la validación de datos.

## Características principales

- CRUD completo para gestionar **Contract Devices**.
- Validación de datos con **Zod**.
- Manejo de errores y respuestas HTTP adecuadas.
- Base de datos gestionada con **Sequelize** y **PostgreSQL/MySQL**.
- **Tests unitarios** para los controladores y servicios con **Jest** y **Supertest**.

## 🛠️ Tecnologías Utilizadas

- **Node.js** con **Express** para la creación del backend.
- **Sequelize** para la gestión de la base de datos.
- **Zod** para la validación de datos.
- **Jest** y **Supertest** para las pruebas.
- **PostgreSQL** o **MySQL** como base de datos.

---

## 🔧 Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/SebasL07/Alquiler_Equipos

   Instalar dependencias: 
   
   npm install

   abrir dos terminales

   en una se ejecuta el compilador de TypeScript en modo de observación.

   tsc --watch

   y en la otra se corre el codigo

   nodemon dist/src/app.js
