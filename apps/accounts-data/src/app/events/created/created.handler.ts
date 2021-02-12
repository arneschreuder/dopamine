import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CreatedEvent } from './created.event';

@EventsHandler(CreatedEvent)
export class CreatedHandler implements IEventHandler<CreatedEvent> {
  handle(event: CreatedEvent) {
    console.log('CreatedEvent...');
    console.log(event.account);
  }
}
