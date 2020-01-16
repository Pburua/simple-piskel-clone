import {
  convertPixelDataToHexColor, floodFill,
  getBottomYAndRightXOfPixel,
} from './src/js/utils';

test('convertPixelDataToHexColor is working', () => {
  expect(convertPixelDataToHexColor([255, 0, 0])).toBe('#ff0000');

  expect(convertPixelDataToHexColor([0, 255, 0])).toBe('#00ff00');

  expect(convertPixelDataToHexColor([0, 0, 255])).toBe('#0000ff');
});

test('getBottomYAndRightXOfPixel is working', () => {
  expect(getBottomYAndRightXOfPixel(0, 0, 512, 16).toString())
    .toBe({ rightX: 16, bottomY: 16 }.toString());

  expect(getBottomYAndRightXOfPixel(22, 0, 512, 16).toString())
    .toBe({ rightX: 32, bottomY: 16 }.toString());

  expect(getBottomYAndRightXOfPixel(512, 512, 512, 16).toString())
    .toBe({ rightX: 512, bottomY: 512 }.toString());

  expect(getBottomYAndRightXOfPixel(512, 512, 512, 16).toString())
    .toBe({ rightX: 512, bottomY: 512 }.toString());
});

test('floodFill is working', () => {
  const resultArray = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
  ];

  const expectedArray = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2],
    [0, 1, 2, 1, 2],
  ];

  const fromNumber = 0;
  const toNumber = 2;

  floodFill(2, 2, 1,
    (x, y) => {
      resultArray[x][y] = 2;
    },
    (x, y) => {
      // проверка на вхождение по границам
      if (!(x > 0 && x < resultArray.length
        && y > 0 && y < resultArray.length)) return false;
      // проверка на лишнее закрашивание того же цвета
      if (fromNumber === toNumber) return false;
      // проверка на подходящий старый цвет
      if (fromNumber !== resultArray[x][y]) return false;
      return true;
    });

  expect(resultArray.toString()).toBe(expectedArray.toString());
});
