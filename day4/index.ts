
(async () => {
  const lines = (await Bun.file(`${import.meta.dir}/input.txt`).text())
    .trim()
    .split("\n");
    let total = 0;
  lines.forEach((line: string, index: number) => {
    const numbers = line.split(":")[1]
    const winningNumbers = numbers.split("|")[0].trim().split(" ").filter(n => n.trim() !== "").map(n => parseInt(n.trim()))
    const myNumbers = numbers.split("|")[1].trim().split(" ").filter(n => n.trim() !== "").map(n => parseInt(n.trim()))
    const myWinningNumbers = myNumbers.filter(n => winningNumbers.includes(n))
    if(myWinningNumbers.length === 0) return
    const cardScore = myWinningNumbers.reduce((prev) => prev === 0 ? 1 : prev * 2, 0)
    total += cardScore
  });
  console.log(total)
})();
