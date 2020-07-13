import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModeloContrato } from './modelo-contrato';
import { ModeloContratoService } from './modelo-contrato.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-modelo-contrato',
  templateUrl: './modelo-contrato.component.html',
  styleUrls: ['./modelo-contrato.component.scss']
})
export class ModeloContratoComponent implements OnInit, AfterViewInit {

  modelosContrato: ModeloContrato[];

  carregandoModelosDeContrato = true;

  constructor(
    private modeloContratoService: ModeloContratoService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;
    setTimeout(function () {
      self.obterModelosDeContrato();
    }, 500);
  }

  obterModelosDeContrato() {
    if (this.modeloContratoService.modelosContrato) {
      this.modelosContrato = this.modeloContratoService.modelosContrato;
      this.carregandoModelosDeContrato = false;
    } else {
      this.modeloContratoService.getOpcoesModeloParaDownload()
        .subscribe(
          (response) => {
            this.modelosContrato = response;
            this.carregandoModelosDeContrato = false;
          },
          (error) => {
            this.carregandoModelosDeContrato = false;
          }
        )
    }
  }

  obterUrlParaDownload(uid) {
    return environment.apiAutogestaoLocacao + 'modelosContrato/downloadModeloContrato/' + uid;
  }

  // downloadArquivo(uid) {
  //   this.modeloContratoService.downloadArquivo(uid)
  //     .subscribe(
  //       (response) => {
  //         console.log('teste', response);
  //         // this.downloadFile(response);
  //       },
  //       (error) => {
  //         console.error('error', error);
  //       }
  //     )
  // }

  // downloadFile(data: any) {
  //   console.log('downloadFile', data);
  //   let blob = new Blob([data.Arquivo], { type: data.ContentType });
  //   let url = window.URL.createObjectURL(blob, data.FineName);
  //   window.open(url);
  // }
}
