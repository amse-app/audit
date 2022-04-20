import { AuditEventData } from '@amse/audit-types';
import { Injectable } from '@nestjs/common';
import { LowdbService } from './util/lowdb/lowdb.service.js';

@Injectable()
export class AppService {
  getAudits() {
    return this.lowdb.getIds();
  }
  async getAudit(id: string) {
    return this.lowdb.getAuditEntry(id);
  }
  constructor(private lowdb: LowdbService) {}

  async newAudit(data: AuditEventData) {
    data.time = Date.now().toString();
    await this.lowdb.insertAudit(data);
  }
}
