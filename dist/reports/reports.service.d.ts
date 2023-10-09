import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
export declare class ReportsService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    createEstimate({ make, model, lng, lat, mileage, year }: GetEstimateDto): Promise<any[]>;
    create(dto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
}
