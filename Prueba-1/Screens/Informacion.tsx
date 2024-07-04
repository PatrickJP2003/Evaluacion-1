import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, child, get } from "firebase/database";

// Definimos el tipo para los datos de cada recordatorio
type Recordatorio = {
  nombre: string;
  fecha: string;
  hora: string;
  descripcion: string;
  // Añadir más campos si es necesario según la estructura real en Firebase
};

const Informacion = () => {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]); // Usamos el tipo Recordatorio[]
  const [selectedRecordatorio, setSelectedRecordatorio] = useState<Recordatorio | null>(null); // También para selectedRecordatorio

  useEffect(() => {
    fetchRecordatorios();
  }, []);

  const fetchRecordatorios = async () => {
    try {
      const db = getDatabase();
      const snapshot = await get(child(ref(db), 'recordatorios'));
      if (snapshot.exists()) {
        const data: Recordatorio[] = Object.values(snapshot.val()); // Cast a Recordatorio[]
        setRecordatorios(data);
      } else {
        setRecordatorios([]);
      }
    } catch (error) {
      console.error('Error al obtener los recordatorios:', error);
    }
  };

  const handleRecordatorioPress = (recordatorio: Recordatorio) => {
    setSelectedRecordatorio(recordatorio);
    Alert.alert('Más información', `Seleccionaste: ${recordatorio.nombre}`);
  };

  const renderItem = ({ item }: { item: Recordatorio }) => ( // Aseguramos que item sea de tipo Recordatorio
    <TouchableOpacity onPress={() => handleRecordatorioPress(item)}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.nombre}</Text>
        <Text>{item.fecha}</Text>
        <Text>{item.hora}</Text>
        <Text>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Lista de Recordatorios</Text>
      <FlatList
        data={recordatorios}
        renderItem={renderItem}
        keyExtractor={(item) => item.nombre} // Asumiendo que nombre es único y puede usarse como key
        style={{ flex: 1 }}
      />
      {selectedRecordatorio && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Detalles del Recordatorio</Text>
          <Text>Nombre: {selectedRecordatorio.nombre}</Text>
          <Text>Fecha: {selectedRecordatorio.fecha}</Text>
          <Text>Hora: {selectedRecordatorio.hora}</Text>
          <Text>Descripción: {selectedRecordatorio.descripcion}</Text>
        </View>
      )}
    </View>
  );
};

export default Informacion;
