# Microservicio de Autenticación

Este microservicio proporciona funciones esenciales de autenticación, incluyendo el registro de usuarios, inicio de sesión y gestión de contraseñas. Está construido con NestJS, un framework progresivo para Node.js, y está diseñado para ser escalable, seguro y fácil de integrar con otros servicios.

## Características

- **Registro de Usuarios**: Registra nuevos usuarios de manera segura con contraseñas cifradas.
- **Inicio de Sesión**: Autentica a los usuarios con tokens JWT.

## Tecnologías Utilizadas

- **Node.js**: v18 o superior
- **Docker**: Para el despliegue en contenedores

## Tests

Este microservicio incluye un conjunto de pruebas unitarias para garantizar el correcto funcionamiento de sus principales características. Las pruebas están configuradas para ejecutarse con Jest. Puedes ejecutar las pruebas usando el siguiente comando:

> npm run test

## Como utilizar

> docker-compose up --build

Despues de eso se puede manipular tranquilamente desde Docker desktop

## Version 1.0

Esta version es 1.0 y se va a seguir actualizando, con mejoras.

# ENGLISH

# Authentication Microservice

This microservice provides essential authentication features, including user registration, login, and password management. It is built with NestJS, a progressive framework for Node.js, and is designed to be scalable, secure, and easy to integrate with other services.

## Features

- **User Registration**: Securely registers new users with encrypted passwords.
- **Login**: Authenticates users with JWT tokens.

## Technologies Used

- **Node.js**: v18 or later
- **Docker**: For container deployment

## Tests

This microservice includes a set of unit tests to ensure the proper functioning of its main features. The tests are configured to run with Jest. You can execute the tests using the following command:

> npm run test

## How to Use

> docker-compose up --build
