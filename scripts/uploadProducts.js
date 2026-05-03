// scripts/uploadProducts.js
const admin = require('firebase-admin');
const path = require('path');

// Ruta al archivo de clave privada descargado de Firebase
const serviceAccount = require('./serviceAccountKey.json');

// Inicializar Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Lista completa de productos (18 productos)
const productos = [
  {"name":"TAZA 1","price":10000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 1","pictureUrl":"/multimedia/merchandising2/taza1.jpg"},
  {"name":"TAZA 2","price":12000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 2","pictureUrl":"/multimedia/merchandising2/taza2.png"},
  {"name":"TAZA 3","price":20000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 3","pictureUrl":"/multimedia/merchandising2/taza3.png"},
  {"name":"TAZA 4","price":15000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 4","pictureUrl":"/multimedia/merchandising2/taza4.jpg"},
  {"name":"TAZA 5","price":15000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 5","pictureUrl":"/multimedia/merchandising2/taza5.png"},
  {"name":"TAZA 6","price":15000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 6","pictureUrl":"/multimedia/merchandising2/taza6.png"},
  {"name":"TAZA 7","price":18000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 7","pictureUrl":"/multimedia/merchandising2/taza7.jpeg"},
  {"name":"TAZA 8","price":18000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 8","pictureUrl":"/multimedia/merchandising2/taza8.png"},
  {"name":"TAZA 9","price":18000,"stock":50,"category":"merchandising","subcategory":"tazas","description":"Taza modelo 9","pictureUrl":"/multimedia/merchandising2/taza9.png"},

  {"name":"REMERA 1","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 1","pictureUrl":"/multimedia/merchandising2/remera1-AZ.png","colors":[{"name":"Azul","pictureUrl":"/multimedia/merchandising2/remera1-AZ.png"},{"name":"Verde","pictureUrl":"/multimedia/merchandising2/remera1-VER.jpeg"}]},
  {"name":"REMERA 2","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 2","pictureUrl":"/multimedia/merchandising2/remera2-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera2-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera2-N.png"}]},
  {"name":"REMERA 3","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 3","pictureUrl":"/multimedia/merchandising2/remera3-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera3-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera3-N.png"}]},
  {"name":"REMERA 4","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 4","pictureUrl":"/multimedia/merchandising2/remera4-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera4-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera4-N.jpg"}]},
  {"name":"REMERA 5","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 5","pictureUrl":"/multimedia/merchandising2/remera5-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera5-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera5-N.png"}]},
  {"name":"REMERA 6","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 6","pictureUrl":"/multimedia/merchandising2/remera-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera-N.png"}]},
  {"name":"REMERA 7","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 7","pictureUrl":"/multimedia/merchandising2/remera-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera-N.jpg"}]},
  {"name":"REMERA 8","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 8","pictureUrl":"/multimedia/merchandising2/remera-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera8-N.png"}]},
  {"name":"REMERA 9","price":40000,"stock":50,"category":"merchandising","subcategory":"remeras","description":"Remera oversize modelo 9","pictureUrl":"/multimedia/merchandising2/remera-B.png","colors":[{"name":"Blanco","pictureUrl":"/multimedia/merchandising2/remera-B.png"},{"name":"Negro","pictureUrl":"/multimedia/merchandising2/remera-N.png"}]},

  {"name":"BOLSO 1","price":65000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 1","pictureUrl":"/multimedia/merchandising2/bolso1.jpeg"},
  {"name":"BOLSO 2","price":75000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 2","pictureUrl":"/multimedia/merchandising2/bolso2.png"},
  {"name":"BOLSO 3","price":65000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 3","pictureUrl":"/multimedia/merchandising2/bolso3.png"},
  {"name":"BOLSO 4","price":75000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 4","pictureUrl":"/multimedia/merchandising2/bolso4.jpg"},
  {"name":"BOLSO 5","price":65000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 5","pictureUrl":"/multimedia/merchandising2/bolso5.png"},
  {"name":"BOLSO 6","price":75000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 6","pictureUrl":"/multimedia/merchandising2/bolso6.png"},
  {"name":"BOLSO 7","price":65000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 7","pictureUrl":"/multimedia/merchandising2/bolso7.jpg"},
  {"name":"BOLSO 8","price":75000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 8","pictureUrl":"/multimedia/merchandising2/bolso8.png"},
  {"name":"BOLSO 9","price":65000,"stock":20,"category":"merchandising","subcategory":"bolsos","description":"Bolso modelo 9","pictureUrl":"/multimedia/merchandising2/bolso9.png"},

  {"name":"BOTELLA 1","price":15000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 1","pictureUrl":"/multimedia/merchandising2/botella1.jpeg"},
  {"name":"BOTELLA 2","price":15000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 2","pictureUrl":"/multimedia/merchandising2/botella2.png"},
  {"name":"BOTELLA 3","price":15000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 3","pictureUrl":"/multimedia/merchandising2/botella3.png"},
  {"name":"BOTELLA 4","price":18000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 4","pictureUrl":"/multimedia/merchandising2/botella4.jpeg"},
  {"name":"BOTELLA 5","price":18000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 5","pictureUrl":"/multimedia/merchandising2/botella5.png"},
  {"name":"BOTELLA 6","price":18000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 6","pictureUrl":"/multimedia/merchandising2/botella6.png"},
  {"name":"BOTELLA 7","price":20000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 7","pictureUrl":"/multimedia/merchandising2/botella7.jpg"},
  {"name":"BOTELLA 8","price":20000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 8","pictureUrl":"/multimedia/merchandising2/botella8.png"},
  {"name":"BOTELLA 9","price":20000,"stock":50,"category":"merchandising","subcategory":"botellas","description":"Botella modelo 9","pictureUrl":"/multimedia/merchandising2/botella9.png"},

  {"name":"ZAPATILLA BALLET","price":50000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla de ballet","pictureUrl":"/multimedia/merchandising2/zapatilla1-ballet.jpg"},
  {"name":"ZAPATILLA JAZZ BADANA","price":50000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla de jazz badana","pictureUrl":"/multimedia/merchandising2/zapatilla2-Badana-Jazz.jpg"},
  {"name":"ZAPATILLA TAP","price":55000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla de tap","pictureUrl":"/multimedia/merchandising2/zapatilla3-tap.jpg"},
  {"name":"ZAPATILLA JAZZ","price":50000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla de jazz","pictureUrl":"/multimedia/merchandising2/zapatilla4-jazz.jpeg"},
  {"name":"ZAPATILLA JAZZ 2","price":50000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla de jazz modelo 2","pictureUrl":"/multimedia/merchandising2/zapatilla5-jazz2.jpg"},
  {"name":"ZAPATILLA BALLROOM","price":60000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla de ballroom","pictureUrl":"/multimedia/merchandising2/zapatilla6-ballroom.jpg"},
  {"name":"ZAPATILLA HEELS PINK","price":60000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla heels rosa","pictureUrl":"/multimedia/merchandising2/zapatilla7-HeelsPink.jpg"},
  {"name":"ZAPATILLA HEELS DARK","price":60000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla heels oscura","pictureUrl":"/multimedia/merchandising2/zapatilla8-HeelsDark.jpg"},
  {"name":"ZAPATILLA HEEL BUCANERA","price":60000,"stock":20,"category":"merchandising","subcategory":"zapatillas","description":"Zapatilla heel bucanera","pictureUrl":"/multimedia/merchandising2/zapatilla9-Heel-Bucanera.jpg"},

  {"name":"PESAS 2 KG","price":8000,"stock":30,"category":"merchandising","subcategory":"equipamiento","description":"Pesas 2 kg","pictureUrl":"/multimedia/merchandising2/E1-pesas.jpg"},
  {"name":"MAT YOGA","price":12000,"stock":30,"category":"merchandising","subcategory":"equipamiento","description":"Mat de yoga","pictureUrl":"/multimedia/merchandising2/E2-mat.jpg"},
  {"name":"LADRILLO YOGA","price":6000,"stock":30,"category":"merchandising","subcategory":"equipamiento","description":"Ladrillo de yoga","pictureUrl":"/multimedia/merchandising2/E3-ladrillo.jpg"},
  {"name":"THERABANDS","price":5000,"stock":50,"category":"merchandising","subcategory":"equipamiento","description":"Set de therabands","pictureUrl":"/multimedia/merchandising2/E4-therabands.jpg"},
  {"name":"FOAM ROLLER","price":15000,"stock":20,"category":"merchandising","subcategory":"equipamiento","description":"Foam roller","pictureUrl":"/multimedia/merchandising2/E5-foamroller.jpeg"},
  {"name":"PELOTAS DE TENIS X3","price":8000,"stock":30,"category":"merchandising","subcategory":"equipamiento","description":"Set 3 pelotas de tenis","pictureUrl":"/multimedia/merchandising2/E6-PELOTAS-DE-TENIS-X3.jpg"},
  {"name":"PELOTA YOGA","price":10000,"stock":20,"category":"merchandising","subcategory":"equipamiento","description":"Pelota de yoga","pictureUrl":"/multimedia/merchandising2/E7-pelota-yoga.jpeg"},
  {"name":"CINTA YOGA","price":5000,"stock":50,"category":"merchandising","subcategory":"equipamiento","description":"Cinta de yoga","pictureUrl":"/multimedia/merchandising2/E8-cinta-yoga.jpg"},
  {"name":"RODILLERAS","price":8000,"stock":30,"category":"merchandising","subcategory":"equipamiento","description":"Rodilleras","pictureUrl":"/multimedia/merchandising2/E9-rodilleras.jpeg"}
];

async function uploadProducts() {
  console.log('🚀 Conectando a Firestore...');
  console.log(`📦 Proyecto: ${serviceAccount.project_id}`);
  console.log('====================================');
  
  const collection = db.collection('products');
  let successCount = 0;
  let errorCount = 0;
  
  for (const p of productos) {
    try {
      const docRef = await collection.add(p);
      console.log(`✅ ${p.name.padEnd(20)} → ID: ${docRef.id}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error con ${p.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('====================================');
  console.log(`📊 RESUMEN:`);
  console.log(`   ✅ Exitosos: ${successCount}`);
  console.log(`   ❌ Errores: ${errorCount}`);
  console.log(`   📦 Total: ${productos.length}`);
  
  if (successCount === productos.length) {
    console.log('🎉 ¡TODOS LOS PRODUCTOS FUERON SUBIDOS CORRECTAMENTE!');
  } else {
    console.log('⚠️ Algunos productos no se subieron. Revisa los errores arriba.');
  }
  
  process.exit(0);
}

uploadProducts().catch((error) => {
  console.error('Error fatal:', error);
  process.exit(1);
});



