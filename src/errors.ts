export class InvalidInputError extends Error {
  constructor() {
    super();
    this.name = 'InvalidInputError';
  }
}

export const INVALID_INPUT_ERROR_TEXT = 'Finnish SSN Generator: Invalid input';
export const UNEXPECTED_ERROR_TEXT = 'Finnish SSN Generator: Unexpected';
