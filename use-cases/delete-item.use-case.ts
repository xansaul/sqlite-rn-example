import { ItemsRepository } from "@/domain/interfaces/items-repository.interface";

export const deleteItem = async(itemsDB: ItemsRepository, id: number) => {
    await itemsDB.delete(id);
}