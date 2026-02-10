export function generateSecurePassword(length: number = 10): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%&*()_+-=[]{|;<>?";

  const allChars = lowercase + uppercase + numbers + symbols;

  let newPassword = "";

  newPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
  newPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
  newPassword += numbers[Math.floor(Math.random() * numbers.length)];
  newPassword += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    newPassword += allChars[Math.floor(Math.random() * allChars.length)];
  }

  newPassword = newPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return newPassword;
}
