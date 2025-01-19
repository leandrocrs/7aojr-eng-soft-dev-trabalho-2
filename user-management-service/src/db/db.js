import mongoose from 'mongoose'

export async function initDbConnection() {
    return mongoose.connect(
        `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
        {
            dbName: 'users-db'
        }
    )
}

