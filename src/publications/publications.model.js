import { Schema, model, version } from "mongoose";

const publicationsSchema = Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxLength: [30, "Title cannot exced 30 characteres"]
    },
    category:{
        type: String,
        required: [true, "The category is required"],
        maxLength: [30, "The category cannot exced 30 characteres"]
    },
    mainText:{
        type: String,
        required: [true, "The main text is required"],
        maxLength: [110, "The main text cannot exced 110 characteres"]
    },
    role:{
        type: String,
        required: true,
        enum: ["AUTOR_ROLE"],
        default: "AUTOR_ROLE"
    },
    keep:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true

})

export default model("Publications", publicationsSchema)