export const ESCAPE_REGEX_SEARCH_VALUE: RegExp = /[.*+?^${}()|[\]\\]/g; // converts special characters into string
export const ESCAPE_REGEX_REPLACE_VALUE: string = "\\$&";
export const MATCH_DELIMETERS_REGEX: RegExp = /^\/\/(.*?)\n/; // regex to extract delimeters in between // and /n
/* 
regex to convert strings delimeter into array elements
For ex:
string: "[*][%]"
result: "[['*'],['%']]"
*/
export const EXTRACT_DELIMETERS: RegExp = /\[([^\]]+)\]/g;
