import { InMemoryChatRepository } from "../repositories/in-memory/in-memory-chat-repository";
import { makeChat } from "../entities/factories/make-chat";
import { UniqueEntityId } from "../core/unique-entity-id";
import { RenameChatByIdUseCase } from "./rename-chat-by-id-use-case";

let chatRepository: InMemoryChatRepository; 
let sut: RenameChatByIdUseCase;

describe("Rename chat by id use case", () => {

    beforeEach(() => {
        chatRepository = new InMemoryChatRepository();
        sut = new RenameChatByIdUseCase(chatRepository);
    });

    it("should be able to rename a chat by id", async () => {
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-01")));

        const result = await sut.execute({id: "id-01", name: "New name"});

        expect(result.isSuccess()).toBeTruthy();
        expect(result.value).toMatchObject(
            expect.objectContaining({
                name: "New name"
            })
        );
    });

    it("should not be able to rename a chat by and id that doesn't exist", async () => {
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-01")));

        const result = await sut.execute({id: "id-02", name: "New name"});

        expect(result.isFailure()).toBeTruthy();
    });
});