export class ConvenioBancario {
  CodigoBanco: string = null;
  Agencia: string;
  Conta: string;
  TipoConta: number = null;
  ResponsavelNome: string;
  ResponsavelCPF: string;
  // Multa = false;
  // JurosMora = false;
  // ValorPercentualMulta: number = null;
  Uid: string;
  CreationDate: string;
  UpdateDate: string;

  map(data) {
    this.CodigoBanco = data['CodigoBanco'];
    this.Agencia = data['Agencia'];
    this.Conta = data['Conta'];
    this.TipoConta = data['TipoConta'];
    this.ResponsavelNome = data['ResponsavelNome'];
    this.ResponsavelCPF = data['ResponsavelCPF'];
    // this.Multa = data['Multa'];
    // this.JurosMora = data['JurosMora'];
    // this.ValorPercentualMulta = data['ValorPercentualMulta'];
    this.CreationDate = data['CreationDate'];
    this.UpdateDate = data['UpdateDate'];
  }
}
