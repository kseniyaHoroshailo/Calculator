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
                        c2: 0
                    }
                },
                //Adaptiv
                adaptiv: .2,
                adaptivblock: {
                    rebuildView: {
                        hasView: .25,
                        hasNotView: .1
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
                    fast: .07
                }
            },
            const: {
                vstrecha: 1,
                initProject: .5,
                transferManager: 0,
                print: {
                    firstPage: 4,
                    otherPage: 2
                }
            },
            form: {
                container: $('.form')
            },
            params: {
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
                adaptivblock: {
                    rebuildView: {},
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

        function _setCheckboxes(form, classIs) {
            var box = form.find('.' + classIs);
            box.attr('checked', 'checked');
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
            opt.params.crossbrowser[device][browser] = opt.coef[device][browser][colCheckedCoef] || 0;
        }

        function _getPrototype() {
            var variant = opt.form.container.find('.adaptiv:checked').data('adaptiv');
            opt.params.adaptivblock.rebuildView = opt.coef.adaptivblock.rebuildView[variant] || 0;
        }

        function _getScreens(screen) {
            var rowCheckedCoef = opt.form.container.find('.' + screen + ':checked').data('screen');
            opt.params.adaptivblock.screens[screen] = opt.coef.adaptivblock.screens[screen][rowCheckedCoef] || 0;
        }

        function _getSimplePar(form, idIs, parametr) {
            opt.params[parametr] = 0;
            if (form.find('#' + idIs + ':checked')) {
                opt.params[parametr] = opt.coef[parametr];
            }
        }

        function _getPrint(form) {
            opt.params.print = parseInt(form.find('#form9').val()) || 0;
            if (opt.params.print === 1) {
                opt.params.print = opt.const.print.firstPage;
            } else if (opt.params.print > 1) {
                opt.params.print = opt.const.print.firstPage + ((opt.params.print - 1) * opt.const.print.otherPage);
            }
        }

        function _getDeadLine(form) {
            opt.params.deadLine.fast = 0;
            if (form.find("#form11:checked")) {
                opt.params.deadLine.firstDay = new Date(form.find('#datapicker1').val());
                opt.params.deadLine.lastDay = new Date(form.find('#datapicker2').val()) || 0;
                opt.params.deadLine.fast = opt.coef.deadLine.fast;
                opt.params.deadLine.firstDay = opt.params.deadLine.firstDay.getTime();
                opt.params.deadLine.lastDay = opt.params.deadLine.lastDay.getTime() || 0;
            }
        }

        function _setStartParams(form) {
            opt.params.vstrecha = form.find('#form1').val(opt.const.vstrecha);
            opt.params.initProject = form.find('#form5').val(opt.const.initProject);
            opt.params.transferManager = form.find('#form7').val(opt.const.transferManager);
            _setCheckboxes(opt.form.container, 'col4');
            _setCheckboxes(opt.form.container, 'chrome_m2');
            opt.params.deadLine.firstDay = new Date();
            var month = opt.params.deadLine.firstDay.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var day = opt.params.deadLine.firstDay.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var year = opt.params.deadLine.firstDay.getFullYear();
            form.find('#datapicker1').val(year + '-' + month + '-' + day);
            //adaptiv
            form.find('#adaptivhead').attr('checked', 'checked');
            form.find('.adaptiv1').attr('checked', 'checked');
            //print
            form.find('#form9').attr('disabled', 'disabled');
        }

        function _setParams(form) {
            opt.params.quantityPages = parseFloat(form.find('#form2').val()) || 0;
            opt.params.quantityHours = parseFloat(form.find('#form3').val()) || 0;
            //adaptiv
            form.find('#adaptivhead').on('change', function () {
                if (form.find('#adaptivhead').prop('checked')) {
                    form.find('.adaptiv1').prop('checked');
                    form.find('.adaptiv').removeAttr('disabled');
                } else {
                    form.find('.adaptiv').removeAttr('checked');
                    form.find('.adaptiv').attr('disabled', 'disabled');
                }
            });
            //print
            if (form.find('.printbox').prop('checked')) {
                form.find('#form9').removeAttr('disabled');
            } else {
                form.find('#form9').attr('disabled', 'disabled');
                form.find('#form9').val(0);
            }
            //hardPoject
            if(form.find('#form9') <= 4 && form.find('#form10').prop('checked')) {
                form.find('#complexity').val(1);
            } else if(form.find('#form9') > 4 && form.find('#form9') <= 10 && !form.find('#form10').prop('checked')) {
                form.find('#complexity').val(2);
            } else if(form.find('#form10').prop('checked')){
                form.find('#complexity').val(3);
            } else {
                form.find('#complexity').val(1);
            }
        }

        function _getParams(form) {
            _getBrowsers('desktop', 'chrome');
            _getBrowsers('desktop', 'ie');
            _getBrowsers('desktop', 'safari');
            _getBrowsers('mobile', 'android4');
            _getBrowsers('mobile', 'iem');
            _getBrowsers('mobile', 'chrome_m');
            _getPrototype();
            _getScreens('lg');
            _getScreens('md');
            _getScreens('sm');
            _getScreens('xs');
            _getPrint(form);
            _getSimplePar(form, 'retina', 'retina');
            _getSimplePar(form, 'form10', 'hardJs');
            _getSimplePar(form, 'adaptivhead', 'adaptiv');
            _getDeadLine(form);
            console.log(opt.params);
        }

        function _calcBaseTime() {
            opt.params.decomposition = Math.ceil(opt.params.quantityHours / 30) * 0.5;
            opt.params.statistic = Math.ceil(opt.params.quantityHours / 30) * 0.5;
            opt.params.testing = Math.ceil(opt.params.quantityHours / 21) * 3;
            if (opt.params.testing < 2) {
                opt.params.testing = 2;
            }
            $("#form4").val(opt.params.decomposition);
            $("#form6").val(opt.params.testing);
            $("#form8").val(opt.params.statistic);
            opt.params.independ = opt.params.vstrecha + opt.params.initProject + opt.params.decomposition + opt.params.statistic + opt.params.testing;
            opt.params.depend = opt.params.quantityHours;
        }

        function _calcLevel1() {
            opt.params.level1 = opt.params.depend * (opt.params.crossbrowser.desktop.chrome + opt.params.crossbrowser.desktop.ie + opt.params.crossbrowser.desktop.safari + opt.params.crossbrowser.mobile.android4 + opt.params.crossbrowser.mobile.ie + opt.params.crossbrowser.mobile.chrome);
        }

        function _calcLevel2() {
            opt.params.level2 = opt.params.depend * (opt.params.adaptiv + opt.params.adaptivblock.rebuildView + opt.params.retina + opt.params.print + opt.params.hardJs + opt.params.adaptivblock.screens.lg + opt.params.adaptivblock.screens.md + opt.params.adaptivblock.screens.sm + opt.params.adaptivblock.screens.xs);
        }

        function _calcLevel3() {
            opt.params.level3 = opt.params.depend * (opt.params.deadLine.fast);
        }

        function _calcParams() {
            opt.params.sum = opt.params.level1 + opt.params.level2 + opt.params.level3 + opt.params.independ;
        }

        function calc() {
            _setParams(opt.form.container);
            _getCheckboxes();
            _getParams(opt.form.container);
            //_calcBaseTime();
            //_calcLevel1();
            //_calcLevel2();
            //_calcLevel3();
            //_calcParams();
            $("#form12").val(opt.params.sum);
        }

        if (opt.form.container.length) {
            _setStartParams(opt.form.container);
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