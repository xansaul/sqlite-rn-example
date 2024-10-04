import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

interface Item {
  id: number;
  name: string;
  description: string;
}

const ItemManager = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [db, setDB] = useState<SQLite.SQLiteDatabase|null>(null);

  useEffect(() => {
    
    const getDataBase = async () => {
      const db = await SQLite.openDatabaseAsync('databaseName');
      
      setDB(db);
    }
    getDataBase();
    
  }, [])

  useEffect(() => {
    
    if(!db) return;

    db.execAsync(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);'
    );

    
    fetchItems();
  }, [db]);

  
  const fetchItems = async() => {
    if(!db) return;
    const result = await db.getAllAsync<Item>('SELECT * FROM items');
    
    setItems(result);

  };
  
  const addItem = async () => {
    if(!db) return;
    if(!description || !name) return;
    
    const result = await db.runAsync('INSERT INTO items (name, description) VALUES (?, ?)', name, description);
    setItems([...items, {id: result.lastInsertRowId, description, name}]);
  };

  
  const deleteItem = async (id:number) => {
    if(!db) return;
    await db.runAsync('DELETE FROM items WHERE id = $id', { $id: id });
    setItems([...items.filter(item=>item.id !==id)]);
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Agregar Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5, padding: 10, borderWidth: 1 }}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button title="Eliminar" onPress={()=>deleteItem(item.id)} color={"red"}  />
          </View>
        )}
      />
    </View>
  );
};

export default ItemManager;

