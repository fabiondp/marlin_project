import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeCurrencySymbol'
})
export class RemoveCurrencySymbolPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.substring(3);
  }
}
