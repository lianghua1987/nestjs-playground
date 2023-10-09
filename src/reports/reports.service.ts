import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {

  }

  createEstimate({ make, model, lng, lat, mileage, year }: GetEstimateDto) {
    return this.reportRepository
      .createQueryBuilder()
      .select("AVG(price), price")
      .where("make=:make", { make })      // Prevent SQL injection
      .andWhere("model=:model", { model })
      .andWhere("lng - :lng between -5 and 5", { lng })
      .andWhere("lat - :lat between -5 and 5", { lat })
      .andWhere("year - :year between -3 and 3", { year })
      .andWhere('approved is true')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({mileage})
      .limit(3)
      .getRawMany();
  }

  create(dto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(dto);
    report.user = user;
    return this.reportRepository.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportRepository.findOne({ where: { id: parseInt(id) } });
    if (!report) throw new NotFoundException("Report not found");
    report.approved = approved;
    return this.reportRepository.save(report);
  }

}
