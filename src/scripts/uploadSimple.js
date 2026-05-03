const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('Configuración de Firebase:', {
  projectId: firebaseConfig.projectId,
  hasApiKey: !!firebaseConfig.apiKey
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productos = [
  { name: "TAZA 1", price: 10000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 1", pictureUrl: "/multimedia/merchandising2/taza1.jpg" },
  { name: "TAZA 2", price: 12000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 2", pictureUrl: "/multimedia/merchandising2/taza2.jpg" },
  { name: "TAZA 3", price: 20000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 3", pictureUrl: "/multimedia/merchandising2/taza3.jpeg" },
  { name: "REMERA 1", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize 1", pictureUrl: "/multimedia/merchandising2/remera1.jpeg" },
  { name: "REMERA 2", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize 2", pictureUrl: "/multimedia/merchandising2/remera2.jpg" },
  { name: "REMERA 3", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize 3", pictureUrl: "/multimedia/merchandising2/remera3.jpg" },
  { name: "BOLSO 1", price: 65000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso ecológico", pictureUrl: "/multimedia/merchandising2/bolso1.jpeg" },
  { name: "BOLSO 2", price: 75000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso con cierre", pictureUrl: "/multimedia/merchandising2/bolso2.jpg" },
  { name: "BOLSO 3", price: 25000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Morral", pictureUrl: "/multimedia/merchandising2/bolso3.jpg" },
  { name: "BOTELLA 1", price: 35000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella térmica", pictureUrl: "/multimedia/merchandising2/botella1.jpeg" },
  { name: "BOTELLA 2", price: 45000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella deportiva", pictureUrl: "/multimedia/merchandising2/botella2.jpeg" },
  { name: "BOTELLA 3", price: 25000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella plegable", pictureUrl: "/multimedia/merchandising2/botella3.jpg" },
  { name: "BALLET MODELO 1", price: 99000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de ballet", pictureUrl: "/multimedia/merchandising2/zapatilla1.jpg" },
  { name: "BALLROOM MODELO 2", price: 125000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de baile social", pictureUrl: "/multimedia/merchandising2/zapatilla2.jpg" },
  { name: "JAZZ MODELO 3", price: 150000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de jazz", pictureUrl: "/multimedia/merchandising2/zapatilla3.jpeg" },
  { name: "MAT YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Mat antideslizante", pictureUrl: "/multimedia/merchandising2/mat.jpg" },
  { name: "PESAS 2 KG", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Par de pesas", pictureUrl: "/multimedia/merchandising2/pesas.jpg" },
  { name: "LADRILLO YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Bloque de espuma", pictureUrl: "/multimedia/merchandising2/ladrillo.jpg" }
];

async function upload() {
  console.log('🚀 Subiendo productos a Firestore...');
  const col = collection(db, 'products');
  let count = 0;
  
  for (const p of productos) {
    try {
      const docRef = await addDoc(col, p);
      console.log(`✅ ${p.name} - ID: ${docRef.id}`);
      count++;
    } catch (err) {
      console.error(`❌ Error con ${p.name}:`, err.message);
    }
  }
  
  console.log(`🎉 ${count} de ${productos.length} productos subidos`);
}

upload().catch(console.error);