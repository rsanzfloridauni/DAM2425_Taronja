import { useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import Context from '../../../context/Context';

const UploadPicture = (props) => {
  const [permission, setPermission] = useCameraPermissions();
  const [type, setType] = useState('back');
  const { setUploadPicture } = useContext(Context);

  const camera = useRef(null);
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Pressable onPress={setPermission} style={styles.buttonText}>
          <Text style={{ fontSize: 25, color: 'white' }}>grant permission</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    if (!camera.current) {
      console.error('Cámara no está disponible');
      return;
    }

    const options = { quality: 0.5, base64: true };
    const img = await camera.current.takePictureAsync(options);
    console.log('Imagen guardada en:', img.uri);

    try {
      const base64Image = await FileSystem.readAsStringAsync(img.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log('Imagen en Base64:', base64Image);
      setUploadPicture(`data:image/jpg;base64,${base64Image}`);
    } catch (error) {
      console.error('Error al convertir imagen a Base64:', error);
    }

    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={camera} facing={type}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={takePicture}>
            <MaterialIcons name="camera" size={50} color="white" />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => setType(type === 'back' ? 'front' : 'back')}>
            <MaterialIcons name="flip-camera-ios" size={50} color="white" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  buttonText: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'blue',
  },
});
export default UploadPicture;
