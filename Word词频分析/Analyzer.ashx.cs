using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Word词频分析
{
    /// <summary>
    /// Analyzer 的摘要说明
    /// </summary>
    public class Analyzer : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}