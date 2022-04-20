import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { AuditEventData } from '@amse/audit-types';
import { SnowflakeService } from '../snowflake/snowflake.service.js';
import { fileURLToPath } from 'node:url';

@Injectable()
export class LowdbService implements OnModuleInit, OnModuleDestroy {
  private db: Low<Data>;

  private insertions: number = 0;
  private MAX_INSERTIONS = 10;

  constructor(private snowflake: SnowflakeService) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    // Use JSON file for storage
    const file = join(__dirname, 'db.json');
    const adapter = new JSONFile<Data>(file);
    this.db = new Low(adapter);
  }
  async onModuleDestroy() {
    await this.db.write();
  }
  async onModuleInit() {
    await this.db.read();
    this.db.data ||= { audits: {} };
  }

  async insertAudit(audit: AuditEventData) {
    const id = await this.snowflake.getId();
    this.db.data.audits[id] = audit;
    this.insertions = this.insertions + 1;

    if (this.insertions >= this.MAX_INSERTIONS) {
      await this.db.write();
      this.insertions = 0;
    }
  }

  getIds() {
    return Object.keys(this.db.data.audits);
  }
  getAuditEntry(id: string) {
    console.log(id);

    console.log(this.db.data.audits[id]);

    return this.db.data.audits[id];
  }
}

export type Data = {
  audits: {
    [index: string]: AuditEventData;
  };
};
