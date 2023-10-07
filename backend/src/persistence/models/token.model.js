import mongoose from "mongoose";

const tokensSchema = new mongoose.Schema({  
    name: {
        type: String,
        required: true,
    },

});

export const tokenModel = mongoose.model("Tokens", tokensSchema);