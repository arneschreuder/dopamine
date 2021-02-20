export class CreateAccountRequest {
  constructor(
    public readonly authenticationId: string,
    public readonly handle: string
  ) {}
}
