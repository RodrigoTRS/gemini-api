import { UniqueEntityId } from "@/core/unique-entity-id";
import { Chat, ChatProps } from "../Chat";
import { faker } from "@faker-js/faker";

export function makeChat(override: Partial<ChatProps> = {}, id?: UniqueEntityId) {
    const chat = Chat.create({
        name: override.name ?? faker.lorem.words(5),
        messages: [
            {
                sender: "user",
                content: [
                    {
                        type: "paragraph",
                        weight: "normal",
                        text: faker.lorem.words(5)
                    },
                ],
            },
            {
                sender: "model",
                content: [
                    {
                        type: "paragraph",
                        weight: "normal",
                        text: faker.lorem.words(5)
                    },
                ],
            }
        ],
        ...override,
    }, id);

    return chat;
}