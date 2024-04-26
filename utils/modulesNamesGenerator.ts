const getNamesGenerator = (): ((name: string, filename: string) => string) => {
  const generatedNames = new Map<string, string>();

  // a-z
  const chars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

  const [firstAvailableChar] = chars;
  const currentNameChars: string[] = [];

  const generateNewName = (key: string) => {
    const index = currentNameChars.length - 1;

    switch (true) {
      // When empty array
      case !currentNameChars.length:
        currentNameChars.push(firstAvailableChar);
        break;
      // When last char used
      case currentNameChars[index] === chars.at(chars.length - 1):
        currentNameChars[index] = firstAvailableChar;
        currentNameChars.push(firstAvailableChar);
        break;
      // Just change last element in array
      default:
        currentNameChars[index] = chars[chars.indexOf(currentNameChars[index]) + 1];
    }

    const currentName = currentNameChars.join('');
    generatedNames.set(key, currentName);

    return currentName;
  };

  return (name: string, filename: string): string => {
    const key = `${name}_${filename}`;
    return generatedNames.get(key) || generateNewName(key);
  };
};

export default getNamesGenerator;
