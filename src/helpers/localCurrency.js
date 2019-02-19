let localCurrency = (function currencyConvert() {
    let locale = navigator.language;
    let thisCurrency = getCurrencyDetailsByLocale(locale);
    if(thisCurrency == null) thisCurrency = getCurrencyDetailsByLocale("en-US");
    let format = { 
        style: 'currency', 
        currency: thisCurrency.code, 
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    };
    return function(val){
        return val.toLocaleString(locale, format);
    }
}());

function getCurrencyDetailsByLocale(locale){
    let currencyNames = [
        {
            code:"BRL",
            name:"Brazilian Real",
            locale:"pt-BR",
        },        
        {
            code:"EUR",
            name:"Euro",
            locale:"en-DE",
        },
        {
            code:"USD",
            name:"US Dollar",
            locale:"en-US-POSIX",
        }
    ];

    return currencyNames.find(l => l.locale === locale);
}

export default localCurrency;

//console.log("Current location money: " + localCurrency(120.78901234) );