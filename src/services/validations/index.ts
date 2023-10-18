export const handleValidations = (value: string) => {
  const isLowerCase = RegExp('[a-z]+').test(value);
  const isUpperCase = RegExp('[A-Z]+').test(value);
  const hasSymbol = RegExp('[-+!@#$%^&*.,?]+').test(value);
  const matchesLength = value.length >= 8;
  const allValid = [isLowerCase, isUpperCase, hasSymbol, matchesLength].every(
    (validation) => validation
  );
  return {
    isLowerCase,
    isUpperCase,
    hasSymbol,
    matchesLength,
    allValid,
  };
};
