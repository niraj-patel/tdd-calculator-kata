export class Calculator {
  constructor() {}

  private checkNegativeNumbers(input: Array<number>): Array<number> {
    const negativeNumbers = input.filter((value) => value < 0);
    return negativeNumbers;
  }

  private parseDelimeterAndNumber(input: string): {
    delimeter: RegExp;
    values: string;
  } {
    let delimeter = /,|\n/;
    let numbers = input;

    if (input.startsWith("//")) {
      const matchedDelimeter = input.match(/^\/\/(.+)\n/);

      if (matchedDelimeter) {
        delimeter = new RegExp(matchedDelimeter[1]);
        numbers = input.substring(matchedDelimeter[0].length);
      }
    }

    return { delimeter, values: numbers! };
  }

  add(input?: string): number {
    if (!input) {
      return 0;
    }

    const { delimeter, values } = this.parseDelimeterAndNumber(input);
    const numberArr = values.split(delimeter).map(Number);
    const negativeNumbers = this.checkNegativeNumbers(numberArr);

    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(",")}`
      );
    }
    const total = numberArr.reduce((a, b) => a + b);
    return total;
  }
}
