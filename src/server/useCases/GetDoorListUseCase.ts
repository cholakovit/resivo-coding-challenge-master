import { injectable } from 'tsyringe';
import createHttpError from 'http-errors';
import keyBy from 'lodash-es/keyBy';
import { Door } from '@/models/Door';
import { UseCase } from '@/server/lib/UseCase';
import { DoorRepository } from '@/server/repositories/DoorRepository';
import { BuildingRepository } from '@/server/repositories/BuildingRepository';
import { DoorMapper } from '@/server/mappers/DoorMapper';
import { ApartmentRepository } from '../repositories/ApartmentRepository';

import { ExtendedDoorMapper } from '@/server/mappers/ЕxtendedDoorMapper';
@injectable()
export class GetDoorListUseCase implements UseCase<Door[]> {
  constructor(
    private doorRepository: DoorRepository,
    private buildingRepository: BuildingRepository,
    private doorMapper: DoorMapper,
    private apartmentRepository: ApartmentRepository,
  ) {}

  public async execute() {
    try {
      const [doorDtos, buildingDtos, apartmentDtos] = await Promise.all([
        this.doorRepository.getAllDoors(),
        this.buildingRepository.getAllBuildings(),
        this.apartmentRepository.getAllApartments()
      ]);

      const buildingDtosById = keyBy(buildingDtos, 'id');
      const apartmentDtosById = keyBy(apartmentDtos, 'id');

      const extendedMapper = new ExtendedDoorMapper(this.doorMapper);

      return doorDtos.map((doorDto) =>
        extendedMapper.toDomain(doorDto, buildingDtosById, apartmentDtosById),
      );
    } catch (error) {
      throw new createHttpError.ServiceUnavailable();
    }
  }
}
