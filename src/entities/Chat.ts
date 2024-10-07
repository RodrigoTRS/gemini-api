import { Entity } from "../core/entity";
import { UniqueEntityId } from "../core/unique-entity-id";
import { Optional } from "../utils/optional";

export type SenderTypes = "user" | "model"
export type ContentSliceTypes = "paragraph" | "list"
export type ContentSliceTextWeight = "normal" | "bold"
export type ContentSliceTextTypes = string | string[]

export interface ContentSlice {
    type: ContentSliceTypes
    weight: ContentSliceTextWeight
    text: ContentSliceTextTypes
}

export interface Message {
    sender: SenderTypes
    content: ContentSlice[]
}

export interface ChatProps {
    name: string
    createdAt: Date
    updatedAt: Date
    messages: Message[]
}

export interface ChatObject {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    messages: Message[]
}

export class Chat extends Entity<ChatProps> {
    
    get name() {
        return this.props.name;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get messages() {
        return this.props.messages;
    }

    set name(name: string) {
        this.props.name = name;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    appendMessage(message: Message) {
        this.props.messages.push(message);
    }

    toObject() {
        return {
            id: this.id.toString(),
            ...this.props,
        };
    }

    static create(props: Optional<ChatProps, "createdAt" | "updatedAt">, id?: UniqueEntityId) {
        const chat = new Chat(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt ?? new Date(),
            },
            id
        );

        return chat;
    }
}
