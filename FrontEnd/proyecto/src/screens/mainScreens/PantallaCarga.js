import { View, StyleSheet, Modal, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useState, useEffect, useContext } from 'react';
import Context from '../../context/Context';

export default function PantallaCarga( {visible, onClose, info} ) {

  useEffect(() => {
    if(info.length > 0){
      onClose();
    }
  }, [info, visible]);

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.container}>
        <Text style={styles.load}>LOADING...</Text>
        <ActivityIndicator animating={true} color="#00A5FE" size={100} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  load: {
    fontSize: 30,
    marginBottom: 15
  },
});
