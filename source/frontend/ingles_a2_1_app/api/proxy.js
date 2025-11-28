export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight para móviles, navegadores y Vercel
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Falta el parámetro ?url=" });
  }

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (req.method !== "GET") {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const text = await response.text(); // <- IMPORTANTE: no assumes JSON

    // Si el backend devuelve JSON válido -> parsear
    try {
      const data = JSON.parse(text);
      return res.status(response.status).json(data);
    } catch {
      // Si no es JSON -> devolver texto adaptado
      return res.status(response.status).send(text);
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
