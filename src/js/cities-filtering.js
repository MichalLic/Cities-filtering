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
            var myRegex = new RegExp(inputVal, 'gi');
            $('.table-content').empty();
            Filter.ARRAY_DATA.filter(function (cityOrState) {
                if (Filter.checkContent(cityOrState.city, myRegex, cityOrState.state)) {
                    Filter.show($('.table'), 'show');
                    cityOrState['mycity'] = Filter.coloringSearching(cityOrState.city, inputVal);
                    cityOrState['mystate'] = Filter.coloringSearching(cityOrState.state, inputVal);
                    Filter.mustacheRender(cityOrState);
                }
            });
        })
    },
    checkContent: function (city, myRegex, state) {
        return city.match(myRegex) || state.match(myRegex)

    },

    coloringSearching: function (place, inputVal) {
        return place.replace(inputVal, '<span class="selected">' + inputVal + '</span>');

    },

    //formatValuePopulation: function () {
    //    var populationValue = $('.population').value
    //        console.log(populationValue);
    //    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //},

    //checkContain: function (city, inputVal, state) {
    //    return city.indexOf(inputVal) >= 0 || state.indexOf(inputVal) >= 0;
    //},

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