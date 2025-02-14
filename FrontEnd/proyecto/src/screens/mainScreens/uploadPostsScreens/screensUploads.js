import { createStackNavigator } from '@react-navigation/stack';

import SubirCaptura from './subirCaptura';
import UploadPicture from './uploadPicture';

const Stack = createStackNavigator();

const ScreensUploads = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SubirPublicaciones" component={SubirCaptura} />
      <Stack.Screen name="TomarFoto" component={UploadPicture} />
    </Stack.Navigator>
);

export default ScreensUploads;