import { Endereco } from 'app/shared/input-busca-cep/endereco';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs';
import { Contato } from 'app/shared/contato';
import { conformToMask } from 'text-mask-core';
export class Locatario {
  Uid: string;
  UidContrato: string;

  TipoPessoa: number;
  CPFCNPJ: string;
  Nome: string;
  Email: string;
  DataNascimento: any;
  Sexo: number;
  Contatos: any[];
  ContatosTelFixo: any[];
  ContatosTelCel: any[];
  Nacionalidade: string;
  EstadoCivil: string;
  Profissao: string;

  ContatoDefault: Contato;

  EnderecoCobranca: Endereco;

  constructor() {
    this.TipoPessoa = 0;
    this.DataNascimento = null;

    this.CPFCNPJ = null;
    this.Nome = null;
    this.Email = '';
    this.Sexo = 1;
    this.Nacionalidade = null;
    this.EstadoCivil = null;
    this.Profissao = null;
    this.ContatoDefault = new Contato();

    this.resetarDados();
  }

  inicializarContatos() {
    this.Contatos = [];
    this.ContatosTelFixo = [
      {
        tipo: 1,
        telefone: ''
      }
    ];

    this.ContatosTelCel = [
      {
        tipo: 2,
        telefone: ''
      }
    ];

    this.EnderecoCobranca = new Endereco();
  }

  resetarDados() {
    this.Uid = '00000000-0000-0000-0000-000000000000';
    this.Nome = null;
    this.Email = null;
    this.DataNascimento = null;
    this.Sexo = 1;
    this.Nacionalidade = null;
    this.EstadoCivil = null;
    this.Profissao = null;
    this.EnderecoCobranca = new Endereco();
    this.inicializarContatos();
  }

  map(data) {
    Object.keys(data).forEach(propertieData => {
      if (this.hasOwnProperty(propertieData)) {
        this[propertieData] = data[propertieData];
      }
    });

    this.mapTipoPessoa(data);
    this.mapDataNascimento(data);
    this.mapContatos(data);
    this.mapEnderecoCobranca(data);
  }

  mapEnderecoCobranca(data) {
    if (data['EnderecoCobranca']) {
      this.EnderecoCobranca = Endereco.map(data['EnderecoCobranca']);
    } else {
      this.EnderecoCobranca = new Endereco();
    }
  }

  mapTipoPessoa(data) {
    if (data['TipoPessoa']) {
      this.TipoPessoa = data['TipoPessoa'];
    }
  }

  mapDataNascimento(data) {
    if (data && data['DataNascimento']) {
      const dataTemp = new Date(data['DataNascimento']).toLocaleDateString(
        'pt-BR',
        { timeZone: 'UTC' }
      );
      this.DataNascimento = dataTemp;
    }
  }

  mapContatos(data) {
    if (!this.Contatos) {
      this.Contatos = [];
    }

    this.mapContatosTelFixo(data);
    this.mapContatosTelCel(data);
  }

  mapContatosTelFixo(data) {
    if (
      this.Contatos !== null &&
      Array.isArray(this.Contatos) &&
      this.Contatos.length > 0 &&
      this.Contatos.some(c => c.TipoContato === 1)
    ) {
      // tslint:disable-next-line:prefer-const
      let contatosTelFixo = this.Contatos.filter(c => c.TipoContato === 1);

      this.ContatosTelFixo = contatosTelFixo.map(c => {
        const contato = {
          tipo: 1,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });

      this.ContatosTelFixo.forEach(contato => {
        const telefoneFormatadoMask = conformToMask(
          contato.telefone,
          this.ContatoDefault.masktel,
          { guide: false }
        );
        contato.telefone = telefoneFormatadoMask.conformedValue;
      });
    }
  }

  mapContatosTelCel(data) {
    if (
      this.Contatos !== null &&
      Array.isArray(this.Contatos) &&
      this.Contatos.length > 0 &&
      this.Contatos.some(c => c.TipoContato === 2)
    ) {
      // tslint:disable-next-line:prefer-const
      let contatosTelCel = this.Contatos.filter(c => c.TipoContato === 2);

      this.ContatosTelCel = contatosTelCel.map(c => {
        const contato = {
          tipo: 2,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });

      this.ContatosTelCel.forEach(contato => {
        const celularFormatadoMask = conformToMask(
          contato.telefone,
          this.ContatoDefault.maskcel,
          { guide: false }
        );
        contato.telefone = celularFormatadoMask.conformedValue;
      });
    }
  }

  mapReverse() {
    this.mapReverseContatos();
  }

  mapReverseContatos() {
    this.Contatos = [];
    this.mapReverseContatosTelFixo();
    this.mapReverseContatosTelCel();
  }

  mapReverseContatosTelFixo() {
    if (this.ContatosTelFixo && this.ContatosTelFixo.length > 0) {
      this.ContatosTelFixo.forEach(contato => {
        const obj = {
          DDD: '',
          Numero: '',
          TipoContato: contato.tipo
        };
        const clearValue = contato.telefone.replace(/\D/g, '');
        obj.DDD = clearValue.substr(0, 2);
        obj.Numero = clearValue.substr(2);
        this.Contatos.push(obj);
      });
    }
  }

  mapReverseContatosTelCel() {
    if (this.ContatosTelCel && this.ContatosTelCel.length > 0) {
      this.ContatosTelCel.forEach(contato => {
        const obj = {
          DDD: '',
          Numero: '',
          TipoContato: contato.tipo
        };
        const clearValue = contato.telefone.replace(/\D/g, '');
        obj.DDD = clearValue.substr(0, 2);
        obj.Numero = clearValue.substr(2);
        this.Contatos.push(obj);
      });
    }
  }

  public possuiUid(): boolean {
    return (
      this.Uid &&
      this.Uid.trim() !== '' &&
      this.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  possuiTelefoneFixoInvalido() {
    return this.ContatosTelFixo.some(t => t.telefone != null && t.telefone.trim() !== '' && (t.telefone.length < 14 || !(new RegExp(this.ContatoDefault.regexPadraoTelefoneFixo).test(t.telefone))));
  }

  possuiTelefoneCelularInvalido() {
    return this.ContatosTelCel.some(t => t.telefone != null && t.telefone.trim() !== '' && (t.telefone.length < 15 || !(new RegExp(this.ContatoDefault.regexPadraoCelular).test(t.telefone))));
  }
}
