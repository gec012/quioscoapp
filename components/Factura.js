import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Crear estilos
const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30,backgroundColor:'#E0E0E0',padding:10 },
  title: { fontSize: 24, textAlign: 'left', flexGrow: 1 },
  logo: { width: 74, height: 66, alignSelf: 'center' },
  tableHeader: { flexDirection: 'row', borderBottom: 1, marginBottom: 5, backgroundColor: '#E0E0E0' },
  columnHeader: { flexGrow: 1 },
  lineItem: { flexDirection: 'row', marginBottom: 5, borderBottom: 1, borderColor: '#E0E0E0' },
  item: { flexGrow: 1 },
  price: { flexGrow: 1 },
  total: { textAlign: 'right', marginTop: 20, borderTop: 1, paddingTop: 10 },
});

// Datos de la factura (reemplaza esto con tus propios datos)
const logoUrl = '/assets/img/logo.png';
const items = [
  { description: 'Item #1', quantity: 1, unitPrice: '$10.00', total: '$10.00' },
  { description: 'Item #2', quantity: 2, unitPrice: '$10.00', total: '$20.00' },
];
const total = '$30.00';

// Crear documento
const Invoice = ({ id, nombre, total, pedido }) => (
   
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
      <Text style={styles.title}>Comprobante</Text>
    <Image style={styles.logo} src={logoUrl} />
        
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Ctd</Text>
        <Text style={styles.columnHeader}>Precio.U.</Text>
        <Text style={styles.columnHeader}>Detalle</Text>
       
      </View>
      {pedido.map((item) => (
        <View style={styles.lineItem} key={item.id}>
          <Text style={styles.item}>{item.cantidad}</Text>
          <Text style={styles.item}>{item.precio}</Text>
          <Text style={styles.item}>{item.producto.nombre.length > 25 ? item.producto.nombre.substring(0, 20) + '...' : item.producto.nombre}</Text>
    
        </View>
      ))}
      <Text style={styles.total}>Total: {total} </Text>
    </Page>
  </Document>
);

export default Invoice;
