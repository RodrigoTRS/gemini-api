import { InMemoryChatRepository } from "@/repositories/in-memory/in-memory-chat-repository";
import { makeChat } from "@/entities/factories/make-chat";
import { UniqueEntityId } from "@/core/unique-entity-id";
import { RemoveChatByIdUseCase } from "./remove-chat-by-id-use-case";

let chatRepository: InMemoryChatRepository; 
let sut: RemoveChatByIdUseCase;

describe("Remove chat by id use case", () => {

    beforeEach(() => {
        chatRepository = new InMemoryChatRepository();
        sut = new RemoveChatByIdUseCase(chatRepository);
    });

    it("should be able to remove a chat by id", async () => {
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-01")));
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-03")));

        const result = await sut.execute({id: "id-01"});

        expect(result.isSuccess()).toBeTruthy();
        expect(chatRepository.items).toHaveLength(1);
    });

    it("should not be able to remove a chat by and id that doesn't exist", async () => {
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-01")));
        const result = await sut.execute({id: "id-02"});

        expect(result.isFailure()).toBeTruthy();
    });
});