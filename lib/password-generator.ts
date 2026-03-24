export type Character = "uppercase" | "lowercase" | "numbers" | "symbols";

interface GeneratePasswordProps {
  characters: Character[];
  length: number;
}
export function generatePassword({
  characters,
  length,
}: GeneratePasswordProps): string {
  const charMap: Record<Character, string> = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "!@#$%&*()_+-=[]{|;<>?",
    numbers: "0123456789",
  };

  const allChars = characters.map((char) => charMap[char]).join("");
  const randomValues = crypto.getRandomValues(new Uint32Array(length));

  return Array.from(randomValues)
    .map((val) => allChars[val % allChars.length])
    .join("");
}
