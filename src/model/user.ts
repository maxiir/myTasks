import {Schema, model, models} from 'mongoose'

const UserModel = new Schema({
    email: {
        require: true,
        type: String
    },
    userName: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    }
    // role: {
    //     type: String,
    //     default: 'user'
    // }

})

export default models.users || model('users', UserModel)