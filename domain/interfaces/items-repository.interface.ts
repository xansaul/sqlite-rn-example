import { Item } from "../entities/item.entity";

export interface ItemsRepository{
    create(name: string, description: string): Promise<Item>;
    delete(id: number): Promise<boolean>;
    getItems(): Promise<Item[]>;
}