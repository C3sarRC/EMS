var app = angular.module("ems");



app.controller('minero', function ($scope, $http,$timeout) {
    var i = JSON.stringify({ dat: "0" });
    $http.post('ws_turista.asmx/getVariable',i).success(function ($response) {
        $scope.variables = JSON.parse($response.d);
        $scope.vari = JSON.parse($response.d)[0];
        var i = JSON.stringify({ variable: JSON.parse($response.d)[0].id_variable });
        $http.post('ws_turista.asmx/sector', i).success(function ($response) {
            $scope.sectores = JSON.parse($response.d);
            $scope.sec = $scope.sectores[0];
           
            for (var i = 0; i < $scope.sectores.length; i++) {
                if ($scope.sectores[i].id_variable == 0) {
                    $scope.sectores[i].id_variable = "";
                }
            }
            var i = JSON.stringify({ actividad: JSON.parse($response.d)[0].id_variable });
            $http.post('ws_turista.asmx/actividad', i).success(function ($response) {
               
                if ($response.d== "") {
                    arr = [];
                    arr.push({ "id_variable": "", "descripcion": "Todos" });
                    $scope.actividades = arr;
                    $scope.act = $scope.actividades[0];
                } else {
                    $scope.actividades = JSON.parse($response.d);
                    $scope.actividades.unshift({ "id_variable": "", "descripcion": "Todos" });
                    $scope.act = $scope.actividades[0];
                }
                
                var i = JSON.stringify({ dat: "0" });
                $http.post('ws_turista.asmx/getAnios',i).success(function ($response) {
                    $scope.aniosMinCon = JSON.parse($response.d);
                    $scope.aniosMinCon.unshift({ "anio": "Todos" });
                    $scope.anio = $scope.aniosMinCon[0];
                })
            });
        })
    });


    $scope.getSectores = function (vari) {
        var i = JSON.stringify({ variable: vari.id_variable });
        $http.post('ws_turista.asmx/sector', i).success(function ($response) {
            $scope.sectores = JSON.parse($response.d);
            $scope.sec = $scope.sectores[0];

            for (var i = 0; i < $scope.sectores.length; i++) {
                if ($scope.sectores[i].id_variable == 0) {
                    $scope.sectores[i].id_variable = "";
                }
            }
         
        });
    }
    $scope.getActividad = function (sec) {
        if (sec.id_variable!='') {
            var i = JSON.stringify({ actividad: sec.id_variable });
            $scope.actividades = [];
            $scope.act = "";
            $http.post('ws_turista.asmx/actividad', i).success(function ($response) {
                $scope.actividades = JSON.parse($response.d);
                $scope.actividades.unshift({ "id_variable": "", "descripcion": "Todos" });
                $scope.act = $scope.actividades[0];
            });
        }
    }
   
    $scope.meses = [
        { id_mes: 0, nombre: "Todos" },
        { id_mes: 1, nombre: "Enero" },
        { id_mes: 2, nombre: "Febrero" },
        { id_mes: 3, nombre: "Marzo" },
        { id_mes: 4, nombre: "Abril" },
        { id_mes: 5, nombre: "Mayo" },
        { id_mes: 6, nombre: "Junio" },
        { id_mes: 7, nombre: "Julio" },
        { id_mes: 8, nombre: "Agosto" },
        { id_mes: 9, nombre: "Septiembre" },
        { id_mes: 10, nombre: "Octubre" },
        { id_mes: 11, nombre: "Noviembre" },
        { id_mes: 12, nombre: "Diciembre" }
    ];
    $scope.tipo_datos = [
        { id_dato: 1, nombre: "Índice (base 2008=100)" },
        { id_dato: 2, nombre: "Variación anual" },
        { id_dato: 3, nombre: "Variación anual acumulada" }
    ]
    $scope.mes = $scope.meses[0];
    $scope.tipoDat = $scope.tipo_datos[0];
    $scope.consulta = function () {
        mesM = "0";
        datosAct="";
      

        if ($scope.mes.id_mes == 0) {
            for (var i = 0; i < $scope.meses.length; i++) {
                mesM = mesM + "," + $scope.meses[i].id_mes;
            }
           
        }
        else {
            mesM = $scope.mes.id_mes;
        }

        if ($scope.sec.id_variable == "") {
           
            for (var i = 1; i < $scope.sectores.length; i++) {
                if (i == $scope.sectores.length - 1) {
                    datosAct =datosAct+ $scope.sectores[i].id_variable;
                } else {
                    datosAct =datosAct+ $scope.sectores[i].id_variable + ',';
                }
                
            }
            activAll = " and a.id_actividad_padre in (" + datosAct + ")";
        }
        else {
            if ($scope.act.id_variable == "") {
                for (var i = 1; i < $scope.actividades.length; i++) {
                    if (i == $scope.actividades.length - 1) {
                        datosAct = datosAct + $scope.actividades[i].id_variable;
                    } else {
                        datosAct = datosAct + $scope.actividades[i].id_variable + ',';
                    }

                }
                activAll = " and a.id_actividad in (" + datosAct + ")";
            } else {
                activAll = "and a.id_actividad in (" + $scope.act.id_variable + ")";
            }
           
        }
        if ($scope.anio.anio == "Todos") {
            anios = "";
            for (var i = 1; i < $scope.aniosMinCon.length; i++) {
                
                if (i == $scope.aniosMinCon.length - 1) {
                    anios = anios + $scope.aniosMinCon[i].anio;
                } else {
                    anios = anios + $scope.aniosMinCon[i].anio + ',';
                }
            }
           
        } else {
            anios = $scope.anio.anio;
        }
        
        var i = JSON.stringify({ variable: $scope.vari.id_variable, actividad: activAll, tipo_dato: $scope.tipoDat.id_dato, anio: anios, mes: mesM });
        $http.post('ws_turista.asmx/getMinero', i).success(function ($response) {
            if ($response.d!="") {
                // $scope.datosMin = JSON.parse($response.d);
            data = JSON.parse($response.d);
            
            datosR = [];
            aniosT = [];
            aux = 0;
            ax = 0;
            $scope.mesesConsulta = [];
           
           
            j = "{";
            for (var i = 0; i < data.length; i++) {
                if (data[i + 1] == undefined) {
                    if (data[i - 1] == undefined) {
                        if (j == "{") {
                            for (key in data[i]) {
                                if (key == "Dic") {
                                    j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"';
                                } else {
                                    if (key == "id_variable") {
                                        j = j + '"Sector / dominio"' + ":" + '"' + data[i][key] + '"' + ",";
                                    } else if (key == "descripcion") {
                                        j = j + '"Descripción"' + ":" + '"' + data[i][key] + '"' + ",";
                                    } else {
                                        if (key == "anio") {
                                        } else {
                                            j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                        }
                                       
                                    }

                                }
                            }
                        }

                        j = j + "}";

                        datosR.push(JSON.parse(j));
                        $scope.datosMin = datosR;
                    }
                    else {
                        if (data[i].id_variable == data[i - 1].id_variable) {
                            if (j == "{") {
                                for (key in data[i]) {
                                    if (key == "Dic") {
                                        j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"';
                                    } else {
                                        if (key == "id_variable") {
                                            j = j + '"Sector / dominio"' + ":" + '"' + data[i][key] + '"' + ",";
                                        } else if (key == "descripcion") {
                                            j = j + '"Descripción"' + ":" + '"' + data[i][key] + '"' + ",";
                                        } else {
                                            j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                        }

                                    }
                                }
                            } else {
                                for (key in data[i]) {
                                    if (key == "id_variable" || key == "descripcion" || key == "anio") { } else {
                                        if (key == "Dic") {
                                            j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"';
                                        } else {
                                            j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                        }
                                    }

                                }
                            }

                            j = j + "}";

                            datosR.push(JSON.parse(j));
                            $scope.datosMin = datosR;

                            j = "{";
                        } else {
                            
                        }
                    }
                   
                }
                else {
                    if (data[i].id_variable == data[i + 1].id_variable) {
                        if (j == "{") {
                            for (key in data[i]) {
                                if (key == "anio") { } else {
                                       
                                    if (key == "id_variable") {
                                        j = j + '"Sector / dominio"' + ":" + '"' + data[i][key] + '"' + ",";
                                    } else if (key == "descripcion") {
                                        j = j + '"Descripción"' + ":" + '"' + data[i][key] + '"' + ",";
                                    } else {
                                        j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                    }
                                }
                            }
                        } else {
                            for (key in data[i]) {
                                if (key == "id_variable" || key == "descripcion" || key == "anio") { } else {
                                    j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                }

                            }
                        }
                    }
                    else {
                        if (data[i - 1] == undefined) {
                            if (j == "{") {
                                for (key in data[i]) {
                                    if (key == "Dic") {
                                        j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"';
                                    } else {
                                        if (key == "id_variable") {
                                            j = j + '"Sector / dominio"' + ":" + '"' + data[i][key] + '"' + ",";
                                        } else if (key == "descripcion") {
                                            j = j + '"Descripción"' + ":" + '"' + data[i][key] + '"' + ",";
                                        } else {
                                            if (key == "anio") {
                                            } else {
                                                j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                            }

                                        }

                                    }
                                }
                            }

                            j = j + "}";

                            datosR.push(JSON.parse(j));
                            j = "{";
                        }else{
                            if (data[i].id_variable == data[i - 1].id_variable) {
                                if (j == "{") {
                                    if (key == "Dic") {
                                        j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"';
                                    } else {
                                        if (key == "id_variable") {
                                            j = j + '"Sector / dominio"' + ":" + '"' + data[i][key] + '"' + ",";
                                        } else if (key == "descripcion") {
                                            j = j + '"Descripción"' + ":" + '"' + data[i][key] + '"' + ",";
                                        } else {
                                            j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                        }
                                    }
                                } else {

                                    for (key in data[i]) {
                                        if (key == "id_variable" || key == "descripcion" || key == "anio") { } else {
                                            if (key == "Dic"){
                                                j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"';
                                            } else {
                                                j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                            }
                                            
                                        }

                                    }
                                }

                                j = j + "}";

                                datosR.push(JSON.parse(j));
                               
                                j = "{";
                            }
                            else {
                                if (j == "{") {
                                    for (key in data[i]) {
                                        if (key == "Dic") {
                                            j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"';
                                        } else {
                                            if (key == "id_variable") {
                                                j = j + '"Sector / dominio"' + ":" + '"' + data[i][key] + '"' + ",";
                                            } else if (key == "descripcion") {
                                                j = j + '"Descripción"' + ":" + '"' + data[i][key] + '"' + ",";
                                            } else {
                                                if (key == "anio") {
                                                } else {
                                                    j = j + '"' + key + " " + data[i]["anio"] + '"' + ":" + '"' + data[i][key] + '"' + ",";
                                                }
                                            }
                                        }
                                        
                                    }
                                } 

                                j = j +  "}";

                                datosR.push(JSON.parse(j));
                                j = "{";
                            }
                        }
                    }////
                }
                $scope.datosMin = datosR;
               
                if (aniosT.length == 0) { aniosT.push(data[i]["anio"]) }
                else {
                    if (aniosT.indexOf(data[i]["anio"]) > -1) { }
                    else { aniosT.push(data[i]["anio"]); }
                }
            }
            $scope.aniosMin = aniosT;
            for (var i = 0; i < aniosT.length; i++) {
                for (key in data[0]) {
                    aux = aux + 1;
                    if (aux > 3) {
                        if ($scope.mes.id_mes == 0) {
                            $scope.mesesConsulta.push({ nombre: key });
                           
                        } else {
                            if (data[0][key] == '') {

                            } else {
                                $scope.mesesConsulta.push({ nombre: key });
                            }
                        }

                    }
                }
                aux = 0;
            }
            if ($scope.mes.id_mes == 0 && $scope.anio.anio == "Todos" || $scope.mes.id_mes == 0 && $scope.anio.anio != "Todos") {
                $scope.colAnios = 12;
                
            } else {
                $scope.colAnios = alasql('select distinct nombre from ?', [$scope.mesesConsulta]);
            }
            } else {
                $scope.datosMin = "ERR";
            }
        })

  
 

}
});
function descargarFile() {
    window.location.href = "../archivos/coef_var_ems.xlsx";
}






