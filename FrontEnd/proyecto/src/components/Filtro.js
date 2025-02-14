import { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Chip } from 'react-native-paper';
import { getData } from '../services/services';
import Context from '../context/Context';

const Filtro = () => {
  const [nombreAnimal, setNombreAnimal] = useState('');
  const [pesoMin, setPesoMin] = useState('');
  const [pesoMax, setPesoMax] = useState('');
  const [tamanyoMin, setTamanyoMin] = useState('');
  const [tamanyoMax, setTamanyoMax] = useState('');
  const [familia, setFamilia] = useState('');
  const [familias, setFamilias] = useState([]);
  const [localizacion, setLocalizacion] = useState('');
  const [localizaciones, setLocalizaciones] = useState([]);
  const [tipoAgua, setTipoAgua] = useState('');
  const { informacionUsuario, animales, setAnimales, setVisCarg, setInfCar, infCar, setAnimalesPost } = useContext(Context);

  useEffect(() => {
    if(!infCar){
      if(animales.length == 0){
        setVisCarg(true);
      }
    } else {
      setVisCarg(false);
    }
  }, [infCar]);

  useEffect(() => {
    obtenerDatosFamilias();
  }, []);

  useEffect(() => {
    obtenerDatosLocalizaciones();
  }, []);

  useEffect(() => {
    obtenerDatosPost();
  }, []);

  const obtenerDatos = async () => {
    setAnimales([]);
    setInfCar(false);
    const url = `http://54.237.169.52:8080/FishAPI/animalesMarinos?token=${informacionUsuario.token}&nombre=${nombreAnimal}&familia=${familia}&localizacion=${localizacion}&pesoMin=${pesoMin}&pesoMax=${pesoMax}&tamanyoMin=${tamanyoMin}&tamanyoMax=${tamanyoMax}&tipoAgua=${tipoAgua}`;
    const data = await getData(url);
    const newAnimales = data.results;
    setAnimales(newAnimales);
    setInfCar(true);
  };

  const obtenerDatosPost = async () => {
    const url = `http://54.237.169.52:8080/FishAPI/animalesMarinos?token=${informacionUsuario.token}`;
    const data = await getData(url);
    const newAnimales = data.results;
    setAnimalesPost(newAnimales);
    setInfCar(true);
  };

  const obtenerDatosFamilias = async () => {
    const url = `http://54.237.169.52:8080/FishAPI/getFamilias?token=${informacionUsuario.token}`;
    const data = await getData(url);

    const newFamilias = data.results;
    setFamilias(newFamilias);
  };

  const obtenerDatosLocalizaciones = async () => {
    const url = `http://54.237.169.52:8080/FishAPI/getLocalizaciones?token=${informacionUsuario.token}`;
    const data = await getData(url);

    const newLocalizaciones = data.results;
    setLocalizaciones(newLocalizaciones);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTextBusqueda}>
        <Text style={styles.textBusqueda}> ADVANCED SEARCH: </Text>
      </View>
      <View style={styles.containerBarraBusqueda}>
        <TextInput
          style={styles.searchBar}
          placeholder="Animal's name..."
          placeholderTextColor="white"
          onChangeText={setNombreAnimal}
          value={nombreAnimal}
        />
      </View>
      <View style={styles.globalPickers}>
        <View style={styles.containerTextPickers}>
          <Text style={styles.textPickers}> MARINE FAMILIES </Text>
          <Text style={styles.textPickers}> LOCATION </Text>
        </View>
        <View style={styles.containerPickers}>
          <View style={styles.pickers}>
            <Picker
              selectedValue={familia}
              onValueChange={setFamilia}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              <Picker.Item label="None selected" value={-1} />
              {familias.map((value, index) => (
                <Picker.Item
                  key={index.toString()}
                  label={value.nombre}
                  value={value.id_familia}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.pickers}>
            <Picker
              selectedValue={localizacion}
              onValueChange={setLocalizacion}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              <Picker.Item label="None selected" value={-1} />
              {localizaciones.map((value, index) => (
                <Picker.Item
                  key={index.toString()}
                  label={value.nombre}
                  value={value.id_localizacion}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.globalNumberInputs}>
        <View style={styles.containerTextNumber}>
          <Text style={styles.textNumber}> WEIGHT RANGE (Kg.) </Text>
          <Text style={styles.textNumber}> SIZE RANGE (m.) </Text>
        </View>
        <View style={styles.containerNumberInputs}>
          <View style={styles.numberInput}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pesoMin}
              onChangeText={setPesoMin}
              placeholder="Min"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pesoMax}
              onChangeText={setPesoMax}
              placeholder="Max"
            />
          </View>
          <View style={styles.numberInput}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={tamanyoMin}
              onChangeText={setTamanyoMin}
              placeholder="Min"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={tamanyoMax}
              onChangeText={setTamanyoMax}
              placeholder="Max"
            />
          </View>
        </View>
      </View>
      <View style={styles.globalAgua}>
        <View style={styles.containerTextAgua}>
          <Text style={styles.textAgua}> TYPE OF WATER </Text>
        </View>
        <View style={styles.containerAgua}>
          <View style={styles.chips}>
            <Chip
              style={[styles.chip, tipoAgua === 2 && styles.selectedChip]}
              icon="water"
              selectedColor="#00A5FE"
              onPress={() => {
                tipoAgua !== 2 ? setTipoAgua(2) : setTipoAgua(-1);
              }}>
              Salt
            </Chip>
            <Chip
              style={[styles.chip, tipoAgua === 1 && styles.selectedChip]}
              icon="water"
              selectedColor="#00A5FE"
              onPress={() => {
                tipoAgua !== 1 ? setTipoAgua(1) : setTipoAgua(-1);
              }}>
              Fresh
            </Chip>
            <Chip
              style={[styles.chip, tipoAgua === 3 && styles.selectedChip]}
              icon="water"
              selectedColor="#00A5FE"
              onPress={() => {
                tipoAgua !== 3 ? setTipoAgua(3) : setTipoAgua(-1);
              }}>
              Brackish
            </Chip>
          </View>
          <View style={styles.button}>
            <Pressable
              style={styles.realizarBusqueda}
              onPress={() => obtenerDatos()}>
              <Text style={styles.textRealizarBusqueda}>Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2A09D',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
    padding: 15,
    marginBottom: 20
  },
  containerTextBusqueda: {
    flex: 0.3,
  },
  textBusqueda: {
    color: 'white',
    fontSize: 17,
  },
  containerBarraBusqueda: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    borderRadius: 20,
    width: '90%',
    height: 50,
    flex: 1,
    fontSize: 16,
    backgroundColor: '#060055',
    color: 'white',
  },
  globalPickers: {
    flex: 1,
  },
  containerTextPickers: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPickers: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 2,
    marginRight: 25,
  },
  containerPickers: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickers: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chips: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    height: 50,
    borderRadius: 10,
  },
  globalNumberInputs: {
    flex: 1,
  },
  containerTextNumber: {
    flex: 0.45,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textNumber: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  containerNumberInputs: {
    flex: 2,
    flexDirection: 'row',
  },
  numberInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  input: {
    flex: 1,
    margin: 2,
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'black',
  },
  globalAgua: {
    flex: 1,
  },
  containerTextAgua: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textAgua: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 5,
  },
  containerAgua: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  realizarBusqueda: {
    width: 150,
    height: 45,
    backgroundColor: '#00A5FE',
    color: 'black',
    textAlign: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRealizarBusqueda: {
    color: 'white',
    textAlign: 'center',
  },
  chip: {
    width: 100,
    height: 45,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#060055',
  },
  button: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Filtro;
