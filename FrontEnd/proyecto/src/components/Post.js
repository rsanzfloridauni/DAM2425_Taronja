import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { Chip } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Post = ({ info, verPez, verMapa, verUs}) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: width * 0.96, height: 400 }]}>
      <View style={styles.seccion1}>
        <Image style={styles.img} source={{ uri: info.foto }} />
      </View>
      <View style={styles.seccion2}>
        <View style={[styles.containerInfo, { width: width * 0.94 }]}>
          <View style={styles.containerTitulo}>
            <View style={styles.titulo1}>
              <Chip style={styles.chips}>{info.titulo}</Chip>
            </View>
            <View style={styles.titulo2}>
            <Pressable onPress={() => verUs()}>
              <Chip style={styles.chips}>{info.nombreUsuario}</Chip>
            </Pressable>
            </View>
          </View>
          <View style={styles.containerIconos}>
            <View style={styles.icono1}>
              <Pressable onPress={() => verMapa()}>
                <Icon name={'map-outline'} size={55} color="#FF6F00" />
              </Pressable>
            </View>
            <View style={styles.icono2}>
              <Pressable onPress={() => verPez()}>
                <Icon name={'information-outline'} size={55} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.containerDescripcion, { width: width * 0.94 }]}>
          <View style={[styles.chipDescripcion, { width: width * 0.94 }]}>
            <Text style={styles.text}>{info.descripcion}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#00A5FE',
  },
  seccion1: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  seccion2: {
    flex: 1.75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  containerDescripcion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitulo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo1: {
    flex: 1,
  },
  titulo2: {
    flex: 1,
  },
  chips: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
  },
  chipDescripcion: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10
  },
  containerIconos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icono1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icono2: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

export default Post;