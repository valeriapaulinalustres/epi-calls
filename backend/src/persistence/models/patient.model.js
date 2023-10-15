import mongoose from "mongoose";

const patientsSchema = new mongoose.Schema({  
    lastName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dni: {
        type: Number,
        required: true,
    },
    

});

export const patientModel = mongoose.model("Patients", patientsSchema);