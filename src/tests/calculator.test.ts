import { Calculator } from "../services/calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should return zero when no input passed", () => {
    expect(calculator.add()).toBe(0);
  });
});
