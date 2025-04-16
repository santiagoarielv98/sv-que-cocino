# ¿Qué Cocino? (SvQueCocino)

Una aplicación web para generar recetas personalizadas basadas en los ingredientes que tengas disponibles, respetando restricciones dietéticas.

## 🍳 Descripción del Proyecto

"¿Qué Cocino?" es una aplicación que utiliza inteligencia artificial para generar recetas de cocina basadas en los ingredientes que el usuario tiene a mano. Esta herramienta es perfecta para quienes quieren aprovechar al máximo los alimentos disponibles en su hogar, descubrir nuevas combinaciones culinarias, o simplemente encontrar inspiración para sus comidas diarias.

## ✨ Características Principales

- **Generación de recetas personalizadas**: Introduce los ingredientes que tienes disponibles y obtén recetas completas.
- **Filtros para restricciones dietéticas**: Filtra recetas por restricciones como vegano, vegetariano, sin gluten, etc.
- **Detalles completos**: Visualiza tiempo de preparación, cocción, dificultad, porciones y pasos detallados.
- **Etiquetas de recetas**: Las recetas vienen con etiquetas para facilitar su categorización.
- **Autenticación de usuarios**: Registro e inicio de sesión con correo electrónico o Google.
- **Almacenamiento en la nube**: Las recetas generadas se guardan en Firestore para acceso futuro.
- **Interfaz responsiva**: Diseño adaptable a diferentes dispositivos.

## 🧰 Tecnologías Utilizadas

- **Frontend**: Angular con componentes standalone y señales
- **Diseño UI**: Angular Material
- **Autenticación**: Firebase Authentication
- **Base de datos**: Cloud Firestore
- **API backend**: Servicios RESTful para generación de recetas
- **Estilo**: CSS moderno con diseño responsivo

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (versión 18 o superior)
- Angular CLI
- Una cuenta de Firebase para configuración del proyecto

### Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/santiagoarielv98/sv-que-cocino.git
   cd sv-que-cocino
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea o modifica el archivo `src/environments/environment.ts` con tus credenciales de Firebase:
   ```typescript
   export const environment = {
     apiUrl: '[URL de tu API]',
     firebaseConfig: {
       apiKey: '[Tu API Key]',
       authDomain: '[Tu Auth Domain]',
       projectId: '[Tu Project ID]',
       storageBucket: '[Tu Storage Bucket]',
       messagingSenderId: '[Tu Messaging Sender ID]',
       appId: '[Tu App ID]',
       measurementId: '[Tu Measurement ID]',
     },
   };
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   ng serve
   ```

5. Abre tu navegador y visita `http://localhost:4200/`

## 📱 Uso de la Aplicación

1. **Inicio de sesión**: Regístrate o inicia sesión para acceder a todas las funcionalidades.
2. **Generación de recetas**:
   - Ingresa los ingredientes que tienes disponibles separados por comas.
   - Selecciona las restricciones dietéticas aplicables.
   - Haz clic en "Generar Receta".
3. **Exploración de recetas**:
   - Navega por las recetas generadas previamente.
   - Utiliza el botón "Ver receta completa" para visualizar todos los detalles.
4. **Detalles de la receta**:
   - Consulta información completa como ingredientes, pasos, tiempos y dificultad.

## 👨‍💻 Características en Desarrollo

- Generación de imágenes de las recetas usando IA
- Función para guardar recetas favoritas
- Opción para compartir recetas en redes sociales
- Filtros adicionales para búsqueda de recetas

## 📝 Licencia

Este proyecto es de uso personal.

## 👨‍💻 Acerca del Desarrollador

Desarrollador Full Stack especializado en React, TypeScript y NestJS, con una sólida experiencia en la creación de aplicaciones web. Actualmente estudiante de Desarrollo de Software en el Instituto Técnico Superior Leopoldo Marechal en Buenos Aires, Argentina.

### Tecnologías:
- **Frontend**: React, Angular, TypeScript
- **Backend**: Node.js, Spring Boot, Laravel
- **Bases de Datos**: MySQL, MongoDB, PostgreSQL
- **Otros**: Docker, Linux, Firebase

## 📧 Contacto

- **Email**: santiagoarielv98@gmail.com
- **LinkedIn**: [santiagoarielv](https://www.linkedin.com/in/santiagoarielv/)
- **GitHub**: [santiagoarielv98](https://github.com/santiagoarielv98)
- **Portfolio**: [Visitar Portfolio](https://portfolio-santiagoarielv98.vercel.app/)
