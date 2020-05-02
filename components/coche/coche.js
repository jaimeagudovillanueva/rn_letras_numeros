import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

import Matricula from './matricula';

const coche = () => {

    const [matricula, setMatricula] = useState(null);
    const [isLeyendo, setIsLeyendo] = useState(false);

    useEffect(() => {
        cambiarMatriculaHandler();
    }, [cambiarMatriculaHandler]);

    const leer = letra => {
        Speech.speak(letra.toString(), {
            onStart: () => setIsLeyendo(true),
            onDone: () => setIsLeyendo(false)
        });
    }

    const randomWord = length => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    const padDigits = (number, digits) => {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }
    
    const cambiarMatriculaHandler = React.useCallback(() => {
        const matricula = Math.floor(Math.random() * 10000);
        setMatricula((padDigits(matricula, 4) + ' ' + randomWord(3)).split(''));
    }, []);

    const leerMatricula = () => {
        const textoALeer = matricula.join(' ,');
        Speech.speak(textoALeer, {
            onStart: () => setIsLeyendo(true),
            onDone: () => setIsLeyendo(false)
        });
    }

    return (
        <React.Fragment>
            <View style={[styles.boton, {marginTop: 20}]}>
                {isLeyendo ? <Text style={styles.leyendo}>Leyendo...</Text> 
                    : <Button title="Leer matrícula" 
                        onPress={leerMatricula} disabled={isLeyendo}/>
                }
            </View>
            <View style={styles.coche}>
                {matricula && <Matricula matricula={matricula} leer={leer} isLeyendo={isLeyendo} />}
            </View>
            <View style={styles.boton}>
                <Button title="Cambiar matrícula" onPress={cambiarMatriculaHandler}/>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    coche: {
        marginTop: 20,
        marginBottom: 20,
        alignContent: 'center',
        height: '20%',
        width: '100%',
        paddingTop: 1,
        backgroundColor: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff'
      },
      leyendo: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'center'
      },
      boton: {
        width: '70%',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        borderColor: '#fff',
        marginHorizontal: 50
      }
});

export default coche;