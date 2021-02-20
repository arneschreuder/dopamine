import { DeleteHandler } from './commands/delete/delete.handler';
import { ResetHandler } from './commands/reset';
import { SetHandler } from './commands/set/set.handler';
import { DeletedHandler } from './events/deleted/deleted.handler';
import { GetHandler } from './queries/get/get.handler';

export const COMMAND_HANDLERS = [SetHandler, DeleteHandler, ResetHandler];
export const EVENT_HANDLERS = [DeletedHandler, ResetHandler];
export const QUERY_HANDLERS = [GetHandler];
