const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Ruta al archivo descargado de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const productos = [
  // TAZAS
  { name: "TAZA 1", price: 10000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 1", pictureUrl: "/multimedia/merchandising2/taza1.jpg" },
  { name: "TAZA 2", price: 12000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 2", pictureUrl: "/multimedia/merchandising2/taza2.jpg" },
  { name: "TAZA 3", price: 20000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 3", pictureUrl: "/multimedia/merchandising2/taza3.jpeg" },
  // REMERAS
  { name: "REMERA 1", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize modelo 1", pictureUrl: "/multimedia/merchandising2/remera1.jpeg" },
  { name: "REMERA 2", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize modelo 2", pictureUrl: "/multimedia/merchandising2/remera2.jpg" },
  { name: "REMERA 3", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize modelo 3", pictureUrl: "/multimedia/merchandising2/remera3.jpg" },
  // BOLSOS
  { name: "BOLSO 1", price: 65000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso modelo 1", pictureUrl: "/multimedia/merchandising2/bolso1.jpeg" },
  { name: "BOLSO 2", price: 75000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso modelo 2", pictureUrl: "/multimedia/merchandising2/bolso2.jpg" },
  { name: "BOLSO 3", price: 25000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso modelo 3", pictureUrl: "/multimedia/merchandising2/bolso3.jpg" },
  // BOTELLAS
  { name: "BOTELLA 1", price: 35000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella térmica", pictureUrl: "/multimedia/merchandising2/botella1.jpeg" },
  { name: "BOTELLA 2", price: 45000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella deportiva", pictureUrl: "/multimedia/merchandising2/botella2.jpeg" },
  { name: "BOTELLA 3", price: 25000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella plegable", pictureUrl: "/multimedia/merchandising2/botella3.jpg" },
  // ZAPATILLAS
  { name: "BALLET MODELO 1", price: 99000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de ballet", pictureUrl: "/multimedia/merchandising2/zapatilla1.jpg" },
  { name: "BALLROOM MODELO 2", price: 125000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de baile social", pictureUrl: "/multimedia/merchandising2/zapatilla2.jpg" },
  { name: "JAZZ MODELO 3", price: 150000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de jazz", pictureUrl: "/multimedia/merchandising2/zapatilla3.jpeg" },
  // ELEMENTOS
  { name: "MAT YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Mat antideslizante", pictureUrl: "/multimedia/merchandising2/mat.jpg" },
  { name: "PESAS 2 KG", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Par de pesas", pictureUrl: "/multimedia/merchandising2/pesas.jpg" },
  { name: "LADRILLO YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Bloque de espuma", pictureUrl: "/multimedia/merchandising2/ladrillo.jpg" }
];

async function upload() {
  console.log('🚀 Subiendo productos...');
  const collection = db.collection('products');
  for (const p of productos) {
    const docRef = await collection.add(p);
    console.log(`✅ ${p.name} - ID: ${docRef.id}`);
  }
  console.log('🎉 Todos los productos subidos correctamente');
  process.exit(0);
}

upload().catch(console.error);