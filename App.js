import { useEffect, useState }  from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() 
{
  
  const [itemText, setItemText] = useState('Nombre'); 
  const [items, setItems]       = useState([]); 

  //Mostrar datos entrantes
  useEffect(()=>console.log('Item: '+items),[items]);

  const onChangeText  = t   => setItemText(t);
  const clearItem     = t   => setItemText('');
  const addItems      = ()  => 
  {
    setItems( oldArray => [...oldArray, {
      id: Math.floor(Math.random() * 90000) + 10000,
      value: itemText 
    }]);
    setItemText('');
  };

  const [selectedItem, setSelectedItem] = useState(null);


  const renderItem = ({ item })  =>  (
      <View style={styles.item}>
          <Text>{item.value}</Text>
          <TouchableOpacity
            onPress={() => setSelectedItem(item)}
            style={item.id === selectedItem?.id 
              ? styles.selectedItem 
              : styles.item}
          >

            <TouchableOpacity 
              onPress={() => deleteItem(item)} 
              style={styles.deleteButton}>
              <Text>Borrar Item</Text>
            </TouchableOpacity>
          </TouchableOpacity>
      </View>
  );

  const deleteItem = itemToDelete => {
    setItems(prevData => prevData.filter(item => item.id !== itemToDelete.id));
  };

  return (
    <View style={styles.screen}>

      <View style={styles.botonAgregar}>
        
        <TextInput 
          placeholder="Nombre del cliente" 
          style={styles.input} 
          onChangeText={onChangeText}
          value={itemText}
          onPressOut={clearItem}
        />
        <Button 
          title="Agregar" 
          onPress={addItems}
        />
      </View>

      <View style={styles.itemContainer}>

        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  
  selectedItem: {
    backgroundColor: 'red',
  },

  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  screen:{
    padding:30,
    backgroundColor: "gray",
  },

  botonAgregar:{
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input:{
    width: '60%',
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  itemContainer:{
    marginTop: 20,
  },
 

  item: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});
