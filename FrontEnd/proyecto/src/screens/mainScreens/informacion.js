import { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Filtro from '../../components/Filtro';
import Animal from '../../components/Animal';
import Context from '../../context/Context';
import PantallaCarga from './PantallaCarga';

const Informacion = () => {
  const { animales,  visCarg, setVisCarg } = useContext(Context);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 2 }}>
          <Filtro />
        </View>
        <View style={{ flex: 1 }}>
          {animales.length > 0 ? (
            <View>
              {animales.map((value, index) => (
                <View key={index.toString()}>
                  <Animal info={value} />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.errCont}>
              <Text>There was no result!!</Text>
            </View>
          )}
        </View>
            <PantallaCarga visible={visCarg} onClose={() => setVisCarg(false)} info={animales}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F7F7F7',
    padding: 10,
  },
  errCont: {
    height: 70,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Informacion;
