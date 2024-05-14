import { User } from '../models/user.model.js';
import { Chat } from '../models/chat.model.js';
import { Message } from '../models/message.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js'

const accessChat = async(req, res) => {
    const { userId } = req?.body;

    if(!userId){
        return res.status(401).json(
            new ApiError(401, 'Unauthorized access')
        )
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ],
    }).populate('users', '-password')
      .populate('latestMessage')
    
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'fullName, username, email, profileImage'
    })

    if(isChat.length > 0){
        res.status(200).send(isChat[0])
    }else{
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId],
        }
        try {
            const createChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createChat._id}).populate(
                "users",
                "-password"
            );
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message);
            
        }
    }

};

const fetchChat = async(req, res) => {
    try {
        let allChats = Chat.find({
            users: {$elemMatch: {$eq: req.user._id}}
        }).populate('users', '-password')
          .populate('groupAdmin', '-password')
          .populate('latestMessage')
          .sort({updatedAt: -1})
        allChats = await User.populate(allChats,{
            path: 'latestMessage.sender',
            select: "fullName, username, email, profileImage"
        })

        res.status(200).send(allChats);
    } catch (error) {
        throw new Error(error.message);
    }
};

const createGroupChat = async(req, res) => {
    const Users = req.body.users;
    const chatName = req.body.chatName;
    const users = JSON.parse(Users);
    if(!users){
        return res.status(400).json(
            new ApiError(400, 'Please Select Users')
        );
    }

    if(!chatName){
        return res.status(400).json(
            new ApiError(400, 'Give Group Name')
        );
    }

    if (users.length < 2) {
        return res
          .status(400)
          .send("More than 2 users are required to form a group chat");
      }

    users.push(req.user);
    try {
        const groupChatInstance = await Chat.create({
            chatName,
            isGroupChat: true,
            users,
            groupAdmin: req.user._id
        });
        
        const fullGroupInstance = await Chat.findOne({_id: groupChatInstance._id})
                                        .populate('users', '-password')
                                        .populate('groupAdmin', '-password');
        return res.status(200).json(
            new ApiResponse(200, fullGroupInstance, 'Group Created Successfully')
        )
    } catch (error) {
        return res.status(500).json(
            new ApiError(500,'Something wrong in server...Try Again!!')
        )
    }

};

const renameGroup = async(req, res) => {
    const { chatId, newChatName }  = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: newChatName
        },
        {
            new: true
        }
    ).populate('users', '-password')
     .populate('groupAdmin', '-password')
    
     if(!updatedChat){
        return res.status(404).json(
            new ApiError(404, 'Chat Not Found')
        )
     }
     return res.status(201).json(
        new ApiResponse(201, updatedChat, 'Group Renamed SuccessFully')
     )
};

const removeFromGroup = async(req, res) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId).populate('groupAdmin', '-password');
    const groupAdminId = chat.groupAdmin._id.toString();
    const userIdStr = req.user._id.toString();
    if(groupAdminId !== userIdStr){
        return res.status(403).json(
            new ApiError(403, "You can't remove anyone from group")
        )
    }

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId}
        },
        {
            new: true,
        }
    ).populate('users', '-password')
    .populate('groupAdmin', '-password')

    if(!removed){
        return res.status(404).json(
            new ApiError(404, "Chat not found")
        )
    }
    return res.status(201).json(
        new ApiResponse(201, removed, 'User Removed SuccessFully')
    )
};

const addToGroup = async(req, res) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId).populate('groupAdmin', '-password');
    const groupAdminId = chat.groupAdmin._id.toString();
    const userIdStr = req.user._id.toString();
    if(groupAdminId !== userIdStr){
        return res.status(403).json(
            new ApiError(403, "You can't remove anyone from group")
        )
    }

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId}
        },
        {
            new: true,
        }
    ).populate('users', '-password')
    .populate('groupAdmin', '-password')

    if(!added){
        return res.status(404).json(
            new ApiError(404, "Chat not found")
        )
    }
    return res.status(201).json(
        new ApiResponse(201, added, 'User Removed SuccessFully')
    )
};

export {
    accessChat,
    fetchChat,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup
}