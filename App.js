import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Coche from './components/matricula/coche';
import Abecedario from './components/abecedario/abecedario';

const App = () => {
  
  const [isAbecedario, setIsAbecedario] = useState(true);

  const cambiarModo = () => {
    setIsAbecedario(!isAbecedario);
  }

  return (
    <View style={styles.container}>
      <View style={styles.boton}>
        <Button title="CAMBIAR MODO" onPress={cambiarModo} color="orange"/>
      </View> 
      { isAbecedario ? <Abecedario /> : <Coche /> } 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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

export default App;