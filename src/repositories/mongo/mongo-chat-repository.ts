import mongoose from "mongoose";

import { Chat } from "@/entities/Chat";
import { ChatRepository } from "../chat-repository";
import { env } from "@/utils/env";
import { MongoChat } from "./schema/chat-schema";
import { UniqueEntityId } from "@/core/unique-entity-id";

export class MongoChatRepository implements ChatRepository {

    constructor() {
        this.connect();
    }

    async connect() {
        const connString = env.NODE_ENV === "development"
            ? env.LOCAL_MONGO_DB_CONNECTION
            : env.PROD_MONGO_DB_CONNECTION;
        await mongoose.connect(connString);
    }

    async create(chat: Chat) {
        try {
            const {
                id,
                name,
                createdAt,
                updatedAt,
                messages
            } = chat.toObject();

            const newChat = new MongoChat({
                _id: id,
                name,
                createdAt,
                updatedAt,
                messages
            });

            await newChat.save();
        } catch(err) {
            console.log(err);
        }
    };

    async remove(id: string) {
        try {
            const mongoChat = await MongoChat.findByIdAndDelete(id);

            if (!mongoChat) {
                return null;
            }  

            const chat = Chat.create({
                name: mongoChat.name,
                createdAt: mongoChat.createdAt,
                updatedAt: mongoChat.updatedAt,
                messages: mongoChat.messages
            }, new UniqueEntityId(mongoChat._id));

            return chat;

        } catch(err) {
            console.log(err);
            return null;
        }
    };

    async findAll() {
        try {
            const mongoChats = await MongoChat.find();

            const chats = mongoChats.map((mongoChat) => {
                const chat = Chat.create({
                    name: mongoChat.name,
                    createdAt: mongoChat.createdAt,
                    updatedAt: mongoChat.updatedAt,
                    messages: mongoChat.messages
                }, new UniqueEntityId(mongoChat._id));

                return chat;
            });

            return chats;
        } catch(err) {
            console.log(err);
            return [];
        }
    };

    async findById(id: string) {
        try {
            const mongoChat = await MongoChat.findById(id);
            
            if (!mongoChat) {
                return null;
            }

            const chat = Chat.create({
                name: mongoChat.name,
                createdAt: mongoChat.createdAt,
                updatedAt: mongoChat.updatedAt,
                messages: mongoChat.messages
            }, new UniqueEntityId(mongoChat._id));


            return chat;
        } catch(err) {
            console.log(err);
            return null;
        }
    };

    async save(chat: Chat) {
        try {

            await MongoChat.findByIdAndUpdate(chat.id.toString(), {  
                name: chat.name,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
                messages: chat.messages
            });
        } catch (err) {
            console.log(err);
        }
    }
}