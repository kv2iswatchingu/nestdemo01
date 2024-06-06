import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchmema } from './schema/user.schema';
import { MusicSavePrivateSchmema } from './schema/private/musicSavePrivate.schema';

const MONGO_MODELS = MongooseModule.forFeature([
    {
        name:"USER_MODEL",
        schema:UserSchmema,
        collection:"user"
    },
    {
        name:"MusicSavePrivate_MODEL",
        schema:MusicSavePrivateSchmema,
        collection:"MusicResource"
    }
])

@Global()
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/MusicWeb'),
        MONGO_MODELS,
    ],
    exports:[MONGO_MODELS]
})
export class DbModule {}
