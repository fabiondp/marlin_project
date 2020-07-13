import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contadorCaracteres',
  pure: true
})
export class ContadorCaracteresPipe implements PipeTransform {
  transform(text: string, args: number) {
    let maxLength = args || 0;
    let length = text.length;

    return maxLength - length;
  }
}
