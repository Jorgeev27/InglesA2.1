export default async function handler(req, res) {
    // 1. Configurar CORS para permitir que tu Angular acceda a este Proxy
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

    // 2. Responder OK inmediatamente a las peticiones OPTIONS (Pre-flight)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Falta el parámetro ?url=" });
    }

    try {
        // 3. Preparar la petición al servidor de PHP (InfinityFree)
        // TRUCO CLAVE: Fingir ser un navegador real (Chrome) para intentar saltar el bloqueo
        const fetchOptions = {
            method: req.method,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json" // Asumimos JSON por defecto
            }
        };

        // Si hay datos en el cuerpo (POST/PUT), los pasamos
        if (req.method !== "GET" && req.body) {
            fetchOptions.body = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
        }

        // 4. Hacemos la llamada
        const response = await fetch(url, fetchOptions);

        // 5. LEER COMO TEXTO PRIMERO (Para evitar el crash del Error 500)
        const rawText = await response.text();

        // Intentamos convertir a JSON. Si falla, es que InfinityFree devolvió HTML de error.
        try {
            const data = JSON.parse(rawText);
            return res.status(response.status).json(data);
        } catch (e) {
            // SI ENTRAS AQUI: InfinityFree ha bloqueado la petición y ha devuelto HTML.
            console.error("No es JSON válido:", rawText.substring(0, 100)); 
            return res.status(502).json({ 
                error: "El servidor PHP devolvió HTML en vez de JSON (Bloqueo de seguridad)",
                details: rawText.substring(0, 500) // Te muestro el inicio del HTML para depurar
            });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}