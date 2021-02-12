import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroesQuery } from '../impl';

@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroesQuery> {
  constructor(private readonly repository: HeroRepository) {}

  async execute(query: GetHeroesQuery) {
    console.log('Async GetHeroesQuery...');
    return this.repository.findAll();
  }
}
