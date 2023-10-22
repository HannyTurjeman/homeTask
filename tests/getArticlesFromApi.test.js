const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const fetchMock = require('jest-fetch-mock');

const { getArticlesFromApi } = require('../script.js');
const { mockResponseData } = require('./mockData.js');


const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost',
});
global.window = jsdom.window;
global.document = jsdom.window.document;

fetchMock.enableMocks();
global.fetch = fetchMock;

const apiUrl = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=4&source.type=video&source.id=214321562187&source.url= http://www.site.com/videos/214321562187.html";


describe('testing getArticlesFromApi function', () => {
    beforeEach(() => {
        document.body.innerHTML = '<ul id="list"></ul>';
    });

    test('getArticlesFromApi() API Request returns a promise', () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockResponseData));
        expect.assertions(1);
        const result = getArticlesFromApi(apiUrl);
        expect(result).toBeInstanceOf(Promise);
    });

    test('fetches articles and extract the list', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockResponseData));
        try {
            const mockResponse = await getArticlesFromApi(apiUrl);
            if (mockResponse && Array.isArray(mockResponse.list)) {
                expect(mockResponse.list.length).toBeGreaterThan(0);
            } else {
                console.log('Response is not valid JSON');
            }
        } catch (e) {
            console.log(e);
        }
    });

    test('Checking error for API request failure', async () => {
        fetchMock.mockReject(new Error('API request failed'));
        try {
            await getArticlesFromApi(apiUrl);
        } catch (e) {
            console.log(e);
            expect(e.message).toBe('API request failed');
        }
    });
});
