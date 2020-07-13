import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'detailInfo' })
export class DetailInfoPipe implements PipeTransform {
  transform(value, unity, debug) {
    if (debug) {
      console.log(typeof (value), value);
    }

    if (typeof (value) === "boolean") {
      return value ? "Sim" : "Não";
    }

    if (value == null || value <= 0) {
      return "-";
    }

    if (unity) {
      return value + unity;
    }

    return value;
  }
}
