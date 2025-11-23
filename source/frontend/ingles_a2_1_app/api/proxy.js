// /api/proxy.js - formato ES Modules para Vercel
const TARGET_URL = 'http://inglesa21.infinityfreeapp.com/htdocs/apiclases.php';

export default async function handler(req, res) {
  // Manejo de preflight CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  try {
    const apiResponse = await fetch(TARGET_URL);
    
    // Comprobamos que la respuesta sea correcta
    if (!apiResponse.ok) {
      throw new Error(`HTTP ${apiResponse.status} - ${apiResponse.statusText}`);
    }

    // Intentamos parsear JSON de forma segura
    let data;
    try {
      data = await apiResponse.json();
    } catch (jsonError) {
      throw new Error('La API externa no devolvió JSON válido.');
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return res.status(200).json(data);

  } catch (error) {
    console.error('Error en /api/proxy:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
