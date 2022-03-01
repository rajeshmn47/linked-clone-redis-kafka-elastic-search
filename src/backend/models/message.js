
const mongoose = require("mongoose");

    const MessageSchema = new mongoose.Schema(
      {
        conversationId: {
          type: String,
        },
        sender: {
          type: String,
        },
        reciever:{
            type:String,
        },
        text: {
          type: String,
        },
        seen: {
            type:Boolean,
            default:false,
        }
      },
      { timestamps: true }
    );
    
    module.exports = mongoose.model("Message", MessageSchema);
    