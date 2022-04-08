import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g9pgz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
  ],
})
export class DbModule {}
