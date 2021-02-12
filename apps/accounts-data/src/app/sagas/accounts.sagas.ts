import { Injectable } from '@nestjs/common';
// import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
// import { Observable } from 'rxjs';
// import { delay, tap } from 'rxjs/operators';
// import { AccountCreatedEvent } from '../events/impl/account-created.event';

@Injectable()
export class AccountsSagas {
  // @Saga()
  // accountCreated = (events$: Observable<IEvent>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(AccountCreatedEvent),
  //     delay(1000),
  //     tap((event) => {
  //       console.log('Inside [AccountsSagas] Saga');
  //     })
  //   );
  // };
}
