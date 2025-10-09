import {
  APIUpdateCompanyInfo,
  APIUpdateCompanyShares,
  APIUpdateCompanyToken,
  APIUpdateCompanyUser,
} from "src/types/company";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppService } from "src/app.service";
import { Company } from "@prisma/client";

@Injectable()
export class CompanyService {
  constructor(private readonly appService: AppService) {}

  async find(id: string): Promise<BadRequestException | Company> {
    const company: Company | null = await this.appService.database.company.findUnique({
      where: { ownerId: id },
      include: {
        owner: true,
        partners: true,
        acquiredTokens: true,
        shares: true,
        employees: true,
      },
    });

    if (!company) {
      return new BadRequestException("Invalid request!, company with the id is not found");
    }

    return company;
  }

  async create(id: string): Promise<string | BadRequestException> {
    const company = await this.appService.database.company.findUnique({
      where: { ownerId: id },
    });

    if (company) {
      return new BadRequestException("Invalid request!, company with the id already exists");
    }

    await this.appService.database.user.update({
      where: { id },
      data: { company: { create: true } },
    });

    return "Successfully! created company";
  }

  async updateCompanyInfo(data: APIUpdateCompanyInfo): Promise<string | BadRequestException> {
    const { id, salary, hiring, credibility } = data;

    const company = await this.appService.database.company.findUnique({
      where: { ownerId: id },
    });

    if (!company) {
      return new BadRequestException("Invalid request!, company with the id is not found");
    }

    await this.appService.database.company.update({
      where: { ownerId: id },
      data: {
        salary: salary || company.salary,
        hiring: hiring || company.hiring,
        credibility: credibility || company.credibility,
      },
    });

    return "Successfully! updated the company's info";
  }

  async updateCompanyUser(
    data: APIUpdateCompanyUser,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, partnerId, employeeId } = data;

    const company = await this.appService.database.company.findUnique({
      where: { ownerId: id },
      include: { partners: true, employees: true },
    });

    if (!company) {
      return new BadRequestException("Invalid request!, company with the id is not found");
    }

    const user = await this.appService.database.user.findUnique({
      where: { id: partnerId || employeeId },
    });

    if (!user) {
      return new BadRequestException("Invalid request!, user with the id is not found");
    }

    const alreadyPartner = company.partners.find((user) => {
      return user.id === partnerId;
    });

    const alreadyEmployee = company.employees.find((user) => {
      return user.id === employeeId;
    });

    if (connect && partnerId) {
      if (alreadyPartner) {
        return new BadRequestException(
          "Invalid request!, the user is already a partner to the company",
        );
      }

      await this.appService.database.company.update({
        where: { ownerId: id },
        data: { partners: { connect: { id: partnerId } } },
      });

      return "Successfully!, connected the user to company";
    } else if (partnerId) {
      if (!alreadyPartner) {
        return new BadRequestException(
          "Invalid request!, the user is not a partner to the company",
        );
      }

      await this.appService.database.company.update({
        where: { ownerId: id },
        data: { partners: { disconnect: { id: partnerId } } },
      });

      return "Successfully!, disconnected the user from company";
    }

    if (connect && employeeId) {
      if (alreadyEmployee) {
        return new BadRequestException(
          "Invalid request!, the user is already a employee in the company",
        );
      }

      await this.appService.database.company.update({
        where: { ownerId: id },
        data: { employees: { connect: { id: employeeId } } },
      });

      return "Successfully!, connected the user to company";
    } else if (employeeId) {
      if (!alreadyEmployee) {
        return new BadRequestException(
          "Invalid request!, the user is not a employee to the company",
        );
      }

      await this.appService.database.company.update({
        where: { ownerId: id },
        data: { employees: { disconnect: { id: employeeId } } },
      });

      return "Successfully!, disconnected the user from company";
    }

    return "Successfully!, connected the user to company";
  }

  async updateCompanyShares(
    data: APIUpdateCompanyShares,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id } = data;

    const company = await this.appService.database.company.findUnique({
      where: { ownerId: id },
      include: { shares: true },
    });

    if (!company) {
      return new BadRequestException("Invalid request!, company with the id is not found");
    }

    const alreadyConnected = company.shares?.id === id;

    if (connect) {
      if (alreadyConnected) {
        return new BadRequestException("Invalid request!, shares already connected to the company");
      }

      await this.appService.database.company.update({
        where: { ownerId: id },
        data: { shares: { connect: { id } } },
      });

      return "Successfully!, connected the shares to company";
    }

    if (!alreadyConnected) {
      return new BadRequestException("Invalid request!, shares are not connected to the company");
    }

    await this.appService.database.company.update({
      where: { ownerId: id },
      data: { shares: { disconnect: { id } } },
    });

    return "Successfully!, disconnected the shares from company";
  }

  async updateCompanyToken(
    data: APIUpdateCompanyToken,
    connect: boolean,
  ): Promise<string | BadRequestException> {
    const { id, tokenId } = data;

    const company = await this.appService.database.company.findUnique({
      where: { ownerId: id },
      include: { acquiredTokens: true },
    });

    if (!company) {
      return new BadRequestException("Invalid request!, company with the id is not found");
    }

    const token = await this.appService.database.token.findUnique({
      where: { id: tokenId },
    });

    if (!token) {
      return new BadRequestException("Invalid request!, token with the id is not found");
    }

    const alreadyAcquired = company.acquiredTokens.find((token) => {
      return token.id === tokenId;
    });

    if (connect) {
      if (alreadyAcquired) {
        return new BadRequestException(
          "Invalid request!, token is already acquired by the company",
        );
      }

      await this.appService.database.company.update({
        where: { ownerId: id },
        data: { acquiredTokens: { connect: { id: tokenId } } },
      });

      return "Successfully!, connected the token to company";
    }

    if (!alreadyAcquired) {
      return new BadRequestException("Invalid request!, token is not acquired by the company");
    }

    await this.appService.database.company.update({
      where: { ownerId: id },
      data: { acquiredTokens: { disconnect: { id: tokenId } } },
    });

    return "Successfully!, disconnected the token from company";
  }
}
