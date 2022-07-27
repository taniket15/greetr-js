import jQuery from "jquery";

/**
 *  Greetr G$()
 *  Author: Taniket Mehra
 *  GithubId: taniket15
 *  Date: 27th July 2022
 */
(function (global, $) {

    // Initialization Class
    class GreetrInit {
        #supportedLanguages = ["en", "es"];

        // informal greetings
        #greetings = {
            en: "Hello",
            es: "Hola",
        };

        // formal greetings
        #formalGreetings = {
            en: "Greetings",
            es: "Saludos",
        };

        // logger messages
        #logMessages = {
            en: "Logged in",
            es: "Inició sesión",
        };

        constructor(firstName = "", lastName = "", language = "en") {
            this.firstName = firstName;
            this.lastName = lastName;
            this.language = language;
        }

        fullname() {
            return `${this.firstName} ${this.lastName}`;
        }

        validateLanguage(newLanguage) {
            // check that is a valid language
            // references the externally inaccessible 'supportedLanguages' within the closure
            if (!this.#supportedLanguages.includes(newLanguage)) {
                throw new Error("Invalid Language!");
            }
            return true;
        }

        greeting() {
            return `${this.#greetings[this.language]} ${this.firstName}!`;
        }

        formalGreeting() {
            return `${this.#formalGreetings[this.language]} ${this.fullname()}`;
        }

        greet(isFormal = false) {
            let msg = "";

            if (isFormal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            console.log(msg);

            // makes method chainable
            return this;
        }
        setLanguage(newLanguage) {
            this.language = newLanguage;
            this.validateLanguage(newLanguage);
            return this;
        }

        log() {
            console.log(
                `${this.#logMessages[this.language]}: ${this.fullname()}`
            );
            return this;
        }

        HTMLGreeting(selector, isFormal) {
            if (!$) {
                throw new Error("jQuery not loaded!");
            }
            if (!selector) {
                throw new Error("Selector not present!");
            }

            let msg = "";
            if (isFormal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // inject the msg in the chosen place in DOM
            $(selector).html(msg);

            return this;
        }
    }

    // 'new' an object
    const Greetr = function (firstName, lastName, language) {
        return new GreetrInit(firstName, lastName, language);
    };

    // attach our Greetr to hte global object, and provide a shorthand 'G$' for ease usage
    global.Greetr = global.G$ = Greetr;
})(window !== undefined ? window : this, jQuery);
