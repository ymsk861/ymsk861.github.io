// Included fastclick.js to make the inputs quicker to respond to taps on mobile

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
