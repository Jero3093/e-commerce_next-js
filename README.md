# E-Commerce App

Este proyecto es una aplicación de comercio electrónico desarrollada con Next.js, Redux, Redux Toolkit, Firebase, Tailwind CSS, Framer Motion y Sonner. El objetivo principal de esta aplicación es proporcionar a los usuarios una plataforma intuitiva y atractiva para comprar productos en línea.

## Descripción del proyecto

La "E-Commerce App" es una aplicación web diseñada para ofrecer a los usuarios una experiencia de compra en línea fácil y eficiente. La aplicación proporciona una interfaz intuitiva que permite a los usuarios navegar por diferentes categorías de productos, agregar productos al carrito de compras, realizar pagos seguros y realizar un seguimiento de sus pedidos.

## Tecnologías utilizadas

- [Next.js](https://nextjs.org): Un framework de React para la creación de aplicaciones web del lado del servidor (SSR) y del lado del cliente (CSR) con un enfoque en el rendimiento y la productividad.
- [Redux](https://redux.js.org): Una biblioteca de administración de estado predecible para aplicaciones JavaScript de frontend.
- [Redux Toolkit](https://redux-toolkit.js.org): Una biblioteca de utilidades que simplifica el uso de Redux, proporcionando configuraciones predeterminadas y funciones de reducción simplificadas.
- [Firebase](https://firebase.google.com): Una plataforma de desarrollo de aplicaciones en la nube que proporciona una amplia gama de servicios, como autenticación de usuarios, almacenamiento de datos en tiempo real y hospedaje web.
- [Tailwind CSS](https://tailwindcss.com): Un framework de CSS utilitario que permite crear interfaces web rápidamente al utilizar clases prediseñadas y personalizables.
- [Framer Motion](https://www.framer.com/motion/): Una biblioteca de animaciones y transiciones declarativas para React.
- [Sonner](https://sonnerdocs.com): Una biblioteca para enviar notificaciones en aplicaciones web.

## Características principales

- Navegación intuitiva y amigable para el usuario.
- Búsqueda de productos en tiempo real.
- Categorización de productos por tipo o características.
- Visualización detallada de los productos con imágenes, descripciones y precios.
- Funcionalidad de carrito de compras para agregar y eliminar productos.
- Proceso de pago seguro utilizando Firebase Authentication y Firebase Firestore.
- Seguimiento de pedidos y estado de envío.
- Notificaciones a través de Sonner.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Crea un nuevo proyecto en Firebase (https://console.firebase.google.com) y habilita los servicios de Firebase Firestore, Authentication y Storage.
3. En la autenticación de Firebase debes incluir la funcion de Correo o Email como metodo de autenticación.
4. Obtén las credenciales de Firebase para tu proyecto y configura las variables de entorno en un archivo `.env.local` en la raíz del proyecto. Asegúrate de incluir las siguientes variables: NEXT_PUBLIC_FIREBASE_API_KEY=<tu_api_key> NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<tu_domain> NEXT_PUBLIC_FIREBASE_PROJECT_ID=<tu_project_id> NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<tu_storage_bucket> NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<tu_messaging_sender_id> NEXT_PUBLIC_FIREBASE_APP_ID=<tu_app_id>
5. Abre una terminal en la carpeta raíz del proyecto.
6. Ejecuta el comando `npm install` para instalar las dependencias.
7. Ejecuta el comando `npm run dev` para iniciar la aplicación en modo de desarrollo.
8. Abre tu navegador web y ve a `http://localhost:3000` para ver la aplicación en funcionamiento.
9. Para hacer a un usuario administrador lo que tienes que hacer es agregar un campo en el documento de firestore de ese usuario que sea admin y con un booleano en true, de esa forma tendra todo el acceso a las funciones de administrador.
## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Realiza un fork de este repositorio.
2. Crea una rama con una descripción clara de la función o corrección que deseas implementar.
3. Envía un pull request describiendo los cambios realizados y las razones detrás de ellos.

## Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
