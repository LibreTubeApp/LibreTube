import parseXml, { secondsToHoursAndSeconds } from './parseXml';
import mockData from './mockTranscript.js';

describe('the parseXml util', () => {
  it('should parse the XML properly', async () => {
    const parsed = await parseXml(mockData);
    expect(parsed).toMatchSnapshot();
  });
  it('should convert seconds to hours and seconds', () => {
    expect(secondsToHoursAndSeconds(240)).toBe('04:00.000');
    expect(secondsToHoursAndSeconds(1432)).toBe('23:52.000');
  });
});
