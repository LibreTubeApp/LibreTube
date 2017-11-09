import parseXml from '../../src/utils/parseXml';
import mockData from './mockTranscript.js';

describe('the parseXml util', () => {
  it('should parse the XML properly', async () => {
    const parsed = await parseXml(mockData);
    expect(parsed).toMatchSnapshot();
  });
});
