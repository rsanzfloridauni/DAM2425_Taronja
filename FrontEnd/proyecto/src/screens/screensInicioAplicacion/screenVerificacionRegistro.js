import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useState } from 'react';

const ScreenVerificacionRegistro = (props) => {
  const [codigoVerificacion, setCodigoVerificacion] = useState(null);

  const enviarDatos = async () => {
    const url = 'http://54.237.169.52:8080/FishAPI/confirmRegister';

    if (codigoVerificacion == null || codigoVerificacion == '') {
      Alert.alert('Empty Field', 'Fill the empty field.');
      return;
    }

    const datos = {
      numeroConfirmacion: codigoVerificacion,
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
        Alert.alert('Error verification code', 'Number incorrect');
        return;
      }

      Alert.alert('Message information', resultado.message);
      console.log(resultado);
      props.navigation.navigate('Inicio de sesion');
    } catch (error) {
      Alert.alert('Error al iniciar sesión', error);
      console.error('Error en la petición:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: 15,
            }}>
            <Text style={styles.paragraph}>Verification code (Account)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCodigoVerificacion}
              value={codigoVerificacion}
              placeholder="Introduce your verfication code"
              keyboardType="numeric"
              autoCapitalize="none"
            />
            <Pressable style={styles.button} onPress={() => enviarDatos()}>
              <Text style={{ color: 'white' }}>Send verification code</Text>
            </Pressable>
          </View>

          <View style={{ flex: 6, alignItems: 'center' }}>
            <Image
              style={{ height: 420, width: 320 }}
              source={require('../../imgs/pez_v2.jpeg')}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 8,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF6F00',
    padding: 10,
  },
  button: {
    height: 45,
    width: '60%',
    borderRadius: 10,
    backgroundColor: '#060055',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
});
export default ScreenVerificacionRegistro;
