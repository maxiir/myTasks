import { Schema, model, models, Types } from "mongoose";

interface Task{
    user_id: Types.ObjectId,
    title: string,
    description: string,
    date: Date
}

const taskSchema = new Schema <Task>({
    user_id:{
        type:Schema.Types.ObjectId,
        required: true,
        ref: 'newUser'
    },
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        default:Date.now
    } 

})

export default models.tasks || model<Task>('tasks', taskSchema)