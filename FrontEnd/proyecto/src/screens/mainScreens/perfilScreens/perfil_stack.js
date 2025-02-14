import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Perfil from './perfil';
import ModificarPerfil from './modificar_perfil';
import TakePicture from './takePicture';

const Stack = createStackNavigator();

const App = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="ModificarPerfil" component={ModificarPerfil} />
      <Stack.Screen name="TakePicture" component={TakePicture} />
    </Stack.Navigator>
);

export default App;
