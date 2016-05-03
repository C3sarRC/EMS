<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="minero.aspx.cs" Inherits="ems.minero" ValidateRequest="false" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="robots" content="index, follow" />
    <meta name="title" content="Encuesta mensual de servicios" />
    <meta name="author" content="Instituto Nacional de Estadística y Geografía (INEGI)" />

    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-route.js"></script>
    <script type="text/javascript" src="js/angular-messages.min.js"></script>
    <script type="text/javascript" src="js/fusioncharts.js"></script>
    <script type="text/javascript" src="js/minero.js"></script>
    <script type="text/javascript" src="js/fusioncharts.charts.js"></script>
    <script type="text/javascript" src="js/alasql.min.js"></script>
    <script type="text/javascript" src="js/fusioncharts.theme.fint.js"></script>
    <link href="css/turista.css" type="text/css" rel="stylesheet" />

    <title>Encuesta mensual de servicios</title>
</head>

<body ng-app="ems">
    <form id="form1" runat="server">
    <div>

        <div ng-controller="minero">
    <table width="893" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; ">
        <tbody>
            <tr>
                <td height="32" align="center" valign="middle" bgcolor="#dee4e9" style="color: #012D59;" colspan="2">
                    <span class="band"><b>Consulta de información</b></span>
                </td>
            </tr>
            <tr>
                <td class="tdheight" height="15px" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>
                <td align="left" valign="middle" bgcolor="#ffffff" colspan="2">
                    <span class="texto">Variable:</span>
                </td>
            </tr>
            
            <tr>
                <td colspan="2">
                    <select ng-model="vari" ng-change="getSectores(vari)" ng-options="v.descripcion for v in variables track by v.id_variable" style="width:300px"></select>
                </td>
            </tr>
            <tr>
                <td class="tdheight" height="15px" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>
                <td align="center" valign="middle" bgcolor="#dee4e9" style="color: #012D59;" colspan="2">
                    <span class="band"><b>Actividad económica</b></span>
                </td>
            </tr>
            <tr>
                <td class="tdheight" height="15px" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <span class="texto">Sector SCIAN:</span>
                </td>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <span class="texto">Actividad económica:</span>
                </td>
            </tr>
            <tr>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <select ng-model="sec" ng-change="getActividad(sec)" ng-options="v.id_variable + ' '+v.descripcion for v in sectores " style="width: 300px;"></select>
                </td>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <select ng-model="act" ng-disabled="sec.id_variable==''" ng-options="v.id_variable+' '+v.descripcion for v in actividades " style="width: 300px;"></select>

                </td>
            </tr>
            <tr>
                <td class="tdheight" height="15px" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>
                <td align="left" valign="middle" bgcolor="#ffffff" colspan="2">
                    <span class="texto">Tipo de dato:</span>
                </td>
            </tr>
            <tr>
                <td align="left" valign="middle" bgcolor="#ffffff" colspan="2">
                    <select ng-model="tipoDat" ng-options=" t.nombre for t in tipo_datos " style="width: 300px;"></select>
                </td>
            </tr>
            <tr>
                <td class="tdheight" height="15px" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>
                <td align="center" valign="middle" bgcolor="#dee4e9" style="color: #012D59;" colspan="2">
                    <span class="band"><b>Periodo:</b></span>
                </td>
            </tr>
            <tr>
                <td class="tdheight" height="15px" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <span class="texto">Año:</span>
                </td>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <span class="texto">Mes:</span>
                </td>
            </tr>
            <tr>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <select ng-model="anio" ng-options="an.anio for an in aniosMinCon"></select>
                </td>
                <td align="left" valign="middle" bgcolor="#ffffff">
                    <select ng-model="mes" ng-options=" m.nombre for m in meses " style="width: 100px;"></select>
                </td>
            </tr>

            <tr ng-show="datosMin=='ERR'" >
                <td colspan="2" class=" tdheight" align="center" valign="middle" bgcolor="#FFFFFF">
                    <br />
                    <span id="lbError" style="color:Red;">No se encontraron registros con los parámetros establecidos</span>
                </td>
            </tr>
            <tr ><td height="15px"></td></tr>  
            <tr>

                <td align="center" valign="middle" bgcolor="#f0f0f0" colspan="2">
                    <input name="btnConsulta" id="btnConsulta" type="button" ng-click="consulta()" value="Ver consulta">
                </td>
            </tr>
            <tr>
                <td align="left" class="tdheight" height="15px" valign="middle" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>
                <td align="center" valign="middle" bgcolor="#dee4e9" style="color: #012D59;" colspan="2">
                    <span class="band"><b>Indicadores de precisión estadística:</b></span>
                </td>
            </tr>


            <tr>
                <td class="tdheight" height="15px" bgcolor="#ffffff" colspan="2"></td>
            </tr>
            <tr>

                <td align="center" valign="middle" bgcolor="#f0f0f0" colspan="2">
                    <input name="Descargar" id="Descargar" onclick="descargarFile()" type="button" value="Descargar">
                </td>
            </tr>

        </tbody>
    </table>
    <table></table>
    <div ng-hide="datosMin=='' || datosMin=='ERR'" ng-init="datosMin=''">
        <div id="divCuadro" style="width: 880px; height: 890px; overflow: scroll;">
            <table>
                <tbody>
                    <tr>
                        <td colspan="3">
                            <span class="encabezadoINEGI" style="color: rgb(0, 102, 153); font-family: Arial, Helvetica, sans-serif; font-size: 10pt;">INEGI. Encuesta Mensual de Servicios</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span class="encabezado" style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 10pt;">Índice (base 2008=100) de ingresos por la prestación del servicio según sector y dominio</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table cellspacing="0" cellpadding="4"    ng-show="datosMin.length>0" style="table-layout: fixed; width:100%; font-family: Arial, Helvetica, sans-serif; font-size: 13px; ">
                <tbody>
                    <tr>
                        <td width="100px;" style="border-width: 1pt 1pt 1pt medium; font-size: 8pt; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; " bgcolor="#c6c1ff" rowspan="2">Sector/dominio</td>
                        <td width="500px;" style="border-width: 1pt 1pt 1pt medium; font-size: 8pt; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; " bgcolor="#c6c1ff" rowspan="2" >Descripción</td>
                        <td width="{{tamDin*50 +'px'}}" style="border-width: 1pt 1pt 1pt medium; font-size: 8pt; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 8pt;" bgcolor="#c6c1ff" colspan="{{colAnios}}" ng-repeat="a in aniosMin">{{a}}</td>
                    </tr>
                    <tr>
                        <td width="50px" style="border-width: 1pt 1pt 1pt medium; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 8pt;" bgcolor="#c6c1ff" ng-repeat="m in mesesConsulta">{{m.nombre}}</td>
                    </tr>

                    <tr ng-repeat="x in datosMin track by $index">
                        <td style="text-align:right" width="100px;"><span ng-show="x['Sector / dominio']==0"></span><span ng-show="x['Sector / dominio']!=0">{{x["Sector / dominio"]}}</span></td>
                        <td style="text-align:left; width:500px;">{{x["Descripción"]}}</td>
                        <td style="text-align:right" width="50px;" ng-repeat="i in x track by $index" ng-hide="i=='' || i==x['Sector / dominio'] || i==x['Descripción']">{{i}}</td>
                    
                    </tr>

                </tbody>
            </table>
            <table cellspacing="0" cellpadding="4"   id="datos"    ng-show="datosMin.length>0" style=" display:none;table-layout: fixed; width:100%; font-family: Arial, Helvetica, sans-serif; font-size: 13px; ">
                <tbody>
                     <tr>
                        <td colspan="3">
                            <span class="encabezadoINEGI" style="color: rgb(0, 102, 153); font-family: Arial, Helvetica, sans-serif; font-size: 10pt;">INEGI. Encuesta Mensual de Servicios</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span class="encabezado" style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 10pt;">Índice (base 2008=100) de ingresos por la prestación del servicio según sector y dominio</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="100px;" style="border-width: 1pt 1pt 1pt medium; font-size: 8pt; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; " bgcolor="#c6c1ff" rowspan="2">Sector/dominio</td>
                        <td width="500px;" style="border-width: 1pt 1pt 1pt medium; font-size: 8pt; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; " bgcolor="#c6c1ff" rowspan="2" >Descripción</td>
                        <td width="{{tamDin*50 +'px'}}" style="border-width: 1pt 1pt 1pt medium; font-size: 8pt; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 8pt;" bgcolor="#c6c1ff" colspan="{{colAnios}}" ng-repeat="a in aniosMin">{{a}}</td>
                    </tr>
                    <tr>
                        <td width="50px" style="border-width: 1pt 1pt 1pt medium; border-style: solid solid solid none; border-color: rgb(242, 242, 242) rgb(242, 242, 242) rgb(242, 242, 242) currentColor; border-image: none; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 8pt;" bgcolor="#c6c1ff" ng-repeat="m in mesesConsulta">{{m.nombre}}</td>
                    </tr>
                    <tr ng-repeat="x in datosMin track by $index">
                        <td width="50px;" ng-repeat="i in x track by $index" ng-hide="i=='' || i==0">{{i}}</td>
                    </tr>
                    <tr style="font-size:8pt;">
                        <br />
                        <td colspan="3"><strong>Nota:</strong> Información preliminar a partir de Enero de 2008.</td>
                    </tr>
                    <tr style="font-size:8pt;">
                        <td colspan="3"><strong>Nota:</strong> La agrupación presentada obedece al Sistema de Clasificación Industrial de América del Norte, México (SCIAN 2007). La cobertura de los datos a nivel de sector no incluye la totalidad de actividades económicas que se desarrollan dentro de cada uno de ellos; lo anterior se debe a que el diseño de la muestra no consideró al Sector como dominio de estudio. Sin embargo, las actividades consideradas para cada Sector representan alrededor del 80% o más del valor de los ingresos del Sector correspondiente, excepto para los Sectores 53 y 71 donde la cobertura es mayor al 50%.</td>
                    </tr>
                    <tr>
                        <td colspan="3"><a href="http://www.inegi.org.mx/est/contenidos/proyectos/encuestas/establecimientos/terciario/ems/default.aspx" target="_top">www.inegi.org.mx/est/contenidos/proyectos/encuestas/establecimientos/terciario/ems/default.aspx</a></td>
                    </tr>
                </tbody>
            </table>
            <asp:HiddenField ID="truco" runat="server" />
            <table width="893" class="tabla" style="font-family: Arial, Helvetica, sans-serif; font-size: 8pt;">
                <tbody>
                    <tr>
                        <td colspan="3"><strong>Nota:</strong> Información preliminar a partir de Enero de 2008.</td>
                    </tr>
                    <tr>
                        <td colspan="3"><strong>Nota:</strong> La agrupación presentada obedece al Sistema de Clasificación Industrial de América del Norte, México (SCIAN 2007). La cobertura de los datos a nivel de sector no incluye la totalidad de actividades económicas que se desarrollan dentro de cada uno de ellos; lo anterior se debe a que el diseño de la muestra no consideró al Sector como dominio de estudio. Sin embargo, las actividades consideradas para cada Sector representan alrededor del 80% o más del valor de los ingresos del Sector correspondiente, excepto para los Sectores 53 y 71 donde la cobertura es mayor al 50%.</td>
                    </tr>
                    <tr>
                        <td colspan="3"><a href="http://www.inegi.org.mx/est/contenidos/proyectos/encuestas/establecimientos/terciario/ems/default.aspx" target="_top">www.inegi.org.mx/est/contenidos/proyectos/encuestas/establecimientos/terciario/ems/default.aspx</a></td>
                    </tr>
                </tbody>
            </table>

        </div>
        <table>
            <tr>
                <td align="left" style="font-family: Arial, Helvetica, sans-serif; font-size: 8pt;">
                    <br>
                    <br>
                    <span class="tabla">
                        Para descargar la consulta a un archivo, seleccione el formato y pulse el botón "Exportar"
                    </span>
                    <br>
                    <br>
                </td>
            </tr>
            <tr>
                <td align="left" style="font-family: Arial, Helvetica, sans-serif; font-size: 8pt;">
                    <select name="ddlExportaMinero" id="ddlExportaMinero" style="width: 200px;">
                        <option value="1">Excel 5.0 (.xls)</option>
                    </select>
                    <asp:Button ID="exp" runat="server" Text="Exportar"  OnClick="exp_Click" />
                </td>
            </tr>
        </table>
    </div>
    </div>

    </div>
    </form>
</body>
</html>
