import { Injectable } from "@nestjs/common";

@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log(`Suupplying ${watts} worth of power.`);
  }
}
