import { injectable } from 'tsyringe';
import createHttpError from 'http-errors';
import keyBy from 'lodash-es/keyBy';
import { Apartment } from '@/models/Apartment';
import { UseCase } from '@/server/lib/UseCase';
import { ApartmentRepository } from '@/server/repositories/ApartmentRepository';
import { BuildingRepository } from '@/server/repositories/BuildingRepository';
import { ApartmentMapper } from '@/server/mappers/ApartmentMapper';

@injectable()
export class GetApartmentListUseCase implements UseCase<Apartment[]> {
  constructor(
    private apartmentRepository: ApartmentRepository,
    private buildingRepository: BuildingRepository,
    private ApartmentMapper: ApartmentMapper,
  ) {}

  public async execute() {
    try {
      const [doorDtos, buildingDtos] = await Promise.all([
        this.apartmentRepository.getAllApartments(),
        this.buildingRepository.getAllBuildings(),
      ]);

      const buildingDtosById = keyBy(buildingDtos, 'id');

      return doorDtos.map((doorDto) =>
        this.ApartmentMapper.toDomain(doorDto, buildingDtosById),
      );
    } catch (error) {
      throw new createHttpError.ServiceUnavailable();
    }
  }
}