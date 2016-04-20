using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data.OleDb;

namespace ems
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
        [System.Web.Script.Services.ScriptService]
    public class turista : System.Web.Services.WebService
    {
        cnx cnx;
        SqlDataReader rdr;
        [WebMethod]
        public string MostrarDatos(string tipo_dato, string variable, string actividad)
        {
         try
            {

                cnx = new cnx();
                SqlParameter[] parameters = new SqlParameter[3];
                parameters[0] = new SqlParameter() { ParameterName = "@TIPO_DATO", Value = tipo_dato };
                parameters[1] = new SqlParameter() { ParameterName = "@VARIABLE", Value = variable };
                parameters[2] = new SqlParameter() { ParameterName = "@ACTIVIDAD", Value = actividad };
                rdr = cnx.ExecuteCommand("PR_CONSULTA_I_V_TURISTA", CommandType.StoredProcedure, parameters);
                List<datos> list = new List<datos>();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        datos f = new datos()
                        {
                            descripcion = rdr["descripcion"].ToString(),
                            anio = rdr["anio"].ToString(),
                             Enero = rdr["Enero"].ToString(),
                             Febrero = rdr["Febrero"].ToString(),
                             Marzo = rdr["Marzo"].ToString(),
                             Abril = rdr["Abril"].ToString(),
                             Mayo = rdr["Mayo"].ToString(),
                             Junio = rdr["Junio"].ToString(),
                             Julio = rdr["Julio"].ToString(),
                             Agosto = rdr["Agosto"].ToString(),
                             Septiembre = rdr["Septiembre"].ToString(),
                             Octubre = rdr["Octubre"].ToString(),
                             Noviembre = rdr["Noviembre"].ToString(),
                             Diciembre = rdr["Diciembre"].ToString(),
                            anioAct = rdr["anioAct"].ToString(),
                            EneroAct = rdr["EneroAct"].ToString(),
                            FebreroAct = rdr["FebreroAct"].ToString(),
                            MarzoAct = rdr["MarzoAct"].ToString(),
                            AbrilAct = rdr["AbrilAct"].ToString(),
                            MayoAct = rdr["MayoAct"].ToString(),
                            JunioAct = rdr["JunioAct"].ToString(),
                            JulioAct = rdr["JulioAct"].ToString(),
                            AgostoAct = rdr["AgostoAct"].ToString(),
                            SeptiembreAct = rdr["SeptiembreAct"].ToString(),
                            OctubreAct = rdr["OctubreAct"].ToString(),
                            NoviembreAct = rdr["NoviembreAct"].ToString(),
                            DiciembreAct = rdr["DiciembreAct"].ToString(),

                        };
                        list.Add(f);
                    }
                    rdr.Close();
                    rdr = null;
                    string data = JsonConvert.SerializeObject(list);
                    return data;
                }

            }
            catch (Exception ex)
            {
                return "exception";
            }
            return "";
        }

        [WebMethod]
        public string getVariable()
        {
            try
            {
                cnx = new cnx();
                rdr = cnx.ExecuteCommand("PR_OBTIENE_EMS_VARIABLES", CommandType.StoredProcedure);


                List<variable> list = new List<variable>();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        variable f = new variable()
                        {
                            id_variable = rdr["ID_VARIABLE"].ToString(),
                            descripcion = rdr["DESCRIPCION"].ToString()
                        };
                        list.Add(f);
                    }
                    rdr.Close();
                    rdr = null;
                    string data = JsonConvert.SerializeObject(list);
                    return data;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return "";

        }
        [WebMethod]
        public string getEstatus(string idFuente)
        {
            try
            {

                cnx = new cnx();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter() { ParameterName = "@ID_FUENTE", Value = idFuente };
                rdr = cnx.ExecuteCommand("PR_OBTIENE_EMS_METADATO_TURISTA", CommandType.StoredProcedure, parameters);
                List<estatus> list = new List<estatus>();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        estatus f = new estatus()
                        {
                            idEstatus = rdr["ID_ESTATUS"].ToString(),
                            nombre = rdr["DESCRIPCION"].ToString()
                        };
                        list.Add(f);
                    }
                    rdr.Close();
                    rdr = null;
                    string data = JsonConvert.SerializeObject(list);
                    return data;
                }

            }
            catch (Exception ex)
            {
                return "exception";
            }
            return "";
        }
        [WebMethod]
        public string getAnios(string dat)
        {
            try
            {
                cnx = new cnx();
                rdr = cnx.ExecuteCommand("PR_OBTIENE_EMS_ANIOS", CommandType.StoredProcedure);


                List<anios> list = new List<anios>();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        anios f = new anios()
                        {
                            anio = rdr["ANIO"].ToString(),
                            
                        };
                        list.Add(f);
                    }
                    rdr.Close();
                    rdr = null;
                    string data = JsonConvert.SerializeObject(list);
                    return data;
                   
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return "";
        }

        [WebMethod]
        public string sector(string variable)
        {
            try
            {
                cnx = new cnx();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter() { ParameterName = "@ID_VARIABLE", Value = variable };
                rdr = cnx.ExecuteCommand("PR_OBTIENE_EMS_ACTIVIDAD_VARIABLE", CommandType.StoredProcedure, parameters);


                List<variable> list = new List<variable>();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        variable f = new variable()
                        {
                            id_variable = rdr["ID_ACTIVIDAD_PADRE"].ToString(),
                            descripcion = rdr["DESCRIPCION"].ToString()
                        };
                        list.Add(f);
                    }
                    rdr.Close();
                    rdr = null;
                    string data = JsonConvert.SerializeObject(list);
                    return data;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return "";
        }
        [WebMethod]
        public string actividad(string actividad)
        {
            try
            {
                cnx = new cnx();

                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter() { ParameterName = "@ID_ACTIVIDAD", Value = actividad };
                rdr = cnx.ExecuteCommand("PR_OBTIENE_EMS_ACTIVIDAD_ACTIVIDAD", CommandType.StoredProcedure, parameters);


                List<variable> list = new List<variable>();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        variable f = new variable()
                        {
                            id_variable = rdr["ID_ACTIVIDAD"].ToString(),
                            descripcion = rdr["DESCRIPCION"].ToString()
                        };
                        list.Add(f);
                    }
                    rdr.Close();
                    rdr = null;
                    string data = JsonConvert.SerializeObject(list);
                    return data;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return "";
        }

        [WebMethod]
        public string getMinero(string variable,  string actividad,string tipo_dato, string anio,string mes) {
            try 
	            {	        
		
                    cnx = new cnx();
                    SqlParameter[] parameters = new SqlParameter[5];
                    parameters[0] = new SqlParameter() { ParameterName = "@VARIABLE", Value = variable };
                    parameters[1] = new SqlParameter() { ParameterName = "@PER", Value = mes };
                    parameters[2] = new SqlParameter() { ParameterName = "@TIPO_DATO", Value = tipo_dato };
                    parameters[3] = new SqlParameter() { ParameterName = "@ANIO", Value = anio };
                    parameters[4] = new SqlParameter() { ParameterName = "@ACTIVIDAD", Value = actividad };
                    rdr = cnx.ExecuteCommand("PR_CONSULTA_MINERO", CommandType.StoredProcedure, parameters);
                    List<datosMinero> list = new List<datosMinero>();
                    if (rdr.HasRows)
                    {
                        while (rdr.Read())
                        {
                            datosMinero f = new datosMinero()
                            {
                                id_variable=rdr["ID_ACTIVIDAD"].ToString(),
                                descripcion = rdr["descripcion"].ToString(),
                                anio = rdr["anio"].ToString(),
                                 Ene = rdr["Ene"].ToString(),
                                 Feb = rdr["Feb"].ToString(),
                                 Mar = rdr["Mar"].ToString(),
                                 Abr = rdr["Abr"].ToString(),
                                 May = rdr["May"].ToString(),
                                 Jun = rdr["Jun"].ToString(),
                                 Jul = rdr["Jul"].ToString(),
                                 Ago = rdr["Ago"].ToString(),
                                 Sep = rdr["Sep"].ToString(),
                                 Oct = rdr["Oct"].ToString(),
                                 Nov = rdr["Nov"].ToString(),
                                 Dic = rdr["Dic"].ToString()
                           

                            };
                            list.Add(f);
                        }
                        rdr.Close();
                        rdr = null;
                        string data = JsonConvert.SerializeObject(list);
                        return data;
                    }
	            }
	            catch (Exception)
	            {
		
		            throw;
	            }
            return "";
        }
    }
}
public class datos
{
    public string descripcion { set; get; }
    public string anio { set; get; }
    public string Enero { set; get; }
    public string Febrero { set; get; }
    public string Marzo { set; get; }
    public string Abril { set; get; }
    public string Mayo { set; get; }
    public string Junio { set; get; }
    public string Julio { set; get; }
    public string Agosto { set; get; }
    public string Septiembre { set; get; }
    public string Octubre { set; get; }
    public string Noviembre { set; get; }
    public string Diciembre { set; get; }
    public string anioAct { set; get; }
    public string EneroAct { set; get; }
    public string FebreroAct { set; get; }
    public string MarzoAct { set; get; }
    public string AbrilAct { set; get; }
    public string MayoAct { set; get; }
    public string JunioAct { set; get; }
    public string JulioAct { set; get; }
    public string AgostoAct { set; get; }
    public string SeptiembreAct { set; get; }
    public string OctubreAct { set; get; }
    public string NoviembreAct { set; get; }
    public string DiciembreAct { set; get; }
}
public class datosMinero
{
    public string id_variable { set; get; }
    public string descripcion { set; get; }
    public string anio { set; get; }
    public string Ene { set; get; }
    public string Feb { set; get; }
    public string Mar { set; get; }
    public string Abr { set; get; }
    public string May { set; get; }
    public string Jun { set; get; }
    public string Jul { set; get; }
    public string Ago { set; get; }
    public string Sep { set; get; }
    public string Oct { set; get; }
    public string Nov { set; get; }
    public string Dic { set; get; }

}
public class variable
{
    public string id_variable { set; get; }
    public string descripcion { set; get; }
}
public class estatus
{
    public string idEstatus { set; get; }
    public string nombre { set; get; }
}
public class anios {
    public string anio { set; get; }
}