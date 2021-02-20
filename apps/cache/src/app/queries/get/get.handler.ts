import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { CacheRepository } from '../../repository/cache.repository';
import { GetQuery } from './get.query';

@QueryHandler(GetQuery)
export class GetHandler implements IQueryHandler<GetQuery> {
  private readonly logger = new Logger(GetHandler.name);

  constructor(private readonly repository: CacheRepository) {}

  async execute({ request }: GetQuery) {
    this.logger.debug(util.inspect(request));
    return await this.repository.get(request.key);
  }
}
