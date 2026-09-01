# Farmashop Frontend

Panel administrativo web para la gestión de Farmashop. Centraliza la operación de
inventario, compras, ventas y administración de usuarios, y se conecta a la API de
Farmashop mediante HTTP.

## Módulos disponibles

- **Inicio:** tablero principal.
- **Almacén:** productos, ubicaciones, tipos de producto, presentaciones, usos y
  laboratorios.
- **Compras:** órdenes, proveedores y reembolsos.
- **Ventas:** ventas y clientes.
- **Acceso:** usuarios y roles.
- **Asistente FarmIA:** chat integrado mediante un webhook de n8n.

La interfaz incluye navegación lateral adaptable, tema claro/oscuro persistido en el
navegador y una vista para rutas no encontradas.

## Tecnologías

| Área | Tecnologías |
| --- | --- |
| Framework | Vue 3, Composition API y Single File Components |
| Lenguaje | TypeScript |
| Construcción y desarrollo | Vite 7 y `@vitejs/plugin-vue` |
| Estilos | Tailwind CSS 4, PostCSS y Autoprefixer |
| Navegación y estado | Vue Router 5 y Pinia |
| HTTP | Axios, con credenciales, token Bearer e interceptores de errores |
| Asistente | `@n8n/chat` conectado a n8n |
| Pruebas | Vitest, Vue Test Utils y JSDOM |
| Calidad | ESLint 9, Oxlint y Prettier |
| Herramientas | Node.js 20.19+ o 22.12+, npm y vue-tsc |

## Requisitos

- Node.js `^20.19.0 || >=22.12.0`
- npm
- Una instancia accesible de la API de Farmashop

## Instalación y configuración

```bash
npm install
```

Cree o ajuste el archivo `.env` en la raíz del proyecto con la URL de la API:

```env
VITE_API_URL=https://farmashop.test
```

`VITE_API_URL` se utiliza como `baseURL` de Axios. Las solicitudes envían cookies
(`withCredentials`) y, si existe `token` en `localStorage`, agregan el encabezado
`Authorization: Bearer <token>`.

> El webhook de FarmIA está configurado actualmente en
> `src/components/layout/AppSidebar.vue`. Para usar el asistente en otro entorno,
> actualice allí su URL de webhook de n8n.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente. |
| `npm run build` | Ejecuta la verificación de tipos y genera la compilación de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run type-check` | Verifica los tipos de Vue y TypeScript con `vue-tsc`. |
| `npm run test:unit` | Ejecuta las pruebas unitarias con Vitest. |
| `npm run lint` | Ejecuta ESLint y Oxlint; ambos scripts corrigen automáticamente los problemas que pueden resolver. |
| `npm run format` | Formatea los archivos de `src/` con Prettier. |

## Estructura principal

```text
src/
├── api/           # Cliente Axios y configuración de API
├── components/    # Layout, navegación, iconos y componentes compartidos
├── composables/   # Lógica reutilizable de Vue
├── stores/        # Estado global con Pinia
├── router/        # Rutas de la aplicación
├── services/      # Servicios de dominio y llamadas a API
├── types/         # Tipos de TypeScript
├── views/         # Dashboard y páginas generales
└── [módulos]/     # Productos, ventas, compras, usuarios, etc.
```

## Rutas

| Ruta | Módulo |
| --- | --- |
| `/` | Inicio |
| `/products`, `/locations`, `/type-products`, `/presentations`, `/usages`, `/laboratories` | Almacén |
| `/orders`, `/suppliers`, `/reimbursements` | Compras |
| `/sales`, `/customers` | Ventas |
| `/users`, `/roles` | Acceso |

Las rutas no definidas muestran la página `NotFound`.

## Desarrollo

Se recomienda Visual Studio Code con la extensión [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar). El proyecto utiliza el alias `@` para importar desde `src`, por ejemplo: `@/components/layout/AdminLayout.vue`.
