import React, { FC } from 'react';
import {Dimensions, Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const height = Dimensions.get('window').height;

const ModalDetail: FC<any> = ({ showDetailModal , closeDetailModal }) => {
  return (
      <Modal
          visible={showDetailModal}
          transparent={true}
          animationType="fade"
          onRequestClose={closeDetailModal}
      >
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text>Aquí van los detalles...</Text>
                  <TouchableOpacity
                      style={styles.closeButton}
                      onPress={closeDetailModal}
                  >
                      <Text>Cerrar</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: height / 1.4,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#F2C94C',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
});

export default ModalDetail;
