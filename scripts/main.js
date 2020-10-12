(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoveDataStore = App.RemoveDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var webshim = window.webshim;
    var truck = new Truck('ncc-1701', remoteDS);
    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    var formHandler = new FormHandler(FORM_SELECTOR);
    
    formHandler.addSubmitHandler(function(data) {
        truck.createOrder.call(truck, data);
        checkList.addRow.call(checkList, data);
        });

    formHandler.addInputHandler(Validation.isCompanyEmail);

    webshim.polyfill('forms forms-ext');
    webshim.setOptions('forms', {addValidators: true, lazyCustomMessages: true});
    console.log(formHandler);
})(window);