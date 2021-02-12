import { AggregateRoot } from '@nestjs/cqrs';
import { CreatedEvent } from '../events/created/created.event';
import { IAccount } from '../interfaces/account.interface';

export class Account extends AggregateRoot implements IAccount {
  id: string;
  email: string;

  constructor(dto: IAccount) {
    super();
    this.id = dto.id;
    this.email = dto.email;
  }

  async created() {
    this.apply(new CreatedEvent(this));
  }

  // killEnemy(enemyId: string) {
  //   // logic
  //   this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  // }

  // addItem(itemId: string) {
  //   // logic
  //   this.apply(new HeroFoundItemEvent(this.id, itemId));
  // }
}
