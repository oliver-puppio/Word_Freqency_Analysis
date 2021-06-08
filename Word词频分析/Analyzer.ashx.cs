using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using Spire.Doc;
using Spire.Doc.Documents;
using System.Threading.Tasks;
using JiebaNet.Segmenter;

namespace Word词频分析
{
    /// <summary>
    /// Analyzer 的摘要说明
    /// </summary>
    public class Analyzer : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {               
                //获取传送的文件,并保存在library中
                context.Response.ContentType = "text/plain";             
                //HttpPostedFile f = context.Request.Files[0];
                HttpPostedFile f = HttpContext.Current.Request.Files[0];
                f.SaveAs(HttpContext.Current.Server.MapPath("Library/" + f.FileName));
                string path = HttpContext.Current.Server.MapPath("~/Library/") +f.FileName;

                //读取word文件
                Document doc = new Document();
                doc.LoadFromFile(path);
                string s = doc.GetText();
                File.WriteAllText(HttpContext.Current.Server.MapPath("~/Library/tempt.txt"), s.ToString());
                string temp = HttpContext.Current.Server.MapPath("~/Library/tempt.txt");

                //读取txt文件
                string[] txt_str = File.ReadAllLines(temp, Encoding.UTF8);
                string str="";
                foreach (string i in txt_str)
                {
                    str+=i;
                }

                //处理词频
                var segmenter = new JiebaSegmenter();                
                var segments = segmenter.Cut(str);

                Dictionary<string, int> dic = new Dictionary<string, int>();
                //遍历segments列表
                for (int i = 0; i < segments.Count(); i++)
                {
                    var tmpstr = segments.ElementAt(i);
                    if (!dic.ContainsKey(tmpstr))
                    {
                        dic.Add(tmpstr, 1);
                    }
                    else
                    {
                        dic[tmpstr]++;
                    }
                }


                //字典类型用上面的方法遍历访问key和value。
                string wnf = "{";
                foreach (KeyValuePair<string, int> kvp in dic)
                {
                    wnf += "'" + kvp.Key + "':" + kvp.Value + ";";
                }
                wnf += "}";
                context.Response.Write(wnf);
            }

            else
                context.Response.Write("No call");
            context.Response.End();
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



