export type Delimiter1800 = '+';
export type Delimiter1900 = '-' | 'Y' | 'X' | 'W' | 'V' | 'U';
export type Delimiter2000 = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type Delimiter = Delimiter1800 | Delimiter1900 | Delimiter2000;

// prettier-ignore
export type Checksum =
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'H' | 'J' | 'K' | 'L'
  | 'M' | 'N' | 'P' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y';

export const DELIMITERS_1800: Delimiter1800[] = ['+'];
export const DELIMITERS_1900: Delimiter1900[] = ['-', 'Y', 'X', 'W', 'V', 'U'];
export const DELIMITERS_2000: Delimiter2000[] = ['A', 'B', 'C', 'D', 'E', 'F'];

// prettier-ignore
export const CHECKSUMS: ReadonlyArray<Checksum> = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L',
  'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'
];

export type IdNumber = `${number}${number}${number}`;

export type SSN = `${DateOfBirthString}${Delimiter}${IdNumber}${Checksum}`;

export enum Sex {
  Female = 'F',
  Male = 'M',
}

export type DateOfBirthString =
  `${number}${number}${number}${number}${number}${number}`;

export type DateOfBirth = {
  dateString: DateOfBirthString;
  fullYear: number;
};

export type DateOfBirthInput = DateOfBirthString;

export type DateOfBirthAndSexInput = `${DateOfBirthInput}${Sex}`;

export type AgeInput = `${number}` | `${number}${number}`;

export type AgeSexInput = `${AgeInput}${Sex}`;
