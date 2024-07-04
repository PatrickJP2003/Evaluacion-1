import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, get, set, remove } from 'firebase/database';

const EditarEliminar = ({ route, navigation }: any) => {
  const { recordatorioId } = route.params;
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    fetchRecordatorio();
  }, []);

  const fetchRecordatorio = async () => {
    try {
      const db = getDatabase();
      const snapshot = await get(ref(db, `recordatorios/${recordatorioId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setNombre(data.nombre);
        setFecha(data.fecha);
        setHora(data.hora);
        setDescripcion(data.descripcion);
      } else {
        console.error('Registro no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener el registro:', error);
    }
  };

  const actualizarRecordatorio = async () => {
    try {
      const db = getDatabase();
      await set(ref(db, `recordatorios/${recordatorioId}`), {
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        descripcion: descripcion,
      });
      Alert.alert('Registro Actualizado', 'El registro se ha actualizado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar el registro. Por favor, intenta nuevamente.');
    }
  };

  const confirmarEliminar = () => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: eliminarRecordatorio,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const eliminarRecordatorio = async () => {
    try {
      const db = getDatabase();
      await remove(ref(db, `recordatorios/${recordatorioId}`));
      Alert.alert('Registro Eliminado', 'El registro se ha eliminado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el registro. Por favor, intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Registro</Text>
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
      <Button title="Actualizar Registro" onPress={actualizarRecordatorio} />
      <Button title="Eliminar Registro" onPress={confirmarEliminar} />
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

export default EditarEliminar;
