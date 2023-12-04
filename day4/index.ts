(async () => {
  const lines = (await Bun.file(`${import.meta.dir}/input.txt`).text())
    .trim()
    .split("\n");
  // card id -> number of winning numbers
  const winningCounts = new Map<number, number>();
  lines.forEach((line: string, index: number) => {
    const numbers = line.split(":")[1];
    const winningNumbers = numbers.split("|")[0].trim().split(" ").filter(n => n.trim() !== "").map(n => parseInt(n.trim()));
    const myNumbers = numbers.split("|")[1].trim().split(" ").filter(n => n.trim() !== "").map(n => parseInt(n.trim()));
    const myWinningNumbersCount = myNumbers.filter(n => winningNumbers.includes(n)).length;
    winningCounts.set(index + 1, myWinningNumbersCount);
  });
  // card id -> number of instances cards
  const allCards = new Map<number, number>();
  winningCounts.forEach((_, id) => allCards.set(id, 1));
  winningCounts.forEach((count, id) => {
    for (let i = 1; i <= count; i++) {
      const nextCardId = id + i;
      allCards.has(nextCardId) && allCards.set(nextCardId, allCards.get(nextCardId) + allCards.get(id));
    }
  });
  let total = 0;
  allCards.forEach(count => total += count);
  console.log(total)
})();
