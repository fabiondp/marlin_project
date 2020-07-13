import { Endereco } from './endereco';
import { Usuario } from './usuario';

export class UsuarioDto {
  Uid: string;
  Email: string;
  CPFCNPJ: string;
  Nome: string;
  DataNascimento: string;
  Enderecos: Endereco[] = [new Endereco()];
  Senha: string;
  Sexo: '';
  EstadoCivil: '';
  Contatos: any[];
  Cliente = {
    TermoAceite: false,
    Uid: ''
  };
  SenhaAtual: string;
  SenhaNova: string;
  ConfirmacaoSenha: string;
  ResponsavelCPF: string;
  ResponsavelNome: string;

  constructor() {}

  MapFromUsuario(_usuario: Usuario) {
    this.Uid = _usuario.Uid;
    this.Nome = _usuario.Nome;
    this.CPFCNPJ = _usuario.CPFCNPJ;
    this.Email = _usuario.Email.toLowerCase();
    this.ResponsavelCPF = _usuario.ResponsavelCPF;
    this.ResponsavelNome = _usuario.ResponsavelNome;

    if (_usuario.DataNascimento != null) {
      this.DataNascimento = _usuario.DataNascimento.replace(/\//g, '-');
    }

    this.Sexo = _usuario.Sexo;
    this.EstadoCivil = _usuario.EstadoCivil;
    this.Cliente = _usuario.Cliente;
    this.setEnderecos(_usuario.Enderecos);
  }

  setEnderecos(_enderecos: Endereco[]) {
    this.Enderecos = [];

    for (let _endereco of _enderecos) {
      let tmpEndereco = new Endereco();
      tmpEndereco.Logradouro = _endereco.Logradouro;
      tmpEndereco.Numero = _endereco.Numero;
      tmpEndereco.Complemento = _endereco.Complemento;
      tmpEndereco.Bairro = _endereco.Bairro;
      tmpEndereco.Cidade = _endereco.Cidade;
      tmpEndereco.Estado = _endereco.Estado;
      tmpEndereco.CEP = _endereco.CEP;

      this.Enderecos.push(tmpEndereco);
    }
  }
}
