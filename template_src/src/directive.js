import Vue from 'vue';
const moment = require('moment');

Vue.directive('vistak',{

    bind: (el,bindign, vnode) => {

        window.addEventListener('keyboardWillShow', (event) => {
                if(device.platform == 'Android'){
                    // console.log("TECLADO SHOW BEBE show", event.keyboardHeight);
                    // el.style.paddingBottom = (event.keyboardHeight+ 20 ) + 'px' ;
                }
            });
        window.addEventListener('keyboardWillHide', function (event) {
            if(device.platform == 'Android'){
            // console.log("TECLADO HIDE BEBE", event.keyboardHeight);
                el.style.paddingBottom = '0px';
            }
        });

    }
});

Vue.directive('chatss',{

    bind: (el,bindign, vnode) => {

        window.addEventListener('keyboardDidShow', (event) => {
            if(device.platform == 'iOS'){
                console.log("Window scroll ----- ", event.keyboardHeight);
                window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                Keyboard.disableScrollingInShrinkView(true);
            }
        });
        window.addEventListener('keyboardWillShow', (event) => {
            if(device.platform == 'iOS'){
            console.log("scroll will --- entra", event.keyboardHeight);
            window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
            }
        });

    }

});