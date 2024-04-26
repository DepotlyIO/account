const getNamesGenerator = (): ((name: string, filename: string) => string) => {
  const names = new Map();

  const chars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const firstAvailableChar = chars[0];

  const currentNameChars = [firstAvailableChar];

  const generateNewName = (key: string) => {
    const currentName = currentNameChars.join('');

    const index = currentNameChars.length - 1;

    if (currentNameChars[index] === chars.at(chars.length - 1)) {
      currentNameChars[index] = firstAvailableChar;
      currentNameChars.push(firstAvailableChar);
    } else {
      currentNameChars[index] = chars[chars.indexOf(currentNameChars[index]) + 1];
    }

    names.set(key, currentName);

    return currentName;
  };

  return (name: string, filename: string): string => {
    const key = `${name}_${filename}`;
    return names.get(key) || generateNewName(key);
  };
};

export default getNamesGenerator;
