import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchmema } from './schema/user.schema';
import { MusicSavePrivateSchmema } from './schema/private/musicSavePrivate.schema';
import { MusicInfoSchmema } from './schema/musicInfo.schema';
import { SongListSchmema } from './schema/songList.schema';
import { AblumSchmema } from './schema/ablum.schema';
import { CoverPrivateSchmema } from './schema/private/coverPrivate.schema';
import { ImgPrivateSchmema } from './schema/private/ImgPrivate.schema';

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
    },
    {
        name:"Cover_MODEL",
        schema:CoverPrivateSchmema,
        collection:"Cover"
    },
    {
        name:"MusicInfo_MODEL",
        schema:MusicInfoSchmema,
        collection:"MusicInfo"
    },
    {
        name:"SongList_MODEL",
        schema:SongListSchmema,
        collection:"SongList"
    },
    {
        name:"Ablum_MODEL",
        schema:AblumSchmema,
        collection:"Ablum"
    },
    {
        name:"IMG_MODEL",
        schema:ImgPrivateSchmema,
        collection:"Img"
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
