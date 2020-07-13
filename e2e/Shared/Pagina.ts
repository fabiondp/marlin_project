import { element, by } from "protractor";
import { WindowService } from "./Window";

export class PaginaService extends WindowService {
  getElementByClass(className) {
    var texto = element(by.className(className));
    return texto;
  }


  getElementById(id) {
    return element(by.id(id));
  }

  getElementByXpath(xpath) {
    var texto = element(by.xpath(xpath));
    return texto;
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }


}