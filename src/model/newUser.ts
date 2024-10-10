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

})

export default models.users || model('users', UserModel)