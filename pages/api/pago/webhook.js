// pages/api/pago/webhook.js
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.NEXT_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const paymentId = req.body.data.id;

    // Aquí puedes actualizar el estado de tu orden a "pagada" en tu base de datos
    // ...

    res.status(200).send('OK');
  } else {
    res.status(405).end();
  }
}
