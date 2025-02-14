import { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  Pressable,
  TextInput,
  Text,
} from 'react-native';
import { Chip, Button } from 'react-native-paper';
import Post from '../../components/Post';
import AnimalPost from './AnimalPost';
import Context from '../../context/Context';
import { getData } from '../../services/services';
import MostrarMapa from './MostrarMapa';
import PantallaCarga from './PantallaCarga';

const Social = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [dias, setDias] = useState('Todos');
  const { informacionUsuario, posts, setPosts } = useContext(Context);
  const [vis, setVis] = useState(false);
  const [selPez, setSelPez] = useState({});
  const [selUbicacion, setSelUbicacion] = useState();
  const [visMapa, setVisMapa] = useState(false);
  const [visCarg, setVisCarg] = useState(false);
  const [infCar, setInfCar] = useState(false);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    obtenerDatos();
  }, [dias]);

  useEffect(() => {
    console.log('POSTS PANTALLA SOCIAL:..........................');
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    if (!infCar) {
      if (posts.length === 0) {
        setVisCarg(true);
      }
    } else {
      setVisCarg(false);
    }
  }, [infCar]);

  const obtenerDatos = async () => {
    setPosts([]);
    setInfCar(false);
    const url = `http://54.237.169.52:8080/FishAPI/Posts?token=${informacionUsuario.token}&fecha=${dias}&nombreUsuario=${nombreUsuario}`;
    const data = await getData(url);
    const newPosts = data.results;
    setPosts(newPosts);
    setInfCar(true);
  };

  const buscarUser = async (username) => {
    setPosts([]);
    setInfCar(false);
    const url = `http://54.237.169.52:8080/FishAPI/Posts?token=${informacionUsuario.token}&fecha=${dias}&nombreUsuario=${username}`;
    const data = await getData(url);
    const newPosts = data.results;
    setPosts(newPosts);
    setInfCar(true);
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

  return (
    <View style={[styles.container, { width: width }]}>
      <ScrollView>
        <View style={[styles.seccion1, { width: width }]}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="white"
              onChangeText={setNombreUsuario}
              value={nombreUsuario}
              textColor="white"
              style={styles.searchBar}
            />
            <Button
              icon="magnify"
              onPress={() => obtenerDatos()}
              color="white"
            />
          </View>
          <View style={styles.chips1}>
            <Chip
              style={[styles.chip, dias === 'Hoy' && styles.selectedChip]}
              icon="calendar-today"
              selectedColor="#00A5FE"
              onPress={() => setDias('Hoy')}>
              Today
            </Chip>
            <Chip
              style={[styles.chip, dias === 'Semanal' && styles.selectedChip]}
              icon="calendar-week-begin"
              selectedColor="#00A5FE"
              onPress={() => setDias('Semanal')}>
              Weekly
            </Chip>
            <Chip
              style={[styles.chip, dias === 'Mensual' && styles.selectedChip]}
              icon="calendar-month"
              selectedColor="#00A5FE"
              onPress={() => setDias('Mensual')}>
              Monthly
            </Chip>
          </View>
          <View style={styles.chips2}>
            <Chip
              style={[styles.chip, dias === 'Anual' && styles.selectedChip]}
              icon="calendar-weekend"
              selectedColor="#00A5FE"
              onPress={() => setDias('Anual')}>
              Annual
            </Chip>
            <Chip
              style={[styles.chip, dias === 'Todos' && styles.selectedChip]}
              icon="calendar-minus"
              selectedColor="#00A5FE"
              onPress={() => setDias('Todos')}>
              All posts
            </Chip>
          </View>
        </View>
        <View style={[styles.seccion2, { width: width }]}>
          <View style={{ flex: 1 }}>
            {posts.length > 0 ? (
              posts.map((value, index) => (
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
                    verUs={() => buscarUser(value.nombreUsuario)}
                  />
                </View>
              ))
            ) : (
              <View style={styles.errCont}>
                <Text>
                  There is no posts, you can be the first to upload one!
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <AnimalPost visible={vis} onClose={() => setVis(false)} info={selPez} />
      <MostrarMapa
        visible={visMapa}
        onClose={() => setVisMapa(false)}
        ubic={selUbicacion}
      />
      <PantallaCarga
        visible={visCarg}
        onClose={() => setVisCarg(false)}
        info={posts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F7F7F7',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seccion1: {
    flex: 3,
  },
  seccion2: {
    flex: 8,
  },
  searchBar: {
    width: '75%',
    color: 'white',
    marginBottom: 7,
  },
  textInput: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#060055',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    width: '90%',
    height: 45,
    alignSelf: 'center',
  },
  chips1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  chips2: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  chip: {
    width: 125,
    height: 45,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#060055',
  },
  errCont: {
    marginTop: 20,
    height: 70,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Social;
