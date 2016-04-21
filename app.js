!function () {
    'use strict';
    $(function () {
        var opt = {
            //browsers coefficients
            coef: {
                // Desktop
                desktop: {

                    chrome: {
                        c1: .1,
                        c2: .07,
                        c3: .03,
                        c4: 0
                    },                     //Chrome, Firefox, Opera

                    ie: {                       //IE
                        ie7: .5,
                        ie8: .25,
                        ie9: .08,
                        ie10: .05,
                        ie11: .02
                    },

                    safari: {                  //Safari
                        safari5: .07,
                        safari6: 0
                    }
                },
                // Mobile
                mobile: {
                    android4: .03,             //Android browser 4.2
                    iem: {                       //IE
                        ie10: .07,
                        ie11: .03
                    },
                    chrome_m: {                   //Chrome, Firefox, Safari
                        c1: .07,
                        c2: .03,
                        c3: 0
                    }
                },
                //Adaptiv
                adaptiv: {
                    widthDesign:     .25,
                    withoutDesign:   .1
                },
                //Screens
                screens: {
                    withDesign:       .04,
                    withoutDesign:    .02
                },
                //Retina
                retina:    .15
            },
            const: {
                print: {
                    firstPage: 4,
                    otherPage: 2
                }
            },
            form: {
                container: $('.form')
            },
            par: {
                crossbrowser: {
                    desktop: {
                        chrome: {},
                        ie: {},
                        safari: {}
                    },
                    mobile: {
                        android4: {},
                        ie: {},
                        chrome: {}
                    }
                },
                adaptiv: {},
                screens: {},
                retina: {},
                print: {}
            }
            /*independ: {},
             depend: {},
             level1: {},
             level2: {},
             level3: {},
             sum: {}*/
        };


        function _setCheckbox(form, check_b) {
            form.find(check_b).on('change', function () {
                form.find(check_b).not($(this)).removeAttr('checked');
            });
        }

        /*function _setAdaptivCheckbox(form, check_b, check_c) {
            form.find(check_b, check_c).on('change', function () {
                form.find(check_b).not($(this)).removeAttr('checked');
            });
        }*/


        function _getCheckboxes() {
            _setCheckbox(opt.form.container, '.ie');
            _setCheckbox(opt.form.container, '.safari');
            _setCheckbox(opt.form.container, '.iem');
            _setCheckbox(opt.form.container, '.adaptiv');
        }

        function _getBrowsers(device, browser) {
            var colCheckedCoef = opt.form.container.find('.' + browser + ':checked').data('coef');
            opt.par.crossbrowser[device][browser] = opt.coef[device][browser][colCheckedCoef] || 0;
        }

        function _getAdaptiv(form) {
            var adaptivChoice = form.find('.adaptiv' + ':checked').attr('data-adaptiv') || 0;
            switch (adaptivChoice) {
                case "1": opt.par.adaptiv = opt.coef.adaptiv.withoutDesign; break;
                case "2": opt.par.adaptiv = opt.coef.adaptiv.withDesign; break;
                default: opt.par.adaptiv = adaptivChoice;
            }
            console.log(opt.par.adaptiv);
        }

        function _getScreens(form) {
            var boxCheckedQuantity = form.find('.sizeVariant' + ':checked').length || 0;
            console.log(boxCheckedQuantity);
        }

        function _getRetina(form) {
            opt.par.retina = 0;
            if (form.find(".retina:checked")) {
                opt.par.retina = opt.coef.retina;
            } else {
                opt.par.retina = 0;
            }
            //console.log(opt.par.retina);
        }

        function _getPrint(form) {
            var pagePrintCalc = parseInt(form.find('#form9').val()) || 0;
            opt.par.print = 0;
            if (pagePrintCalc === 1) {
                opt.par.print = opt.const.print.firstPage;
            } else if (pagePrintCalc > 1) {
                opt.par.print = opt.const.print.firstPage + ((pagePrintCalc - 1) * opt.const.print.otherPage);
            }
        }

        function _getParams(form) {
            opt.par.vstrecha = parseFloat(form.find('#form1').val());
            opt.par.initProject = parseFloat(form.find('#form5').val());
            opt.par.quantityPages = parseFloat(form.find('#form2').val()) || 0;
            opt.par.quantityHours = parseFloat(form.find('#form3').val()) || 0;
            _getBrowsers('desktop', 'chrome');
            _getBrowsers('desktop', 'ie');
            _getBrowsers('desktop', 'safari');
            _getBrowsers('mobile', 'android4');
            _getBrowsers('mobile', 'iem');
            _getBrowsers('mobile', 'chrome_m');
            _getAdaptiv(form);
            _getScreens(form);
            _getRetina(form);
            _getPrint(form);
            console.log(opt.par);
        }

        function _calcBaseTime() {
            opt.par.decomposition = opt.par.quantityHours / 30 * 0.5;
            opt.par.statistic = opt.par.quantityHours / 30 * 0.5;
            opt.par.testing = opt.par.quantityHours / 21 * 3;
            opt.par.independ = opt.par.vstrecha + opt.par.initProject + opt.par.decomposition + opt.pat.statistic;
            opt.par.depend = opt.par.quantityHours + opt.par.testing;
        }

        function _calcLevel1() {
            opt.par.level1 = opt.par.depend * (opt.par.crossbrowser.desktop.chrome + opt.par.crossbrowser.desktop.ie + opt.par.crossbrowser.desktop.safari + opt.par.crossbrowser.mobile.android4 + opt.par.crossbrowser.mobile.ie + opt.par.crossbrowser.mobile.chrome);
        }

        function _calcLevel2() {
            opt.par.level2 = opt.par.depend * (opt.par.adaptive + opt.par.adaptivDesine + opt.par.retina + opt.par.print + opt.par.hardJs);
        }

        function _calcLevel3() {
            opt.par.level3 = opt.par.depend * (opt.par.quickly + opt.par.difficulty);
        }

        function _calcParams() {
            // Считаем по большой формуле
            /*
             базовоеВремя * уровень1 * уровень2 * ур3

             */
            opt.par.sum = opt.par.level1 + opt.par.level2 + opt.par.level3 + opt.par.independ;

        }

        function calc() {
            _getCheckboxes();
            _getParams(opt.form.container);
            //_calcBaseTime();
            //_calcLevel1();
            //_calcLevel2();
            //_calcLevel3();
            //_calcParams();
            $("#form12").val(opt.par.sum);
        }

        if (opt.form.container.length) {
            opt.form.container.on('change', function () {
                calc();
            });

            opt.form.activeInput = opt.form.container.find('input').not(':disabled');
            if (opt.form.activeInput.length) {
                opt.form.activeInput.on('keyup', function () {
                    calc();
                });
            }
        }
    });
}();