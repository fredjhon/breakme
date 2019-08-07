import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'breakme';
  msg: string = 'Microsoft TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript.';
  binaries: string;
  cipherMsg: string;
  decipherMsg: string;
  mod: number;
  ir: number[];
  dateValues: number[];
  ic: number[];
  keyIndex: string;
  key: string;
  date: Date = new Date();
  isRandomKey: boolean = true;
  cicles: number = 2; //asdfasdf

  resetDate(): void {
    this.date = new Date();
  }

  setDate(date: string): void {
    if(new Date(date)) {
      this.date = new Date(date);
    }
  }

  setRandomKey(b): void {
    this.isRandomKey = b;
  }

  zeroPad(num: string): string {
    return "00000000".slice(String(num).length) + num;
  }

  convertToBin(msg: string, keepMod?: boolean): string[] {
    let binaries: string[] = [];
    for (var i = 0; i < msg.length; i++) {
      let byte = msg[i].charCodeAt(0).toString(2);
      binaries.push(this.zeroPad(byte));
    }

    const mod: number = binaries.length % 3;
    if (keepMod) this.mod = mod;
    //console.log('mod',mod);

    if (mod != 0) {
      for (let i = 3 - mod; i > 0; i--) {
        binaries.push('01100011');
      }
    }
    return binaries;
  }

  getDateValues(array: string[]): number[] {
    let values: number[] = [];
    for (let i = 0; i < array.length; i++) {
      values[i] = parseInt(array[i]);
    }
    return values;
  }

  datePad(array: string[]): string {
    let values: string = '';
    let mod: number = array.length % 3;

    values += '-date-';
    if (mod != 0) {
      for (let i = 3 - mod; i > 0; i--) {
        values += '-';
      }
    }
    // mod = (values + array.join('')).length % 3;
    // console.log('mod',mod, values + array.join(''));
    return values + array.join('');
  }

  cipher(msg: string, key: string): void {
    // if (!msg) msg = atob(this.msg);
    let date: Date = this.date.getTime() ? this.date : new Date();    
    let arrayDate: string[] = String(date.getTime()).split('');
    let dateValues: number[] = this.getDateValues(arrayDate);
    let dateBin: string[] = this.convertToBin(this.datePad(arrayDate));

    // if(dateValues.length % 3 == 0) 
    // console.log( 'size OK', String(new Date().getTime()));

    if (!msg) msg = this.msg;
    // if (!this.isRandomKey) key = this.key;

    // console.log('msg', this.msg);
    let binaries: string[] = this.convertToBin(msg, true);

    //add mod
    let modBin: string[] = this.convertToBin(String(this.mod));
    for (let x = 0; x < modBin.length; x++) {
      binaries.push(modBin[x]);
    }
    // console.log('binaries', binaries);


    let ir: number[] = [];
    let ic: number[] = [];

    if (key) {
      ir = this.getKeyDec(key.substr(0, 8));
      ic = this.getKeyDec(key.substr(8, 16));
      //console.log(key, ir, ic);
      ir = this.getFirstKey(binaries, ir, dateValues, dateBin);
      ic = this.getFirstKey(binaries, ic, dateValues, dateBin);
      //console.log(key, ir, ic);

    } else {
      ir = this.setRandomValues();
      ic = this.setRandomValues();

    }

    let bits: string[] = this.cipherRun(binaries, ir, ic, dateValues);
    // console.log(this.ir, this.ic);

    let bitsDate: string[] = this.cipherRun(dateBin, this.ir, this.ic);

    bits = bits.concat(bitsDate);
    // console.log(bits);
    // console.log('dat', arrayDate.join(''));

    // this.dateValues = dateValues;
    this.key = this.getKeyHex(this.ir) + this.getKeyHex(this.ic);
    this.cipherMsg = btoa(this.convertFromBin(bits.join('')));
    // this.cipherMsg = this.convertFromBin(bits.join(''));
    this.decipher(this.cipherMsg, this.key);
  }

  cipherRun(binaries: string[], ir: number[], ic: number[], dateValues?: number[]): string[] {
    let bits: string[] = [];
    let bits24: string = '';
    // let nextBits24: string = '';
    // let cicles: number = 2;
    for (let i = 0; i < binaries.length; i += 3) {
      bits24 = binaries[i] + binaries[i + 1] + binaries[i + 2];
      // console.log(this.convertFromBin(bits24));

      for (let j = 0; j < this.cicles; j++) {
        bits24 = this.cipher24(bits24, ir, ic);
      }
      // console.log('log', i, 'len', binaries.length);

      if (i + 3 < binaries.length) {
        //nextBits24 = binaries[i + 3] + binaries[i + 4] + binaries[i + 5];
        // console.log(binaries[i+3] , binaries[i+4] , binaries[i+5]);
        // console.log(i, ir, ic);

        ir = this.newKeyCipher(ir, dateValues);
        ic = this.newKeyCipher(ic, dateValues);
      }

      ///console.log(this.ir, this.ic);
      // console.log('bits24', bits24);

      bits.push(bits24);
    }
    this.ic = ic;
    this.ir = ir;
    return bits;
  }

  getKeyHex(keys: number[]): string {
    let key: string = '';
    for (let i = 0; i < keys.length; i++) {
      key = key + keys[i].toString(16)
    }
    return key;
  }

  convertFromBin(bits: string): string {
    let msg: string = '';
    for (let i = 0; i < bits.length; i += 8) {
      let bin = bits.slice(i, i + 8);
      msg += String.fromCharCode(parseInt(bin, 2));
      //console.log(msg);
    }
    return msg;
  }

  getRandom(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getFirstKey(binaries: string[], values: number[], dateValues: number[], dateBin: string[]): number[] {
    // console.log('firstKey');
    let keys: number[] = values;
    for (let i = binaries.length - 1; i > 3; i -= 3) {
      keys = this.newKeyDecipher(keys, dateValues);
    }

    for (let i = dateBin.length - 1; i > 3; i -= 3) {
      keys = this.newKeyDecipher(keys);

    }
    return keys;
  }

  setRandomValues(): number[] {
    let keys: number[] = [];
    for (let i = 0; i < 8; i++) {
      keys[i] = this.getRandom(16);
    }
    return keys;
  }

  upRoulette(array: number[], v: number): number[] {
    let values: number[] = [];
    if (v == 0) v = 1;
    for (let i = 0; i < array.length; i++) {
      let num = array[i] + v;
      if (num > 15) num = 0;
      values[i] = num;
    }
    return values;
  }

  downRoulette(array: number[], v: number): number[] {
    let values: number[] = [];
    if (v == 0) v = 1;
    for (let i = 0; i < array.length; i++) {
      let num = array[i] - v;
      if (num < 0) num = 15;
      values[i] = num;
    }
    return values;
  }

  newKeyCipher(randValues: number[], dateValues?: number[]): number[] {
    let values: number[] = this.upRoulette(randValues, 0);
    // let values: number[] = randValues;
    //let f: number[] = this.calcFrequency(bits);

    if (dateValues) {
      for (let j = 0; j < dateValues.length; j++) {
        //console.log(f[i]);
        for (let i = 0; i < values.length; i++) {
          let calc = values[i] + dateValues[j];
          if (calc > 15) calc = calc - 16;
          values[i] = calc;
        }
      }
    }

    return values;
  }

  newKeyDecipher(randValues: number[], dateValues?: number[]): number[] {
    let values: number[] = this.downRoulette(randValues, 0);
    // let values: number[] = randValues;
    // let f: number[] = this.calcFrequency(bits);//

    if (dateValues) {
      for (let j = 0; j < dateValues.length; j++) {
        // console.log(j);
        for (let i = 0; i < values.length; i++) {
          let calc = 0;
          calc = values[i] - dateValues[j];
          if (calc < 0) calc = calc + 16;

          values[i] = calc;
        }
      }
    }

    return values;
  }

  cipher24(bits: string, ir: number[], ic: number[]): string {
    let keyIndex: string = '';
    let values: string[] = bits.split('');
    //console.log(values);

    for (let j = 0; j < 8; j++) {
      //remove value
      keyIndex += values[ir[j]];
      values.splice(ir[j], 1);
      //console.log(keyIndex, this.ir[j], values);

      //change value
      let a = values[0];
      let b = values[ic[j]];
      values[0] = b;
      values[ic[j]] = a;
    }

    // console.log('HERE', keyIndex,  values);
    // console.log('values', values);
    // console.log('values', values.join(''));
    // console.log('k', this.ir, this.ic);
    return values.join('') + keyIndex;
  }

  decipher(msg: string, key: string) {
    // console.log(msg, key);
    msg = atob(msg);
    let ir: number[] = this.getKeyDec(key.substr(0, 8));
    let ic: number[] = this.getKeyDec(key.substr(8, 16));
    // console.log('k', ir, ic);

    let binaries: string[] = this.convertToBin(msg);
    // console.log('binaries', binaries);
    let mod: number = 0;

    let bits: string[] = [];
    let bits24: string = '';
    // let cicles: number = 2;
    let dateValues: number[];
    let arrayDate: string[] = [];
    for (let i = binaries.length - 1; i > 0; i -= 3) {

      bits24 = binaries[i - 2] + binaries[i - 1] + binaries[i];

      // bits24 = this.decipher24(bits24, ir, ic);
      for (let j = 0; j < this.cicles; j++) {
        bits24 = this.decipher24(bits24, ir, ic);
      }

      if (i - 3 > 0) {
        //console.log('nextBits24', nextBits24);

        ir = this.newKeyDecipher(ir, dateValues);
        ic = this.newKeyDecipher(ic, dateValues);
      }
      //console.log(this.convertFromBin(bits24));

      if (dateValues) {
        if (mod > 0) {
          bits24 = bits24.substr(0, mod * 8);
          mod = 0;
          bits.push('');
        }
        if (bits.length == 0) mod = parseInt(this.convertFromBin(bits24));

        if (bits.length >= 1) bits.unshift(bits24);
      } else {
        let data: string = this.convertFromBin(bits24);
        // console.log(data);
        if (data == '-da') {
          let timeString: string = arrayDate.join('').replace(/[^\d.]/g, '');
          // console.log(timeString);
          ir = this.upRoulette(ir, 0);
          ic = this.upRoulette(ic, 0);
          dateValues = this.getDateValues(timeString.split(''));
        }
        arrayDate.unshift(data);
      }

    }
    // console.log('dat', arrayDate.join(''));

    this.decipherMsg = this.convertFromBin(bits.join(''));

  }

  decipher24(bits: string, ir: number[], ic: number[]): string {
    let keyIndex: string = bits.substr(16, 24);
    let values: string[] = bits.substr(0, 16).split('');
    //console.log(values, keyIndex);

    for (let j = 7; j >= 0; j--) {
      //change value
      let a = values[0];
      let b = values[ic[j]];
      values[0] = b;
      values[ic[j]] = a;

      //insert value
      values.splice(ir[j], 0, keyIndex[j]);
      // console.log(ir[j], keyIndex[j]);
      //console.log('>', values); 
    }
    //console.log(keyIndex, this.ir, this.ic, values);
    // console.log('values', values);
    // console.log('values', values.join(''));
    // console.log('k', ir, ic);
    return values.join('');
  }

  getKeyDec(hex: string): number[] {
    // console.log(hex);
    let values: number[] = [];
    for (let i = 0; i < hex.length; i++) {
      values[i] = parseInt(hex[i], 16);
    }
    return values;
  }
}