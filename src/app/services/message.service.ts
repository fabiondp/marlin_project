import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  public message = null;
  public typeMessage = null;
  public timeMessage = null;
  /*
  Para o tipo de mensagem usar as cores dos alerts do  bootstrap
  --------------------------------------------------------------
  success
  info
  warning
  danger
  */
  constructor() {}
}
