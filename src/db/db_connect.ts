import {connect} from 'mongoose'

const dbConnect = async () => {
    try {
        const connection = await connect('mongodb+srv://maxiirucci:EratB9KtmvlVMcAY@cluster0.dqae71e.mongodb.net/')
        console.log('conectado a:', connection.connection.name)
        
    } catch (error) {
        console.error('Error al conectar en la db', error)
    }
}

export default dbConnect