import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs/promises';
import Model from "./model.js";

global.fetch = async () => {
    const data = await fs.readFile("./words.json", 'utf8');
    const words = JSON.parse(data);
    return {
        json: async () => words
    };
};

test("correct words should not be marked as spelling mistakes, despite being adjacent to punctuation characters", async () => {
    const model = new Model();
    await model.loadDictionary();
    assert.deepEqual(model.checkWord('north'), true);
    assert.deepEqual(model.checkWord('right,'), true);
    assert.deepEqual(model.checkWord('not-wrong'), true);
});

test("wrong words should be marked as spelling mistakes, despite being adjacent to punctuation characters", async () => {
    const model = new Model();
    await model.loadDictionary();
    assert.deepEqual(model.checkWord('nord'), false);
    assert.deepEqual(model.checkWord('worng,'), false);
    assert.deepEqual(model.checkWord('nt-crrect'), false);
});

test("function getWrongWords returns empty array is all words correct", async () => {
    const model = new Model();
    await model.loadDictionary();
    assert.deepEqual(model.getWrongWords(['he', 'go', 'to', 'the', 'island']), []);
    assert.deepEqual(model.getWrongWords(['they', 'make', 'a', 'fire']), []);
    assert.deepEqual(model.getWrongWords(['he', 'will', 'get,', 'married,', 'she', 'will', 'not']), []);
    assert.deepEqual(model.getWrongWords(['red-orange', 'fire']), []);
    /*
    assert.deepEqual(model.getWrongWords(['I', 'love', 'Glasgow']), []);
    */
});

test("function getWrongWords returns words not contained in dictionary as array", async () => {
    const model = new Model();
    await model.loadDictionary();
    assert.deepEqual(model.getWrongWords(['hello', 'world']), ['hello', 'world']);
    assert.deepEqual(model.getWrongWords(['she', 'give', 'gift,', 'then', 'go', 'out']), ['gift,']);
    assert.deepEqual(model.getWrongWords(['they', 'create', 'some', 'dinner']), ['create', 'dinner']);
    assert.deepEqual(model.getWrongWords(['he', 'like', 'egg - nog']), ['egg - nog']);
    assert.deepEqual(model.getWrongWords(['go', 'to', 'birmingham']), ['birmingham']);
});

test("wrong word added to dict passes check", () => {
    const model = new Model();
    const wrongWord = "wrong";
    assert.deepEqual(model.checkWord(wrongWord), false);
    model.addToDict([wrongWord]);
    assert.deepEqual(model.checkWord(wrongWord), true);
});