import { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Context from '../../../context/Context';
import Post from '../../../components/Post';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimalPost from '../AnimalPost';
import MostrarMapa from '../MostrarMapa';
import PantallaCarga from '../PantallaCarga';
import { getData } from '../../../services/services';

const Perfil = (props) => {
  const { currentPhoto, setCurrentPhoto, informacionUsuario } = useContext(Context);
  const [publicaciones, setPublicaciones] = useState([]);
  const [vis, setVis] = useState(false);
  const [visMapa, setVisMapa] = useState(false);
  const [selPez, setSelPez] = useState({});
  const { selectedPhoto, setSelectedPhoto } = useContext(Context);
  const { nombreUsuario, setNombreUsuario } = useContext(Context);
  const [visCarg, setVisCarg] = useState(false);
  const [infCar, setInfCar] = useState(false);
  const [selUbicacion, setSelUbicacion] = useState();


  useEffect(() => {
    setPublicaciones([]);
    setInfCar(false);
    obtenerDatosPublicaciones();
  }, []);

  useEffect(() => {
    if (!infCar) {
      if (publicaciones.length == 0) {
        setVisCarg(true);
      }
    } else {
      setVisCarg(false);
    }
  }, [infCar]);

  const obtenerDatosPublicaciones = async () => {
    const url = `http://54.237.169.52:8080/FishAPI/PostsPerfil?token=${informacionUsuario.token}&id=${informacionUsuario.id_usuario}`;
    const data = await getData(url);
    console.log(data.results);
    const newPublicaciones = data.results;
    setPublicaciones(newPublicaciones);
    setInfCar(true);
    console.log(infCar);
  };

  const infoPez = (pez) => {
    setSelPez(pez);
    setVis(true);
  };

  const infoMapa = (ubicacion) => {
    setSelUbicacion(ubicacion);
    console.log('=> ' + ubicacion);
    setVisMapa(true);
  };

  const resetInfo = () => {
    setCurrentPhoto(null);
    setPublicaciones([]);
    setSelPez(null);
    setSelectedPhoto(null);
    setNombreUsuario(null);
    setSelUbicacion(null);
    props.navigation.navigate('Inicio de sesion')
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerPerfil}>
          <View style={styles.containerIcon}>
            <Icon1
              name="settings-outline"
              size={40}
              onPress={() => props.navigation.navigate('ModificarPerfil')}
            />
          </View>
          <View style={styles.containerUserInfo}>
            <View style={styles.containerPhoto}>
              <Image
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 200,
                  borderWidth: 2,
                  backgroundColor: '#00A5FE',
                }}
                source={
                  selectedPhoto == null
                    ? { uri: informacionUsuario.foto }
                    : { uri: selectedPhoto }
                }
              />
            </View>
            <View style={styles.containerName}>
              {nombreUsuario == null ? (
                <Text style={styles.name}>
                  {informacionUsuario.nombreUsuario}
                </Text>
              ) : (
                <Text style={styles.name}>{nombreUsuario}</Text>
              )}
            </View>
          </View>
          <View style={styles.containerIcon}>
            <Icon2
              name="logout"
              size={40}
              onPress={() => resetInfo()}
            />
          </View>
        </View>
        <View style={styles.containerPublicacions}>
          {publicaciones.map((value, index) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              key={index.toString()}>
              <Post
                info={value}
                verPez={() => infoPez(value.animal)}
                verMapa={() => infoMapa(value.ubicacion)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <AnimalPost visible={vis} onClose={() => setVis(false)} info={selPez} />
      <MostrarMapa visible={visMapa} onClose={() => setVisMapa(false)} ubic={selUbicacion}/>
      <PantallaCarga
        visible={visCarg}
        onClose={() => setVisCarg(false)}
        info={publicaciones}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F7F7F7',
    paddingTop: 10,
  },
  containerPerfil: {
    flex: 4,
    flexDirection: 'row',
  },
  containerIcon: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  containerUserInfo: {
    flex: 3,
  },
  containerPhoto: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerName: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#91a7f6',
    marginTop: 10,
  },
  containerPublicacions: {
    flex: 5,
  },
  name: {
    fontSize: 30,
  },
});
export default Perfil;
