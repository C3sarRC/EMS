using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using Inegi;

namespace ems
{
    public class global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            //Obtiene excepción ocurrida
            Exception exLastError = Server.GetLastError();
            Exception exBaseException = Server.GetLastError().GetBaseException();

            Inegi.WebElements.ManejoErrores objError = new Inegi.WebElements.ManejoErrores();

            //Redirecciona a la página de error correspondiente según tipo de error http
            if (exLastError is HttpException)
            {
                HttpException exHttp = (HttpException)exLastError;
                switch (exHttp.GetHttpCode())
                {
                    case 404: Response.Redirect("/lib/error404.aspx");
                        break;
                    case 500:
                    case 503: objError.MandarErrorPorMail(exLastError, exBaseException);
                        Response.Redirect("/lib/error500.aspx");
                        break;
                    default: objError.MandarErrorPorMail(exLastError, exBaseException);
                        Response.Redirect("/lib/error500.aspx");
                        break;
                }
            }
            else
            { 
                //Manda mensaje por correo                                                  
                objError.MandarErrorPorMail(exLastError, exBaseException);
                Response.Redirect("error500.aspx");
            }
            
        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}