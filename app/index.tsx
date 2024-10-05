import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Item } from '@/domain/entities/item.entity';
import { getAllItems } from '@/use-cases/get-all-items.use-case';
import { SqliteExpo } from '@/infrastructure/expo-sqlite-impl';
import { createItem } from '@/use-cases/add-item.use-case';
import { deleteItem } from '@/use-cases/delete-item.use-case';
import { ItemsRepository } from '@/domain/interfaces/items-repository.interface';


const ItemManager = () => {

  const itemsDB = useRef<ItemsRepository>(new SqliteExpo());

  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const getItems = async () => {
      const items = await getAllItems(itemsDB.current);
      setItems(items);
    }
    getItems();
  }, []);

  const addItem = async () => {
    const newItem = await createItem(itemsDB.current, { description, name });
    setItems([...items, newItem]);
  };

  const handleDeleteItem = async (id:number) => {
    deleteItem(itemsDB.current, id)
    setItems([...items.filter(item=>item.id !==id)]);
  };

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
            <Button title="Eliminar" onPress={()=>handleDeleteItem(item.id)} color={"red"}  />
          </View>
        )}
      />
    </View>
  );
};

export default ItemManager;

