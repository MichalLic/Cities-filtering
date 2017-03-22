var Filter = {
    //variables
    ARRAY_DATA: '',
    SINGLE_DATA_OBJECTS: '',

    //init
    init: function () {
        Filter.getData();
    },


    //functions
    getData: function () {
        $.ajax({
            url: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
            method: 'GET',
            success: function (response) {
                Filter.ARRAY_DATA = Filter.getJsonToArray(response);
                Filter.SINGLE_DATA_OBJECTS = Filter.getSingleDataObject();
                Filter.filterData(response);
                Filter.getSingleDataObject(response)
           },
            error: function () {
                console.log('Getting data error');
            }
        })
    },

    filterData: function () {
        $('.filter-input').on('keyup', function () {
            var inputVal = this.value;
            Filter.ARRAY_DATA.filter(function (CityOrState){
                if(Filter.checkContain(CityOrState.city, inputVal, CityOrState.state)){
                    Filter.mustacheRender(CityOrState);
                } 
            });
        })
    },

    checkContain: function (city, inputVal, state) {
        return city.indexOf(inputVal) >= 0 || state.indexOf(inputVal) >=0;
    },

    getJsonToArray: function (data) {
        return JSON.parse(data);
    },

    mustacheRender: function (data) {
        var template = $('#template').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $('.filter-block').append(rendered);
    },






    getSingleDataObject: function (data) {
        $.map(Filter.ARRAY_DATA, function (index, item) {
            /*Filter.mustacheRender(index);*/
            return index;
        });
    }

};
$(document).ready(function () {
    Filter.init();
});