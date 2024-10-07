import mongoose from "mongoose";

const mongoChatSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    messages: [{
        sender: { type: String, enum: ["user", "model"], required: true },
        content: [{
            type: { type: String, enum: ["paragraph", "list"], required: true }, 
            weight: { type: String, enum: ["normal", "bold"], required: true }, 
            text: { type: mongoose.Schema.Types.Mixed, required: true }
        }]
    }]
});

export const MongoChat = mongoose.model("chat", mongoChatSchema);