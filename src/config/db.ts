import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cbmpe_ocorrencias')
        console.log('Conectado ao MongoDB')
    } catch (err) {
        console.error('Erro de conexão com o MongoDB', err)
        process.exit(1)
    }
}