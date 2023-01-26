export type NotificationErrorProps = {
  context: string;
  message: string;
};

export class Notification {
  private errors: { [context: string]: string[] } = {};

  addError(error: NotificationErrorProps): void {
    if (!this.errors[error.context]) {
      this.errors[error.context] = [];
    }

    this.errors[error.context].push(error.message);
  }

  messages(context?: string): string {
    if (!context) {
      let response = "";

      Object.keys(this.errors).map((key) => {
        response += `${key}: ${this.messages(key)}. `;
      });

      return response;
    }

    if (!this.errors[context]) {
      return "no errors found";
    }

    return this.errors[context].join(", ");
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length !== 0;
  }
}
