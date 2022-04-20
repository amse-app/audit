import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UtilModule } from './util/util.module.js';

@Module({
  imports: [UtilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
