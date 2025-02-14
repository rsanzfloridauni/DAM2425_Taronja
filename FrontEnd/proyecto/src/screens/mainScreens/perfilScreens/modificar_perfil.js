import { useState, useContext, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import Context from '../../../context/Context';
import { getData } from '../../../services/services';

const ModificarPerfil = (props) => {
  const { informacionUsuario } = useContext(Context);
  const [defaultImages, setDefaultImages] = useState([]);
  const { currentPhoto, setCurrentPhoto } = useContext(Context);
  const { currentPhotoId, setCurrentPhotoId } = useContext(Context);
  const {selectedPhoto, setSelectedPhoto } = useContext(Context);
  const {nombreUsuario, setNombreUsuario} = useContext(Context);
  
  useEffect(() => {
    getDefaultIcons();
  }, []);

  useEffect(() => {    
    nombreUsuario == null ? 
    setNombreUsuario(informacionUsuario.nombreUsuario) : setNombreUsuario(nombreUsuario);
  }, []);


  useEffect(() => {
    console.log('Updated defaultImages: ', defaultImages);
  }, [defaultImages]);

  const discardChanges = () => {
    props.navigation.goBack();
  };

  const saveChanges = () => {
    enviarDatos();
  };

  const changePFP = (pickedPhoto_link, pickedPhoto_id) => {
    setCurrentPhotoId(pickedPhoto_id);
    setCurrentPhoto(pickedPhoto_link);
  };

  const getDefaultIcons = async () => {
    try {
      const imagen = await getData(
        'http://54.237.169.52:8080/FishAPI/getAvatares?token=' +
          informacionUsuario.token
      );

      setDefaultImages(imagen.results);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const enviarDatos = async () => {
    const url = 'http://54.237.169.52:8080/FishAPI/actualizarPerfil';
    
    if (nombreUsuario == '') {
        Alert.alert('Empty Fields', 'Fill the empty fields.');
        return;
    }

    const datos = {
      token: informacionUsuario.token,
      id_usuario: informacionUsuario.id_usuario,
      nombreUsuario: nombreUsuario,
      id_avatar: currentPhotoId,
      foto: currentPhoto,
    };

    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();
      if (!respuesta.ok) {
        Alert.alert('Error username', resultado.message || 'That username is used by other user.');
        setNombreUsuario(informacionUsuario.nombreUsuario);
        setSelectedPhoto(informacionUsuario.foto);
        return;
      } else {
        setSelectedPhoto(currentPhoto);
        setNombreUsuario(nombreUsuario);
      }

      props.navigation.goBack();
      console.log(resultado);
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerButtons}>
        <Text style={{ fontSize: 20 }} onPress={() => saveChanges()}>
          Confirm
        </Text>
        <Text style={{ fontSize: 20 }} onPress={() => discardChanges()}>
          Cancel
        </Text>
      </View>

      <View style={styles.containerName}>
        <Text style={{ fontSize: 20 }}>Change username</Text>
        <TextInput
          style={styles.input}
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
        />
      </View>

      <View style={styles.containerAvatar}>
        <View style={styles.containerTXTAvatar}>
          <Text style={{ fontSize: 20 }}>Change avatar</Text>
        </View>
        <View style={styles.containerIMGAvatar}>
          <Text>Current avatar: </Text>

          <Image
            style={styles.avatarImage}
            source={
              currentPhoto == null
                ? { uri: informacionUsuario.foto }
                : { uri: currentPhoto }
            }
          />
        </View>
        <View style={styles.containerBTNAvatar}>
          <View style={styles.button}>
            <Text
              style={{ fontSize: 20, color: 'white' }}
              onPress={() => props.navigation.navigate('TakePicture')}>
              Take a photo
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerDefaultAvatars}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {defaultImages.map((img, index) => (
            <View key={index.toString()}>
              <Pressable onPress={() => changePFP(img.foto, img.id_avatar)}>
                <Image style={styles.defaultImg} source={{ uri: img.foto }} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerName: {
    flex: 1,
    width: '80%',
  },
  containerAvatar: {
    flex: 3,
    width: '100%',
  },
  containerTXTAvatar: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  containerIMGAvatar: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '15%',
    width: '100%',
  },
  containerBTNAvatar: {
    flex: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDefaultAvatars: {
    flex: 4,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
    width: '100%',
  },
  button: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#060055',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    height: 95,
    width: 95,
    borderRadius: 200,
    borderWidth: 2,
    backgroundColor: '#00A5FE',
  },
  defaultImg: {
    height: 80,
    width: 80,
    borderWidth: 2,
    margin: 10,
    backgroundColor: '#A2A09D',
  },
});
export default ModificarPerfil;
