import { View, Text, StyleSheet, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Chip } from 'react-native-paper';
import Animal from '../../components/Animal';

const AnimalPost = ({ info, visible, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.cont}>
        <Animal info={info}/>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles= StyleSheet.create ({
  cont: {
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 35
  }
})

export default AnimalPost;
