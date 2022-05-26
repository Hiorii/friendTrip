import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UsersModule,
    DbModule,
    AuthModule,
    TripsModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
