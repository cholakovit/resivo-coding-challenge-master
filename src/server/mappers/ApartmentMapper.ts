import { Apartment } from '@/models/Apartment';
import { injectable } from 'tsyringe';
import { EntityMapper } from '@/server/lib/EntityMapper';
import { ApartmentDto } from '@/__mocks__/dtos/ApartmentDto';
import { BuildingDto } from '@/__mocks__/dtos/BuidlingDto';

type BuildingDtosById = Record<string, BuildingDto>;

@injectable()
export class ApartmentMapper implements EntityMapper<Apartment, ApartmentDto> {
  public toDomain(ApartmentDto: ApartmentDto, buildingDtosById: BuildingDtosById): Apartment {
    const buildingName = this.getBuildingName(
      buildingDtosById,
      ApartmentDto.building_id,
    );

    return {
      id: ApartmentDto.id,
      name: ApartmentDto.name,
      floor: ApartmentDto.floor,
      building_id: ApartmentDto.building_id,
    };
  }

  private getBuildingName(buildingDtos: BuildingDtosById, id: string) {
    const building = buildingDtos[id];

    return building ? `${building.street} ${building.street_no}` : 'n/a';
  }
}