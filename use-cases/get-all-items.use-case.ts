import { ItemsRepository } from "@/domain/interfaces/items-repository.interface";
import { Item } from "@/domain/entities/item.entity";


// export class GetAllItems {

//     constructor(
//         private readonly itemsDB: DBActions
//     ){}

//     async execute(): Promise<Item[]> {
//         return await this.itemsDB.getItems();
//     }
// }


export const getAllItems = async(itemsDB: ItemsRepository):Promise<Item[]> => {
    return await itemsDB.getItems();
}