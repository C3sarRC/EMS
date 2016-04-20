using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ems
{
    public partial class minero : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void exp_Click(object sender, EventArgs e)
        {
            string output = truco.Value;



            if (output != "")
            {
                Response.AddHeader("content-disposition", "attachment;filename=EMS.xls");
                Response.ContentEncoding = System.Text.Encoding.Unicode;
                Response.BinaryWrite(System.Text.Encoding.Unicode.GetPreamble());
                Response.ContentType = "application/vnd.xls";
                Response.Write(output);


            }
            Response.End();
        }

   
    }
}