export class UpdateRequest {
  constructor(
    public readonly id: string,
    public readonly handle?: string,
    public readonly description?: string
  ) {}
}
