"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const report_entity_1 = require("./report.entity");
const typeorm_2 = require("@nestjs/typeorm");
let ReportsService = class ReportsService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    createEstimate({ make, model, lng, lat, mileage, year }) {
        return this.reportRepository
            .createQueryBuilder()
            .select("AVG(price), price")
            .where("make=:make", { make })
            .andWhere("model=:model", { model })
            .andWhere("lng - :lng between -5 and 5", { lng })
            .andWhere("lat - :lat between -5 and 5", { lat })
            .andWhere("year - :year between -3 and 3", { year })
            .andWhere('approved is true')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawMany();
    }
    create(dto, user) {
        const report = this.reportRepository.create(dto);
        report.user = user;
        return this.reportRepository.save(report);
    }
    async changeApproval(id, approved) {
        const report = await this.reportRepository.findOne({ where: { id: parseInt(id) } });
        if (!report)
            throw new common_1.NotFoundException("Report not found");
        report.approved = approved;
        return this.reportRepository.save(report);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map