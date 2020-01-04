import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstPipe'
})
export class CapitalizeFirstPipePipe implements PipeTransform {

  transform(value: string, args?: any[]): string {
    console.log(value)
    if (value === null) return null;
    let words = value.split(' ');
    for (var i = 0; i < words.length; i++) {
      let word = words[i];
      if (word !== null) {
        words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    }
    return value = words.join('');
  }

}
