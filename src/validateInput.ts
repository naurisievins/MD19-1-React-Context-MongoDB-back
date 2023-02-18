export const validateInput = (input: string) => {
  let validatedInput = "";
  validatedInput = input.trim();
  if (validatedInput) {
    return validatedInput;
  }
};
