// pages/index.js
import { useEffect } from 'react';

const IndexPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.mercadopago.com/v2/security.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const realizarPago = () => {
    console.log('Clave de MercadoPago:', process.env.NEXT_PUBLIC_KEY);
    const { Mercadopago } = window;
    Mercadopago.setPublishableKey(process.env.NEXT_PUBLIC_KEY);

    const preference = {
      items: [
        {
          title: 'Producto',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 1000,
        },
      ],
    };

    window.Mercadopago.createPreference(preference, function (response) {
      window.Mercadopago.open({
        preference_id: response.body.id,
      });
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={realizarPago}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Pagar con MercadoPago
      </button>
    </div>
  );
};

export default IndexPage;
