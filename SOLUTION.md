# Prueba técnica para OpositaTest

En este archivo se encontrarán las mejoras realizadas.

## Mejora 1

Depués de clonarme el repositorio original antes de realizar cualquier mejora en la aplicación he cambiado el nombre de la rama master a main.

## Mejora 2

He configurado el estlint muy basico y he añadido prettier para el formateo de ficheros.

## Mejora 3

He utilizado las variables de entorno de vite para poder trabajar con los endpoints base.

## Mejora 4

En esta mejora me he enfocado en mejorar la legibilidad y mantenibilidad del proyecto para ello:

Primero he cambiado el nombre del componente book-list a BookList ya que prefiero utilizar Pascal Case.

Para hacer el código más legible he refactorizado un poco la estructura del component Booklist para ello he creado los siguientes componentes:

- SearchBar.tsx -> Aquí estaría todo lo relacionado con el buscador de libros.
- Book.tsx -> aquí está la estructura base de un libro.
- BookModal.tsx -> aquí estaría lo que aparentemente sería un modal con más información y acciones del libro en cuestión.

He creado el tipado del objeto Book para que sea más fácil trabajar.

He creado un customHook `useBooks` para manegar toda la logica que de estados y funciones que había en el componente BookList.
