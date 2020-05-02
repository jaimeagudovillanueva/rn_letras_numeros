import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const letra = props => {
    return (
        <TouchableOpacity key={props.letra} opacity={0.8} 
            onPress={() => props.letraPulsada(props.letra)} 
            disabled={props.isLeyendo}>
            <Text style={[styles.letra, props.letraMarcada === props.letra && styles.letraMarcada]}>
                {props.letra}
            </Text>                      
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    letra: {
        fontSize: 52,
        width: 45,
        marginHorizontal: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    },
        letraMarcada: {
        color: 'red',
        fontStyle: 'italic'
    }
});

export default letra;
