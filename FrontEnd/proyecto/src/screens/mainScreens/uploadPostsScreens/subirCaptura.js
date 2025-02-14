import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import * as Location from 'expo-location';
import Autocomplete from 'react-native-autocomplete-input';
import Context from '../../../context/Context';

const SubirCaptura = (props) => {
  const [titulo, setTitulo] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [animal, setAnimal] = useState(1);
  const [query, setQuery] = useState('');
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const {
    uploadPicture,
    informacionUsuario,
    ubicacion,
    setUbicacion,
    animalesPost,
  } = useContext(Context);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (query === '') {
      setFilteredAnimals([]);
    } else {
      const filtered = animalesPost.filter((animal) =>
        animal.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAnimals(filtered);
    }
  }, [query]);

  const obtenerUbicacion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Permiso de ubicación denegado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUbicacion(latitude + ',' + longitude);
    props.navigation.navigate('TomarFoto');
  };

  const enviarDatos = async () => {
    const url = 'http://54.237.169.52:8080/FishAPI/subirPost';
    if (titulo == null || descripcion == null) {
      Alert.alert('Empty Fields', 'Fill the empty fields.');
      return;
    } else if (uploadPicture == null) {
      Alert.alert('Error image', 'Take a photo to upload a post.');
      return;
    }

    const datos = {
      token: informacionUsuario?.token || '',
      id_usuario: informacionUsuario?.id_usuario || '',
      titulo: titulo,
      descripcion: descripcion,
      ubicacion: ubicacion,
      id_animalMarino: animal,
      foto: uploadPicture,
    };

    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(
          errorData.message || 'Error en la respuesta del servidor'
        );
      }

      Alert.alert('Éxito', 'Post subido correctamente');
    } catch (error) {
      Alert.alert('Error al subir el post', error.message);
      console.error('Error en la petición:', error);
    }
  };

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <View style={[styles.seccion1, { width: width }]}>
        <View style={[styles.containerText, { width: width }]}>
          <IconButton color="#060055" icon="format-title" size={25} />
          <Text style={styles.text}>Title</Text>
        </View>
        <View style={[styles.textInput, { width: width }]}>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />
        </View>
        <View style={[styles.containerText, { width: width }]}>
          <IconButton color="#060055" icon="text-box-outline" size={25} />
          <Text style={styles.text}>Description: </Text>
        </View>
        <View style={[styles.textInput, { width: width }]}>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>
        <View style={[styles.containerText, { width: width }]}>
          <IconButton color="#060055" icon="fish" size={25} />
          <Text style={styles.text}>Marine animal:</Text>
        </View>
        <View style={[styles.containerPicker, { width: width }]}>
          <Autocomplete
            data={filteredAnimals}
            value={query}
            onChangeText={setQuery}
            flatListProps={{
              keyExtractor: (item) => item.id_animal.toString(),
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setQuery(item.nombre);
                    setAnimal(item.id_animal);
                    setFilteredAnimals([]);
                  }}>
                  <Text style={styles.itemText}>{item.nombre}</Text>
                </TouchableOpacity>
              ),
            }}
            style={styles.picker}
            inputContainerStyle={styles.inputContainer} // Estilo para eliminar la línea negra
            listContainerStyle={styles.listContainer} // Estilo para la lista de sugerencias
          />
        </View>
      </View>

      <View style={[styles.seccion2, { width: width }]}>
        <Pressable
          style={[styles.button, { width: width * 0.7 }]}
          onPress={() => obtenerUbicacion()}>
          <Text style={styles.buttonText}>Take a photo</Text>
        </Pressable>
        <View style={styles.fotografia}>
          <Image
            style={{ width: 250, height: 250 }}
            source={{ uri: uploadPicture }}
          />
        </View>
      </View>
      <View style={[styles.seccion3, { width: width }]}>
        <Pressable
          style={[styles.button, { width: width * 0.7 }]}
          onPress={() => enviarDatos()}>
          <Text style={styles.buttonText}>Upload post</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  seccion1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seccion2: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seccion3: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF6F00',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
    width: '80%',
  },
  text: {
    textAlign: 'left',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'row',
    marginLeft: 45,
    alignItems: 'center',
  },
  containerPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  picker: {
    width: '80%',
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
  },
  inputContainer: {
    borderWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    padding: 10,
    fontSize: 16,
    color: 'black',
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#060055',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  fotografia: {
    margin: 'auto',
    width: 250,
    height: 250,
    backgroundColor: '#A2A09D',
  },
});

export default SubirCaptura;