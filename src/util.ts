import {
  DateOfBirthInput,
  DateOfBirthAndSexInput,
  AgeInput,
  AgeSexInput,
  Sex,
  DELIMITERS_2000,
  DELIMITERS_1800,
  DELIMITERS_1900,
  Delimiter,
  IdNumber,
  Checksum,
  DateOfBirth,
  DateOfBirthString,
  CHECKSUMS,
} from './types';

export const isDateOfBirthInput = (
  input: string
): input is DateOfBirthInput => {
  return /^\d{6}$/.test(input);
};

export const isDateOfBirthAndSexInput = (
  input: string
): input is DateOfBirthAndSexInput => {
  return /^\d{6}[FM]$/.test(input);
};

export const isAgeInput = (input: string): input is AgeInput => {
  return /^\d{2}$/.test(input);
};

export const isAgeSexInput = (input: string): input is AgeSexInput => {
  return /^\d{2}[FM]$/.test(input);
};

export const validateDateString = (dateString: string): void => {
  const regex = /^(\d{2})(\d{2})(\d{2})$/;
  const match = dateString.match(regex);
  if (!match) {
    throw new Error('Invalid date of birth input');
  }

  const parseFullYear = (yy: string) => {
    const currentYear = Number(new Date().getFullYear().toString().slice(-2));
    const year = Number(yy);
    return year > currentYear ? year + 1900 : year + 2000;
  };

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const year = parseFullYear(match[3]);

  const date = new Date(year, month, day);
  if (
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    throw new Error('Invalid date of birth input');
  }
};

export const getRandomDateOfBirth = (): DateOfBirth => {
  // TODO: 50-50 split for 1900 and 2000
  const oldestDate = new Date();
  oldestDate.setFullYear(new Date().getFullYear() - 50);
  const randomTime =
    oldestDate.getTime() + Math.random() * (Date.now() - oldestDate.getTime());
  const date = new Date(randomTime);
  return {
    dateString: convertDateToString(date),
    fullYear: date.getFullYear(),
  };
};

export const convertDateToString = (date: Date): DateOfBirthString => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}${month}${year}` as DateOfBirthString;
};

export const getRandomSex = (): Sex =>
  Math.random() > 0.5 ? Sex.Female : Sex.Male;

export const getDelimiter = (birthYear: number): Delimiter => {
  // TODO: make '-' and 'A' appear 50% of the time?
  if (birthYear >= 2000) {
    return DELIMITERS_2000[Math.floor(Math.random() * DELIMITERS_2000.length)];
  } else if (birthYear >= 1900) {
    return DELIMITERS_1900[Math.floor(Math.random() * DELIMITERS_1900.length)];
  } else if (birthYear >= 1800) {
    return DELIMITERS_1800[0];
  }
  throw new Error('Year of birth is before 1800: no such delimiters exist');
};

export const getIdNumber = (sex: Sex): IdNumber => {
  const firstDigit = 9;
  const secondDigit = Math.floor(Math.random() * 9);
  const thirdDigit =
    Math.floor(Math.random() * 4) * 2 + (sex === Sex.Male ? 1 : 0);
  return `${firstDigit}${secondDigit}${thirdDigit}`;
};

export const getChecksum = (
  dateString: DateOfBirthString,
  idNumber: IdNumber
): Checksum => CHECKSUMS[Number(dateString + idNumber) % 31];
