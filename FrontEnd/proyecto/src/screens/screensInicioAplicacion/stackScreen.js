import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import inicioSesion from './screenInicioSesion';
import registro from './screenRegistro';
import politicaPrivacidad from './screenPoliticaPrivacidad';
import recuperarContrasenya from './screenRecuperarContrasenya';
import verificacionRegistro from './screenVerificacionRegistro';
import navegacionTab from '../mainScreens/tab_configurator';
import { Provider } from '../../context/Context';

const Stack = createStackNavigator();
const Screens = () => (
  <Provider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio de sesion" component={inicioSesion} />
        <Stack.Screen name="Registro de usuario" component={registro} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Politica de privacidad"
            component={politicaPrivacidad}
            options={{ headerShown: false }}
          />
        </Stack.Group>
         <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Recuperar Contrasenya"
            component={recuperarContrasenya}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Verificacion registro"
            component={verificacionRegistro}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Screen name="Navegacion tab" component={navegacionTab} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);
export default Screens;
