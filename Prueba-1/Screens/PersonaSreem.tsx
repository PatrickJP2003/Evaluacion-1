// PersonaScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";
import { app } from '../Config/Config'; // Importa la instancia de Firebase adecuadamente

const PersonaScreen = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const agregarRecordatorio = async () => {
    try {
      const db = getDatabase(app); // Utiliza la instancia de Firebase importada
      const userId = nombre.toLowerCase(); // Usamos el nombre como ID, convirtiéndolo a minúsculas
      await set(ref(db, 'recordatorios/' + userId), {
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        descripcion: descripcion,
      });
      Alert.alert('Recordatorio agregado', 'El recordatorio se ha agregado exitosamente.');
      limpiarCampos();
    } catch (error) {
      console.error('Error al agregar el recordatorio:', error);
      Alert.alert('Error', 'Hubo un problema al agregar el recordatorio. Por favor, intenta nuevamente.');
    }
  };

  const limpiarCampos = () => {
    setNombre('');
    setFecha('');
    setHora('');
    setDescripcion('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Recordatorio</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Agregar Recordatorio" onPress={agregarRecordatorio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default PersonaScreen;
