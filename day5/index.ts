type Range = {
  startSrcRange: number;
  startDestRange: number;
  rangeLength: number;
};

(async () => {
  const lines = (await Bun.file(`${import.meta.dir}/input.txt`).text())
    .trim()
    .split("\n");
  const content = lines.reduce((prev, current) =>  prev + " " + current, "");
  const parts = content.split(":");
  const seeds = parseAllNumbers(parts[1]);
  // maps
  const soil = parseAndToRange(parts[2]);
  const fertilizer = parseAndToRange(parts[3]);
  const water = parseAndToRange(parts[4]);
  const light = parseAndToRange(parts[5]);
  const temperature = parseAndToRange(parts[6]);
  const humidity = parseAndToRange(parts[7]);
  const location = parseAndToRange(parts[8]);
  const minLocation = Math.min(...seeds.map(seed => {
    const soilValue = getRangeValue(soil, seed);
    const fertilizerValue = getRangeValue(fertilizer, soilValue);
    const waterValue = getRangeValue(water, fertilizerValue);
    const lightValue = getRangeValue(light, waterValue);
    const temperatureValue = getRangeValue(temperature, lightValue);
    const humidityValue = getRangeValue(humidity, temperatureValue);
    const locationValue = getRangeValue(location, humidityValue);
    return locationValue;
  }));
  console.log(minLocation);
})();

function getRangeValue(ranges: Range[], src: number): number {
  for (const range of ranges) {
    if (src >= range.startSrcRange && src < range.startSrcRange + range.rangeLength) {
      return range.startDestRange + (src - range.startSrcRange);
    }
  }
  return src;
}

function parseAndToRange(input: string): Range[] {
  return toRange(parseAllNumbers(input));
}

function parseAllNumbers(input: string): number[] {
  const regex = /\d+/g;
  const numbers: number[] = [];
  let match: RegExpExecArray;
  while ((match = regex.exec(input)) !== null) numbers.push(parseInt(match[0]));
  return numbers;
}

function toRange(values: number[]): Range[] {
  const ranges: Range[] = [];
  for (let i = 0; i < values.length; i += 3) {
    ranges.push({
      startDestRange: values[i],
      startSrcRange: values[i + 1],
      rangeLength: values[i + 2],
    });
  }
  return ranges;
}

