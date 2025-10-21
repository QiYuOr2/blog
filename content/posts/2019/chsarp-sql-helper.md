---
title: C# 封装SqlHelper
date: 2019/08/23 21:48:47
pubDate: 2019/08/23 21:48:47
tags: [CSharp,SQL Server,笔记]
category: 技术
description: 老师在讲C#实战项目时所使用的SqlHelper，使用的数据库是SQL Server

---

老师在讲C#实战项目时所使用的SqlHelper，使用的数据库是SQL Server

**注意，连接数据库的连接字符串需要在配置文件中设置好**
```xml
<appSettings>
    <add key = "connString" value="data source = .; database = CourseSelectionInfo; integrated security = true"/>
</appSettings>
```

```csharp
public class SqlHelper
{
    #region 连接字符串connString
    private static string connString;
    static SqlHelper()
    {
        connString = ConfigurationManager.AppSettings["connString"];
    }
    #endregion

    #region 增删改int ExcuteNonQuery(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    /// <summary>
    /// 增删改
    /// </summary>
    /// <param name="cmdText">sql</param>
    /// <param name="cmdType"></param>
    /// <param name="parameters">参数</param>
    /// <returns>修改了几行</returns>
    public static int ExcuteNonQuery(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    {
        using (SqlConnection connection = new SqlConnection(connString))
        {
            using (SqlCommand cmd = new SqlCommand(cmdText, connection))
            {
                cmd.CommandType = cmdType;
                connection.Open();
                if (parameters.Length > 0)
                {
                    cmd.Parameters.AddRange(parameters);
                }
                return cmd.ExecuteNonQuery();
            }
        }
    }
    #endregion

    #region 获取一个数据 T ExcuteScalar<T>(string cmdText,  CommandType cmdType, params SqlParameter[] parameters)
    /// <summary>
    /// 获取一个数据<T>
    /// </summary>
    /// <typeparam name="T">数据类型</typeparam>
    /// <param name="cmdText">sql</param>
    /// <param name="cmdType"></param>
    /// <param name="parameters">参数</param>
    /// <returns>任意类型的数据</returns>
    public static T ExcuteScalar<T>(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    {
        using (SqlConnection connection = new SqlConnection(connString))
        {
            using (SqlCommand cmd = new SqlCommand(cmdText, connection))
            {
                cmd.CommandType = cmdType;
                connection.Open();
                if (parameters.Length > 0)
                {
                    cmd.Parameters.AddRange(parameters);
                }
                return (T)cmd.ExecuteScalar();
            }
        }
    }
    #endregion

    #region 读取数据表SqlDataReader ExcuteReader(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    /// <summary>
    /// 读取数据表
    /// </summary>
    /// <param name="cmdText">sql</param>
    /// <param name="cmdType"></param>
    /// <param name="parameters">参数</param>
    /// <returns>SqlDataReader</returns>
    public static SqlDataReader ExcuteReader(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    {
        SqlConnection connection = new SqlConnection(connString);
            using (SqlCommand cmd = new SqlCommand(cmdText, connection))
            {
                cmd.CommandType = cmdType;
                connection.Open();
                if (parameters.Length > 0)
                {
                    cmd.Parameters.AddRange(parameters);
                }
                return cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
    }
    #endregion

    #region 临时数据库DataSet GetDataSet(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    /// <summary>
    /// 获取临时数据库
    /// </summary>
    /// <param name="cmdText"></param>
    /// <param name="cmdType"></param>
    /// <param name="parameters"></param>
    /// <returns></returns>
    public static DataSet GetDataSet(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    {
        DataSet ds = new DataSet();
        using (SqlConnection connection = new SqlConnection(connString))
        {
            using (SqlCommand cmd = new SqlCommand(cmdText, connection))
            {
                cmd.CommandType = cmdType;
                using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                {
                    if (parameters.Length > 0)
                    {
                        adapter.SelectCommand.Parameters.AddRange(parameters);
                    }
                    adapter.Fill(ds);
                }
            }
        }
        return ds;
    }
    #endregion

    #region 临时数据表DataTable GetDataTable(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    /// <summary>
    /// 获取临时数据表
    /// </summary>
    /// <param name="cmdText">sql</param>
    /// <param name="cmdType"></param>
    /// <param name="parameters">参数</param>
    /// <returns></returns>
    public static DataTable GetDataTable(string cmdText, CommandType cmdType, params SqlParameter[] parameters)
    {
        return GetDataSet(cmdText, cmdType, parameters).Tables[0];
    }
    #endregion
}
```