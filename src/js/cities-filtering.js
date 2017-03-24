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
                Filter.filterData(response);
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
                    cityOrState['mycity'] = Filter.coloringSearching(cityOrState.city, inputVal, myRegex);
                    cityOrState['mystate'] = Filter.coloringSearching(cityOrState.state, inputVal, myRegex);
                    cityOrState.population = Filter.formatValueOfPopulation(cityOrState);
                    Filter.mustacheRender(cityOrState);
                }
            });
        })
    },
    checkContent: function (city, myRegex, state) {
        return city.match(myRegex) || state.match(myRegex)

    },

    coloringSearching: function (place, inputVal, myRegex) {
        return place.replace(myRegex, function(match){
            return '<span class="selected">' + match + '</span>';
        });
    },

    formatValueOfPopulation: function (data) {
        return (data.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
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
    }

};
$(document).ready(function () {
    Filter.init();
});