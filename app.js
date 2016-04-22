!function () {
    'use strict';
    $(function () {
        var opt = {
            //browsers coefficients
            coef: {
                deault: {
                    adaptivblock: {
                        adaptiv: 'checked',
                        movePrototype: {
                            hasPrototype: {},
                            hasNotPrototype: 'checked'
                        },
                        //Screens
                        screens: {
                            lg: {
                                fix: 'checked',
                                fluid: {}
                            },
                            md: {
                                fix: 'checked',
                                fluid: {}
                            },
                            sm: {
                                fix: 'checked',
                                fluid: {}
                            },
                            xs: {
                                fix: 'checked',
                                fluid: {}
                            }
                        }
                    }
                },
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
                adaptivblock: {
                    adaptiv: .2,
                    movePrototype: {
                        hasPrototype: .25,
                        hasNotPrototype: .1
                    },
                    //Screens
                    screens: {
                        lg: {
                            fix: .02,
                            fluid: .04
                        },
                        md: {
                            fix: .02,
                            fluid: .04
                        },
                        sm: {
                            fix: .02,
                            fluid: .04
                        },
                        xs: {
                            fix: .02,
                            fluid: .04
                        }
                    }
                },
                retina: .15,
                hardJs: .1,
                deadLine: {
                    fast:.07
                }
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
                adaptivblock: {
                    adaptiv: {},
                    movePrototype: {},
                    screens: {
                        lg: {},
                        md: {},
                        sm: {},
                        xs: {}
                    }
                },
                retina: {},
                print: {},
                hardJs: {},
                deadLine: {
                    firstDay: {},
                    lastDay: {},
                    fast: {}
                }
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

        /*function _setRadio(form, classIs, data) {
         var rowCheckedRadio = opt.form.coef.deault.find(':checked');
         rowCheckedRadio.attr("checked", "checked");
         }*/

        function _adaptivShowOrHide(boxClass, classIs) {
            $(boxClass).fadeOut();
            $(boxClass).on('click',
                function () {
                    alert(boxClass);
                    if ($(boxClass).attr('checked:checked')) {
                        $(classIs).fadeIn();
                    } else {
                        $(classIs).fadeOut();
                    }
                });
        }

        function _getCheckboxes() {
            _setCheckbox(opt.form.container, '.ie');
            _setCheckbox(opt.form.container, '.safari');
            _setCheckbox(opt.form.container, '.iem');
            _setCheckbox(opt.form.container, '.adaptiv');
            _setCheckbox(opt.form.container, '.lg');
            _setCheckbox(opt.form.container, '.md');
            _setCheckbox(opt.form.container, '.sm');
        }

        function _getBrowsers(device, browser) {
            var colCheckedCoef = opt.form.container.find('.' + browser + ':checked').data('coef');
            opt.par.crossbrowser[device][browser] = opt.coef[device][browser][colCheckedCoef] || 0;
        }

        function _getProtitype() {
            var variant = opt.form.container.find('.adaptiv:checked').data('adaptiv');
            opt.par.adaptivblock.movePrototype = opt.coef.adaptivblock.movePrototype[variant] || 0;
        }

        function _getScreens(screen) {
            var rowCheckedCoef = opt.form.container.find('.' + screen + ':checked').data('screen');
            opt.par.adaptivblock.screens[screen] = opt.coef.adaptivblock.screens[screen][rowCheckedCoef] || 0;
        }

        function _getSimplePar(form, idIs, parametr) {
            opt.par[parametr] = 0;
            if (form.find('#' + idIs + ':checked')) {
                opt.par[parametr] = opt.coef[parametr];
            } else {
                opt.par[parametr] = 0;
            }
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

        function _getDeadLine(form) {
            opt.par.deadLine.fast = 0;
            if (form.find("#form11:checked")) {
                opt.par.deadLine.firstDay = new Date();
                var month = opt.par.deadLine.firstDay.getMonth() + 1;
                if (month < 10) month = '0' + month;
                var day = opt.par.deadLine.firstDay.getDate();
                if (day < 10) day = '0' + day;
                var year = opt.par.deadLine.firstDay.getFullYear();
                form.find('#datapicker1').val(year + '-' + month + '-' + day);
                opt.par.deadLine.lastDay = new Date(form.find('#datapicker2').val())  || 0;
                opt.par.deadLine.fast = opt.coef.deadLine.fast;
                console.log(opt.par.deadLine.lastDay);
            } else {
                opt.par.deadLine.fast = 0;
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
            _getProtitype();
            _getScreens('lg');
            _getScreens('md');
            _getScreens('sm');
            _getScreens('xs');
            _getPrint(form);
            _getSimplePar(form, 'retina', 'retina');
            _getSimplePar(form, 'form10', 'hardJs');
            _getSimplePar(form, 'adaptivhead', 'adaptivblock.adaptiv');
            _getDeadLine(form);
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
                _adaptivShowOrHide(".adaptivhead", ".adaptiv");
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