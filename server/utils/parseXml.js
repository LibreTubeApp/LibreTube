import leftPad from 'left-pad';
import xml2js from 'xml2js';

const pad = input => leftPad(input, 2, 0);

export const secondsToHoursAndSeconds = time => {
  const minutes = Math.floor(time / 60);
  const seconds = parseInt(time - minutes * 60, 10);
  const milliseconds = parseInt((((time - minutes * 60) % 1) * 1000), 10);

  if (minutes >= 60) {
    const hours = Math.floor(minutes);
    const minutes = minutes - hours * 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
  }

  return `${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
};

const convertToVTT = json => (
  `WEBVTT

${json.transcript.text.map(item => {
    const { start, dur } = item.$;
    const fromTime = secondsToHoursAndSeconds(start);
    const toTime = secondsToHoursAndSeconds(+start + +dur);
    if (toTime.startsWith('NaN')) {
      console.log('toTime, start, dur', toTime, start, dur);
    }
    return `${fromTime} --> ${toTime}\n${item._}`;
  }).join('\n\n')}`
);

export default xml => new Promise((resolve, reject) => {
  const parseString = xml2js.parseString;
  parseString(xml, function (err, result) {
    if (err) reject(err);
    const formattedResult = convertToVTT(result);
    resolve(formattedResult);
  });
});
