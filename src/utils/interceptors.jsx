/**
 * This file we can use to define interceptors if we are using any HTTP clinet like axios.
 * For this Demo purpose we are on using fetch
 */

(function () {
    if (window.fetch) {
        var originalFetch = window.fetch;
        window.fetch = function () {
            return originalFetch.apply(this, arguments).then((data) => {
                return data.json();
            })
            // .catch(err => {
            //     //replace console by third party service
            //     console.log('Error Logged in API. Call third part Error Logger here.');
            //     return new Error(err);
            // });
        };
    } else {
        //replace console by third party service
        console.log("OOPS!!! We are sorry but your browser seems outdated. No worries we are on it.");
        //Log error
        console.error('Logging to thrid Party app...');
    }
})();