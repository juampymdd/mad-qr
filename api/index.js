const express = require("express");
const qrcode = require('qrcode');

const app = express()
const port = process.env.PORT || 3000
app.get('/', (req, res) => {
  res.json('ok')
})

const options = {
  errorCorrectionLevel: 'H', // Niveles de corrección de error: L, M, Q, H
  type: 'image/png', // Tipo de salida: SVG, PNG, ...
  quality: 0.92, // Calidad de la imagen, sólo para formatos JPEG y webp
  margin: 1, // Márgenes en blanco alrededor del código QR
  color: {
      dark: '#000', // Color oscuro
      light: '#FFF' // Color claro
  },
  width: 200, // Ancho de la imagen
};

app.get('/qr/:url', (req, res) => {
  const url = req.params.url
  qrcode.toDataURL(url, options, (err, src) => {
    if (err) {
      res.send('Error')
    }
    console.log(src)
    // send image as png
    res.setHeader('Content-Type', 'image/png')
    res.end(src.split('base64,')[1], 'base64')
  })
  
})

app.listen(port, () => {
  console.log('Server running on port '+port)
})

