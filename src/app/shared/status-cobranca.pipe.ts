import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusCobranca'
})
export class StatusCobrancaPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 'Pago':
        return 'verde';
      case 'Aguardando pagamento':
        return 'azul';
      case 'Atrasado':
        return 'amarelo';
    }

    return null;
  }
}
