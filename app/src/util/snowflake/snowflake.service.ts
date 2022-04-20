import { Injectable } from '@nestjs/common';
import { SnowflakeGenerator } from '@blitzbeule/snowflakeid';

@Injectable()
export class SnowflakeService {
  private gen: SnowflakeGenerator;

  constructor() {
    this.gen = new SnowflakeGenerator(BigInt(process.env.IdGenId));
  }

  async getId(decimal: boolean = false): Promise<string> {
    var i = await this.gen.next();
    if (decimal) {
      return i.toString();
    } else {
      return this.bnToB64(i);
    }
  }

  bnToB64(bn: BigInt): string {
    var hex = bn.toString(16);
    if (hex.length % 2) {
      hex = '0' + hex;
    }

    var bin = [];
    var i = 0;
    var d: number;
    var b: string;
    while (i < hex.length) {
      d = parseInt(hex.slice(i, i + 2), 16);
      b = String.fromCharCode(d);
      bin.push(b);
      i += 2;
    }

    return this.btoa(bin.join(''));
  }

  btoa(bin: string): string {
    return Buffer.from(bin, 'binary')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
