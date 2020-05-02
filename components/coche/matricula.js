import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Letra from './letra';

const matricula = props => {
    return (
        <View style={styles.matricula}>
        <Text style={styles.letra}>E</Text>
            {props.matricula.map((letra, index) => 
                <Letra key={index} leer={props.leer} isLeyendo={props.isLeyendo} letra={letra}/>
            )}             
        </View>
    );
}

const styles = StyleSheet.create({
    matricula: {
        height: '65%',
        width: '80%',
        marginHorizontal: 35,
        marginVertical: 20,
        textAlign: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff'
    },
    letra: {
        backgroundColor: 'blue',
        color: 'white',
        width: '20%',
        fontSize: 48,
        height: '80%',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        paddingVertical: 1
    }
});

export default matricula;