var Filter = {
    //variables
    ARRAY_DATA: '',
    SINGLE_DATA_OBJECTS: '',
    $FILTER_INPUT: $('.filter-input'),
    $TABLE_CONTENT: $('.table-content'),
    $TABLE: $('.table'),
    SHOW_VAL: 'show',

    /**
     * init
     */
    init: function () {
        Filter.getData();
    },

    /**
     * functions
     */
    getData: function () {
        $.ajax({
            url: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
            method: 'GET',
            success: function (response) {
                Filter.ARRAY_DATA = Filter.getJsonToArray(response);
                Filter.filterData(response);
            },
            error: function () {
                alert('Getting data error');
            }
        })
    },

    /**
     * filter data by keyup and filter functions
     */
    filterData: function () {
        //init function after enter chars
        Filter.$FILTER_INPUT.on('keyup', function () {
            var inputVal = this.value;
            Filter.$TABLE_CONTENT.empty();
            if (inputVal != '') {
                var myRegex = new RegExp(inputVal, 'gi');
                //filter data by single object
                Filter.ARRAY_DATA.filter(function (cityOrState) {
                    if (Filter.checkContent(cityOrState.city, myRegex, cityOrState.state)) {
                        Filter.show(Filter.$TABLE, Filter.SHOW_VAL);
                        cityOrState['mycity'] = Filter.coloringSearching(cityOrState.city, myRegex);
                        cityOrState['mystate'] = Filter.coloringSearching(cityOrState.state, myRegex);
                        cityOrState.population = Filter.formatValueOfPopulation(cityOrState);
                        Filter.mustacheRender(cityOrState);
                    }
                });
            } else {
                Filter.hide(Filter.$TABLE, Filter.SHOW_VAL);
            }
        })
    },

    /**
     * compare city/state value with new create regex
     */
    checkContent: function (city, myRegex, state) {
        return city.match(myRegex) || state.match(myRegex)

    },

    /**
     * set background to searching data string
     * @param place
     * @param myRegex
     * @returns {*}
     */
    coloringSearching: function (place, myRegex) {
        return place.replace(myRegex, function (match) {
            return '<span class="selected">' + match + '</span>';
        });
    },

    /**
     * format data value
     * @param data
     * @returns {*}
     */
    formatValueOfPopulation: function (data) {
        return (data.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    },

    /**
     * convert json to array data
     * @param data
     * @returns {*}
     */
    getJsonToArray: function (data) {
        return JSON.parse(data);
    },

    /**
     * append data by mustache
     * @param data
     */
    mustacheRender: function (data) {
        var template = $('#template').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        Filter.$TABLE_CONTENT.append(rendered);
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