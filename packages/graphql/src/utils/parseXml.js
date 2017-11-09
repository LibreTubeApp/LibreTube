import xml2js from 'xml2js';

const convertToVTT = json => (
  `WEBVTT

${json.transcript.text.map(item => {
    const { start, dur } = item.$;
    return `${+start} --> ${+start + +dur}\n${item._}`;
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
