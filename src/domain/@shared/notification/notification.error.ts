export class NotificationError extends Error {
  constructor(public errors: string) {
    super(errors);
  }
}
