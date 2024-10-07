import { InMemoryChatRepository } from "@/repositories/in-memory/in-memory-chat-repository";
import { makeChat } from "@/entities/factories/make-chat";
import { UniqueEntityId } from "@/core/unique-entity-id";
import { GetChatByIdUseCase } from "./get-chat-by-id-use-case";

let chatRepository: InMemoryChatRepository; 
let sut: GetChatByIdUseCase;

describe("Get chat by id use case", () => {

    beforeEach(() => {
        chatRepository = new InMemoryChatRepository();
        sut = new GetChatByIdUseCase(chatRepository);
    });

    it("should be able to get a chat by id", async () => {
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-01")));
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-02")));

        const result = await sut.execute({id: "id-01"});

        expect(result.isSuccess()).toBeTruthy();
        expect(result.value).toMatchObject(
            expect.objectContaining({
                id: "id-01"
            })
        );
    });

    it("should not be able to get a chat by an id that doesn't exist", async () => {
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-01")));
        chatRepository.items.push(makeChat({}, new UniqueEntityId("id-02")));

        const result = await sut.execute({id: "id-03"});

        expect(result.isFailure()).toBeTruthy();
    });
});