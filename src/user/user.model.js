import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [30, "Name cannot exced 30 characteres"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [30, "Surname cannot exced 30 characteres"]
    }
})