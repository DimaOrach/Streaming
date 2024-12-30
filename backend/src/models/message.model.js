import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {       //Clerk user ID
        type: String,
        required: true
    },
    receiverId: {     
        type: String,
        required: true
    },
    content: {       //Clerk user ID
        type: String,
        required: true
    }
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);