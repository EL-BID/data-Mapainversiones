# MapaInversiones PS2 - Team 1

El objetivo de este proyecto es modernizar la interfaz de usuario (UI) de la plataforma MapaInversiones utilizando herramientas contemporáneas como Next.js y Material-UI. Este esfuerzo de modernización pretende mejorar la experiencia de usuario y la accesibilidad, haciendo que los datos de inversión pública sean más accesibles y comprensibles para los ciudadanos.

## Recursos Adicionales

- **Documento Técnico**: [Enlace al documento](https://docs.google.com/document/d/19HM9LdMG8TLljMBBd0ocMZH7H_u2IEIdMX0_xPYwoJo/edit?usp=sharing)
- **PDF de Diseños de Figma**: [Enlace a Figma](https://drive.google.com/file/d/13duixelXYRHblADUhW1X07fstYkEeKsR/view?usp=sharing)
- **Wireframe de Figma**: [Enlace a Figma](https://www.figma.com/design/OrjVKkSBhYvFzb1OUD3Prt/Wireframes?node-id=0-1&t=GtrrzapkgYaIsxUR-1)
- **Presentation**: [Enlace a la presentación] (añadir enlace aquí)
- **BID Planteamiento del Problema**: [Enlace a planteamiento del problema](https://idb-air-techsprint.vercel.app/problem-statements/planteamiento-del-problema-2)

## Guía de Instalación

### 1. Configuración del Entorno

1. Copia el archivo `.env.example` y renómbralo como `.env.local`.
2. En este archivo, reemplaza la propiedad `NEXT_PUBLIC_MAPBOX_TOKEN` con tu clave personal de Mapbox.

   Para obtener la clave, sigue estos pasos:

   - Regístrate y crea una cuenta en [Mapbox](https://www.mapbox.com/).
   - Dirígete a [tu cuenta de Mapbox](https://account.mapbox.com/).
   - Selecciona el botón "Create Token" para generar un nuevo token.
   - Copia el token generado y colócalo en el archivo `.env.local` en la propiedad `NEXT_PUBLIC_MAPBOX_TOKEN`.

   > **Nota:** Este token es privado y no debe ser compartido.

### 2. Iniciar el Servidor de Desarrollo

1. Asegúrate de tener todas las dependencias instaladas:

   ```bash
   npm install

2. Inicia el servidor de desarrollo:

    ```bash
    npm run dev

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

### Dependencias

- **@emotion/cache**: Herramienta para gestionar la caché de estilos en aplicaciones con `Emotion`. [Documentación](https://emotion.sh/docs/@emotion/cache).
- **@emotion/react**: Biblioteca para escribir estilos con `Emotion` usando la sintaxis de React. [Documentación](https://emotion.sh/docs/@emotion/react).
- **@emotion/styled**: Biblioteca para crear componentes con estilos usando la API de `styled` en `Emotion`. [Documentación](https://emotion.sh/docs/@emotion/styled).
- **@mui/icons-material**: Paquete de iconos que se integra con Material UI en aplicaciones React. [Documentación](https://mui.com/components/icons/).
- **@mui/material-nextjs**: Implementación de Material UI adaptada para proyectos con Next.js. [Documentación](https://mui.com/).
- **@types/mapbox-gl**: Tipos TypeScript para `mapbox-gl`, una biblioteca para trabajar con mapas interactivos. [Documentación](https://www.npmjs.com/package/@types/mapbox-gl).
- **mapbox-gl**: Biblioteca para trabajar con mapas interactivos en aplicaciones web. [Documentación](https://docs.mapbox.com/mapbox-gl-js/guides/).
- **next**: Framework de React para aplicaciones web con renderizado del lado del servidor y generación de sitios estáticos. [Documentación](https://nextjs.org/docs).
- **react**: Biblioteca de JavaScript para construir interfaces de usuario. [Documentación](https://react.dev/).
- **react-dom**: Paquete que proporciona métodos específicos para trabajar con el DOM en React. [Documentación](https://react.dev/reference/react-dom).
- **react-google-charts**: Componentes de React para Google Charts. [Documentación](https://react-google-charts.com/).
- **react-map-gl**: Componente de React para trabajar con `mapbox-gl`. [Documentación](https://visgl.github.io/react-map-gl/).

### Dependencias de desarrollo

- **@types/node**: Tipos TypeScript para Node.js. [Documentación](https://www.npmjs.com/package/@types/node).
- **@types/react**: Tipos TypeScript para React. [Documentación](https://www.npmjs.com/package/@types/react).
- **@types/react-dom**: Tipos TypeScript para React DOM. [Documentación](https://www.npmjs.com/package/@types/react-dom).
- **eslint**: Herramienta de linting para JavaScript y TypeScript, que ayuda a mantener un código limpio y consistente. [Documentación](https://eslint.org/docs/latest/).
- **eslint-config-next**: Configuración predefinida de ESLint para proyectos con Next.js. [Documentación](https://nextjs.org/docs/basic-features/eslint).
- **typescript**: Superset de JavaScript que añade tipos estáticos opcionales y herramientas de desarrollo robustas. [Documentación](https://www.typescriptlang.org/docs/).

## Autor

---

- [Fernando Estevez](https://www.linkedin.com/in/fernando-estevez-799b79233/ "Fernando Estevez")

## Licencia

---
Licencia BID [LICENSE](/License.md)
