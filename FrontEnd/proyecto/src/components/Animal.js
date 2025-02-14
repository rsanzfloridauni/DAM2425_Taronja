import { View, Text, StyleSheet, Image } from 'react-native';
import { Chip } from 'react-native-paper';

const Animal = ({ info }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerNombre}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{info.nombre}</Text>
      </View>
      <View style={styles.containerPhoto}>
        <Image
          resizeMode="stretch"
          style={styles.img}
          source={{ uri: info.foto }}
        />
      </View>
      <View style={styles.containerInfo}>
        <View style={styles.item}>
          <Text style={styles.title}>Family:</Text>
          <Chip style={styles.chipFamilia}>{info.familia}</Chip>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Location:</Text>
          <Chip style={styles.chip}>{info.localizacion}</Chip>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Weight:</Text>
          <Chip style={styles.chip}>{info.pesoPromedio} kg.</Chip>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Size:</Text>
          <Chip style={styles.chip}>{info.tamanyoPromedio} m.</Chip>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Tpe of water:</Text>
          <Chip style={styles.chip}>{info.tipoAgua}</Chip>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Depth:</Text>
          <Chip style={styles.chip}>{info.profundidad} m.</Chip>
        </View>
      </View>
      <View style={styles.containerDescripcion}>
        <Text style={{ fontSize: 22 }}>{info.descripcion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
    width: '100%',
    margin: 'auto',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#060055',
    justifyContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerNombre: {
    backgroundColor: '#FFFFFF',
    height: '8%',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPhoto: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: '35%',
    borderRadius: 5,
  },
  containerInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    height: '32%',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  containerDescripcion: {
    backgroundColor: '#FFFFFF',
    height: '18%',
    width: '100%',
    borderRadius: 5,
    padding: 10,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 12,
  },
  chip: {
    backgroundColor: '#e0e0e0',
  },
  chipFamilia: {
    backgroundColor: '#e0e0e0',
    width: '85%',
  },
});

export default Animal;
