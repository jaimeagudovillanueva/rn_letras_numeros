import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

import Letra from './letra';

const abecedario = () => {

    const [abecedario, setAbecedario] = useState({
        letras: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''), 
        isMayusculas: true, 
        letraMarcada: ''
    });

    const [letraLeida, setLetraLeida] = useState(null);
    const [isLeyendo, setIsLeyendo] = useState(false);

    const timerRef = useRef(null);

    const leer = letra => {
        Speech.speak(letra.toString(), {
            onStart: () => setIsLeyendo(true),
            onDone: () => setIsLeyendo(false)
        });
    }

    const cambiarLetra = () => {
        if (abecedario.isMayusculas) {
            setAbecedario({letras: abecedario.letras.join('').toLocaleLowerCase().split(''), isMayusculas: false});
        } else {
            setAbecedario({letras: abecedario.letras.join('').toLocaleUpperCase().split(''), isMayusculas: true});
        } 
    }
    
    const decirLetra = () => {
        const indiceLetra = Math.floor(Math.random() * abecedario.letras.length);
        setLetraLeida(abecedario.letras[indiceLetra]);
        leer(abecedario.letras[indiceLetra]);
        timerRef.current = setTimeout(() => {
            leer('Lo siento. Se ha acabado el tiempo');
            marcarLetra(abecedario.letras[indiceLetra]);
            setTimeout(() => {
                setLetraLeida(null);
            }, 3000);
        }, 10000);
    }
    
    const marcarLetra = letra => {
        setAbecedario({...abecedario, letraMarcada: letra});
        setTimeout(() => setAbecedario({...abecedario, letraMarcada: null}), 3000);
    }
    
    const letraPulsada = (letra) => {
        if (letraLeida) {
            if (letra === letraLeida) {
                leer('¡Correcto!');
                setLetraLeida(null);
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
            } else {
                leer('Incorrecto. Has pulsado la letra ' + letra);
            }
        } else {
            leer(letra);
        }
    } 

    let buttonTitle = "MAYUSCULAS";
    if (abecedario.isMayusculas) {
        buttonTitle = "MINISCULAS";
    }

    return (
        <React.Fragment>
            <View style={[styles.boton, {marginTop: 20}]}> 
            {letraLeida ? 
                <Text style={styles.leyendo}>Busca la letra...</Text>
                :
                <Button title="DECIR LETRA" onPress={decirLetra}/>
            }
            </View>
            <Text>{isLeyendo}</Text>
            <View style={styles.abecedario}>
                {abecedario.letras.map(letra => 
                    <Letra key={letra} letra={letra} letraPulsada={letraPulsada} 
                        letraMarcada={abecedario.letraMarcada} isLeyendo={isLeyendo}/>
                )}
            </View>
            <View style={[styles.boton, {marginTop: 30}]}> 
                <Button title={buttonTitle} onPress={cambiarLetra} disabled={letraLeida !== null}/>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    boton: {
        width: '70%',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        borderColor: '#fff',
        marginHorizontal: 50
    },
    abecedario: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 30,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5
    },
    leyendo: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'center'
    }
});

export default abecedario;