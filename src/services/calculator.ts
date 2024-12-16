import {
  ESCAPE_REGEX_REPLACE_VALUE,
  ESCAPE_REGEX_SEARCH_VALUE,
  MATCH_DELIMETERS_REGEX,
  EXTRACT_DELIMETERS,
} from "../utils/constant";
export class Calculator {
  constructor() {}

  private checkNegativeNumbers(input: Array<number>): Array<number> {
    const negativeNumbers = input.filter((value) => value < 0);
    return negativeNumbers;
  }

  private escapeRegex(delimiter: string): string {
    return delimiter.replace(
      ESCAPE_REGEX_SEARCH_VALUE,
      ESCAPE_REGEX_REPLACE_VALUE
    );
  }

  private add(numberArr: number[]): number {
    return numberArr.reduce((a, b) => {
      if (b > 1000) {
        b = 0;
      }
      return a + b;
    }, 0);
  }

  private multiply(numberArr: number[]): number {
    return numberArr.reduce((a, b) => {
      return a * b;
    }, 1);
  }

  private parseDelimeterAndNumber(input: string): {
    delimeter: RegExp;
    values: string;
  } {
    let delimeters = [",", "\n"];
    let numbers = input;

    // checks whether any custom delimeter is present or not
    if (input.startsWith("//")) {
      // extract custom delimeters
      const matchedDelimeters = input.match(MATCH_DELIMETERS_REGEX);

      if (matchedDelimeters!.length > 0) {
        const rawDelimiters = matchedDelimeters![1];

        // checks whether delimeters are inside square brackets
        if (rawDelimiters.startsWith("[") && rawDelimiters.endsWith("]")) {
          // return array of extracted delimeters in square brackets
          // For ex: ['[*]', '[%]']
          const dlms = rawDelimiters.match(EXTRACT_DELIMETERS);
          // remove square brackets from delimeters
          delimeters = dlms?.map((d) => d.slice(1, -1)) || [];
        } else {
          delimeters = [rawDelimiters];
        }
        numbers = input.substring(matchedDelimeters![0].length);
      }
    }

    // convert array of delimeters to regex string
    const delimiterRegex = new RegExp(
      delimeters.map(this.escapeRegex).join("|")
    );

    return { delimeter: delimiterRegex, values: numbers! };
  }

  calculate(input?: string): number {
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

    let result: number;
    // check whether delimeter equals * then go for multiplication
    if (delimeter.test("*")) {
      result = this.multiply(numberArr);
    } else {
      result = this.add(numberArr);
    }
    return result!;
  }
}
