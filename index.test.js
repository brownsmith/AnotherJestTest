// ./node_modules/.bin/jest index.test.js --passWithNoTests
// -> nvm use 10
const thing = {
  items: [{
    id: 'x',
    amount: 10,
    setup: false,
  },
  {
    id: 'y',
    amount: 20,
    setup: false,
  }]
};

const thing2 = {
  items: [{
    id: 'xy',
    amount: 10,
    setup: false,
  },
  {
    id: 'yz',
    amount: 20,
    setup: false,
  }]
};

const item = { amount: 10, id: 'x', setup: false };
const newItem = { amount: 99, id: 'a', setup: true };

const findItemById = (arr, id) => arr.filter(x => x.id === id);
const isItemInArray = (arr, id) => !!arr.filter(x => x.id === id).length;
const addItemToArray = (arr, itemToAdd) => [...arr, itemToAdd];

const removeItemById = (array, key, value) => {
  const index = array.findIndex(obj => obj[key] === value);
  return index >= 0 ? [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ] : array;
}

const removeOrAddItemInArray = (arr, item) => {
  if (isItemInArray(arr, item.id)) {
    return removeItemById(arr, 'id', item.id);
  }
  return addItemToArray(arr, item);
};

const switchBoolValueById = (items, idOfItem) => {
  const itemToSwitch = findItemById(items.items, idOfItem)[0];
  const { id, amount, setup } = itemToSwitch;
  return [{ id, amount, setup: !setup }];
}

test('switch boolean', () => {
  expect(switchBoolValueById(thing, 'x')).toEqual([{ amount: 10, id: 'x', setup: true }]);
  expect(switchBoolValueById(thing, 'y')).toEqual([{ amount: 20, id: 'y', setup: true }]);
  expect(switchBoolValueById(thing2, 'xy')).toEqual([{ amount: 10, id: 'xy', setup: true }]);
});

describe('check if item exists in array, if it does - remove, it it does not - add', () => {
  test('remove item if already exists', () => {
    expect(removeOrAddItemInArray(thing.items, item)).toEqual([{ amount: 20, id: 'y', setup: false }]);
    expect(removeOrAddItemInArray(thing.items, { amount: 20, id: 'y', setup: false })).toEqual([{ amount: 10, id: 'x', setup: false }]);
    expect(removeOrAddItemInArray(thing2.items, { id: 'yz', amount: 20, setup: false, })).toEqual([{ amount: 10, id: 'xy', setup: false }]);
  })
  test('add item if it does not exist', () => {
    expect(removeOrAddItemInArray(thing2.items, newItem)).toEqual([{ amount: 10, id: 'xy', setup: false }, { amount: 20, id: 'yz', setup: false }, { amount: 99, id: 'a', setup: true }]);
    expect(removeOrAddItemInArray(thing2.items, item)).toEqual([{ amount: 10, id: 'xy', setup: false }, { amount: 20, id: 'yz', setup: false }, { amount: 10, id: 'x', setup: false }]);
    expect(removeOrAddItemInArray(thing.items, newItem)).toEqual([{ amount: 10, id: 'x', setup: false }, { amount: 20, id: 'y', setup: false }, { amount: 99, id: 'a', setup: true }]);
  })
});

test('find item in array by id', () => {
  expect(findItemById(thing.items, 'x')).toEqual([{ amount: 10, id: 'x', setup: false }]);
});

test('is item in array of objects?', () => {
  expect(isItemInArray(thing.items, 'x')).toEqual(true);
  expect(isItemInArray(thing.items, 'abc')).toEqual(false);
  expect(isItemInArray(thing2.items, 'abc')).toEqual(false);
  expect(isItemInArray(thing2.items, 'xy')).toEqual(true);
});

test('remove item in array of objects by id', () => {
  expect(removeItemById(thing.items, "id", 'x')).toEqual([{ amount: 20, id: 'y', setup: false }]);
  expect(removeItemById(thing.items, "id", 'z')).toEqual([{ amount: 10, id: 'x', setup: false }, { amount: 20, id: 'y', setup: false }]);
  expect(removeItemById(thing2.items, "id", 'xy')).toEqual([{ amount: 20, id: 'yz', setup: false }]);
});

test('add new item to array of objects', () => {
  expect(addItemToArray(thing.items, newItem)).toEqual([{ amount: 10, id: 'x', setup: false }, { amount: 20, id: 'y', setup: false }, { amount: 99, id: 'a', setup: true }]);
  expect(addItemToArray(thing2.items, item)).toEqual([{ id: 'xy', amount: 10, setup: false, }, { id: 'yz', amount: 20, setup: false, }, { amount: 10, id: 'x', setup: false }]);
});
