import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
createdAt: {
    type: String,
    required: false
},
comments: {
    type: String,
    required: true
},
patientsFilter: {
   searchFromInWeeks:{
        type: Number,
        required:true,
    },
    diagnosis: [
       {
        type: String,
        required:true
       } 
    ]
},
collaborators: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        }
    }
],
calls: {
        frequencyInDays: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }


})

export const projectModel = mongoose.model("Projects", projectsSchema);