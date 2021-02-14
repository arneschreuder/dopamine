export class CreateRequest {
  constructor(
    public readonly authenticationId: string,
    public readonly handle: string
  ) {}
}
