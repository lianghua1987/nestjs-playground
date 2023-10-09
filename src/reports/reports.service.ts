import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {

  }

  create(dto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(dto);
    report.user = user;
    return this.reportRepository.save(report);
  }

}
