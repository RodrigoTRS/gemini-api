import { InMemoryChatRepository } from "../repositories/in-memory/in-memory-chat-repository";
import { ListChatsUseCase } from "./list-chats-use-case";
import { makeChat } from "../entities/factories/make-chat";

let chatRepository: InMemoryChatRepository; 
let sut: ListChatsUseCase;

describe("List chats use case", () => {

    beforeEach(() => {
        chatRepository = new InMemoryChatRepository();
        sut = new ListChatsUseCase(chatRepository);
    });

    it("should be able to create a chat", async () => {
        chatRepository.items.push(makeChat());
        chatRepository.items.push(makeChat());

        const chats = await sut.execute();

        expect(chats.value).toHaveLength(2);
    });
});