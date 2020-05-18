import { observable } from 'mobx';
import _formatMessage = require("format-message");

const LOCALE = "locale";

export class LocaleStore {

    @observable
    private _locale = "";

    private translations: { [key: string]: { [id: string]: string } }

    constructor(defaultLocale: string, translations: { [key: string]: { [id: string]: string } }) {
        this.translations = translations;

        if (typeof (Storage) !== "undefined") {
            const storedLocale = localStorage.getItem(LOCALE);
            this.value = storedLocale && storedLocale in translations
                ? storedLocale
                : defaultLocale;
        } else {
            this.value = defaultLocale;
        }
    };

    get value(): string {
        return this._locale;
    };

    set value(value: string) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(LOCALE, value);
        }
        this._locale = value;
    }

    get messages(): { [key: string]: string } {
        return this.translations[this.value]
    }

    formatMessage = (id: string, values: object) => {
        if (!(id in this.messages)) {
            console.warn("Id not found in intl list: " + id)
            return id;
        }
        return _formatMessage(this.messages[id], values);
    }
}
