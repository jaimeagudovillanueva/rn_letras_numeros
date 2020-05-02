import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const letra = props => {
    return (
      <TouchableOpacity opacity={0.8} onPress={() => props.leer(props.letra)} disabled={props.isLeyendo}>
        <Text style={styles.letra}>{props.letra}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    letra: {
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 48
    }
});

export default letra;