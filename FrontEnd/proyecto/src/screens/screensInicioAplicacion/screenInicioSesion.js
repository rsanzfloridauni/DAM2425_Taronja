import { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Context from '../../context/Context';
import { getData } from '../../services/services';

const App = (props) => {
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [contrasenya, setContrasenya] = useState(null);
  const { setInformacionUsuario, setAnimales } = useContext(Context);

  const enviarDatos = async () => {
    const url = 'http://54.237.169.52:8080/FishAPI/login';

    if (nombreUsuario == null || contrasenya == null) {
      Alert.alert('Empty Fields', 'Fill the empty fields.');
      return;
    }

    const datos = {
      nombreUsuario: nombreUsuario,
      contrasenya: contrasenya,
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
        Alert.alert('Error', resultado.message || 'Error Unknown.');
        return;
      }

      console.log(resultado);
      obtenerDatos(resultado.token);
      setInformacionUsuario(resultado);
      props.navigation.navigate('Navegacion tab');
    } catch (error) {
      Alert.alert('Error al iniciar sesión', error);
      console.error('Error en la petición:', error);
    }
  };

  const obtenerDatos = async (token) => {
    const url = `http://54.237.169.52:8080/FishAPI/animalesMarinos?token=${token}`;
    const data = await getData(url);

    const newAnimales = data.results;
    setAnimales(newAnimales);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled">
      <View style={styles.imageContainer}>
        <Image
          style={{ height: 275, width: 275, borderRadius: 20 }}
          source={require('../../imgs/fishHubLogo.jpg')}
        />
      </View>
      <View style={styles.inputsContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
          <View style={styles.inputWrapper}>
            <Text>Username</Text>
            <TextInput
              style={styles.input}
              value={nombreUsuario}
              onChangeText={setNombreUsuario}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={contrasenya}
              onChangeText={setContrasenya}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.linkText} onPress={() => props.navigation.navigate("Recuperar Contrasenya")}>Forgot your password?</Text>
          <Text
            style={styles.linkText}
            onPress={() => props.navigation.navigate('Registro de usuario')}>
            Don t have an account? Sign up!
          </Text>
        </View>
        <Pressable style={styles.button} onPress={() => enviarDatos()}>
          <Text style={{ color: 'white' }}>Log in</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputsContainer: {
    width: '75%',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '75%',
    alignItems: 'center',
    marginTop: 20,
  },
  textWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF6F00',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
    width: '100%',
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#060055',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
export default App;
