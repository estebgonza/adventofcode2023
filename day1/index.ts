const literalNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
function findFirstOrLatestTokens(
  input: string,
  findFirst: boolean
): string | null {
  const numberStrings = [
    ...Object.keys(literalNumbers),
    ...Object.values(literalNumbers).map((n) => n.toString()),
  ];
  let tokenFound: string | null = null;
  let tokenfFoundIndex = findFirst ? input.length : -1;
  for (const numberString of numberStrings) {
    const pos = findFirst
      ? input.indexOf(numberString)
      : input.lastIndexOf(numberString);
    const isBetter = findFirst
      ? pos < tokenfFoundIndex
      : pos > tokenfFoundIndex;
    if (pos !== -1 && isBetter) {
      tokenFound = numberString;
      tokenfFoundIndex = pos;
    }
  }
  return tokenFound;
}
function tokenFoundToNumber(s: string): string {
  const n = parseInt(s);
  return (Number.isNaN(n) ? literalNumbers[s] : n).toString();
}
(async () => {
  let total = 0;
  (await Bun.file(`${import.meta.dir}/input.txt`).text())
    .trim()
    .split("\n")
    .forEach((line) => {
      const first = findFirstOrLatestTokens(line, true);
      const second = findFirstOrLatestTokens(line, false);
      if (first && second) {
        const firstNumber = tokenFoundToNumber(first);
        const secondNumber = tokenFoundToNumber(second);
        total += parseInt(`${firstNumber}${secondNumber}`);
      }
    });
  // Part 1: 55621
  // Part 2: 53592
  console.log("Result: ", total);
})();
