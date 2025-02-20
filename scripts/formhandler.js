(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var App = window.App || {};
    var $ = window.jQuery;

    class FormHandler {
        constructor(selector) {
            // code will go here
            console.log('Inside FormHandler');
            if (!selector) { throw new Error('No selector provided'); }

            this.$formElement = $(selector);
            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }
        addSubmitHandler(fn) {
            console.log('Setting submit handler for form with fn: ' + fn);

            this.$formElement.on('submit', function (event) {
                event.preventDefault();

                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();

                console.log('after fn(data)');
            });
        }
        addInputHandler(fn) {
            console.log('Setting input handler for form');

            this.$formElement.on('input', '[name="emailAddress"]', function (event) {
                var emailAddress = event.target.value;
                var message = '';
                if (fn(emailAddress)) {
                    $(event.target).setCustomValidity('');
                } else {
                    message = emailAddress + ' is not an authorized email address!'
                    $(event.target).setCustomValidity(message);
                }
            });
        }
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);