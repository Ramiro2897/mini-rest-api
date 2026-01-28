## 1️⃣ Seed inicial (`prisma/seed.ts`)

```ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: "Ramiro", email: "ramiro@example.com" },
    { name: "Laura", email: "laura@example.com" },
    { name: "Carlos", email: "carlos@example.com" },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

> Este seed asegura que los usuarios iniciales siempre existan y no se dupliquen si lo corres varias veces.

---

## 2️⃣ README.md sugerido

````markdown
# Mini REST API

API RESTful simple con Node.js, Express y Prisma, lista para CRUD de usuarios, tests y CI/CD.

## Requisitos

- Node.js 20+
- PostgreSQL
- npm

## Instalación

1. Clonar repo:

```bash
git clone <repo-url>
cd mini-rest-api
````

2. Instalar dependencias:

```bash
npm install
```

3. Crear `.env`:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/mi_db"
```

4. Generar Prisma Client:

```bash
npx prisma generate
```

5. Ejecutar seed inicial:

```bash
npx ts-node prisma/seed.ts
```

6. Levantar servidor:

```bash
npm run dev
```

Servidor corriendo en `http://localhost:3000`

## Tests

```bash
npm test
```

## Endpoints

| Método | Ruta       | Descripción                |
| ------ | ---------- | -------------------------- |
| GET    | /users     | Obtener todos los usuarios |
| GET    | /users/:id | Obtener usuario por ID     |
| POST   | /users     | Crear usuario              |
| PUT    | /users/:id | Actualizar usuario         |
| DELETE | /users/:id | Eliminar usuario           |

## CI/CD

* GitHub Actions corre tests automáticamente en cada push a `main`.

````

---

## 3️⃣ Comando rápido para inicializar todo

Podrías agregar un script en `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "generate": "npx prisma generate",
  "seed": "npx ts-node prisma/seed.ts",
  "start-all": "npm run generate && npm run seed && npm run dev",
  "test": "jest --forceExit --detectOpenHandles"
}
````

Ahora con:

```bash
npm run start-all
```

> ⚠️ Actualmente no hay base de datos configurada. Para correr la API completa se necesita un PostgreSQL y configurar `DATABASE_URL` en `.env`.

Se genera Prisma Client, corre el seed y levanta el servidor en un solo comando. 🎯

---


