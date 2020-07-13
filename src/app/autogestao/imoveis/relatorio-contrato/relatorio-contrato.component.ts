import { Component, OnInit } from "@angular/core";
import { moment } from "ngx-bootstrap/chronos/test/chain";
import { NgForm } from "@angular/forms";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import { MessageService } from "../../../services/message.service";
import { RelatorioContratoService } from "./relatorio-contrato.service";

@Component({
  selector: "app-relatorio-contrato",
  templateUrl: "./relatorio-contrato.component.html",
  styleUrls: ["./relatorio-contrato.component.scss"]
})
export class RelatorioContratoComponent implements OnInit {
  carregando = false;
  carregandoFiltro = true;
  message = null;
  typeMessage = null;
  timeMessage = null;
  contratos = [];
  tiposRelatorios = [];
  isCollapsed = false;
  iconCollapse = "glyphicon-chevron-up";
  textCollapse: string;
  bsConfig: Partial<BsDatepickerConfig>;
  datepickerModel: Date;
  daterangepickerModel: Date[];
  filtro = {
    tipoFiltro: null,
    mes: null,
    ano: null
  };
  meses = [
    {
      value: 1,
      mes: "Janeiro"
    },
    {
      value: 2,
      mes: "Fevereiro"
    },
    {
      value: 3,
      mes: "Março"
    },
    {
      value: 4,
      mes: "Abril"
    },
    {
      value: 5,
      mes: "Maio"
    },
    {
      value: 6,
      mes: "Junho"
    },
    {
      value: 7,
      mes: "Julho"
    },
    {
      value: 8,
      mes: "Agosto"
    },
    {
      value: 9,
      mes: "Setembro"
    },
    {
      value: 10,
      mes: "Outubro"
    },
    {
      value: 11,
      mes: "Novembro"
    },
    {
      value: 12,
      mes: "Dezembro"
    }
  ];

  constructor(
    private relatorioContratoService: RelatorioContratoService,
    private messageService: MessageService,
    private localeService: BsLocaleService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
    this.localeService.use("pt-br");
    this.bsConfig = Object.assign({}, { containerClass: "theme-orange" });
  }

  ngOnInit() {
    this.obterOpcoesTipoFiltro();
  }

  obterOpcoesTipoFiltro() {
    this.relatorioContratoService.obterOpcoesTipoFiltro().subscribe(
      response => {
        this.tiposRelatorios = response;
        this.carregarFiltro();
        // this.relatorioContrato();
        this.carregandoFiltro = false;
      },
      error => {}
    );
  }

  collapsed(): void {
    this.textCollapse = "collapsed";
    this.iconCollapse = "glyphicons-chevron-down";
  }

  expanded(): void {
    this.textCollapse = "expanded";
    this.iconCollapse = "glyphicons-chevron-up";
  }

  relatorioContrato() {
    this.messageService.message = null;
    this.messageService.typeMessage = null;
    this.messageService.timeMessage = null;
    this.carregando = true;

    const dataBusca = this.mapReverseFiltro();
    this.relatorioContratoService.relatorioContrato(dataBusca).subscribe(
      data => {
        this.contratos = data;
        this.carregando = false;
      },
      error => {
        this.contratos = [];
        this.carregando = false;
        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (typeof error === "object") {
          this.message = [error.error.Message];
        } else if (typeof error === "string") {
          this.message = [error];
        } else {
          this.message = ["Erro inesperado."];
        }
        this.typeMessage = "danger";
        window.scrollTo(0, 0);
      }
    );
  }

  limpar() {
    this.filtro = {
      tipoFiltro: this.tiposRelatorios[0].Id,
      mes: this.meses[moment().month()].value,
      ano: moment().year()
    };
  }

  buscar(filtroForm: NgForm) {
    if (filtroForm.valid) {
      this.relatorioContrato();
    }
  }

  mapReverseFiltro(): any {
    const filtro = {
      tipoFiltro: this.filtro.tipoFiltro,
      mes: this.filtro.mes,
      ano: this.filtro.ano
    };
    return filtro;
  }

  carregarFiltro() {
    this.limpar();
    this.relatorioContrato();
  }
}
