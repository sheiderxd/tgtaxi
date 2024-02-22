import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/guards/auth.guard";
import { RolesGuard } from "./auth/guards/roles.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DB_HOST"),
        port: configService.getOrThrow("DB_PORT"),
        database: configService.getOrThrow("DB_NAME"),
        username: configService.getOrThrow("DB_USERNAME"),
        password: configService.getOrThrow("DB_PASSWORD"),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
