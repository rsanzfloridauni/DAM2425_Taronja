import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { IconButton, TextInput, Checkbox } from 'react-native-paper';

const ScreenRegistro = (props) => {
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [contrasenya, setContrasenya] = useState(null);
  const [repetirContrasenya, setRepetirContrasenya] = useState(null);
  const [secureText, setSecureText] = useState(true);
  const [secureRepetir, setSecureRepetir] = useState(true);
  const [aceptarPolitica, setAceptarPolitica] = useState(false);

  const { width, height } = useWindowDimensions();

  const accesoPoliticaPrivacidad = () => {
    setAceptarPolitica((checked) => !checked);
  };

  const enviarDatos = async () => {
    if (aceptarPolitica === true) {
      if (
        nombreUsuario == null ||
        correo == null ||
        contrasenya == null ||
        repetirContrasenya == null
      ) {
        Alert.alert('Empty Fields', 'Fill the empty fields.');
        return;
      } else if (contrasenya !== repetirContrasenya) {
        Alert.alert('Error passwords', "Password doesn't match.");
        return;
      }

      const url = 'http://54.237.169.52:8080/FishAPI/register';
      const datos = {
        nombreUsuario: nombreUsuario,
        contrasenya: contrasenya,
        correoElectronico: correo,
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

        Alert.alert("Verification account", "Check your email.");
        props.navigation.navigate("Verificacion registro");
        console.log(resultado);
      } catch (error) {
        Alert.alert('Error to register an user', error);
        console.error('Error en la petición:', error);
      }
    } else {
      Alert.alert(
        'Privacy policy rejected',
        'Accept the privacy policy to register a user.'
      );
    }
  };

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <View style={[styles.seccion1, { width: width }]}>
        <View style={styles.icono}>
          <IconButton
            icon={require('../../imgs/left-arrow.png')}
            size={30}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.welcome}>
          <Image
            style={styles.img}
            source={require('../../imgs/welcome.png')}
          />
        </View>
      </View>
      <View style={[styles.seccion2, { width: width }]}>
        <View style={[styles.carta, { width: width * 0.75, height: 350 }]}>
          <View style={styles.containerTextInputs}>
            <View>
              <Text style={[styles.text, { marginTop: 5 }]}>Username</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNombreUsuario(text)}
                value={nombreUsuario}
                keyboardType="default"
                right={
                  <TextInput.Icon
                    style={styles.iconoTextInput}
                    icon="text-account"
                  />
                }
                underlineColor="transparent"
                outlineColor="blue"
              />
            </View>
          </View>
          <View style={styles.containerTextInputs}>
            <View>
              <Text style={styles.text}>E-mail</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setCorreo(text)}
                value={correo}
                keyboardType="default"
                right={
                  <TextInput.Icon style={styles.iconoTextInput} icon="email" />
                }
                underlineColor
                outlineColor
              />
            </View>
          </View>
          <View style={styles.containerTextInputs}>
            <View>
              <Text style={styles.text}>Password</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setContrasenya(text)}
                value={contrasenya}
                keyboardType="default"
                right={
                  <TextInput.Icon
                    style={styles.iconoTextInput}
                    icon={secureText ? 'eye' : 'eye-off'}
                    onPress={() => setSecureText(!secureText)}
                  />
                }
                underlineColor
                outlineColor
                secureTextEntry={secureText}
              />
            </View>
          </View>
          <View style={styles.containerTextInputs}>
            <View>
              <Text style={styles.text}>Repeat password</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setRepetirContrasenya(text)}
                value={repetirContrasenya}
                keyboardType="default"
                right={
                  <TextInput.Icon
                    style={styles.iconoTextInput}
                    icon={secureRepetir ? 'eye' : 'eye-off'}
                    onPress={() => setSecureRepetir(!secureRepetir)}
                  />
                }
                underlineColor="transparent"
                outlineColor="transparent"
                secureTextEntry={secureRepetir}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.seccion3}>
        <View style={styles.containerPrivacidad}>
          <Text
            style={[
              styles.privacyText,
              { marginLeft: 50, textDecorationLine: 'underline' },
            ]}
            onPress={() => props.navigation.navigate('Politica de privacidad')}>
            Read privacy policy
          </Text>
        </View>
        <View style={styles.containerPrivacidad}>
          <Checkbox
            status={aceptarPolitica ? 'checked' : 'unchecked'}
            onPress={accesoPoliticaPrivacidad}
          />
          <Text style={styles.privacyText}>I accept the privacy policy</Text>
        </View>
        <Pressable
          style={[styles.button, { width: width * 0.6 }]}
          onPress={() => enviarDatos()}>
          <Text style={styles.buttonText}>Register user</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  seccion1: {
    flex: 1.5,
  },
  seccion2: {
    flex: 2.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seccion3: {
    flex: 1.5,
  },
  img: {
    width: 300,
    height: 125,
  },
  icono: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  welcome: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carta: {
    borderWidth: 1,
    borderColor: '#A2A09D',
    borderRadius: 10,
  },
  containerTextInputs: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginLeft: 15,
  },
  privacyText: {
    fontSize: 14,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: '#FF6F00',
    backgroundColor: '#FFFFFF',
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#060055',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  iconoTextInput: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
  },
  containerPrivacidad: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ScreenRegistro;
