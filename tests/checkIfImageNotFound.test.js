const fetchMock = require('jest-fetch-mock');
const { checkIfImageNotFound } = require('../script.js');

fetchMock.enableMocks();
global.fetch = fetchMock;

describe('testing checkIfImageNotFound function', () => {
    test('should handle image not found error', () => {
        const imgElement = document.createElement('img');
        imgElement.src = 'http://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fdobuhdo.com%2Fimages%2Fblog%2F70e3db8347.jpg';
        checkIfImageNotFound(imgElement);

        imgElement.addEventListener('error', () => {
            expect(imgElement.src).toBe('https://cdn.taboola.com/static/impl/png/fallbackImage.png');
            done();
        });
    });
});
