import { SSN, DateOfBirthInput, AgeSexInput } from './types';
import {
  isDateOfBirthInput,
  isAgeSexInput,
  validateDateString,
  getRandomDateOfBirth,
  getRandomSex,
  getDelimiter,
  getIdNumber,
  getChecksum,
} from './util';

const runGenerate = (input: string): SSN => {
  if (input.length === 0) {
    return generateFull();
  }
  if (isDateOfBirthInput(input)) {
    return generateFromDateOfBirth(input);
  }
  if (isAgeSexInput(input)) {
    return generateFromAgeAndSex(input);
  }
  throw new Error('Invalid input');
};

const generateFull = (): SSN => {
  const dateOfBirth = getRandomDateOfBirth();
  const sex = getRandomSex();
  const delimiter = getDelimiter(dateOfBirth.fullYear);
  const idNumber = getIdNumber(sex);
  const checksum = getChecksum(dateOfBirth.dateString, idNumber);
  return `${dateOfBirth.dateString}${delimiter}${idNumber}${checksum}`;
};

const generateFromDateOfBirth = (birthday: DateOfBirthInput): SSN => {
  validateDateString(birthday.slice(0, 6));
  // TODO
  return '010107A917U';
};

const generateFromAgeAndSex = (ageAndSex: AgeSexInput): SSN => {
  // TODO
  return '010107A917U';
};

export default runGenerate;
