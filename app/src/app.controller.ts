import { AuditEventData } from '@amse/audit-types';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getAudits' })
  async getAudits() {
    return this.appService.getAudits();
  }

  @MessagePattern({ cmd: 'getAudit' })
  async getAudit(@Payload() id: string) {
    return await this.appService.getAudit(id);
  }

  @EventPattern('data_altered')
  async dataAltered(data: AuditEventData) {
    await this.appService.newAudit(data);
  }
}
