type Game = {
  id: number;
  highestBlue: number;
  highestRed: number;
  highestGreen: number;
};
type Color = "blue" | "red" | "green";
function findMaxCubeColor(color: Color, s: string): number {
  const regex = new RegExp(`(\\d+)\\s+${color}`, "g");
  return Math.max(...s.match(regex).map((s) => parseInt(s)));
}
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;
(async () => {
  const games = (await Bun.file(`${import.meta.dir}/input.txt`).text())
    .trim()
    .split("\n")
    .map((line) => {
      const game: Game = {
        id: parseInt(line.split(":")[0].replace("Game ", "")),
        highestRed: findMaxCubeColor("red", line),
        highestBlue: findMaxCubeColor("blue", line),
        highestGreen: findMaxCubeColor("green", line),
      };
      return game;
    });
  let sum = 0;
  games
    .filter(
      (g) =>
        g.highestBlue <= maxBlue &&
        g.highestGreen <= maxGreen &&
        g.highestRed <= maxRed
    )
    .forEach((g) => (sum += g.id));
  // Part 1: 2204
  console.log("Result: ", sum);
})();
