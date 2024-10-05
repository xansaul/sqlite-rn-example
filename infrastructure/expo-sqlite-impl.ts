import { ItemsRepository } from "@/domain/interfaces/items-repository.interface";
import { Item } from "@/domain/entities/item.entity";
import * as SQLite from 'expo-sqlite';


export class SqliteExpo implements ItemsRepository {

    private db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync('databaseName');;
    
    constructor(){
 
        this.db.execAsync(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);'
        );
        
    }

    async create(name: string, description: string): Promise<Item> {
        const result = await this.db.runAsync('INSERT INTO items (name, description) VALUES (?, ?)', name, description);
        return {id: result.lastInsertRowId, description, name};
    }

    async delete(id:number): Promise<boolean> {
        try {
            await this.db.runAsync('DELETE FROM items WHERE id = $id', { $id: id });
    
            return true;
            
        } catch (error) {
            return false;
        }
    }
    async getItems(): Promise<Item[]> {
        const result = await this.db.getAllAsync<Item>('SELECT * FROM items');
        return result;
    }


}