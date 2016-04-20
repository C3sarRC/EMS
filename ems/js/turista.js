var app = angular.module("ems", ['ngMessages']);

app.controller('turista', function ($scope, $http) {
    var i = JSON.stringify({ tipo_dato: 1, variable: '1,2,3,4', actividad: 0 });
    var v = JSON.stringify({ tipo_dato: 2, variable: '1,2,3,4', actividad: 0 });
    var f = JSON.stringify({ idFuente: 1 });
    $http.post("./ws_turista.asmx/getEstatus", f).success(function ($response) {
        $scope.estatus =  JSON.parse($response.d);
    });
    $http.post("./ws_turista.asmx/MostrarDatos", i).success(function ($response) {
       
        var aux = 0;
        var aux2 = 0;
        var data = JSON.parse($response.d);
        for (key in data[0]) {
            if (data[0][key] != '') {
                if (data[0][key] == data[0]["anioAct"]) {
                    aux2 = aux;
                } else {
                 aux = aux + 1;
                }
               
            } else { }
        }
        $scope.cols = aux2 - 2;
        for (var i = 0; i < 2; i++) {
            for (var x = 0; x < data[i].length; x++) {
               
            }
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i]['anio'] != '' && data[i]['anioAct'] != '') {
                data[i]['anio'] = '';
                data[i]['anioAct'] = '';
            } else {

            }
        }
        $scope.indice = data;
        $http.post("./ws_turista.asmx/MostrarDatos", v).success(function ($response) {
            var aux = 0;
            var aux2 = 0;
            var aux3 = 0;
            dat = [];
            datos = [];
            $scope.meses = [];
            var data = JSON.parse($response.d);
            $scope.anio = data[0]['anio'];
            $scope.anioAct = data[0]['anioAct'];
            for (key in data[0]) {
                aux3 = aux3 + 1;
                if (aux3 == 3) {
                     dat.push({ "nombre": key, "val": data[0][key] });
                }
               
                
                if (data[0][key] != '') {
                    if (aux3 > 2 && data[0][key] != data[0]['anioAct']) $scope.meses.push(key);
                   
                    if (data[0][key] == data[0]["anioAct"]) {
                        aux2 = aux;
                    } else {
                        aux = aux + 1;
                    }

                } else { }
            }
            for (var i = 0; i < $scope.meses.length; i++) {
                if ($scope.meses[i].indexOf("Act")>-1) {
                    $scope.meses[i] = $scope.meses[i].substring(0,3);
                }
            }
            mesAct = $scope.meses[0];
            for (var j = 0; j < $scope.meses.length; j++) {
                $scope.meses[j] = $scope.meses[j].substring(0,3);
            }
            $scope.cols = aux2 - 2;
        
            for (var i = 0; i < 2; i++) {
                for (var x = 0; x < data[i].length; x++) {
                   
                }
            }
            for (var i = 0; i < data.length; i++) {
               
                datos.push({ "label": data[i]["descripcion"], "value": data[i][dat[0].nombre + "Act"] });
               
                if (data[i]['anio'] != '' && data[i]['anioAct'] != '') {
                    data[i]['anio'] = '';
                    data[i]['anioAct'] = '';
                } else {

                }
            }
            $scope.variacion = data;

            FusionCharts.ready(function () {
                var gr1 = new FusionCharts({
                    "type": "column2d",
                    "renderAt": "chartContainer",
                    "width": "600px",
                    "height": "380px",
                    "dataFormat": "json",
                    "dataSource":
                        {
                            "chart": {
                                "caption": "Variación anual",
                                "subcaption": mesAct + " " + $scope.anioAct,
                                "yaxisname": "",
                                "numberprefix": "",
                                "bgcolor": "FFFFFF",
                                "useroundedges": "1",
                                "showborder": "0",
                                "formatNumberScale": "0"
                            },
                            "data": datos
                        }
                });
                gr1.render("graph1");
            })
        });
    });
});

app.controller('granjero', function ($scope, $http,$timeout) {
    $scope.ind = 1;
    var i = JSON.stringify({ dat: "0" });
    $http.post('./ws_turista.asmx/getVariable',i).success(function ($response) {
        $scope.variables = JSON.parse($response.d);
        $scope.vari = JSON.parse($response.d)[0];

        var i = JSON.stringify({ variable: $scope.vari.id_variable });
        $http.post('./ws_turista.asmx/sector', i).success(function ($response) {
            $scope.sectores = JSON.parse($response.d);
            $scope.sectores.splice(0, 1);
            $scope.sec = JSON.parse($response.d)[1];

            var i = JSON.stringify({ actividad: $scope.sec.id_variable });
            $http.post('./ws_turista.asmx/actividad', i).success(function ($response) {
                $scope.actividades = JSON.parse($response.d);  
                $scope.act = JSON.parse($response.d)[0];

                $scope.$watch('meses', function () {
                    if ($scope.meses == undefined) { }
                    else { $timeout($scope.grafica); }
                })
            });
        });
    });

    $scope.getSectores = function (vari) {
        var i = JSON.stringify({ variable: vari.id_variable });
        $http.post('./ws_turista.asmx/sector',i).success(function ($response) {
            $scope.sectores = JSON.parse($response.d);
            $scope.sectores.splice(0, 1);
            $scope.sec = JSON.parse($response.d)[1];
        });
    }
    $scope.getActividad = function (sec) {
        var i = JSON.stringify({ actividad: sec.id_variable });
        $http.post('./ws_turista.asmx/actividad', i).success(function ($response) {
            $scope.actividades = JSON.parse($response.d);
            $scope.act = JSON.parse($response.d)[0];
        });
    }
    
    $scope.grafica = function () {
        var i = JSON.stringify({ tipo_dato: $scope.ind, variable: $scope.vari['id_variable'], actividad: $scope.act['id_variable'] });
        $http.post('./ws_turista.asmx/MostrarDatos', i).success(function ($response) {

            dat = [];
            var aux = 0;
            var data = JSON.parse($response.d);
            for (var i = 0; i < $scope.meses.length; i++) {
                if ($scope.meses[i].indexOf("Act") > -1) {
                    $scope.meses[i] = $scope.meses[i].substring(0, 3);
                }
            }
            for (key in data[0]) {
                aux = aux + 1;
                if (data[0][key] != '') {
                    if (aux > 2 && data[0][key] != data[0]['anioAct']) {
                        if (key.indexOf("Act") > -1) {
                            key2 = key.substring(0, 3) + " " + $scope.anioAct;
                            dat.push({ "label": key2, "value": data[0][key] });
                        } else {
                            key2 = key.substring(0, 3) + " " + $scope.anio;
                            dat.push({ "label": key2, "value": data[0][key] });
                        }
                    }else{}
                    
                } else { }             
                    
            }
            if ($scope.ind == 1) {
                var titulo = 'Índice (base 2008=100)';
            } else {
                var titulo = 'Variación anual';
            }
            FusionCharts.ready(function () {
                var gr1 = new FusionCharts({
                    "type": "line",
                    "renderAt": "chartContainer",
                    "width": "600px",
                    "height": "380px",
                    "dataFormat": "json",
                    "dataSource":
                        {
                            "chart": {
                                "caption": titulo,
                                "subcaption": " " ,
                                "yaxisname": "",
                                "numberprefix": "",
                                "paletteColors": "#0075c2",
                                "bgcolor": "FFFFFF",
                                "useroundedges": "1",
                                "showborder": "0",
                                "labelDisplay": "rotate",
                                "formatNumberScale": "0",
                                "rotatevalues":"0"
                            },
                            "data": dat
                        }
                });
                gr1.render("graph2");
            })
        });


    }

})