import { ItemsRepository } from "@/domain/interfaces/items-repository.interface";
import { Item } from "@/domain/entities/item.entity";

export const createItem = async (
  itemsDB: ItemsRepository,
  { description, name }: { name: string; description: string }
): Promise<Item> => {
  return itemsDB.create(name, description);
};
