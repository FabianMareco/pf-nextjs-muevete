# MUEVETE – Plataforma de danza y bienestar online
 
Aplicación web completa de e-commerce desarrollada con Next.js 15, orientada a la venta de clases de danza, cursos de nutrición y merchandising oficial de la marca MUEVETE.
 
## Deploy
 
La aplicación está desplegada en Vercel y se actualiza automáticamente con cada push a la rama `main`.
 
**URL de producción:** https://pf-nextjs-muevete.vercel.app
 
## Tecnologías
 
| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| Estilos | Tailwind CSS + clases personalizadas |
| Lenguaje | TypeScript |
| Base de datos | Firebase Firestore |
| Autenticación | Firebase Authentication (email/contraseña + Google) |
| Almacenamiento | Firebase Storage |
| Estado global | React Context API |
| Notificaciones | React Hot Toast |
| Animaciones | AOS (Animate On Scroll) |
| Deploy | Vercel |
 
## Funcionalidades
 
### Autenticación
- Registro e inicio de sesión con email/contraseña y Google
- Recuperación de contraseña por email
- Rutas protegidas para el panel de administración
### Catálogo y carrito
- Listado de productos de merchandising con filtros por subcategoría (sidebar con checkboxes)
- Subcategorías: tazas, remeras, bolsos, botellas, zapatillas, equipamiento
- Selector de talle (S/M/L/XL para remeras, 34–43 para zapatillas) y color con cambio de imagen en tiempo real
- Carrito unificado que combina productos de merchandising y packs de clases
- Confirmación antes de eliminar productos o vaciar el carrito
- Finalización de compra con guardado de orden en Firestore, descuento de stock automático y ticket resumen
### Clases y packs
- 15 disciplinas disponibles (danza, yoga, pilates, tango, folclore, nutrición y más)
- Packs normales y packs premium diferenciados visualmente
- Sección separada para cursos y asesorías de nutrición
### Panel de administración (`/admin`)
- Acceso restringido a usuarios autenticados
- Dashboard con resumen de productos y órdenes
- CRUD completo de productos con subida de imágenes a Firebase Storage
- Visualización de todas las órdenes registradas
## Estructura del proyecto
 
```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── orders/page.tsx
│   ├── api/
│   │   ├── products/route.ts
│   │   ├── products/[id]/route.ts
│   │   ├── orders/route.ts
│   │   └── upload/route.ts
│   ├── cart/page.tsx
│   ├── categories/[categoryId]/page.tsx
│   ├── clases/page.tsx
│   ├── merchandising/page.tsx
│   ├── nosotros/page.tsx
│   ├── contactanos/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CartWidget.tsx
│   ├── ProductCard.tsx
│   ├── ProductModal.tsx
│   ├── MerchandisingClient.tsx
│   ├── ConfirmDialog.tsx
│   ├── OrderTicket.tsx
│   ├── ImageUpload.tsx
│   └── Carousel.tsx
├── context/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── hooks/
│   └── useCart.ts
├── lib/
│   ├── firebase.ts
│   ├── firebase-admin.ts
│   ├── firestore.ts
│   └── firestore-server.ts
└── data/
    └── packs.json
```
 
## Instalación
 
### 1. Clonar el repositorio
 
```bash
git clone https://github.com/FabianMareco/pf-nextjs-muevete.git
cd pf-nextjs-muevete
```
 
### 2. Instalar dependencias
 
```bash
npm install
```
 
### 3. Configurar variables de entorno
 
Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
 
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_APP_ID=
 
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```
 
### 4. Cargar datos iniciales
 
Los scripts de carga están disponibles en la raíz del proyecto. Ejecutarlos desde Cloud Shell con las credenciales de Firebase configuradas:
 
```bash
node upload.js        # Productos de merchandising
node uploadPacks.js   # Packs de clases y nutrición
```
 
### 5. Iniciar en modo desarrollo
 
```bash
npm run dev
```
 
La aplicación estará disponible en `http://localhost:3000`.
 
## Variables de entorno
 
El archivo `serviceAccountKey.json` requerido por Firebase Admin SDK **no debe incluirse en el repositorio**. Verificar que está listado en `.gitignore` antes de hacer cualquier commit.
 
## Deploy en Vercel
 
Para realizar un nuevo deploy simplemente hacé push a `main`:
 
```bash
git add .
git commit -m "descripción del cambio"
git push
```
 
Vercel detecta el push automáticamente y redeploya. Las variables de entorno están configuradas directamente en el panel de Vercel.
 