function firstAndLastDigits(s: string): [string, string] | undefined {
  const digits = s.match(/\d/g);
  if (digits) {
    const first = digits[0];
    const second = digits.length === 1 ? first : digits[digits.length - 1];
    return [first, second];
  }
}
(async () => {
  let total = 0;
  (await Bun.file(`${import.meta.dir}/input.txt`).text())
    .trim()
    .split("\n")
    .forEach((line) => {
      const [first, second] = firstAndLastDigits(line);
      total += parseInt(first.toString() + second.toString());
    });
  console.log("Part 1:", total); // 55621
})();
