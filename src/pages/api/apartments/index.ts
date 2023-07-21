import 'reflect-metadata';
import type { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { Apartment } from '@/models/Apartment';
import { ApiHandler } from '@/server/lib/ApiHandler';
import { GetApartmentListUseCase } from '@/server/useCases/GetApartmentListUseCase';

const getApartmentListUseCase = container.resolve(GetApartmentListUseCase);

export default new ApiHandler()
  .get(async (request: NextApiRequest, response: NextApiResponse<Apartment[]>) => {
    const data = await getApartmentListUseCase.execute();
    response.status(200).json(data);
  })
  .getHandler();
