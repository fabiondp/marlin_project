import { Endereco } from './endereco';
import { UsuarioDto } from './usuario-dto';

export class Usuario {
  Uid: string;
  Email: string;
  CPFCNPJ: string;
  Nome: string;
  DataNascimento: string;
  Enderecos: Endereco[] = [new Endereco()];
  Senha: '';
  Sexo: '';
  EstadoCivil: '';
  Contatos: any[];
  Cliente = {
    TermoAceite: false,
    Uid: ''
  };
  ResponsavelNome: string;
  ResponsavelCPF: string;
  UsuarioAreaExclusiva: boolean;
  constructor() {}
}
