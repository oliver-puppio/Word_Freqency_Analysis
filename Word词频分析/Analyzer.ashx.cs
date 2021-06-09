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
using System.Collections;

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
                context.Response.Write(WordFrequency(Upfile(context), filename()));
                //context.Response.End();
            }

            else
            {
                context.Response.Write("No call");
            }

            context.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public string filename()
        {
            //获取传送的文件
            HttpPostedFile f = HttpContext.Current.Request.Files[0];
            return f.FileName;
        }

        public string Upfile(HttpContext context)
        {
            //获取传送的文件,并保存在library中
            context.Response.ContentType = "text/plain";
            //HttpPostedFile f = context.Request.Files[0];
            HttpPostedFile f = HttpContext.Current.Request.Files[0];
            f.SaveAs(HttpContext.Current.Server.MapPath("~/Library/" + f.FileName));
            string path = HttpContext.Current.Server.MapPath("~/Library/") + f.FileName;

            //读取word文件并提取文本内容到temp.txt中
            Document doc = new Document();
            doc.LoadFromFile(path);
            string s = doc.GetText();
            File.WriteAllText(HttpContext.Current.Server.MapPath("~/Library/tempt.txt"), s.ToString());
            string temp = HttpContext.Current.Server.MapPath("~/Library/tempt.txt");

            //读取txt文件
            string[] txt_str = File.ReadAllLines(temp, Encoding.UTF8);
            string str = "";
            foreach (string i in txt_str)
            {
                str += i;
            }

            return str;
        }

        public string WordFrequency(string str, string filename)
        {
            var segmenter = new JiebaSegmenter();
            var segments = segmenter.Cut(str);

            //1、建立存储词频的字典
            Dictionary<string, int> dic = new Dictionary<string, int>();
            for (int i = 0; i < segments.Count(); i++)
            {
                var tmpstr = segments.ElementAt(i);
                if (!dic.ContainsKey(tmpstr) && tmpstr.Length > 1)
                {
                    dic.Add(tmpstr, 1);
                }
                else if (dic.ContainsKey(tmpstr))
                {
                    dic[tmpstr]++;
                }
            }

            //2、从已有数据中剔除禁用词
            string[] stopwords = File.ReadAllLines(HttpContext.Current.Server.MapPath("stopwords.txt"));
            foreach (var item in dic.ToList())
            {
                if (item.Value == 1 || stopwords.Contains(item.Key))
                {
                    dic.Remove(item.Key);
                }
            }

            //3、排序
            var dicSort = from objDic in dic orderby objDic.Value descending select objDic;

            string wnf = "{filename:'" + filename + "',uptime:'" + DateTime.Now.ToString() + "',result:{";
            foreach (KeyValuePair<string, int> kvp in dicSort)
            {
                wnf += kvp.Key + ":" + kvp.Value + ",";
            }
            wnf += "}}";

            return wnf;
        }
    }
}