import { browser } from "protractor";
import { MeusAnuncios } from "../MeusAnuncios/MeusAnuncios.po";

export class WindowService {
    getTitle() {
        return browser.getTitle();
    }

    navigateTo(url) {
        return browser.get(url);
    }

    wait() {
        browser.sleep(5000);
    }

    setAttribute() {
        browser.executeScript('var element = document.getElementById(\'Plano\');');
        browser.executeScript('element.options[1].selected=\'selected\'');
    }

}