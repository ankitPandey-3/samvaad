import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    content:{
        type: String,
        trim: true
    },
    readBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{timestamps: true});

export const Message = mongoose.model('Message', messageSchema);