import { Component, OnInit } from '@angular/core';

const {log} = console;

@Component({
  selector: 'app-input-telefone',
  templateUrl: './input-telefone.component.html',
  styleUrls: ['./input-telefone.component.scss']
})
export class InputTelefoneComponent implements OnInit {
  minimoTelefone: boolean;
  telefonesCadastrados: any;
  tiposDeContatos = [
    {
      tipo: "",
      descricao: 'Escolha o tipo de telefone'
    },
    {
      tipo: 1,
      descricao: 'Telefone Fixo'
    },
    {
      tipo: 2,
      descricao: 'Telefone Celular'
    }
  ];

  public masktel = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  public maskcel = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  clearMask(value: string) {
    if (value != null) {
      return value.replace(/\D/g, '');
    }
    return null;
  }


  addTelefone() {
    this.telefonesCadastrados.push({ tipo: this.tiposDeContatos[0].tipo, telefone: "" });
    // let length = this.telefonesCadastrados.length;
    this.checkMinimoTelefone();
  }

  deleteTelefone(i) {
    this.telefonesCadastrados.splice(i, 1);
    this.checkMinimoTelefone();
  }

  checkMinimoTelefone() {
    const length = this.telefonesCadastrados.length;
    if (length <= 1) {
      if (this.telefonesCadastrados[0].tipo && this.telefonesCadastrados[0].telefone) {
        this.minimoTelefone = true;
      } else {
        this.minimoTelefone = false;
      }
    } else {
      this.minimoTelefone = true;
    }
  }

  processarTelefones() {
    let telefonesStringArray, telefonesUnicos;
    telefonesStringArray = this.telefonesCadastrados
      .map(el => el.tipo + "," + el.telefone)
      .filter((item, pos, arr) => {
        return arr.indexOf(item) === pos;
      });

    telefonesUnicos = telefonesStringArray.map(el => {
      const obj = { DDD: "", Numero: "", TipoContato: null }
      obj.TipoContato = el.substr(0, 1);
      obj.DDD = el.substr(2, 2);
      obj.Numero = el.substr(4);
      return obj;
    });

    log(telefonesUnicos);

    return telefonesUnicos;
  }

  constructor() { }

  ngOnInit() {
  }

}
