var Filter = {
    //variables


    //init
    init: function () {
        Filter.getData();
        Filter.key();
    },


    //functions
    getData: function () {
        $.ajax({
            url: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
            method: 'GET',
            success: function (response) {
                console.log(JSON.parse(response));
                Filter.getJsonToArray(response);
            },
            error: function () {
                console.log('Getting data error');
            }
        })
    },


    key: function () {
        $('.filter-input').keyup(function () {
            console.log(this.value);
        })
    },





    getJsonToArray: function (data) {
        var arrayData = JSON.parse(data);
        Filter.getSimpleDataObject(arrayData);
    },

    getSimpleDataObject: function (data) {
        $.map(data, function (index) {
            /*Filter.mustacheRender(index);*/
        });
    }

    //mustacheRender: function (data) {
    //    var template = $('#template').html();
    //    Mustache.parse(template);
    //    var rendered = Mustache.render(template, data);
    //    $('.filter-block').append(rendered);
    //}


};
$(document).ready(function () {
    Filter.init();
});