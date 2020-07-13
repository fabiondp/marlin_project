import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusBoleto'
})
export class StatusBoletoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 'Pendente':
        return 'amarelo';
      case 'Parcialmente pago':
        return 'amarelo';
      case 'Em protesto':
        return 'amarelo';

      case 'Pago':
        return 'verde';

      case 'Expirado':
        return 'vermelho';
      case 'Cancelado':
        return 'vermelho';
      case 'Falha de pagamento':
        return 'vermelho';
      case 'Falha de emissão':
        return 'vermelho';

      case 'Em processo de emissão':
        return 'azul';
      case 'Reembolsado':
        return 'azul';
      case 'Autorizado':
        return 'azul';
      case 'AutorEstornadoizado':
        return 'azul';
    }

    return null;
  }
}
