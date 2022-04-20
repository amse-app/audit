import { Module } from '@nestjs/common';
import { SnowflakeService } from './snowflake/snowflake.service.js';
import { LowdbService } from './lowdb/lowdb.service.js';

@Module({
  providers: [SnowflakeService, LowdbService],
  exports: [SnowflakeService, LowdbService],
})
export class UtilModule {}
