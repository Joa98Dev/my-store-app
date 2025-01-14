# Prueba Técnica

El siguiente documento brinda una breve explicación del proyecto **MyStoreApp**, su funcionamiento y las tecnologías utilizadas en su desarrollo.

## Tecnologías Utilizadas

Este proyecto se divide en dos secciones principales:


1. Back-end: Encargado de gestionar todo lo relacionado con el servidor, configuración de bases de datos y autenticación.

   Para ello, se utilizaron las siguientes tecnologías:

   * Django
        
    * Django REST framework
        
    * Django CORS Headers

    Todo esto, bajo el lenguaje de programación Python.

    2. Front-end: Encargado de gestionar la experiencia del usuario.

    Se utilizaron las siguientes tecnologías:

    * React
        
    * Bootstrap

    Todo esto, bajo los lenguajes de programación **JavaScript** y el lenguaje de etiquetas **HTML5**.

## Cómo usar la aplicación

Para ello seguir los pasos proporcionados:

* Clonar o descargar el repositorio

* Tener instalado python 3.12

* Dentro de la carpeta backend crear el entorno virtual

    ```
    # Linux / MacOS
    python3 -m venv venv

    # Windows
    python -m venv venv
    ```

* Activar el entorno virtual

    ```
     # Linux / MacOS
    source venv/bin/activate

    # Windows
    venv\Scripts\activate
    ```


* Una vez activado es momento de ejecutar el servidor.

* Para ello ir a la raíz del proyecto dentro de la carpeta  store_backend

    ```
    # Linux / MacOS / Windows
    python manage.py runserver
    ```
    
* Por utltimo ir a la raíz de la carpeta frontend y ejecutar

```
# Linux / MacOS / Windows
npm start
```

* Una vez hecho esto se abrira la app web y pedira las credenciales para poder acceder al inventario.

    * Las credenciales son:

        * Usuario:

        ```
        admin
        ```

        * Contrasena:

        ```
        admin123
        ```
