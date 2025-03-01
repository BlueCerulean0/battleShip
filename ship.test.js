import { expect, test } from '@jest/globals';
import { Ship } from "./src/ship.js";


test("make ship", () => {
  const ship = new Ship(4);


  expect(ship).toEqual({length: 4, hitCount: 0, sunk: false})
  

})
