import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const SubHeader = ({ title, titleNav, handleNav } : any) => {
  return (
    <View style={styles.subHeaderContainer}>
        <View style={styles.subHeaderTitleContainer}>
            <View>
                <Text style={styles.titleStyles}>{title}</Text>
            </View>
            <TouchableOpacity onPress={handleNav}>
                <Text style={styles.titleNavStyles}>{titleNav}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    subHeaderContainer: {
        paddingHorizontal: 18,
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: '#000000',
    },
    subHeaderTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleStyles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    titleNavStyles: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#F2C94C',
    },
});

export default SubHeader;
