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
            var myRegex = new RegExp(inputVal,'gi');
            $('.table-content').empty();
            Filter.ARRAY_DATA.filter(function (CityOrState) {
                if (Filter.checkContent(CityOrState.city, myRegex, CityOrState.state)) {
                    Filter.show($('.table'), 'show');
                    Filter.mustacheRender(CityOrState);
                }
            });
        })
    },
    checkContent: function(city, myRegex, state) {
        return city.match(myRegex) || state.match(myRegex)

    },
    checkContain: function (city, inputVal, state) {
        return city.indexOf(inputVal) >= 0 || state.indexOf(inputVal) >= 0;
    },

    getJsonToArray: function (data) {
        return JSON.parse(data);
    },

    mustacheRender: function (data) {
        var template = $('#template').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $('.table-content').append(rendered);
    },

    hide: function (element, addedClass) {
        element.removeClass(addedClass)
    },

    show: function (element, addedClasses) {
        element.addClass(addedClasses)
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