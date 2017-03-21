var Filter = {
    //variables



    //init
    init: function (){
        Filter.getData();
    },


    //functions
    getData: function(){
        $.ajax({
            url: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
            method: 'GET',
            success: function(response){
                console.log(response);
            },
            error: function() {
                console.log('Getting data error');
            }
        })
    }






};
$(document).ready(function () {
    Filter.init();
});