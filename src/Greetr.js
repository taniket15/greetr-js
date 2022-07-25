import jQuery from "jquery";

/**
 *  Greetr G$()
 *  Author: Taniket Mehra
 *  GithubId: taniket15
 *  Date: 26th July 2022, 3:50am
 */
(function (global, $) {
  // 'new' an object
  const Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  // hidden within the scope of the IIFE and never directly accessible
  const supportedLanguages = ["en", "es"];

  // informal greetings
  const greetings = {
    en: "Hello",
    es: "Hola"
  };

  // formal greetings
  const formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  // logger messages
  const logMessages = {
    en: "Logged in",
    es: "Inició sesión"
  };

  // prototype holds methods (to save memory space)
  Greetr.prototype = {
    // 'this' refers to the calling object at execution time
    fullname: function () {
      return `${this.firstName} ${this.lastName}`;
    },
    validateLanguage: function (newLanguage) {
      // check that is a valid language
      // references the externally inaccessible 'supportedLanguages' within the closure
      if (!supportedLanguages.includes(newLanguage)) {
        throw new Error("Invalid Language!");
      }
      return true;
    },
    greeting: function () {
      return `${greetings[this.language]} ${this.firstName}!`;
    },
    formalGreeting: function () {
      return `${formalGreetings[this.language]} ${this.fullname()}`;
    },
    greet: function (isFormal = false) {
      let msg = "";

      if (isFormal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }
      console.log(msg);

      // makes method chainable
      return this;
    },
    setLanguage: function (newLanguage) {
      this.language = newLanguage;
      this.validateLanguage(newLanguage);
      return this;
    },
    log: function () {
      console.log(`${logMessages[this.language]}: ${this.fullname()}`);
      return this;
    },
    HTMLGreeting: function (selector, isFormal) {
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
  };

  // the actual object is created here, allowing us to 'new' an object wihtout calling 'new'
  Greetr.init = function (firstName = "", lastName = "", language = "en") {
    this.firstName = firstName;
    this.lastName = lastName;
    this.language = language;
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  // attach our Greetr to hte global object, and provide a shorthand 'G$' for ease usage
  global.Greetr = global.G$ = Greetr;
})(window !== undefined ? window : this, jQuery);
