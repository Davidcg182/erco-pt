# PT-ERCO Backend

Backend desarrollado con Node.js, TypeScript y PostgreSQL, implementando principios de Arquitectura Hexagonal, DDD y SOLID.

## 🏗️ Arquitectura y Metodologías

### Arquitectura
- **Arquitectura Hexagonal (Puertos y Adaptadores)**
  - Dominio en el centro
  - Puertos para casos de uso
  - Adaptadores para infraestructura y API

### Metodologías
- **Domain-Driven Design (DDD)**
  - Entidades
  - Value Objects
  - Repositorios
  - Servicios de Aplicación

- **SOLID**
  - Single Responsibility Principle
  - Open/Closed Principle
  - Liskov Substitution Principle
  - Interface Segregation Principle
  - Dependency Inversion Principle

## 🚀 Tecnologías

- Node.js
- TypeScript
- Express
- PostgreSQL
- Knex.js (ORM)
- Docker
- Jest (Testing)

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- Docker y Docker Compose
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd pt-erco
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con tus configuraciones.

4. Iniciar la base de datos con Docker:
```bash
docker-compose up -d
```

5. Ejecutar migraciones:
```bash
npx knex migrate:latest
```

6. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

## 🛠️ Estructura del Proyecto

```
src/
├── core/                 # Capa de dominio
│   └── user/
│       ├── domain/      # Entidades y Value Objects
│       ├── application/ # Casos de uso
│       └── infrastructure/ # Implementaciones
├── app/                 # Capa de aplicación
│   └── api/            # Controladores y rutas
├── infrastructure/      # Adaptadores de infraestructura
└── database/           # Configuración y migraciones
```

## 📡 Consumo de la API

### Crear Usuario

```bash
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{
  "name": "Usuario Ejemplo",
  "balance": 1000,
  "login": "usuario1",
  "password": "contraseña123"
}'
```

Respuesta exitosa:
```json
{
  "status": "success",
  "data": {
    "id": "uuid-generado",
    "name": "Usuario Ejemplo",
    "balance": 1000,
    "login": "usuario1",
    "createdAt": "2024-02-17T12:00:00.000Z"
  }
}
```

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run build`: Compila el proyecto
- `npm start`: Inicia el servidor en modo producción
- `npm run lint`: Ejecuta el linter
- `npm run type-check`: Verifica tipos de TypeScript
