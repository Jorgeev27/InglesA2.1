// /api/proxy.js en la raíz de tu proyecto Vercel

// Esta es la URL COMPLETA de tu API de PHP original
const TARGET_URL = 'http://inglesa21.infinityfreeapp.com/htdocs/apiclases.php'; // Usa la URL correcta de tu API

module.exports = async (req, res) => {
    try {
        // fetch nativo de Node 18+
        const apiResponse = await fetch(TARGET_URL);
        const data = await apiResponse.json();

        // Configura las cabeceras CORS necesarias
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        res.status(200).json(data);

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Error al conectar con la API externa.' });
    }
};
