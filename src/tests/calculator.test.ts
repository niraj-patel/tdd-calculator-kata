import { Calculator } from "../services/calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should return zero when no input passed", () => {
    expect(calculator.add()).toBe(0);
  });

  it("should take single input string and return same value in result", () => {
    expect(calculator.add("1")).toBe(1);
  });

  it("should take two input string and return total in result", () => {
    expect(calculator.add("1, 5")).toBe(6);
  });

  it("should take multiple input string and return total in result", () => {
    expect(calculator.add("1, 5, 4")).toBe(10);
  });

  it("should be able to handle \\n instead of comma", () => {
    expect(calculator.add("1\n5, 4")).toBe(10);
  });

  it("should be able to support different delimeters", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
  });

  it("should throw error when negative numbers provided", () => {
    expect(() => {
      calculator.add("1,2,3,-1,1,-5");
    }).toThrow("Negative numbers not allowed: -1,-5");
  });

  it("should consider zero when number is greater than 1000", () => {
    expect(calculator.add("1,2,3,4,1001")).toBe(10);
  });

  it("should work when delimeter characters are more than 1", () => {
    expect(calculator.add("//[***]\n1***2***3")).toBe(6);
  });

  it("should work with multiple delimeters", () => {
    expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
  });
});
