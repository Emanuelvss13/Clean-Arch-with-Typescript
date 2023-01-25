import { Notification } from "./notification";

describe("Notification unit tests", () => {
  it("should create errors", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    console.log(notification.messages("customer"));

    expect(notification.messages("customer")).toBe("error message");

    const error2 = {
      message: "error message2",
      context: "customer",
    };

    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "error message, error message2"
    );

    const error3 = {
      message: "error message2",
      context: "order",
    };

    notification.addError(error3);

    expect(notification.messages("customer")).toBe(
      "error message, error message2"
    );
  });

  it("should return 'no errors found' message when search for undefined contexts", () => {
    const notification = new Notification();

    expect(notification.messages("asd")).toBe("no errors found");
  });

  it("should return all errors message when context not provided", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    const error2 = {
      message: "error message2",
      context: "customer",
    };

    notification.addError(error2);

    const error3 = {
      message: "error message2",
      context: "order",
    };

    notification.addError(error3);

    expect(notification.messages()).toBe(
      "customer: error message, error message2. order: error message2. "
    );
  });

  it("should check if context has errors", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    };

    expect(notification.hasErrors()).toBe(false);

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });
});
