import { Chat } from "../entities/Chat";

export interface ChatRepository {
    create: (chat: Chat) => Promise<void>
    save: (chat: Chat) => Promise<void>
    findAll: () => Promise<Chat[]>
    remove: (id: string) => Promise<Chat | null>
    findById: (id: string) => Promise<Chat | null>
}