import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DB_HOST"),
        port: configService.getOrThrow("DB_PORT"),
        database: configService.getOrThrow("DB_DATABASE"),
        username: configService.getOrThrow("DB_USERNAME"),
        password: configService.getOrThrow("DB_PASSWORD"),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
