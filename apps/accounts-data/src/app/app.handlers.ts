import { CreateHandler } from './commands/create/create.handler';
import { DeleteHandler } from './commands/delete/delete.handler';
import { UpdateHandler } from './commands/update';
import { UpdatedHandler } from './events';
import { CreatedHandler } from './events/created/created.handler';
import { DeletedHandler } from './events/deleted/deleted.handler';
import { AccountHandler } from './queries/account/account.handler';
import { AccountsHandler } from './queries/accounts/accounts.handler';

export const COMMAND_HANDLERS = [CreateHandler, DeleteHandler, UpdateHandler];
export const EVENT_HANDLERS = [CreatedHandler, DeletedHandler, UpdatedHandler];
export const QUERY_HANDLERS = [AccountHandler, AccountsHandler];
