# Prueba técnica para OpositaTest

Este documento describe las mejoras realizadas en el proyecto para cumplir con los requisitos de la [prueba técnica](https://github.com/opositatest/prueba-tecnica-react).

A continuación, se detallan las mejoras realizadas antes y durante el desarrollo.

# Mejoras antes del desarrollo

## Mejora 1 - Cambio de nombre de rama

Después de clonar el repositorio original, cambié el nombre de la rama `master` a `main` para alinearme con las prácticas modernas de nomenclatura de ramas.

## Mejora 2 - Linter

Configuré un linter básico con ESLint para garantizar la calidad del código y evitar errores comunes.

También añadí Prettier para formatear automáticamente los archivos y mantener un estilo de código consistente en todo el proyecto.

## Mejora 3 - Variables de entorno

Utilicé las variables de entorno de Vite para manejar los endpoints base de la API. Esto permite una configuración más flexible y facilita el cambio de entornos (desarrollo, producción, etc.).

# Estructura del proyecto

La estructura del proyecto se organizó de la siguiente manera para garantizar la escalabilidad y mantenibilidad:

| Carpeta/Archivo | Descripción                                |
| --------------- | ------------------------------------------ |
| `src/`          | Carpeta principal del código fuente        |
| `api/`          | Llamadas a APIs y constantes relacionadas  |
| `components/`   | Componentes reutilizables                  |
| `context/`      | Contextos globales                         |
| `hooks/`        | Hooks personalizados                       |
| `layouts/`      | Layouts para organizar las páginas         |
| `pages/`        | Páginas principales de la aplicación       |
| `styles/`       | Archivos de estilos globales o específicos |
| `types/`        | Definiciones de tipos TypeScript           |
| `utils/`        | Funciones utilitarias                      |
| `App.tsx`       | Componente principal de la aplicación      |
| `index.tsx`     | Punto de entrada de la aplicación          |

# Mejoras de desarrollo

## Mejora 1 - Primer refactor

En esta mejora me he enfocado en mejorar la legibilidad y mantenibilidad del proyecto para ello:

Primero he cambiado el nombre del componente `book-list` a `BookList` ya que prefiero utilizar `Pascal Case`.

Para hacer el código más legible he refactorizado un poco la estructura del componente Booklist para ello he creado los siguientes componentes:

- `SearchBar.tsx` -> Aquí estaría todo lo relacionado con el buscador de libros.
- `Book.tsx` -> aquí está la estructura base de un libro.
- `BookModal.tsx` -> aquí estaría lo que aparentemente sería un modal con más información y acciones del libro en cuestión.

He creado el tipado del objeto `Book` para que sea más fácil trabajar.

He creado un customHook `useBooks` para centralizar toda la logica de estados y funciones que había en el componente `BookList`.

## Mejora 2 - Eliminación de libererías innecesarias

He observado que en algunas funciones se estaba utilizando `lodash` cuando no era necesario, ya que el propio lenguaje nos da esos métodos que se estaban utilizando.

Por ejemplo en la función `booksData`, se puede observar que se está utilizando lodash para hacer un `filter` siendo innecesario ya que javascript lo tiene implementado [js filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```ts
const booksData = () => {
  return lodash.filter(libros, (b: any) =>
    lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery))
  );
};
```

## Mejora 3 - Creación del estado global de la aplicación

Para manejar el estado global de la aplicación, implementé un contexto utilizando la API de Context de React. Esto evita la necesidad de usar librerías externas como Redux o Zustand, ya que el proyecto no requiere una solución más compleja.

### Cambios realizados:

1. **Centralización del estado:**

   - Antes, el estado estaba dividido en múltiples hooks (`useState`) dentro del componente `BookList`. Esto dificultaba la reutilización y escalabilidad.
   - Ahora, el estado está centralizado en un único objeto `libraryState` manejado por el contexto.

2. **Optimización del estado:**
   - Cambié algunos tipos de datos, como `Set` a `Map`, para mejorar la eficiencia y adaptarlos mejor a las necesidades del proyecto.

### Código antes del cambio:

```ts
const [searchQuery, setSearchQuery] = useState<string>('');
const [favorites, setFavorites] = useState<Set<string>>(new Set());
const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set());
const [selectedBook, setSelectedBook] = useState<any>(null);
const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);
const [sortedBooks, setSortedBooks] = useState([]);
```

### Código después del cambio:

```ts
interface LibraryState {
  books: BookType[] | null;
  searchQuery: string | null;
  favorites: Map<string, object> | null;
  recentBooks: Set<string> | null;
  selectedBook: BookType | null;
  isSortedAsc: boolean | null;
  sortedBooks: BookType[] | null;
}
----
  const [libraryState, setLibraryState] = useState<LibraryState>(initialState);

// con esto conseguimos no tener que hacer el cambio de estado manualmente en cada sitio donde se estuviese utilizando.
  const updateLibraryState = (value: Partial<LibraryState>) => {
    setLibraryState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };
```

Al realizar este cambio hemos mejorado la perfromance y escabilidad del proyecto ya que en caso de que fuese necesario añadir algún estado más simplemente tendríamos que extender la interfaz `libraryState`.

## Mejora 4 - Routing

He añadido `react router` para hacer el enrutado de la aplicación, ya que durante el desarrollo he querido añadir más páginas como por ejemplo una página de perfil.

## Mejora 5 - Uso de react portal

He añadido un `react portal` para renderizar la popup de más detalles del libro `BookModal.tsx`, también he aprovechado para reestructurar un poco la estructura de este elemento.

He utilizado un portal ya que quería que el elemento se comportase como si fuese un dialogo.

## Mejora 6 - ErrorBoundary

Creé un componente de error que envuelve toda la aplicación para capturar errores durante el renderizado.

Para ello, seguí la documentación oficial de React que explica cómo implementar un [ErrorBoundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

## Mejora 7 - React Query

Observé que la librería React Query ya estaba en el archivo `package.json`, por lo que decidí utilizarla para realizar las consultas de búsqueda de libros.

- Instalé `react-query-devtools` para habilitar las herramientas de desarrollo.
- Inicialicé React Query en el componente `App.tsx`, siguiendo la documentación oficial.

Con React Query, se facilita el trabajo de almacenamiento en caché, gestión de carga y manejo de errores. Aproveché estas características para mejorar las llamadas a las APIs.

### Búsqueda de libros

Parametricé la búsqueda de libros para acceder a distintas páginas de la API.
