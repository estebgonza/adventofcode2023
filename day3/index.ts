type Token = {
  lineIndex: number;
};
type NumberToken = Token & {
  number: number;
  startAt: number;
  endAt: number;
};

type SymbolToken = Token & {
  symbol: string;
  at: number;
};
(async () => {
  const lines = (await Bun.file(`${import.meta.dir}/input.txt`).text())
    .trim()
    .split("\n");
  const numbers: Map<number, NumberToken[]> = new Map();
  const symbols: Map<number, SymbolToken[]> = new Map();
  lines.forEach((line: string, index: number) => {
    numbers.set(index, findNumberTokens(line, index));
    symbols.set(index, findSymbolTokens(line, index));
  });
  let sum = 0;
  for (let i = 0; i < numbers.size; i++) {
    const potentialSymbols = [
      ...(i !== 0 ? symbols.get(i - 1) : []),
      ...symbols.get(i),
      ...(i !== lines.length - 1 ? symbols.get(i + 1) : []),
    ];
    numbers.get(i).forEach((n: NumberToken) => {
      const symbolFrom = n.startAt - 1;
      const symbolTo = n.endAt + 1;
      const isAdjacent = potentialSymbols.some(
        (s) => s.at >= symbolFrom && s.at <= symbolTo
      );
      if (isAdjacent) {
        sum += n.number;
      }
    });
  }
  console.log("Total sum:", sum);
})();
function findNumberTokens(line: string, lineIndex: number): NumberToken[] {
  const regex = /\d+/g;
  const tokens: NumberToken[] = [];
  let match: RegExpExecArray;

  while ((match = regex.exec(line)) !== null) {
    tokens.push({
      lineIndex: lineIndex,
      startAt: match.index,
      endAt: match.index + match[0].length - 1,
      number: parseInt(match[0]),
    });
  }
  return tokens;
}

function findSymbolTokens(line: string, lineIndex: number): SymbolToken[] {
  const regex = /[^.\d]/g;
  const tokens: SymbolToken[] = [];
  let match: RegExpExecArray;

  while ((match = regex.exec(line)) !== null) {
    tokens.push({
      lineIndex: lineIndex,
      at: match.index,
      symbol: match[0],
    });
  }
  return tokens;
}
