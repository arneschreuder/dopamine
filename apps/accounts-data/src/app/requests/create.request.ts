export class CreateRequest {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
