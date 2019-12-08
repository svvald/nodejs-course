const fs = require('fs');
const path = require('path');
const csvToJson = require('csvtojson');

const csvPath = path.resolve(__dirname, 'csv/data.csv');
const txtPath = path.resolve(__dirname, 'txt/data.txt');

const readStream = new fs.ReadStream(csvPath);
const writeStream = new fs.WriteStream(txtPath);

writeStream.on('error', (err) => console.error(err));

readStream.pipe(csvToJson()).pipe(writeStream);
