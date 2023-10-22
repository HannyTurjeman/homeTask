const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const fetchMock = require('jest-fetch-mock');

const { createWidgetElements } = require('../script.js');
const { mockSCItem, mockOCItem, mockVideoItem } = require('./mockData.js');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost',
});
global.window = jsdom.window;
global.document = jsdom.window.document;

fetchMock.enableMocks();
global.fetch = fetchMock;

describe('testing createWidgetElements function', () => {
    beforeEach(() => {
        document.body.innerHTML = '<ul id="list"></ul>';
    });

    test('should create the sponsored item elements and append elements to the list element', () => {
        createWidgetElements(mockSCItem);

        const $list = document.getElementById('list');
        const liElements = $list.querySelectorAll('li');

        expect($list).toBeDefined();
        expect(liElements.length).toBe(1);
        expect(liElements[0].querySelector('a')).toBeDefined();
        expect(liElements[0].querySelector('img')).toBeDefined();
        expect(liElements[0].querySelector('h2').innerText).toBe('The 12 White Sneakers You Need Now');
        expect(liElements[0].querySelector('p').innerText).toBe('Accessories');

    });

    test('should create the organic item elements and append elements to the list element', () => {
        createWidgetElements(mockOCItem);

        const $list = document.getElementById('list');
        const liElements = $list.querySelectorAll('li');

        expect($list).toBeDefined();
        expect(liElements.length).toBe(1);
        expect(liElements[0].querySelector('a')).toBeDefined();
        expect(liElements[0].querySelector('img')).toBeDefined();
        expect(liElements[0].querySelector('h2').innerText).toBe('The 12 White Sneakers You Need Now');
        expect(liElements[0].querySelector('p')).toBeNull();

    });

    test('should create unfefined type of item elements and append elements to the list element', () => {
        createWidgetElements(mockVideoItem);

        const $list = document.getElementById('list');
        const liElements = $list.querySelectorAll('li');

        expect($list).toBeDefined();
        expect(liElements.length).toBe(1);
        expect(liElements[0].querySelector('a')).toBeDefined();
        expect(liElements[0].querySelector('img')).toBeDefined();
        expect(liElements[0].querySelector('h2').innerText).toBe('The 12 White Sneakers You Need Now');
        expect(liElements[0].querySelector('p')).toBeNull();

    });

});
