import { Chat } from "../../entities/Chat";
import { ChatRepository } from "../chat-repository";

export class InMemoryChatRepository implements ChatRepository {
    public items: Chat[] = [];

    async create(chat: Chat) {
        this.items.push(chat);
    };

    async remove(id: string) {
        const index = this.items.findIndex((elem) => elem.id.toString() === id);
        
        if (index === -1) {
            return null;
        }

        const chat = this.items[index];

        this.items.splice(index, 1);

        return chat;
    };

    async findAll() {
        const itemsObjects = this.items.map((item) => {
            return item;
        });
        
        return itemsObjects;
    }

    async findById(id: string) {
        const chat = this.items.find((elem) => elem.id.toString() === id);
        
        if (!chat) {
            return null;
        }

        return chat;
    };

    async save(chat: Chat) {
        const index = this.items.findIndex((elem) => elem.id === chat.id);
        this.items[index] = chat;
    }
}