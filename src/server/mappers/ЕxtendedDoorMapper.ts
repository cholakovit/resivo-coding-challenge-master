import { EntityMapper } from '@/server/lib/EntityMapper';
import { Door } from '@/models/Door';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { BuildingDto } from '@/__mocks__/dtos/BuidlingDto';
import { ApartmentDto } from '@/__mocks__/dtos/ApartmentDto';

type BuildingDtosById = Record<string, BuildingDto>;
type ApartmentDtosById = Record<string, ApartmentDto>;
export class ExtendedDoorMapper implements EntityMapper<Door, DoorDto> {
  private readonly originalMapper: EntityMapper<Door, DoorDto>;

  constructor(originalMapper: EntityMapper<Door, DoorDto>) {
    this.originalMapper = originalMapper;
  }

  public toDomain(dto: DoorDto, buildingDtosById: BuildingDtosById, apartmentDtosById?: ApartmentDtosById, apartmentDto?: ApartmentDto): Door {
    const originalResult = this.originalMapper.toDomain(dto, buildingDtosById);

    const apartmentName = apartmentDto?.name ?? this.getApartmentName(apartmentDtosById, dto.apartment_id ?? '') ?? '';

    return {
      ...originalResult,
      apartmentName,
    };
  }

  private getApartmentName(apartmentDtos?: ApartmentDtosById, id?: string) {
    if (apartmentDtos && id !== undefined) {
      const apartment = apartmentDtos[id];
      return apartment ? `${apartment.name}` : '';
    }
  
    return;
  }
}