import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Perfil from './perfilScreens/perfil_stack';
import Social from './social';
import Subir from './uploadPostsScreens/screensUploads';
import Informacion from './informacion';

const Tab = createBottomTabNavigator();

const App = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#060055',
          borderTopWidth: 0,
          height: 60,
          justifyContent: 'center',
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textAlignVertical: 'center',
        },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Information':
              iconName = 'information-circle-outline';
              break;
            case 'Social':
              iconName = 'people-outline';
              break;
            case 'Upload':
              iconName = 'cloud-upload-outline';
              break;
            case 'Profile':
              iconName = 'person-circle-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Information" component={Informacion} />
      <Tab.Screen name="Social" component={Social} />
      <Tab.Screen name="Upload" component={Subir} />
      <Tab.Screen name="Profile" component={Perfil} />
    </Tab.Navigator>
);

export default App;
