import React from 'react';
import { View, Button, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const OpenGoogleMaps = (props) => {
  const latitude = props.latitud;
  const longitude = props.longitud;

  const openGoogleMaps = () => {
    const url = Platform.select({
      ios: `maps://app?saddr=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`
    });
    Linking.openURL(url).catch(err => console.error('Error al abrir Google Maps', err));
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Ubicación" />
      </MapView>
      <Button title="Abrir en Google Maps" onPress={openGoogleMaps} />
    </View>
  );
};

export default OpenGoogleMaps;
