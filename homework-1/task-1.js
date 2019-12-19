import { Transform } from 'stream';

class Reverse extends Transform {
  constructor() {
    super();
    this.newLineRegex = /\r?\n|\r/g;
  }

  _transform(data, encoding, callback) {
    const transformed = data.toString().replace(this.newLineRegex, '').split('').reverse().join('');

    callback(null, transformed);
  }
}

const reverse = new Reverse();

process.stdin.pipe(reverse).pipe(process.stdout);
