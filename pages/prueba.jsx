import React from 'react';
import { pdf } from '@react-pdf/renderer';
import Factura from '@/components/Factura';

function DownloadButton() {
  const downloadPDF = () => {
    pdf(<Factura id={5} />).toBlob().then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'invoice.pdf';
      link.click();
    });
  };

  return (
    <>
 
    <button onClick={downloadPDF}>Descargar PDF</button>
    </>
    
  );
}

export default DownloadButton;