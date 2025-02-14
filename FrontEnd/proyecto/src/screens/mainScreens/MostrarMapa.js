import React, { useState, useEffect } from 'react';
import { View, Modal, Button, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MostrarMapa = ({ ubic, visible, onClose }) => {
  const [showMap, setShowMap] = useState(false);



  useEffect(() => {
    if (visible) {
      setTimeout(() => setShowMap(true), 100);
    } else {
      setShowMap(false);
    }
  }, [visible]);

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.container}>
        {showMap && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: ubic.split(',').map(parseFloat)[0],
              longitude: ubic.split(',').map(parseFloat)[1],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: ubic.split(',').map(parseFloat)[0], longitude: ubic.split(',').map(parseFloat)[1] }} title="Ubicación" />
          </MapView>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Cerrar Mapa" onPress={onClose} color='null' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#060055',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
});

export default MostrarMapa;
