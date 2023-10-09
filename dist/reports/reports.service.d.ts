import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";
export declare class ReportsService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    create(dto: CreateReportDto, user: User): Promise<Report>;
}
