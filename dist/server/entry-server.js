"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var vue = require("vue");
var vueRouter = require("vue-router");
var serverRenderer = require("vue/server-renderer");
var head = require("@vueuse/head");
var runtimeCore = require("@vue/runtime-core");
var FectUI = require("@fect-ui/vue");
var vueIcons = require("@fect-ui/vue-icons");
var path = require("path");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var FectUI__default = /* @__PURE__ */ _interopDefaultLegacy(FectUI);
const pageCache = {
  page: 1,
  read() {
    return Number(this.page || 1);
  },
  cache(val) {
    return this.page = Number(val);
  },
  increase() {
    let page = this.read();
    this.cache(++page);
    return page;
  },
  decrease() {
    let page = this.read();
    this.cache(--page);
    return page;
  }
};
const title$x = "C# \u5C01\u88C5SqlHelper";
const date$x = "2019/08/23 21:48:47";
const tags$t = ["CSharp", "SQL Server"];
const category$t = "\u6280\u672F";
const summary$x = "\u8001\u5E08\u5728\u8BB2C#\u5B9E\u6218\u9879\u76EE\u65F6\u6240\u4F7F\u7528\u7684SqlHelper\uFF0C\u4F7F\u7528\u7684\u6570\u636E\u5E93\u662FSQL Server";
const meta$x = [{ "property": "og:title", "content": "C# \u5C01\u88C5SqlHelper" }];
const _sfc_main$K = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "C# \u5C01\u88C5SqlHelper", "date": "2019/08/23 21:48:47", "tags": ["CSharp", "SQL Server"], "category": "\u6280\u672F", "summary": "\u8001\u5E08\u5728\u8BB2C#\u5B9E\u6218\u9879\u76EE\u65F6\u6240\u4F7F\u7528\u7684SqlHelper\uFF0C\u4F7F\u7528\u7684\u6570\u636E\u5E93\u662FSQL Server", "meta": [{ "property": "og:title", "content": "C# \u5C01\u88C5SqlHelper" }] };
    expose({ frontmatter });
    const head$1 = { "title": "C# \u5C01\u88C5SqlHelper", "meta": [{ "property": "og:title", "content": "C# \u5C01\u88C5SqlHelper" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u8001\u5E08\u5728\u8BB2C#\u5B9E\u6218\u9879\u76EE\u65F6\u6240\u4F7F\u7528\u7684SqlHelper\uFF0C\u4F7F\u7528\u7684\u6570\u636E\u5E93\u662FSQL Server</p><p><strong>\u6CE8\u610F\uFF0C\u8FDE\u63A5\u6570\u636E\u5E93\u7684\u8FDE\u63A5\u5B57\u7B26\u4E32\u9700\u8981\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u8BBE\u7F6E\u597D</strong></p><pre class="language-XML"><code class="language-XML">&lt;appSettings&gt;
    &lt;add key = &quot;connString&quot; value=&quot;data source = .; database = CourseSelectionInfo; integrated security = true&quot;/&gt;
&lt;/appSettings&gt;
</code></pre><pre class="language-cs"><code class="language-cs"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SqlHelper</span>
<span class="token punctuation">{</span>
    <span class="token preprocessor property">#<span class="token directive keyword">region</span> \u8FDE\u63A5\u5B57\u7B26\u4E32connString</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> connString<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token function">SqlHelper</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        connString <span class="token operator">=</span> ConfigurationManager<span class="token punctuation">.</span>AppSettings<span class="token punctuation">[</span><span class="token string">&quot;connString&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token preprocessor property">#<span class="token directive keyword">region</span> \u589E\u5220\u6539</span><span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">ExcuteNonQuery</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u589E\u5220\u6539</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdText&quot;&gt;sql&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdType&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;parameters&quot;&gt;\u53C2\u6570&lt;/param&gt;</span>
    <span class="token comment">/// &lt;returns&gt;\u4FEE\u6539\u4E86\u51E0\u884C&lt;/returns&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">ExcuteNonQuery</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlConnection</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span>connString<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlCommand</span> cmd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span>cmdText<span class="token punctuation">,</span> connection<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                cmd<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> cmdType<span class="token punctuation">;</span>
                connection<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>parameters<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    cmd<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> cmd<span class="token punctuation">.</span><span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token preprocessor property">#<span class="token directive keyword">region</span> \u83B7\u53D6\u4E00\u4E2A\u6570\u636E </span><span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">ExcuteScalar</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span>  <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u83B7\u53D6\u4E00\u4E2A\u6570\u636E&lt;T&gt;</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token comment">/// &lt;typeparam name=&quot;T&quot;&gt;\u6570\u636E\u7C7B\u578B&lt;/typeparam&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdText&quot;&gt;sql&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdType&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;parameters&quot;&gt;\u53C2\u6570&lt;/param&gt;</span>
    <span class="token comment">/// &lt;returns&gt;\u4EFB\u610F\u7C7B\u578B\u7684\u6570\u636E&lt;/returns&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">ExcuteScalar</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlConnection</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span>connString<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlCommand</span> cmd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span>cmdText<span class="token punctuation">,</span> connection<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                cmd<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> cmdType<span class="token punctuation">;</span>
                connection<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>parameters<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    cmd<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span>T<span class="token punctuation">)</span>cmd<span class="token punctuation">.</span><span class="token function">ExecuteScalar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token preprocessor property">#<span class="token directive keyword">region</span> \u8BFB\u53D6\u6570\u636E\u8868</span><span class="token return-type class-name">SqlDataReader</span> <span class="token function">ExcuteReader</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u8BFB\u53D6\u6570\u636E\u8868</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdText&quot;&gt;sql&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdType&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;parameters&quot;&gt;\u53C2\u6570&lt;/param&gt;</span>
    <span class="token comment">/// &lt;returns&gt;SqlDataReader&lt;/returns&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">SqlDataReader</span> <span class="token function">ExcuteReader</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SqlConnection</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span>connString<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlCommand</span> cmd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span>cmdText<span class="token punctuation">,</span> connection<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                cmd<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> cmdType<span class="token punctuation">;</span>
                connection<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>parameters<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    cmd<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> cmd<span class="token punctuation">.</span><span class="token function">ExecuteReader</span><span class="token punctuation">(</span>CommandBehavior<span class="token punctuation">.</span>CloseConnection<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token preprocessor property">#<span class="token directive keyword">region</span> \u4E34\u65F6\u6570\u636E\u5E93</span><span class="token return-type class-name">DataSet</span> <span class="token function">GetDataSet</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u83B7\u53D6\u4E34\u65F6\u6570\u636E\u5E93</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdText&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdType&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;parameters&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;returns&gt;&lt;/returns&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">DataSet</span> <span class="token function">GetDataSet</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">DataSet</span> ds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlConnection</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span>connString<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlCommand</span> cmd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span>cmdText<span class="token punctuation">,</span> connection<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                cmd<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> cmdType<span class="token punctuation">;</span>
                <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">SqlDataAdapter</span> adapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlDataAdapter</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>parameters<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        adapter<span class="token punctuation">.</span>SelectCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    adapter<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span>ds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ds<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token preprocessor property">#<span class="token directive keyword">region</span> \u4E34\u65F6\u6570\u636E\u8868</span><span class="token return-type class-name">DataTable</span> <span class="token function">GetDataTable</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u83B7\u53D6\u4E34\u65F6\u6570\u636E\u8868</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdText&quot;&gt;sql&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;cmdType&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;parameters&quot;&gt;\u53C2\u6570&lt;/param&gt;</span>
    <span class="token comment">/// &lt;returns&gt;&lt;/returns&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">DataTable</span> <span class="token function">GetDataTable</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> cmdText<span class="token punctuation">,</span> <span class="token class-name">CommandType</span> cmdType<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">GetDataSet</span><span class="token punctuation">(</span>cmdText<span class="token punctuation">,</span> cmdType<span class="token punctuation">,</span> parameters<span class="token punctuation">)</span><span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
<span class="token punctuation">}</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/chsarp-sql-helper.md");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
var __glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$x,
  date: date$x,
  tags: tags$t,
  category: category$t,
  summary: summary$x,
  meta: meta$x,
  "default": _sfc_main$K
}, Symbol.toStringTag, { value: "Module" }));
const title$w = "C# HtmlAgilityPack+Selenium\u722C\u53D6\u9700\u8981\u62C9\u52A8\u6EDA\u52A8\u6761\u7684\u9875\u9762\u5185\u5BB9";
const date$w = "2019/09/05 12:02:37";
const tags$s = ["CSharp", "Web Crawler"];
const category$s = "\u6280\u672F";
const summary$w = "\u73B0\u5728\u5927\u591A\u6570\u7F51\u7AD9\u90FD\u662F\u968F\u7740\u6EDA\u52A8\u6761\u7684\u6ED1\u52A8\u52A0\u8F7D\u9875\u9762\u5185\u5BB9\u7684\uFF0C\u56E0\u6B64\u5355\u7EAF\u83B7\u5F97\u9759\u6001\u9875\u9762\u7684Html\u662F\u65E0\u6CD5\u83B7\u5F97\u5168\u90E8\u7684\u9875\u9762\u5185\u5BB9\u7684\u3002\u4F7F\u7528Selenium\u5C31\u53EF\u4EE5\u6A21\u62DF\u6D4F\u89C8\u5668\u62C9\u52A8\u6ED1\u52A8\u6761\u6765\u52A0\u8F7D\u6240\u6709\u9875\u9762\u5185\u5BB9...";
const meta$w = [{ "property": "og:title", "content": "C# HtmlAgilityPack+Selenium\u722C\u53D6\u9700\u8981\u62C9\u52A8\u6EDA\u52A8\u6761\u7684\u9875\u9762\u5185\u5BB9" }];
const _sfc_main$J = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "C# HtmlAgilityPack+Selenium\u722C\u53D6\u9700\u8981\u62C9\u52A8\u6EDA\u52A8\u6761\u7684\u9875\u9762\u5185\u5BB9", "date": "2019/09/05 12:02:37", "tags": ["CSharp", "Web Crawler"], "category": "\u6280\u672F", "summary": "\u73B0\u5728\u5927\u591A\u6570\u7F51\u7AD9\u90FD\u662F\u968F\u7740\u6EDA\u52A8\u6761\u7684\u6ED1\u52A8\u52A0\u8F7D\u9875\u9762\u5185\u5BB9\u7684\uFF0C\u56E0\u6B64\u5355\u7EAF\u83B7\u5F97\u9759\u6001\u9875\u9762\u7684Html\u662F\u65E0\u6CD5\u83B7\u5F97\u5168\u90E8\u7684\u9875\u9762\u5185\u5BB9\u7684\u3002\u4F7F\u7528Selenium\u5C31\u53EF\u4EE5\u6A21\u62DF\u6D4F\u89C8\u5668\u62C9\u52A8\u6ED1\u52A8\u6761\u6765\u52A0\u8F7D\u6240\u6709\u9875\u9762\u5185\u5BB9...", "meta": [{ "property": "og:title", "content": "C# HtmlAgilityPack+Selenium\u722C\u53D6\u9700\u8981\u62C9\u52A8\u6EDA\u52A8\u6761\u7684\u9875\u9762\u5185\u5BB9" }] };
    expose({ frontmatter });
    const head$1 = { "title": "C# HtmlAgilityPack+Selenium\u722C\u53D6\u9700\u8981\u62C9\u52A8\u6EDA\u52A8\u6761\u7684\u9875\u9762\u5185\u5BB9", "meta": [{ "property": "og:title", "content": "C# HtmlAgilityPack+Selenium\u722C\u53D6\u9700\u8981\u62C9\u52A8\u6EDA\u52A8\u6761\u7684\u9875\u9762\u5185\u5BB9" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u73B0\u5728\u5927\u591A\u6570\u7F51\u7AD9\u90FD\u662F\u968F\u7740\u6EDA\u52A8\u6761\u7684\u6ED1\u52A8\u52A0\u8F7D\u9875\u9762\u5185\u5BB9\u7684\uFF0C\u56E0\u6B64\u5355\u7EAF\u83B7\u5F97\u9759\u6001\u9875\u9762\u7684Html\u662F\u65E0\u6CD5\u83B7\u5F97\u5168\u90E8\u7684\u9875\u9762\u5185\u5BB9\u7684\u3002\u4F7F\u7528Selenium\u5C31\u53EF\u4EE5\u6A21\u62DF\u6D4F\u89C8\u5668\u62C9\u52A8\u6ED1\u52A8\u6761\u6765\u52A0\u8F7D\u6240\u6709\u9875\u9762\u5185\u5BB9\u3002</p><h2 id="%E5%89%8D%E6%83%85%E6%8F%90%E8%A6%81" tabindex="-1">\u524D\u60C5\u63D0\u8981</h2><ul><li><a href="https://qiyuor2.github.io/2019/09/04/CSharpHtmlAgilityPack/">C#HtmlAgilityPack\u722C\u53D6\u9759\u6001\u9875\u9762</a></li></ul><h2 id="selenium%E7%AE%80%E4%BB%8B" tabindex="-1">Selenium\u7B80\u4ECB</h2><p>Selenium\u662F\u4E00\u4E2AWEB\u81EA\u52A8\u5316\u6D4B\u8BD5\u5DE5\u5177\u3002Selenium\u6D4B\u8BD5\u76F4\u63A5\u8FD0\u884C\u5728\u6D4F\u89C8\u5668\u4E2D\uFF0C\u5C31\u50CF\u771F\u6B63\u7684\u7528\u6237\u5728\u64CD\u4F5C\u4E00\u6837\u3002\u652F\u6301\u7684\u6D4F\u89C8\u5668\u5305\u62ECIE\uFF087, 8, 9, 10, 11\uFF09\uFF0CMozilla Firefox\uFF0CSafari\uFF0CGoogle Chrome\uFF0COpera\u7B49\u3002\u4E3B\u8981\u529F\u80FD\u5305\u62EC\uFF1A\u6D4B\u8BD5\u4E0E\u6D4F\u89C8\u5668\u7684\u517C\u5BB9\u6027\u2014\u2014\u6D4B\u8BD5\u4F60\u7684\u5E94\u7528\u7A0B\u5E8F\u770B\u662F\u5426\u80FD\u591F\u5F88\u597D\u5F97\u5DE5\u4F5C\u5728\u4E0D\u540C\u6D4F\u89C8\u5668\u548C\u64CD\u4F5C\u7CFB\u7EDF\u4E4B\u4E0A\u3002\u6D4B\u8BD5\u7CFB\u7EDF\u529F\u80FD\u2014\u2014\u521B\u5EFA\u56DE\u5F52\u6D4B\u8BD5\u68C0\u9A8C\u8F6F\u4EF6\u529F\u80FD\u548C\u7528\u6237\u9700\u6C42\u3002\u652F\u6301\u81EA\u52A8\u5F55\u5236\u52A8\u4F5C\u548C\u81EA\u52A8\u751F\u6210 .Net\u3001Java\u3001Perl\u7B49\u4E0D\u540C\u8BED\u8A00\u7684\u6D4B\u8BD5\u811A\u672C\u3002Selenium\u4E5F\u662F\u4E00\u6B3E\u540C\u6837\u4F7F\u7528Apache License 2.0\u534F\u8BAE\u53D1\u5E03\u7684\u5F00\u6E90\u6846\u67B6\u3002</p><h2 id="c%23%E5%AE%89%E8%A3%85selenium" tabindex="-1">C#\u5B89\u88C5Selenium</h2><p>\u672C\u6587\u4EC5\u4EC5\u662F\u4F7F\u7528Selenium\u5B9E\u73B0\u62C9\u52A8\u6EDA\u52A8\u6761\u7684\u529F\u80FD\uFF0C\u6240\u4EE5\u4E0D\u5BF9Selenium\u8FDB\u884C\u8FC7\u591A\u7684\u4ECB\u7ECD\u3002 \u901A\u8FC7Nuget\u5305\u7BA1\u7406\u5668\u641C\u7D22&quot;Selenium&quot;\uFF0C\u5206\u522B\u5B89\u88C5:</p><ul><li>Selenium.WebDriver</li><li>Selenium.Chrome.WebDriver</li></ul><h2 id="%E5%AE%9E%E4%BE%8B(%E8%8E%B7%E5%8F%96%E6%9F%90%E7%BD%91%E7%AB%99%E4%B8%BB%E9%A1%B5%E6%89%80%E6%9C%89%E5%9B%BE%E7%89%87)" tabindex="-1">\u5B9E\u4F8B(\u83B7\u53D6\u67D0\u7F51\u7AD9\u4E3B\u9875\u6240\u6709\u56FE\u7247)</h2><h3 id="%E6%99%AE%E9%80%9A%E8%8E%B7%E5%8F%96%E7%BD%91%E9%A1%B5html" tabindex="-1">\u666E\u901A\u83B7\u53D6\u7F51\u9875Html</h3><pre class="language-cs"><code class="language-cs"><span class="token class-name">ChromeDriver</span> driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ChromeDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
driver<span class="token punctuation">.</span><span class="token function">Navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GoToUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> title <span class="token operator">=</span> driver<span class="token punctuation">.</span>Title<span class="token punctuation">;</span><span class="token comment">//\u9875\u9762title</span>
<span class="token class-name"><span class="token keyword">string</span></span> html <span class="token operator">=</span> driver<span class="token punctuation">.</span>PageSource<span class="token punctuation">;</span><span class="token comment">//\u9875\u9762Html</span>
</code></pre><h3 id="%E4%B8%8D%E5%90%AF%E5%8A%A8chrome%E7%AA%97%E5%8F%A3%E5%8F%8A%E5%85%B3%E9%97%ADchrome%E6%8E%A7%E5%88%B6%E5%8F%B0%E8%8E%B7%E5%8F%96%E7%BD%91%E9%A1%B5" tabindex="-1">\u4E0D\u542F\u52A8Chrome\u7A97\u53E3\u53CA\u5173\u95EDChrome\u63A7\u5236\u53F0\u83B7\u53D6\u7F51\u9875</h3><p>\u7A0B\u5E8F\u6267\u884C\u65F6\u4F1A\u81EA\u52A8\u6253\u5F00Chrome\u7A97\u53E3\u548C\u8F93\u51FA\u63A7\u5236\u53F0\u4E2D\u4E00\u4E9B\u4FE1\u606F\uFF0C\u6211\u4EEC\u4E0D\u9700\u8981\u8FD9\u4E9B\u4E1C\u897F\u3002</p><pre class="language-cs"><code class="language-cs"><span class="token comment">//\u4E0D\u542F\u52A8chrome\u7A97\u53E3</span>
<span class="token class-name">ChromeOptions</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ChromeOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
options<span class="token punctuation">.</span><span class="token function">AddArgument</span><span class="token punctuation">(</span><span class="token string">&quot;headless&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//\u5173\u95EDChromeDriver\u63A7\u5236\u53F0</span>
<span class="token class-name">ChromeDriverService</span> driverService <span class="token operator">=</span> ChromeDriverService<span class="token punctuation">.</span><span class="token function">CreateDefaultService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
driverService<span class="token punctuation">.</span>HideCommandPromptWindow <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token class-name">ChromeDriver</span> driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ChromeDriver</span><span class="token punctuation">(</span>driverService<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
driver<span class="token punctuation">.</span><span class="token function">Navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GoToUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="%E5%B0%86%E9%A1%B5%E9%9D%A2%E6%BB%9A%E5%8A%A8%E5%88%B0%E5%BA%95%E9%83%A8" tabindex="-1">\u5C06\u9875\u9762\u6EDA\u52A8\u5230\u5E95\u90E8</h3><p>\u5982\u679C\u4F7F\u7528<code>scrollTo(0, document.body.scrollHeight)</code>\uFF0C\u76F4\u63A5\u8BA9\u5C06\u9875\u9762\u6EDA\u52A8\u5230\u5E95\u90E8\u4F1A\u5BFC\u81F4\u9875\u9762\u4E2D\u95F4\u90E8\u5206\u8BFB\u53D6\u5931\u8D25\uFF0C\u6240\u4EE5\u9700\u8981\u5206\u51E0\u6B21\u6ED1\u52A8\u5E76\u4E14\u7ED9\u9875\u9762\u8DB3\u591F\u7684\u65F6\u95F4\u52A0\u8F7D</p><pre class="language-cs"><code class="language-cs"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> jsCode <span class="token operator">=</span> <span class="token string">&quot;window.scrollTo({top: document.body.scrollHeight / 10 * &quot;</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&quot;, behavior: \\&quot;smooth\\&quot;});&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">//\u4F7F\u7528IJavaScriptExecutor\u63A5\u53E3\u8FD0\u884Cjs\u4EE3\u7801</span>
    <span class="token class-name">IJavaScriptExecutor</span> js <span class="token operator">=</span> <span class="token punctuation">(</span>IJavaScriptExecutor<span class="token punctuation">)</span>driver<span class="token punctuation">;</span>
    js<span class="token punctuation">.</span><span class="token function">ExecuteScript</span><span class="token punctuation">(</span>jsCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u6682\u505C\u6EDA\u52A8</span>
    Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E4%BD%BF%E7%94%A8htmlagilitypack%E8%A7%A3%E6%9E%90%E8%AF%BB%E5%8F%96%E5%88%B0%E7%9A%84html" tabindex="-1">\u4F7F\u7528HtmlAgilityPack\u89E3\u6790\u8BFB\u53D6\u5230\u7684Html</h3><p>\u4EE5\u4E0B\u5185\u5BB9\u4E0E<a href="https://qiyuor2.github.io/2019/09/04/CSharpHtmlAgilityPack/">\u4E0A\u4E00\u7BC7\u6587\u7AE0</a>\u57FA\u672C\u76F8\u540C</p><pre class="language-cs"><code class="language-cs"><span class="token class-name"><span class="token keyword">string</span></span> title <span class="token operator">=</span> driver<span class="token punctuation">.</span>Title<span class="token punctuation">;</span><span class="token comment">//\u9875\u9762title</span>
<span class="token class-name"><span class="token keyword">string</span></span> html <span class="token operator">=</span> driver<span class="token punctuation">.</span>PageSource<span class="token punctuation">;</span><span class="token comment">//\u9875\u9762Html</span>

<span class="token class-name">HtmlDocument</span> doc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HtmlDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
doc<span class="token punctuation">.</span><span class="token function">LoadHtml</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u89E3\u6790Html\u5B57\u7B26\u4E32</span>
<span class="token class-name"><span class="token keyword">string</span></span> imgPath <span class="token operator">=</span> <span class="token string">&quot;//img&quot;</span><span class="token punctuation">;</span><span class="token comment">//\u9009\u62E9img</span>
<span class="token comment">//\u83B7\u53D6img\u6807\u7B7E\u4E2D\u7684\u56FE\u7247</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">HtmlNode</span> node <span class="token keyword">in</span> doc<span class="token punctuation">.</span>DocumentNode<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span>imgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    \xB7\xB7\xB7\xB7\xB7\xB7
<span class="token punctuation">}</span>
</code></pre><h3 id="%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81" tabindex="-1">\u5B8C\u6574\u4EE3\u7801</h3><details><pre class="language-cs"><code class="language-cs"><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections<span class="token punctuation">.</span>Generic</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Linq</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Tasks</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">HtmlAgilityPack</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">OpenQA<span class="token punctuation">.</span>Selenium</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">OpenQA<span class="token punctuation">.</span>Selenium<span class="token punctuation">.</span>Chrome</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WebCrawlerDemo</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Program</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">WebClient</span> wc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WebClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> imgNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//\u56FE\u7247\u7F16\u53F7</span>
            <span class="token class-name"><span class="token keyword">string</span></span> url <span class="token operator">=</span> <span class="token string">&quot;https://www.bilibili.com&quot;</span><span class="token punctuation">;</span>


            <span class="token class-name"><span class="token keyword">string</span></span> html <span class="token operator">=</span> FinalHtml<span class="token punctuation">.</span><span class="token function">GetFinalHtml</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">HtmlDocument</span> doc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HtmlDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            doc<span class="token punctuation">.</span><span class="token function">LoadHtml</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">string</span></span> imgPath <span class="token operator">=</span> <span class="token string">&quot;//img&quot;</span><span class="token punctuation">;</span><span class="token comment">//\u9009\u62E9img</span>

            <span class="token comment">//HtmlNode nodes = hd.DocumentNode.SelectSingleNode(path);</span>

            <span class="token comment">//\u83B7\u53D6img\u6807\u7B7E\u4E2D\u7684\u56FE\u7247</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">HtmlNode</span> node <span class="token keyword">in</span> doc<span class="token punctuation">.</span>DocumentNode<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span>imgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> imgUrl <span class="token operator">=</span> node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>imgUrl <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&amp;&amp;</span> imgUrl <span class="token operator">!=</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        imgNum<span class="token operator">++</span><span class="token punctuation">;</span>

                        <span class="token comment">//\u751F\u6210\u6587\u4EF6\u540D\uFF0C\u81EA\u52A8\u83B7\u53D6\u540E\u7F00</span>
                        <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token operator">=</span> <span class="token function">GetImgName</span><span class="token punctuation">(</span>imgUrl<span class="token punctuation">,</span> imgNum<span class="token punctuation">)</span><span class="token punctuation">;</span>

                        <span class="token comment">//Console.WriteLine(fileName);</span>
                        <span class="token comment">//Console.WriteLine(imgUrl);</span>
                        ImgDownloader<span class="token punctuation">.</span><span class="token function">DownloadImg</span><span class="token punctuation">(</span>wc<span class="token punctuation">,</span> imgUrl<span class="token punctuation">,</span> <span class="token string">&quot;images/&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//\u83B7\u53D6\u80CC\u666F\u56FE</span>
            <span class="token class-name"><span class="token keyword">string</span></span> bgImgPath <span class="token operator">=</span> <span class="token string">&quot;//*[@style]&quot;</span><span class="token punctuation">;</span><span class="token comment">//\u9009\u62E9\u5177\u6709style\u5C5E\u6027\u7684\u8282\u70B9</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">HtmlNode</span> node <span class="token keyword">in</span> doc<span class="token punctuation">.</span>DocumentNode<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span>bgImgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;style&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;background-image:url&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    imgNum<span class="token operator">++</span><span class="token punctuation">;</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> bgImgUrl <span class="token operator">=</span> node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;style&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
                    bgImgUrl <span class="token operator">=</span> Regex<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>bgImgUrl<span class="token punctuation">,</span> <span class="token string">@&quot;(?&lt;=\\().+?(?=\\))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span><span class="token comment">//\u8BFB\u53D6url()\u7684\u5185\u5BB9</span>
                    <span class="token comment">//Console.WriteLine(bgImgUrl);</span>
                    <span class="token comment">//\u751F\u6210\u6587\u4EF6\u540D\uFF0C\u81EA\u52A8\u83B7\u53D6\u540E\u7F00</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token operator">=</span> <span class="token function">GetImgName</span><span class="token punctuation">(</span>bgImgUrl<span class="token punctuation">,</span> imgNum<span class="token punctuation">)</span><span class="token punctuation">;</span>

                    ImgDownloader<span class="token punctuation">.</span><span class="token function">DownloadImg</span><span class="token punctuation">(</span>wc<span class="token punctuation">,</span> bgImgUrl<span class="token punctuation">,</span> <span class="token string">&quot;images/bgcImg/&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;----------END----------&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;\u4E00\u5171\u83B7\u5F97: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">imgNum</span><span class="token punctuation">}</span></span><span class="token string">\u5F20\u56FE&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">ReadKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u56FE\u7247\u4E0B\u8F7D\u5668</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ImgDownloader</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/// &lt;summary&gt;</span>
        <span class="token comment">/// \u4E0B\u8F7D\u56FE\u7247</span>
        <span class="token comment">/// &lt;/summary&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;webClient&quot;&gt;&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;url&quot;&gt;\u56FE\u7247url&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;folderPath&quot;&gt;\u6587\u4EF6\u5939\u8DEF\u5F84&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;fileName&quot;&gt;\u56FE\u7247\u540D&lt;/param&gt;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DownloadImg</span><span class="token punctuation">(</span><span class="token class-name">WebClient</span> webClient<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> url<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> folderPath<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> fileName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//\u5982\u679C\u6587\u4EF6\u5939\u4E0D\u5B58\u5728\uFF0C\u5219\u521B\u5EFA\u4E00\u4E2A</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Directory<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Directory<span class="token punctuation">.</span><span class="token function">CreateDirectory</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//\u5224\u65AD\u8DEF\u5F84\u662F\u5426\u5B8C\u6574\uFF0C\u8865\u5168\u4E0D\u5B8C\u6574\u7684\u8DEF\u5F84</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;https:&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> url<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;http:&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                url <span class="token operator">=</span> <span class="token string">&quot;https:&quot;</span> <span class="token operator">+</span> url<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//\u4E0B\u8F7D\u56FE\u7247</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                webClient<span class="token punctuation">.</span><span class="token function">DownloadFile</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> folderPath <span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>fileName <span class="token operator">+</span> <span class="token string">&quot;\u4E0B\u8F7D\u6210\u529F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">/// &lt;summary&gt;</span>
        <span class="token comment">/// \u751F\u6210\u56FE\u7247\u540D\u79F0</span>
        <span class="token comment">/// &lt;/summary&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;imageUrl&quot;&gt;\u56FE\u7247\u5730\u5740&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;imageNum&quot;&gt;\u56FE\u7247\u7F16\u53F7&lt;/param&gt;</span>
        <span class="token comment">/// &lt;returns&gt;&lt;/returns&gt;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetImgName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> imageUrl<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> imageNum<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> imgExtension<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>imageUrl<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                imgExtension <span class="token operator">=</span> imageUrl<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>imageUrl<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                imgExtension <span class="token operator">=</span> <span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> imageNum <span class="token operator">+</span> imgExtension<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u83B7\u5F97\u6267\u884C\u8FC7js\u7684\u7F51\u5740</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FinalHtml</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/// &lt;summary&gt;</span>
        <span class="token comment">/// \u83B7\u5F97\u62C9\u52A8\u6EDA\u52A8\u6761\u540E\u7684\u9875\u9762</span>
        <span class="token comment">/// &lt;/summary&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;url&quot;&gt;\u7F51\u5740&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;sectionNum&quot;&gt;\u6EDA\u52A8\u51E0\u6B21&lt;/param&gt;</span>
        <span class="token comment">/// &lt;returns&gt;html\u5B57\u7B26\u4E32&lt;/returns&gt;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetFinalHtml</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> url<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> sectionNum<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//\u4E0D\u542F\u52A8chrome\u7A97\u53E3</span>
            <span class="token class-name">ChromeOptions</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ChromeOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            options<span class="token punctuation">.</span><span class="token function">AddArgument</span><span class="token punctuation">(</span><span class="token string">&quot;headless&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//\u5173\u95EDChromeDriver\u63A7\u5236\u53F0</span>
            <span class="token class-name">ChromeDriverService</span> driverService <span class="token operator">=</span> ChromeDriverService<span class="token punctuation">.</span><span class="token function">CreateDefaultService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            driverService<span class="token punctuation">.</span>HideCommandPromptWindow <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>


            <span class="token class-name">ChromeDriver</span> driver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ChromeDriver</span><span class="token punctuation">(</span>driverService<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

            driver<span class="token punctuation">.</span><span class="token function">Navigate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GoToUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">string</span></span> title <span class="token operator">=</span> driver<span class="token punctuation">.</span>Title<span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;Title: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">title</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//\u5C06\u9875\u9762\u6EDA\u52A8\u5230\u5E95\u90E8</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;\u9875\u9762\u6EDA\u52A8\u4E2D\uFF0C\u8BF7\u7A0D\u540E&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> sectionNum<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">string</span></span> jsCode <span class="token operator">=</span> <span class="token string">&quot;window.scrollTo({top: document.body.scrollHeight / &quot;</span> <span class="token operator">+</span> sectionNum <span class="token operator">+</span> <span class="token string">&quot; * &quot;</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&quot;, behavior: \\&quot;smooth\\&quot;});&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name">IJavaScriptExecutor</span> js <span class="token operator">=</span> <span class="token punctuation">(</span>IJavaScriptExecutor<span class="token punctuation">)</span>driver<span class="token punctuation">;</span>
                js<span class="token punctuation">.</span><span class="token function">ExecuteScript</span><span class="token punctuation">(</span>jsCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">string</span></span> html <span class="token operator">=</span> driver<span class="token punctuation">.</span>PageSource<span class="token punctuation">;</span>
            driver<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></details><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="http://finisky.azurewebsites.net/2019/07/20/selenium/">Selenium\u722C\u53D6\u7F51\u9875\u5B9E\u6218</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/csharp-html-agility-pack-selenium.md");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
var __glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$w,
  date: date$w,
  tags: tags$s,
  category: category$s,
  summary: summary$w,
  meta: meta$w,
  "default": _sfc_main$J
}, Symbol.toStringTag, { value: "Module" }));
const title$v = "C# HtmlAgilityPack\u722C\u53D6\u9759\u6001\u9875\u9762";
const date$v = "2019/09/04 22:10:24";
const tags$r = ["CSharp", "Web Crawler"];
const category$r = "\u6280\u672F";
const summary$v = "\u6700\u8FD1\u5BF9\u722C\u866B\u5F88\u611F\u5174\u8DA3\uFF0C\u7A0D\u5FAE\u7814\u7A76\u4E86\u4E00\u4E0B\uFF0C\u5229\u7528HtmlAgilityPack\u5236\u4F5C\u4E86\u4E00\u4E2A\u5341\u5206\u7B80\u5355\u7684\u722C\u866B\uFF0C\u8FD9\u4E2A\u7B80\u6613\u722C\u866B\u53EA\u80FD\u83B7\u53D6\u9759\u6001\u9875\u9762\u7684Html...";
const meta$v = [{ "property": "og:title", "content": "C# HtmlAgilityPack\u722C\u53D6\u9759\u6001\u9875\u9762" }];
const _sfc_main$I = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "C# HtmlAgilityPack\u722C\u53D6\u9759\u6001\u9875\u9762", "date": "2019/09/04 22:10:24", "tags": ["CSharp", "Web Crawler"], "category": "\u6280\u672F", "summary": "\u6700\u8FD1\u5BF9\u722C\u866B\u5F88\u611F\u5174\u8DA3\uFF0C\u7A0D\u5FAE\u7814\u7A76\u4E86\u4E00\u4E0B\uFF0C\u5229\u7528HtmlAgilityPack\u5236\u4F5C\u4E86\u4E00\u4E2A\u5341\u5206\u7B80\u5355\u7684\u722C\u866B\uFF0C\u8FD9\u4E2A\u7B80\u6613\u722C\u866B\u53EA\u80FD\u83B7\u53D6\u9759\u6001\u9875\u9762\u7684Html...", "meta": [{ "property": "og:title", "content": "C# HtmlAgilityPack\u722C\u53D6\u9759\u6001\u9875\u9762" }] };
    expose({ frontmatter });
    const head$1 = { "title": "C# HtmlAgilityPack\u722C\u53D6\u9759\u6001\u9875\u9762", "meta": [{ "property": "og:title", "content": "C# HtmlAgilityPack\u722C\u53D6\u9759\u6001\u9875\u9762" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u6700\u8FD1\u5BF9\u722C\u866B\u5F88\u611F\u5174\u8DA3\uFF0C\u7A0D\u5FAE\u7814\u7A76\u4E86\u4E00\u4E0B\uFF0C\u5229\u7528 HtmlAgilityPack \u5236\u4F5C\u4E86\u4E00\u4E2A\u5341\u5206\u7B80\u5355\u7684\u722C\u866B\uFF0C\u8FD9\u4E2A\u7B80\u6613\u722C\u866B\u53EA\u80FD\u83B7\u53D6\u9759\u6001\u9875\u9762\u7684 Html</p><h2 id="htmlagilitypack-%E7%AE%80%E4%BB%8B" tabindex="-1">HtmlAgilityPack \u7B80\u4ECB</h2><p>HtmlAgilityPack \u662F\u4E00\u4E2A\u89E3\u6790\u901F\u5EA6\u5341\u5206\u5FEB\uFF0C\u5E76\u4E14\u5F00\u6E90\u7684 Html \u89E3\u6790\u5DE5\u5177\u3002HtmlAgilityPack \u652F\u6301\u4F7F\u7528 Xpath \u89E3\u6790 Html\uFF0C\u80FD\u591F\u5E2E\u52A9\u6211\u4EEC\u89E3\u6790 Html \u6587\u6863\u5C31\u50CF\u89E3\u6790 Xml \u6587\u6863\u4E00\u6837\u8F7B\u677E\u3001\u65B9\u4FBF\u3002</p><ul><li><a href="https://html-agility-pack.net">HtmlAgilityPack \u5B98\u7F51</a></li><li><a href="https://github.com/zzzprojects/html-agility-pack">HtmlAgilityPack \u7684 Github \u5730\u5740</a></li></ul><h2 id="c%23%E5%AE%89%E8%A3%85-htmlagilitypack" tabindex="-1">C#\u5B89\u88C5 HtmlAgilityPack</h2><ol><li>\u5982\u679C VS \u5B89\u88C5\u6709 Nuget\uFF0C\u5728 Nuget \u76F4\u63A5\u641C\u7D22\u5B89\u88C5\u5373\u53EF\u3002</li><li>\u4E0B\u8F7D\u540E\u89E3\u538B\u7F29\u540E\u6709 3 \u4E2A\u6587\u4EF6\uFF0C\u8FD9\u91CC\u53EA\u9700\u8981\u5C06\u5176\u4E2D\u7684 HtmlAgilityPack.dll\u3001HtmlAgilityPack.xml \u5F15\u5165\u89E3\u51B3\u65B9\u6848\u4E2D\u5373\u53EF\u4F7F\u7528</li></ol><h2 id="%E5%AE%9E%E4%BE%8B(%E8%8E%B7%E5%8F%96%E6%9F%90%E9%A1%B5%E9%9D%A2%E5%9B%BE%E7%89%87)" tabindex="-1">\u5B9E\u4F8B(\u83B7\u53D6\u67D0\u9875\u9762\u56FE\u7247)</h2><h3 id="%E5%8A%A0%E8%BD%BD-html-%E9%A1%B5%E9%9D%A2" tabindex="-1">\u52A0\u8F7D HTML \u9875\u9762</h3><pre class="language-csharp"><code class="language-csharp"><span class="token comment">//\u4ECE\u7F51\u9875\u4E2D\u52A0\u8F7D</span>
<span class="token class-name"><span class="token keyword">string</span></span> url <span class="token operator">=</span> <span class="token string">&quot;https://www.bilibili.com&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">HtmlWeb</span> web <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HtmlWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">HtmlDocument</span> hd <span class="token operator">=</span> web<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="%E5%88%A9%E7%94%A8-webclient-%E5%86%99%E4%B8%80%E4%B8%AA%E5%9B%BE%E7%89%87%E4%B8%8B%E8%BD%BD%E5%99%A8" tabindex="-1">\u5229\u7528 WebClient \u5199\u4E00\u4E2A\u56FE\u7247\u4E0B\u8F7D\u5668</h3><p>\u9700\u8981<code>using System.Net</code>\u548C<code>using System.IO</code></p><pre class="language-csharp"><code class="language-csharp"><span class="token comment">/// &lt;summary&gt;</span>
<span class="token comment">/// \u56FE\u7247\u4E0B\u8F7D\u5668</span>
<span class="token comment">/// &lt;/summary&gt;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ImgDownloader</span>
<span class="token punctuation">{</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u4E0B\u8F7D\u56FE\u7247</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;webClient&quot;&gt;&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;url&quot;&gt;\u56FE\u7247url&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;folderPath&quot;&gt;\u6587\u4EF6\u5939\u8DEF\u5F84&lt;/param&gt;</span>
    <span class="token comment">/// &lt;param name=&quot;fileName&quot;&gt;\u56FE\u7247\u540D&lt;/param&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DownloadImg</span><span class="token punctuation">(</span><span class="token class-name">WebClient</span> webClient<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> url<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> folderPath<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> fileName<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//\u5982\u679C\u6587\u4EF6\u5939\u4E0D\u5B58\u5728\uFF0C\u5219\u521B\u5EFA\u4E00\u4E2A</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Directory<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Directory<span class="token punctuation">.</span><span class="token function">CreateDirectory</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//\u5224\u65AD\u8DEF\u5F84\u662F\u5426\u5B8C\u6574\uFF0C\u8865\u5168\u4E0D\u5B8C\u6574\u7684\u8DEF\u5F84</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;https:&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> url<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;http:&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            url <span class="token operator">=</span> <span class="token string">&quot;https:&quot;</span> <span class="token operator">+</span> url<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//\u4E0B\u8F7D\u56FE\u7247</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            webClient<span class="token punctuation">.</span><span class="token function">DownloadFile</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> folderPath <span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>fileName <span class="token operator">+</span> <span class="token string">&quot;\u4E0B\u8F7D\u6210\u529F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E9%80%9A%E8%BF%87-xpath-%E8%8E%B7%E5%8F%96-img-%E6%A0%87%E7%AD%BE%E4%B8%AD%E7%9A%84%E5%9B%BE%E7%89%87" tabindex="-1">\u901A\u8FC7 Xpath \u83B7\u53D6 img \u6807\u7B7E\u4E2D\u7684\u56FE\u7247</h3><pre class="language-csharp"><code class="language-csharp"><span class="token class-name"><span class="token keyword">string</span></span> imgPath <span class="token operator">=</span> <span class="token string">&quot;//img&quot;</span><span class="token punctuation">;</span><span class="token comment">//\u9009\u62E9img</span>
<span class="token class-name"><span class="token keyword">int</span></span> imgNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//\u56FE\u7247\u7F16\u53F7</span>
<span class="token comment">//\u83B7\u53D6img\u6807\u7B7E\u4E2D\u7684\u56FE\u7247</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">HtmlNode</span> node <span class="token keyword">in</span> hd<span class="token punctuation">.</span>DocumentNode<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span>imgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> imgUrl <span class="token operator">=</span> node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>imgUrl <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&amp;&amp;</span> imgUrl <span class="token operator">!=</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            imgNum<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token comment">//\u751F\u6210\u6587\u4EF6\u540D\uFF0C\u81EA\u52A8\u83B7\u53D6\u540E\u7F00</span>
            <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token operator">=</span> imgNum <span class="token operator">+</span> imgUrl<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>imgUrl<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ImgDownloader<span class="token punctuation">.</span><span class="token function">DownloadImg</span><span class="token punctuation">(</span>wc<span class="token punctuation">,</span> imgUrl<span class="token punctuation">,</span> <span class="token string">&quot;images/&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E9%80%9A%E8%BF%87-xpath-%E8%8E%B7%E5%8F%96%E8%83%8C%E6%99%AF%E5%9B%BE" tabindex="-1">\u901A\u8FC7 Xpath \u83B7\u53D6\u80CC\u666F\u56FE</h3><pre class="language-csharp"><code class="language-csharp"><span class="token comment">//\u83B7\u53D6\u80CC\u666F\u56FE</span>
<span class="token class-name"><span class="token keyword">string</span></span> bgImgPath <span class="token operator">=</span> <span class="token string">&quot;//*[@style]&quot;</span><span class="token punctuation">;</span><span class="token comment">//\u9009\u62E9\u5177\u6709style\u5C5E\u6027\u7684\u8282\u70B9</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">HtmlNode</span> node <span class="token keyword">in</span> hd<span class="token punctuation">.</span>DocumentNode<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span>bgImgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;style&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;background-image:url&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        imgNum<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> bgImgUrl <span class="token operator">=</span> node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;style&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
        bgImgUrl <span class="token operator">=</span> Regex<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>bgImgUrl<span class="token punctuation">,</span> <span class="token string">@&quot;(?&lt;=\\().+?(?=\\))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span><span class="token comment">//\u8BFB\u53D6url()\u7684\u5185\u5BB9</span>
        <span class="token comment">//Console.WriteLine(bgImgUrl);</span>
        <span class="token comment">//\u751F\u6210\u6587\u4EF6\u540D\uFF0C\u81EA\u52A8\u83B7\u53D6\u540E\u7F00</span>
        <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token operator">=</span> imgNum <span class="token operator">+</span> bgImgUrl<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>bgImgUrl<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        ImgDownloader<span class="token punctuation">.</span><span class="token function">DownloadImg</span><span class="token punctuation">(</span>wc<span class="token punctuation">,</span> bgImgUrl<span class="token punctuation">,</span> <span class="token string">&quot;images/bgcImg/&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81" tabindex="-1">\u5B8C\u6574\u4EE3\u7801</h3><details><pre class="language-csharp"><code class="language-csharp"><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Linq</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Tasks</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">HtmlAgilityPack</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WebCrawlerDemo</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Program</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">WebClient</span> wc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WebClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


            <span class="token class-name"><span class="token keyword">string</span></span> url <span class="token operator">=</span> <span class="token string">&quot;https://www.bilibili.com&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name">HtmlWeb</span> web <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HtmlWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">HtmlDocument</span> hd <span class="token operator">=</span> web<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u4E0B\u8F7Dhtml\u9875\u9762</span>

            <span class="token class-name"><span class="token keyword">string</span></span> imgPath <span class="token operator">=</span> <span class="token string">&quot;//img&quot;</span><span class="token punctuation">;</span><span class="token comment">//\u9009\u62E9img</span>

            <span class="token class-name"><span class="token keyword">int</span></span> imgNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//\u56FE\u7247\u7F16\u53F7</span>

            <span class="token comment">//\u83B7\u53D6img\u6807\u7B7E\u4E2D\u7684\u56FE\u7247</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">HtmlNode</span> node <span class="token keyword">in</span> hd<span class="token punctuation">.</span>DocumentNode<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span>imgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> imgUrl <span class="token operator">=</span> node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>imgUrl <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&amp;&amp;</span> imgUrl <span class="token operator">!=</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        imgNum<span class="token operator">++</span><span class="token punctuation">;</span>
                        <span class="token comment">//\u751F\u6210\u6587\u4EF6\u540D\uFF0C\u81EA\u52A8\u83B7\u53D6\u540E\u7F00</span>
                        <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token operator">=</span> imgNum <span class="token operator">+</span> imgUrl<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>imgUrl<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                        ImgDownloader<span class="token punctuation">.</span><span class="token function">DownloadImg</span><span class="token punctuation">(</span>wc<span class="token punctuation">,</span> imgUrl<span class="token punctuation">,</span> <span class="token string">&quot;images/&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//\u83B7\u53D6\u80CC\u666F\u56FE</span>
            <span class="token class-name"><span class="token keyword">string</span></span> bgImgPath <span class="token operator">=</span> <span class="token string">&quot;//*[@style]&quot;</span><span class="token punctuation">;</span><span class="token comment">//\u9009\u62E9\u5177\u6709style\u5C5E\u6027\u7684\u8282\u70B9</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">HtmlNode</span> node <span class="token keyword">in</span> hd<span class="token punctuation">.</span>DocumentNode<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span>bgImgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;style&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;background-image:url&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    imgNum<span class="token operator">++</span><span class="token punctuation">;</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> bgImgUrl <span class="token operator">=</span> node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;style&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
                    bgImgUrl <span class="token operator">=</span> Regex<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>bgImgUrl<span class="token punctuation">,</span> <span class="token string">@&quot;(?&lt;=\\().+?(?=\\))&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span><span class="token comment">//\u8BFB\u53D6url()\u7684\u5185\u5BB9</span>
                    <span class="token comment">//\u751F\u6210\u6587\u4EF6\u540D\uFF0C\u81EA\u52A8\u83B7\u53D6\u540E\u7F00</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token operator">=</span> imgNum <span class="token operator">+</span> bgImgUrl<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>bgImgUrl<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    ImgDownloader<span class="token punctuation">.</span><span class="token function">DownloadImg</span><span class="token punctuation">(</span>wc<span class="token punctuation">,</span> bgImgUrl<span class="token punctuation">,</span> <span class="token string">&quot;images/bgcImg/&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;----------END----------&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">ReadKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/// &lt;summary&gt;</span>
    <span class="token comment">/// \u56FE\u7247\u4E0B\u8F7D\u5668</span>
    <span class="token comment">/// &lt;/summary&gt;</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ImgDownloader</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/// &lt;summary&gt;</span>
        <span class="token comment">/// \u4E0B\u8F7D\u56FE\u7247</span>
        <span class="token comment">/// &lt;/summary&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;webClient&quot;&gt;&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;url&quot;&gt;\u56FE\u7247url&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;folderPath&quot;&gt;\u6587\u4EF6\u5939\u8DEF\u5F84&lt;/param&gt;</span>
        <span class="token comment">/// &lt;param name=&quot;fileName&quot;&gt;\u56FE\u7247\u540D&lt;/param&gt;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DownloadImg</span><span class="token punctuation">(</span><span class="token class-name">WebClient</span> webClient<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> url<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> folderPath<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> fileName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//\u5982\u679C\u6587\u4EF6\u5939\u4E0D\u5B58\u5728\uFF0C\u5219\u521B\u5EFA\u4E00\u4E2A</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Directory<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Directory<span class="token punctuation">.</span><span class="token function">CreateDirectory</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//\u5224\u65AD\u8DEF\u5F84\u662F\u5426\u5B8C\u6574\uFF0C\u8865\u5168\u4E0D\u5B8C\u6574\u7684\u8DEF\u5F84</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;https:&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> url<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;http:&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                url <span class="token operator">=</span> <span class="token string">&quot;https:&quot;</span> <span class="token operator">+</span> url<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//\u4E0B\u8F7D\u56FE\u7247</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                webClient<span class="token punctuation">.</span><span class="token function">DownloadFile</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> folderPath <span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>fileName <span class="token operator">+</span> <span class="token string">&quot;\u4E0B\u8F7D\u6210\u529F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></details><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://www.cnblogs.com/xuliangxing/p/8004403.html">C#\u7F51\u7EDC\u722C\u866B\u5229\u5668\u4E4B HtmlAgilityPack \u5982\u4F55\u5FEB\u901F\u5B9E\u73B0\u89E3\u6790 Html</a></li><li><a href="https://blog.csdn.net/Ylcacsdn/article/details/78314297">.Net \u89E3\u6790 html \u6587\u6863\u4F7F\u7528\u7C7B\u5E93 HtmlAgilityPack</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/csharp-html-agility-pack.md");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
var __glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$v,
  date: date$v,
  tags: tags$r,
  category: category$r,
  summary: summary$v,
  meta: meta$v,
  "default": _sfc_main$I
}, Symbol.toStringTag, { value: "Module" }));
const title$u = "C#\u4E2D\u4F7F\u7528XML\u5B58\u50A8\u6570\u636E";
const date$u = "2019/07/29 10:05:13";
const tags$q = ["CSharp"];
const category$q = "\u6280\u672F";
const summary$u = "C#\u5BF9\u4E8EXML\u7684\u4E00\u4E9B\u589E\u5220\u6539\u67E5\u7684\u64CD\u4F5C";
const meta$u = [{ "property": "og:title", "content": "C#\u4E2D\u4F7F\u7528XML\u5B58\u50A8\u6570\u636E" }];
const _sfc_main$H = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "C#\u4E2D\u4F7F\u7528XML\u5B58\u50A8\u6570\u636E", "date": "2019/07/29 10:05:13", "tags": ["CSharp"], "category": "\u6280\u672F", "summary": "C#\u5BF9\u4E8EXML\u7684\u4E00\u4E9B\u589E\u5220\u6539\u67E5\u7684\u64CD\u4F5C", "meta": [{ "property": "og:title", "content": "C#\u4E2D\u4F7F\u7528XML\u5B58\u50A8\u6570\u636E" }] };
    expose({ frontmatter });
    const head$1 = { "title": "C#\u4E2D\u4F7F\u7528XML\u5B58\u50A8\u6570\u636E", "meta": [{ "property": "og:title", "content": "C#\u4E2D\u4F7F\u7528XML\u5B58\u50A8\u6570\u636E" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><h2 id="%E5%88%9B%E5%BB%BA-xml-%E6%96%87%E6%A1%A3" tabindex="-1">\u521B\u5EFA XML \u6587\u6863</h2><p><strong>\u9996\u5148\u5F15\u7528<code>System.Xml</code>\u547D\u540D\u7A7A\u95F4</strong></p><h3 id="1.%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%E5%AE%9E%E4%BE%8B" tabindex="-1">1.\u521D\u59CB\u5316\u4E00\u4E2A\u5B9E\u4F8B</h3><pre class="language-cs"><code class="language-cs"><span class="token class-name">XmlDocument</span> xd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="2.%E5%88%9B%E5%BB%BA-xml-%E5%A4%B4%E6%96%87%E4%BB%B6%E5%A3%B0%E6%98%8E" tabindex="-1">2.\u521B\u5EFA XML \u5934\u6587\u4EF6\u58F0\u660E</h3><pre class="language-cs"><code class="language-cs"><span class="token class-name">XmlDeclaration</span> xdt <span class="token operator">=</span> xd<span class="token punctuation">.</span><span class="token function">CreateXmlDeclaration</span><span class="token punctuation">(</span><span class="token string">&quot;1.0&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;utf-8&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xd<span class="token punctuation">.</span><span class="token function">AppendChild</span><span class="token punctuation">(</span>xdt<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="3.%E5%88%9B%E5%BB%BA%E5%94%AF%E4%B8%80%E6%A0%B9%E8%8A%82%E7%82%B9" tabindex="-1">3.\u521B\u5EFA\u552F\u4E00\u6839\u8282\u70B9</h3><pre class="language-cs"><code class="language-cs"><span class="token class-name">XmlElement</span> Students <span class="token operator">=</span> xd<span class="token punctuation">.</span><span class="token function">CreateElement</span><span class="token punctuation">(</span><span class="token string">&quot;Students&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="4.%E7%BB%99%E6%A0%B9%E8%8A%82%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%B1%9E%E6%80%A7(%E4%B9%9F%E5%8F%AF%E4%BB%A5%E4%B8%8D%E6%B7%BB%E5%8A%A0)" tabindex="-1">4.\u7ED9\u6839\u8282\u70B9\u6DFB\u52A0\u5C5E\u6027(\u4E5F\u53EF\u4EE5\u4E0D\u6DFB\u52A0)</h3><pre class="language-cs"><code class="language-cs">Students<span class="token punctuation">.</span><span class="token function">SetAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u5B66\u751F\u4FE1\u606F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="5.%E5%B0%86%E6%A0%B9%E8%8A%82%E7%82%B9%E5%8A%A0%E5%85%A5%E5%88%B0-xml-%E6%96%87%E4%BB%B6%E4%B8%AD" tabindex="-1">5.\u5C06\u6839\u8282\u70B9\u52A0\u5165\u5230 XML \u6587\u4EF6\u4E2D</h3><pre class="language-cs"><code class="language-cs">xd<span class="token punctuation">.</span><span class="token function">AppendChild</span><span class="token punctuation">(</span>Students<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="6.%E5%88%9B%E5%BB%BA%E4%BA%8C%E7%BA%A7%E8%8A%82%E7%82%B9" tabindex="-1">6.\u521B\u5EFA\u4E8C\u7EA7\u8282\u70B9</h3><pre class="language-cs"><code class="language-cs"><span class="token class-name">XmlElement</span> student <span class="token operator">=</span> xd<span class="token punctuation">.</span><span class="token function">CreateElement</span><span class="token punctuation">(</span><span class="token string">&quot;student&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
student<span class="token punctuation">.</span><span class="token function">SetAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;stuNum&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;100100100&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Students<span class="token punctuation">.</span><span class="token function">AppendChild</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="7.%E7%BB%99%E4%BA%8C%E7%BA%A7%E8%8A%82%E7%82%B9%E5%A1%AB%E5%85%85%E5%80%BC" tabindex="-1">7.\u7ED9\u4E8C\u7EA7\u8282\u70B9\u586B\u5145\u503C</h3><pre class="language-cs"><code class="language-cs"><span class="token class-name">XmlElement</span> name <span class="token operator">=</span> xd<span class="token punctuation">.</span><span class="token function">CreateElement</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
name<span class="token punctuation">.</span>InnerText <span class="token operator">=</span> <span class="token string">&quot;\u5C0F\u660E&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">XmlElement</span> sex <span class="token operator">=</span> xd<span class="token punctuation">.</span><span class="token function">CreateElement</span><span class="token punctuation">(</span><span class="token string">&quot;sex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sex<span class="token punctuation">.</span>InnerText <span class="token operator">=</span> <span class="token string">&quot;\u7537&quot;</span><span class="token punctuation">;</span>
student<span class="token punctuation">.</span><span class="token function">AppendChild</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
student<span class="token punctuation">.</span><span class="token function">AppendChild</span><span class="token punctuation">(</span>sex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="8.%E4%BF%9D%E5%AD%98" tabindex="-1">8.\u4FDD\u5B58</h3><pre class="language-cs"><code class="language-cs">xd<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token string">&quot;StuMS.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="9.%E7%BB%93%E6%9E%9C" tabindex="-1">9.\u7ED3\u679C</h3><pre class="language-xml"><code class="language-xml"><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Students</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\u5B66\u751F\u4FE1\u606F<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>student</span> <span class="token attr-name">stuNum</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100100100<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>\u5C0F\u660E<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sex</span><span class="token punctuation">&gt;</span></span>\u7537<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sex</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>student</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Students</span><span class="token punctuation">&gt;</span></span>
</code></pre><h2 id="%E8%AF%BB%E5%8F%96-xml-%E6%96%87%E6%A1%A3%E9%87%8C%E7%9A%84%E4%BF%A1%E6%81%AF" tabindex="-1">\u8BFB\u53D6 XML \u6587\u6863\u91CC\u7684\u4FE1\u606F</h2><p><strong>\u9996\u5148\u8981\u5148\u52A0\u8F7D XML \u6587\u6863</strong></p><pre class="language-cs"><code class="language-cs"><span class="token class-name">XmlDocument</span> xd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xd<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token string">&quot;StuMS.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="1.%E5%88%A9%E7%94%A8%E7%B4%A2%E5%BC%95%E5%99%A8%E8%AF%BB%E5%8F%96" tabindex="-1">1.\u5229\u7528\u7D22\u5F15\u5668\u8BFB\u53D6</h3><pre class="language-cs"><code class="language-cs"><span class="token comment">//\u67E5\u627E\u6807\u7B7E\u503C</span>
<span class="token class-name"><span class="token keyword">string</span></span> Name <span class="token operator">=</span> stuNode<span class="token punctuation">.</span>ChildNodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>InnerText<span class="token punctuation">;</span>
<span class="token comment">//\u67E5\u627E\u6807\u7B7E\u5C5E\u6027</span>
<span class="token class-name"><span class="token keyword">string</span></span> StuNum <span class="token operator">=</span> stuNode<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
</code></pre><h3 id="2.%E5%88%A9%E7%94%A8-xpath-%E6%9F%A5%E8%AF%A2" tabindex="-1">2.\u5229\u7528 Xpath \u67E5\u8BE2</h3><pre class="language-cs"><code class="language-cs"><span class="token comment">// \u5E38\u7528\u67E5\u8BE2\u65B9\u5F0F</span>
<span class="token comment">//1. &quot;\u6839\u8282\u70B9/\u7236\u8282\u70B9/\u5B50\u8282\u70B9&quot;</span>
<span class="token comment">//2. &quot;//\u8282\u70B9&quot;</span>
<span class="token comment">//3. &quot;\u6839\u8282\u70B9/\u7236\u8282\u70B9[@\u7236\u8282\u70B9\u5C5E\u6027 = &#39;value&#39; ]&quot;</span>
<span class="token comment">//4. &quot;\u6839\u8282\u70B9/\u7236\u8282\u70B9[\u5B50\u8282\u70B9 = &#39;value&#39; ]&quot;</span>

<span class="token class-name">XmlNode</span> stuNode <span class="token operator">=</span> xd<span class="token punctuation">.</span><span class="token function">SelectSingleNode</span><span class="token punctuation">(</span><span class="token string">&quot;Students/student[@stuNum =&quot;</span> <span class="token operator">+</span> stuNum <span class="token operator">+</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u53EF\u4EE5\u83B7\u5F97\u6307\u5B9AstuNum\u7684\u4E00\u4E2A\u8282\u70B9</span>
<span class="token class-name">XmlNodeList</span> stuNodeList <span class="token operator">=</span> xd<span class="token punctuation">.</span><span class="token function">SelectNodes</span><span class="token punctuation">(</span><span class="token string">&quot;Students/student[sex = &#39;\u7537&#39; ]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u53EF\u4EE5\u83B7\u5F97\u6307\u5B9A\u6027\u522B\u7684\u96C6\u5408</span>
</code></pre><h2 id="%E4%BF%AE%E6%94%B9-xml-%E6%96%87%E6%A1%A3%E9%87%8C%E7%9A%84%E4%BF%A1%E6%81%AF" tabindex="-1">\u4FEE\u6539 XML \u6587\u6863\u91CC\u7684\u4FE1\u606F</h2><p>\u627E\u5230-&gt;\u4FEE\u6539-&gt;<strong>\u4FDD\u5B58</strong></p><pre class="language-cs"><code class="language-cs"><span class="token comment">//\u8282\u70B9\u4FE1\u606F\u4FEE\u6539</span>
stuNode<span class="token punctuation">.</span><span class="token function">SelectSingleNode</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>InnerText <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
stuNode<span class="token punctuation">.</span><span class="token function">SelectSingleNode</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>InnerXml <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
<span class="token comment">//\u5C5E\u6027\u4FE1\u606F\u4FEE\u6539</span>
student<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span><span class="token string">&quot;stuNum&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
</code></pre><p>InnerText \u53EA\u663E\u793A\u5185\u5BB9<code>\u5C0F\u660E \u7537</code><br> InnerXml \u5C06\u6807\u7B7E\u4E00\u540C\u663E\u793A\u51FA\u6765<code> &lt;name&gt;\u5C0F\u660E&lt;/name&gt;&lt;sex&gt;\u7537&lt;/sex&gt;</code></p><h2 id="%E5%88%A0%E9%99%A4-xml-%E6%96%87%E6%A1%A3%E9%87%8C%E7%9A%84%E4%BF%A1%E6%81%AF" tabindex="-1">\u5220\u9664 XML \u6587\u6863\u91CC\u7684\u4FE1\u606F</h2><pre class="language-cs"><code class="language-cs"><span class="token comment">//\u4ECE\u5F53\u524D\u8282\u70B9\u83B7\u53D6\u7236\u8282\u70B9\uFF0C\u4ECE\u7236\u8282\u70B9\u5220\u9664\u5F53\u524D\u8282\u70B9</span>
stuNode<span class="token punctuation">.</span>ParentNode<span class="token punctuation">.</span><span class="token function">RemoveChild</span><span class="token punctuation">(</span>studentNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//\u4ECE\u7236\u8282\u70B9\u76F4\u63A5\u5220\u9664\u5B50\u8282\u70B9</span>
stuNode<span class="token punctuation">.</span><span class="token function">RemoveChild</span><span class="token punctuation">(</span>studentNode<span class="token punctuation">)</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/csharp-use-xml.md");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
var __glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$u,
  date: date$u,
  tags: tags$q,
  category: category$q,
  summary: summary$u,
  meta: meta$u,
  "default": _sfc_main$H
}, Symbol.toStringTag, { value: "Module" }));
const title$t = "Git\u5B66\u4E60\u8BB0\u5F55";
const date$t = "2019/11/17 15:18:05";
const tags$p = ["Git"];
const category$p = "\u5DE5\u5177";
const summary$t = "\u672C\u7BC7\u6587\u7AE0\u4ECB\u7ECDGit\u7684\u672C\u5730\u4F7F\u7528";
const meta$t = [{ "property": "og:title", "content": "Git\u5B66\u4E60\u8BB0\u5F55" }];
const _sfc_main$G = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "Git\u5B66\u4E60\u8BB0\u5F55", "date": "2019/11/17 15:18:05", "tags": ["Git"], "category": "\u5DE5\u5177", "summary": "\u672C\u7BC7\u6587\u7AE0\u4ECB\u7ECDGit\u7684\u672C\u5730\u4F7F\u7528", "meta": [{ "property": "og:title", "content": "Git\u5B66\u4E60\u8BB0\u5F55" }] };
    expose({ frontmatter });
    const head$1 = { "title": "Git\u5B66\u4E60\u8BB0\u5F55", "meta": [{ "property": "og:title", "content": "Git\u5B66\u4E60\u8BB0\u5F55" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><h2 id="git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F" tabindex="-1">Git \u662F\u4EC0\u4E48\uFF1F</h2><p>Git \u662F\u4E16\u754C\u4E0A\u6700\u5148\u8FDB\u7684\u5206\u5E03\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u3002</p><h3 id="%E9%82%A3%E4%B9%88%E4%BB%80%E4%B9%88%E6%98%AF%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E7%B3%BB%E7%BB%9F%EF%BC%9F" tabindex="-1">\u90A3\u4E48\u4EC0\u4E48\u662F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\uFF1F</h3><p>\u6211\u4EEC\u6765\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u5047\u8BBE\u6211\u521B\u5EFA\u4E86\u4E00\u4E2A\u9879\u76EE Project.1\uFF0C\u91CC\u9762\u5199\u4E86\u4E00\u4E2A README.txt \u6587\u6863\u3001\u4E00\u4E2A code1.cs \u548C\u4E00\u4E2A code2.cs\uFF0C\u7B2C\u4E8C\u5929\u6211\u7A81\u7136\u60F3\u6539\u8FDB\u4E00\u4E0B\u7248\u672C\uFF0C\u4F46\u662F\u6211\u4EEC\u4E0D\u80FD\u76F4\u63A5\u5728\u8FD9\u4E2A\u9879\u76EE\u91CC\u6539\uFF0C\u56E0\u4E3A\u5982\u679C\u76F4\u63A5\u5728\u8FD9\u91CC\u9762\u6539\uFF0C\u6211\u4EEC\u8981\u662F\u60F3\u8981\u9000\u56DE\u53BB\u7684\u8BDD\u5C31\u4F1A\u5F88\u9EBB\u70E6\uFF0C\u56E0\u4E3A\u6211\u4EEC\u53EF\u80FD\u8BB0\u4E0D\u4F4F\u4E0A\u4E00\u4E2A\u7248\u672C\u91CC\u9762\u7684\u4EE3\u7801\u662F\u4EC0\u4E48\u6837\u5B50\u7684\uFF0C\u800C\u4E14\u6539\u4EE3\u7801\u8FD9\u4E2A\u4E1C\u897F\u7ECF\u5E38\u662F\u6539\u4E00\u4E2A\u5730\u65B9\u5C31\u8981\u5C06\u8BB8\u591A\u5730\u65B9\u4E00\u540C\u6539\u6389\u3002\u6240\u4EE5\uFF0C\u6211\u5C31\u60F3\u4E86\u4E00\u4E2A\u529E\u6CD5\uFF0C\u5C31\u662F\u5C06\u8FD9\u4E2A\u9879\u76EE\u62F7\u8D1D\u4E00\u4EFD\uFF0C\u7136\u540E\u5C06\u4ED6\u91CD\u547D\u540D\u4E3A Project.2\u3002\u8FD9\u5C31\u662F\u6211\u4EEC\u6700\u6734\u7D20\u7684\u4E00\u4E2A\u7248\u672C\u7BA1\u7406\u7684\u65B9\u6CD5\u3002</p><p>\u4F46\u662F\u968F\u7740\u4EE3\u7801\u91CF\u7684\u589E\u52A0\uFF0C\u8FD9\u79CD\u65B9\u6CD5\u65E0\u7591\u662F\u4E0D\u592A\u9760\u8C31\u7684\uFF0C\u5982\u679C\u4F60\u7684\u7A0B\u5E8F\u662F\u591A\u4EBA\u5408\u4F5C\u5F00\u53D1\u7684\uFF0C\u90A3\u95EE\u9898\u4F1A\u66F4\u5927\uFF0C\u56E0\u4E3A\u5982\u679C\u4E00\u8054\u7F51\uFF0C\u5927\u5BB6\u7684\u7248\u672C\u4E92\u76F8\u8986\u76D6\uFF0C\u5230\u5E95\u54EA\u4E2A\u7248\u672C\u662F\u8C01\u7684\uFF0C\u8BE5\u7528\u54EA\u4E2A\u7248\u672C\u5C31\u4F1A\u51FA\u95EE\u9898\u4E86\u3002</p><p>Linus \u5728\u5F00\u53D1 Linux \u7CFB\u7EDF\u7684\u65F6\u5019\u5C31\u9047\u5230\u4E86\u8FD9\u4E2A\u95EE\u9898\uFF0C\u800C\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0CLinus \u6700\u7EC8\u82B1\u8D39\u4E24\u5468\u7684\u65F6\u95F4\u7528 C \u8BED\u8A00\u5199\u51FA\u4E86 Git\u3002</p><h3 id="%E5%88%86%E5%B8%83%E5%BC%8F%E5%8F%88%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F" tabindex="-1">\u5206\u5E03\u5F0F\u53C8\u662F\u4EC0\u4E48\uFF1F</h3><p>\u5148\u8BF4\u8BF4\u96C6\u4E2D\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\uFF0C\u96C6\u4E2D\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u7684\u7248\u672C\u5E93\u662F\u96C6\u4E2D\u5B58\u653E\u5728\u4E2D\u592E\u670D\u52A1\u5668\u7684\uFF0C\u4F46\u662F\u6211\u4EEC\u5E72\u6D3B\u7684\u65F6\u5019\u90FD\u662F\u7528\u7684\u81EA\u5DF1\u7684\u7535\u8111\uFF0C\u6240\u4EE5\u8981\u5148\u4ECE\u4E2D\u592E\u670D\u52A1\u5668\u4E2D\u53D6\u5F97\u6700\u65B0\u7684\u7248\u672C\uFF0C\u7136\u540E\u5F00\u59CB\u5E72\u6D3B\uFF0C\u518D\u628A\u81EA\u5DF1\u5E72\u597D\u7684\u6D3B\u63A8\u9001\u5230\u4E2D\u592E\u670D\u52A1\u5668\u3002\u8FD9\u4E2A\u96C6\u4E2D\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u6700\u5927\u7684\u6BDB\u75C5\u5C31\u662F\u8054\u7F51\u624D\u80FD\u5E72\u6D3B\uFF0C\u5355\u7EAF\u662F\u5728\u5C40\u57DF\u7F51\u5185\u7684\u8BDD\u8FD8\u597D\uFF0C\u4F46\u662F\u5982\u679C\u662F\u5728\u4E92\u8054\u7F51\u4E0A\uFF0C\u9047\u5230\u7F51\u901F\u6162\u7684\u65F6\u5019\u53EF\u80FD\u63D0\u4EA4\u548C\u4E0B\u8F7D\u6587\u4EF6\u5C31\u8981\u6D6A\u8D39\u5F88\u591A\u65F6\u95F4\u3002</p><p>\u90A3\u4E48\u5206\u5E03\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u5462\uFF1F\u9996\u5148\uFF0C\u5206\u5E03\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u6839\u672C\u6CA1\u6709\u4E2D\u592E\u670D\u52A1\u5668\uFF0C\u6BCF\u4E2A\u4EBA\u7684\u7535\u8111\u4E0A\u90FD\u662F\u4E00\u4E2A\u5B8C\u6574\u7684\u7248\u672C\u5E93\uFF0C\u8FD9\u6837\u5DE5\u4F5C\u7684\u65F6\u5019\u5C31\u4E0D\u9700\u8981\u8054\u7F51\u4E86\uFF0C\u56E0\u4E3A\u7248\u672C\u5E93\u5C31\u5728\u81EA\u5DF1\u7684\u7535\u8111\u4E0A\u3002\u90A3\u4E48\u8BE5\u5982\u4F55\u591A\u4EBA\u534F\u4F5C\u5462\uFF1F\u6BD4\u65B9\u8BF4\uFF0C\u4F60\u5728\u4F60\u7684\u7535\u8111\u4E0A\u4FEE\u6539\u4E86\u6587\u4EF6 A\uFF0C\u4F60\u7684\u540C\u4E8B\u4E5F\u5728\u4ED6\u7684\u7535\u8111\u4E0A\u4FEE\u6539\u4E86\u6587\u4EF6 A\uFF0C\u8FD9\u65F6\u4F60\u4FE9\u53EA\u9700\u8981\u628A\u5404\u81EA\u4FEE\u6539\u7684\u90E8\u5206\u63A8\u9001\u7ED9\u5BF9\u65B9\uFF0C\u5C31\u53EF\u4EE5\u4E92\u76F8\u770B\u5230\u5BF9\u65B9\u7684\u4FEE\u6539\u4E86\u3002</p><p>\u548C\u96C6\u4E2D\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u76F8\u6BD4\uFF0C\u5206\u5E03\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u7684\u5B89\u5168\u6027\u8981\u9AD8\u5F88\u591A\uFF0C\u56E0\u4E3A\u6BCF\u4E2A\u4EBA\u7684\u7535\u8111\u4E2D\u90FD\u6709\u4E00\u4E2A\u5B8C\u6574\u7684\u7248\u672C\u5E93\uFF0C\u67D0\u4E2A\u4EBA\u7684\u7535\u8111\u574F\u4E86\u4E0D\u8981\u7D27\uFF0C\u53EA\u9700\u8981\u53BB\u522B\u4EBA\u54EA\u91CC\u62F7\u8D1D\u4E00\u4E0B\u5C31\u53EF\u4EE5\u4E86\u3002\u4F46\u662F\u96C6\u4E2D\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u7684\u4E2D\u592E\u670D\u52A1\u5668\u8981\u662F\u51FA\u95EE\u9898\u4E86\uFF0C\u6240\u6709\u4EBA\u5C31\u90FD\u6CA1\u6CD5\u5E72\u6D3B\u4E86\u3002</p><p>\u5728\u5B9E\u9645\u4F7F\u7528\u5206\u5E03\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u65F6\uFF0C\u5176\u5B9E\u5F88\u5C11\u5728\u4E24\u4EBA\u4E4B\u95F4\u7684\u7535\u8111\u4E0A\u4E92\u76F8\u63A8\u9001\u7248\u672C\u5E93\u7684\u4FEE\u6539\uFF0C\u56E0\u4E3A\u4F60\u4EEC\u4E0D\u5728\u540C\u4E00\u4E2A\u5C40\u57DF\u7F51\u5185\u7684\u8BDD\u7535\u8111\u662F\u6CA1\u6CD5\u4E92\u76F8\u8BBF\u95EE\u7684\u3002\u6240\u4EE5\uFF0C\u5206\u5E03\u5F0F\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u4E5F\u6709\u4E00\u53F0\u5145\u5F53\u4E2D\u592E\u670D\u52A1\u5668\u7684\u7535\u8111\uFF0C\u4E0D\u8FC7\u8FD9\u4E2A\u670D\u52A1\u5668\u4EC5\u4EC5\u662F\u7528\u6765\u65B9\u4FBF\u5927\u5BB6\u4EA4\u6362\u4FEE\u6539\u7684\uFF0C\u5C31\u7B97\u6302\u6389\u4E86\u4E5F\u6CA1\u5565\u5927\u4E8B\u3002</p><h3 id="git-%E6%98%AF%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E7%9A%84%EF%BC%9F" tabindex="-1">Git \u662F\u5982\u4F55\u8FDB\u884C\u7248\u672C\u63A7\u5236\u7684\uFF1F</h3><p>\u5176\u4ED6\u7684\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u4F8B\u5982 SVN\uFF0C\u4ED6\u4EEC\u662F\u5C06\u6BCF\u4E00\u6B21\u7248\u672C\u7684\u53D8\u52A8\u8BB0\u5F55\u4E0B\u6765\uFF0C\u8FD9\u6837\u5C31\u50CF\u5199\u5C0F\u8BF4\u4E00\u6837\uFF0C\u6BCF\u6B21\u5C31\u53EA\u589E\u52A0\u4E00\u4E2A\u7AE0\u8282\uFF0C\u8FD9\u79CD\u5B58\u50A8\u65B9\u5F0F\u53EB\u505A\u589E\u91CF\u6587\u4EF6\u7CFB\u7EDF\u3002\u800C Git \u662F\u5C06\u6BCF\u4E2A\u7248\u672C\u72EC\u7ACB\u4FDD\u5B58\u8D77\u6765\uFF0C\u4E5F\u5C31\u662F\u8BF4\u5982\u679C\u67D0\u4E2A\u7248\u672C\u4E2D\u6587\u4EF6\u53D1\u751F\u4E86\u53D8\u52A8\uFF0CGit \u5C31\u4F1A\u5C06\u6574\u4E2A\u6587\u4EF6\u590D\u5236\u5E76\u4FDD\u5B58\u8D77\u6765\uFF0C\u8FD9\u6837\u5C31\u50CF\u662F\u5199\u5C0F\u8BF4\u7684\uFF0C\u6BCF\u6B21\u5199\u65B0\u7AE0\u8282\u5C31\u4F1A\u5C06\u4EE5\u524D\u7684\u7AE0\u8282\u518D\u5199\u4E00\u904D\u3002\u8FD9\u79CD\u8BBE\u8BA1\u770B\u4F3C\u4F1A\u6D88\u8017\u66F4\u591A\u7684\u7A7A\u95F4\uFF0C\u4F46\u5728\u540E\u7EED\u7684\u5206\u652F\u7BA1\u7406\u4E0A\u5E26\u6765\u4E86\u5F88\u591A\u7684\u597D\u5904\u548C\u4FBF\u5229\u3002</p><h2 id="%E5%AE%89%E8%A3%85-git" tabindex="-1">\u5B89\u88C5 Git</h2><ol><li><p>\u4E0B\u8F7D Git --&gt; <a href="https://git-scm.com/download/win">https://git-scm.com/download/win</a></p></li><li><p>\u5B89\u88C5\uFF0C\u4E00\u8DEF Next \u5373\u53EF</p></li><li><p>\u914D\u7F6E\u7528\u6237\u4FE1\u606F\uFF0C\u5B89\u88C5\u5B8C\u6210\u540E\u6211\u4EEC\u8981\u5728 Git Bash \u4E2D\u8F93\u5165\u4EE5\u4E0B\u4E24\u884C\u547D\u4EE4</p><pre class="language-shell"><code class="language-shell"><span class="token function">git</span> config --global user.name <span class="token string">&quot;your name&quot;</span>

<span class="token function">git</span> config --global user.email <span class="token string">&quot;email@example.com&quot;</span>
</code></pre></li><li><p>\u53EF\u4EE5\u4F7F\u7528<code>git config --list</code>\u67E5\u770B\u914D\u7F6E\u4FE1\u606F</p></li></ol><h2 id="git-%E4%B9%9F%E9%80%83%E4%B8%8D%E5%BC%80%E5%A2%9E%E5%88%A0%E6%94%B9%E6%9F%A5" tabindex="-1">Git \u4E5F\u9003\u4E0D\u5F00\u589E\u5220\u6539\u67E5</h2><p>\u4F17\u6240\u5468\u77E5\uFF0C\u4E00\u5207\u9879\u76EE\u7684\u57FA\u7840\u662F\u589E\u5220\u6539\u67E5\uFF0CGit \u4E5F\u662F\u5982\u6B64\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u6765\u770B\u770B Git \u4E2D\u7684\u589E\u5220\u6539\u67E5\u3002</p><p>\u9996\u5148\u6211\u4EEC\u5148\u5728\u672C\u5730\u4F7F\u7528 Git\u3002</p><p>\u6211\u4EEC\u5728\u672C\u5730\u521B\u5EFA\u7684\u4ED3\u5E93\u662F\u7531\u4E09\u4E2A\u533A\u57DF\u7EC4\u6210\uFF0C\u8FD9\u662F Git \u7684\u6838\u5FC3\u67B6\u6784\u3002\u5373\uFF1A\u5DE5\u4F5C\u533A\u57DF\u3001\u6682\u5B58\u533A\u57DF\u548C Git \u4ED3\u5E93\uFF08\u7248\u672C\u5E93\uFF09\u3002</p><h3 id="%E5%88%9B%E5%BB%BA%E7%89%88%E6%9C%AC%E5%BA%93" tabindex="-1">\u521B\u5EFA\u7248\u672C\u5E93</h3><p>\u9996\u5148\uFF0C\u9009\u62E9\u4E00\u4E2A\u5408\u9002\u7684\u5730\u65B9\uFF0C\u521B\u5EFA\u4E00\u4E2A\u7A7A\u76EE\u5F55\u3002</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">mkdir</span> learngit
$ <span class="token builtin class-name">cd</span> learngit
$ <span class="token builtin class-name">pwd</span>
</code></pre><p><code>pwd</code>\u547D\u4EE4\u7528\u4E8E\u663E\u793A\u5F53\u524D\u76EE\u5F55\u7684\u8DEF\u5F84</p><p>\u7B2C\u4E8C\u6B65\uFF0C\u901A\u8FC7<code>git init</code>\u547D\u4EE4\u5C06\u8FD9\u4E2A\u76EE\u5F55\u53D8\u6210 Git \u53EF\u4EE5\u7BA1\u7406\u7684\u4ED3\u5E93</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> init
</code></pre><p>\u8FD9\u6837 Git \u77AC\u95F4\u5C31\u5C06\u4ED3\u5E93\u5EFA\u597D\u4E86\uFF0C\u76EE\u5F55\u4E0B\u4F1A\u591A\u51FA\u4E00\u4E2A<code>.git</code>\u9690\u85CF\u76EE\u5F55\uFF0C\u8FD9\u4E2A\u76EE\u5F55\u5C31\u662F Git \u7684\u7248\u672C\u5E93\uFF0C\u4F7F\u7528<code>ls -ah</code>\u5C31\u53EF\u4EE5\u770B\u89C1\u3002</p><h3 id="%E5%B0%86%E6%96%87%E4%BB%B6%E6%B7%BB%E5%8A%A0%E5%88%B0%E7%89%88%E6%9C%AC%E5%BA%93" tabindex="-1">\u5C06\u6587\u4EF6\u6DFB\u52A0\u5230\u7248\u672C\u5E93</h3><p>\u624B\u52A8\u6DFB\u52A0\u81F3\u521A\u521A\u521B\u5EFA\u7684\u76EE\u5F55\u4E0B\u5373\u53EF\uFF0C\u4F46\u662F\u8981\u6CE8\u610F\u5343\u4E07\u4E0D\u8981\u4F7F\u7528 windows \u81EA\u5E26\u7684\u8BB0\u4E8B\u672C\u7F16\u8F91\u4EFB\u4F55\u6587\u672C\u6587\u4EF6\uFF0C\u56E0\u4E3A\u5B83\u4F1A\u7ED9\u6240\u6709 UTF-8 \u7F16\u7801\u7684\u6587\u4EF6\u5F00\u5934\u6DFB\u52A0\u4E00\u4E2A 0xefbbf \u7684\u5B57\u7B26\u3002</p><p>\u6211\u4EEC\u6211\u4EEC\u8FDB\u5165\u521A\u521A\u521B\u5EFA\u7684<code>learngit</code>\u76EE\u5F55\uFF0C\u5728\u505A\u9879\u76EE\u7684\u65F6\u5019\u6211\u4EEC\u901A\u5E38\u90FD\u4F1A\u6709\u4E00\u4E2A<code>README.md</code>\u6765\u4ECB\u7ECD\u81EA\u5DF1\u7684\u9879\u76EE\uFF0C\u6240\u4EE5\u5728\u8FD9\u91CC\u6211\u4EEC\u5148\u7F16\u5199\u4E00\u4E2A<code>README.md</code>\u6587\u4EF6\uFF0C\u5185\u5BB9\u5982\u4E0B</p><pre class="language-shell"><code class="language-shell">This is a project to learn <span class="token function">git</span>
</code></pre><p>\u4FDD\u5B58\u540E\u8FD9\u4E2A\u6587\u4EF6\u5C31\u5B58\u653E\u5728\u4E86 Git \u7684\u5DE5\u4F5C\u533A\u57DF\u4E2D\uFF0C\u5DE5\u4F5C\u533A\u57DF\u5C31\u662F\u5E73\u65F6\u6211\u4EEC\u5B58\u653E\u9879\u76EE\u4EE3\u7801\u7684\u5730\u65B9\u3002</p><p>\u7136\u540E\uFF0C\u6211\u4EEC\u6267\u884C<code>git add</code>\u547D\u4EE4</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> README.md
</code></pre><p>\u6267\u884C\u5B8C\u8BE5\u547D\u4EE4\u540E\uFF0C\u662F\u6CA1\u6709\u4EFB\u4F55\u663E\u793A\u7684\uFF0C\u8FD9\u65F6\u6211\u4EEC\u5C31\u5C06\u6587\u4EF6\u653E\u5165 Git \u7684\u6682\u5B58\u533A\u4E86\uFF0C\u6682\u5B58\u533A\u5B9E\u9645\u4E0A\u53EA\u662F\u4E00\u4E2A\u6587\u4EF6\uFF0C\u4FDD\u5B58\u6211\u4EEC\u5373\u5C06\u63D0\u4EA4\u7684\u6587\u4EF6\u5217\u8868\u4FE1\u606F\u3002</p><p>\u63A5\u4E0B\u6765\u4F7F\u7528<code>git commit</code>\u5C06\u6587\u4EF6\u63D0\u4EA4\u81F3\u4ED3\u5E93</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> commit -m <span class="token string">&quot;wrote a readme file&quot;</span>
</code></pre><p>\u5728\u8FD9\u4E2A\u547D\u4EE4\u4E2D\uFF0C<code>-m</code>\u540E\u9762\u8F93\u5165\u7684\u662F\u672C\u6B21\u63D0\u4EA4\u7684\u8BF4\u660E\uFF0C\u53EF\u4EE5\u8F93\u5165\u4EFB\u4F55\u5185\u5BB9\uFF0C\u5F53\u7136\u6700\u597D\u662F\u6709\u610F\u4E49\u7684\uFF0C\u8FD9\u6837\u4F60\u53EF\u4EE5\u4ECE\u5386\u53F2\u8BB0\u5F55\u4E2D\u65B9\u4FBF\u7684\u627E\u5230\u6539\u52A8\u8BB0\u5F55\u3002</p><p><code>git commit</code>\u6267\u884C\u6210\u529F\u540E\u4F1A\u544A\u8BC9\u4F60<code>1 file changed</code>\u4E00\u4E2A\u6587\u4EF6\u88AB\u6539\u52A8\uFF08README.md\uFF09<code>1 insertions(+)</code>\u63D2\u5165\u4E86\u4E00\u884C\u5185\u5BB9\uFF08README.md \u4E2D\u6709\u4E00\u884C\u5185\u5BB9\uFF09\u3002</p><p>\u6211\u4EEC\u9664\u4E86\u53EF\u4EE5\u4F7F\u7528\u4E00\u6761 add \u8DDF\u4E00\u6761 commit \u6765\u63D0\u4EA4\u4E00\u4E2A\u6587\u4EF6\uFF0C\u8FD8\u53EF\u4EE5\u7528\u4E00\u6761 commit \u63D0\u4EA4\u5F88\u591A\u4E2A\u6587\u4EF6\uFF0C\u6BD4\u5982\uFF1A</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> code1.cs
$ <span class="token function">git</span> <span class="token function">add</span> code2.cs code3.cs
$ <span class="token function">git</span> commit -m <span class="token string">&quot;add 3 cs files&quot;</span>
</code></pre><p>\u81F3\u6B64\uFF0C\u6211\u4EEC\u5B8C\u6210\u4E86\u4E00\u6B21\u5B8C\u6574\u7684 Git \u5DE5\u4F5C\u6D41\u7A0B\uFF0C\u5C31\u662F\u5148\u5728\u5DE5\u4F5C\u76EE\u5F55\u4E2D\u6DFB\u52A0\u3001\u4FEE\u6539\u6587\u4EF6\uFF0C\u5C06\u9700\u8981\u8FDB\u884C\u7248\u672C\u7BA1\u7406\u7684\u6587\u4EF6\u653E\u5165\u6682\u5B58\u533A\uFF0C\u5C06\u6682\u5B58\u533A\u7684\u6587\u4EF6\u63D0\u4EA4\u5230 Git \u4ED3\u5E93\u3002</p><h3 id="%E6%9F%A5%E7%9C%8B%E5%B7%A5%E4%BD%9C%E7%8A%B6%E6%80%81" tabindex="-1">\u67E5\u770B\u5DE5\u4F5C\u72B6\u6001</h3><p>\u6211\u4EEC\u5E94\u8BE5\u90FD\u6E05\u695A\uFF0C\u5728\u5E73\u65F6\u5199\u4EE3\u7801\u505A\u9879\u76EE\u7684\u65F6\u5019\u5FC5\u7136\u4F1A\u521B\u5EFA\u8BB8\u591A\u6587\u4EF6\uFF0C\u6587\u4EF6\u4E00\u591A\uFF0C\u6211\u4EEC\u5C31\u6709\u53EF\u80FD\u8BB0\u4E0D\u4F4F\u54EA\u4E9B\u6587\u4EF6\u6DFB\u52A0\u5230\u6682\u5B58\u533A\u4E86\uFF0C\u54EA\u4E9B\u6587\u4EF6\u63D0\u4EA4\u4E86\u3002\u8FD9\u65F6\u6211\u4EEC\u9700\u8981\u7528\u5230\u53E6\u4E00\u4E2A\u547D\u4EE4\u6765\u67E5\u770B\u6587\u4EF6\u7684\u72B6\u6001<code>git status</code>\u3002\u9996\u5148\uFF0C\u6211\u4EEC\u5148\u6765\u6267\u884C\u4E00\u904D</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> status
On branch master
nothing to commit, working tree clean
</code></pre><p>Git \u544A\u8BC9\u6211\u4EEC\u5F53\u524D\u6CA1\u6709\u9700\u8981\u63D0\u4EA4\u7684\u4FEE\u6539\uFF0C\u5DE5\u4F5C\u76EE\u5F55\u662F\u5E72\u51C0\u7684\uFF0C\u8FD9\u5C31\u8BF4\u660E commit \u63D0\u4EA4\u540E\u7684\u6587\u4EF6\u7528<code>git status</code>\u662F\u4E0D\u4F1A\u663E\u793A\u7684\u3002</p><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u5728\u5DE5\u4F5C\u76EE\u5F55\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u65B0\u7684\u6587\u4EF6<code>LICENSE</code>\uFF0C\u7136\u540E\u518D\u6B21\u6267\u884C<code>git status</code></p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> status
On branch master
Untracked files:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to include <span class="token keyword">in</span> what will be committed<span class="token punctuation">)</span>
        LICENSE

nothing added to commit but untracked files present <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> to track<span class="token punctuation">)</span>
</code></pre><p>\u8FD9\u65F6\u6211\u4EEC\u53D1\u73B0<code>LICENSE</code>\u6587\u4EF6\u7684\u72B6\u6001\u662F<code>Untracked</code>\uFF0C\u8FD9\u5C31\u8868\u793A\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u6DFB\u52A0\u5230\u6682\u5B58\u533A\uFF0C\u4E0D\u53C2\u4E0E\u7248\u672C\u63A7\u5236\u3002\u5728\u8F93\u51FA\u4E2D\u6709\u4E00\u884C\u88AB\u5706\u62EC\u53F7\u5305\u88F9\u7740\uFF0C\u8FD9\u4E00\u884C\u662F Git \u7ED9\u6211\u4EEC\u7684\u64CD\u4F5C\u5EFA\u8BAE\uFF0C\u6211\u4EEC\u4E0D\u59A8\u6309\u7167\u8FD9\u4E2A\u5EFA\u8BAE\u8D70\u4E0B\u53BB\uFF0C\u6267\u884C\u5B8C<code>git add</code>\u540E\u518D\u6B21\u6267\u884C<code>git status</code></p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> LICENSE
$ <span class="token function">git</span> status
On branch master
Changes to be committed:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git restore --staged &lt;file&gt;...&quot;</span> to unstage<span class="token punctuation">)</span>
        new file:   LICENSE
</code></pre><p>\u8FD9\u65F6\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0CGit \u7684\u5EFA\u8BAE\u64CD\u4F5C\u53D8\u6210\u4E86<code>use &quot;git restore --staged &lt;file&gt;...&quot; to unstage</code>\u8FD9\u4E2A\u5EFA\u8BAE\u7684\u610F\u601D\u662F\u4F7F\u7528\u8FD9\u4E2A\u547D\u4EE4\u6765\u8BA9\u6587\u4EF6\u79BB\u5F00\u6682\u5B58\u533A\u3002</p><p>\u6211\u4EEC\u6267\u884C\u8FD9\u4E2A\u547D\u4EE4\u540E\u518D\u6B21\u67E5\u770B\u72B6\u6001</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> restore --staged LICENSE
$ <span class="token function">git</span> status
On branch master
Untracked files:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to include <span class="token keyword">in</span> what will be committed<span class="token punctuation">)</span>
        LICENSE

nothing added to commit but untracked files present <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> to track<span class="token punctuation">)</span>
</code></pre><p>\u8FD9\u6837<code>LICENSE</code>\u7684\u72B6\u6001\u5C31\u53D8\u56DE<code>Untracked</code>\u4E86\u3002</p><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u5BF9<code>README.md</code>\u6587\u4EF6\u8FDB\u884C\u4FEE\u6539\uFF0C\u6539\u6210\u5982\u4E0B\u5185\u5BB9</p><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
</code></pre><p>\u7136\u540E\u518D\u6B21\u8FD0\u884C<code>git status</code>\u547D\u4EE4\u67E5\u770B\u7ED3\u679C</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> status
On branch master
Changes not staged <span class="token keyword">for</span> commit:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to update what will be committed<span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git restore &lt;file&gt;...&quot;</span> to discard changes <span class="token keyword">in</span> working directory<span class="token punctuation">)</span>
        modified:   README.md

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
</code></pre><p>\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u5728\u8F93\u51FA\u4E2D\u6709<code>modified: README.md</code>\u4EE5\u53CA<code>no changes added to commit </code>\u8FD9\u4E2A\u610F\u601D\u5C31\u662F README.md \u8FD9\u4E2A\u6587\u4EF6\u88AB\u4FEE\u6539\u8FC7\u4E86\uFF0C\u4F46\u8FD8\u6CA1\u6709\u51C6\u5907\u63D0\u4EA4\u7684\u4FEE\u6539\u3002<code>modified</code>\u5C31\u662F<code>README.md</code>\u5F53\u524D\u7684\u72B6\u6001\u3002</p><p>\u8FD9\u4E2A\u547D\u4EE4\u867D\u7136\u544A\u8BC9\u6211\u4EEC<code>README.md</code>\u6587\u4EF6\u88AB\u4FEE\u6539\u4E86\uFF0C\u4F46\u6709\u65F6\u5019\u6211\u4EEC\u53EF\u80FD\u60F3\u770B\u770B\u5177\u4F53\u4FEE\u6539\u4E86\u4EC0\u4E48\u5185\u5BB9\uFF0C\u8FD9\u65F6\u5019\u6211\u4EEC\u5C31\u9700\u8981<code>git diff</code>\u547D\u4EE4</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">diff</span> README.md
<span class="token function">diff</span> --git a/README.md b/README.md
index ec489ee<span class="token punctuation">..</span>3e420a2 <span class="token number">100644</span>
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
-This is a project to learn <span class="token function">git</span>
<span class="token punctuation">\\</span> No newline at end of <span class="token function">file</span>
+This is a big project to learn <span class="token function">git</span>
+I love <span class="token function">git</span>
<span class="token punctuation">\\</span> No newline at end of <span class="token function">file</span>
</code></pre><p>diff \u5C31\u662F difference \u7684\u610F\u601D\uFF0C\u5728\u4E0A\u9762\u7684\u8F93\u51FA\u4E2D\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\u7B2C\u4E00\u884C\u589E\u52A0\u4E86\u4E00\u4E2A big \u5355\u8BCD\uFF0C\u4EE5\u53CA\u65B0\u589E\u4E86\u4E00\u884C I love git\u3002\u5728\u77E5\u9053\u4E86\u5177\u4F53\u4FEE\u6539\u5185\u5BB9\u540E\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u653E\u5FC3\u7684\u5B8C\u6210<code>add</code>\u548C<code>commit</code>\u547D\u4EE4\u4E86\u3002\u6211\u4EEC\u62D0\u56DE\u5934\u53BB\u770B\u770B\u4E0A\u6B21\u6267\u884C<code>git status</code>\u65F6 Git \u7ED9\u7684\u5EFA\u8BAE<code>use &quot;git add &lt;file&gt;...&quot; to update what will be committed</code>\u548C<code>use &quot;git restore &lt;file&gt;...&quot; to discard changes in working directory</code>\uFF0C\u7B2C\u4E00\u4E2A\u6211\u4EEC\u5DF2\u7ECF\u5341\u5206\u719F\u6089\u4E86\uFF0C\u7B2C\u4E8C\u4E2A\u5EFA\u8BAE\u662F\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>git restore</code>\u6765\u653E\u5F03\u66F4\u6539\uFF0C\u6211\u4EEC\u6765\u6267\u884C\u4E00\u4E0B\u8FD9\u4E2A\u547D\u4EE4\u8BD5\u8BD5\u3002</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> restore README.md
</code></pre><p>\u6CA1\u6709\u4EFB\u4F55\u8F93\u51FA\uFF0C\u4F46\u662F\u8FD9\u65F6\u6211\u4EEC\u518D\u67E5\u770B<code>README.md</code>\u6587\u4EF6\u4F1A\u53D1\u73B0\u6211\u4EEC\u7684\u66F4\u6539\u90FD\u6D88\u5931\u4E86\uFF0C\u6240\u4EE5\u5728\u4F7F\u7528\u8FD9\u4E2A\u547D\u4EE4\u7684\u65F6\u5019\u4E00\u5B9A\u8981\u614E\u91CD\u3002</p><h3 id="%E7%89%88%E6%9C%AC%E5%9B%9E%E9%80%80" tabindex="-1">\u7248\u672C\u56DE\u9000</h3><p>\u4E0B\u9762\u6211\u4EEC\u518D\u4FEE\u6539\u4E00\u6B21<code>README.md</code>\u6587\u4EF6</p><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
</code></pre><p>\u7136\u540E\u63D0\u4EA4</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> README.md
$ <span class="token function">git</span> commit -m <span class="token string">&quot;add chinese translation&quot;</span>
<span class="token punctuation">[</span>master 310d469<span class="token punctuation">]</span> <span class="token function">add</span> chinese translation
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre><p>\u50CF\u6211\u4EEC\u8FD9\u6837\u4E0D\u65AD\u5BF9\u6587\u4EF6\u8FDB\u884C\u4FEE\u6539\uFF0C\u7136\u540E\u4E0D\u65AD\u63D0\u4EA4\u4FEE\u6539\u5230\u7248\u672C\u5E93\u4E2D\uFF0C\u5C31\u50CF\u6211\u4EEC\u73A9\u6E38\u620F\u7684\u65F6\u5019\u6BCF\u6253\u5230\u4E00\u5B9A\u7A0B\u5EA6\u5C31\u5B58\u6863\uFF0C\u8FD9\u6837\u5982\u679C\u5728\u540E\u9762\u7684\u67D0\u4E00\u4E2A\u5730\u65B9\u5931\u8D25\u4E86\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u8BFB\u6863\u4ECE\u6700\u8FD1\u7684\u8FDB\u5EA6\u5F00\u59CB\u800C\u4E0D\u7528\u4ECE\u5934\u5F00\u59CB\u3002\u524D\u9762\u6211\u4EEC\u6240\u505A\u7684<code>commit</code>\u64CD\u4F5C\u5C31\u50CF\u662F\u5B58\u6863\u64CD\u4F5C\uFF0C\u8BFB\u6863\u64CD\u4F5C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>git log</code>\u548C<code>git reset</code>\u547D\u4EE4\u5B8C\u6210\u3002</p><p>\u9996\u5148\u6211\u4EEC\u67E5\u770B\u4E00\u4E0B\u6211\u4EEC\u4E00\u5171\u6709\u591A\u5C11\u201C\u5B58\u6863\u201D\uFF08<u>\u4E0A\u9762\u64CD\u4F5C\u7684\u987A\u5E8F\u6211\u6539\u4E86\u6539\uFF0C\u6240\u4EE5\u8FD9\u91CC\u6211\u7684\u7248\u672C\u987A\u5E8F\u6709\u4E9B\u4E0D\u5BF9</u>\uFF09</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> log
commit 310d469f13a7f6d4add1edf323ad8ef194e7a70d <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span>
Author: qiyuor2 <span class="token operator">&lt;</span><span class="token number">1176281967</span>@qq.com<span class="token operator">&gt;</span>
Date:   Sun Nov <span class="token number">17</span> <span class="token number">10</span>:02:19 <span class="token number">2019</span> +0800

    <span class="token function">add</span> chinese translation

commit 3e6ef04eaab69eaf4ece551c5cd76f65b9ab31b2
Author: qiyuor2 <span class="token operator">&lt;</span><span class="token number">1176281967</span>@qq.com<span class="token operator">&gt;</span>
Date:   Sat Nov <span class="token number">16</span> <span class="token number">22</span>:23:48 <span class="token number">2019</span> +0800

    <span class="token function">add</span> a LICENSE <span class="token function">file</span>

commit 4572a22c5f04abe587fa24a41da651cea02a2b55
Author: qiyuor2 <span class="token operator">&lt;</span><span class="token number">1176281967</span>@qq.com<span class="token operator">&gt;</span>
Date:   Sat Nov <span class="token number">16</span> <span class="token number">21</span>:47:47 <span class="token number">2019</span> +0800

    <span class="token function">add</span> a newline

commit 01c756183d30c82fd54e600e11a36733cf794fd6
Author: qiyuor2 <span class="token operator">&lt;</span><span class="token number">1176281967</span>@qq.com<span class="token operator">&gt;</span>
Date:   Sat Nov <span class="token number">16</span> <span class="token number">21</span>:38:13 <span class="token number">2019</span> +0800

    change readme

commit 45b6484663bf370880d470427a1e388a006452e0
Author: qiyuor2 <span class="token operator">&lt;</span><span class="token number">1176281967</span>@qq.com<span class="token operator">&gt;</span>
Date:   Sat Nov <span class="token number">16</span> <span class="token number">21</span>:36:44 <span class="token number">2019</span> +0800

    <span class="token function">add</span> a readme <span class="token function">file</span>
</code></pre><p><code>git log</code>\u547D\u4EE4\u4F1A\u663E\u793A\u4ECE\u6700\u8FD1\u5230\u6700\u8FDC\u7684\u63D0\u4EA4\u65E5\u5FD7\uFF0C\u5982\u679C\u89C9\u5F97\u8F93\u51FA\u7684\u4FE1\u606F\u592A\u591A\u53EF\u4EE5\u5C1D\u8BD5\u52A0\u4E0A<code>--pretty=oneline</code>\u53C2\u6570</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> log --pretty<span class="token operator">=</span>oneline
310d469f13a7f6d4add1edf323ad8ef194e7a70d <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> <span class="token function">add</span> chinese translation
3e6ef04eaab69eaf4ece551c5cd76f65b9ab31b2 <span class="token function">add</span> a LICENSE <span class="token function">file</span>
4572a22c5f04abe587fa24a41da651cea02a2b55 <span class="token function">add</span> a newline
01c756183d30c82fd54e600e11a36733cf794fd6 change readme
45b6484663bf370880d470427a1e388a006452e0 <span class="token function">add</span> a readme <span class="token function">file</span>
</code></pre><p>\u8FD9\u524D\u9762\u7684\u4E00\u5927\u4E32\u50CF\u4E71\u7801\u4E00\u6837\u7684\u4E1C\u897F\u662F<code>commit id</code>\uFF0C\u5C31\u662F\u7248\u672C\u53F7\uFF0C\u4E3A\u4E86\u9632\u6B62\u591A\u4EBA\u534F\u4F5C\u7684\u65F6\u5019\u4EA7\u751F\u51B2\u7A81\uFF0CGit \u6CA1\u6709\u91C7\u7528\u7B80\u5355\u7684 1\u30012\u30013\u2026\u2026\u4F5C\u4E3A\u7248\u672C\u53F7\u3002</p><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u8BFB\u53D6\u5B58\u6863\uFF0C\u6211\u4EEC\u8BB2<code>README.md</code>\u9000\u56DE\u5230\u4E0A\u4E00\u4E2A\u7248\u672C</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> reset --hard HEAD^
HEAD is now at 3e6ef04 <span class="token function">add</span> a LICENSE <span class="token function">file</span>

$ <span class="token function">cat</span> README.md
This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
</code></pre><p>\u5728 Git \u4E2D<code>HEAD</code>\u8868\u793A\u5F53\u524D\u7248\u672C\uFF0C<code>HEAD^</code>\u8868\u793A\u4E0A\u4E00\u4E2A\u7248\u672C\uFF0C\u4E0A\u4E0A\u4E00\u4E2A\u7248\u672C\u5C31\u662F<code>HEAD^^</code>\uFF0C\u5982\u679C\u662F\u7F51\u4E0A 100 \u4E2A\u7248\u672C\u5C31\u6CA1\u5FC5\u8981\u5199 100 \u4E2A<code>^</code>\uFF0C\u53EF\u4EE5\u5199\u6210<code>HEAD~100</code>\u3002\u6211\u4EEC\u53EF\u4EE5\u770B\u5230<code>README.md</code>\u6587\u4EF6\u88AB\u6210\u529F\u8FD8\u539F\u4E86\uFF0C\u8FD9\u65F6\u6211\u4EEC\u518D\u67E5\u770B\u7248\u672C\u5E93\u7684\u72B6\u6001</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> log --pretty<span class="token operator">=</span>oneline
3e6ef04eaab69eaf4ece551c5cd76f65b9ab31b2 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> <span class="token function">add</span> a LICENSE <span class="token function">file</span>
4572a22c5f04abe587fa24a41da651cea02a2b55 <span class="token function">add</span> a newline
01c756183d30c82fd54e600e11a36733cf794fd6 change readme
45b6484663bf370880d470427a1e388a006452e0 <span class="token function">add</span> a readme <span class="token function">file</span>
</code></pre><p>\u4F1A\u53D1\u73B0\u6700\u65B0\u7684<code>add chinese translation</code>\u7248\u672C\u5DF2\u7ECF\u627E\u4E0D\u5230\u4E86\uFF0C\u8FD9\u4E2A\u65F6\u5019\u5982\u679C\u6211\u4EEC\u60F3\u8981\u91CD\u65B0\u56DE\u5230\u8FD9\u4E2A\u7248\u672C\u5C31\u9700\u8981\u7528\u5230\u8FD9\u4E2A\u7248\u672C\u7684<code>commit id</code>\u4E86</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> reset --hard 310d46
HEAD is now at 310d469 <span class="token function">add</span> chinese translation

$ <span class="token function">cat</span> README.md
This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
</code></pre><p>\u7248\u672C\u53F7\u6CA1\u5FC5\u8981\u5199\u5168\uFF0C\u53EA\u9700\u8981\u5199\u524D\u51E0\u4F4D Git \u5C31\u4F1A\u81EA\u52A8\u53BB\u627E\u3002Git \u7684\u7248\u672C\u56DE\u9000\u662F\u975E\u5E38\u5FEB\u7684\uFF0C\u56E0\u4E3A\u5728 Git \u5185\u90E8\u6709\u4E00\u4E2A\u6307\u5411\u5F53\u524D\u7248\u672C\u7684<code>HEAD</code>\u6307\u9488\uFF0C\u5F53\u4F60\u56DE\u9000\u7248\u672C\u7684\u65F6\u5019\uFF0CGit \u4EC5\u4EC5\u662F\u628A<code>HEAD</code>\u6307\u9488\u6307\u5411\u4F60\u8981\u56DE\u9000\u7684\u7248\u672C\uFF0C\u7136\u540E\u5C06\u8BE5\u7248\u672C\u56DE\u9000\u5230\u6682\u5B58\u533A\u5E76\u5C06\u6682\u5B58\u533A\u8FD8\u539F\u5230\u5DE5\u4F5C\u76EE\u5F55\uFF0C\u8BA9\u4F60\u770B\u5230\u56DE\u9000\u540E\u7684\u6587\u4EF6\u3002</p><p>\u73B0\u5728\uFF0C\u5982\u679C\u6211\u4EEC\u56DE\u9000\u5230\u67D0\u4E2A\u7248\u672C\u540E\u60F3\u8981\u56DE\u53BB\uFF0C\u4F46\u662F\u5FD8\u8BB0\u4E86<code>commit id</code>\uFF0C\u547D\u4EE4\u884C\u8FD8\u6E05\u7406\u4E86\u627E\u4E0D\u5230\u6700\u65B0\u7248\u672C\u7684<code>commit id</code>\uFF0C\u8FD9\u65F6\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>git reflog</code>\uFF0C\u8FD9\u4E2A\u547D\u4EE4\u4F1A\u8BB0\u5F55\u6211\u4EEC\u6BCF\u4E00\u6B21\u5BF9\u7248\u672C\u7684\u64CD\u4F5C</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> reflog
310d469 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: reset: moving to 310d46
3e6ef04 HEAD@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: reset: moving to HEAD^
310d469 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: commit: <span class="token function">add</span> chinese translation
3e6ef04 HEAD@<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span>: commit: <span class="token function">add</span> a LICENSE <span class="token function">file</span>
4572a22 HEAD@<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">}</span>: commit: <span class="token function">add</span> a newline
01c7561 HEAD@<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span>: commit: change readme
45b6484 HEAD@<span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">}</span>: commit <span class="token punctuation">(</span>initial<span class="token punctuation">)</span>: <span class="token function">add</span> a readme <span class="token function">file</span>
</code></pre><h3 id="%E7%AE%A1%E7%90%86%E4%BF%AE%E6%94%B9" tabindex="-1">\u7BA1\u7406\u4FEE\u6539</h3><p>\u4E0B\u9762\u6211\u4EEC\u7EE7\u7EED\u4FEE\u6539<code>README.md</code>\u6587\u4EF6</p><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
</code></pre><p>\u7136\u540E\u6DFB\u52A0</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> README.md
$ <span class="token function">git</span> status
On branch master
Changes to be committed:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git restore --staged &lt;file&gt;...&quot;</span> to unstage<span class="token punctuation">)</span>
        modified:   README.md
</code></pre><p>\u7136\u540E\u518D\u6B21\u4FEE\u6539 README.md</p><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
Java is also a good programming language
</code></pre><p>\u63D0\u4EA4\uFF0C\u7136\u540E\u67E5\u770B\u72B6\u6001</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> commit -m <span class="token string">&quot;C# is good&quot;</span>
<span class="token punctuation">[</span>master 61c5ed5<span class="token punctuation">]</span> C<span class="token comment"># is good</span>
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>

$ <span class="token function">git</span> status
On branch master
Changes not staged <span class="token keyword">for</span> commit:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to update what will be committed<span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git restore &lt;file&gt;...&quot;</span> to discard changes <span class="token keyword">in</span> working directory<span class="token punctuation">)</span>
        modified:   README.md

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
</code></pre><p>\u8FD9\u65F6\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C<code>README.md</code>\u4ECD\u7136\u663E\u793A\u4E3A\u4FEE\u6539\u540E\u672A\u63D0\u4EA4\u3002</p><p>\u6211\u4EEC\u4F7F\u7528<code>git diff HEAD -- README.md</code>\u547D\u4EE4\u67E5\u770B\u4E00\u4E0B\u5F53\u524D\u4ED3\u5E93\u4E2D\u7684\u6587\u4EF6\u548C\u5DE5\u4F5C\u533A\u7684\u6587\u4EF6\u6709\u4EC0\u4E48\u533A\u522B\uFF08\u4E2D\u6587\u53EF\u80FD\u4F1A\u6709\u4E71\u7801\uFF09</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">diff</span> HEAD -- README.md
<span class="token function">diff</span> --git a/README.md b/README.md
index a8963da<span class="token punctuation">..</span>08874e0 <span class="token number">100644</span>
--- a/README.md
+++ b/README.md
@@ -1,4 +1,5 @@
 This is a big project to learn <span class="token function">git</span>
 I love <span class="token function">git</span>
 <span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">8</span>&gt;</span><span class="token operator">&lt;</span>BF<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token number">9</span><span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span><span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">6</span>&gt;</span><span class="token operator">&lt;</span><span class="token number">9</span><span class="token operator"><span class="token file-descriptor important">8</span>&gt;</span><span class="token operator">&lt;</span>AF<span class="token operator">&gt;</span><span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">4</span>&gt;</span><span class="token operator">&lt;</span>B<span class="token operator"><span class="token file-descriptor important">8</span>&gt;</span><span class="token operator">&lt;</span><span class="token number">8</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span><span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">4</span>&gt;</span><span class="token operator">&lt;</span>B<span class="token operator"><span class="token file-descriptor important">8</span>&gt;</span><span class="token operator">&lt;</span>AA<span class="token operator">&gt;</span><span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">5</span>&gt;</span><span class="token operator">&lt;</span>AD<span class="token operator">&gt;</span><span class="token operator">&lt;</span>A<span class="token operator"><span class="token file-descriptor important">6</span>&gt;</span><span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">4</span>&gt;</span><span class="token operator">&lt;</span>B<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span><span class="token operator">&lt;</span>A<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span>Git<span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">7</span>&gt;</span><span class="token operator">&lt;</span>9A<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token number">8</span><span class="token operator"><span class="token file-descriptor important">4</span>&gt;</span><span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span><span class="token operator">&lt;</span>A<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span><span class="token operator">&lt;</span>B<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span><span class="token operator">&lt;</span>E<span class="token operator"><span class="token file-descriptor important">7</span>&gt;</span>AE<span class="token operator">&gt;</span>
-C<span class="token comment"># is a good programming language</span>
<span class="token punctuation">\\</span> No newline at end of <span class="token function">file</span>
+C<span class="token comment"># is a good programming language</span>
+Java is also a good programming language
<span class="token punctuation">\\</span> No newline at end of <span class="token function">file</span>
</code></pre><p>\u6211\u4EEC\u56DE\u987E\u4E00\u4E0B\u521A\u624D\u7684\u64CD\u4F5C\uFF1A</p><p>\u7B2C\u4E00\u6B21\u4FEE\u6539 -&gt; <code>git add</code> -&gt; \u7B2C\u4E8C\u6B21\u4FEE\u6539 -&gt; <code>git commit</code></p><p>\u8FD9\u65F6\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u7B2C\u4E8C\u6B21\u7684\u4FEE\u6539\u5E76\u6CA1\u6709\u88AB\u63D0\u4EA4\u6210\u529F\uFF0C\u56E0\u4E3A<code>git commit</code>\u53EA\u4F1A\u63D0\u4EA4\u88AB<code>git add</code>\u6DFB\u52A0\u81F3\u6682\u5B58\u533A\u7684<strong>\u4FEE\u6539</strong>\uFF0C\u5E76\u975E\u662F\u6587\u4EF6\u3002\u5982\u679C\u6211\u4EEC\u60F3\u8981\u63D0\u4EA4\u7B2C\u4E8C\u6B21\u4FEE\u6539\uFF0C\u53EA\u9700\u8981\u518D\u6267\u884C\u4E00\u6B21<code>git add</code>\u548C<code>git commit</code></p><p>\u6709\u4E9B\u65F6\u5019\u6211\u4EEC\u53EF\u80FD\u4F1A\u9047\u5230<code>commit</code>\u540E\u53D1\u73B0\u81EA\u5DF1\u63D0\u4EA4\u7684\u8BF4\u660E\u4E0D\u591F\u8BE6\u7EC6\uFF0C\u60F3\u8981\u66F4\u6539\u8BF4\u660E\uFF0C\u8FD9\u65F6\u5C31\u8981\u7528\u5230<code>git commit --amend</code></p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> commit --amend
java is good

<span class="token comment"># Please enter the commit message for your changes. Lines starting</span>
<span class="token comment"># with &#39;#&#39; will be ignored, and an empty message aborts the commit.</span>
<span class="token comment">#</span>
<span class="token comment"># Date:      Sun Nov 17 12:12:57 2019 +0800</span>
<span class="token comment">#</span>
<span class="token comment"># On branch master</span>
<span class="token comment"># Changes to be committed:</span>
<span class="token comment">#       modified:   README.md</span>
<span class="token comment">#</span>
~
~
</code></pre><p>\u8FD9\u65F6\u4F1A\u663E\u793A\u4E00\u4E2A\u8FD9\u6837\u7684\u754C\u9762\uFF0C\u7B2C\u4E00\u884C\u5C31\u662F\u6211\u4EEC\u6DFB\u52A0\u7684\u8BF4\u660E\uFF0C\u6309\u4E0B\u201CI\u201D\u952E\uFF0C\u5C31\u53EF\u4EE5\u66F4\u6539\u3002\u66F4\u6539\u5B8C\u6210\u540E\uFF0C\u6309\u4E0B\u201CESC\u201D\uFF0C\u7136\u540E\u8F93\u5165\u201C:\u201D + \u201Cwq\u201D + \u56DE\u8F66\uFF0C\u5C31\u53EF\u4EE5\u5B8C\u6210\u4FEE\u6539\uFF0C\u5982\u679C\u4E0D\u60F3\u4FEE\u6539\u4F7F\u7528\u201C:\u201D + \u201Cq!\u201D + \u56DE\u8F66\u5373\u53EF\u3002\u6216\u8005\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528<code>git commit --amend -m &quot;\u65B0\u7684\u8BF4\u660E&quot;</code>\u5373\u53EF\u5B8C\u6210\u66F4\u6539\u3002</p><h3 id="%E5%88%A0%E9%99%A4%E6%96%87%E4%BB%B6" tabindex="-1">\u5220\u9664\u6587\u4EF6</h3><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u5728\u6587\u4EF6\u7BA1\u7406\u5668\u4E2D\u5220\u6389<code>LICENSE</code>\u6587\u4EF6\uFF0C\u6216\u8005\u4F7F\u7528<code>rm</code>\u547D\u4EE4\u4E5F\u53EF\u4EE5</p><pre class="language-shell"><code class="language-shell"><span class="token function">rm</span> LICENSE
</code></pre><p>\u8FD9\u4E2A\u65F6\u5019\uFF0C\u5DE5\u4F5C\u533A\u7684\u6587\u4EF6\u4E0D\u5728\u4E86\uFF0C\u4F46\u662F\u7248\u672C\u5E93\u4E2D\u8FD8\u5B58\u5728\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u8FD9\u65F6\u6211\u4EEC\u67E5\u770B\u72B6\u6001\uFF1A</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> status
On branch master
Changes not staged <span class="token keyword">for</span> commit:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add/rm &lt;file&gt;...&quot;</span> to update what will be committed<span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git restore &lt;file&gt;...&quot;</span> to discard changes <span class="token keyword">in</span> working directory<span class="token punctuation">)</span>
        deleted:    LICENSE

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
</code></pre><p><code>git status</code>\u4F1A\u544A\u8BC9\u6211\u4EEC\u8FD9\u4E2A\u6587\u4EF6\u88AB\u5220\u9664\u4E86\uFF0C\u8FD9\u65F6\u6211\u4EEC\u6709\u4E24\u4E2A\u9009\u62E9\uFF0C\u4E00\u662F\u4ECE\u7248\u672C\u5E93\u4E2D\u5220\u9664\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u4F7F\u7528<code>git rm</code>\u5E76\u6267\u884C<code>git commit</code>\u3002</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">rm</span> LICENSE
<span class="token function">rm</span> <span class="token string">&#39;LICENSE&#39;</span>
$ <span class="token function">git</span> commit -m <span class="token string">&quot;remove LICENSE&quot;</span>
<span class="token punctuation">[</span>master d78ec29<span class="token punctuation">]</span> remove LICENSE
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">0</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">0</span> deletions<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
 delete mode <span class="token number">100644</span> LICENSE
</code></pre><p>\u4E8C\u662F\u4F7F\u7528<code>git restore</code>\u6062\u590D\u8BE5\u6587\u4EF6</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> restore LICENSE
$ <span class="token function">ls</span>
LICENSE  README.md
</code></pre><h2 id="%E5%88%86%E6%94%AF%E7%AE%A1%E7%90%86" tabindex="-1">\u5206\u652F\u7BA1\u7406</h2><p>\u5206\u652F\u53EF\u4EE5\u8BF4\u662F Git \u4E2D\u6700\u5F3A\u5927\u7684\u529F\u80FD\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u5C31\u6765\u5B66\u4E60\u4E00\u4E0B Git \u4E2D\u7684\u5206\u652F\u3002</p><p>\u5206\u652F\u5230\u5E95\u6709\u5565\u7528\u5462\uFF1F\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u9879\u76EE\u5DF2\u7ECF\u4E0A\u7EBF\u4E86\uFF0C\u4F46\u662F\u8981\u5F00\u53D1\u4E00\u4E2A\u65B0\u7684\u529F\u80FD\uFF0C\u8FD9\u4E2A\u529F\u80FD\u8981\u5199\u597D\u51E0\u5929\u624D\u80FD\u5B8C\u6210\uFF0C\u5982\u679C\u6211\u4EEC\u5728\u4EE3\u7801\u6CA1\u6709\u5199\u5B8C\u5C31\u63D0\u4EA4\u7684\u8BDD\u5F88\u6709\u53EF\u80FD\u4F1A\u5F71\u54CD\u9879\u76EE\u7684\u6B63\u5E38\u8FD0\u884C\uFF0C\u4F46\u662F\u5982\u679C\u6211\u4EEC\u4E00\u6B21\u6027\u5199\u5B8C\u518D\u63D0\u4EA4\uFF0C\u53C8\u9762\u4E34\u7740\u4E22\u5931\u8FDB\u5EA6\u7684\u5DE8\u5927\u98CE\u9669\u3002</p><p>\u5982\u679C\u6211\u4EEC\u4F7F\u7528\u5206\u652F\u7684\u8BDD\uFF0C\u5C31\u53EF\u4EE5\u907F\u514D\u8FD9\u4E2A\u95EE\u9898\u3002\u6211\u4EEC\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u81EA\u5DF1\u7684\u5206\u652F\uFF0C\u522B\u4EBA\u8FD8\u5728\u539F\u6765\u7684\u5206\u652F\u4E0A\u5DE5\u4F5C\uFF0C\u800C\u6211\u4EEC\u5728\u81EA\u5DF1\u7684\u5206\u652F\u4E0A\u5DE5\u4F5C\u53EF\u4EE5\u968F\u610F\u63D0\u4EA4\u4E5F\u4E0D\u4F1A\u5F71\u54CD\u6574\u4E2A\u9879\u76EE\uFF0C\u76F4\u5230\u529F\u80FD\u5F00\u53D1\u5B8C\u6BD5\u540E\u4E00\u6B21\u6027\u5C06\u5206\u652F\u5408\u5E76\u5230\u539F\u6765\u7684\u5206\u652F\u4E0A\uFF0C\u8FD9\u6837\u5B89\u5168\u53C8\u4E0D\u4F1A\u5F71\u54CD\u522B\u4EBA\u5DE5\u4F5C\u3002</p><p>\u4E8B\u5B9E\u4E0A\uFF0C\u5176\u4ED6\u7684\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u90FD\u652F\u6301\u5206\u652F\u7BA1\u7406\uFF0C\u4F46\u662F\u8FD9\u4E9B\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u7684\u5206\u652F\u7BA1\u7406\u7684\u901F\u5EA6\u975E\u5E38\u6162\uFF0C\u800C\u5728 Git \u4E2D\uFF0C\u65E0\u8BBA\u662F\u521B\u5EFA\u3001\u5207\u6362\u8FD8\u662F\u5220\u9664\u5206\u652F\uFF0C\u65E0\u8BBA\u5728\u4F60\u7684\u7248\u672C\u5E93\u4E2D\u6709\u591A\u5C11\u6587\u4EF6\uFF0C\u5B83\u90FD\u80FD\u5728 1 \u5206\u949F\u5185\u5B8C\u6210\uFF08\u56E0\u4E3A Git \u6BCF\u4E00\u4E2A\u8282\u70B9\u90FD\u662F\u4E00\u4E2A\u5B8C\u6574\u7684\u9879\u76EE\u526F\u672C\uFF09\u3002</p><h3 id="%E5%88%9B%E5%BB%BA%E3%80%81%E5%88%87%E6%8D%A2%E3%80%81%E5%90%88%E5%B9%B6%E4%B8%8E%E5%88%A0%E9%99%A4%E5%88%86%E6%94%AF" tabindex="-1">\u521B\u5EFA\u3001\u5207\u6362\u3001\u5408\u5E76\u4E0E\u5220\u9664\u5206\u652F</h3><p>\u9996\u5148\u6211\u4EEC\u6765\u521B\u5EFA\u4E00\u4E2A\u5206\u652F\uFF0C\u5E76\u4E14\u5207\u6362\u5230\u8FD9\u4E2A\u5206\u652F</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> branch dev
$ <span class="token function">git</span> checkout dev
Switched to branch <span class="token string">&#39;dev&#39;</span>
</code></pre><p>\u8FD9\u4E24\u884C\u547D\u4EE4\u53EF\u4EE5\u7528<code>git checkout -b dev</code>\u6765\u4EE3\u66FF\u3002\u63A5\u4E0B\u6765\u6211\u4EEC\u7528<code>git branch</code>\u6765\u67E5\u770B\u5206\u652F\u3002</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> branch
* dev
  master
</code></pre><p><code>git branch</code>\u547D\u4EE4\u4F1A\u5217\u51FA\u6240\u6709\u5206\u652F\uFF0C\u5E76\u4E14\u4F1A\u5728\u5F53\u524D\u5206\u652F\u524D\u52A0\u4E00\u4E2A<code>*</code>\uFF0C\u5728\u8FD9\u4E2A\u5206\u652F\u5217\u8868\u4E2D\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u8FD9\u91CC\u9664\u4E86\u6211\u4EEC\u521A\u521A\u521B\u5EFA\u7684<code>dev</code>\u5206\u652F\uFF0C\u8FD8\u6709\u4E00\u4E2A<code>master</code>\u5206\u652F\uFF0C\u8FD9\u4E2A\u5206\u652F\u662F Git \u4E3A\u6211\u4EEC\u521B\u5EFA\u7684\u4E00\u4E2A\u9ED8\u8BA4\u5206\u652F\u3002</p><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u5728\u5F53\u524D\u5206\u652F\u4E0A\u63D0\u4EA4\u4FEE\u6539\u3002\u4FEE\u6539<code>README.md</code>\u6587\u4EF6</p><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
Java is also a good programming language
Create a new branch
</code></pre><p>\u7136\u540E\u63D0\u4EA4</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> README.md
$ <span class="token function">git</span> commit -m <span class="token string">&quot;new branch test&quot;</span>
<span class="token punctuation">[</span>dev 571df6d<span class="token punctuation">]</span> new branch <span class="token builtin class-name">test</span>
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u5207\u6362\u56DE<code>master</code>\u5206\u652F\uFF0C\u7136\u540E\u67E5\u770B\u6587\u4EF6</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> checkout master
Switched to branch <span class="token string">&#39;master&#39;</span>

$ <span class="token function">cat</span> README.md
This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
Java is also a good programming language
</code></pre><p>\u8FD9\u65F6\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u521A\u624D\u6DFB\u52A0\u7684\u5185\u5BB9\u4E0D\u89C1\u4E86\uFF0C\u8FD9\u662F\u56E0\u4E3A\u521A\u624D\u6DFB\u52A0\u7684\u5185\u5BB9\u5728<code>dev</code>\u5206\u652F\u4E0A\uFF0C<code>master</code>\u5206\u652F\u8FD8\u6CA1\u6709\u6539\u53D8\u3002</p><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u628A<code>dev</code>\u5206\u652F\u7684\u5DE5\u4F5C\u6210\u679C\u5408\u5E76\u5230<code>master</code>\u5206\u652F\u4E0A</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> merge dev
Updating d78ec29<span class="token punctuation">..</span>571df6d
Fast-forward
 README.md <span class="token operator">|</span> <span class="token number">3</span> ++-
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre><p>\u7136\u540E\u518D\u67E5\u770B<code>README.md</code></p><pre class="language-shell"><code class="language-shell">$ <span class="token function">cat</span> README.md
This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
Java is also a good programming language
Create a new branch
</code></pre><p>\u8FD9\u6837<code>master</code>\u5206\u652F\u5C31\u548C<code>dev</code>\u5206\u652F\u5B8C\u5168\u4E00\u6837\u4E86\uFF0C\u5728\u5408\u5E76\u5206\u652F\u7684\u8F93\u51FA\u4E2D\u6709\u4E00\u53E5<code>Fast-forward</code>\uFF0C\u8FD9\u5C31\u8868\u793A\u8FD9\u6B21\u5206\u652F\u6A21\u5F0F\u662F\u201C\u5FEB\u8FDB\u6A21\u5F0F\u201D\uFF0C\u4E5F\u5C31\u662F\u76F4\u63A5\u5C06<code>master</code>\u6307\u5411<code>dev</code>\u7684\u5F53\u524D\u63D0\u4EA4\uFF0C\u6240\u4EE5\u5408\u5E76\u901F\u5EA6\u975E\u5E38\u5FEB\u3002</p><p>\u5408\u5E76\u5B8C\u6210\u540E\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5220\u9664\u5206\u652F\u4E86</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> branch -d dev
Deleted branch dev <span class="token punctuation">(</span>was 571df6d<span class="token punctuation">)</span>.

$ <span class="token function">git</span> branch
* master
</code></pre><p>\u73B0\u5728\u5C31\u53EA\u5269\u4E0B<code>master</code>\u5206\u652F\u4E86</p><h3 id="%E8%A7%A3%E5%86%B3%E5%90%88%E5%B9%B6%E5%86%B2%E7%AA%81" tabindex="-1">\u89E3\u51B3\u5408\u5E76\u51B2\u7A81</h3><p>\u6709\u65F6\u5019\u6211\u4EEC\u5408\u5E76\u5206\u652F\u5E76\u4E0D\u4F1A\u8FD9\u4E48\u8F7B\u677E\uFF0C\u5206\u652F\u95F4\u7ECF\u5E38\u4F1A\u51FA\u73B0\u5404\u79CD\u5404\u6837\u7684\u51B2\u7A81\u3002\u63A5\u4E0B\u6765\u6211\u4EEC\u5C31\u8981\u89E3\u51B3\u8FD9\u4E9B\u51B2\u7A81\u3002</p><p>\u5148\u51C6\u5907\u4E00\u4E2A\u65B0\u7684\u5206\u652F\uFF0C\u5E76\u5728\u8FD9\u4E2A\u5206\u652F\u4E0A\u63D0\u4EA4\u65B0\u7684\u4FEE\u6539</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> checkout -b feature
Switched to a new branch <span class="token string">&#39;feature&#39;</span>
</code></pre><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
Java is also a good programming language
Create a new branch
Create a new feature branch
</code></pre><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> README.md
$ <span class="token function">git</span> commit -m <span class="token string">&quot;new feature branch&quot;</span>
<span class="token punctuation">[</span>feature e5c49d4<span class="token punctuation">]</span> new feature branch
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre><p>\u7136\u540E\u5207\u6362\u56DE<code>master</code>\u5206\u652F\uFF0C\u5E76\u5C06\u4FEE\u6539\u6587\u4EF6</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> checkout master
Switched to branch <span class="token string">&#39;master&#39;</span>
</code></pre><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
Java is also a good programming language
Create a new branch
Create a new feature branch is easy
</code></pre><p>\u63D0\u4EA4</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> README.md
$ <span class="token function">git</span> commit -m <span class="token string">&quot;is easy&quot;</span>
<span class="token punctuation">[</span>master f730807<span class="token punctuation">]</span> is easy
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre><p>\u73B0\u5728\uFF0C\u4E24\u4E2A\u5206\u652F\u90FD\u6709\u4E86\u5404\u81EA\u7684\u65B0\u63D0\u4EA4\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>git log --decorate --graph --oneline --all</code>\u5C06\u63D0\u4EA4\u5386\u53F2\u548C\u6240\u5C5E\u5206\u652F\u4EE5\u56FE\u5F62\u5316\u663E\u793A\u51FA\u6765</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> log --decorate --graph --oneline --all
* f730807 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> is easy
<span class="token operator">|</span> * e5c49d4 <span class="token punctuation">(</span>feature<span class="token punctuation">)</span> new feature branch
<span class="token operator">|</span>/
* 571df6d new branch <span class="token builtin class-name">test</span>
* d78ec29 remove LICENSE
* 959d046 java is good
* 61c5ed5 C<span class="token comment"># is good</span>
* 310d469 <span class="token function">add</span> chinese translation
* 3e6ef04 <span class="token function">add</span> a LICENSE <span class="token function">file</span>
* 4572a22 <span class="token function">add</span> a newline
* 01c7561 change readme
* 45b6484 <span class="token function">add</span> a readme <span class="token function">file</span>
</code></pre><p>\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u4E24\u4E2A\u5206\u652F\u662F\u65E0\u6CD5\u5FEB\u901F\u5408\u5E76\u7684\uFF0C\u53EA\u80FD\u8BD5\u56FE\u628A\u5404\u81EA\u7684\u4FEE\u6539\u5408\u5E76\u8D77\u6765\uFF0C\u4F46\u8FD9\u79CD\u5408\u5E76\u5C31\u53EF\u80FD\u4F1A\u51FA\u73B0\u51B2\u7A81\u3002</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> merge feature
Auto-merging README.md
CONFLICT <span class="token punctuation">(</span>content<span class="token punctuation">)</span>: Merge conflict <span class="token keyword">in</span> README.md
Automatic merge failed<span class="token punctuation">;</span> fix conflicts and <span class="token keyword">then</span> commit the result.
</code></pre><p>\u8FD9\u4E2A\u65F6\u5019 Git \u5C31\u544A\u8BC9\u6211\u4EEC<code>README.md</code>\u6587\u4EF6\u51FA\u73B0\u4E86\u51B2\u7A81\uFF0C\u5FC5\u987B\u624B\u52A8\u89E3\u51B3\u51B2\u7A81\u540E\u518D\u63D0\u4EA4\u3002</p><p><code>git status</code>\u4E5F\u4F1A\u544A\u8BC9\u6211\u4EEC\u51B2\u7A81\u6587\u4EF6</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> status
On branch master
You have unmerged paths.
  <span class="token punctuation">(</span>fix conflicts and run <span class="token string">&quot;git commit&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git merge --abort&quot;</span> to abort the merge<span class="token punctuation">)</span>

Unmerged paths:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to mark resolution<span class="token punctuation">)</span>
        both modified:   README.md

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
</code></pre><p>\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u67E5\u770B<code>README.md</code>\u7684\u5185\u5BB9</p><pre class="language-shell"><code class="language-shell">This is a big project to learn <span class="token function">git</span>
I love <span class="token function">git</span>
\u8FD9\u662F\u4E00\u4E2A\u5B66\u4E60Git\u7684\u9879\u76EE
C<span class="token comment"># is a good programming language</span>
Java is also a good programming language
Create a new branch
<span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;</span> HEAD
Create a new feature branch is easy
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
Create a new feature branch
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> feature
</code></pre><p>Git \u7528<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>\uFF0C<code>=======</code>\uFF0C<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>\u6807\u8BB0\u51FA\u4E0D\u540C\u5206\u652F\u7684\u5185\u5BB9\uFF0C\u6211\u4EEC\u4FEE\u6539\u540E\u4FDD\u5B58\u518D\u6B21\u63D0\u4EA4</p><pre class="language-shell"><code class="language-shell">Create a new feature branch is simple
</code></pre><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> <span class="token function">add</span> README.md
$ <span class="token function">git</span> commit -m <span class="token string">&quot;is simple&quot;</span>
<span class="token punctuation">[</span>master 1ecaa98<span class="token punctuation">]</span> is simple
</code></pre><p>\u7136\u540E\u6211\u4EEC\u518D\u6B21\u67E5\u770B\u5206\u652F\u60C5\u51B5</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> log --decorate --graph --oneline --all
*   1ecaa98 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> is simple
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * e5c49d4 <span class="token punctuation">(</span>feature<span class="token punctuation">)</span> new feature branch
* <span class="token operator">|</span> f730807 is easy
<span class="token operator">|</span>/
* 571df6d new branch <span class="token builtin class-name">test</span>
* d78ec29 remove LICENSE
* 959d046 java is good
* 61c5ed5 C<span class="token comment"># is good</span>
* 310d469 <span class="token function">add</span> chinese translation
* 3e6ef04 <span class="token function">add</span> a LICENSE <span class="token function">file</span>
* 4572a22 <span class="token function">add</span> a newline
* 01c7561 change readme
* 45b6484 <span class="token function">add</span> a readme <span class="token function">file</span>
</code></pre><p>\u8FD9\u65F6\u5206\u652F\u5C31\u5408\u5E76\u6210\u529F\u4E86\uFF0C\u6700\u540E\u5220\u9664<code>feature</code>\u5206\u652F</p><pre class="language-shell"><code class="language-shell">$ <span class="token function">git</span> branch -d feature
Deleted branch feature <span class="token punctuation">(</span>was e5c49d4<span class="token punctuation">)</span>.
</code></pre><h3 id="%E5%88%86%E6%94%AF%E7%AE%A1%E7%90%86%E7%AD%96%E7%95%A5" tabindex="-1">\u5206\u652F\u7BA1\u7406\u7B56\u7565</h3><p>\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\uFF0C\u6211\u4EEC\u5E94\u8BE5\u6309\u7167\u51E0\u4E2A\u57FA\u672C\u539F\u5219\u6765\u8FDB\u884C\u5206\u652F\u7BA1\u7406\uFF1A</p><p>\u9996\u5148\uFF0C<code>master</code>\u5206\u652F\u5E94\u8BE5\u662F\u975E\u5E38\u7A33\u5B9A\u7684\uFF0C\u4EC5\u7528\u6765\u53D1\u5E03\u65B0\u7684\u7248\u672C\uFF0C\u5E73\u65F6\u4E0D\u80FD\u5728\u4E0A\u9762\u5E72\u6D3B\u3002<code>dev</code>\u5206\u652F(develop)\u662F\u6211\u4EEC\u5E73\u65F6\u5E72\u6D3B\u7684\u5730\u65B9\uFF0C\u5F00\u53D1\u5230\u4E00\u5B9A\u7A0B\u5EA6\u7684\u65F6\u5019\u628A<code>dev</code>\u5206\u652F\u5408\u5E76\u5230<code>master</code>\u5206\u652F\u4E0A\uFF0C\u518D<code>master</code>\u5206\u652F\u4E0A\u53D1\u5E03 1.0 \u7248\u672C\u3002\u4E00\u822C\u6765\u8BF4\u6211\u4EEC\u6BCF\u4E2A\u4EBA\u90FD\u6709\u81EA\u5DF1\u7684<code>dev</code>\u5206\u652F\uFF0C\u65F6\u4E0D\u65F6\u7684\u5F80\u4E91\u7AEF\u7684<code>dev</code>\u5206\u652F\u5408\u5E76\u5C31\u884C\u4E86\u3002</p><p><code>hotfix</code>\u901A\u5E38\u7528\u6765\u4FEE\u590D bug\uFF0C<code>release</code>\u5206\u652F\u901A\u5E38\u7528\u6765\u6D4B\u8BD5\u8981\u5408\u5E76\u5230<code>master</code>\u5206\u652F\u4E0A\u7684\u7248\u672C\uFF0C<code>feature</code>\u5206\u652F\u7528\u6765\u5F00\u53D1\u65B0\u529F\u80FD</p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/branch.png" alt="\u5206\u652F\u7BA1\u7406\u7B56\u7565"></p><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://www.liaoxuefeng.com/wiki/896043488029600">\u5ED6\u96EA\u5CF0 Git \u6559\u7A0B</a></li><li><a href="https://fishc.com.cn/forum-334-1.html">\u6781\u5BA2 Python \u4E4B Git \u5B9E\u7528\u6559\u7A0B</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/git-tutorial.md");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
var __glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$t,
  date: date$t,
  tags: tags$p,
  category: category$p,
  summary: summary$t,
  meta: meta$t,
  "default": _sfc_main$G
}, Symbol.toStringTag, { value: "Module" }));
const title$s = "\u642D\u5EFAhexo\u9759\u6001\u535A\u5BA2";
const date$s = "2019/08/31 09:13:23";
const tags$o = ["hexo"];
const category$o = "\u5DE5\u5177";
const summary$s = "\u4F7F\u7528hexo\u642D\u5EFA\u535A\u5BA2\uFF0C\u5E76\u5C06\u535A\u5BA2\u90E8\u7F72\u5230github";
const meta$s = [{ "property": "og:title", "content": "\u642D\u5EFAhexo\u9759\u6001\u535A\u5BA2" }];
const _sfc_main$F = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u642D\u5EFAhexo\u9759\u6001\u535A\u5BA2", "date": "2019/08/31 09:13:23", "tags": ["hexo"], "category": "\u5DE5\u5177", "summary": "\u4F7F\u7528hexo\u642D\u5EFA\u535A\u5BA2\uFF0C\u5E76\u5C06\u535A\u5BA2\u90E8\u7F72\u5230github", "meta": [{ "property": "og:title", "content": "\u642D\u5EFAhexo\u9759\u6001\u535A\u5BA2" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u642D\u5EFAhexo\u9759\u6001\u535A\u5BA2", "meta": [{ "property": "og:title", "content": "\u642D\u5EFAhexo\u9759\u6001\u535A\u5BA2" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u4F7F\u7528 hexo \u642D\u5EFA\u535A\u5BA2\uFF0C\u5E76\u5C06\u535A\u5BA2\u90E8\u7F72\u5230 github</p><h2 id="%E9%9C%80%E8%A6%81%E7%9A%84%E5%B7%A5%E5%85%B7" tabindex="-1">\u9700\u8981\u7684\u5DE5\u5177</h2><ul><li><a href="https://nodejs.org/zh-cn/">Node.js</a></li><li><a href="https://github.com/waylau/git-for-win">Git</a></li><li>\u4E00\u4E2A Github \u8D26\u53F7</li></ul><h2 id="%E6%AD%A3%E5%BC%8F%E5%BC%80%E5%A7%8B" tabindex="-1">\u6B63\u5F0F\u5F00\u59CB</h2><ol><li>\u5728\u4EFB\u610F\u76EE\u5F55\u4E0B\u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939\uFF0C\u5982 blog\uFF0C\u5728\u8BE5\u6587\u4EF6\u5939\u4E0B\u53F3\u952E\u6253\u5F00 git bash here\uFF0C\u6267\u884C<code>npm install -g hexo-cli</code>\uFF0C\u5B89\u88C5 hexo</li><li>\u6267\u884C<code>hexo init</code></li><li>\u6267\u884C<code>npm install</code></li><li>\u6839\u636E\u63D0\u793A\u4F9D\u6B21\u6267\u884C<code>npm audit fix</code>\u548C<code>npm audit fix --force</code></li><li>\u6267\u884C<code>hexo g</code>\uFF0C\u751F\u6210\u535A\u5BA2</li><li>\u6267\u884C<code>hexo s</code>\u540E\uFF0C\u53EF\u4EE5\u5728 <a href="http://localhost:4000">http://localhost:4000</a> \u4E0A\u9884\u89C8\u535A\u5BA2</li><li>\u5728 github \u4E0A\u65B0\u5EFA\u4E00\u4E2A\u4ED3\u5E93\uFF0C\u547D\u540D\u4E3A username.github.io\uFF0C\u5176\u4E2D username \u5FC5\u987B\u4E3A\u4F60 github \u7684\u7528\u6237\u540D</li><li>\u6267\u884C<code>npm install hexo-deployer-git --save</code>\uFF0C\u5B89\u88C5 deployer-git\uFF0C\u7528\u6765\u5C06 hexo \u63A8\u9001\u5230 github</li><li>\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6\uFF1A\u5728\u6587\u4EF6\u5939\u4E2D\u627E\u5230\u5E76\u6253\u5F00<code>_config.yml</code>\u6587\u4EF6\uFF0C\u5C06\u6587\u4EF6\u672B\u5C3E\u7684 deploy \u90E8\u5206\u66F4\u6539\u5982\u4E0B\uFF0Crepo: \u540E\u586B\u5199\u4F60\u65B0\u5EFA\u7684 github \u4ED3\u5E93\u7684\u5730\u5740\u3002<strong>\u6CE8\u610F: \u8BF7\u4F7F\u7528\u82F1\u6587\u5192\u53F7\u4EE5\u53CA\u5192\u53F7\u540E\u8981\u6709\u7A7A\u683C</strong></li></ol><pre class="language-yml"><code class="language-yml"><span class="token key atrule">deploy</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> git
  <span class="token key atrule">repo</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/qiyuor2/qiyuor2.github.io.git
  <span class="token key atrule">branch</span><span class="token punctuation">:</span> master
</code></pre><ol start="10"><li>\u5206\u522B\u6267\u884C<code>hexo clean</code>\uFF0C<code>hexo g</code>\uFF0C<code>hexo d</code>\uFF0C\u5373\u53EF\u5728 <a href="https://username.github.io">https://username.github.io</a> *(username \u4E3A\u4F60\u7684\u7528\u6237\u540D)*\u4E2D\u770B\u5230\u81EA\u5DF1\u7684\u535A\u5BA2</li></ol><h2 id="%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%9A%84%E6%96%87%E7%AB%A0" tabindex="-1">\u6DFB\u52A0\u65B0\u7684\u6587\u7AE0</h2><ol><li>\u6267\u884C<code>hexo new &quot;\u6587\u7AE0\u6807\u9898&quot;</code>\uFF0C\u4F1A\u5728<code>\\source\\_posts</code>\u4E0B\u751F\u6210\u4E00\u4E2A md \u6587\u4EF6\uFF0C\u5728\u8BE5\u6587\u4EF6\u4E2D\u7F16\u8F91\u6587\u7AE0\u5373\u53EF</li><li>\u5199\u5B8C\u6587\u7AE0\u540E\uFF0C\u5206\u522B\u6267\u884C<code>hexo g</code>\uFF0C<code>hexo d</code>\uFF0C\u5373\u53EF\u5C06\u6587\u7AE0\u53D1\u5E03\u6210\u529F\uFF0C\u5982\u679C\u7F51\u7AD9\u4E0A\u6CA1\u6709\u51FA\u73B0\u6587\u7AE0\u53EF\u4EE5\u7A0D\u7B49\u4E00\u4F1A\u513F\u518D\u5237\u65B0\u3002(<code>hexo clean</code>\u5728\u53D1\u5E03\u548C\u4FEE\u6539\u6587\u7AE0\u65F6\u53EF\u4EE5\u4E0D\u6267\u884C\uFF0C\u5728\u4FEE\u6539\u4E3B\u9898\u540E\u9700\u8981\u6267\u884C)</li></ol></div>`);
    };
  }
};
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/hexo-blog.md");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
var __glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$s,
  date: date$s,
  tags: tags$o,
  category: category$o,
  summary: summary$s,
  meta: meta$s,
  "default": _sfc_main$F
}, Symbol.toStringTag, { value: "Module" }));
const title$r = "JavaScript\u95ED\u5305";
const date$r = "2019/10/18 22:00:04";
const tags$n = ["JavaScript"];
const category$n = "\u6280\u672F";
const summary$r = "\u95ED\u5305\u662FJavaScript\u4E2D\u7684\u4E00\u4E2A\u96BE\u70B9\uFF0C\u540C\u65F6\u4E5F\u662F\u5B83\u7684\u7279\u8272\uFF0CJavaScript\u7684\u5F88\u591A\u9AD8\u7EA7\u5E94\u7528\u90FD\u8981\u4F9D\u9760\u95ED\u5305\u6765\u5B9E\u73B0\u3002\u4EE5\u4E0B\u662F\u6211\u5B66\u4E60\u95ED\u5305\u7684\u8BB0\u5F55\uFF0C\u5E0C\u671B\u5BF9\u4F60\u6709\u4E9B\u5E2E\u52A9\u3002";
const meta$r = [{ "property": "og:title", "content": "JavaScript\u95ED\u5305" }];
const _sfc_main$E = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "JavaScript\u95ED\u5305", "date": "2019/10/18 22:00:04", "tags": ["JavaScript"], "category": "\u6280\u672F", "summary": "\u95ED\u5305\u662FJavaScript\u4E2D\u7684\u4E00\u4E2A\u96BE\u70B9\uFF0C\u540C\u65F6\u4E5F\u662F\u5B83\u7684\u7279\u8272\uFF0CJavaScript\u7684\u5F88\u591A\u9AD8\u7EA7\u5E94\u7528\u90FD\u8981\u4F9D\u9760\u95ED\u5305\u6765\u5B9E\u73B0\u3002\u4EE5\u4E0B\u662F\u6211\u5B66\u4E60\u95ED\u5305\u7684\u8BB0\u5F55\uFF0C\u5E0C\u671B\u5BF9\u4F60\u6709\u4E9B\u5E2E\u52A9\u3002", "meta": [{ "property": "og:title", "content": "JavaScript\u95ED\u5305" }] };
    expose({ frontmatter });
    const head$1 = { "title": "JavaScript\u95ED\u5305", "meta": [{ "property": "og:title", "content": "JavaScript\u95ED\u5305" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u95ED\u5305\u662F JavaScript \u4E2D\u7684\u4E00\u4E2A\u96BE\u70B9\uFF0C\u540C\u65F6\u4E5F\u662F\u5B83\u7684\u7279\u8272\uFF0CJavaScript \u7684\u5F88\u591A\u9AD8\u7EA7\u5E94\u7528\u90FD\u8981\u4F9D\u9760\u95ED\u5305\u6765\u5B9E\u73B0\u3002\u4EE5\u4E0B\u662F\u6211\u5B66\u4E60\u95ED\u5305\u7684\u8BB0\u5F55\uFF0C\u5E0C\u671B\u5BF9\u4F60\u6709\u4E9B\u5E2E\u52A9\u3002</p><h2 id="%E5%8F%98%E9%87%8F%E4%BD%9C%E7%94%A8%E5%9F%9F" tabindex="-1">\u53D8\u91CF\u4F5C\u7528\u57DF</h2><p>\u5728\u5B66\u4E60\u95ED\u5305\u4E4B\u524D\uFF0C\u6211\u4EEC\u9996\u5148\u8981\u7406\u89E3 JavaScript \u4E0D\u540C\u4E0E\u5176\u4ED6\u8BED\u8A00\u72EC\u7279\u7684\u53D8\u91CF\u4F5C\u7528\u57DF\u3002\u5728 JavaScript \u4E2D\uFF0C\u4E0D\u5B58\u5728\u5C40\u90E8\u4F5C\u7528\u57DF\u7684\u6982\u5FF5\uFF0C\u4F46\u662F\u6709\u5168\u5C40\u4F5C\u7528\u57DF\u4EE5\u53CA\u51FD\u6570\u4F5C\u7528\u57DF\u3002\u5168\u5C40\u4F5C\u7528\u57DF\u4E0E\u5176\u4ED6\u8BED\u8A00\u7684\u76F8\u540C\uFF0C\u6CA1\u6709\u9700\u8981\u6CE8\u610F\u7684\u5730\u65B9\uFF0C\u800C\u51FD\u6570\u4F5C\u7528\u57DF\u662F\u6307\u51FD\u6570\u5185\u90E8\u58F0\u660E\u7684\u53D8\u91CF\u5728\u51FD\u6570\u5916\u90E8\u65E0\u6CD5\u76F4\u63A5\u8BBF\u95EE\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">99</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u4E0A\u9762\u7684\u4EE3\u7801\u4E2D\uFF0Cf1 \u53EF\u4EE5\u8BFB\u53D6\u5230\u5168\u5C40\u53D8\u91CF a\uFF0C\u800C\u4E0B\u9762\u7684\u4EE3\u7801\u4E2D a \u65E0\u6CD5\u88AB\u8BBF\u95EE\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">99</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="%E5%A6%82%E4%BD%95%E4%BB%8E%E5%A4%96%E9%83%A8%E8%AF%BB%E5%8F%96%E5%87%BD%E6%95%B0%E5%86%85%E9%83%A8%E5%A3%B0%E6%98%8E%E7%9A%84%E5%8F%98%E9%87%8F%EF%BC%9F" tabindex="-1">\u5982\u4F55\u4ECE\u5916\u90E8\u8BFB\u53D6\u51FD\u6570\u5185\u90E8\u58F0\u660E\u7684\u53D8\u91CF\uFF1F</h2><p>\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u53EF\u80FD\u9700\u8981\u5F97\u5230\u51FD\u6570\u5185\u90E8\u7684\u53D8\u91CF\uFF0C\u6B63\u5E38\u60C5\u51B5\u4E0B\u662F\u65E0\u6CD5\u505A\u5230\u7684\uFF0C\u56E0\u6B64\u9700\u8981\u7528\u7279\u6B8A\u7684\u529E\u6CD5\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">99</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u5728\u51FD\u6570 f1 \u4E2D\u5B9A\u4E49\u53E6\u4E00\u4E2A\u51FD\u6570 f2\uFF0C\u8FD9\u6837 f1 \u4E2D\u7684\u6240\u6709\u53D8\u91CF\u5BF9\u4E8E f2 \u6765\u8BF4\u5C31\u662F\u53EF\u89C1\u7684\uFF0C\u65E2\u7136 f2 \u53EF\u4EE5\u8BFB\u53D6\u5230 f1 \u4E2D\u7684\u53D8\u91CF\uFF0C\u90A3\u4E48\u6211\u4EEC\u53EA\u8981\u628A f2 \u4F5C\u4E3A f1 \u7684\u8FD4\u56DE\u503C\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5728 f1 \u7684\u5916\u90E8\u8BFB\u53D6\u5230\u5B83\u5185\u90E8\u7684\u53D8\u91CF\u4E86\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">99</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> f2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">result</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u6B64\u65F6\uFF0C\u5C31\u5F62\u6210\u4E86\u4E00\u4E2A\u7B80\u5355\u7684\u95ED\u5305\u3002\u56E0\u6B64\uFF0C\u95ED\u5305\u5C31\u53EF\u4EE5\u7B80\u5355\u7684\u7406\u89E3\u4E3A\u51FD\u6570\u4E2D\u7684\u51FD\u6570\uFF0C\u800C\u672C\u8D28\u4E0A\uFF0C\u95ED\u5305\u5C31\u662F\u4E00\u4E2A\u8FDE\u63A5\u51FD\u6570\u5185\u90E8\u548C\u5916\u90E8\u7684\u6865\u6881\u3002</p><h2 id="%E9%97%AD%E5%8C%85%E7%9A%84%E7%89%B9%E6%80%A7" tabindex="-1">\u95ED\u5305\u7684\u7279\u6027</h2><p>\u95ED\u5305\u4F1A\u4F7F\u5F97\u51FD\u6570\u4E2D\u7684\u53D8\u91CF\u90FD\u88AB\u4FDD\u5B58\u5230\u5185\u5B58\u4E2D\u3002\u9996\u5148\u6211\u4EEC\u5148\u770B\u4E00\u4E0B\u4EE5\u4E0B\u4E24\u4E2A\u4F8B\u5B50</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    count<span class="token operator">++</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token constant">B</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token constant">C</span> <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token constant">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token constant">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><p>count \u662F\u51FD\u6570 A \u4E2D\u7684\u4E00\u4E2A\u53D8\u91CF\uFF0C\u5B83\u7684\u503C\u5728\u51FD\u6570 B \u4E2D\u88AB\u6539\u53D8\uFF0C\u51FD\u6570 B \u6BCF\u6267\u884C\u4E00\u6B21\uFF0Ccount \u7684\u503C\u5C31\u5728\u539F\u6765\u7684\u57FA\u7840\u4E0A\u7D2F\u52A0 1\uFF0C\u56E0\u6B64\uFF0C\u51FD\u6570 A \u4E2D\u7684 count \u53D8\u91CF\u4F1A\u4E00\u76F4\u4FDD\u5B58\u5728\u5185\u5B58\u4E2D\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token constant">B</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token constant">C</span> <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">C</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//8</span>
</code></pre><p>\u5F53 3 \u4F20\u5165 A \u51FD\u6570\u540E\uFF0CB \u51FD\u6570\u5C31\u4F1A\u8BB0\u4F4F\u8FD9\u4E2A\u503C\uFF0C\u6240\u4EE5\u5728\u540E\u9762\u4F20\u5165 5 \u7684\u65F6\u5019\u53EA\u4F1A\u5BF9 B \u51FD\u6570\u4E2D\u7684 y \u8D4B\u503C\uFF0C\u6240\u4EE5\u6700\u540E\u4F1A\u8F93\u51FA 8\u3002</p><h2 id="%E4%BD%BF%E7%94%A8%E9%97%AD%E5%8C%85%E7%9A%84%E6%B3%A8%E6%84%8F%E7%82%B9" tabindex="-1">\u4F7F\u7528\u95ED\u5305\u7684\u6CE8\u610F\u70B9</h2><p>\u7531\u4E8E\u4E0A\u8FF0\u95ED\u5305\u7684\u7279\u6027\uFF0C\u6BCF\u6B21\u4F7F\u7528\u95ED\u5305\u90FD\u4F1A\u5927\u91CF\u589E\u52A0\u5185\u5B58\u7684\u6D88\u8017\uFF0C\u6240\u4EE5\u4E0D\u80FD\u6EE5\u7528\u95ED\u5305\uFF0C\u5426\u5219\u4F1A\u5F71\u54CD\u7F51\u9875\u7684\u6027\u80FD\u3002\u6211\u4EEC\u4E5F\u53EF\u4EE5\u5728\u51FD\u6570\u9000\u51FA\u524D\uFF0C\u4F7F\u51FD\u6570\u5185\u53D8\u91CF\u6307\u5411 null \u6765\u624B\u52A8\u5220\u9664\u53D8\u91CF\u3002\u6211\u4EEC\u53EF\u4EE5\u6765\u770B\u4E0B\u4E00\u9053\u7ECF\u5178\u7684\u9762\u8BD5\u9898\u6765\u7406\u89E3\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">//\u5185\u90E8\u53D8\u91CF</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//\u901A\u8FC7return\u8FD4\u56DEadd\u51FD\u6570\uFF0C\u5C31\u53EF\u4EE5\u5728outer\u51FD\u6570\u5916\u8BBF\u95EE\u4E86</span>
    num<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">//\u5185\u90E8\u51FD\u6570\u6709\u5F15\u7528\uFF0C\u4F5C\u4E3Aadd\u51FD\u6570\u7684\u4E00\u90E8\u5206\u4E86</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> func1 <span class="token operator">=</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u5B9E\u9645\u4E0A\u662F\u8C03\u7528add\u51FD\u6570\uFF0C \u8F93\u51FA1</span>
<span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u8F93\u51FA2 \u56E0\u4E3Aouter\u51FD\u6570\u5185\u90E8\u7684\u79C1\u6709\u4F5C\u7528\u57DF\u4F1A\u4E00\u76F4\u88AB\u5360\u7528</span>
<span class="token keyword">var</span> func2 <span class="token operator">=</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8F93\u51FA1  \u6BCF\u6B21\u91CD\u65B0\u5F15\u7528\u51FD\u6570\u7684\u65F6\u5019\uFF0C\u95ED\u5305\u662F\u5168\u65B0\u7684\u3002</span>
<span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8F93\u51FA2</span>
</code></pre><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://github.com/ljianshu/Blog/issues/6">\u6DF1\u5165\u6D45\u51FA Javascript \u95ED\u5305</a></li><li><a href="https://www.cnblogs.com/onepixel/p/5062456.html">\u8BA9\u4F60\u5206\u5206\u949F\u7406\u89E3 JavaScript \u95ED\u5305</a></li><li><a href="http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html">\u5B66\u4E60 Javascript \u95ED\u5305\uFF08Closure\uFF09</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/js-closure.md");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
var __glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$r,
  date: date$r,
  tags: tags$n,
  category: category$n,
  summary: summary$r,
  meta: meta$r,
  "default": _sfc_main$E
}, Symbol.toStringTag, { value: "Module" }));
const title$q = "\u5229\u7528JavaScript\u5B9E\u73B0\u5012\u8BA1\u65F6";
const date$q = "2019/08/17 19:59:18";
const tags$m = ["JavaScript"];
const category$m = "\u6280\u672F";
const summary$q = "\u5229\u7528 JS \u4E2D\u7684 Date \u5BF9\u8C61\u5373\u53EF\u5B9E\u73B0\uFF0C\u521B\u5EFA\u76EE\u6807\u65F6\u95F4\u548C\u5F53\u524D\u65F6\u95F4\uFF0C\u5229\u7528 getTime \u51FD\u6570\u5C06\u4E24\u4E2A\u65F6\u95F4\u8F6C\u6362\u6210\u8DDD\u79BB 1970-01-01 \u7684\u79D2\u6570\uFF0C\u76F8\u51CF\u540E\u8F6C\u5316\u4E3A\u5E74\u6708\u65E5\u5373\u53EF";
const meta$q = [{ "property": "og:title", "content": "\u5229\u7528JavaScript\u5B9E\u73B0\u5012\u8BA1\u65F6" }];
const _sfc_main$D = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u5229\u7528JavaScript\u5B9E\u73B0\u5012\u8BA1\u65F6", "date": "2019/08/17 19:59:18", "tags": ["JavaScript"], "category": "\u6280\u672F", "summary": "\u5229\u7528 JS \u4E2D\u7684 Date \u5BF9\u8C61\u5373\u53EF\u5B9E\u73B0\uFF0C\u521B\u5EFA\u76EE\u6807\u65F6\u95F4\u548C\u5F53\u524D\u65F6\u95F4\uFF0C\u5229\u7528 getTime \u51FD\u6570\u5C06\u4E24\u4E2A\u65F6\u95F4\u8F6C\u6362\u6210\u8DDD\u79BB 1970-01-01 \u7684\u79D2\u6570\uFF0C\u76F8\u51CF\u540E\u8F6C\u5316\u4E3A\u5E74\u6708\u65E5\u5373\u53EF", "meta": [{ "property": "og:title", "content": "\u5229\u7528JavaScript\u5B9E\u73B0\u5012\u8BA1\u65F6" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u5229\u7528JavaScript\u5B9E\u73B0\u5012\u8BA1\u65F6", "meta": [{ "property": "og:title", "content": "\u5229\u7528JavaScript\u5B9E\u73B0\u5012\u8BA1\u65F6" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><blockquote><p>\u5229\u7528 JS \u4E2D\u7684 Date \u5BF9\u8C61\u5373\u53EF\u5B9E\u73B0</p></blockquote><h3 id="js-%E4%BB%A3%E7%A0%81" tabindex="-1">js \u4EE3\u7801</h3><pre class="language-js"><code class="language-js"><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> nowTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u83B7\u53D6\u5F53\u524D\u65F6\u95F4</span>
            <span class="token comment">//\u521B\u5EFA\u65E5\u671F\u5BF9\u8C61</span>
            <span class="token keyword">var</span> endTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">&quot;2019-9-1 00:00:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> seconds <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token punctuation">(</span>endTime<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> nowTime<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u4E24\u4E2A\u65F6\u95F4\u70B9\u7684\u65F6\u95F4\u5DEE(\u79D2)</span>
            <span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>seconds <span class="token operator">/</span> <span class="token number">3600</span> <span class="token operator">/</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u5F97\u5230\u5929\u6570</span>
            <span class="token keyword">var</span> h <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>seconds <span class="token operator">/</span> <span class="token number">3600</span> <span class="token operator">%</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u5C0F\u65F6</span>
            <span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>seconds <span class="token operator">/</span> <span class="token number">60</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u5206\u949F</span>
            <span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>seconds <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u79D2</span>
            document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;djs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&quot;\u8DDD\u79BB\u5F00\u5B66\u8FD8\u6709&quot;</span> <span class="token operator">+</span> d <span class="token operator">+</span><span class="token string">&quot;\u5929&quot;</span> <span class="token operator">+</span> h <span class="token operator">+</span> <span class="token string">&quot;\u5C0F\u65F6&quot;</span> <span class="token operator">+</span> m <span class="token operator">+</span> <span class="token string">&quot;\u5206\u949F&quot;</span> <span class="token operator">+</span> s <span class="token operator">+</span> <span class="token string">&quot;\u79D2&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><h3 id="html-%E5%8F%8A%E6%A0%B7%E5%BC%8F" tabindex="-1">HTML \u53CA\u6837\u5F0F</h3><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
      <span class="token selector">p</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 20% auto<span class="token punctuation">;</span>
        <span class="token property">line-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>djs<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/js-count-down.md");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
var __glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$q,
  date: date$q,
  tags: tags$m,
  category: category$m,
  summary: summary$q,
  meta: meta$q,
  "default": _sfc_main$D
}, Symbol.toStringTag, { value: "Module" }));
const title$p = "JS\u5B9E\u73B0\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE";
const date$p = "2019/08/31 12:48:44";
const tags$l = ["JavaScript"];
const category$l = "\u6280\u672F";
const summary$p = "\u5C1D\u8BD5\u6A21\u4EFF\u4EAC\u4E1C\u7684\u201C\u53D1\u73B0\u597D\u8D27\u201D\u6A21\u5757\u7684\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE";
const meta$p = [{ "property": "og:title", "content": "JS\u5B9E\u73B0\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE" }];
const _sfc_main$C = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "JS\u5B9E\u73B0\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE", "date": "2019/08/31 12:48:44", "tags": ["JavaScript"], "category": "\u6280\u672F", "summary": "\u5C1D\u8BD5\u6A21\u4EFF\u4EAC\u4E1C\u7684\u201C\u53D1\u73B0\u597D\u8D27\u201D\u6A21\u5757\u7684\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE", "meta": [{ "property": "og:title", "content": "JS\u5B9E\u73B0\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE" }] };
    expose({ frontmatter });
    const head$1 = { "title": "JS\u5B9E\u73B0\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE", "meta": [{ "property": "og:title", "content": "JS\u5B9E\u73B0\u53EF\u7528\u6ED1\u5757\u6ED1\u52A8\u7684\u7F13\u52A8\u56FE" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><h2 id="js-%E4%BB%A3%E7%A0%81" tabindex="-1">JS \u4EE3\u7801</h2><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token comment">//\u7F13\u52A8\u8F6E\u64AD\u56FE</span>
<span class="token keyword">var</span> fhTimer<span class="token punctuation">;</span>
<span class="token keyword">var</span> fhNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> barNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
fhTimer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span>marquee<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">marquee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fhNum<span class="token operator">--</span><span class="token punctuation">;</span>
    barNum <span class="token operator">=</span> fhNum<span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>fhNum <span class="token operator">&lt;</span> <span class="token operator">-</span><span class="token number">2400</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fhNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_ul&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> fhNum <span class="token operator">+</span> <span class="token string">&quot;px&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>fhNum <span class="token operator">&lt;</span> <span class="token operator">-</span><span class="token number">2400</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        barNum <span class="token operator">=</span> fhNum <span class="token operator">+</span> <span class="token number">2400</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_dBar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token operator">-</span><span class="token punctuation">(</span>barNum <span class="token operator">/</span> <span class="token number">2.75</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;px&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhcShow&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onmouseover</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_d_box&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">&quot;block&quot;</span><span class="token punctuation">;</span>
    <span class="token function">clearInterval</span><span class="token punctuation">(</span>fhTimer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_d_box&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onmouseover</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_d_box&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">&quot;block&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhcShow&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onmouseout</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_d_box&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">;</span>
    fhTimer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span>marquee<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//\u9F20\u6807\u60AC\u6D6E\u5728\u6807\u9898\u4E5F\u5728\u6682\u505C\u6EDA\u52A8</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhTit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onmouseover</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">clearInterval</span><span class="token punctuation">(</span>fhTimer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhTit&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onmouseout</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fhTimer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span>marquee<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//\u6ED1\u5757</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_dBar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onmousedown</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> event <span class="token operator">=</span> event <span class="token operator">||</span> window<span class="token punctuation">.</span>event<span class="token punctuation">;</span>
    <span class="token keyword">var</span> leftValue <span class="token operator">=</span> event<span class="token punctuation">.</span>clientX <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>offsetLeft<span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function-variable function">onmousemove</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> evt <span class="token operator">=</span> event <span class="token operator">||</span> window<span class="token punctuation">.</span>event<span class="token punctuation">;</span>
        <span class="token keyword">var</span> locationX <span class="token operator">=</span> evt<span class="token punctuation">.</span>clientX <span class="token operator">-</span> leftValue<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>locationX <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            locationX <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>locationX <span class="token operator">&gt;</span> <span class="token number">960</span> <span class="token operator">-</span> <span class="token number">99</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            locationX <span class="token operator">=</span> <span class="token number">960</span> <span class="token operator">-</span> <span class="token number">99</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;fhc_dBar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> locationX <span class="token operator">+</span> <span class="token string">&quot;px&quot;</span><span class="token punctuation">;</span>
        fhNum <span class="token operator">=</span> <span class="token operator">-</span>locationX <span class="token operator">*</span> <span class="token number">2.75</span><span class="token punctuation">;</span>
        <span class="token comment">//\u5982\u679C\u9009\u4E2D\u4E86\uFF0C\u5C31\u53D6\u6D88\u9009\u4E2D\uFF0C\u9632\u6B62\u51FA\u73B0bug</span>
        window<span class="token punctuation">.</span>getSelection <span class="token operator">?</span> window<span class="token punctuation">.</span><span class="token function">getSelection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">removeAllRanges</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> document<span class="token punctuation">.</span>selection<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    document<span class="token punctuation">.</span><span class="token function-variable function">onmouseup</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span>onmousemove <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">//\u53D6\u6D88\u6CE8\u518C\u7684\u8FD9\u4E2A\u4E8B\u4EF6</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="html-%E4%BB%A3%E7%A0%81" tabindex="-1">HTML \u4EE3\u7801</h2><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fxhh_ctt<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fh_c_show<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fhcShow<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fh_c_under<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fhc_ul<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C11<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C16<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C17<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C18<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C19<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C110<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C111<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C112<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C11<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>botTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> <span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>topTit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5546\u54C15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- \u6ED1\u5757 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fhc_box<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fhc_d_box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fhc_drop<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fhc_dBar<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- \u6ED1\u5757end --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><h2 id="css-%E4%BB%A3%E7%A0%81" tabindex="-1">CSS \u4EE3\u7801</h2><pre class="language-css"><code class="language-css"><span class="token selector">.fxhh .fxhh_ctt</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 990px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fh_c_show .fh_c_under img</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fh_c_show</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 990px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 260px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fh_c_show .fh_c_under</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 2000%<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fh_c_show .fh_c_under li</span> <span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 180px<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
    <span class="token property">margin-right</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fh_c_show .fh_c_under li .topTit</span> <span class="token punctuation">{</span>
    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fh_c_show .fh_c_under li .botTit</span> <span class="token punctuation">{</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fhc_box</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 960px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f3f3f3<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 250px<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 210px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.fxhh .fxhh_ctt .fhc_drop</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 99px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 9px<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #d8d8d8<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> -3px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/js-move-pic-by-slider.md");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
var __glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$p,
  date: date$p,
  tags: tags$l,
  category: category$l,
  summary: summary$p,
  meta: meta$p,
  "default": _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const title$o = "T-SQL\u5B66\u4E60\u7B14\u8BB0";
const date$o = "2019/09/09 20:47:19";
const tags$k = ["T-SQL", "SQL Server"];
const category$k = "\u6280\u672F";
const summary$o = "\u5B66\u4E60T-SQL\u65F6\u8BB0\u5F55\u7684\u7B14\u8BB0\uFF0C\u8BB0\u5F97\u5E76\u4E0D\u5168\u4E5F\u4E0D\u8BE6\u7EC6";
const meta$o = [{ "property": "og:title", "content": "T-SQL\u5B66\u4E60\u7B14\u8BB0" }];
const _sfc_main$B = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "T-SQL\u5B66\u4E60\u7B14\u8BB0", "date": "2019/09/09 20:47:19", "tags": ["T-SQL", "SQL Server"], "category": "\u6280\u672F", "summary": "\u5B66\u4E60T-SQL\u65F6\u8BB0\u5F55\u7684\u7B14\u8BB0\uFF0C\u8BB0\u5F97\u5E76\u4E0D\u5168\u4E5F\u4E0D\u8BE6\u7EC6", "meta": [{ "property": "og:title", "content": "T-SQL\u5B66\u4E60\u7B14\u8BB0" }] };
    expose({ frontmatter });
    const head$1 = { "title": "T-SQL\u5B66\u4E60\u7B14\u8BB0", "meta": [{ "property": "og:title", "content": "T-SQL\u5B66\u4E60\u7B14\u8BB0" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u5B66\u4E60 T-SQL \u65F6\u8BB0\u5F55\u7684\u7B14\u8BB0\uFF0C\u8BB0\u5F97\u5E76\u4E0D\u5168\u4E5F\u4E0D\u8BE6\u7EC6</p><h2 id="if-%E5%92%8C-while-%E8%AF%AD%E5%8F%A5" tabindex="-1">if \u548C while \u8BED\u53E5</h2><pre class="language-sql"><code class="language-sql"><span class="token keyword">declare</span> <span class="token variable">@age</span> <span class="token keyword">int</span>
<span class="token keyword">select</span> <span class="token variable">@age</span> <span class="token operator">=</span> DATEDIFF<span class="token punctuation">(</span><span class="token keyword">year</span><span class="token punctuation">,</span>stuAge<span class="token punctuation">,</span>getdate<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">from</span> TbStudent <span class="token keyword">where</span> stuName <span class="token operator">=</span> <span class="token string">&#39;\u5B59\u609F\u7A7A&#39;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">@age</span><span class="token operator">&gt;=</span><span class="token number">18</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span> <span class="token comment">--\u5FC5\u987B\u6709begin..end</span>
	<span class="token keyword">print</span> N<span class="token string">&#39;\u5DF2\u6210\u5E74&#39;</span>
<span class="token keyword">end</span>
<span class="token keyword">else</span>
<span class="token keyword">begin</span>
	<span class="token keyword">print</span> N<span class="token string">&#39;\u672A\u6210\u5E74&#39;</span>
<span class="token keyword">end</span>
</code></pre><pre class="language-sql"><code class="language-sql"><span class="token keyword">declare</span> <span class="token variable">@sum</span> <span class="token keyword">int</span>
<span class="token keyword">set</span> <span class="token variable">@sum</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">declare</span> <span class="token variable">@i</span> <span class="token keyword">int</span>
<span class="token keyword">set</span> <span class="token variable">@i</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token variable">@i</span> <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">@i</span> <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">&lt;&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">begin</span>
		<span class="token keyword">set</span> <span class="token variable">@sum</span> <span class="token operator">=</span> <span class="token variable">@sum</span> <span class="token operator">+</span> <span class="token variable">@i</span>
	<span class="token keyword">end</span>
	<span class="token keyword">set</span> <span class="token variable">@i</span> <span class="token operator">=</span> <span class="token variable">@i</span> <span class="token operator">+</span> <span class="token number">1</span>
<span class="token keyword">end</span>
<span class="token keyword">print</span> <span class="token variable">@sum</span>
</code></pre><h2 id="%E8%87%AA%E5%AE%9A%E4%B9%89%E5%87%BD%E6%95%B0" tabindex="-1">\u81EA\u5B9A\u4E49\u51FD\u6570</h2><p>\u5206\u4E3A\u6807\u91CF\u51FD\u6570\u3001\u8868\u503C\u51FD\u6570\uFF08\u5185\u8054\u8868\u503C\u51FD\u6570\u548C\u591A\u8BED\u53E5\u8868\u503C\u51FD\u6570\uFF09</p><h3 id="%E6%A0%87%E9%87%8F%E5%87%BD%E6%95%B0%EF%BC%9A%E5%8F%AA%E8%BF%94%E5%9B%9E%E4%B8%80%E4%B8%AA%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E7%9A%84%E5%80%BC" tabindex="-1">\u6807\u91CF\u51FD\u6570\uFF1A\u53EA\u8FD4\u56DE\u4E00\u4E2A\u57FA\u7840\u7C7B\u578B\u6570\u636E\u7684\u503C</h3><pre class="language-sql"><code class="language-sql"><span class="token comment">-- \u8BED\u6CD5</span>
<span class="token keyword">create</span> <span class="token keyword">function</span> \u51FD\u6570\u540D
<span class="token punctuation">(</span><span class="token punctuation">[</span>\u53C2\u6570\u5217\u8868<span class="token punctuation">]</span><span class="token punctuation">)</span>  \u53EF\u4EE5\u4E0D\u5199\u53C2\u6570<span class="token punctuation">,</span>\u5148\u5199\u53D8\u91CF\u540D\u518D\u5199\u7C7B\u578B
<span class="token keyword">returns</span> \u8FD4\u56DE\u503C\u7C7B\u578B
<span class="token keyword">as</span>
<span class="token keyword">begin</span>
<span class="token comment">--	\xB7\xB7\xB7\xB7\xB7\xB7\u51FD\u6570\u4F53\u8BED\u53E5</span>
	<span class="token keyword">return</span> \u8FD4\u56DE\u503C
<span class="token keyword">end</span>
</code></pre><h3 id="%E8%A1%A8%E5%80%BC%E5%87%BD%E6%95%B0%EF%BC%9A%E8%BF%94%E5%9B%9E%E4%B8%80%E4%B8%AA-table-%E7%B1%BB%E5%9E%8B%E7%9A%84%E7%BB%93%E6%9E%9C%E9%9B%86" tabindex="-1">\u8868\u503C\u51FD\u6570\uFF1A\u8FD4\u56DE\u4E00\u4E2A table \u7C7B\u578B\u7684\u7ED3\u679C\u96C6</h3><h4 id="%E5%86%85%E8%81%94%E8%A1%A8%E5%80%BC%E5%87%BD%E6%95%B0" tabindex="-1">\u5185\u8054\u8868\u503C\u51FD\u6570</h4><pre class="language-sql"><code class="language-sql"><span class="token comment">-- \u8BED\u6CD5</span>
<span class="token keyword">create</span> <span class="token keyword">function</span> \u51FD\u6570\u540D
<span class="token punctuation">(</span><span class="token punctuation">[</span>\u53C2\u6570\u540D<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">returns</span> <span class="token keyword">table</span>
<span class="token keyword">as</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>\u4E00\u6761<span class="token keyword">select</span>\u8BED\u53E5<span class="token punctuation">)</span>
</code></pre><h4 id="%E5%A4%9A%E8%AF%AD%E5%8F%A5%E8%A1%A8%E5%80%BC%E5%87%BD%E6%95%B0" tabindex="-1">\u591A\u8BED\u53E5\u8868\u503C\u51FD\u6570</h4><p>\u591A\u8BED\u53E5\u8868\u503C\u51FD\u6570\u53EF\u4EE5\u770B\u4F5C\u662F\u6807\u91CF\u51FD\u6570\u548C\u5185\u8054\u8868\u503C\u51FD\u6570\u7684\u7ED3\u5408\u4F53</p><pre class="language-sql"><code class="language-sql"><span class="token comment">-- \u8BED\u6CD5</span>
<span class="token keyword">create</span> <span class="token keyword">function</span> \u51FD\u6570\u540D<span class="token punctuation">(</span><span class="token punctuation">[</span>\u53C2\u6570\u5217\u8868<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">returns</span> \u8868\u53D8\u91CF\u540D <span class="token keyword">table</span>
<span class="token punctuation">(</span>\u8868\u53D8\u91CF\u7684\u5B57\u6BB5\u5B9A\u4E49<span class="token punctuation">)</span>
<span class="token keyword">as</span>
<span class="token keyword">begin</span>
	<span class="token keyword">SQL</span>
	<span class="token keyword">return</span> \u8FD9\u91CC\u5565\u90FD\u4E0D\u5199
<span class="token keyword">end</span>
</code></pre><h3 id="%E6%B3%A8%E6%84%8F" tabindex="-1">\u6CE8\u610F</h3><ul><li>SQL \u81EA\u5B9A\u4E49\u51FD\u6570\u5FC5\u987B\u6709\u8FD4\u56DE\u503C</li><li>\u5728\u81EA\u5B9A\u4E49\u51FD\u6570\u4E2D\u4E0D\u5141\u8BB8\u4FEE\u6539\u57FA\u8868\u5185\u5BB9\uFF08\u5373\uFF0C\u4E0D\u80FD\u7528 insert,update,delete\uFF09</li><li>\u5982\u679C\u6709\u591A\u4E2A\u53C2\u6570\uFF0C\u6BCF\u4E2A\u53C2\u6570\u4E00\u4E4B\u95F4\u7528\u9017\u53F7\u9694\u5F00</li><li>\u8C03\u7528\u51FD\u6570\u65F6\uFF0C\u51FD\u6570\u540D\u524D\u8981\u52A0 dbo.</li></ul><h2 id="%E5%AD%98%E5%82%A8%E8%BF%87%E7%A8%8B" tabindex="-1">\u5B58\u50A8\u8FC7\u7A0B</h2><p>\u5B58\u50A8\u8FC7\u7A0B\u65F6\u5B58\u50A8\u5728\u670D\u52A1\u5668\u4E0A\u7684\u4E00\u7EC4 T-SQL \u8BED\u53E5\u7684\u96C6\u5408\uFF0C\u7528\u6765\u5B8C\u6210\u4E00\u4E2A\u7279\u5B9A\u529F\u80FD\u3002 \u5206\u4E3A\u7CFB\u7EDF\u5B58\u50A8\u8FC7\u7A0B(\u7CFB\u7EDF\u81EA\u5E26)\u548C\u81EA\u5B9A\u4E49\u5B58\u50A8\u8FC7\u7A0B</p><h3 id="%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AD%98%E5%82%A8%E8%BF%87%E7%A8%8B" tabindex="-1">\u81EA\u5B9A\u4E49\u5B58\u50A8\u8FC7\u7A0B</h3><pre class="language-sql"><code class="language-sql"><span class="token comment">-- \u8BED\u6CD5</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span><span class="token punctuation">(</span>\u6216<span class="token keyword">proc</span><span class="token punctuation">)</span> \u5B58\u50A8\u8FC7\u7A0B\u540D<span class="token punctuation">(</span>up_<span class="token punctuation">)</span>
<span class="token punctuation">[</span>\u53C2\u6570\u5217\u8868<span class="token punctuation">]</span> <span class="token comment">--\u8FD9\u91CC\u7684\u53C2\u6570\u5217\u8868\u4E0D\u80FD\u4F7F\u7528\u5706\u62EC\u53F7</span>
<span class="token keyword">begin</span>
	\u5B58\u50A8\u8FC7\u7A0B\u4EE3\u7801
<span class="token keyword">end</span>
</code></pre><h3 id="%E6%B3%A8%E6%84%8F%3A" tabindex="-1">\u6CE8\u610F:</h3><ul><li>\u5B58\u50A8\u8FC7\u7A0B\u53EF\u4EE5\u6CA1\u6709\u8FD4\u56DE\u503C</li><li>\u5B58\u50A8\u8FC7\u7A0B\u4E0D\u9002\u7528 return \u8BED\u53E5\u5E26\u56DE\u8FD4\u56DE\u503C\uFF0C\u5982\u679C\u6709\u8FD4\u56DE\u503C\uFF0C\u76F4\u63A5\u4F7F\u7528 select \u8BED\u53E5\u8FD4\u56DE</li></ul><h2 id="%E7%B4%A2%E5%BC%95" tabindex="-1">\u7D22\u5F15</h2><ul><li>\u7D22\u5F15\uFF1A\u521B\u5EFA\u5728\u8868\u4E0A</li><li>\u4F5C\u7528: \u52A0\u5FEB\u68C0\u7D22\u901F\u5EA6</li><li>\u5168\u8868\u626B\u9762</li><li>\u7D22\u5F15\u5206\u4E3A\u805A\u96C6\u7D22\u5F15\u548C\u975E\u805A\u96C6\u7D22\u5F15</li><li>\u805A\u96C6\u7D22\u5F15: \u5728\u4E00\u4E2A\u6570\u636E\u8868\u4E2D\uFF0C\u53EA\u80FD\u521B\u5EFA\u4E00\u4E2A\u805A\u96C6\u7D22\u5F15</li><li>\u4E3B\u952E\u4F1A\u9ED8\u8BA4\u521B\u5EFA\u4E00\u4E2A\u805A\u96C6\u7D22\u5F15</li><li>\u5728\u4F60\u7ECF\u5E38\u4F7F\u7528 where \u7684\u5B57\u6BB5\u4E0A\u6DFB\u52A0\u975E\u805A\u96C6\u7D22\u5F15</li><li>\u7F3A\u70B9\uFF1A\u5360\u7528\u989D\u5916\u7684\u5B58\u50A8\u7A7A\u95F4\uFF0C\u6709\u53EF\u80FD\u964D\u4F4E insert\u3001update\u3001delete \u7684\u901F\u5EA6</li></ul><h2 id="%E4%BA%8B%E5%8A%A1" tabindex="-1">\u4E8B\u52A1</h2><p>\u4E8B\u52A1\u65F6\u5E76\u53D1\u63A7\u5236\u7684\u5355\u4F4D\uFF0C\u4ED6\u662F\u7528\u6237\u5B9A\u4E49\u7684\u4E00\u4E2A\u64CD\u4F5C\uFF0C\u8FD9\u4E9B\u64CD\u4F5C\u8981\u4E48\u90FD\u505A\u8981\u4E48\u90FD\u4E0D\u505A\uFF0C\u4E0D\u53EF\u5206\u5272\u3002 \u5206\u4E3A\uFF1ASQL Server \u4E8B\u52A1\u548C ADO.NET \u4E8B\u52A1</p><pre class="language-sql"><code class="language-sql"><span class="token comment">-- \u8BED\u6CD5</span>
<span class="token keyword">begin</span> <span class="token keyword">tran</span>  <span class="token comment">--\u5F00\u59CB\u4E00\u4E2A\u4E8B\u52A1\u64CD\u4F5C</span>
<span class="token keyword">commit</span> <span class="token keyword">tran</span> <span class="token comment">--\u63D0\u4EA4</span>
<span class="token keyword">rollback</span>    <span class="token comment">--\u56DE\u6EDA</span>
</code></pre><p>C#\u4E2D\u4F7F\u7528\u65F6\uFF0C\u901A\u5E38\u628A\u4E8B\u52A1\u7684\u64CD\u4F5C\u5C01\u88C5\u5230\u5B58\u50A8\u8FC7\u7A0B\u4E2D</p><h2 id="%E8%A7%A6%E5%8F%91%E5%99%A8" tabindex="-1">\u89E6\u53D1\u5668</h2><ul><li>\u89E6\u53D1\u5668\u662F\u4E00\u79CD\u7279\u6B8A\u7684\u5B58\u50A8\u8FC7\u7A0B</li><li>\u53EA\u4E0D\u8FC7\u8FD9\u4E2A\u5B58\u50A8\u8FC7\u7A0B\u662F\u4E0D\u5141\u8BB8\u663E\u793A\u8C03\u7528\u7684</li><li>\u4ED6\u53EA\u80FD\u5728\u505A\u4E86\u7279\u5B9A\u4E8B\u4EF6\u540E\uFF0C\u81EA\u52A8\u89E6\u53D1\u505A\u51FA\u54CD\u5E94\u7684</li><li>\u4E24\u5F20\u4E34\u65F6\u6570\u636E\u8868\uFF1Ainserted\u3001deleted</li><li>\u53EA\u80FD\u5728\u89E6\u53D1\u5668\u4E2D\u8BBF\u95EE</li><li>\u89E6\u53D1\u5668\u662F\u9644\u7740\u5728\u4E00\u5F20\u8868\u4E0A\u7684</li></ul><pre class="language-sql"><code class="language-sql"><span class="token comment">-- \u8BED\u6CD5</span>
<span class="token keyword">create</span> <span class="token keyword">trigger</span> \u89E6\u53D1\u5668\u540D\u5B57
<span class="token keyword">on</span> \u8868\u540D
<span class="token keyword">after</span><span class="token punctuation">(</span>\u6216<span class="token keyword">for</span><span class="token punctuation">)</span> \u4E4B\u540E\u89E6\u53D1 <span class="token operator">/</span> instead <span class="token keyword">of</span> \u4E4B\u524D\u89E6\u53D1 <span class="token punctuation">[</span><span class="token keyword">insert</span><span class="token operator">/</span><span class="token keyword">delete</span><span class="token operator">/</span><span class="token keyword">update</span><span class="token punctuation">]</span>
<span class="token keyword">as</span>
<span class="token keyword">begin</span>
<span class="token comment">-- \xB7\xB7\xB7\xB7\xB7\xB7</span>
<span class="token keyword">end</span>
</code></pre><p>\u89E6\u53D1\u5668\u7684\u89E6\u53D1\u6761\u4EF6\uFF1Ainsert\uFF0Cdelete\uFF0Cupdate</p><pre class="language-sql"><code class="language-sql"><span class="token keyword">create</span> <span class="token keyword">trigger</span> tr_Bank_insert
<span class="token keyword">on</span> Bank
<span class="token keyword">after</span> <span class="token keyword">insert</span>
<span class="token keyword">as</span>
<span class="token keyword">begin</span>
	<span class="token keyword">print</span> <span class="token string">&#39;\u5F80Bank\u8868\u4E2D\u63D2\u5165\u4E86\u8BB0\u5F55&#39;</span>
<span class="token keyword">end</span>

<span class="token keyword">create</span> <span class="token keyword">trigger</span> tr_Bank_Delete
<span class="token keyword">on</span> Bank
<span class="token keyword">after</span> <span class="token keyword">delete</span>
<span class="token keyword">as</span>
<span class="token keyword">begin</span>
	<span class="token keyword">declare</span> <span class="token variable">@id</span> <span class="token keyword">int</span>
	<span class="token keyword">declare</span> <span class="token variable">@userName</span> nvarchar<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>
	<span class="token keyword">declare</span> <span class="token variable">@userMoney</span> <span class="token keyword">int</span>
	<span class="token keyword">select</span> <span class="token variable">@id</span> <span class="token operator">=</span> id<span class="token punctuation">,</span> <span class="token variable">@userMoney</span> <span class="token operator">=</span> userMoney<span class="token punctuation">,</span> <span class="token variable">@userName</span> <span class="token operator">=</span> userName <span class="token keyword">from</span> deleted
	<span class="token keyword">insert</span> <span class="token keyword">into</span> BankBak <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token variable">@id</span><span class="token punctuation">,</span> <span class="token variable">@userName</span><span class="token punctuation">,</span> <span class="token variable">@userMoney</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> Bank
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> BankBak

<span class="token keyword">delete</span> <span class="token keyword">from</span> Bank <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><p>SQL Server \u7684\u89E6\u53D1\u5668\u662F\u8868\u7EA7\u89E6\u53D1\u5668\uFF0C\u8868\u4E0A\u4E00\u6B21\u6027\u7684\u591A\u6B21\u64CD\u4F5C\u53EA\u89E6\u53D1\u4E00\u6B21</p></div>`);
    };
  }
};
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2019/t-sql-note.md");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
var __glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$o,
  date: date$o,
  tags: tags$k,
  category: category$k,
  summary: summary$o,
  meta: meta$o,
  "default": _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const title$n = "\u5173\u4E8EHTTP";
const date$n = "2020/11/27 18:22:40";
const tags$j = ["http", "\u8BA1\u7B97\u673A\u7F51\u7EDC"];
const category$j = "\u6280\u672F";
const summary$n = "web\u5F00\u53D1\u4E2D\uFF0C\u65E0\u8BBA\u662F\u524D\u7AEF\u8FD8\u662F\u540E\u7AEF\uFF0C\u6240\u79BB\u4E0D\u5F00\u7684\u4E1C\u897F\u5C31\u662FHTTP\u534F\u8BAE\u548CHTTP\u76F8\u5173\u7684\u4E1C\u897F\uFF0C\u4ECA\u5929\u6211\u4EEC\u5C31\u6765\u804A\u804A\u548CHTTP\u76F8\u5173\u7684\u4E00\u4E9B\u77E5\u8BC6\u3002";
const meta$n = [{ "property": "og:title", "content": "\u5173\u4E8EHTTP" }];
const _sfc_main$A = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u5173\u4E8EHTTP", "date": "2020/11/27 18:22:40", "tags": ["http", "\u8BA1\u7B97\u673A\u7F51\u7EDC"], "category": "\u6280\u672F", "summary": "web\u5F00\u53D1\u4E2D\uFF0C\u65E0\u8BBA\u662F\u524D\u7AEF\u8FD8\u662F\u540E\u7AEF\uFF0C\u6240\u79BB\u4E0D\u5F00\u7684\u4E1C\u897F\u5C31\u662FHTTP\u534F\u8BAE\u548CHTTP\u76F8\u5173\u7684\u4E1C\u897F\uFF0C\u4ECA\u5929\u6211\u4EEC\u5C31\u6765\u804A\u804A\u548CHTTP\u76F8\u5173\u7684\u4E00\u4E9B\u77E5\u8BC6\u3002", "meta": [{ "property": "og:title", "content": "\u5173\u4E8EHTTP" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u5173\u4E8EHTTP", "meta": [{ "property": "og:title", "content": "\u5173\u4E8EHTTP" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>web \u5F00\u53D1\u4E2D\uFF0C\u65E0\u8BBA\u662F\u524D\u7AEF\u8FD8\u662F\u540E\u7AEF\uFF0C\u6240\u79BB\u4E0D\u5F00\u7684\u4E1C\u897F\u5C31\u662F HTTP \u534F\u8BAE\u548C HTTP \u76F8\u5173\u7684\u4E1C\u897F\uFF0C\u4ECA\u5929\u6211\u4EEC\u5C31\u6765\u804A\u804A\u548C HTTP \u76F8\u5173\u7684\u4E00\u4E9B\u77E5\u8BC6\u3002</p><h2 id="http-%E5%8D%8F%E8%AE%AE%E7%AE%80%E4%BB%8B" tabindex="-1">HTTP \u534F\u8BAE\u7B80\u4ECB</h2><p>HTTP \u534F\u8BAE\u5168\u79F0\u4E3A\u8D85\u6587\u672C\u4F20\u8F93\u534F\u8BAE \uFF0C\u662F\u4E00\u4E2A\u57FA\u4E8E TCP \u7684\u5E94\u7528\u5C42\u534F\u8BAE\uFF0C\u4E3B\u8981\u662F\u7528\u6765\u89C4\u5B9A\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u6570\u636E\u4F20\u8F93\u683C\u5F0F\uFF0C\u4ECE\u540D\u79F0\u5C31\u53EF\u4EE5\u6E05\u695A\u7684\u4E86\u89E3\u5230\u6700\u521D\u8FD9\u662F\u4E00\u4E2A\u7528\u6765\u4F20\u8F93 HTML\uFF08\u8D85\u6587\u672C\u6807\u8BB0\u8BED\u8A00\uFF09\u6587\u4EF6\u7684\u534F\u8BAE\uFF0C\u968F\u7740\u4E92\u8054\u7F51\u7684\u53D1\u5C55\uFF0C\u5B83\u73B0\u5728\u5DF2\u7ECF\u53EF\u4EE5\u4F20\u8F93\u5176\u4ED6\u5404\u7C7B\u6587\u4EF6\uFF08\u4F8B\u5982\u56FE\u7247\u3001\u89C6\u9891\u7B49\uFF09\u3002</p><p>HTTP \u534F\u8BAE\u5DE5\u4F5C\u4E8E\u5BA2\u6237\u7AEF-\u670D\u52A1\u7AEF\u6A21\u578B\u67B6\u6784\u4E0A\uFF0C\u56E0\u6B64\u6211\u4EEC\u8981\u5148\u6765\u4E86\u89E3\u4E00\u4E0B\u5BA2\u6237\u7AEF-\u670D\u52A1\u7AEF\u6A21\u578B\u3002</p><h2 id="%E5%AE%A2%E6%88%B7%E7%AB%AF-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%A8%A1%E5%9E%8B" tabindex="-1">\u5BA2\u6237\u7AEF-\u670D\u52A1\u7AEF\u6A21\u578B</h2><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/httpabout.png" alt=""></p><p>\u5BA2\u6237\u7AEF\u5728\u786C\u4EF6\u5C42\u9762\u901A\u5E38\u6307\u7684\u662F\u7535\u8111\u3001\u624B\u673A\u7B49\u8BBE\u5907\uFF0C\u800C\u5728\u8F6F\u4EF6\u5C42\u9762\u5219\u6307\u7684\u662F\u6D4F\u89C8\u5668\u7B49\u5E94\u7528\u7A0B\u5E8F\u3002\u73B0\u5728\u6211\u4EEC\u5728\u81EA\u5DF1\u7684\u7535\u8111\u4E0A\u4E5F\u5C31\u662F\u5BA2\u6237\u7AEF\u7535\u8111\u4E0A\u6253\u5F00\u6D4F\u89C8\u5668\uFF0C\u63A5\u7740\u6211\u4EEC\u5728\u5730\u5740\u680F\u91CC\u8F93\u5165www.bilibili.com\u8BBF\u95EEb\u7AD9\uFF0C\u8FD9\u65F6\u5019\u6D4F\u89C8\u5668\u5C31\u4F1A\u52A0\u8F7D\u51FA\u6765b\u7AD9\u9996\u9875\u3002\u5728\u8FD9\u6BB5\u8FC7\u7A0B\u4E2D\uFF0C\u6D4F\u89C8\u5668\u5FC5\u7136\u8FDB\u884C\u4E86\u4E00\u6BB5\u5341\u5206\u590D\u6742\u7684\u64CD\u4F5C\uFF0C\u8981\u60F3\u7406\u89E3\u8FD9\u6BB5\u64CD\u4F5C\uFF0C\u9996\u5148\u6211\u4EEC\u8981\u5148\u8BA4\u8BC6\u51E0\u4E2A\u6982\u5FF5\u3002</p><p><strong>\u57DF\u540D\u3001IP \u5730\u5740\u3001\u7AEF\u53E3\u3001\u670D\u52A1\u5668</strong></p><p>\u9996\u5148\u662Fwww.bilibili.com\u5B83\u5230\u5E95\u662F\u4EC0\u4E48\uFF1F\u4ECE\u4E13\u4E1A\u89D2\u5EA6\u6765\u8BB2\uFF0C\u8FD9\u4E32\u5B57\u7B26\u4E32\u7684\u540D\u5B57\u53EB\u57DF\u540D\uFF0C\u5728\u4E92\u8054\u7F51\u4E2D\u7EDD\u5927\u591A\u6570\u7684\u7F51\u7AD9\u90FD\u6709\u81EA\u5DF1\u7684\u57DF\u540D\uFF0C\u5E76\u4E14\u8FD9\u4E2A\u57DF\u540D\u662F\u552F\u4E00\u7684\u3002\u4E92\u8054\u7F51\u4E2D\u7684\u6BCF\u4E00\u4E2A\u57DF\u540D\u90FD\u6620\u5C04\u4E86\u4E00\u4E2AIP\u5730\u5740\uFF08<code>ping www.bilibili.com</code>\uFF09\uFF0CIP\u5730\u5740\u662F\u4E92\u8054\u7F51\u4E0A\u7684\u6BCF\u4E00\u53F0\u4E3B\u673A\u6216\u8005\u8BF4\u662F\u670D\u52A1\u5668\u90FD\u5177\u5907\u7684\u903B\u8F91\u5730\u5740\uFF0C\u5B83\u5177\u6709\u7EDF\u4E00\u7684\u683C\u5F0F\uFF0C\u76EE\u524D\u4E16\u754C\u4E0A\u6709IPv4\u548CIPv6\u4E24\u79CD\u7248\u672C\uFF0CIPv4\u662F\u4E00\u4E2A32\u4F4D\u7684\u4E8C\u8FDB\u5236\u6570\uFF0C\u901A\u5E38\u88AB\u5206\u5272\u4E3A4\u4E2A8\u4F4D\u4E8C\u8FDB\u5236\u6570\uFF0C\u4E0D\u8FC7\u6211\u4EEC\u4E00\u822C\u7528\u5341\u8FDB\u5236\u6765\u8868\u793A\uFF08\u6BD4\u5982\uFF1A192.168.51.2\uFF09\u30022019\u5E7411\u670826\u65E5\uFF0CIPv4\u5730\u5740\u5DF2\u7ECF\u88AB\u5206\u914D\u5B8C\u6BD5\uFF0C\u73B0\u5728\u5404\u56FD\u90FD\u5DF2\u7ECF\u5F00\u59CB\u90E8\u7F72IPv6\u5730\u5740\u3002IP\u5730\u5740\u4E2D\u9664\u4E86\u4E3B\u8981\u7684\u56DB\u4E2A\u6570\u5B57\uFF0C\u8FD8\u6709\u4E00\u4E2A\u4F7F\u7528\u5192\u53F7\u5206\u5272\u51FA\u6765\u7684\u6570\u5B57\uFF0C\u8FD9\u4E2A\u6570\u5B57\u53EB\u505A\u7AEF\u53E3\u53F7\uFF0C\u5B83\u662F\u7528\u6765\u533A\u5206\u5404\u4E2A\u4E0D\u540C\u670D\u52A1\u7684\u7F16\u53F7\uFF0C\u901A\u5E38\u6211\u4EEC\u5728\u6D4F\u89C8\u5668\u5730\u5740\u680F\u4E2D\u5F88\u5C11\u89C1\u5230\u7AEF\u53E3\u53F7\uFF0C\u662F\u56E0\u4E3Ahttp\u8BF7\u6C42\u7684\u9ED8\u8BA4\u7AEF\u53E3\u53F7\u5C31\u662F80\uFF0C\u5927\u90E8\u5206\u4F01\u4E1A\u4E5F\u4F1A\u628A\u81EA\u5DF1\u7684\u7F51\u7AD9\u6302\u8F7D\u523080\u7AEF\u53E3\u4E0A\u3002</p><p>\u6211\u4EEC\u901A\u4FD7\u7684\u6765\u7406\u89E3\u4E00\u4E0B\u57DF\u540D\u3001IP \u5730\u5740\u3001\u7AEF\u53E3\u3001\u4E3B\u673A\u4E4B\u95F4\u7684\u5173\u7CFB\uFF0C\u5982\u679C\u628A\u4E92\u8054\u7F51\u5F53\u4F5C\u4E00\u5F20\u5927\u5730\u56FE\uFF0C\u5404\u53F0\u4E3B\u673A\u5F53\u4F5C\u5730\u56FE\u4E0A\u7684\u5404\u4E2A\u5C0F\u533A\u6216\u8005\u662F\u5EFA\u7B51\uFF0C\u8FD9\u6837 IP \u5730\u5740\u5C31\u76F8\u5F53\u4E8E\u5404\u4E2A\u5C0F\u533A\u6216\u8005\u662F\u5EFA\u7B51\u7684\u5730\u5740\uFF0C\u6BD4\u5982\u54B1\u5B66\u6821\u7684\u5730\u5740\uFF1A\u6587\u660E\u5927\u9053 265 \u53F7\uFF0C\u800C\u57DF\u540D\u5C31\u76F8\u5F53\u4E8E\u6587\u660E\u5927\u9053 265 \u53F7\u8FD9\u4E2A\u5730\u5740\u7684\u540D\u5B57\u2014\u2014\u5B89\u9633\u5E08\u8303\u5B66\u9662\u8001\u6821\u533A\u3002\u6240\u4EE5\uFF0C\u57DF\u540D\u5B9E\u9645\u4E0A\u7684\u4F5C\u7528\u5C31\u662F\u4E3A\u4E86\u53D6\u4EE3\u5197\u957F\u7684 IP \u5730\u5740\uFF0C\u65B9\u4FBF\u6211\u4EEC\u8BB0\u5FC6\u3002\u5982\u679C\u6211\u4EEC\u628A\u4E0D\u540C\u7684\u9662\u7CFB\u6BD4\u4F5C\u4E0D\u540C\u7684\u670D\u52A1\uFF0C\u90A3\u4E48\u7AEF\u53E3\u53F7\u5C31\u76F8\u5F53\u4E8E\u8F6F\u4EF6\u5B66\u9662\u7684\u6559\u5B66\u697C\u6216\u8005\u662F\u4E92\u8054\u7F51+\u5E94\u7528\u6280\u672F\u5B66\u9662\u7684\u79D1\u6280\u697C\u3002</p><p>\u4E86\u89E3\u4E86\u8FD9\u51E0\u4E2A\u6982\u5FF5\u540E\uFF0C\u6211\u4EEC\u5C31\u8981\u770B\u770B\u6D4F\u89C8\u5668\u5728\u6211\u4EEC\u8F93\u5165\u7F51\u5740\u6309\u4E0B\u56DE\u8F66\u540E\u7A76\u7ADF\u5E72\u4E86\u4EC0\u4E48\u3002</p><p><strong>\u53D1\u9001\u5230 DNS</strong></p><p>\u9996\u5148\uFF0C\u6211\u4EEC\u73B0\u5728\u90FD\u6E05\u695A\uFF0Cwww.bilibili.com\u8FD9\u4E2A\u57DF\u540D\u5B83\u6620\u5C04\u4E86\u4E00\u4E2AIP\u5730\u5740\uFF0C\u4F46\u5B9E\u9645\u4E0A\u65E0\u8BBA\u662F\u6211\u4EEC\u7684\u7535\u8111\u8FD8\u662F\u6D4F\u89C8\u5668\u90FD\u4E0D\u77E5\u9053\u8FD9\u4E2AIP\u5730\u5740\u662F\u4EC0\u4E48\uFF0C\u56E0\u4E3A\u57DF\u540D\u6240\u7ED1\u5B9A\u7684IP\u5730\u5740\u662F\u6709\u53EF\u80FD\u66F4\u6539\u7684\u3002\u56E0\u6B64\u5F53\u6211\u4EEC\u8BBF\u95EEb\u7AD9\u7684\u65F6\u5019\uFF0C\u6D4F\u89C8\u5668\u4F1A\u5C06\u6211\u4EEC\u60F3\u8981\u8BBF\u95EEb\u7AD9\u7684\u8FD9\u4E2A\u6D88\u606F\u6839\u636EHTTP\u534F\u8BAE\u5C01\u88C5\u6210\u4E00\u4E2A\u53EB\u8BF7\u6C42\u62A5\u6587\u7684\u4E1C\u897F\uFF0C\u5E76\u5C06\u8FD9\u4E2A\u8BF7\u6C42\u62A5\u6587\u53D1\u9001\u5230\u57DF\u540D\u89E3\u6790\u670D\u52A1\u5668\u4E0A\uFF0C\u8FD9\u4E2A\u57DF\u540D\u89E3\u6790\u670D\u52A1\u5668\u5C31\u662F\u6211\u4EEC\u5E38\u8BF4\u7684DNS\uFF0C\u5728\u8FD9\u4E2ADNS\u4E0A\u6709\u4E00\u4E2A\u8868\uFF0C\u91CC\u9762\u5B58\u50A8\u4E86\u8BB8\u591A\u57DF\u540D\u53CA\u5176\u5BF9\u5E94\u7684IP\u5730\u5740\u3002\u8BF7\u6C42\u62A5\u6587\u53D1\u9001\u5230DNS\u540E\uFF0CDNS\u4F1A\u89E3\u6790\u51FA\u8BF7\u6C42\u62A5\u6587\u4E2D\u7684\u57DF\u540D\uFF0C\u7136\u540E\u6839\u636E\u57DF\u540D\u627E\u51FA\u5176\u5BF9\u5E94\u7684IP\u5730\u5740\uFF0C\u4F46\u662FDNS\u7684\u5BB9\u91CF\u662F\u6709\u9650\u7684\uFF0C\u56E0\u6B64\u4E00\u53F0DNS\u4E0D\u53EF\u80FD\u5B58\u50A8\u6240\u6709\u7684\u57DF\u540D\u4FE1\u606F\uFF0C\u5F53\u5728\u8FD9\u53F0DNS\u4E2D\u627E\u4E0D\u5230\u5BF9\u5E94\u7684IP\u5730\u5740\u65F6\uFF0C\u5F53\u524DDNS\u4F1A\u5C06\u5F53\u524D\u8BF7\u6C42\u5411\u4E0A\u4E00\u7EA7\u7684DNS\u53D1\u9001\u8FC7\u53BB\uFF0C\u9010\u7EA7\u89E3\u6790\uFF0C\u76F4\u5230\u627E\u5230\u5BF9\u5E94\u7684IP\u5730\u5740\u3002</p><p><strong>\u53D1\u9001\u5230\u76EE\u6807\u670D\u52A1\u5668</strong></p><p>\u627E\u5230\u57DF\u540D\u5BF9\u5E94\u7684 IP \u5730\u5740\u540E\uFF0CDNS \u5C31\u4F1A\u5C06\u8BF7\u6C42\u62A5\u6587\u8F6C\u53D1\u5230\u76EE\u6807\u670D\u52A1\u5668\u7535\u8111\u4E0A\u7684\u670D\u52A1\u5668\u8F6F\u4EF6\u4E0A\uFF08\u6BD4\u5982\uFF1AIIS\u3001Apache\uFF09\uFF0C\u670D\u52A1\u5668\u63A5\u6536\u5E76\u89E3\u6790\u8BF7\u6C42\u62A5\u6587\u540E\uFF0C\u4F1A\u5C06\u8BF7\u6C42\u62A5\u6587\u6240\u8BF7\u6C42\u7684\u8D44\u6E90\u6839\u636E HTTP \u534F\u8BAE\u6253\u5305\u6210\u4E00\u4E2A\u53EB\u505A\u54CD\u5E94\u62A5\u6587\u7684\u5305\uFF0C\u53D1\u9001\u56DE\u53D1\u51FA\u8BF7\u6C42\u7684\u7535\u8111\uFF0C\u56E0\u4E3A\u8BF7\u6C42\u62A5\u6587\u4E2D\u643A\u5E26\u6709\u53D1\u9001\u8BF7\u6C42\u7684\u7535\u8111\u7684 IP \u5730\u5740\uFF0C\u6240\u4EE5\u5728\u54CD\u5E94\u62A5\u6587\u53D1\u9001\u65F6\u5E76\u4E0D\u9700\u8981\u7ECF\u8FC7 DNS \u670D\u52A1\u5668\uFF0C\u53EF\u4EE5\u76F4\u63A5\u9001\u8FBE\u76EE\u6807\u7535\u8111\u4E0A\u3002</p><p><strong>\u6D4F\u89C8\u5668\u63A5\u6536\u54CD\u5E94</strong></p><p>\u6D4F\u89C8\u5668\u63A5\u6536\u5230\u54CD\u5E94\u62A5\u6587\u540E\uFF0C\u518D\u6839\u636E HTTP \u534F\u8BAE\u89E3\u6790\u8FD9\u4E2A\u54CD\u5E94\u62A5\u6587\uFF0C\u7136\u540E\u5C06\u89E3\u6790\u5230\u7684\u6570\u636E\u6E32\u67D3\u5230\u6D4F\u89C8\u5668\u5185\u5BB9\u533A\u57DF\uFF0C\u8FD9\u6837\u6211\u4EEC\u5C31\u770B\u5230\u4E86 b \u7AD9\u7684\u9996\u9875\u3002</p><h2 id="%E8%AF%B7%E6%B1%82%E6%8A%A5%E6%96%87%E4%B8%8E%E5%93%8D%E5%BA%94%E6%8A%A5%E6%96%87" tabindex="-1">\u8BF7\u6C42\u62A5\u6587\u4E0E\u54CD\u5E94\u62A5\u6587</h2><p>\u524D\u9762\u6211\u4EEC\u63D0\u5230\u4E86\u4E24\u4E2A\u4E1C\u897F\uFF0C\u8BF7\u6C42\u62A5\u6587\u4E0E\u54CD\u5E94\u62A5\u6587\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u6765\u770B\u770B\u8BF7\u6C42\u62A5\u6587\u4E0E\u54CD\u5E94\u62A5\u6587\u957F\u4EC0\u4E48\u6837\u5B50\u3002\uFF08F12\uFF09</p><p>\u8BF7\u6C42\u62A5\u6587\u4E0E\u54CD\u5E94\u62A5\u6587\u90FD\u4E3B\u8981\u5206\u6210\u4E24\u90E8\u5206\u2014\u2014\u8BF7\u6C42\uFF08/\u54CD\u5E94\uFF09\u5934\u4E0E\u8BF7\u6C42\uFF08/\u54CD\u5E94\uFF09\u6B63\u6587</p><p><strong>\u8BF7\u6C42\u62A5\u6587</strong></p><ul><li><p>\u8BF7\u6C42\u5934\u4E2D\u901A\u5E38\u5305\u542B\u8BF7\u6C42\u65B9\u6CD5\uFF08GET\uFF0CPOST\u2026\uFF09\uFF0CHeaders\uFF08\u6D4F\u89C8\u5668\u7C7B\u578B\u3001\u4E3B\u673A\u5730\u5740\uFF09</p></li><li><p>\u8BF7\u6C42\u6B63\u6587\u4E2D\u4F1A\u5305\u542B\u8BF7\u6C42\u7684\u901A\u8FC7 body\u3001from \u7B49\u65B9\u6CD5\u4F20\u9012\u7684\u53C2\u6570\u3002</p></li></ul><p><strong>\u54CD\u5E94\u62A5\u6587</strong></p><ul><li>\u54CD\u5E94\u5934\u4E2D\u4E3B\u8981\u6709\u54CD\u5E94\u72B6\u6001\uFF08200\uFF0C404\u2026\uFF09\uFF0C\u54CD\u5E94\u7C7B\u578B\u7B49</li><li>\u54CD\u5E94\u6B63\u6587\u5219\u4E00\u822C\u90FD\u662F\u6211\u4EEC\u6240\u8BF7\u6C42\u7684\u6570\u636E\u3002</li></ul></div>`);
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/about-http.md");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
var __glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$n,
  date: date$n,
  tags: tags$j,
  category: category$j,
  summary: summary$n,
  meta: meta$n,
  "default": _sfc_main$A
}, Symbol.toStringTag, { value: "Module" }));
const title$m = "\u4F7F\u7528 webpack \u624B\u52A8\u642D\u5EFA vue \u9879\u76EE";
const date$m = "2020/12/07 20:30:13";
const tags$i = ["JavaScript", "Vue", "Webpack"];
const category$i = "\u6280\u672F";
const summary$m = "webpack \u662F\u4E00\u4E2A\u524D\u7AEF\u5DE5\u7A0B\u5316\u6253\u5305\u5DE5\u5177\uFF0C\u5BF9\u4E8E\u524D\u7AEF\u5DE5\u7A0B\u5E08\u6765\u8BF4 webpack \u662F\u4E00\u9879\u5341\u5206\u91CD\u8981\u7684\u6280\u80FD\u3002\u4E0B\u9762\u6211\u4EEC\u5C31\u901A\u8FC7\u642D\u5EFA\u4E00\u4E2A vue \u9879\u76EE\u6765\u5B66\u4E60\u4F7F\u7528 webpack";
const meta$m = [{ "property": "og:title", "content": "\u4F7F\u7528 webpack \u624B\u52A8\u642D\u5EFA vue \u9879\u76EE" }];
const _sfc_main$z = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u4F7F\u7528 webpack \u624B\u52A8\u642D\u5EFA vue \u9879\u76EE", "date": "2020/12/07 20:30:13", "tags": ["JavaScript", "Vue", "Webpack"], "category": "\u6280\u672F", "summary": "webpack \u662F\u4E00\u4E2A\u524D\u7AEF\u5DE5\u7A0B\u5316\u6253\u5305\u5DE5\u5177\uFF0C\u5BF9\u4E8E\u524D\u7AEF\u5DE5\u7A0B\u5E08\u6765\u8BF4 webpack \u662F\u4E00\u9879\u5341\u5206\u91CD\u8981\u7684\u6280\u80FD\u3002\u4E0B\u9762\u6211\u4EEC\u5C31\u901A\u8FC7\u642D\u5EFA\u4E00\u4E2A vue \u9879\u76EE\u6765\u5B66\u4E60\u4F7F\u7528 webpack", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528 webpack \u624B\u52A8\u642D\u5EFA vue \u9879\u76EE" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u4F7F\u7528 webpack \u624B\u52A8\u642D\u5EFA vue \u9879\u76EE", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528 webpack \u624B\u52A8\u642D\u5EFA vue \u9879\u76EE" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>webpack \u662F\u4E00\u4E2A\u524D\u7AEF\u5DE5\u7A0B\u5316\u6253\u5305\u5DE5\u5177\uFF0C\u5BF9\u4E8E\u524D\u7AEF\u5DE5\u7A0B\u5E08\u6765\u8BF4 webpack \u662F\u4E00\u9879\u5341\u5206\u91CD\u8981\u7684\u6280\u80FD\u3002\u4E0B\u9762\u6211\u4EEC\u5C31\u901A\u8FC7\u642D\u5EFA\u4E00\u4E2A vue \u9879\u76EE\u6765\u5B66\u4E60\u4F7F\u7528 webpack</p><p><strong>\u4E3B\u8981\u73AF\u5883\uFF1A</strong></p><ul><li>node v14.15.0</li><li>npm v6.14.9</li><li>webpack v5.10.0</li><li>webpack-cli v4.2.0</li><li>vue v2.6.12</li></ul><p><strong>\u672C\u9879\u76EE\u5B9E\u73B0\u4EE5\u4E0B\u529F\u80FD\uFF1A</strong></p><ul><li>\u4E0E<code>vue/cli</code>\u7C7B\u4F3C\u7684\u57FA\u672C\u76EE\u5F55</li><li>\u652F\u6301<code>*.vue</code>,<code>*.css</code>\u7B49\u6587\u4EF6</li><li>\u652F\u6301<code>es6</code>\u53CA\u4EE5\u4E0A\u8BED\u6CD5</li><li>\u652F\u6301\u52A0\u8F7D\u56FE\u7247</li><li>\u70ED\u52A0\u8F7D</li></ul><h2 id="%E6%9E%84%E5%BB%BA%E9%A1%B9%E7%9B%AE%E5%9F%BA%E6%9C%AC%E7%9B%AE%E5%BD%95" tabindex="-1">\u6784\u5EFA\u9879\u76EE\u57FA\u672C\u76EE\u5F55</h2><p>\u6267\u884C<code>npm init</code>\u5E76\u521B\u5EFA\u4EE5\u4E0B\u76EE\u5F55</p><pre><code>demo
\u251C\u2500 dist
\u251C\u2500 public
\u2514\u2500 src
</code></pre><h2 id="%E5%AE%89%E8%A3%85%E5%BF%85%E8%A6%81%E4%BE%9D%E8%B5%96" tabindex="-1">\u5B89\u88C5\u5FC5\u8981\u4F9D\u8D56</h2><h3 id="webpack-%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%8F%92%E4%BB%B6" tabindex="-1">webpack \u53CA\u76F8\u5173\u63D2\u4EF6</h3><ul><li>webpack <code>npm install -D webpack webpack-cli</code></li><li>webpack \u672C\u5730\u670D\u52A1\u5668\u63D2\u4EF6 <code>npm install -D webpack-dev-server</code></li><li>html \u751F\u6210\u63D2\u4EF6\uFF0C\u5B83\u4F1A\u5C06\u751F\u6210\u7684 js \u548C css \u6587\u4EF6\u63D2\u5165\u5230 html \u4E2D <code>npm install -D html-webpack-plugin</code></li><li>vue \u63D2\u4EF6 <code>npm install -D vue-loader vue-template-compiler</code></li><li>css \u63D2\u4EF6 <code>npm install -D css-loader style-loader vue-style-loader</code></li><li>\u56FE\u7247\u63D2\u4EF6 <code>npm install -D file-loader url-loader</code></li><li>babel \u63D2\u4EF6 <code>npm install -D @babel/core @babel/cli @babel/preset-env babel-loader</code>, <code>npm install @babel/polyfill</code></li></ul><h3 id="%E5%AE%89%E8%A3%85-vue" tabindex="-1">\u5B89\u88C5 vue</h3><ul><li><code>npm install vue vue-router</code></li></ul><h2 id="%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE" tabindex="-1">\u642D\u5EFA\u9879\u76EE</h2><h3 id="%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0-webpack-%E6%89%93%E5%8C%85" tabindex="-1">\u7B80\u5355\u5B9E\u73B0 webpack \u6253\u5305</h3><p>\u65B0\u5EFA<code>src/main.js</code>\uFF0C\u5E76\u5199\u5165\uFF1A</p><pre class="language-javascript"><code class="language-javascript">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello Webpack&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u6839\u76EE\u5F55\u4E0B\u65B0\u5EFA<code>webpack.config.js</code>\uFF0C\u5E76\u5199\u5165\uFF1A</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/main.js&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u5B9A\u4E49\u5165\u53E3\u6587\u4EF6</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">&#39;/dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// \u6253\u5305\u751F\u6210\u6587\u4EF6\u5730\u5740\uFF0C\u5FC5\u987B\u662F\u7EDD\u5BF9\u8DEF\u5F84</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].build.js&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u751F\u6210\u7684\u6587\u4EF6\u540D</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> config<span class="token punctuation">;</span>
</code></pre><p>\u5728<code>package.json</code>\u4E2D\u7684<code>scripts</code>\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u811A\u672C\uFF1A</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack --mode=production&quot;</span>
  <span class="token punctuation">}</span>
  ...
<span class="token punctuation">}</span>
</code></pre><p>\u5728\u547D\u4EE4\u884C\u4E2D\u6267\u884C<code>npm run build</code>\uFF0C\u6B64\u65F6\u9879\u76EE\u76EE\u5F55\u4E2D\u51FA\u73B0\u4E86<code>dist/main.build.js</code>\uFF0C\u8BC1\u660E\u6267\u884C\u6210\u529F</p><p>js \u6587\u4EF6\u6253\u5305\u6210\u529F\u540E\uFF0C\u9700\u8981\u4E00\u4E2A html \u6587\u4EF6\u6765\u5F15\u5165\u8FD9\u4E2A js \u6587\u4EF6\uFF0C\u8FD9\u5C31\u9700\u8981\u7528\u5230\u6211\u4EEC\u4E00\u5F00\u59CB\u4E0B\u8F7D\u7684<code>html-webpack-plugin</code></p><p>\u9996\u5148\u65B0\u5EFA<code>public/index.html</code>\u521B\u5EFA\u4E00\u4E2A\u57FA\u7840\u9875\u9762\uFF1A</p><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>webpack\u642D\u5EFAvue<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- \u5982\u679C\u6D4F\u89C8\u5668\u7981\u6B62\u52A0\u8F7Djs\u811A\u672C --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>noscript</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">&gt;</span></span>
        We&#39;re sorry but this site doesn&#39;t work properly without JavaScript
        enabled. Please enable it to continue.
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>noscript</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- build\u540E\u7684\u6587\u4EF6\u4F1A\u5728\u8FD9\u4E4B\u540E\u81EA\u52A8\u5F15\u5165 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u5728<code>public</code>\u4E0B\u968F\u4FBF\u653E\u5165\u4E00\u4E2A\u56FE\u6807<code>favicon.ico</code>\uFF0C\u7136\u540E\u5728<code>webpack.config.js</code>\u4E2D\u914D\u7F6E\u63D2\u4EF6\uFF1A</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span><span class="token punctuation">[</span>
     <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u751F\u6210\u7684\u6587\u4EF6\u5939\u540D</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;public/index.html&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u6A21\u677Fhtml</span>
      <span class="token literal-property property">favicon</span><span class="token operator">:</span> <span class="token string">&#39;public/favicon.ico&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u56FE\u6807</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><p>\u4E4B\u540E\u518D\u6B21\u6267\u884C<code>npm run build</code>\uFF0C<code>dist</code>\u4E0B\u4F1A\u751F\u6210<code>index.html</code>\uFF0C<code>favicon.ico</code>\uFF0C<code>main.build.js</code>\u4E09\u4E2A\u6587\u4EF6\uFF0C\u901A\u8FC7\u6D4F\u89C8\u5668\u6253\u5F00<code>index.html</code>\uFF0C\u5C31\u53EF\u4EE5\u53D1\u73B0\u63A7\u5236\u53F0\u8F93\u51FA\u4E86<code>Hello Webpack</code>\uFF0C\u9875\u9762\u56FE\u6807\u4E5F\u53D8\u6210\u4E86\u81EA\u5DF1\u8BBE\u5B9A\u7684\u56FE\u6807\uFF0C\u901A\u8FC7\u7F16\u8F91\u5668\u6253\u5F00<code>index.html</code>\uFF0C\u6211\u4EEC\u4F1A\u53D1\u73B0 webpack \u5E2E\u52A9\u6211\u4EEC\u81EA\u52A8\u5F15\u5165\u4E86<code>favicon.ico</code>\u548C<code>main.build.js</code>\uFF1A</p><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    ...
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>favicon.ico<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    ...
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>main.build.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><h3 id="%E5%BC%80%E5%90%AF%E7%83%AD%E5%8A%A0%E8%BD%BD" tabindex="-1">\u5F00\u542F\u70ED\u52A0\u8F7D</h3><p>webpack \u70ED\u52A0\u8F7D\u9700\u8981\u7528\u5230<code>webpack-dev-server</code>\uFF0C\u5728\u5F00\u59CB\u6211\u4EEC\u5DF2\u7ECF\u5B89\u88C5\u8FC7\u4E86\uFF0C\u5728<code>webpack.config.js</code>\u4E2D\u914D\u7F6E\uFF1A</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">contentBase</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// html\u6240\u5728\u8DEF\u5F84</span>
    <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u662F\u5426\u538B\u7F29</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span> <span class="token comment">// \u7AEF\u53E3</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u70ED\u90E8\u7F72</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u6253\u5305\u5B8C\u6210\u540E\u81EA\u52A8\u6253\u5F00\u7F51\u9875</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u589E\u52A0<code>package.json</code>\u811A\u672C\uFF1A</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack --mode=production&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;serve&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack serve&quot;</span>
  <span class="token punctuation">}</span>
  ...
<span class="token punctuation">}</span>
</code></pre><p>\u6267\u884C<code>npm run serve</code>\uFF0C\u6253\u5305\u6210\u529F\u540E\u4F1A\u81EA\u52A8\u6253\u5F00\u7F51\u9875\uFF0C\u5E76\u4E14\u5F53\u4F60\u4FEE\u6539<code>src/main.js</code>\u6216<code>src/index.html</code>\u7684\u5185\u5BB9\u7684\u65F6\u5019\uFF0C\u6D4F\u89C8\u5668\u4F1A\u81EA\u52A8\u91CD\u65B0\u6253\u5305\u5E76\u5237\u65B0</p><h3 id="%E9%85%8D%E7%BD%AE-vue" tabindex="-1">\u914D\u7F6E Vue</h3><p>\u8BA9 webpack \u6253\u5305<code>*.vue</code>\u6587\u4EF6\u9700\u8981<code>vue-loader</code>\u548C<code>vue-template-compiler</code>\uFF0C\u540C\u65F6\u4E3A\u4E86 webpack \u80FD\u591F\u89E3\u6790 vue \u4E2D\u7684 css \u8FD8\u9700\u8981\u7528\u5230<code>css-loader</code>\u548C<code>vue-style-loader</code>\uFF0C\u5728<code>webpack.config.js</code>\u914D\u7F6E\u4EE5\u4E0A\u63D2\u4EF6\uFF1A</p><pre class="language-javascript"><code class="language-javascript"><span class="token operator">...</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> VueLoaderPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vue-loader&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// loaders</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// *.vue</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;vue-loader&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// \`*.vue\` \u6587\u4EF6\u4E2D\u7684 \`&lt;style&gt;\` \u5757\u4EE5\u53CA\u666E\u901A\u7684\`*.css\`</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue-style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token operator">...</span>
    <span class="token keyword">new</span> <span class="token class-name">VueLoaderPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
</code></pre><p>\u914D\u7F6E\u5B8C\u540E\u65B0\u5EFA<code>src/App.vue</code>:</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>example<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ msg }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello Webpack&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.example</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u4FEE\u6539<code>src/main.js</code>:</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u7136\u540E\u8FD0\u884C<code>npm run serve</code>\uFF0C\u5373\u53EF\u770B\u5230\u9875\u9762\u4E0A\u663E\u793A\u7684<code>Hello Webpack</code></p><h3 id="%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90%E7%9A%84%E5%8A%A0%E8%BD%BD" tabindex="-1">\u914D\u7F6E\u56FE\u7247\u8D44\u6E90\u7684\u52A0\u8F7D</h3><p>\u4F7F\u7528<code>file-loader</code>\u6216<code>url-loader</code>\u52A0\u8F7D\uFF0C\u5B83\u4EEC\u90FD\u662F\u7528\u4E8E\u6253\u5305\u6587\u4EF6\u548C\u56FE\u7247\u8D44\u6E90\u7684\uFF0C\u533A\u522B\u5728\u4E8E<code>url-loader</code>\u5C01\u88C5\u4E86<code>file-loader</code></p><p>\u5728\u8BBF\u95EE\u7F51\u7AD9\u65F6\u5982\u679C\u56FE\u7247\u8F83\u591A\uFF0C\u4F1A\u53D1\u5F88\u591A http \u8BF7\u6C42\uFF0C\u4F1A\u964D\u4F4E\u9875\u9762\u6027\u80FD\u3002\u8FD9\u4E2A\u95EE\u9898\u53EF\u4EE5\u901A\u8FC7 <code>url-loader</code> \u89E3\u51B3\u3002<code>url-loader</code> \u4F1A\u5C06\u5F15\u5165\u7684\u56FE\u7247\u7F16\u7801\uFF0C\u751F\u6210 dataURl\u3002\u76F8\u5F53\u4E8E\u628A\u56FE\u7247\u6570\u636E\u7FFB\u8BD1\u6210\u4E00\u4E32\u5B57\u7B26,\u518D\u628A\u8FD9\u4E32\u5B57\u7B26\u6253\u5305\u5230\u6587\u4EF6\u4E2D\uFF0C\u6700\u7EC8\u53EA\u9700\u8981\u5F15\u5165\u8FD9\u4E2A\u6587\u4EF6\u5C31\u80FD\u8BBF\u95EE\u56FE\u7247\u4E86\u3002 \u5F53\u7136\uFF0C\u5982\u679C\u56FE\u7247\u8F83\u5927\uFF0C\u7F16\u7801\u4F1A\u6D88\u8017\u6027\u80FD\u3002\u56E0\u6B64 <code>url-loader</code> \u63D0\u4F9B\u4E86\u4E00\u4E2A limit \u53C2\u6570\uFF0C\u5C0F\u4E8E limit \u5B57\u8282\u7684\u6587\u4EF6\u4F1A\u88AB\u8F6C\u4E3A DataURl\uFF0C\u5927\u4E8E limit \u7684\u8FD8\u4F1A\u4F7F\u7528 file-loader \u8FDB\u884C copy\u3002 \u6B64\u5904\u6211\u4EEC\u4F7F\u7528 <code>url-loader</code>,\u7531\u4E8E\u5B83\u662F\u57FA\u4E8E <code>file-loader</code> \u7684\u5C01\u88C5\uFF0C\u6240\u4EE5\u4E5F\u9700\u8981\u5F15\u5165 <code>file-loader</code>\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token operator">...</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token operator">...</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// \u56FE\u7247</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpe?g|gif|svg)(\\?.*)?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;url-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">25000</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
</code></pre><p>\u7136\u540E\u6DFB\u52A0\u4E00\u4E2A\u56FE\u7247<code>src/assets/logo.png</code>\uFF0C\u5728<code>App.vue</code>\u4E2D\u5F15\u5165\uFF1A</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>example<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    {{ msg }}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>url<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> logo <span class="token keyword">from</span> <span class="token string">&#39;./assets/logo.png&#39;</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello Vue1&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> logo<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.example</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u518D\u6B21<code>npm run serve</code>\u5373\u53EF\u770B\u5230\u56FE\u7247</p><h2 id="%E9%85%8D%E7%BD%AE-babel" tabindex="-1">\u914D\u7F6E babel</h2><p>babel \u53EF\u4EE5\u5C06 js \u7684\u9AD8\u7248\u672C(es6)\u8BED\u6CD5\u8F6C\u6362\u4E3A\u4F4E\u7248\u672C\uFF0C\u4F7F\u5F97\u9879\u76EE\u517C\u5BB9\u4F4E\u7248\u672C\u6D4F\u89C8\u5668</p><p>\u9700\u8981\u6211\u4EEC\u6CE8\u610F\u7684\u662F\uFF0Cbabel7 \u4E0E babel6 \u4E0D\u517C\u5BB9\uFF0C\u56E0\u6B64\u9700\u8981\u4F7F\u7528\u6700\u65B0\u7248\u672C\u7684 babel \u548C babel \u63D2\u4EF6\uFF0C\u5728\u524D\u9762\u6587\u7AE0\u5F00\u59CB\u6211\u4EEC\u5DF2\u7ECF\u5B89\u88C5\u4E86 babel7 \u7248\u672C\u7684 babel \u63D2\u4EF6\uFF0C\u4E0B\u9762\u6211\u4EEC\u5728<code>webpack.config.js</code>\u4E2D\u914D\u7F6E\u5B83\uFF1A</p><pre class="language-javascript"><code class="language-javascript"><span class="token operator">...</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token operator">...</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// *.js</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// \u4E0D\u7F16\u8BD1node_modules\u4E0B\u7684\u6587\u4EF6</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;babel-loader&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
</code></pre><p>\u914D\u7F6E\u5B8C\u540E\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E00\u4E2A babel \u7684\u914D\u7F6E\u6587\u4EF6<code>.babelrc</code>\uFF0C\u5199\u5165\u5982\u4E0B\u5185\u5BB9\uFF1A</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;useBuiltIns&quot;</span><span class="token operator">:</span> <span class="token string">&quot;entry&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><blockquote><p>\u66F4\u591A babel \u914D\u7F6E\u8BF7\u67E5\u770B<a href="https://www.babeljs.cn/">babel \u4E2D\u6587\u5B98\u7F51</a></p></blockquote><p>\u914D\u7F6E\u5B8C\u6210\u540E\u65B0\u5EFA\u4E00\u4E2A<code>src/utils/getData.js</code>\u6D4B\u8BD5\u4E00\u4E0B\uFF1A</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;ok&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>\u5728<code>src/App.vue</code>\u4E2D\u5F15\u5165\uFF1A</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>example<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    {{ msg }}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>url<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> logo <span class="token keyword">from</span> <span class="token string">&#39;./assets/logo.png&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> getData <span class="token keyword">from</span> <span class="token string">&#39;./utils/getData&#39;</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;Hello Vue1&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> logo<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">async</span> <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> data<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.example</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u91CD\u65B0\u6267\u884C<code>npm run serve</code>\u540E\uFF0C\u9875\u9762\u663E\u793A<code>ok</code>\uFF0Cbabel \u5F15\u5165\u6210\u529F</p><h3 id="%E8%AE%BE%E7%BD%AE-src-%E5%88%AB%E5%90%8D%E4%BB%A5%E5%8F%8A%E7%9C%81%E7%95%A5%E5%90%8E%E7%BC%80" tabindex="-1">\u8BBE\u7F6E src \u522B\u540D\u4EE5\u53CA\u7701\u7565\u540E\u7F00</h3><p>\u4E3A\u4E86\u65B9\u4FBF\u5F00\u53D1\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7ED9 src \u76EE\u5F55\u8BBE\u7F6E\u522B\u540D\uFF0C\u4EE5\u53CA\u5C06\u5E38\u7528\u6587\u4EF6\u7C7B\u578B\u7684\u540E\u7F00\u7701\u7565</p><pre class="language-javascript"><code class="language-javascript"><span class="token operator">...</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// \u89E3\u6790\u8DEF\u5F84</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6Esrc\u522B\u540D</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//\u540E\u7F00\u540D \u53EF\u4EE5\u6839\u636E\u9700\u8981\u81EA\u7531\u589E\u51CF</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.vue&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
</code></pre><p>\u8FD9\u6837\u6211\u4EEC\u5C31\u53EF\u4EE5\u4EE5\u5982\u4E0B\u65B9\u5F0F\u5BFC\u5165 vue \u548C js \u6587\u4EF6\uFF1A</p><pre class="language-javascript"><code class="language-javascript"><span class="token comment">// \u5BFC\u5165App.vue</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;@/App&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// \u5BFC\u5165getData</span>
<span class="token keyword">import</span> getData <span class="token keyword">from</span> <span class="token string">&#39;@/utils/getData&#39;</span><span class="token punctuation">;</span>
</code></pre><p>\u81F3\u6B64\uFF0C\u6211\u4EEC\u5DF2\u7ECF\u7B80\u5355\u7684\u642D\u5EFA\u51FA\u4E86 vue \u9879\u76EE\uFF0C\u5728\u9879\u76EE\u4E2D\u6211\u4EEC\u53EF\u80FD\u8FD8\u4F1A\u9700\u8981\u7528\u5230<code>less</code>,<code>sass</code>,\u5B57\u4F53\u56FE\u6807\u7B49\u5DE5\u5177\uFF0C\u9488\u5BF9\u8FD9\u7C7B\u5DE5\u5177 webpack \u90FD\u6709\u4E0E\u5176\u5BF9\u5E94\u7684<code>loader</code>\u6216<code>plugin</code>\uFF0C\u9700\u8981\u65F6\u641C\u7D22\u4ED6\u4EEC\u7684\u6587\u6863\u5373\u53EF\u3002</p><ul><li>\u672C\u9879\u76EE\u4ED3\u5E93 <a href="https://github.com/qiyuor2/webpack-vue">qiyuor2/webpack-vue</a></li></ul><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://webpack.docschina.org/concepts/">webpack \u4E2D\u6587\u6587\u6863</a></li><li><a href="https://juejin.cn/post/6844903941180768269">webpack4 \u7EC3\u624B\u9879\u76EE-\u642D\u5EFA Vue \u9879\u76EE</a></li><li><a href="https://segmentfault.com/a/1190000018461758">\u4F7F\u7528 Webpack \u4E0E Babel \u914D\u7F6E ES6 \u5F00\u53D1\u73AF\u5883</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/build-vue-for-webpack.md");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
var __glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$m,
  date: date$m,
  tags: tags$i,
  category: category$i,
  summary: summary$m,
  meta: meta$m,
  "default": _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const title$l = "\u6DF1\u5165\u5B66\u4E60JavaScript\u6570\u636E\u7C7B\u578B";
const date$l = "2020/07/06 19:44:50";
const tags$h = ["JavaScript"];
const category$h = "\u6280\u672F";
const summary$l = "\u6570\u636E\u7C7B\u578B\u662F\u6211\u4EEC\u5B66\u4E60`JavaScript`\u65F6\u6700\u5148\u63A5\u89E6\u7684\u4E1C\u897F\uFF0C\u5B83\u662F`JavaScript`\u4E2D\u6700\u57FA\u7840\u7684\u77E5\u8BC6\uFF0C\u8FD9\u4E9B\u77E5\u8BC6\u770B\u4F3C\u7B80\u5355\uFF0C\u4F46\u5B9E\u5219\u6709\u7740\u8BB8\u591A\u521D\u5B66\u8005\u751A\u81F3\u662F\u90E8\u5206\u5B66\u4E60\u4E86\u591A\u5E74`JavaScript`\u7684\u8001\u624B\u6240\u4E0D\u4E86\u89E3\u7684\u77E5\u8BC6\u3002";
const meta$l = [{ "property": "og:title", "content": "\u6DF1\u5165\u5B66\u4E60JavaScript\u6570\u636E\u7C7B\u578B" }];
const _sfc_main$y = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u6DF1\u5165\u5B66\u4E60JavaScript\u6570\u636E\u7C7B\u578B", "date": "2020/07/06 19:44:50", "tags": ["JavaScript"], "category": "\u6280\u672F", "summary": "\u6570\u636E\u7C7B\u578B\u662F\u6211\u4EEC\u5B66\u4E60`JavaScript`\u65F6\u6700\u5148\u63A5\u89E6\u7684\u4E1C\u897F\uFF0C\u5B83\u662F`JavaScript`\u4E2D\u6700\u57FA\u7840\u7684\u77E5\u8BC6\uFF0C\u8FD9\u4E9B\u77E5\u8BC6\u770B\u4F3C\u7B80\u5355\uFF0C\u4F46\u5B9E\u5219\u6709\u7740\u8BB8\u591A\u521D\u5B66\u8005\u751A\u81F3\u662F\u90E8\u5206\u5B66\u4E60\u4E86\u591A\u5E74`JavaScript`\u7684\u8001\u624B\u6240\u4E0D\u4E86\u89E3\u7684\u77E5\u8BC6\u3002", "meta": [{ "property": "og:title", "content": "\u6DF1\u5165\u5B66\u4E60JavaScript\u6570\u636E\u7C7B\u578B" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u6DF1\u5165\u5B66\u4E60JavaScript\u6570\u636E\u7C7B\u578B", "meta": [{ "property": "og:title", "content": "\u6DF1\u5165\u5B66\u4E60JavaScript\u6570\u636E\u7C7B\u578B" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u6570\u636E\u7C7B\u578B\u662F\u6211\u4EEC\u5B66\u4E60<code>JavaScript</code>\u65F6\u6700\u5148\u63A5\u89E6\u7684\u4E1C\u897F\uFF0C\u5B83\u662F<code>JavaScript</code>\u4E2D\u6700\u57FA\u7840\u7684\u77E5\u8BC6\uFF0C\u8FD9\u4E9B\u77E5\u8BC6\u770B\u4F3C\u7B80\u5355\uFF0C\u4F46\u5B9E\u5219\u6709\u7740\u8BB8\u591A\u521D\u5B66\u8005\u751A\u81F3\u662F\u90E8\u5206\u5B66\u4E60\u4E86\u591A\u5E74<code>JavaScript</code>\u7684\u8001\u624B\u6240\u4E0D\u4E86\u89E3\u7684\u77E5\u8BC6\u3002</p><h2 id="%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B" tabindex="-1">\u6570\u636E\u7C7B\u578B</h2><p>ECSMAScript\u6807\u51C6\u4E2D\u89C4\u5B9A\u4E867\u79CD\u6570\u636E\u7C7B\u578B\uFF0C\u8FD97\u79CD\u6570\u636E\u7C7B\u578B\u53C8\u5206\u4E3A\u57FA\u672C\u7C7B\u578B\u548C\u5F15\u7528\u7C7B\u578B\u3002</p><p><strong>\u57FA\u672C\u7C7B\u578B</strong>\uFF1A</p><ul><li><code>Null</code>\uFF1A\u53EA\u5305\u542B\u4E00\u4E2A\u503C\uFF1A<code>null</code></li><li><code>Undefined</code>\uFF1A\u53EA\u5305\u542B\u4E00\u4E2A\u503C\uFF1A<code>undefined</code></li><li><code>Boolean</code>\uFF1A\u5305\u542B<code>true</code>\u548C<code>false</code></li><li><code>Number</code>\uFF1A\u6574\u6570\u6216\u6D6E\u70B9\u6570\uFF0C\u8FD8\u6709\u4E00\u4E9B\u7279\u6B8A\u503C\uFF08<code>-Infinity</code>\u3001<code>+Infinity</code>\u3001<code>NaN</code>\uFF09</li><li><code>String</code>\uFF1A\u5B57\u7B26\u4E32</li><li><code>Symbol</code>\uFF1A\u8868\u793A\u72EC\u4E00\u65E0\u4E8C\u7684\u503C\uFF08ES6\u52A0\u5165\uFF09</li></ul><p>ES10(ES2019)\u4E2D\u65B0\u589E\u4E86\u4E00\u79CD\u57FA\u672C\u7C7B\u578B<code>BigInt</code>\uFF0C\u53EF\u4EE5\u7528\u6765\u8868\u793A\u8D85\u51FA<code>number</code>\u5B89\u5168\u8303\u56F4\u7684\u4EFB\u610F\u7CBE\u5EA6\u6574\u6570\u3002</p><p><strong>\u5F15\u7528\u7C7B\u578B</strong>\uFF1A</p><ul><li><code>Object</code>\u5BF9\u8C61\uFF1A\u5305\u542B\u5BF9\u8C61\u3001\u6570\u7EC4\u3001\u51FD\u6570\u7B49\u3002</li></ul><h2 id="%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%8C%BA%E5%88%AB" tabindex="-1">\u57FA\u672C\u7C7B\u578B\u548C\u5F15\u7528\u7C7B\u578B\u7684\u533A\u522B</h2><h3 id="%E5%AD%98%E6%94%BE%E4%BD%8D%E7%BD%AE%E4%B8%8D%E5%90%8C" tabindex="-1">\u5B58\u653E\u4F4D\u7F6E\u4E0D\u540C</h3><p>\u5185\u5B58\u7A7A\u95F4\u88AB\u5206\u4E3A\u4E24\u79CD\uFF1A\u6808\u5185\u5B58\u548C\u5806\u5185\u5B58\u3002</p><p><strong>\u6808\u5185\u5B58</strong>\uFF1A</p><ul><li>\u5B58\u50A8\u7684\u503C\u5927\u5C0F\u56FA\u5B9A</li><li>\u7A7A\u95F4\u8F83\u5C0F</li><li>\u53EF\u4EE5\u76F4\u63A5\u64CD\u4F5C\uFF0C\u6548\u7387\u9AD8</li></ul><p><strong>\u5806\u5185\u5B58</strong>\uFF1A</p><ul><li>\u5B58\u50A8\u7684\u503C\u5927\u5C0F\u4E0D\u786E\u5B9A\uFF0C\u53EF\u4EE5\u52A8\u6001\u8C03\u6574</li><li>\u7A7A\u95F4\u8F83\u5927\uFF0C\u8FD0\u884C\u6548\u7387\u4F4E</li><li>\u65E0\u6CD5\u76F4\u63A5\u64CD\u4F5C\u5176\u5185\u90E8\uFF0C\u4F7F\u7528\u5F15\u7528\u5730\u5740\u8BFB\u53D6</li></ul><p>\u57FA\u672C\u7C7B\u578B\u5C31\u5C5E\u4E8E\u8F83\u4E3A\u7B80\u5355\u7684\u6570\u636E\uFF0C\u4E14\u4F1A\u88AB\u9891\u7E41\u4F7F\u7528\uFF0C\u56E0\u6B64\u901A\u5E38\u5B58\u653E\u5728\u6808\u4E2D\u3002</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2020070702stack.png" alt="\u57FA\u672C\u7C7B\u578B\u5B58\u50A8"></p><p>\u5F15\u7528\u7C7B\u578B\u5219\u662F<strong>\u540C\u65F6</strong>\u4FDD\u5B58\u5728\u6808\u548C\u5806\u5F53\u4E2D\uFF1A\u5F15\u7528\u7C7B\u578B\u7684\u5B9E\u9645\u503C\u5B58\u50A8\u5728\u5806\u5F53\u4E2D\uFF0C\u540C\u65F6\u5B83\u4F1A\u5728\u6808\u4E2D\u5B58\u50A8\u4E00\u4E2A\u6307\u5411\u5806\u5185\u5B58\u4E2D\u7684\u503C\u7684\u5730\u5740\u3002</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;nihao&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">obj2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20200707heap2.png" alt="\u5F15\u7528\u7C7B\u578B\u5B58\u50A8"></p><h3 id="%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B%E5%85%B7%E6%9C%89%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%80%A7" tabindex="-1">\u57FA\u672C\u7C7B\u578B\u5177\u6709\u4E0D\u53EF\u53D8\u6027</h3><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">;</span>
name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;HELLO&quot;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;hello&quot;</span>
</code></pre><p>\u7531\u4EE5\u4E0A\u4EE3\u7801\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u5982\u679C\u4E0D\u4F7F\u7528<code>name</code>\u53D8\u91CF\u672C\u8EAB\u53BB\u63A5\u6536<code>toUpperCase()</code>\u7684\u8FD4\u56DE\u503C\uFF0C\u90A3\u4E48<code>name</code>\u7684\u503C\u4E0D\u4F1A\u88AB\u6539\u53D8\u3002</p><p>\u7531\u4E8E\u6808\u4E2D\u7684\u5185\u5B58\u7A7A\u95F4\u5927\u5C0F\u56FA\u5B9A\uFF0C\u6240\u4EE5\u5B58\u50A8\u5728\u6808\u4E2D\u7684\u53D8\u91CF\u5C31\u662F\u4E0D\u53EF\u53D8\u7684\uFF0C\u4F46\u5728\u4F7F\u7528<code>JavaScript</code>\u65F6\u6211\u4EEC\u4F1A\u53D1\u73B0\u53EF\u4EE5\u6539\u53D8\u57FA\u672C\u7C7B\u578B\u7684\u503C\uFF0C\u4F8B\u5982\uFF1A</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
c <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><p>\u8FD9\u5B9E\u9645\u4E0A\u662F\u76F8\u5F53\u4E8E\u5728\u6808\u4E2D\u5F00\u8F9F\u4E86\u4E00\u7247\u65B0\u7684\u7A7A\u95F4\u7528\u6765\u5B58\u50A8<code>false</code>\u8FD9\u4E2A\u503C\uFF0C\u7136\u540E\u7528\u53D8\u91CF<code>c</code>\u6307\u5411\u8FD9\u4E2A\u503C\uFF0C\u5E76\u975E\u6539\u53D8\u539F\u672C\u7684<code>true</code>\u3002</p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/2020070703stack.png" alt="\u66F4\u6539\u57FA\u672C\u7C7B\u578B\u7684\u503C"></p><p>\u5F15\u7528\u7C7B\u578B\u5C31\u53EF\u4EE5\u5F88\u8F7B\u6613\u7684\u6539\u53D8\u4E86\uFF0C\u5B83\u4E0D\u9700\u8981\u4F7F\u7528\u53D8\u91CF\u672C\u8EAB(<code>obj1</code>)\u53BB\u518D\u6B21\u63A5\u6536\u65B0\u7684\u503C\u5C31\u53EF\u4EE5\u6539\u53D8\uFF0C\u4F8B\u5982\uFF1A</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;nihao&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
obj1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;nibuhao&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { name: &#39;nibuhao&#39; }</span>
</code></pre><h3 id="%E5%80%BC%E6%AF%94%E8%BE%83%E5%92%8C%E5%BC%95%E7%94%A8%E6%AF%94%E8%BE%83" tabindex="-1">\u503C\u6BD4\u8F83\u548C\u5F15\u7528\u6BD4\u8F83</h3><p>\u5BF9\u4E8E\u57FA\u672C\u7C7B\u578B\uFF0C\u6BD4\u8F83\u65F6\u4F1A\u76F4\u63A5\u6BD4\u8F83\u5B83\u4EEC\u7684\u503C\uFF0C\u76F8\u7B49\u8FD4\u56DE<code>true</code></p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> str1 <span class="token operator">=</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> str2 <span class="token operator">=</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str1 <span class="token operator">===</span> str2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><p>\u5BF9\u4E8E\u5F15\u7528\u7C7B\u578B\uFF0C\u6BD4\u8F83\u65F6\u4F1A\u6BD4\u8F83\u5B83\u4EEC\u7684\u5F15\u7528\u5730\u5740\uFF0C\u54EA\u6015\u4E24\u4E2A\u53D8\u91CF\u5177\u6709\u540C\u540D\u5C5E\u6027\uFF0C\u4E14\u540C\u540D\u5C5E\u6027\u7684\u503C\u76F8\u540C\uFF0C\u4F46\u662F\u56E0\u4E3A\u5B58\u50A8\u4F4D\u7F6E\u4E0D\u540C\uFF0C\u4E24\u8005\u4ECD\u7136\u4E0D\u76F8\u7B49</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;obj&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;obj&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1 <span class="token operator">===</span> obj2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20200707diff.png" alt=""></p><h3 id="%E8%B5%8B%E5%80%BC" tabindex="-1">\u8D4B\u503C</h3><p>\u4E0E\u4E0A\u9762\u7684\u4E24\u79CD\u6BD4\u8F83\u7C7B\u4F3C\uFF0C\u57FA\u672C\u7C7B\u578B\u8D4B\u503C\u65F6\u662F\u76F4\u63A5\u5C06\u503C\u7ED9\u53E6\u4E00\u4E2A\u53D8\u91CF\uFF0C\u800C\u5F15\u7528\u7C7B\u578B\u5219\u662F\u5C06\u5730\u5740\u7ED9\u53E6\u4E00\u4E2A\u53D8\u91CF</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> str1 <span class="token operator">=</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> str2 <span class="token operator">=</span> str1<span class="token punctuation">;</span>
str2 <span class="token operator">=</span> <span class="token string">&#39;World&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;Hello&quot;</span>
<span class="token comment">//str1\u7684\u503C\u6CA1\u53D8</span>
</code></pre><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;obj1&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> obj1<span class="token punctuation">;</span>
obj2<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;obj2&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;obj2&quot;</span>
<span class="token comment">// obj1\u7684\u503C\u6539\u53D8</span>
</code></pre><h2 id="null%E4%B8%8Eundefined" tabindex="-1">null\u4E0Eundefined</h2><ul><li><code>null</code>\u8868\u793A\u7A7A\u503C</li><li><code>undefined</code>\u8868\u793A\u201C\u7F3A\u5C11\u503C\u201D\uFF0C\u5373\u6B64\u5904\u5E94\u8BE5\u6709\u503C\uFF0C\u4F46\u662F\u8FD8\u672A\u5B9A\u4E49</li></ul><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre><p>\u5982\u679C\u5B66\u8FC7<code>C#</code>\u3001<code>Java</code>\u4E4B\u7C7B\u7684\u9759\u6001\u7C7B\u578B\u8BED\u8A00\u5C31\u4F1A\u77E5\u9053\uFF0C\u76F4\u63A5\u4F7F\u7528\u672A\u58F0\u660E\u7684\u53D8\u91CF\u4F1A\u76F4\u63A5\u62A5\u9519\uFF0C\u800C<code>JavaScript</code>\u662F\u52A8\u6001\u7C7B\u578B\u8BED\u8A00\uFF0C\u6210\u5458\u9664\u4E86\u5B58\u5728\u7A7A\u503C\u5916\uFF0C\u8FD8\u6709\u53EF\u80FD\u6839\u672C\u5C31\u4E0D\u5B58\u5728\uFF08\u56E0\u4E3A\u53EA\u6709\u5728\u8FD0\u884C\u65F6\u624D\u4F1A\u77E5\u9053\u662F\u5426\u5B58\u5728\uFF09\u3002</p><h2 id="symbol%E7%B1%BB%E5%9E%8B" tabindex="-1">Symbol\u7C7B\u578B</h2><p><code>symbol</code>\u53D8\u91CF\u9700\u8981\u4F7F\u7528<code>Symbol()</code>\u521B\u5EFA</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u6CE8\u610F\u6CA1\u6709new</span>
</code></pre><p><code>Symbol()</code>\u51FD\u6570\u63A5\u53D7\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\uFF0C\u7528\u6765\u63CF\u8FF0\u5373\u5C06\u521B\u5EFA\u7684<code>symbol</code>\u53D8\u91CF\uFF0C\u65E0\u8BBA\u4F20\u5165\u7684\u63CF\u8FF0\u662F\u5426\u76F8\u540C\uFF0C\u6700\u540E\u751F\u6210\u7684<code>symbol</code>\u4E00\u5B9A\u662F\u72EC\u4E00\u65E0\u4E8C\u7684</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> name1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> name2 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name1 <span class="token operator">===</span> name2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><p>\u5982\u679C\u4E00\u5B9A\u8981\u521B\u5EFA\u4E24\u4E2A\u4E00\u6A21\u4E00\u6837\u7684<code>symbol</code>\uFF0C\u9700\u8981\u4F7F\u7528<code>Symbol.for()</code></p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> name1 <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> name2 <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name1 <span class="token operator">===</span> name2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><p><code>Symbol</code>\u7C7B\u578B\u53EF\u4EE5\u7528\u4F5C\u5BF9\u8C61\u5C5E\u6027\uFF0C\u4F7F\u7528\u8BE5\u7C7B\u578B\u53EF\u4EE5\u4FDD\u8BC1\u5BF9\u8C61\u4E0D\u4F1A\u51FA\u73B0\u540C\u540D\u5C5E\u6027</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">&#39;Tom&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>\u4F7F\u7528<code>Symbol</code>\u7C7B\u578B\u4F5C\u4E3A\u5BF9\u8C61\u7684\u5C5E\u6027\u540D\u65F6\uFF0C\u662F\u65E0\u6CD5\u662F\u7528<code>for ... in</code>\u3001<code>Object.getOwnPropertyNames</code>\u548C<code>Object.keys()</code>\u83B7\u53D6\u5230\u8BE5\u5C5E\u6027\u7684\uFF0C\u53EF\u4EE5\u8C03\u7528\u7528\u6765\u4E13\u95E8\u83B7\u53D6<code>Symbol</code>\u7684\u65B9\u6CD5<code>Object.getOwnPropertySymbols()</code>\u6765\u83B7\u53D6</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">&#39;Tom&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [Symbol(name)]</span>
</code></pre><h2 id="%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2" tabindex="-1">\u6570\u636E\u7C7B\u578B\u8F6C\u6362</h2><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20200707table.png" alt=""></p><p>\u56FE\u7247\u6765\u6E90\uFF1A<a href="https://juejin.im/post/5cec1bcff265da1b8f1aa08f#heading-23">https://juejin.im/post/5cec1bcff265da1b8f1aa08f#heading-23</a></p><h3 id="%E5%AE%BD%E6%9D%BE%E7%AD%89%E5%8F%B7%EF%BC%88%3D%3D%EF%BC%89%E7%9A%84%E9%9A%90%E5%BC%8F%E8%BD%AC%E6%8D%A2" tabindex="-1">\u5BBD\u677E\u7B49\u53F7\uFF08==\uFF09\u7684\u9690\u5F0F\u8F6C\u6362</h3><p>\u4F7F\u7528<code>==</code>\u65F6\uFF0C\u5982\u679C\u7B49\u53F7\u4E24\u4FA7\u7684\u6570\u636E\u7C7B\u578B\u76F8\u540C\uFF0C\u90A3\u4E48\u6BD4\u8F83\u7ED3\u679C\u4E0E<code>===</code>\u76F8\u540C\uFF0C\u5426\u5219\u4F1A\u53D1\u751F\u9690\u5F0F\u8F6C\u6362</p><h4 id="nan" tabindex="-1">NaN</h4><p><code>NaN</code>\u548C\u4EFB\u4F55\u7C7B\u578B\u6BD4\u8F83\u90FD\u4F1A\u8FD4\u56DE<code>false</code>\uFF0C\u5305\u62EC\u4ED6\u81EA\u5DF1</p><pre class="language-js"><code class="language-js"><span class="token number">NaN</span> <span class="token operator">==</span> <span class="token number">NaN</span> <span class="token comment">// false</span>
</code></pre><h4 id="boolean%E7%B1%BB%E5%9E%8B%E4%B8%8E%E5%85%B6%E4%BB%96%E7%B1%BB%E5%9E%8B%E8%BF%9B%E8%A1%8C%E6%AF%94%E8%BE%83" tabindex="-1">Boolean\u7C7B\u578B\u4E0E\u5176\u4ED6\u7C7B\u578B\u8FDB\u884C\u6BD4\u8F83</h4><p>\u53EA\u8981<code>Boolean</code>\u7C7B\u578B\u53C2\u4E0E\u6BD4\u8F83\uFF0C\u8BE5<code>Boolean</code>\u7C7B\u578B\u7684\u503C\u90FD\u4F1A\u88AB\u8F6C\u6362\u4E3A<code>Number</code>\u7C7B\u578B\uFF0C<code>1</code>\u8F6C\u4E3A<code>true</code>\uFF0C<code>0</code>\u8F6C\u4E3A<code>false</code></p><pre class="language-js"><code class="language-js"><span class="token boolean">false</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token comment">// true</span>
<span class="token boolean">true</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token comment">// true</span>
<span class="token boolean">true</span> <span class="token operator">==</span> <span class="token number">2</span> <span class="token comment">// false</span>
</code></pre><p>\u5982\u679C\u5728\u4F7F\u7528<code>if</code>\u5224\u65AD\u65F6\uFF0C\u6211\u4EEC\u4F7F\u7528\u6570\u5B57\u4F5C\u4E3A\u5224\u65AD\u6761\u4EF6</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><p>\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u7B2C\u4E00\u4E2A\u5224\u65AD\u7ED3\u679C\u4E3A<code>true</code>\uFF0C\u800C\u7B2C\u4E8C\u4E2A\u7684\u7ED3\u679C\u4E3A<code>false</code>\uFF0C\u8FD9\u5C31\u662F\u56E0\u4E3A<code>true</code>\u88AB\u8F6C\u6362\u4E3A\u4E86<code>1</code>\uFF0C\u5224\u65AD\u6761\u4EF6\u53D8\u4E3A\u4E86<code>x == 1</code></p><h4 id="number%E7%B1%BB%E5%9E%8B%E5%92%8Cstring%E7%B1%BB%E5%9E%8B%E8%BF%9B%E8%A1%8C%E6%AF%94%E8%BE%83" tabindex="-1">Number\u7C7B\u578B\u548CString\u7C7B\u578B\u8FDB\u884C\u6BD4\u8F83</h4><p>\u8FD9\u4E24\u8005\u8FDB\u884C\u6BD4\u8F83\u65F6\uFF0C<code>String</code>\u7C7B\u578B\u4F1A\u88AB\u8F6C\u4E3A<code>Number</code>\u7C7B\u578B\uFF0C\u9664\u4E86\u7EAF\u6570\u5B57\u5B57\u7B26\u4E32\u6B63\u5E38\u8F6C\u6362\u4E3A<code>Number</code>\u7C7B\u578B\u5916\uFF0C\u7A7A\u5B57\u7B26\u4E32<code>&#39;&#39;</code>\u8F6C\u4E3A<code>0</code>\uFF0C\u79D1\u5B66\u8BA1\u6570\u6CD5\uFF08\u4F8B\u5982<code>1e11</code>\uFF09\u6B63\u5E38\u8F6C\u6362\uFF0C<code>Infinity</code>\u6B63\u5E38\u8F6C\u6362\uFF0C\u5176\u4ED6\u5168\u90E8\u8F6C\u6362\u4E3A<code>NaN</code></p><pre class="language-js"><code class="language-js"><span class="token string">&#39;&#39;</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token comment">// true</span>
<span class="token string">&#39;123&#39;</span> <span class="token operator">==</span> <span class="token number">123</span> <span class="token comment">// true</span>
<span class="token string">&#39;1e11&#39;</span> <span class="token operator">==</span> <span class="token number">1e11</span> <span class="token comment">// true</span>
<span class="token number">Infinity</span> <span class="token operator">==</span> <span class="token string">&#39;Infinity&#39;</span> <span class="token comment">// true</span>
<span class="token boolean">true</span> <span class="token operator">==</span> <span class="token string">&#39;1&#39;</span> <span class="token comment">// true</span>
<span class="token boolean">false</span> <span class="token operator">==</span> <span class="token string">&#39;0&#39;</span> <span class="token comment">// true</span>
</code></pre><h4 id="null%E4%B8%8Eundefined-1" tabindex="-1">null\u4E0Eundefined</h4><p>\u9664<code>null == undefined</code>\u7ED3\u679C\u4E3A<code>true</code>\u5916\uFF0C\u5176\u4ED6\u4EFB\u4F55\u7C7B\u578B\u548C<code>null</code>\u6216<code>undefined</code>\u6BD4\u8F83\u90FD\u4E3A<code>false</code></p><h4 id="%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B%E4%B8%8E%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B%E6%AF%94%E8%BE%83" tabindex="-1">\u57FA\u672C\u7C7B\u578B\u4E0E\u5F15\u7528\u7C7B\u578B\u6BD4\u8F83</h4><p><strong>ToPrimitive\u89C4\u5219</strong></p><p>\u9996\u5148\u6211\u4EEC\u8981\u5148\u4E86\u89E3<code>ToPrimitive</code>\u89C4\u5219\uFF0C\u5373\u5F15\u7528\u7C7B\u578B\u8F6C\u4E3A\u57FA\u672C\u7C7B\u578B</p><ul><li>\u5F53\u5F15\u7528\u7C7B\u578B\u9700\u8981\u88AB\u8F6C\u4E3A\u57FA\u672C\u7C7B\u578B\u65F6\uFF0C\u5B83\u4F1A\u5148\u67E5\u627E\u5BF9\u8C61\u7684<code>valueOf</code>\u65B9\u6CD5\uFF0C\u5982\u679C\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u57FA\u672C\u7C7B\u578B\u7684\u503C\uFF0C\u5219<code>ToPrimitive</code>\u7684\u7ED3\u679C\u5C31\u662F\u8FD9\u4E2A\u503C</li><li>\u5982\u679C<code>valueOf</code>\u4E0D\u5B58\u5728\u6216\u8005<code>valueOf</code>\u65B9\u6CD5\u8FD4\u56DE\u7684\u4E0D\u662F\u57FA\u672C\u7C7B\u578B\uFF0C\u5C31\u4F1A\u5C1D\u8BD5\u8C03\u7528\u5BF9\u8C61\u7684<code>toString</code>\u65B9\u6CD5\uFF0C\u7136\u540E\u4F7F\u7528<code>toString</code>\u7684\u8FD4\u56DE\u503C\u4F5C\u4E3A<code>ToPrimitive</code>\u7684\u7ED3\u679C</li><li>\u82E5<code>valueOf</code>\u548C<code>toString</code>\u90FD\u4E0D\u5B58\u5728\uFF0C\u6216\u8005\u6CA1\u6709\u8FD4\u56DE\u57FA\u672C\u7C7B\u578B\uFF0C\u5219\u629B\u51FA<code>TypeError</code>\u5F02\u5E38</li></ul><blockquote><p>\u5BF9\u4E8E\u4E0D\u540C\u7684\u5F15\u7528\u7C7B\u578B\uFF0C\u8BE5\u8FC7\u7A0B\u4F1A\u6709\u4E9B\u8BB8\u4E0D\u540C\uFF0C\u6BD4\u5982<code>Date</code>\u4F1A\u5148\u8C03\u7528<code>toString</code></p><p>\u5F15\u7528\u7C7B\u578B\u8F6C\u6362\u4E3A\u4E0D\u540C\u7684\u57FA\u672C\u7C7B\u578B\u4E5F\u4F1A\u6709\u4E00\u4E9B\u4E0D\u540C\uFF0C\u6BD4\u5982\uFF1A</p><ul><li>\u5F15\u7528\u7C7B\u578B\u8F6C\u6362\u4E3A<code>Number</code>\u7C7B\u578B\uFF0C\u5148\u8C03\u7528<code>valueOf</code>\uFF0C\u518D\u8C03\u7528<code>toString</code></li><li>\u5F15\u7528\u7C7B\u578B\u8F6C\u6362\u4E3A<code>String</code>\u7C7B\u578B\uFF0C\u5148\u8C03\u7528<code>toString</code>\uFF0C\u518D\u8C03\u7528<code>valueOf</code></li></ul><p>\u5177\u4F53\u8BF7\u53C2\u8003<a href="https://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive">ECMA\u6807\u51C6</a></p></blockquote><pre class="language-js"><code class="language-js"><span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">valueOf</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">toString</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">Number</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
<span class="token function">String</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -10</span>
</code></pre><p><strong>\u57FA\u672C\u7C7B\u578B\u4E0E\u5F15\u7528\u7C7B\u578B\u6BD4\u8F83</strong></p><p>\u6BD4\u8F83\u65F6\uFF0C\u5F15\u7528\u7C7B\u578B\u4F1A\u4F9D\u636E<code>ToPrimitive</code>\u89C4\u5219\u8F6C\u6362\u4E3A\u57FA\u672C\u7C7B\u578B</p><pre class="language-js"><code class="language-js"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

a <span class="token operator">==</span> <span class="token string">&#39;[object Object]&#39;</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object Object]</span>
b <span class="token operator">==</span> <span class="token string">&#39;1,2,3&#39;</span> <span class="token comment">// true</span>
b<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;1,2,3&quot;</span>
</code></pre><h2 id="%E5%88%A4%E6%96%AD%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B" tabindex="-1">\u5224\u65AD\u6570\u636E\u7C7B\u578B</h2><h3 id="typeof" tabindex="-1">typeof</h3><p><code>typeof</code>\u53EA\u80FD\u7528\u6765\u5224\u65AD\u4EE5\u4E0B\u51E0\u4E2A\u7C7B\u578B</p><pre class="language-js"><code class="language-js"><span class="token keyword">typeof</span> <span class="token string">&#39;str&#39;</span><span class="token punctuation">;</span>  <span class="token comment">// string</span>
<span class="token keyword">typeof</span> <span class="token number">123</span><span class="token punctuation">;</span>  <span class="token comment">// number</span>
<span class="token keyword">typeof</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">// boolean</span>
<span class="token keyword">typeof</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// symbol</span>
<span class="token keyword">typeof</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>  <span class="token comment">// undefined</span>
<span class="token keyword">typeof</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// function</span>
</code></pre><p>\u5BF9\u4E8E\u5F15\u7528\u7C7B\u578B\uFF08\u6570\u7EC4\u3001\u5BF9\u8C61\u7B49\uFF09\u4EE5\u53CA<code>null</code>\uFF0C<code>typeof</code>\u7684\u8FD4\u56DE\u503C\u5747\u4E3A<code>object</code></p><h3 id="instanceof" tabindex="-1">instanceof</h3><p><code>instanceof</code>\u53EF\u4EE5\u5224\u65AD\u5F15\u7528\u7C7B\u578B\u7684\u5177\u4F53\u7C7B\u578B</p><pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Array</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token operator">/</span><span class="token number">1</span><span class="token operator">/</span> <span class="token keyword">instanceof</span> <span class="token class-name">RegExp</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">Date</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><p>\u4F46\u662F\uFF0C<code>instanceof</code>\u540C\u6837\u6CA1\u6CD5\u5224\u65AD<code>null</code></p><pre class="language-js"><code class="language-js"><span class="token keyword">null</span> <span class="token keyword">instanceof</span> <span class="token class-name">null</span><span class="token punctuation">;</span> <span class="token comment">// Uncaught TypeError: Right-hand side of &#39;instanceof&#39; is not an object</span>
<span class="token keyword">null</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><p>\u5728<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof">MDN</a>\u4E2D\uFF0C<code>instanceof</code>\u88AB\u8FD9\u6837\u63CF\u8FF0\uFF1A</p><blockquote><p><strong><code>instanceof</code></strong> <strong>\u8FD0\u7B97\u7B26</strong>\u7528\u4E8E\u68C0\u6D4B\u6784\u9020\u51FD\u6570\u7684 <code>prototype</code> \u5C5E\u6027\u662F\u5426\u51FA\u73B0\u5728\u67D0\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578B\u94FE\u4E0A\u3002</p></blockquote><p>\u4E5F\u5C31\u662F\u8BF4<code>instanceof</code>\u8BBE\u8BA1\u7684\u521D\u8877\u5E76\u4E0D\u662F\u7528\u6765\u68C0\u6D4B\u6570\u636E\u7C7B\u578B\u7684\uFF0C\u56E0\u6B64\u5F88\u591A\u7C7B\u578B\u5B83\u4E5F\u65E0\u6CD5\u5224\u65AD</p><h3 id="object.prototype.tostring.call()" tabindex="-1">Object.prototype.toString.call()</h3><p><code>Object.prototype.toString.call()</code>\u5229\u7528<code>call</code>\u6765\u6539\u53D8<code>this</code>\u7684\u6307\u5411\uFF0C\u53EF\u4EE5\u8BA9\u8BE5\u65B9\u6CD5\u80FD\u591F\u83B7\u53D6\u5230\u4EFB\u610F\u53D8\u91CF\u7684<code>[[class]]</code>\u5C5E\u6027\uFF0C\u901A\u8FC7\u8BE5\u5C5E\u6027\u53EF\u4EE5\u5224\u65AD\u6240\u6709<code>JavaScript</code>\u7684\u5185\u7F6E\u7C7B\u578B</p><pre class="language-js"><code class="language-js"><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object Null]</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object Undefined]</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object Number]</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object Date]</span>
<span class="token comment">// ...</span>
</code></pre><p>\u4F46\u662F\u8BE5\u65B9\u6CD5\u5E76\u4E0D\u80FD\u5224\u65AD\u81EA\u5B9A\u4E49\u7C7B\u578B\uFF0C\u800C<code>instanceof</code>\u53EF\u4EE5\u5B9E\u73B0\u5BF9\u81EA\u5B9A\u4E49\u7C7B\u578B\u7684\u5224\u65AD</p><pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [object Object]</span>
<span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">Person</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><h2 id="%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99" tabindex="-1">\u53C2\u8003\u8D44\u6599</h2><ul><li><p><a href="https://juejin.im/post/5cec1bcff265da1b8f1aa08f#heading-34">\u3010JS \u8FDB\u9636\u3011\u4F60\u771F\u7684\u638C\u63E1\u53D8\u91CF\u548C\u7C7B\u578B\u4E86\u5417</a></p></li><li><p><a href="https://juejin.im/post/5bbda2b36fb9a05cfd27f55e">JavaScript\u7684\u6570\u636E\u7C7B\u578B\u53CA\u5176\u68C0\u6D4B</a></p></li><li><p><a href="https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html">undefined\u4E0Enull\u7684\u533A\u522B</a></p></li><li><p><a href="https://juejin.im/post/5bc5c752f265da0a9a399a62">\u4ECE\u4E00\u9053\u9762\u8BD5\u9898\u8BF4\u8D77\u2014js\u9690\u5F0F\u8F6C\u6362\u8E29\u5751\u5408\u96C6</a></p></li></ul></div>`);
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/deep-in-js-data-type.md");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
var __glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$l,
  date: date$l,
  tags: tags$h,
  category: category$h,
  summary: summary$l,
  meta: meta$l,
  "default": _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const title$k = "Electron\u8E29\u5751\u8BB0\u5F55";
const date$k = "2020/10/21 10:00:47";
const tags$g = ["JavaScript", "Electron", "NodeJs"];
const category$g = "\u6280\u672F";
const summary$k = "\u5FC3\u8840\u6765\u6F6E\u60F3\u505A\u4E00\u4E2APC\u7AEF\u5E94\u7528\uFF0C\u5C31\u6765\u5B66\u5B66Electron\uFF0C\u4EE5\u4E0B\u4E3A\u5B66\u4E60Electron\u65F6\u7684\u8E29\u5751\u8BB0\u5F55\u3002";
const meta$k = [{ "property": "og:title", "content": "Electron\u8E29\u5751\u8BB0\u5F55" }];
const _sfc_main$x = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "Electron\u8E29\u5751\u8BB0\u5F55", "date": "2020/10/21 10:00:47", "tags": ["JavaScript", "Electron", "NodeJs"], "category": "\u6280\u672F", "summary": "\u5FC3\u8840\u6765\u6F6E\u60F3\u505A\u4E00\u4E2APC\u7AEF\u5E94\u7528\uFF0C\u5C31\u6765\u5B66\u5B66Electron\uFF0C\u4EE5\u4E0B\u4E3A\u5B66\u4E60Electron\u65F6\u7684\u8E29\u5751\u8BB0\u5F55\u3002", "meta": [{ "property": "og:title", "content": "Electron\u8E29\u5751\u8BB0\u5F55" }] };
    expose({ frontmatter });
    const head$1 = { "title": "Electron\u8E29\u5751\u8BB0\u5F55", "meta": [{ "property": "og:title", "content": "Electron\u8E29\u5751\u8BB0\u5F55" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><h2 id="%E5%AE%89%E8%A3%85" tabindex="-1">\u5B89\u88C5</h2><p>\u5728\u56FD\u5185\u5B89\u88C5<code>electron</code>\u7684\u65F6\u5019\uFF0C\u53EF\u80FD\u4F1A\u56E0\u4E3A\u7F51\u7EDC\u539F\u56E0\u9047\u5230\u5361\u5728<code>Building fresh packages...</code>\uFF08yarn\uFF09\u6216\u8005\u662F\u5361\u5728<code>node install.js</code>\uFF08npm\uFF09\u8FD9\u4E00\u6B65\u4E0A\u3002</p><p>\u5728\u9879\u76EE\u7684\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA<code>.yarnrc</code>\u6216<code>.npmrc</code>\u7136\u540E\u8F93\u5165\u5982\u4E0B\u5185\u5BB9\u66F4\u6539\u5404\u4F9D\u8D56\u7684\u6E90\uFF0C\u5373\u53EF\u89E3\u51B3\u8BE5\u95EE\u9898\u3002</p><pre><code>registry &quot;https://registry.npm.taobao.org&quot;

sass_binary_site &quot;https://npm.taobao.org/mirrors/node-sass/&quot;
phantomjs_cdnurl &quot;http://cnpmjs.org/downloads&quot;
electron_mirror &quot;https://npm.taobao.org/mirrors/electron/&quot;
sqlite3_binary_host_mirror &quot;https://foxgis.oss-cn-shanghai.aliyuncs.com/&quot;
profiler_binary_host_mirror &quot;https://npm.taobao.org/mirrors/node-inspector/&quot;
chromedriver_cdnurl &quot;https://cdn.npm.taobao.org/dist/chromedriver&quot;
</code></pre><h2 id="c%2B%2B%E5%8C%85-rebuild" tabindex="-1">C++\u5305 rebuild</h2><p>\u4F7F\u7528 electron \u5C31\u907F\u4E0D\u5F00\u8981\u4F7F\u7528\u4E00\u4E9B\u7B2C\u4E09\u65B9\u7684 C++\u5305\uFF0C\u4F7F\u7528\u8FD9\u4E9B\u5305\u7684\u65F6\u5019\u9700\u8981\u6839\u636E node \u548C electron \u7684\u7248\u672C\u91CD\u65B0\u7F16\u8BD1\u3002</p><h3 id="%E6%89%8B%E5%8A%A8-rebuild" tabindex="-1">\u624B\u52A8 rebuild</h3><p>\u624B\u52A8\u7F16\u8BD1\u8981\u6839\u636E electron \u7684\u7248\u672C\u8BBE\u7F6E target\uFF0C\u7136\u540E\u518D\u6839\u636E node \u7684\u7248\u672C\u8BBE\u7F6E\u5BF9\u5E94\u7684 abi \u503C\uFF0C\uFF08\u8BE6\u89C1<a href="https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json">\u5BF9\u5E94\u8868</a>\uFF09</p><pre class="language-bash"><code class="language-bash">$ <span class="token function">npm</span> rebuild --runtime<span class="token operator">=</span>electron --target<span class="token operator">=</span><span class="token number">6.0</span>.12 --disturl<span class="token operator">=</span>https://atom.io/download/atom-shell --abi<span class="token operator">=</span><span class="token number">72</span>
</code></pre><h3 id="%E4%BD%BF%E7%94%A8-electron-rebuild" tabindex="-1">\u4F7F\u7528 electron-rebuild</h3><pre class="language-bash"><code class="language-bash"><span class="token function">yarn</span> <span class="token function">add</span> electron-rebuild -D <span class="token comment"># or npm install electron-rebuild --save-dev</span>
</code></pre><p>\u4E0B\u8F7D\u540E\u4F7F\u7528<code>npx electron-rebuild</code>\u5373\u53EF\u91CD\u65B0\u7F16\u8BD1\uFF0C\u6709\u65F6\u5019\u4F1A\u56E0\u4E3A\u7F51\u7EDC\u539F\u56E0\u6784\u5EFA\u65F6\u4E0B\u8F7D\u4F9D\u8D56\u5931\u8D25\uFF0C\u56E0\u6B64\u53EF\u4EE5\u901A\u8FC7<code>-d=http://npm.taobao.org/mirrors/atom-shell</code>\u5207\u6362\u4E3A\u6DD8\u5B9D\u955C\u50CF\uFF08\u597D\u4E45\u6CA1\u66F4\u65B0\u4E86\uFF09</p><blockquote><p><strong>\u6CE8\u610F</strong>\uFF1AWindows \u73AF\u5883\u4E0B\u5B89\u88C5 electron-rebuild \u9700\u8981\u5148\u5B89\u88C5<code>windows-build-tools</code></p></blockquote><h2 id="%E6%89%93%E5%8C%85" tabindex="-1">\u6253\u5305</h2><p>electron \u5E38\u7528\u7684\u6253\u5305\u5DE5\u5177\u6709\u4E24\u4E2A<code>electron-builder</code>\u548C<code>electron-forge</code>\uFF0C\u6211\u4F7F\u7528\u7684\u662F\u793E\u533A\u6D3B\u8DC3\u5EA6\u8F83\u9AD8\u7684<code>electron-builder</code>\uFF0Celectron \u6253\u5305\u65F6\u4F1A\u4E0B\u8F7D\u4E00\u4E9B\u5FC5\u8981\u7684\u4F9D\u8D56\uFF0C\u56E0\u6B64\u548C\u5B89\u88C5\u4F9D\u8D56\u3001rebuild \u5177\u6709\u540C\u6837\u7684\u95EE\u9898\u2014\u2014\u7F51\u7EDC\u95EE\u9898\uFF0C\u56E0\u6B64\u9700\u8981\u66F4\u6539\u4E0B\u8F7D\u5730\u5740\uFF0C\u4ECE\u6DD8\u5B9D\u955C\u50CF\u4E0B\u8F7D</p><pre><code>ELECTRON_BUILDER_BINARIES_MIRROR=https://npm.taobao.org/mirrors/electron-builder-binaries/
</code></pre><p>\u4E0D\u8FC7\u6211\u6539\u5B8C\u955C\u50CF\u6253\u5305\u4F9D\u7136\u662F\u663E\u793A\u7F51\u7EDC\u8D85\u65F6\uFF0C\u56E0\u6B64\u6211\u9009\u62E9\u4E86\u624B\u52A8\u6DFB\u52A0 nsis \u548C winCodeSign</p><p>\u4ECE\u6DD8\u5B9D\u955C\u50CF\u4E2D\u5206\u522B\u4E0B\u8F7D\u6240\u9700\u8981\u7248\u672C\u7684 nsis \u548C winCodeSign\uFF0C\u89E3\u538B\u540E\u5C06 nsis \u7684\u6574\u4E2A\u6587\u4EF6\u5939\u653E\u5230<code>C:\\Users\\admin\\AppData\\Local\\electron-builder\\Cache\\nsis</code>\u4E2D\uFF0C\u5C06 winCodeSign \u7684\u6574\u4E2A\u6587\u4EF6\u5939\u653E\u5230<code>C:\\Users\\admin\\AppData\\Local\\electron-builder\\Cache\\winCodeSign</code>\u4E2D\uFF0C\u5373\u53EF\u6210\u529F\u6253\u5305\u3002</p><h2 id="%E7%99%BD%E5%B1%8F%E9%97%AE%E9%A2%98" tabindex="-1">\u767D\u5C4F\u95EE\u9898</h2><h3 id="%E7%AE%80%E5%8D%95%E8%A7%A3%E5%86%B3" tabindex="-1">\u7B80\u5355\u89E3\u51B3</h3><ul><li>\u5728 ready-to-show \u7684\u65F6\u5019\u518D\u663E\u793A</li><li>\u8BBE\u7F6E\u7A97\u53E3\u5E95\u8272</li></ul><pre class="language-js"><code class="language-js">win <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BrowerWindow</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">600</span><span class="token punctuation">,</span>
  <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">300</span><span class="token punctuation">,</span>
  <span class="token literal-property property">webPreferences</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nodeIntegration</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">&#39;#2e2c29&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

win<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;ready-to-show&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  win<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="%E4%BD%BF%E7%94%A8%E5%8D%A0%E4%BD%8D%E5%9B%BE" tabindex="-1">\u4F7F\u7528\u5360\u4F4D\u56FE</h3><ul><li><a href="https://github.com/dengyaolong/electron-loading-window-example">https://github.com/dengyaolong/electron-loading-window-example</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/electron-learn.md");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
var __glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$k,
  date: date$k,
  tags: tags$g,
  category: category$g,
  summary: summary$k,
  meta: meta$k,
  "default": _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const title$j = "JavaScript\u5B9E\u73B0\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784";
const date$j = "2020/01/29 15:26:47";
const tags$f = ["JavaScript", "\u6570\u636E\u7ED3\u6784"];
const category$f = "\u6280\u672F";
const summary$j = "\u4F7F\u7528JavaScript\u5B9E\u73B0\u6808\u3001\u961F\u5217\u3001\u94FE\u8868\u3001\u96C6\u5408\u7B49\u5E38\u89C1\u6570\u636E\u7ED3\u6784\u3002\u53EF\u80FD\u4F1A\u6709\u70B9\u7528\uFF1F";
const meta$j = [{ "property": "og:title", "content": "JavaScript\u5B9E\u73B0\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784" }];
const _sfc_main$w = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "JavaScript\u5B9E\u73B0\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784", "date": "2020/01/29 15:26:47", "tags": ["JavaScript", "\u6570\u636E\u7ED3\u6784"], "category": "\u6280\u672F", "summary": "\u4F7F\u7528JavaScript\u5B9E\u73B0\u6808\u3001\u961F\u5217\u3001\u94FE\u8868\u3001\u96C6\u5408\u7B49\u5E38\u89C1\u6570\u636E\u7ED3\u6784\u3002\u53EF\u80FD\u4F1A\u6709\u70B9\u7528\uFF1F", "meta": [{ "property": "og:title", "content": "JavaScript\u5B9E\u73B0\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784" }] };
    expose({ frontmatter });
    const head$1 = { "title": "JavaScript\u5B9E\u73B0\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784", "meta": [{ "property": "og:title", "content": "JavaScript\u5B9E\u73B0\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u4F7F\u7528 JavaScript \u5B9E\u73B0\u6808\u3001\u961F\u5217\u3001\u94FE\u8868\u3001\u96C6\u5408\u7B49\u5E38\u89C1\u6570\u636E\u7ED3\u6784\u3002\u53EF\u80FD\u4F1A\u6709\u70B9\u7528\uFF1F</p><h2 id="%E6%A0%88(stack)" tabindex="-1">\u6808(Stack)</h2><p>\u5B9E\u9645\u4E0A JavaScript \u7684 Array \u672C\u8EAB\u5C31\u5177\u6709\u6808\u548C\u961F\u5217\u7684\u7279\u6027\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u501F\u52A9 Array \u6765\u5B9E\u73B0\u5B83\u4EEC\u3002</p><pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">Stack</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u83B7\u53D6\u6808\u9876\u5143\u7D20</span>
  <span class="token keyword">get</span> <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E9%98%9F%E5%88%97(queue)" tabindex="-1">\u961F\u5217(Queue)</h2><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Queue</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5165\u961F</span>
  <span class="token function">enqueue</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u51FA\u961F</span>
  <span class="token function">dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E4%BC%98%E5%85%88%E9%98%9F%E5%88%97" tabindex="-1">\u4F18\u5148\u961F\u5217</h3><p>\u961F\u5217\u7684\u5347\u7EA7\u7248\u672C\uFF0C\u7ED9\u6BCF\u4E2A\u5143\u7D20\u4E00\u4E2A\u4F18\u5148\u7EA7\uFF0C\u5165\u961F\u65F6\u4F1A\u5148\u6392\u5E8F\u3002\u8FD9\u91CC<code>PriorityQueue</code>\u7EE7\u627F\u81EA<code>Queue</code>\uFF0C\u6240\u4EE5\u53EA\u9700\u8981\u91CD\u5199<code>enqueue</code>\u65B9\u6CD5\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">PriorityQueue</span> <span class="token keyword">extends</span> <span class="token class-name">Queue</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
   * \u5165\u961F
   * @param {*} element \u5143\u7D20
   * @param {*} priority \u4F18\u5148\u7EA7
   */</span>
  <span class="token function">enqueue</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> priority</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> queueElement <span class="token operator">=</span> <span class="token punctuation">{</span> element<span class="token punctuation">,</span> priority <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isEmpty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">enqueue</span><span class="token punctuation">(</span>queueElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> preIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span><span class="token parameter">items</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> queueElement<span class="token punctuation">.</span>priority <span class="token operator">&lt;</span> items<span class="token punctuation">.</span>priority
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>preIndex <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>preIndex<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> queueElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">enqueue</span><span class="token punctuation">(</span>queueElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97" tabindex="-1">\u5FAA\u73AF\u961F\u5217</h3><p>\u5FAA\u73AF\u961F\u5217\u53EF\u4EE5\u60F3\u8C61\u4E3A\u4E00\u4E2A\u9996\u5C3E\u76F8\u8FDE\u7684\u5706\u73AF\uFF0C\u76F8\u8F83\u4E8E\u666E\u901A\u961F\u5217\uFF0C\u5B83\u66F4\u8282\u7701\u7A7A\u95F4\u3002</p><p>\u867D\u7136\u540C\u6837\u7EE7\u627F\u81EA<code>Queue</code>\uFF0C\u4F46\u57FA\u672C\u4E0A\u6240\u6709\u65B9\u6CD5\u90FD\u91CD\u5199\u4E86\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">LoopQueue</span> <span class="token keyword">extends</span> <span class="token class-name">Queue</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">maxSize</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>maxSize <span class="token operator">=</span> maxSize<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">//\u5934\u6307\u9488</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">//\u5C3E\u6307\u9488</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxSize <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">enqueue</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isFull<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isEmpty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxSize<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">]</span> <span class="token operator">=</span> element<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>isEmpty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxSize<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E9%93%BE%E8%A1%A8(linked-list)" tabindex="-1">\u94FE\u8868(Linked List)</h2><pre class="language-javascript"><code class="language-javascript"><span class="token comment">// \u8282\u70B9</span>
<span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>element <span class="token operator">=</span> element<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u94FE\u8868</span>
<span class="token keyword">class</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u8FFD\u52A0</span>
  <span class="token function">append</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      current<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/**
   * \u63D2\u5165
   * @param {*} element \u5143\u7D20
   * @param {*} position \u4F4D\u7F6E
   */</span>
  <span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> position</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>position <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> position <span class="token operator">&lt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
      <span class="token keyword">let</span> previous <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>position <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> position<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          previous <span class="token operator">=</span> current<span class="token punctuation">;</span>
          current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        node<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">;</span>
        previous<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">++</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/**
   * \u5220\u9664
   * @param {*} position \u4F4D\u7F6E
   */</span>
  <span class="token function">removeAt</span><span class="token punctuation">(</span><span class="token parameter">position</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>position <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> position <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
      <span class="token keyword">let</span> previous <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>position <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> position<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          previous <span class="token operator">=</span> current<span class="token punctuation">;</span>
          current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        previous<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token operator">--</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> current<span class="token punctuation">.</span>element<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u67E5\u627E\u5143\u7D20\u6240\u5728\u4F4D\u7F6E</span>
  <span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>element <span class="token operator">===</span> current<span class="token punctuation">.</span>element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> index<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      index<span class="token operator">++</span><span class="token punctuation">;</span>
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u6839\u636E\u5143\u7D20\u5220\u9664</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
    <span class="token keyword">let</span> string <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      string <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>current<span class="token punctuation">.</span>element<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -- </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    string <span class="token operator">+=</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> string<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E9%9B%86%E5%90%88(set)" tabindex="-1">\u96C6\u5408(Set)</h2><p>ES6 \u4E2D\u5F15\u5165\u4E86\u96C6\u5408\u7C7B\u578B\uFF0C\u53EF\u4EE5\u53C2\u8003\u4E00\u4E0B\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Set</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5224\u65AD\u5143\u7D20\u662F\u5426\u5B58\u5728</span>
  <span class="token function">has</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span>value<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5E76\u96C6</span>
  <span class="token function">union</span><span class="token punctuation">(</span><span class="token parameter">otherSet</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> unionSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>values<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> unionSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    otherSet<span class="token punctuation">.</span>values<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> unionSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>otherSet<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> unionSet<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u4EA4\u96C6</span>
  <span class="token function">intersection</span><span class="token punctuation">(</span><span class="token parameter">otherSet</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> intersectionSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>values<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>otherSet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        intersectionSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> intersectionSet<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5DEE\u96C6</span>
  <span class="token function">difference</span><span class="token punctuation">(</span><span class="token parameter">otherSet</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> differenceSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>values<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>otherSet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        differenceSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> differenceSet<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5B50\u96C6</span>
  <span class="token function">subset</span><span class="token punctuation">(</span><span class="token parameter">otherSet</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>values<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> otherSet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E5%AD%97%E5%85%B8(dictionary)" tabindex="-1">\u5B57\u5178(Dictionary)</h2><p>\u5728 JavaScript \u4E2D\uFF0C<code>Object</code>\u5BF9\u8C61\u5B9E\u9645\u4E0A\u5C31\u662F\u5B57\u5178\uFF0C\u90FD\u662F\u4EE5<code>{ key: value }</code>\u7684\u5F62\u5F0F\u5B58\u50A8\u6570\u636E\u7684\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Dictionary</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> r <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      r<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> r<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E5%93%88%E5%B8%8C%E8%A1%A8(hash-table)" tabindex="-1">\u54C8\u5E0C\u8868(Hash Table)</h2><p>\u54C8\u5E0C\u8868\u4E5F\u662F\u4EE5\u952E\u503C\u5BF9\u7684\u5F62\u5F0F\u5B58\u50A8\u6570\u636E\u7684\uFF0C\u4F46\u662F\u56E0\u4E3A\u6BCF\u4E2A\u6570\u636E\u90FD\u4F1A\u6839\u636E<code>key</code>\u751F\u6210\u552F\u4E00\u7684\u54C8\u5E0C\u503C\uFF0C\u6240\u4EE5\u67E5\u8BE2\u901F\u5EA6\u975E\u5E38\u5FEB\u3002</p><p>\u8FD9\u91CC\u6563\u5217\u51FD\u6570\u5C31\u662F\u7528\u6765\u751F\u6210\u54C8\u5E0C\u503C\u7684\uFF0C\u968F\u4FBF\u5199\u7684\uFF0C\u5E38\u7528\u7684\u6784\u9020\u6563\u5217\u51FD\u6570\u7684\u65B9\u6CD5\u5728\u7F51\u4E0A\u80FD\u67E5\u5230\u5F88\u591A\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">HashTable</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>table <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u6563\u5217\u51FD\u6570</span>
  <span class="token function">getHashCode</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> hash <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> key<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      hash <span class="token operator">+=</span> key<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>hash <span class="token operator">%</span> <span class="token number">64</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0xffffff</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">put</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> position <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getHashCode</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>table<span class="token punctuation">[</span>position<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>table<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getHashCode</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>table<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getHashCode</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E6%A0%91(tree)" tabindex="-1">\u6811(tree)</h2><p>\u6B63\u5E38\u7684\u4E8C\u53C9\u6811\u6CA1\u6709\u5FC5\u8981\u5B9E\u73B0\uFF0C\u8FD9\u91CC\u5B9E\u73B0\u4E00\u4E0B\u4E8C\u53C9\u641C\u7D22\u6811\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">BinarySearchTree</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">insert</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">insertNode</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> newNode</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>newNode<span class="token punctuation">.</span>data <span class="token operator">&lt;</span> node<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          node<span class="token punctuation">.</span>left <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">insertNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>right <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          node<span class="token punctuation">.</span>right <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">insertNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">insertNode</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">,</span> newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u4E2D\u5E8F\u904D\u5386</span>
  <span class="token function">inOrderTraverse</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">inOrderTraverseNode</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">inOrderTraverseNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">inOrderTraverseNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">inOrderTraverseNode</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u5148\u5E8F\u904D\u5386</span>
  <span class="token function">preOrderTraverse</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">preOrderTraverseNode</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">preOrderTraverseNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">preOrderTraverseNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">preOrderTraverseNode</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u540E\u5E8F\u904D\u5386</span>
  <span class="token function">postOrderTraverse</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">postOrderTraverseNode</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">postOrderTraverseNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">postOrderTraverseNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">postOrderTraverseNode</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">min</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>left <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> current<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>right <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current <span class="token operator">=</span> current<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> current<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">search</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>data <span class="token operator">!==</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">&lt;</span> current<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        current <span class="token operator">=</span> current<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        current <span class="token operator">=</span> current<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> current<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">removeNode</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>data <span class="token operator">===</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span>right <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> node<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>right <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> node<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">let</span> tempNode <span class="token operator">=</span> node<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>tempNode<span class="token punctuation">.</span>left <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          tempNode <span class="token operator">=</span> tempNode<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        node<span class="token punctuation">.</span>data <span class="token operator">=</span> tempNode<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">removeNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> tempNode<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>data <span class="token operator">&gt;</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">removeNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>data <span class="token operator">&lt;</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">removeNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">=</span> <span class="token function">removeNode</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E5%9B%BE(graph)" tabindex="-1">\u56FE(Graph)</h2><p>\u8FD9\u91CC\u5B9E\u73B0\u7684\u65E0\u5411\u56FE\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Graph</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vertices <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// \u5B58\u9876\u70B9</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>adjList <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// \u5B58\u8FB9</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u9876\u70B9</span>
  <span class="token function">addVertex</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vertices<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>adjList<span class="token punctuation">[</span>v<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u8FB9</span>
  <span class="token function">addEdge</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> w</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>adjList<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>adjList<span class="token punctuation">[</span>w<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// \u8F6C\u5316\u6210\u90BB\u63A5\u8868\u7684\u5F62\u5F0F\u7684\u5B57\u7B26\u4E32</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vertices<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vertices<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      str <span class="token operator">+=</span> v <span class="token operator">+</span> <span class="token string">&#39; =&gt; &#39;</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> e <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>adjList<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> e<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        str <span class="token operator">+=</span> <span class="token string">&#39; &#39;</span> <span class="token operator">+</span> e<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      str <span class="token operator">+=</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> str<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><p><a href="https://juejin.im/post/594dfe795188250d725a220a#heading-14">\u5728 JavaScript \u4E2D\u5B66\u4E60\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5</a></p></li><li><p><a href="https://segmentfault.com/a/1190000020011987">\u5E38\u89C1\u6570\u636E\u7ED3\u6784\u548C Javascript \u5B9E\u73B0\u603B\u7ED3</a></p></li></ul></div>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/js-datastructure.md");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
var __glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$j,
  date: date$j,
  tags: tags$f,
  category: category$f,
  summary: summary$j,
  meta: meta$j,
  "default": _sfc_main$w
}, Symbol.toStringTag, { value: "Module" }));
const title$i = "nodejs\u722C\u866B--\u6293\u53D6CSDN\u67D0\u7528\u6237\u5168\u90E8\u6587\u7AE0";
const date$i = "2020/02/11 13:30:55";
const tags$e = ["JavaScript", "Node.js", "\u722C\u866B", "Web Crawler"];
const category$e = "\u6280\u672F";
const summary$i = "\u6700\u8FD1\u6B63\u5728\u5B66\u4E60node.js\uFF0C\u5C31\u50CF\u641E\u4E00\u4E9B\u4E1C\u897F\u6765\u73A9\u73A9\uFF0C\u4E8E\u662F\u8FD9\u4E2A\u7B80\u5355\u7684\u722C\u866B\u5C31\u8BDE\u751F\u4E86\u3002";
const meta$i = [{ "property": "og:title", "content": "nodejs\u722C\u866B--\u6293\u53D6CSDN\u67D0\u7528\u6237\u5168\u90E8\u6587\u7AE0" }];
const _sfc_main$v = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "nodejs\u722C\u866B--\u6293\u53D6CSDN\u67D0\u7528\u6237\u5168\u90E8\u6587\u7AE0", "date": "2020/02/11 13:30:55", "tags": ["JavaScript", "Node.js", "\u722C\u866B", "Web Crawler"], "category": "\u6280\u672F", "summary": "\u6700\u8FD1\u6B63\u5728\u5B66\u4E60node.js\uFF0C\u5C31\u50CF\u641E\u4E00\u4E9B\u4E1C\u897F\u6765\u73A9\u73A9\uFF0C\u4E8E\u662F\u8FD9\u4E2A\u7B80\u5355\u7684\u722C\u866B\u5C31\u8BDE\u751F\u4E86\u3002", "meta": [{ "property": "og:title", "content": "nodejs\u722C\u866B--\u6293\u53D6CSDN\u67D0\u7528\u6237\u5168\u90E8\u6587\u7AE0" }] };
    expose({ frontmatter });
    const head$1 = { "title": "nodejs\u722C\u866B--\u6293\u53D6CSDN\u67D0\u7528\u6237\u5168\u90E8\u6587\u7AE0", "meta": [{ "property": "og:title", "content": "nodejs\u722C\u866B--\u6293\u53D6CSDN\u67D0\u7528\u6237\u5168\u90E8\u6587\u7AE0" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u6700\u8FD1\u6B63\u5728\u5B66\u4E60 node.js\uFF0C\u5C31\u50CF\u641E\u4E00\u4E9B\u4E1C\u897F\u6765\u73A9\u73A9\uFF0C\u4E8E\u662F\u8FD9\u4E2A\u7B80\u5355\u7684\u722C\u866B\u5C31\u8BDE\u751F\u4E86\u3002</p><h2 id="%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C" tabindex="-1">\u51C6\u5907\u5DE5\u4F5C</h2><ol><li>node.js \u722C\u866B\u80AF\u5B9A\u8981\u5148\u5B89\u88C5<a href="https://nodejs.org/zh-cn/">node.js</a>\u73AF\u5883</li><li>\u521B\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939</li><li>\u5728\u8BE5\u6587\u4EF6\u5939\u6253\u5F00\u547D\u4EE4\u884C\uFF0C\u6267\u884C<code>npm init</code>\u521D\u59CB\u5316\u9879\u76EE</li></ol><h2 id="%E6%AD%A3%E5%BC%8F%E5%BC%80%E5%A7%8B" tabindex="-1">\u6B63\u5F0F\u5F00\u59CB</h2><h3 id="%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96" tabindex="-1">\u5B89\u88C5\u4F9D\u8D56</h3><ul><li>express \u7528\u6765\u642D\u5EFA\u4E00\u4E2A\u7B80\u5355 http \u670D\u52A1\u5668\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528 node \u539F\u751F api</li><li>cheerio \u76F8\u5F53\u4E8E node \u7248\u7684 jQuery\uFF0C\u7528\u6765\u89E3\u6790\u9875\u9762</li><li>superagent \u7528\u6765\u8BF7\u6C42\u76EE\u6807\u9875\u9762</li><li>eventproxy \u89E3\u51B3\u540C\u65F6\u5904\u7406\u591A\u4E2A\u9875\u9762\u7684\u95EE\u9898</li></ul><p>\u76F4\u63A5\u4F7F\u7528<code>npm install express cheerio superagent eventproxy </code>\u6765\u5B89\u88C5\u4F9D\u8D56\u5305\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u7528\u522B\u7684\u65B9\u6CD5\u3002</p><h3 id="%E5%88%9B%E5%BB%BA%E5%BB%BA%E5%A5%BD%E7%9B%AE%E5%BD%95" tabindex="-1">\u521B\u5EFA\u5EFA\u597D\u76EE\u5F55</h3><pre class="language-shell"><code class="language-shell">node-spider-csdn
\u251C\u2500 .gitignore
\u251C\u2500 node_modules
\u251C\u2500 README.md
\u251C\u2500 index.js 			\u9879\u76EE\u5165\u53E3
\u251C\u2500 package-lock.json
\u251C\u2500 package.json
\u2514\u2500 routes
  \u2514\u2500 csdn.js			\u722C\u866B\u4E3B\u8981\u4EE3\u7801
</code></pre><h3 id="%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-http-%E6%9C%8D%E5%8A%A1%E5%99%A8" tabindex="-1">\u521B\u5EFA\u4E00\u4E2A Http \u670D\u52A1\u5668</h3><p>\u5728<code>index.js</code>\u6587\u4EF6\u4E2D\uFF0C\u5B9E\u4F8B\u5316\u4E00\u4E2A<code>express</code>\u5BF9\u8C61\uFF0C\u542F\u52A8\u4E00\u4E2A Http \u670D\u52A1</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;running in http://127.0.0.1:3000&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u8FD9\u6837\u5C31\u542F\u52A8\u4E86\u4E00\u4E2A\u7B80\u5355\u7684 Http \u672C\u5730\u670D\u52A1\uFF0C\u6267\u884C<code>node index.js</code>\u540E\u901A\u8FC7<code>http://127.0.0.1:3000</code>\u5C31\u53EF\u4EE5\u8BBF\u95EE\u5230\u8FD9\u4E2A\u670D\u52A1\u5668\u3002\u6709\u5173 Express \u7684\u66F4\u591A\u5185\u5BB9\u53EF\u4EE5\u53C2\u8003<a href="https://expressjs.com/zh-cn/">\u5B98\u65B9\u6587\u6863</a>\u3002</p><h3 id="%E7%BC%96%E5%86%99csdn.js%E6%A8%A1%E5%9D%97" tabindex="-1">\u7F16\u5199<code>csdn.js</code>\u6A21\u5757</h3><p>\u5148\u5F15\u5165<code>csdn.js</code>\u6587\u4EF6\u5E76\u4E14\u6DFB\u52A0\u8DEF\u7531</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> csdn <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./routes/csdn.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>csdn<span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;running in http://127.0.0.1:3000&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u7136\u540E\u5F00\u59CB\u7F16\u5199<code>csdn.js</code></p><h4 id="%E6%95%B4%E4%BD%93%E7%BB%93%E6%9E%84" tabindex="-1">\u6574\u4F53\u7ED3\u6784</h4><pre class="language-js"><code class="language-js"><span class="token comment">// \u5F15\u5165\u9700\u8981\u7684\u7B2C\u4E09\u65B9\u5305</span>
<span class="token keyword">const</span> cheerio <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;cheerio&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> superagent <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;superagent&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> eventproxy <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;eventproxy&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> express<span class="token punctuation">.</span><span class="token function">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u6302\u8F7D\u8DEF\u7531</span>
<span class="token keyword">const</span> ep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">eventproxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/csdn/:name&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// \u7528\u6237id</span>
  <span class="token comment">// \u5177\u4F53\u5B9E\u73B0...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u5C06router\u66B4\u9732\u51FA\u53BB</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router<span class="token punctuation">;</span>
</code></pre><h4 id="%E5%88%86%E6%9E%90%E9%A1%B5%E9%9D%A2" tabindex="-1">\u5206\u6790\u9875\u9762</h4><p>\u6574\u4F53\u7ED3\u6784\u5199\u597D\u540E\u5C31\u8981\u5F00\u59CB\u5206\u6790 CSDN \u7528\u6237\u6587\u7AE0\u9875\u9762\u7684 HTML \u4E86\u3002</p><p>\u968F\u4FBF\u627E\u4E00\u4E2A\u4EBA\u7684\u535A\u5BA2\uFF0C\u7ECF\u8FC7\u89C2\u5BDF\u53D1\u73B0\uFF1A</p><ul><li>\u539F\u521B\u6587\u7AE0\u7684\u5B8C\u6574 url:<code>https://blog.csdn.net/l1028386804/article/list/2?t=1</code></li><li>CSDN \u7684\u6587\u7AE0\u5217\u8868\u662F 40 \u7BC7\u4E00\u9875</li><li>\u5206\u9875\u63A7\u4EF6\u662F\u52A8\u6001\u751F\u6210\u7684\uFF0C\u6240\u4EE5\u65E0\u6CD5\u76F4\u63A5\u901A\u8FC7 HTML \u89E3\u6790\u83B7\u5F97</li></ul><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/someoneblog.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/someoneblog-1.png" alt=""></p><p>\u7136\u540E\u6211\u4EEC\u901A\u8FC7\u5F00\u53D1\u8005\u5DE5\u5177\u67E5\u770B\u6587\u7AE0\u5217\u8868\u7ED3\u6784\uFF0C\u53EF\u4EE5\u53D1\u73B0\uFF1A</p><ul><li>\u6587\u7AE0\u4FE1\u606F\u90FD\u5728\u7C7B\u540D\u4E3A<code>article-item-box</code>\u7684\u76D2\u5B50\u4E2D</li><li>id \u4FE1\u606F\u5728\u8BE5\u76D2\u5B50\u7684<code>data-articleid</code>\u5C5E\u6027\u4E2D</li></ul><p>\u8FD8\u6709\u4E00\u4E9B\u5176\u4ED6\u7684\u4FE1\u606F\u90FD\u5F88\u5BB9\u6613\u80FD\u67E5\u5230\uFF0C\u6BD4\u5982\u535A\u4E3B\u539F\u521B\u6587\u7AE0\u603B\u6570\u503C\u7B49\uFF0C\u53EF\u4EE5\u5728\u4EE5\u540E\u9700\u8981\u7684\u65F6\u5019\u518D\u8FC7\u6765\u67E5\u770B\u3002</p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/someoneblog-2.png" alt=""></p><h4 id="%E8%8E%B7%E5%8F%96%E6%89%80%E6%9C%89%E6%96%87%E7%AB%A0%E9%A1%B5%E9%9D%A2" tabindex="-1">\u83B7\u53D6\u6240\u6709\u6587\u7AE0\u9875\u9762</h4><p>\u56E0\u4E3A\u65E0\u6CD5\u76F4\u63A5\u83B7\u5F97\u5206\u9875\u4FE1\u606F\uFF0C\u6240\u4EE5\u6211\u4EEC\u901A\u8FC7<code>\u6587\u7AE0\u603B\u6570 / \u6BCF\u9875\u6587\u7AE0\u6570</code>\u6765\u83B7\u53D6\u6240\u6709\u7684\u9875\u9762\u3002</p><p>\u9996\u5148\u83B7\u53D6\u6587\u7AE0\u7684\u603B\u6570\uFF1A</p><pre class="language-js"><code class="language-js"><span class="token comment">/**
 * \u83B7\u53D6\u603B\u6587\u7AE0\u6570\u76EE
 * @param {String} url \u9875\u9762\u8DEF\u5F84
 * @param {Function} callback \u56DE\u8C03
 */</span>
<span class="token keyword">let</span> <span class="token function-variable function">getArticleNum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  superagent<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">err = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>err<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> $ <span class="token operator">=</span> cheerio<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>html<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.data-info dl&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">&#39;title&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">callback</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>\u7136\u540E\u5229\u7528\u7B80\u5355\u7684\u5FAA\u73AF\u83B7\u53D6\u6240\u6709\u6587\u7AE0\u9875\u9762\uFF1A</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/csdn/:name&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
  <span class="token function">getArticleNum</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">https://blog.csdn.net/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> pages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// \u4FDD\u5B58\u8981\u6293\u53D6\u7684\u9875\u9762</span>

    <span class="token keyword">let</span> pageNum <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>num <span class="token operator">/</span> <span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8BA1\u7B97\u4E00\u5171\u6709\u591A\u5C11\u9875\u9762</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> pageNum<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      pages<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">https://blog.csdn.net/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/article/list/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?t=1</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
</code></pre><p>\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7<code>console.log()</code>\u6216\u8005<code>res.send()</code>\u6765\u67E5\u770B\u83B7\u53D6\u7684\u7F51\u5740\u662F\u5426\u6B63\u786E</p><h4 id="%E9%81%8D%E5%8E%86%E8%8E%B7%E5%8F%96%E6%89%80%E6%9C%89%E9%A1%B5%E9%9D%A2%E7%9A%84-html" tabindex="-1">\u904D\u5386\u83B7\u53D6\u6240\u6709\u9875\u9762\u7684 HTML</h4><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/csdn/:name&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>name<span class="token punctuation">;</span>

  <span class="token function">getArticleNum</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">https://blog.csdn.net/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> pages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> articleData <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// \u4FDD\u5B58\u6240\u6709\u6587\u7AE0\u6570\u636E</span>

    <span class="token keyword">let</span> pageNum <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>num <span class="token operator">/</span> <span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8BA1\u7B97\u4E00\u5171\u6709\u591A\u5C11\u9875\u9762</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> pageNum<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      pages<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">https://blog.csdn.net/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/article/list/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?t=1</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u83B7\u53D6\u6240\u6709\u9875\u9762\u7684\u6587\u7AE0\u4FE1\u606F</span>
    pages<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">targetUrl</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      superagent<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>targetUrl<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">err </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>err<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">let</span> $ <span class="token operator">=</span> cheerio<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>html<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// \u5F53\u524D\u9875\u9762\u7684\u6587\u7AE0\u5217\u8868</span>
        <span class="token keyword">let</span> articlesHtml <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.article-list .article-item-box&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// \u904D\u5386\u5F53\u524D\u9875\u7684\u6587\u7AE0\u5217\u8868</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> articlesHtml<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// \u89E3\u6790\u83B7\u53D6\u6587\u7AE0\u4FE1\u606F</span>
          <span class="token comment">// push\u5230articleData\u4E2D</span>
          <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
</code></pre><h4 id="%E8%A7%A3%E6%9E%90%E6%96%87%E7%AB%A0%E4%BF%A1%E6%81%AF" tabindex="-1">\u89E3\u6790\u6587\u7AE0\u4FE1\u606F</h4><p>\u56E0\u4E3A\u83B7\u53D6\u5230\u7684\u6709\u4E9B\u6587\u672C\u4E2D\u7A7A\u683C\u592A\u591A\uFF0C\u6240\u4EE5\u9700\u8981\u7528\u5230\u6B63\u5219\u8868\u8FBE\u5F0F\u6765\u53BB\u9664\u591A\u4F59\u7684\u7A7A\u683C\u3002</p><p><code>cheerio</code>\u5BF9\u4E8E Document \u7684\u64CD\u4F5C\u548C<code>jQuery</code>\u57FA\u672C\u4E00\u6837\uFF0C\u6240\u4EE5\u6709\u524D\u7AEF\u57FA\u7840\u7684\u53EF\u4EE5\u5F88\u8F7B\u677E\u4E0A\u624B\u3002</p><pre class="language-js"><code class="language-js"><span class="token comment">/**
 * \u89E3\u6790html\u5B57\u7B26\u4E32\uFF0C\u83B7\u53D6\u6587\u7AE0\u4FE1\u606F
 * @param {String} html \u5305\u542B\u6587\u7AE0\u4FE1\u606F\u7684html
 * @param {Number} index \u6587\u7AE0\u7D22\u5F15
 */</span>
<span class="token keyword">let</span> <span class="token function-variable function">analysisHtml</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">html<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> html<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">&#39;data-articleid&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> html<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;h4 a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">link</span><span class="token operator">:</span> html<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">abstract</span><span class="token operator">:</span> html<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;.content a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">shared_time</span><span class="token operator">:</span> html
      <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;.info-box .date&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">read_count</span><span class="token operator">:</span> html
      <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;.info-box .read-num .num&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">comment_count</span><span class="token operator">:</span> html
      <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;.info-box .read-num .num&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>
<span class="token comment">// \u904D\u5386\u5F53\u524D\u9875\u7684\u6587\u7AE0\u5217\u8868</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> articlesHtml<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> article <span class="token operator">=</span> <span class="token function">analysisHtml</span><span class="token punctuation">(</span>articlesHtml<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  articleData<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
<span class="token comment">// ...</span>
</code></pre><p>\u6211\u4EEC\u5DF2\u7ECF\u83B7\u53D6\u5230\u6240\u6709\u6587\u7AE0\u7684\u4FE1\u606F\u6570\u636E\uFF0C\u4F46\u662F\u56E0\u4E3A\u83B7\u53D6\u5404\u4E2A\u9875\u9762\u7684\u6587\u7AE0\u65F6\u662F\u5E76\u53D1\u5F02\u6B65\u8FDB\u884C\u7684\uFF0C\u6240\u4EE5\u8981\u540C\u65F6\u5229\u7528\u8FD9\u4E9B\u6570\u636E\u7279\u6B8A\u7684\u65B9\u6CD5\u3002</p><h4 id="%E5%A4%84%E7%90%86%E5%B9%B6%E5%8F%91%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C" tabindex="-1">\u5904\u7406\u5E76\u53D1\u5F02\u6B65\u64CD\u4F5C</h4><p>\u8FD9\u91CC\u6211\u4F7F\u7528\u7684\u662F\u201C\u8BA1\u6570\u5668\u201D<code>eventproxy</code>\uFF0C\u8FD8\u6709\u5F88\u591A\u5176\u4ED6\u7684\u65B9\u6CD5\u90FD\u53EF\u4EE5\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u3002</p><pre class="language-js"><code class="language-js"><span class="token comment">// ...</span>
pages<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">targetUrl</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  superagent<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>targetUrl<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">err </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>err<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> $ <span class="token operator">=</span> cheerio<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>html<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> articlesHtml <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&#39;.article-list .article-item-box&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> articlesHtml<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> article <span class="token operator">=</span> <span class="token function">analysisHtml</span><span class="token punctuation">(</span>articlesHtml<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
      articleData<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>article<span class="token punctuation">)</span><span class="token punctuation">;</span>

      ep<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;blogArtc&#39;</span><span class="token punctuation">,</span> article<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8BA1\u6570\u5668</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u5F53\u6240\u6709&#39;blogArtc&#39;\u5B8C\u6210\u540E\uFF0C\u89E6\u53D1\u56DE\u8C03</span>
ep<span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token string">&#39;blogArtc&#39;</span><span class="token punctuation">,</span> num<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">status_code</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> data<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
</code></pre><p>\u8FD9\u6837\uFF0C\u4E00\u4E2A\u7B80\u5355\u7684 node \u722C\u866B\u5C31\u5199\u597D\u4E86\uFF0C\u6267\u884C<code>node index.js</code>\u542F\u52A8\u670D\u52A1\u540E\uFF0C\u5728\u6D4F\u89C8\u5668\u4E2D\u8F93\u5165<code>http://127.0.0.1:3000/csdn/xxxx</code>\u5C31\u53EF\u4EE5\u83B7\u5F97 xxxx\uFF08\u8FD9\u662F id\uFF09\u7684\u5168\u90E8\u6587\u7AE0\u4E86\u3002</p><h2 id="%E5%AE%8C%E6%95%B4%E4%BB%A3%E7%A0%81" tabindex="-1">\u5B8C\u6574\u4EE3\u7801</h2><ul><li><a href="https://github.com/qiyuor2/node-spider-csdn">node-spider-csdn</a></li></ul><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><p><a href="https://juejin.im/post/5b4f007fe51d4519277b9707#heading-1">\u5206\u5206\u949F\u6559\u4F60\u7528 node.js \u5199\u4E2A\u722C\u866B</a></p></li><li><p><a href="https://www.cnblogs.com/coco1s/p/4954063.html">\u3010nodeJS \u722C\u866B\u3011\u524D\u7AEF\u722C\u866B\u7CFB\u5217 \u2013 \u5C0F\u722C\u300C\u535A\u5BA2\u56ED\u300D</a></p></li><li><p><a href="https://github.com/jiayisheji/blog/issues/7">10 \u5206\u949F\u6559\u4F60\u64B8\u4E00\u4E2A nodejs \u722C\u866B\u7CFB\u7EDF</a></p></li><li><p><a href="https://www.jianshu.com/p/a86bd4bd48c9">node.js \u5B66\u4E60\u7B14\u8BB0 004:\u4F7F\u7528 eventproxy \u63A7\u5236\u5E76\u53D1</a></p></li></ul></div>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/node-spider-csdn.md");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
var __glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$i,
  date: date$i,
  tags: tags$e,
  category: category$e,
  summary: summary$i,
  meta: meta$i,
  "default": _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const title$h = "\u5229\u7528PicGo\u3001GitHub\u548CjsDelivr\u642D\u5EFA\u56FE\u5E8A";
const date$h = "2020/01/28 23:24:12";
const tags$d = ["GitHub", "jsDelivr", "PicGo", "CDN"];
const category$d = "\u5DE5\u5177";
const summary$h = "\u4E00\u4E2A\u9AD8\u901F\u7A33\u5B9A\u7684\u56FE\u5E8A\u5BF9\u4E8E\u6BCF\u4E00\u4E2A\u5199\u535A\u5BA2\u7684\u4EBA\u6765\u8BF4\u90FD\u5F88\u91CD\u8981\uFF0C\u4E4B\u524D\u5927\u90E8\u5206\u4EBA\u7684\u9009\u62E9\u53EF\u80FD\u90FD\u662F\u5229\u7528\u5FAE\u535A\u642D\u5EFA\u56FE\u5E8A\uFF0C\u4F46\u662F\u4ECE2019\u5E744\u6708\u5F00\u59CB\u5FAE\u535A\u5F00\u542F\u4E86\u9632\u76D7\u94FE\uFF0C\u5BFC\u81F4\u6240\u6709\u4F9D\u8D56\u5FAE\u535A\u56FE\u5E8A\u7684\u56FE\u7247\u5168\u90E8\u65E0\u6CD5\u663E\u793A\u3002\u5229\u7528PicGo\u5C06\u56FE\u7247\u4E0A\u4F20\u5230GitHub\u4ED3\u5E93\uFF0C\u518D\u4F7F\u7528jsDelivr\u4F18\u5316\u5BF9\u4E8E\u6211\u4EEC\u6765\u8BF4\u4F1A\u662F\u4E00\u4E2A\u4E0D\u9519\u7684\u9009\u62E9\u3002";
const meta$h = [{ "property": "og:title", "content": "\u5229\u7528PicGo\u3001GitHub\u548CjsDelivr\u642D\u5EFA\u56FE\u5E8A" }];
const _sfc_main$u = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u5229\u7528PicGo\u3001GitHub\u548CjsDelivr\u642D\u5EFA\u56FE\u5E8A", "date": "2020/01/28 23:24:12", "tags": ["GitHub", "jsDelivr", "PicGo", "CDN"], "category": "\u5DE5\u5177", "summary": "\u4E00\u4E2A\u9AD8\u901F\u7A33\u5B9A\u7684\u56FE\u5E8A\u5BF9\u4E8E\u6BCF\u4E00\u4E2A\u5199\u535A\u5BA2\u7684\u4EBA\u6765\u8BF4\u90FD\u5F88\u91CD\u8981\uFF0C\u4E4B\u524D\u5927\u90E8\u5206\u4EBA\u7684\u9009\u62E9\u53EF\u80FD\u90FD\u662F\u5229\u7528\u5FAE\u535A\u642D\u5EFA\u56FE\u5E8A\uFF0C\u4F46\u662F\u4ECE2019\u5E744\u6708\u5F00\u59CB\u5FAE\u535A\u5F00\u542F\u4E86\u9632\u76D7\u94FE\uFF0C\u5BFC\u81F4\u6240\u6709\u4F9D\u8D56\u5FAE\u535A\u56FE\u5E8A\u7684\u56FE\u7247\u5168\u90E8\u65E0\u6CD5\u663E\u793A\u3002\u5229\u7528PicGo\u5C06\u56FE\u7247\u4E0A\u4F20\u5230GitHub\u4ED3\u5E93\uFF0C\u518D\u4F7F\u7528jsDelivr\u4F18\u5316\u5BF9\u4E8E\u6211\u4EEC\u6765\u8BF4\u4F1A\u662F\u4E00\u4E2A\u4E0D\u9519\u7684\u9009\u62E9\u3002", "meta": [{ "property": "og:title", "content": "\u5229\u7528PicGo\u3001GitHub\u548CjsDelivr\u642D\u5EFA\u56FE\u5E8A" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u5229\u7528PicGo\u3001GitHub\u548CjsDelivr\u642D\u5EFA\u56FE\u5E8A", "meta": [{ "property": "og:title", "content": "\u5229\u7528PicGo\u3001GitHub\u548CjsDelivr\u642D\u5EFA\u56FE\u5E8A" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u4E00\u4E2A\u9AD8\u901F\u7A33\u5B9A\u7684\u56FE\u5E8A\u5BF9\u4E8E\u6BCF\u4E00\u4E2A\u5199\u535A\u5BA2\u7684\u4EBA\u6765\u8BF4\u90FD\u5F88\u91CD\u8981\uFF0C\u4E4B\u524D\u5927\u90E8\u5206\u4EBA\u7684\u9009\u62E9\u53EF\u80FD\u90FD\u662F\u5229\u7528\u5FAE\u535A\u642D\u5EFA\u56FE\u5E8A\uFF0C\u4F46\u662F\u4ECE 2019 \u5E74 4 \u6708\u5F00\u59CB\u5FAE\u535A\u5F00\u542F\u4E86\u9632\u76D7\u94FE\uFF0C\u5BFC\u81F4\u6240\u6709\u4F9D\u8D56\u5FAE\u535A\u56FE\u5E8A\u7684\u56FE\u7247\u5168\u90E8\u65E0\u6CD5\u663E\u793A\u3002</p><p>\u5229\u7528 PicGo \u5C06\u56FE\u7247\u4E0A\u4F20\u5230 GitHub \u4ED3\u5E93\uFF0C\u518D\u4F7F\u7528 jsDelivr \u4F18\u5316\u5BF9\u4E8E\u6211\u4EEC\u6765\u8BF4\u4F1A\u662F\u4E00\u4E2A\u4E0D\u9519\u7684\u9009\u62E9\u3002</p><h2 id="%E5%87%86%E5%A4%87" tabindex="-1">\u51C6\u5907</h2><ul><li><a href="https://github.com/Molunerfinn/PicGo">PicGo</a> PicGo \u5728 GitHub \u4E0A\u63D0\u4F9B\u4E86 MacOS\u3001Linux\u3001Windows \u4E09\u4E2A\u7CFB\u7EDF\u7248\u672C\u7684\u4E0B\u8F7D</li><li>\u4E00\u4E2A\u7528\u6765\u5B58\u653E\u56FE\u7247\u7684 GitHub \u4ED3\u5E93</li></ul><h2 id="%E5%85%B7%E4%BD%93%E6%AD%A5%E9%AA%A4" tabindex="-1">\u5177\u4F53\u6B65\u9AA4</h2><h3 id="%E6%96%B0%E5%BB%BA%E4%B8%80%E4%B8%AA-github-%E4%BB%93%E5%BA%93" tabindex="-1">\u65B0\u5EFA\u4E00\u4E2A GItHub \u4ED3\u5E93</h3><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/newrepo.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/nreponame.png" alt=""></p><h3 id="%E7%94%9F%E6%88%90-token" tabindex="-1">\u751F\u6210 Token</h3><p><strong>github</strong>\u2013<strong>setting</strong>\u2013<strong>developer settings</strong>\u2013<strong>personal access token</strong></p><p><strong>Note</strong>\u968F\u4FBF\u586B\u4E00\u4E0B\uFF0C\u5728<strong>Select scopes</strong>\u4E2D\u52FE\u9009<strong>repo</strong>\uFF08\u5F53\u7136\u4E5F\u53EF\u4EE5\u5168\u9009</p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/settingnewtoken.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/newtokendevset.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/settokenlist.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/settokenselect.png" alt=""></p><p>\u70B9\u51FB<strong>Generate token</strong></p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/finishgithubtoken.png" alt=""></p><p>\u8BF7\u52A1\u5FC5\u4FDD\u5B58\u597D\u751F\u6210\u7684 Token\uFF0C\u5B83\u53EA\u4F1A\u663E\u793A\u8FD9\u4E00\u6B21</p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/finishgithubtoken02.png" alt=""></p><h3 id="%E9%85%8D%E7%BD%AE-picgo" tabindex="-1">\u914D\u7F6E PicGo</h3><ul><li>\u4ED3\u5E93\u540D\u8981\u6309\u7167<strong>\u7528\u6237\u540D/\u4ED3\u5E93\u540D</strong>\u7684\u65B9\u5F0F\u586B\u5199</li><li>\u5206\u652F\u540D\u586B<strong>master</strong></li><li>Token \u5C31\u586B\u521A\u521A\u751F\u6210\u7684</li><li>\u6307\u5B9A\u5B58\u50A8\u8DEF\u5F84\uFF0C\u5982\u679C\u586B\u5199**img/**\u5C31\u4F1A\u5728\u4ED3\u5E93\u4E0B\u521B\u5EFA\u4E00\u4E2A img \u6587\u4EF6\u5939\uFF0C\u56FE\u7247\u4F1A\u5B58\u5728\u5176\u4E2D</li><li>\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u57DF\u540D\uFF0C\u6211\u4EEC\u8FD9\u91CC\u8981\u4F7F\u7528 jsDelivr \u52A0\u901F\u8BBF\u95EE\uFF0C\u6240\u4EE5\u8981\u586B\u4E0A<strong><a href="https://cdn.jsdelivr.net/gh/%E7%94%A8%E6%88%B7%E5%90%8D/%E5%9B%BE%E5%BA%8A%E4%BB%93%E5%BA%93%E5%90%8D">https://cdn.jsdelivr.net/gh/\u7528\u6237\u540D/\u56FE\u5E8A\u4ED3\u5E93\u540D</a></strong></li></ul><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/picgoconfig.png" alt=""></p><p>\u914D\u7F6E\u5B8C\u6210\u540E\uFF0C\u5C31\u53EF\u4EE5\u5728 PicGo \u4E0A\u4F20\u533A\u4E0A\u4F20\u56FE\u7247\u4E86\uFF0C\u4E0A\u4F20\u56FE\u7247\u6210\u529F\u540E\u5C31\u53EF\u4EE5\u901A\u8FC7<strong><a href="https://cdn.jsdelivr.net/gh/%E7%94%A8%E6%88%B7%E5%90%8D/%E5%9B%BE%E5%BA%8A%E4%BB%93%E5%BA%93%E5%90%8D/%E5%9B%BE%E7%89%87%E5%90%8D.%E5%90%8E%E7%BC%80">https://cdn.jsdelivr.net/gh/\u7528\u6237\u540D/\u56FE\u5E8A\u4ED3\u5E93\u540D/\u56FE\u7247\u540D.\u540E\u7F00</a></strong>\u8BBF\u95EE\u5230\u56FE\u7247\u4E86\uFF0C\u901F\u5EA6\u5F88\u5FEB\u3002</p><p>\u5728 PicGo \u8BBE\u7F6E\u4E2D\u53EF\u4EE5\u5F00\u542F\u4E0A\u4F20\u63D0\u793A\u3002</p><p>\u5982\u679C\u5BB6\u91CC\u7F51\u7EDC\u4E0D\u592A\u597D\uFF0C\u4E0A\u4F20\u56FE\u7247\u65F6\u53EF\u80FD\u9700\u8981\u591A\u8BD5\u51E0\u6B21\uFF0C\u53EF\u4EE5\u5C06\u7F51\u5740\u6253\u5F00\u5237\u65B0\u51E0\u6B21\u89C2\u5BDF\u56FE\u7247\u662F\u5426\u4E0A\u4F20\u6210\u529F\uFF0CPicGo \u6709\u65F6\u5019\u4F1A\u901A\u77E5\u4E0A\u4F20\u5931\u8D25\u4F46\u662F\u5B9E\u9645\u4E0A\u4F20\u6210\u529F\u4E86\u3002</p><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><p><a href="https://removeif.github.io/removeif-demo/theme/%E5%8D%9A%E5%AE%A2%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0picgo%E5%B7%A5%E5%85%B7github%E5%9B%BE%E4%BC%A0%E4%BD%BF%E7%94%A8.html">\u535A\u5BA2\u56FE\u7247\u4E0A\u4F20 picgo \u5DE5\u5177 github \u56FE\u4F20\u4F7F\u7528</a></p></div>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/picgo-jsdelivr-github.md");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
var __glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$h,
  date: date$h,
  tags: tags$d,
  category: category$d,
  summary: summary$h,
  meta: meta$h,
  "default": _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const title$g = "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u751F\u6210\u5668\u6A21\u5F0F";
const date$g = "2020/09/28 13:47:16";
const tags$c = ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"];
const category$c = "\u6280\u672F";
const summary$g = "\u751F\u6210\u5668\u6A21\u5F0F\u662F\u4E00\u79CD\u5728TypeScript/JavaScript\u4E2D\u975E\u5E38\u5E38\u89C1\u7684\u521B\u5EFA\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u4F7F\u4F60\u80FD\u591F\u5206\u6B65\u9AA4\u521B\u5EFA\u590D\u6742\u5BF9\u8C61\u3002\u5F53\u4F60\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u53EF\u80FD\u6709\u8BB8\u591A\u914D\u7F6E\u9009\u9879\u7684\u5BF9\u8C61\u65F6\uFF0C \u8BE5\u6A21\u5F0F\u4F1A\u7279\u522B\u6709\u7528\u3002";
const meta$g = [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u751F\u6210\u5668\u6A21\u5F0F" }];
const _sfc_main$t = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u751F\u6210\u5668\u6A21\u5F0F", "date": "2020/09/28 13:47:16", "tags": ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"], "category": "\u6280\u672F", "summary": "\u751F\u6210\u5668\u6A21\u5F0F\u662F\u4E00\u79CD\u5728TypeScript/JavaScript\u4E2D\u975E\u5E38\u5E38\u89C1\u7684\u521B\u5EFA\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u4F7F\u4F60\u80FD\u591F\u5206\u6B65\u9AA4\u521B\u5EFA\u590D\u6742\u5BF9\u8C61\u3002\u5F53\u4F60\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u53EF\u80FD\u6709\u8BB8\u591A\u914D\u7F6E\u9009\u9879\u7684\u5BF9\u8C61\u65F6\uFF0C \u8BE5\u6A21\u5F0F\u4F1A\u7279\u522B\u6709\u7528\u3002", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u751F\u6210\u5668\u6A21\u5F0F" }] };
    expose({ frontmatter });
    const head$1 = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u751F\u6210\u5668\u6A21\u5F0F", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u751F\u6210\u5668\u6A21\u5F0F" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p><strong>\u751F\u6210\u5668\u6A21\u5F0F</strong>\u662F\u4E00\u79CD\u5728 TypeScript/JavaScript \u4E2D\u975E\u5E38\u5E38\u89C1\u7684\u521B\u5EFA\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u4F7F\u4F60\u80FD\u591F\u5206\u6B65\u9AA4\u521B\u5EFA\u590D\u6742\u5BF9\u8C61\u3002\u5F53\u4F60\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u53EF\u80FD\u6709\u8BB8\u591A\u914D\u7F6E\u9009\u9879\u7684\u5BF9\u8C61\u65F6\uFF0C \u8BE5\u6A21\u5F0F\u4F1A\u7279\u522B\u6709\u7528\u3002</p><h3 id="%E9%97%AE%E9%A2%98" tabindex="-1">\u95EE\u9898</h3><p>\u5047\u8BBE\u6211\u4EEC\u9700\u8981\u6784\u9020\u4E00\u4E2A\u590D\u6742\u5BF9\u8C61\uFF0C\u6784\u9020\u65F6\u9700\u8981\u7ED9\u8FD9\u4E2A\u5BF9\u8C61\u7684\u8BF8\u591A\u6210\u5458\u53D8\u91CF\u8FDB\u884C\u521D\u59CB\u5316\u5DE5\u4F5C\uFF0C\u5982\u679C\u4F7F\u7528\u4F20\u7EDF\u7684\u6784\u9020\u51FD\u6570\u521B\u5EFA\u8FD9\u4E2A\u5BF9\u8C61\uFF0C\u90A3\u4E48\u5B83\u7684\u6784\u9020\u51FD\u6570\u5C06\u5341\u5206\u590D\u6742\uFF0C\u6BD4\u5982<code>new Product(partA, partB, partC, ...)</code>\uFF0C\u8FD9\u6837\u7684\u6784\u9020\u51FD\u6570\u4E0D\u4EC5\u7F3A\u4E4F\u7075\u6D3B\u6027\u8FD8\u4F1A\u4E25\u91CD\u7684\u5F71\u54CD\u4EE3\u7801\u7684\u53EF\u8BFB\u6027\uFF0C\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u4E00\u79CD\u66F4\u4F18\u79C0\u7684\u65B9\u6CD5\u6765\u521B\u5EFA\u590D\u6742\u5BF9\u8C61\u3002</p><h3 id="%E5%88%9B%E5%BB%BA%E6%83%B3%E8%A6%81%E7%94%9F%E6%88%90%E7%9A%84%E4%BA%A7%E5%93%81%E7%B1%BB" tabindex="-1">\u521B\u5EFA\u60F3\u8981\u751F\u6210\u7684\u4EA7\u54C1\u7C7B</h3><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> partA<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> partB<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> partC<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> partD<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E5%88%9B%E5%BB%BA%E7%94%9F%E6%88%90%E5%99%A8%E7%B1%BB" tabindex="-1">\u521B\u5EFA\u751F\u6210\u5668\u7C7B</h3><p>\u53EF\u4EE5\u5C06\u57FA\u672C\u751F\u6210\u5668\u5B9A\u4E49\u4E3A\u4E00\u4E2A\u63A5\u53E3\uFF0C\u518D\u4E3A\u6BCF\u4E2A\u5F62\u5F0F\u7684\u4EA7\u54C1\u521B\u5EFA\u5177\u4F53\u7684\u751F\u6210\u7C7B\uFF0C\u8FD9\u91CC\u53EA\u5B9A\u4E49\u4E00\u4E2A\u751F\u6210\u5668\u7C7B\u4F5C\u4E3A\u6F14\u793A</p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">ProductBuilder</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> product<span class="token operator">:</span> Product<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u521B\u5EFA\u8981\u751F\u6210\u7684\u5BF9\u8C61</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u4EE5\u4E0B\u4E3A\u7ED9\u5BF9\u8C61\u6DFB\u52A0\u5404\u90E8\u5206\u7684\u65B9\u6CD5</span>
  <span class="token keyword">public</span> <span class="token function">setPartA</span><span class="token punctuation">(</span>partA<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">.</span>partA <span class="token operator">=</span> partA<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">setPartB</span><span class="token punctuation">(</span>partB<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">.</span>partB <span class="token operator">=</span> partB<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">setPartC</span><span class="token punctuation">(</span>partC<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">.</span>partC <span class="token operator">=</span> partC<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">setPartD</span><span class="token punctuation">(</span>partD<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">.</span>partD <span class="token operator">=</span> partD<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u5B8C\u6210\u4EA7\u54C1\u751F\u6210</span>
  <span class="token keyword">public</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8FD9\u91CC\u53EF\u4EE5\u5199\u5177\u4F53\u7684\u6784\u5EFA\u5B8C\u6210\u540E\u8981\u6267\u884C\u7684\u64CD\u4F5C</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>product<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E6%B5%8B%E8%AF%95%E4%BB%A3%E7%A0%81" tabindex="-1">\u6D4B\u8BD5\u4EE3\u7801</h3><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">const</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setPartA</span><span class="token punctuation">(</span><span class="token string">&#39;\u8FD9\u662FPart A&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setPartB</span><span class="token punctuation">(</span><span class="token string">&#39;\u8FD9\u662FPart B&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setPartD</span><span class="token punctuation">(</span><span class="token string">&#39;\u8FD9\u662FPart D&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Product { partA: &#39;\u8FD9\u662FPart A&#39;, partB: &#39;\u8FD9\u662FPart B&#39;, partD: &#39;\u8FD9\u662FPart D&#39; }</span>
</code></pre><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">const</span> product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProductBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setPartA</span><span class="token punctuation">(</span><span class="token string">&#39;\u8FD9\u662FPart A&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setPartB</span><span class="token punctuation">(</span><span class="token string">&#39;\u8FD9\u662FPart B&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Product { partA: &#39;\u8FD9\u662FPart A&#39;, partB: &#39;\u8FD9\u662FPart B&#39; }</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/ts-builder.md");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
var __glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$g,
  date: date$g,
  tags: tags$c,
  category: category$c,
  summary: summary$g,
  meta: meta$g,
  "default": _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const title$f = "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5DE5\u5382\u6A21\u5F0F";
const date$f = "2020/03/20 11:47:31";
const tags$b = ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"];
const category$b = "\u6280\u672F";
const summary$f = "\u4E0A\u56DE\u7528typescript\u5B9E\u73B0\u4E86\u5355\u4F8B\u6A21\u5F0F\uFF0C\u8FD9\u56DE\u6765\u5B9E\u73B0\u5DE5\u5382\u6A21\u5F0F\u3002\u5DE5\u5382\u6A21\u5F0F\u53C8\u5206\u4E3A\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u3001\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F\u4EE5\u53CA\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u3002";
const meta$f = [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5DE5\u5382\u6A21\u5F0F" }];
const _sfc_main$s = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5DE5\u5382\u6A21\u5F0F", "date": "2020/03/20 11:47:31", "tags": ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"], "category": "\u6280\u672F", "summary": "\u4E0A\u56DE\u7528typescript\u5B9E\u73B0\u4E86\u5355\u4F8B\u6A21\u5F0F\uFF0C\u8FD9\u56DE\u6765\u5B9E\u73B0\u5DE5\u5382\u6A21\u5F0F\u3002\u5DE5\u5382\u6A21\u5F0F\u53C8\u5206\u4E3A\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u3001\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F\u4EE5\u53CA\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u3002", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5DE5\u5382\u6A21\u5F0F" }] };
    expose({ frontmatter });
    const head$1 = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5DE5\u5382\u6A21\u5F0F", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5DE5\u5382\u6A21\u5F0F" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u4E0A\u56DE\u7528 typescript \u5B9E\u73B0\u4E86\u5355\u4F8B\u6A21\u5F0F\uFF0C\u8FD9\u56DE\u6765\u5B9E\u73B0\u5DE5\u5382\u6A21\u5F0F\u3002\u5DE5\u5382\u6A21\u5F0F\u53C8\u5206\u4E3A\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u3001\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F\u4EE5\u53CA\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u3002</p><h2 id="%E7%AE%80%E5%8D%95%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F" tabindex="-1">\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F</h2><p>\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u901A\u5E38\u5728\u4E1A\u52A1\u6BD4\u8F83\u7B80\u5355\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528\uFF0C\u5B83\u6709\u4E09\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A\u5DE5\u5382\u7C7B\u3001\u62BD\u8C61\u4EA7\u54C1\u7C7B\u3001\u5177\u4F53\u4EA7\u54C1\u7C7B\u3002</p><p><strong>\u62BD\u8C61\u4EA7\u54C1\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53\u4EA7\u54C1\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">KFCPizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is KFCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut KFCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MCPizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is MCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut MCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5DE5\u5382\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">PizzaFactory</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
   * \u9759\u6001\u5DE5\u5382\u65B9\u6CD5
   * @param pizzaType \u9650\u5236\u4F20\u5165\u7684\u53C2\u6570\u4E3A\u7C7B\uFF0C\u800C\u975E\u7C7B\u7684\u5B9E\u4F8B
   */</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token function">createPizza</span><span class="token punctuation">(</span>pizzaType<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Pizza<span class="token punctuation">)</span><span class="token operator">:</span> Pizza <span class="token punctuation">{</span>
    <span class="token keyword">let</span> pizza <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      pizza <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">pizzaType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;Create failed!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> pizza<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u6D4B\u8BD5</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">let</span> pizza <span class="token operator">=</span> PizzaFactory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span>KFCPizza<span class="token punctuation">)</span><span class="token punctuation">;</span>
pizza<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

pizza <span class="token operator">=</span> PizzaFactory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span>MCPizza<span class="token punctuation">)</span><span class="token punctuation">;</span>
pizza<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F" tabindex="-1">\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F</h2><p>\u6B63\u5E38\u60C5\u51B5\u4E0B\uFF0C\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u6BCF\u6B21\u589E\u52A0\u65B0\u7684\u4EA7\u54C1\u90FD\u9700\u8981\u5728\u5DE5\u5382\u7C7B\u4E2D\u589E\u52A0\u5BF9\u5E94\u7684\u903B\u8F91\uFF0C\u8FD9\u6837\u5C31\u8FDD\u80CC\u4E86\u5F00\u95ED\u539F\u5219\uFF08\u4F46\u56E0\u4E3A ts \u548C\u6211\u4E3E\u7684\u4F8B\u5B50\u7684\u539F\u56E0\u4F53\u73B0\u4E0D\u51FA\u8FD9\u4E2A\u7F3A\u70B9\uFF09\u3002\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F\u5C31\u89E3\u51B3\u4E86\u8FD9\u4E2A\u95EE\u9898\uFF0C\u540C\u65F6\u5B83\u80FD\u66F4\u597D\u7684\u89E3\u51B3\u590D\u6742\u7684\u4E1A\u52A1\u73AF\u5883\u3002</p><p>\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F\u5177\u6709\u56DB\u4E2A\u90E8\u5206\uFF1A\u62BD\u8C61\u5DE5\u5382\u7C7B\u3001\u5177\u4F53\u5DE5\u5382\u7C7B\u3001\u62BD\u8C61\u4EA7\u54C1\u7C7B\u3001\u5177\u4F53\u4EA7\u54C1\u7C7B\u3002</p><p><strong>\u62BD\u8C61\u4EA7\u54C1\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53\u4EA7\u54C1\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">KFCPizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is KFCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut KFCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MCPizza</span> <span class="token keyword">extends</span> <span class="token class-name">Pizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is MCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut MCPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u62BD\u8C61\u5DE5\u5382\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">PizzaFactory</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Pizza<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53\u5DE5\u5382\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">KFCPizzaFactory</span> <span class="token keyword">extends</span> <span class="token class-name">PizzaFactory</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Pizza <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">KFCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MCPizzaFactory</span> <span class="token keyword">extends</span> <span class="token class-name">PizzaFactory</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Pizza <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u6D4B\u8BD5</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">let</span> factory<span class="token operator">:</span> PizzaFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KFCPizzaFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> pizza <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pizza<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u5F53\u6211\u4EEC\u9700\u8981\u589E\u52A0\u65B0\u7684\u4EA7\u54C1\u65F6\uFF0C\u53EA\u9700\u8981\u589E\u52A0\u5BF9\u5E94\u7684\u5DE5\u5382\u7C7B\u800C\u4E0D\u9700\u8981\u66F4\u6539\u539F\u672C\u5DE5\u5382\u7C7B\u5185\u90E8\u7684\u903B\u8F91\uFF0C\u5B8C\u5168\u7B26\u5408\u4E86\u5F00\u95ED\u539F\u5219\u3002</p><h2 id="%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F" tabindex="-1">\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F</h2><p>\u5B66\u4E60\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u4E4B\u524D\uFF0C\u9996\u5148\u8981\u5148\u4E86\u89E3\u4E24\u4E2A\u6982\u5FF5\uFF1A<strong>\u4EA7\u54C1\u7B49\u7EA7\u7ED3\u6784</strong>\u548C<strong>\u4EA7\u54C1\u65CF</strong></p><ul><li><p><strong>\u4EA7\u54C1\u7B49\u7EA7\u7ED3\u6784</strong></p><p>\u4EA7\u54C1\u7B49\u7EA7\u7ED3\u6784\u5373\u4EA7\u54C1\u7684\u7EE7\u627F\u7ED3\u6784\uFF0C\u4F8B\u5982\u62BD\u8C61\u7684\u62AB\u8428\u7C7B\u548C\u5177\u4F53\u67D0\u54C1\u724C\u7684\u62AB\u8428\u7C7B\u4E4B\u95F4\u5C31\u6784\u6210\u4E86\u4E00\u4E2A\u4EA7\u54C1\u7B49\u7EA7\u7ED3\u6784\u3002</p></li><li><p><strong>\u4EA7\u54C1\u65CF</strong></p><p>\u4F4D\u4E8E\u4E0D\u540C\u4EA7\u54C1\u7B49\u7EA7\u7ED3\u6784\u4E2D\u7684\u4E00\u7EC4\u4EA7\u54C1\uFF0C\u529F\u80FD\u76F8\u5173\u8054\u7684\u4EA7\u54C1\u7EC4\u6210\u7684\u5BB6\u65CF\uFF0C\u5982 KFC \u6C34\u679C\u62AB\u8428\u3001MC \u6C34\u679C\u62AB\u8428\u90FD\u662F\u6C34\u679C\u62AB\u8428\uFF0C\u5C31\u53EF\u4EE5\u653E\u5230\u540C\u4E00\u4E2A\u4EA7\u54C1\u65CF\u4E2D\u3002</p></li></ul><p>\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u5177\u6709\u548C\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F\u4E00\u6837\u7684\u56DB\u4E2A\u90E8\u5206\uFF1A\u62BD\u8C61\u5DE5\u5382\u7C7B\u3001\u5177\u4F53\u5DE5\u5382\u7C7B\u3001\u62BD\u8C61\u4EA7\u54C1\u7C7B\u3001\u5177\u4F53\u4EA7\u54C1\u7C7B\u3002</p><p><strong>\u62BD\u8C61\u4EA7\u54C1\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token comment">// KFC\u4EA7\u54C1\u7236\u7C7B</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">KFCPizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// MC\u4EA7\u54C1\u7236\u7C7B</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MCPizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53\u4EA7\u54C1\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token comment">// \u5177\u4F53KFCPizza\u7C7B</span>
<span class="token keyword">class</span> <span class="token class-name">KFCFruitPizza</span> <span class="token keyword">extends</span> <span class="token class-name">KFCPizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is KFCFruitPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut KFCFruitPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">KFCCheesePizza</span> <span class="token keyword">extends</span> <span class="token class-name">KFCPizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is KFCCheesePizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut KFCCheesePizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5177\u4F53KFCPizza\u7C7B</span>
<span class="token keyword">class</span> <span class="token class-name">MCFruitPizza</span> <span class="token keyword">extends</span> <span class="token class-name">MCPizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is MCFruitPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut MCFruitPizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MCCheesePizza</span> <span class="token keyword">extends</span> <span class="token class-name">MCPizza</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;This is MCCheesePizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">cut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Cut MCCheesePizza!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u62BD\u8C61\u5DE5\u5382\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">PizzaFactory</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">createKFCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KFCPizza<span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token function">createMCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> MCPizza<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53\u5DE5\u5382\u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token comment">// \u6C34\u679C\u62AB\u8428\u5DE5\u5382</span>
<span class="token keyword">class</span> <span class="token class-name">FruitPizzaFactory</span> <span class="token keyword">extends</span> <span class="token class-name">PizzaFactory</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">createKFCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KFCPizza <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">KFCFruitPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">createMCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> MCPizza <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MCFruitPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u829D\u58EB\u62AB\u8428\u5DE5\u5382</span>
<span class="token keyword">class</span> <span class="token class-name">CheesePizzaFactory</span> <span class="token keyword">extends</span> <span class="token class-name">PizzaFactory</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">createKFCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KFCPizza <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">KFCCheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token function">createMCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> MCPizza <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MCCheesePizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u6D4B\u8BD5</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">let</span> factory<span class="token operator">:</span> PizzaFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CheesePizzaFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> cheesePizza <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createKFCPizza</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cheesePizza<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/ts-factory.md");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
var __glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$f,
  date: date$f,
  tags: tags$b,
  category: category$b,
  summary: summary$f,
  meta: meta$f,
  "default": _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const title$e = "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u89C2\u5BDF\u8005\u6A21\u5F0F";
const date$e = "2020/04/16 17:55:55";
const tags$a = ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"];
const category$a = "\u6280\u672F";
const summary$e = "\u89C2\u5BDF\u8005\u6A21\u5F0F\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5141\u8BB8\u4E00\u4E2A\u5BF9\u8C61\u5C06\u5176\u72B6\u6001\u7684\u6539\u53D8\u901A\u77E5\u5176\u4ED6\u5BF9\u8C61\u3002\u89C2\u5BDF\u8005\u6A21\u5F0F\u63D0\u4F9B\u4E86\u4E00\u79CD\u4F5C\u7528\u4E8E\u4EFB\u4F55\u5B9E\u73B0\u4E86\u8BA2\u9605\u8005\u63A5\u53E3\u7684\u5BF9\u8C61\u7684\u673A\u5236\uFF0C \u53EF\u5BF9\u5176\u4E8B\u4EF6\u8FDB\u884C\u8BA2\u9605\u548C\u53D6\u6D88\u8BA2\u9605\u3002";
const meta$e = [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u89C2\u5BDF\u8005\u6A21\u5F0F" }];
const _sfc_main$r = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u89C2\u5BDF\u8005\u6A21\u5F0F", "date": "2020/04/16 17:55:55", "tags": ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"], "category": "\u6280\u672F", "summary": "\u89C2\u5BDF\u8005\u6A21\u5F0F\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5141\u8BB8\u4E00\u4E2A\u5BF9\u8C61\u5C06\u5176\u72B6\u6001\u7684\u6539\u53D8\u901A\u77E5\u5176\u4ED6\u5BF9\u8C61\u3002\u89C2\u5BDF\u8005\u6A21\u5F0F\u63D0\u4F9B\u4E86\u4E00\u79CD\u4F5C\u7528\u4E8E\u4EFB\u4F55\u5B9E\u73B0\u4E86\u8BA2\u9605\u8005\u63A5\u53E3\u7684\u5BF9\u8C61\u7684\u673A\u5236\uFF0C \u53EF\u5BF9\u5176\u4E8B\u4EF6\u8FDB\u884C\u8BA2\u9605\u548C\u53D6\u6D88\u8BA2\u9605\u3002", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u89C2\u5BDF\u8005\u6A21\u5F0F" }] };
    expose({ frontmatter });
    const head$1 = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u89C2\u5BDF\u8005\u6A21\u5F0F", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u89C2\u5BDF\u8005\u6A21\u5F0F" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p><strong>\u89C2\u5BDF\u8005\u6A21\u5F0F</strong>\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5141\u8BB8\u4E00\u4E2A\u5BF9\u8C61\u5C06\u5176\u72B6\u6001\u7684\u6539\u53D8\u901A\u77E5\u5176\u4ED6\u5BF9\u8C61\u3002</p><p>\u89C2\u5BDF\u8005\u6A21\u5F0F\u63D0\u4F9B\u4E86\u4E00\u79CD\u4F5C\u7528\u4E8E\u4EFB\u4F55\u5B9E\u73B0\u4E86\u8BA2\u9605\u8005\u63A5\u53E3\u7684\u5BF9\u8C61\u7684\u673A\u5236\uFF0C \u53EF\u5BF9\u5176\u4E8B\u4EF6\u8FDB\u884C\u8BA2\u9605\u548C\u53D6\u6D88\u8BA2\u9605\u3002</p><p><img src="https://refactoringguru.cn/images/patterns/content/observer/observer.png" alt=""></p><p><em>\u56FE\u7247\u6765\u6E90\uFF1A<a href="https://refactoringguru.cn/design-patterns/observer">https://refactoringguru.cn/design-patterns/observer</a></em></p><p>\u89C2\u5BDF\u8005\u6A21\u5F0F\u662F\u4E00\u79CD\u5728\u524D\u7AEF\u9886\u57DF\u5E94\u7528\u5341\u5206\u5E7F\u6CDB\u7684\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u7279\u522B\u662F\u5728\u56FE\u5F62\u754C\u9762\u7684\u7EC4\u4EF6\u4E2D\uFF0C\u5982\u679C\u4F60\u81EA\u5B9A\u4E49\u4E86\u4E00\u4E2A\u6309\u94AE\u7EC4\u4EF6\uFF0C\u90A3\u4E48\u4F60\u5F88\u53EF\u80FD\u9700\u8981\u7528\u5230\u89C2\u5BDF\u8005\u6A21\u5F0F\u3002</p><p>\u89C2\u5BDF\u8005\u6A21\u5F0F\u7684\u6838\u5FC3\u6210\u5458\u6709\u4E24\u4E2A\uFF0C\u4E00\u4E2A\u662F\u4F5C\u4E3A\u4E8B\u4EF6\u53D1\u5E03\u8005\u7684 Subject \u7C7B\uFF0C\u53E6\u4E00\u4E2A\u662F\u4F5C\u4E3A\u4E8B\u4EF6\u63A5\u6536\u8005\u7684 Observer \u7C7B\u3002</p><h3 id="subject-%E9%83%A8%E5%88%86" tabindex="-1">Subject \u90E8\u5206</h3><p>Subject \u7C7B\u6240\u5177\u6709\u7684\u516C\u5171\u90E8\u5206\u662F\u5BF9\u8BA2\u9605\u8005\u7684\u7BA1\u7406\u548C\u5411\u6240\u6709\u8BA2\u9605\u8005\u53D1\u5E03\u6D88\u606F\uFF0C\u800C\u5177\u4F53 Subject \u6240\u8D1F\u8D23\u7684\u4E1A\u52A1\u903B\u8F91\u9700\u8981\u653E\u5230\u5404\u81EA\u7684 Subject \u7C7B\u4E2D\u3002</p><p><strong>Subject \u63A5\u53E3</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">interface</span> <span class="token class-name">Subject</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u6DFB\u52A0\u89C2\u5BDF\u8005</span>
  <span class="token function">attach</span><span class="token punctuation">(</span>observer<span class="token operator">:</span> Observer<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token comment">// \u79FB\u9664\u89C2\u5BDF\u8005</span>
  <span class="token function">detach</span><span class="token punctuation">(</span>observer<span class="token operator">:</span> Observer<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token comment">// \u901A\u77E5\u6240\u6709\u89C2\u5BDF\u8005</span>
  <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53 Subject \u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">ConcreteSubject</span> <span class="token keyword">implements</span> <span class="token class-name">Subject</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u53D1\u5E03\u8005\u72B6\u6001\uFF0C\u6D4B\u8BD5\u4F7F\u7528</span>
  <span class="token keyword">public</span> state<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

  <span class="token comment">// \u8BA2\u9605\u8005\u540D\u5355</span>
  <span class="token keyword">public</span> observers<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>Observer<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token comment">// \u7BA1\u7406\u8BA2\u9605\u65B9\u6CD5</span>
  <span class="token keyword">public</span> <span class="token function">attach</span><span class="token punctuation">(</span>observer<span class="token operator">:</span> Observer<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> observerIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>observer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>observerIndex <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u5DF2\u8BA2\u9605&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>observer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u8BA2\u9605\u6210\u529F&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">detach</span><span class="token punctuation">(</span>observer<span class="token operator">:</span> Observer<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> observerIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>observer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>observerIndex <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u8BA2\u9605\u8005\u672A\u8BA2\u9605&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>observerIndex<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u8BA2\u9605\u8005\u5DF2\u79FB\u9664&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u901A\u77E5\u6240\u6709\u8BA2\u9605\u8005&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> observer <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      observer<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u8BA2\u9605\u7BA1\u7406\u4EE5\u5916\u7684\u903B\u8F91</span>
  <span class="token keyword">public</span> <span class="token function">someLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\u6211\u66F4\u6539\u4E86\u6211\u7684\u72B6\u6001\uFF1Astate=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="observer-%E9%83%A8%E5%88%86" tabindex="-1">Observer \u90E8\u5206</h3><p>\u89C2\u5BDF\u8005\u53EA\u9700\u8981\u6839\u636E\u53D1\u5E03\u8005\u7684\u53D1\u51FA\u7684\u6D88\u606F\u6765\u5224\u65AD\u81EA\u5DF1\u662F\u5426\u9700\u8981\u505A\u51FA\u56DE\u5E94\u5373\u53EF\u3002</p><p><strong>Observer \u63A5\u53E3</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">interface</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5BF9\u53D1\u5E03\u8005\u53D1\u51FA\u7684\u66F4\u65B0\u6D88\u606F\u4F5C\u51FA\u56DE\u5E94</span>
  <span class="token function">update</span><span class="token punctuation">(</span>subject<span class="token operator">:</span> Subject<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53 Observer \u7C7B</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token comment">//\u5177\u4F53\u89C2\u5BDF\u8005A</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteObserverA</span> <span class="token keyword">implements</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">update</span><span class="token punctuation">(</span>subject<span class="token operator">:</span> ConcreteSubject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>subject<span class="token punctuation">.</span>state <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u89C2\u5BDF\u8005A\u4F5C\u51FA\u56DE\u5E94&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5177\u4F53\u89C2\u5BDF\u8005B</span>
<span class="token keyword">class</span> <span class="token class-name">ConcreteObserverB</span> <span class="token keyword">implements</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">update</span><span class="token punctuation">(</span>subject<span class="token operator">:</span> ConcreteSubject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>subject<span class="token punctuation">.</span>state <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u89C2\u5BDF\u8005B\u4F5C\u51FA\u56DE\u5E94&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E6%B5%8B%E8%AF%95%E4%BB%A3%E7%A0%81" tabindex="-1">\u6D4B\u8BD5\u4EE3\u7801</h3><p>\u56E0\u4E3A\u662F\u968F\u673A\u6570\uFF0C\u53EF\u80FD\u4F1A\u5F97\u4E0D\u5230\u60F3\u8981\u7684\u7ED3\u679C\uFF0C\u53EF\u4EE5\u591A\u5C1D\u8BD5\u51E0\u6B21</p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">const</span> subject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> observerA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteObserverA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
subject<span class="token punctuation">.</span><span class="token function">attach</span><span class="token punctuation">(</span>observerA<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> observerB <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcreteObserverB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
subject<span class="token punctuation">.</span><span class="token function">attach</span><span class="token punctuation">(</span>observerB<span class="token punctuation">)</span><span class="token punctuation">;</span>

subject<span class="token punctuation">.</span><span class="token function">someLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

subject<span class="token punctuation">.</span><span class="token function">detach</span><span class="token punctuation">(</span>observerB<span class="token punctuation">)</span><span class="token punctuation">;</span>

subject<span class="token punctuation">.</span><span class="token function">someLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/ts-observer.md");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
var __glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$e,
  date: date$e,
  tags: tags$a,
  category: category$a,
  summary: summary$e,
  meta: meta$e,
  "default": _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const title$d = "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5355\u4F8B\u6A21\u5F0F";
const date$d = "2020/03/19 21:51:43";
const tags$9 = ["typescript", "\u8BBE\u8BA1\u6A21\u5F0F"];
const category$9 = "\u6280\u672F";
const summary$d = "\u6700\u8FD1\u5728\u5B66\u4E60\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u53C8\u6B63\u597D\u521A\u4E0A\u624B\u4E86typescript\uFF0C\u5C31\u60F3\u8981\u7528ts\u5B9E\u73B0\u4E00\u4E0B\u8BD5\u8BD5\u3002";
const meta$d = [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5355\u4F8B\u6A21\u5F0F" }];
const _sfc_main$q = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5355\u4F8B\u6A21\u5F0F", "date": "2020/03/19 21:51:43", "tags": ["typescript", "\u8BBE\u8BA1\u6A21\u5F0F"], "category": "\u6280\u672F", "summary": "\u6700\u8FD1\u5728\u5B66\u4E60\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u53C8\u6B63\u597D\u521A\u4E0A\u624B\u4E86typescript\uFF0C\u5C31\u60F3\u8981\u7528ts\u5B9E\u73B0\u4E00\u4E0B\u8BD5\u8BD5\u3002", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5355\u4F8B\u6A21\u5F0F" }] };
    expose({ frontmatter });
    const head$1 = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5355\u4F8B\u6A21\u5F0F", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u5355\u4F8B\u6A21\u5F0F" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u6700\u8FD1\u5728\u5B66\u4E60\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u53C8\u6B63\u597D\u521A\u4E0A\u624B\u4E86 typescript\uFF0C\u5C31\u60F3\u8981\u7528 ts \u5B9E\u73B0\u4E00\u4E0B\u8BD5\u8BD5\u3002</p><p>\u5355\u4F8B\u6A21\u5F0F\u7684\u76EE\u7684\u662F\u9650\u5236\u4E00\u4E2A\u7C7B\u53EA\u80FD\u88AB\u5B9E\u4F8B\u5316\u4E00\u6B21\uFF0C\u63D0\u4F9B\u4E00\u4E2A\u5168\u5C40\u7684\u8BBF\u95EE\u70B9\u3002\u5355\u4F8B\u6A21\u5F0F\u53C8\u88AB\u5206\u4E3A\u61D2\u6C49\u5355\u4F8B\u6A21\u5F0F\u548C\u997F\u6C49\u5355\u4F8B\u6A21\u5F0F\uFF0C\u61D2\u6C49\u5355\u4F8B\u6A21\u5F0F\u5C31\u662F\u5728\u7B2C\u4E00\u6B21\u8C03\u7528\u65F6\u5B9E\u4F8B\u5316\uFF0C\u997F\u6C49\u5355\u4F8B\u6A21\u5F0F\u662F\u7C7B\u52A0\u8F7D\u65F6\u5C31\u5B9E\u4F8B\u5316\u3002</p><p><strong>\u6838\u5FC3\u8981\u70B9\uFF1A</strong></p><p>\u628A\u4E00\u4E2A\u9759\u6001\u79C1\u6709\u53D8\u91CF\u786E\u7ACB\u4E3A\u552F\u4E00\u7684\u5B9E\u4F8B\uFF0C\u5916\u90E8\u901A\u8FC7\u9759\u6001\u65B9\u6CD5\u8BBF\u95EE\u8FD9\u4E2A\u552F\u4E00\u7684\u5B9E\u4F8B\uFF0C\u5E76\u628A\u6784\u9020\u51FD\u6570\u8BBE\u4E3A\u79C1\u6709\u3002</p><h2 id="%E6%87%92%E6%B1%89%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F" tabindex="-1">\u61D2\u6C49\u5355\u4F8B\u6A21\u5F0F</h2><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">PeopleSingle</span> <span class="token punctuation">{</span>
  <span class="token comment">/**\u6838\u5FC3 - \u4E00\u4E2A\u63A5\u6536\u5B9E\u4F8B\u7684\u9759\u6001\u6210\u5458 */</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> people<span class="token operator">:</span> PeopleSingle<span class="token punctuation">;</span>
  <span class="token keyword">private</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token comment">/**\u6838\u5FC3 - \u79C1\u6709\u6784\u9020\u51FD\u6570 */</span>
  <span class="token keyword">private</span> <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**\u6838\u5FC3 - \u83B7\u53D6\u5B9E\u4F8B */</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> PeopleSingle <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>people <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>people <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PeopleSingle</span><span class="token punctuation">(</span><span class="token string">&#39;\u91D1\u95EA\u95EA&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> PeopleSingle<span class="token punctuation">.</span>people<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">I&#39;m </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u6D4B\u8BD5</p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">let</span> people <span class="token operator">=</span> PeopleSingle<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
people<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h2 id="%E9%A5%BF%E6%B1%89%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F" tabindex="-1">\u997F\u6C49\u5355\u4F8B\u6A21\u5F0F</h2><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">PeopleSingle</span> <span class="token punctuation">{</span>
  <span class="token comment">/**\u6838\u5FC3 - \u4E00\u4E2A\u63A5\u6536\u5B9E\u4F8B\u7684\u9759\u6001\u6210\u5458\uFF0C\u76F4\u63A5\u521B\u5EFA\u597D\u5B9E\u4F8B */</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> people<span class="token operator">:</span> PeopleSingle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PeopleSingle</span><span class="token punctuation">(</span><span class="token string">&#39;\u91D1\u95EA\u95EA&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token comment">/**\u6838\u5FC3 - \u79C1\u6709\u6784\u9020\u51FD\u6570 */</span>
  <span class="token keyword">private</span> <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**\u6838\u5FC3 - \u83B7\u53D6\u5B9E\u4F8B */</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> PeopleSingle <span class="token punctuation">{</span>
    <span class="token keyword">return</span> PeopleSingle<span class="token punctuation">.</span>people<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">I&#39;m </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u6D4B\u8BD5</p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">let</span> people <span class="token operator">=</span> PeopleSingle<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
people<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u4E3E\u7684\u4F8B\u5B50\u4E0D\u662F\u7279\u522B\u597D\uFF0C\u4F46\u662F\u610F\u601D\u662F\u8FD9\u4E2A\u610F\u601D\u3002</p></div>`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/ts-singleton.md");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
var __glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$d,
  date: date$d,
  tags: tags$9,
  category: category$9,
  summary: summary$d,
  meta: meta$d,
  "default": _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const title$c = "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u7B56\u7565\u6A21\u5F0F";
const date$c = "2020/03/21 17:29:07";
const tags$8 = ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"];
const category$8 = "\u6280\u672F";
const summary$c = "\u7B56\u7565\u6A21\u5F0F\uFF08Strategy\uFF09\uFF1A\u5B83\u5B9A\u4E49\u4E86\u7B97\u6CD5\u5BB6\u65CF\uFF0C\u5206\u522B\u5C01\u88C5\u8D77\u6765\uFF0C\u8BA9\u5B83\u4EEC\u4E4B\u95F4\u53EF\u4EE5\u4E92\u76F8\u66FF\u6362\uFF0C\u6B64\u6A21\u5F0F\u8BA9\u7B97\u6CD5\u7684\u53D8\u5316\u4E0D\u4F1A\u5F71\u54CD\u5230\u4F7F\u7528\u7B97\u6CD5\u7684\u5BA2\u6237\u3002\u2014\u2014\u300A\u5927\u8BDD\u8BBE\u8BA1\u6A21\u5F0F\u300B";
const meta$c = [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u7B56\u7565\u6A21\u5F0F" }];
const _sfc_main$p = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u7B56\u7565\u6A21\u5F0F", "date": "2020/03/21 17:29:07", "tags": ["TypeScript", "\u8BBE\u8BA1\u6A21\u5F0F"], "category": "\u6280\u672F", "summary": "\u7B56\u7565\u6A21\u5F0F\uFF08Strategy\uFF09\uFF1A\u5B83\u5B9A\u4E49\u4E86\u7B97\u6CD5\u5BB6\u65CF\uFF0C\u5206\u522B\u5C01\u88C5\u8D77\u6765\uFF0C\u8BA9\u5B83\u4EEC\u4E4B\u95F4\u53EF\u4EE5\u4E92\u76F8\u66FF\u6362\uFF0C\u6B64\u6A21\u5F0F\u8BA9\u7B97\u6CD5\u7684\u53D8\u5316\u4E0D\u4F1A\u5F71\u54CD\u5230\u4F7F\u7528\u7B97\u6CD5\u7684\u5BA2\u6237\u3002\u2014\u2014\u300A\u5927\u8BDD\u8BBE\u8BA1\u6A21\u5F0F\u300B", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u7B56\u7565\u6A21\u5F0F" }] };
    expose({ frontmatter });
    const head$1 = { "title": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u7B56\u7565\u6A21\u5F0F", "meta": [{ "property": "og:title", "content": "TypeScript\u5B9E\u73B0\u8BBE\u8BA1\u6A21\u5F0F\u2014\u2014\u7B56\u7565\u6A21\u5F0F" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><blockquote><p>\u7B56\u7565\u6A21\u5F0F\uFF08Strategy\uFF09\uFF1A\u5B83\u5B9A\u4E49\u4E86\u7B97\u6CD5\u5BB6\u65CF\uFF0C\u5206\u522B\u5C01\u88C5\u8D77\u6765\uFF0C\u8BA9\u5B83\u4EEC\u4E4B\u95F4\u53EF\u4EE5\u4E92\u76F8\u66FF\u6362\uFF0C\u6B64\u6A21\u5F0F\u8BA9\u7B97\u6CD5\u7684\u53D8\u5316\u4E0D\u4F1A\u5F71\u54CD\u5230\u4F7F\u7528\u7B97\u6CD5\u7684\u5BA2\u6237\u3002</p><p>\u2014\u2014\u300A\u5927\u8BDD\u8BBE\u8BA1\u6A21\u5F0F\u300B</p></blockquote><p>\u7B56\u7565\u6A21\u5F0F\u4E3B\u8981\u7528\u6765\u89E3\u51B3\u5F53\u6709\u591A\u79CD\u76F8\u4F3C\u7B97\u6CD5\u7684\u65F6\uFF0C\u4F7F\u7528 if\u2026else \u4EA7\u751F\u7684\u96BE\u4EE5\u7EF4\u62A4\u7684\u95EE\u9898\u3002\u5B83\u4E3B\u8981\u7531\u4E09\u90E8\u5206\u7EC4\u6210\uFF1AStrategy \u63A5\u53E3\u3001\u5177\u4F53\u7684 Strategy \u7C7B\u4EE5\u53CA\u7528\u6765\u6539\u53D8\u548C\u6267\u884C\u7B56\u7565\u7684 Context \u7C7B\u3002</p><p>\u63A5\u4E0B\u6765\u5C06\u4EE5\u4E00\u4E2A\u8D85\u5E02\u9009\u62E9\u4F18\u60E0\u6D3B\u52A8\u7684\u4F8B\u5B50\u5B9E\u73B0\u7B56\u7565\u6A21\u5F0F\u3002</p><p><strong>Strategy \u63A5\u53E3</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">interface</span> <span class="token class-name">Strategy</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
   * \u4F18\u60E0\u6D3B\u52A8
   * @param money \u539F\u4EF7
   * @returns \u73B0\u4EF7
   */</span>
  <span class="token function">discount</span><span class="token punctuation">(</span>money<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u5177\u4F53\u7684\u4F18\u60E0\u7B56\u7565</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token comment">// \u6EE1\u51CF\u4F18\u60E0</span>
<span class="token keyword">class</span> <span class="token class-name">FullAndReduceStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">Strategy</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u6EE1\u8DB3\u6761\u4EF6\u7684\u91D1\u989D</span>
  <span class="token keyword">private</span> conditionMoney<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token comment">// \u51CF\u5C11\u7684\u91D1\u989D</span>
  <span class="token keyword">private</span> reduceMoney<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>money<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> returnMoney<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>conditionMoney <span class="token operator">=</span> money<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>reduceMoney <span class="token operator">=</span> returnMoney<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">discount</span><span class="token punctuation">(</span>money<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> result<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>money <span class="token operator">&gt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>conditionMoney<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span>
        money <span class="token operator">-</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>money <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>conditionMoney<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reduceMoney<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u73B0\u91D1\u6298\u6263</span>
<span class="token keyword">class</span> <span class="token class-name">CashRebateStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">Strategy</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u6298\u6263\u503C</span>
  <span class="token keyword">private</span> moneyRabte<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>moneyRabte<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>moneyRabte <span class="token operator">=</span> moneyRabte<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">discount</span><span class="token punctuation">(</span>money<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> money <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>moneyRabte<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>Context \u7C7B</strong></p><p><code>setStrategy</code>\u65B9\u6CD5\u7528\u6765\u63A7\u5236\u8981\u4F7F\u7528\u7684\u7B56\u7565\uFF0C<code>execute</code>\u65B9\u6CD5\u7528\u6765\u6267\u884C\u7B56\u7565\u3002</p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">class</span> <span class="token class-name">Context</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> strategy<span class="token operator">:</span> Strategy<span class="token punctuation">;</span>
  <span class="token keyword">private</span> money<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>money<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>money <span class="token operator">=</span> money<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u8BBE\u7F6E\u4F18\u60E0\u7B56\u7565</span>
  <span class="token keyword">public</span> <span class="token function">setStrategy</span><span class="token punctuation">(</span>strategy<span class="token operator">:</span> Strategy<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>strategy <span class="token operator">=</span> strategy<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u6267\u884C\u7B56\u7565</span>
  <span class="token keyword">public</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>strategy<span class="token punctuation">.</span><span class="token function">discount</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>money<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p><strong>\u6D4B\u8BD5</strong></p><pre class="language-typescript"><code class="language-typescript"><span class="token keyword">const</span> context<span class="token operator">:</span> Context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

context<span class="token punctuation">.</span><span class="token function">setStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FullAndReduceStrategy</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 96</span>

context<span class="token punctuation">.</span><span class="token function">setStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CashRebateStrategy</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 50</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/ts-strategy.md");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
var __glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$c,
  date: date$c,
  tags: tags$8,
  category: category$8,
  summary: summary$c,
  meta: meta$c,
  "default": _sfc_main$p
}, Symbol.toStringTag, { value: "Module" }));
const title$b = "\u4F7F\u7528Github Actions\u5C06Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages";
const date$b = "2020/11/16 21:44:13";
const tags$7 = ["Github Actions", "Github Pages", "Github"];
const category$7 = "\u5DE5\u5177";
const summary$b = "GitHub Actions \u662F GitHub \u7684\u6301\u7EED\u96C6\u6210\u670D\u52A1\uFF0C\u662F\u4E00\u4E2A\u975E\u5E38\u5F3A\u5927\u7684\u529F\u80FD\uFF0C\u7528\u5B83\u53EF\u4EE5\u5B9E\u73B0\u5F88\u591A\u81EA\u52A8\u5316\u529F\u80FD\u3002\u73B0\u5728\u6211\u4EEC\u6765\u4F7F\u7528Github Actions\u5C06\u6211\u4EEC\u505A\u597D\u7684Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages\u4E0A\u3002";
const meta$b = [{ "property": "og:title", "content": "\u4F7F\u7528Github Actions\u5C06Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages" }];
const _sfc_main$o = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u4F7F\u7528Github Actions\u5C06Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages", "date": "2020/11/16 21:44:13", "tags": ["Github Actions", "Github Pages", "Github"], "category": "\u5DE5\u5177", "summary": "GitHub Actions \u662F GitHub \u7684\u6301\u7EED\u96C6\u6210\u670D\u52A1\uFF0C\u662F\u4E00\u4E2A\u975E\u5E38\u5F3A\u5927\u7684\u529F\u80FD\uFF0C\u7528\u5B83\u53EF\u4EE5\u5B9E\u73B0\u5F88\u591A\u81EA\u52A8\u5316\u529F\u80FD\u3002\u73B0\u5728\u6211\u4EEC\u6765\u4F7F\u7528Github Actions\u5C06\u6211\u4EEC\u505A\u597D\u7684Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages\u4E0A\u3002", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528Github Actions\u5C06Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u4F7F\u7528Github Actions\u5C06Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528Github Actions\u5C06Vue\u9879\u76EE\u90E8\u7F72\u5230Github Pages" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>GitHub Actions \u662F GitHub \u7684\u6301\u7EED\u96C6\u6210\u670D\u52A1\uFF0C\u662F\u4E00\u4E2A\u975E\u5E38\u5F3A\u5927\u7684\u529F\u80FD\uFF0C\u7528\u5B83\u53EF\u4EE5\u5B9E\u73B0\u5F88\u591A\u81EA\u52A8\u5316\u529F\u80FD\u3002\u73B0\u5728\u6211\u4EEC\u6765\u4F7F\u7528 Github Actions \u5C06\u6211\u4EEC\u505A\u597D\u7684 Vue \u9879\u76EE\u90E8\u7F72\u5230 Github Pages \u4E0A\u3002</p><p>\u672C\u9879\u76EE\u6E90\u7801\uFF1A<a href="https://github.com/qiyuor2/github-actions-demo">qiyuor2/github-actions-demo</a></p><h2 id="github-actions-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F" tabindex="-1">Github Actions \u662F\u4EC0\u4E48\uFF1F</h2><p>\u6301\u7EED\u96C6\u6210\u901A\u5E38\u7531\u5F88\u591A\u64CD\u4F5C\u7EC4\u6210\uFF0C\u6BD4\u5982\u8FD0\u884C\u5355\u5143\u6D4B\u8BD5\u3001\u767B\u5F55\u8FDC\u7A0B\u670D\u52A1\u5668\u3001\u6253\u5305\u4EE3\u7801\u7B49\u7B49\uFF0CGithub \u5C06\u8FD9\u4E9B\u64CD\u4F5C\u79F0\u4E3A actions\u3002 \u8FD9\u4E9B actions \u5728\u4E0D\u540C\u9879\u76EE\u4E2D\u4E5F\u662F\u7C7B\u4F3C\u751A\u81F3\u662F\u5B8C\u5168\u76F8\u540C\u7684\uFF0C\u662F\u5B8C\u5168\u53EF\u4EE5\u5171\u4EAB\u7684\u3002\u800C Github \u5C31\u6839\u636E\u8FD9\u4E2A\u7279\u70B9\u521B\u5EFA\u4E86\u4E00\u4E2A actions \u5E02\u573A\uFF0C\u53EF\u4EE5\u53D1\u5E03\u81EA\u5DF1\u7684 actions \u548C\u4F7F\u7528\u5176\u4ED6\u4EBA\u7684\u5199\u597D\u7684 actions\u3002</p><h2 id="%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5" tabindex="-1">\u57FA\u672C\u6982\u5FF5</h2><ul><li>workflow\uFF1A\u6301\u7EED\u96C6\u6210\u4E00\u6B21\u8FD0\u884C\u7684\u8FC7\u7A0B\uFF0C\u5373\u4E00\u4E2A\u5DE5\u4F5C\u6D41\u7A0B</li><li>job\uFF1A\u4EFB\u52A1\uFF0C\u4E00\u4E2A\u5DE5\u4F5C\u6D41\u7A0B\u7531\u4E00\u4E2A\u6216\u591A\u4E2A\u4EFB\u52A1\u7EC4\u6210</li><li>step\uFF1A\u6B65\u9AA4\uFF0C\u6BCF\u4E2A\u4EFB\u52A1\u7531\u591A\u4E2A\u6B65\u9AA4\u7EC4\u6210\uFF0C\u9010\u6B65\u5B8C\u6210</li><li>action\uFF1A\u52A8\u4F5C\uFF0C\u6BCF\u4E2A\u6B65\u9AA4\u53EF\u4EE5\u6267\u884C\u4E00\u4E2A\u6216\u591A\u4E2A\u52A8\u4F5C</li></ul><h2 id="%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-vue-%E9%A1%B9%E7%9B%AE" tabindex="-1">\u521B\u5EFA\u4E00\u4E2A Vue \u9879\u76EE</h2><p>\u4F7F\u7528 Vue CLI \u521B\u5EFA\u4E00\u4E2A Vue \u9879\u76EE</p><pre class="language-bash"><code class="language-bash">vue create github-actions-demo
<span class="token builtin class-name">cd</span> github-actions-demo
</code></pre><p>\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E00\u4E2A<code>vue.config.js</code>\uFF0C\u4FEE\u6539<code>publicPath</code>\u4E3A\u5C06\u8981\u53D1\u5E03\u7684 Github Pages \u7684\u5B50\u8DEF\u5F84\uFF0C\u6BD4\u5982\u53D1\u5E03\u540E\u7684\u5730\u5740<code>https://qiyuor2.github.io/github-actions-demo/</code>\uFF0C\u90A3\u4E48<code>publicPath</code>\u5C31\u8981\u8BBE\u7F6E\u4E3A<code>/github-actions-demo/</code></p><pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;/github-actions-demo/&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><h2 id="%E7%BC%96%E5%86%99-workflow-%E6%96%87%E4%BB%B6" tabindex="-1">\u7F16\u5199 workflow \u6587\u4EF6</h2><p>workflow \u6587\u4EF6\u91C7\u7528 YAML \u683C\u5F0F\uFF0C\u540E\u7F00\u4E3A<code>.yml</code>\uFF0C\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA<code>.github/workflows/</code>\u76EE\u5F55\uFF0CGithub \u53EA\u8981\u53D1\u73B0\u8BE5\u76EE\u5F55\u4E2D\u7531 yml \u6587\u4EF6\u5C31\u4F1A\u81EA\u52A8\u8FD0\u884C\u8BE5\u6587\u4EF6\u3002 \u521B\u5EFA<code>ci.yml</code></p><pre class="language-yml"><code class="language-yml"><span class="token comment"># \u8BE5workflow\u7684\u540D\u79F0\uFF0C\u53EF\u4EE5\u968F\u610F\u586B\u5199</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> Build And Deploy To Github Pages

<span class="token comment"># workflow\u7684\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u8FD9\u91CC\u4EE3\u8868main\u5206\u652F\u7684push\u4E8B\u4EF6\u89E6\u53D1</span>
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>

<span class="token comment"># \u4EFB\u52A1</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token comment"># build-and-deploy \u4E3A\u4EFB\u52A1\u7684ID</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
    <span class="token comment"># \u8FD0\u884C\u6240\u9700\u8981\u7684\u73AF\u5883</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token comment"># \u6B65\u9AA4\u540D</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token comment"># \u4F7F\u7528\u7684actions\u811A\u672C\uFF0C\u8FD9\u91CC\u662F\u5B98\u65B9\u63D0\u4F9B\u7684\u83B7\u53D6\u6E90\u7801\u811A\u672C</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2.3.1
        <span class="token comment"># \u8FD9\u4E2A\u4E3A\u4F7F\u7528 JamesIves/github-pages-deploy-action\u811A\u672C\u6240\u9700\u8981\u7684\u914D\u7F6E</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">persist-credentials</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

      <span class="token comment"># \u6267\u884Cnpm\u811A\u672C\u6253\u5305\u9879\u76EE</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install and Build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          npm install
          npm run build</span>

      <span class="token comment"># \u6267\u884CJamesIves/github-pages-deploy-action\u5C06\u9879\u76EE\u53D1\u5E03\u5230Github Pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@3.7.1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># \u8BE5workflow\u9700\u8981\u64CD\u4F5Crepo\uFF0C\u56E0\u6B64\u9700\u8981\u4E00\u4E2A\u5BC6\u94A5\uFF0C\u4E0B\u9762\u4F1A\u8BB2\u5230\u5982\u4F55\u83B7\u53D6\u8FD9\u4E2A\u5BC6\u94A5</span>
          <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token comment"># \u53D1\u5E03\u5230\u7684\u5206\u652F</span>
          <span class="token key atrule">BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># \u8981\u53D1\u5E03\u7684\u6587\u4EF6\u5939</span>
          <span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> dist
</code></pre><h2 id="%E8%8E%B7%E5%8F%96%E5%AF%86%E9%92%A5%E5%B9%B6%E5%AD%98%E5%82%A8%E5%88%B0-github-%E4%BB%93%E5%BA%93%E4%B8%AD" tabindex="-1">\u83B7\u53D6\u5BC6\u94A5\u5E76\u5B58\u50A8\u5230 Github \u4ED3\u5E93\u4E2D</h2><h3 id="%E5%88%9B%E5%BB%BA%E5%AF%86%E9%92%A5" tabindex="-1">\u521B\u5EFA\u5BC6\u94A5</h3><p>\u8FDB\u5165 Github \u7684 Settings \u4E2D<a href="https://github.com/settings/">https://github.com/settings/</a>\uFF0C\u4F9D\u6B21\u70B9\u51FB<code> Developer settings</code>\u3001<code>Personal access tokens</code>\u3002\u7136\u540E\u70B9\u51FB<code>Generate new token</code>\u521B\u5EFA\u3002\u56E0\u4E3A\u8981\u64CD\u4F5C\u4ED3\u5E93\uFF0C\u6240\u4EE5\u9700\u8981\u52FE\u9009<code>repo</code>\u6743\u9650\u3002</p><p>\u5177\u4F53\u8BF7\u53C2\u8003\uFF1A<a href="https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token">\u521B\u5EFA\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C</a></p><p><strong>\u8BF7\u53CA\u65F6\u4FDD\u5B58\u751F\u6210\u7684\u5BC6\u94A5</strong></p><h3 id="%E5%B0%86%E5%AF%86%E9%92%A5%E5%AD%98%E5%82%A8%E5%88%B0-github-%E4%BB%93%E5%BA%93" tabindex="-1">\u5C06\u5BC6\u94A5\u5B58\u50A8\u5230 Github \u4ED3\u5E93</h3><p>\u9996\u5148\u521B\u5EFA\u4E00\u4E2A Github \u4ED3\u5E93\uFF0C\u7136\u540E\u5230\u4ED3\u5E93\u7684<code>Settings/Secret</code>\u4E0B\uFF0C\u70B9\u51FB<code>New repository secret</code>\u5C06\u521A\u624D\u4FDD\u5B58\u7684\u5BC6\u94A5\u4FDD\u5B58\uFF0C\u5E76\u547D\u540D\u4E3A<code>ACCESS_TOKEN</code>\uFF08\u6CE8\u610F\uFF0C\u5982\u679C\u8FD9\u91CC\u7684\u547D\u540D\u66F4\u6539\u4E86\uFF0C\u524D\u9762\u7684 yml \u6587\u4EF6\u4E2D\u7684<code>\${{ secrets.ACCESS_TOKEN }}</code>\u4E5F\u8981\u66F4\u6539\uFF09</p><h3 id="%E6%8E%A8%E9%80%81%E4%BB%93%E5%BA%93" tabindex="-1">\u63A8\u9001\u4ED3\u5E93</h3><p>\u6839\u636E Github \u4E0A\u7684\u63D0\u793A\uFF0C\u5C06\u51C6\u5907\u597D\u7684\u672C\u5730\u4ED3\u5E93\u63A8\u9001\u4E4B\u540E\u5C31\u4F1A\u81EA\u52A8\u6267\u884C workflow\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u5230 Actions \u4E2D\u5B9E\u65F6\u67E5\u770B\u8FD0\u884C\u65E5\u5FD7\u3002</p><h2 id="%E4%B8%80%E4%B8%AA%E5%B0%8F%E9%97%AE%E9%A2%98" tabindex="-1">\u4E00\u4E2A\u5C0F\u95EE\u9898</h2><p>workflow \u6267\u884C\u6210\u529F\u540E\u6211\u4EEC\u4ECD\u7136\u6709\u53EF\u80FD\u8BBF\u95EE\u5BF9\u5E94\u7F51\u5740(<code>https://qiyuor2.github.io/github-actions-demo</code>)\u65F6\u663E\u793A 404\u3002</p><p>\u8FD9\u65F6\u5019\u6211\u4EEC\u9700\u8981\u5230 Github \u4ED3\u5E93\u4E2D\u7684<code>Settings/Options</code>\u4E0B\uFF0C\u627E\u5230<code>Github Pages</code>\uFF0C\u70B9\u51FB<code>Choose a theme</code>\u9009\u62E9\u4EFB\u610F\u4E00\u4E2A\u4E3B\u9898\u5373\u53EF\u6B63\u5E38\u8BBF\u95EE\u3002</p><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html">GitHub Actions \u5165\u95E8\u6559\u7A0B</a></li><li><a href="https://cli.vuejs.org/zh/config/#publicpath">Vue CLI \u914D\u7F6E\u53C2\u8003</a></li><li><a href="https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token">\u521B\u5EFA\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2020/use-github-actions.md");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
var __glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$b,
  date: date$b,
  tags: tags$7,
  category: category$7,
  summary: summary$b,
  meta: meta$b,
  "default": _sfc_main$o
}, Symbol.toStringTag, { value: "Module" }));
const title$a = "Chrome\u63D2\u4EF6\u5F00\u53D1\u5165\u95E8";
const date$a = "2021/04/18 17:22:37";
const tags$6 = ["chrome", "JavaScript", "extension"];
const category$6 = "\u6280\u672F";
const summary$a = "\u6700\u8FD1\u5B66\u4E60\u4E86Chrome\u63D2\u4EF6\u7684\u5F00\u53D1\uFF0C\u603B\u4F53\u6765\u8BF4\u4E0A\u624B\u8FD8\u662F\u5F88\u5BB9\u6613\u7684\uFF0C\u56E0\u4E3A\u6D4F\u89C8\u5668\u63D2\u4EF6\u672C\u8D28\u4E0A\u4F9D\u65E7\u662F\u7F51\u9875\uFF0C\u5199\u51E0\u4E2Ademo\u57FA\u672C\u5C31\u4E86\u89E3\u4E86\u4ED6\u7684\u5F00\u53D1\u8FC7\u7A0B\u3002";
const meta$a = [{ "property": "og:title", "content": "Chrome\u63D2\u4EF6\u5F00\u53D1\u5165\u95E8" }];
const _sfc_main$n = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "Chrome\u63D2\u4EF6\u5F00\u53D1\u5165\u95E8", "date": "2021/04/18 17:22:37", "tags": ["chrome", "JavaScript", "extension"], "category": "\u6280\u672F", "summary": "\u6700\u8FD1\u5B66\u4E60\u4E86Chrome\u63D2\u4EF6\u7684\u5F00\u53D1\uFF0C\u603B\u4F53\u6765\u8BF4\u4E0A\u624B\u8FD8\u662F\u5F88\u5BB9\u6613\u7684\uFF0C\u56E0\u4E3A\u6D4F\u89C8\u5668\u63D2\u4EF6\u672C\u8D28\u4E0A\u4F9D\u65E7\u662F\u7F51\u9875\uFF0C\u5199\u51E0\u4E2Ademo\u57FA\u672C\u5C31\u4E86\u89E3\u4E86\u4ED6\u7684\u5F00\u53D1\u8FC7\u7A0B\u3002", "meta": [{ "property": "og:title", "content": "Chrome\u63D2\u4EF6\u5F00\u53D1\u5165\u95E8" }] };
    expose({ frontmatter });
    const head$1 = { "title": "Chrome\u63D2\u4EF6\u5F00\u53D1\u5165\u95E8", "meta": [{ "property": "og:title", "content": "Chrome\u63D2\u4EF6\u5F00\u53D1\u5165\u95E8" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u6700\u8FD1\u5B66\u4E60\u4E86 Chrome \u63D2\u4EF6\u7684\u5F00\u53D1\uFF0C\u603B\u4F53\u6765\u8BF4\u4E0A\u624B\u8FD8\u662F\u5F88\u5BB9\u6613\u7684\uFF0C\u56E0\u4E3A\u6D4F\u89C8\u5668\u63D2\u4EF6\u672C\u8D28\u4E0A\u4F9D\u65E7\u662F\u7F51\u9875\uFF0C\u5199\u51E0\u4E2A demo \u57FA\u672C\u5C31\u4E86\u89E3\u4E86\u4ED6\u7684\u5F00\u53D1\u8FC7\u7A0B\u3002</p><ul><li>\u5B8C\u6574\u9879\u76EE\uFF1A<a href="https://github.com/qiyuor2/chrome-extension-getimage">qiyuor2/chrome-extension-getimage</a></li></ul><h2 id="%E4%BB%80%E4%B9%88%E6%98%AF-chrome-%E6%8F%92%E4%BB%B6" tabindex="-1">\u4EC0\u4E48\u662F Chrome \u63D2\u4EF6</h2><p>\u6B63\u5982\u5F00\u5934\u6240\u8BF4\u7684\uFF0CChrome \u63D2\u4EF6\u5B9E\u9645\u4E0A\u5C31\u662F\u4E00\u4E2A\u7F51\u9875\uFF0C\u7531 HTML\u3001CSS\u3001JS\u3001\u56FE\u7247\u7B49\u8D44\u6E90\u7EC4\u6210\uFF0C\u4E0E\u7F51\u9875\u4E0D\u540C\u7684\u662F\uFF0CChrome \u63D2\u4EF6\u662F\u7528\u6765\u589E\u5F3A\u6D4F\u89C8\u5668\u529F\u80FD\u7684\uFF0C\u540C\u65F6\u5B83\u8FD8\u6709\u4E00\u5957\u5C5E\u4E8E\u81EA\u5DF1\u7684\u5F00\u53D1\u89C4\u5219\u548C API\u3002</p><p>\u6BCF\u4E2A\u63D2\u4EF6\u90FD\u7531\u4E0D\u540C\u7684\u7EC4\u4EF6\u6784\u6210\uFF0C\u8FD9\u4E9B\u7EC4\u4EF6\u5927\u90FD\u5305\u62EC background scripts\uFF0Ccontent scripts\uFF0Coptions page\uFF0CUI \u4EE5\u53CA\u5404\u79CD\u903B\u8F91\u6587\u4EF6\uFF0C\u5F53\u7136\uFF0C\u8FD9\u4E9B\u6587\u4EF6\u662F\u5426\u9700\u8981\u662F\u6839\u636E\u63D2\u4EF6\u7684\u529F\u80FD\u6240\u51B3\u5B9A\u7684\u3002</p><p>\u63A5\u4E0B\u6765\u6211\u5C06\u901A\u8FC7\u5F00\u53D1\u4E00\u4E2A\u83B7\u53D6\u9875\u9762\u56FE\u7247\u5E76\u4FDD\u5B58\u7684\u63D2\u4EF6\u6765\u4ECB\u7ECD\u5982\u4F55\u5F00\u53D1\u4E00\u4E2A Chrome \u63D2\u4EF6\u3002</p><h2 id="%E8%8E%B7%E5%8F%96%E9%A1%B5%E9%9D%A2%E4%B8%8A%E7%9A%84%E5%9B%BE%E7%89%87" tabindex="-1">\u83B7\u53D6\u9875\u9762\u4E0A\u7684\u56FE\u7247</h2><p>\u9996\u5148\uFF0C\u6211\u4EEC\u9700\u8981\u4E00\u4E2A\u76EE\u5F55\u6765\u5B58\u653E\u8FD9\u4E2A\u63D2\u4EF6\u7684\u5404\u4E2A\u6587\u4EF6\u3002</p><h3 id="%E5%88%9B%E5%BB%BA-manifest" tabindex="-1">\u521B\u5EFA manifest</h3><p><code>manifest.json</code>\u662F\u4E00\u4E2A Chrome \u63D2\u4EF6\u5FC5\u4E0D\u53EF\u5C11\u7684\u6587\u4EF6\uFF0C\u5B83\u5305\u542B\u4E86\u4F60\u63D2\u4EF6\u7684\u6240\u6709\u4FE1\u606F\u3002</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u9875\u9762\u4E0A\u7684\u6240\u6709\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;manifest_version&quot;</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
</code></pre><p>\u53EA\u8981\u5728\u76EE\u5F55\u4E2D\u5305\u542B<code>manifest.json</code>\uFF0C\u8FD9\u4E2A\u76EE\u5F55\u5C31\u53EF\u4EE5\u88AB\u4F5C\u4E3A\u4E00\u4E2A Chrome \u63D2\u4EF6\u6DFB\u52A0\u5230 Chrome \u5F53\u4E2D\u3002</p><ol><li>\u5728\u6D4F\u89C8\u5668\u5730\u5740\u680F\u4E2D\u8F93\u5165<code>chrome://extensions</code>\uFF0C\u56DE\u8F66\u4EE5\u6253\u5F00\u6D4F\u89C8\u5668\u7684\u6269\u5C55\u7A0B\u5E8F\u754C\u9762</li><li>\u6253\u5F00\u5F00\u53D1\u4EBA\u5458\u6A21\u5F0F</li><li>\u70B9\u51FB<code>\u52A0\u8F7D\u5DF2\u89E3\u538B\u7684\u6269\u5C55\u7A0B\u5E8F</code>\uFF0C\u9009\u62E9 manifest \u6587\u4EF6\u6240\u5728\u7684\u76EE\u5F55</li></ol><p>\u8FD9\u6837\u6211\u4EEC\u5C31\u6210\u529F\u5B89\u88C5\u4E86\u4E00\u4E2A\u6269\u5C55\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u8981\u5728\u6B64\u57FA\u7840\u4E0A\u5B8C\u5584\u5B83\u3002</p><h4 id="%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2" tabindex="-1">\u7528\u6237\u754C\u9762</h4><p>\u4E00\u4E2A\u63D2\u4EF6\u53EF\u4EE5\u6709\u591A\u79CD\u5F62\u5F0F\u7684\u7528\u6237\u754C\u9762\uFF0C\u8FD9\u91CC\u6211\u4EEC\u9009\u62E9\u5F39\u51FA\u5C42\u4F5C\u4E3A\u7528\u6237\u754C\u9762\uFF0C\u5728\u63D2\u4EF6\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E00\u4E2A<code>popup.html</code>\uFF0C\u8FD9\u4E2A\u9875\u9762\u9700\u8981\u5305\u542B\u4E24\u4E2A\u6309\u94AE\u5206\u522B\u7528\u6765\u89E6\u53D1\u83B7\u53D6\u56FE\u7247\u548C\u4FDD\u5B58\u56FE\u7247\u7684\u4E8B\u4EF6\uFF0C\u4EE5\u53CA\u4E00\u4E2A\u7528\u6765\u5C55\u793A\u56FE\u7247\u7684\u76D2\u5B50\u3002</p><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
      <span class="token selector">body,
      img</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>get<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u83B7\u53D6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>save<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u4FDD\u5B58<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u6CE8\u610F\uFF0C\u5982\u679C\u5728<code>popup.html</code>\u4E2D\u6709\u4E2D\u6587\u51FA\u73B0\uFF0C\u4E00\u5B9A\u8981\u5728 head \u6807\u7B7E\u4E2D\u6DFB\u52A0<code>&lt;meta charset=&quot;UTF-8&quot; /&gt;</code>\uFF0C\u4EE5\u9632\u6B62\u51FA\u73B0\u4E71\u7801\u3002</p><p>\u521B\u5EFA\u5B8C\u6210\u540E\uFF0C\u6211\u4EEC\u9700\u8981\u5728<code>manifest.json</code>\u4E2D\u58F0\u660E\u8BE5\u9875\u9762\uFF0C\u4EE5\u4FDD\u8BC1\u6D4F\u89C8\u5668\u80FD\u591F\u6B63\u786E\u7684\u8BFB\u53D6\u5230\u5B83\u3002\u6DFB\u52A0\u4E00\u4E2A<code>action</code>\u5BF9\u8C61\uFF0C\u540C\u65F6\u5C06<code>popup.html</code>\u8BBE\u7F6E\u4E3A\u8BE5\u5BF9\u8C61\u7684<code>default_popup</code>\u3002</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u9875\u9762\u4E0A\u7684\u6240\u6709\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;manifest_version&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;default_popup&quot;</span><span class="token operator">:</span> <span class="token string">&quot;popup.html&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u4E3A\u4E86\u8BA9\u6211\u4EEC\u7684\u63D2\u4EF6\u50CF\u4E2A\u6B63\u7ECF\u7684\u63D2\u4EF6\uFF0C\u7ED9\u4ED6\u6DFB\u52A0\u4E0A\u56FE\u6807\u3002\u6211\u4EEC\u9700\u8981\u51C6\u5907 16x16\u300132x32\u300148x48 \u4EE5\u53CA 128x128 \u56DB\u79CD\u5927\u5C0F\u7684\u56FE\u6807\u56FE\u7247\uFF0C\u5C06\u5B83\u4EEC\u653E\u5230\u76EE\u5F55\u4E2D\uFF0C\u4E4B\u540E\u5C06\u5B83\u4EEC\u7684\u8DEF\u5F84\u5199\u5165<code>manifest.json</code>\u4E2D\u3002</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u9875\u9762\u4E0A\u7684\u6240\u6709\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;manifest_version&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;default_popup&quot;</span><span class="token operator">:</span> <span class="token string">&quot;popup.html&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;default_icon&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;16&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo16.png&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;32&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo32.png&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;48&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo48.png&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;128&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo128.png&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u4E3A\u4E86\u8BA9\u56FE\u6807\u80FD\u591F\u5728\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406\u9875\u9762\u663E\u793A\uFF0C\u6211\u4EEC\u8FD8\u9700\u8981\u6DFB\u52A0\u4E00\u4E2A<code>icons</code>\u5BF9\u8C61\u3002</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u83B7\u53D6\u9875\u9762\u4E0A\u7684\u6240\u6709\u56FE\u7247&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;manifest_version&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;action&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;default_popup&quot;</span><span class="token operator">:</span> <span class="token string">&quot;popup.html&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;default_icon&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;16&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo16.png&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;32&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo32.png&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;48&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo48.png&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;128&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo128.png&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;icons&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;16&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo16.png&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;32&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo32.png&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;48&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo48.png&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;128&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/images/logo128.png&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u70B9\u51FB\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406\u9875\u9762\u4E2D\u7684\u66F4\u65B0\u6309\u94AE\uFF0C\u5373\u53EF\u770B\u5230\u6DFB\u52A0\u5B8C\u7528\u6237\u754C\u9762\u7684\u63D2\u4EF6\u4FE1\u606F\u4E86\u3002</p><h4 id="%E5%8A%9F%E8%83%BD%E9%80%BB%E8%BE%91" tabindex="-1">\u529F\u80FD\u903B\u8F91</h4><p>\u4E4B\u540E\u6211\u4EEC\u8981\u4E3A\u63D2\u4EF6\u6DFB\u52A0\u5B83\u5E94\u6709\u7684\u529F\u80FD\u2014\u2014\u83B7\u53D6\u9875\u9762\u56FE\u7247\u3002</p><p>\u9996\u5148\u6211\u4EEC\u5148\u7B80\u5355\u68B3\u7406\u4E00\u4E0B\u9700\u6C42\uFF1A</p><ol><li>\u70B9\u51FB popup.html \u4E2D\u7684\u83B7\u53D6\u6309\u94AE\uFF0C\u62FF\u5230\u5F53\u524D\u9875\u9762\u7684\u56FE\u7247</li><li>\u70B9\u51FB popup.html \u4E2D\u7684\u4FDD\u5B58\u6309\u94AE\uFF0C\u5C06\u62FF\u5230\u7684\u56FE\u7247\u4FDD\u5B58\u4E0B\u6765</li></ol><p>\u5B9E\u9645\u4E0A\u6211\u4EEC\u7684\u63D2\u4EF6\u4E0E\u5F53\u524D\u6B63\u5728\u6D3B\u52A8\u7684\u9875\u9762\u5E76\u4E0D\u662F\u540C\u4E00\u4E2A\u9875\u9762\uFF0C\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u901A\u8FC7\u67D0\u79CD\u65B9\u5F0F\u6765\u5C06\u83B7\u53D6\u56FE\u7247\u7684 js \u4EE3\u7801\u53D1\u9001\u5230\u5F53\u524D\u6D3B\u52A8\u9875\u4E0A\uFF0C\u5E76\u4E14\u8FD8\u9700\u8981\u8FD9\u6BB5 js \u4EE3\u7801\u80FD\u591F\u5728\u83B7\u53D6\u5230\u56FE\u7247\u4E4B\u540E\u5C06\u56FE\u7247\u53D1\u9001\u5230<code>popup.html</code>\u4E2D\u3002</p><p>\u8FD9\u91CC\u6211\u4EEC\u5C31\u9700\u8981\u7528\u5230\u4E00\u5F00\u59CB\u63D0\u5230\u7684 content scripts \u7EC4\u4EF6\u4EE5\u53CA content script \u4E0E popup \u4E4B\u95F4\u901A\u4FE1\u7684 API\u3002content scripts \u7B80\u5355\u6765\u8BF4\u5C31\u662F\u63D2\u5165\u9875\u9762\u7684\u811A\u672C\uFF0C\u867D\u8BF4\u662F\u63D2\u5165\u9875\u9762\u7684\u811A\u672C\uFF0C\u5B9E\u9645\u4E0A\u5B83\u4E0E\u9875\u9762\u539F\u672C\u7684 js \u662F\u5206\u5272\u5F00\u7684\uFF0C\u53CC\u65B9\u4E0D\u80FD\u83B7\u53D6\u5230\u5BF9\u65B9\u7684\u53D8\u91CF\u3001\u51FD\u6570\u7B49\u5185\u5BB9\u3002\u4E0D\u8FC7 content scripts \u8FD8\u662F\u53EF\u4EE5\u83B7\u53D6\u5230 dom \u7684\u3002</p><h5 id="%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87" tabindex="-1">\u83B7\u53D6\u56FE\u7247</h5><p>\u9996\u5148\u6DFB\u52A0\u4E00\u4E2A<code>content-script.js</code>\uFF0C\u8FD9\u4E2A\u811A\u672C\u4E3B\u8981\u6709\u4E24\u4E2A\u529F\u80FD\uFF0C\u4E00\u662F\u83B7\u53D6\u56FE\u7247\uFF0C\u4E8C\u662F\u76D1\u542C popup \u4F20\u6765\u7684\u6D88\u606F\uFF0C\u7136\u540E\u5C06\u83B7\u53D6\u5230\u7684\u56FE\u7247\u4F5C\u4E3A\u56DE\u4FE1\u4F20\u56DE\u53BB\u3002</p><pre class="language-javascript"><code class="language-javascript">chrome<span class="token punctuation">.</span>runtime<span class="token punctuation">.</span>onMessage<span class="token punctuation">.</span><span class="token function">addListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">message<span class="token punctuation">,</span> sender<span class="token punctuation">,</span> sendResponse</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// message\u7684\u6570\u636E\u683C\u5F0F\u53D6\u51B3\u4E8E\u53D1\u9001\u65F6\u7684\u6570\u636E</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> start <span class="token punctuation">}</span> <span class="token operator">=</span> message<span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>start<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> images <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> imgSrcList <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>images<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">img</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> img<span class="token punctuation">.</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sendResponse</span><span class="token punctuation">(</span>imgSrcList<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u4E4B\u540E\u6211\u4EEC\u8981\u5728<code>manifest.json</code>\u4E2D\u58F0\u660E\u914D\u7F6E\u5B83</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;content_scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;matches&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;&lt;all_urls&gt;&quot;</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;js&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;js/content-script.js&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><p><code>matches</code>\u58F0\u660E\u4E86 content scripts \u8981\u6CE8\u5165\u7684\u9875\u9762\uFF0C<code>&lt;all_urls&gt;</code>\u8868\u793A\u6240\u6709\u9875\u9762\uFF0C<code>js</code>\u5C5E\u6027\u58F0\u660E\u4E86\u8981\u6CE8\u5165\u7684 js \u811A\u672C\uFF0C\u9664\u6B64\u4E4B\u5916\u8FD8\u6709<code>css</code>\u5C5E\u6027\u58F0\u660E\u8981\u6CE8\u5165\u7684 css \u4EE3\u7801\u3001<code>run_at</code>\u5C5E\u6027\u58F0\u660E\u6CE8\u5165\u65F6\u673A\u7B49\u90FD\u53EF\u4EE5\u5728\u5B98\u65B9\u6587\u6863\u4E2D\u627E\u5230\u3002</p><p>\u4E4B\u540E\u6DFB\u52A0\u4E00\u4E2A<code>popup.js</code>\u4E3A\u754C\u9762\u4E0A\u7684\u6309\u94AE\u6CE8\u518C\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u5E76\u5728<code>popup.html</code>\u4E2D\u5F15\u5165\u5B83</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> srcList<span class="token punctuation">;</span>
<span class="token keyword">const</span> getImageBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

getImageBtn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u83B7\u53D6\u5F53\u524D\u6D3B\u52A8\u9875</span>
  chrome<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">currentWindow</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>tab<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">start</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// \u5411content scripts\u53D1\u9001\u6D88\u606F</span>
    chrome<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">sendMessage</span><span class="token punctuation">(</span>tab<span class="token punctuation">.</span>id<span class="token punctuation">,</span> message<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      srcList <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// popup\u4E2D\u5C55\u793A\u56FE\u7247</span>
      <span class="token keyword">const</span> imgList <span class="token operator">=</span> srcList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;img src=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>src<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> imgList<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> saveImageBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;save&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

saveImageBtn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u4FDD\u5B58\u56FE\u7247</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
      <span class="token selector">body,
      img</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>get<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u83B7\u53D6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>save<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u4FDD\u5B58<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./js/popup.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u8FD9\u91CC\u6211\u4EEC\u9700\u8981\u6CE8\u610F\uFF0C\u63D2\u4EF6\u8981\u60F3\u548C\u5F53\u524D\u6D3B\u52A8\u9875\u9762\u901A\u4FE1\u5C31\u9700\u8981\u9996\u5148\u83B7\u53D6\u5B83\u7684 tabId\uFF0C\u800C\u8981\u83B7\u53D6\u5F53\u524D\u6D3B\u52A8\u9875\u9762\u7684 tabId \u5219\u9700\u8981\u7ED9\u4E88\u63D2\u4EF6\u5BF9\u5E94\u7684\u6743\u9650\uFF0C\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u5728<code>manifest.json</code>\u4E2D\u58F0\u660E\u6240\u9700\u8981\u7684\u6743\u9650\u3002</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;permissions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;activeTab&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><p>\u5B8C\u6210\u540E\u66F4\u65B0\u4E00\u4E0B\u63D2\u4EF6\uFF0C\u7136\u540E\u6253\u5F00\u60F3\u8981\u83B7\u53D6\u56FE\u7247\u7684\u9875\u9762\u70B9\u51FB\u83B7\u53D6\u6309\u94AE\u5373\u53EF\uFF08\u5982\u679C\u9875\u9762\u5DF2\u7ECF\u63D0\u524D\u6253\u5F00\u8BF7\u5237\u65B0\u4E00\u4E0B\uFF09</p><h5 id="%E4%BF%9D%E5%AD%98%E5%9B%BE%E7%89%87" tabindex="-1">\u4FDD\u5B58\u56FE\u7247</h5><p>js \u53EF\u4EE5\u901A\u8FC7 a \u6807\u7B7E\u8BBE\u7F6E href \u548C download \u5C5E\u6027\u6765\u5B9E\u73B0\u6279\u91CF\u4FDD\u5B58\u56FE\u7247\uFF0C\u4F46\u662F\u8FD9\u91CC\u6211\u4EEC\u8981\u901A\u8FC7\u8C03\u7528 chrome \u7684 download API \u6765\u5B9E\u73B0\u3002</p><pre class="language-javascript"><code class="language-javascript"><span class="token operator">...</span>

saveImageBtn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  chrome<span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">currentWindow</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>tab<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>srcList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">&#39;\u672A\u83B7\u53D6\u56FE\u7247&#39;</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    srcList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      chrome<span class="token punctuation">.</span>downloads<span class="token punctuation">.</span><span class="token function">download</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> src<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u4E0E\u83B7\u53D6\u6D3B\u52A8\u9875\u9762\u76F8\u540C\uFF0Cdownload API \u540C\u6837\u4E5F\u9700\u8981\u83B7\u53D6\u6743\u9650</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;permissions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;activeTab&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;downloads&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><p>\u8FD9\u6837\u4E00\u4E2A\u83B7\u53D6\u5F53\u524D\u9875\u9762\u56FE\u7247\u7684\u63D2\u4EF6\u5C31\u5B8C\u6210\u4E86\u3002</p><ul><li>\u5B8C\u6574\u9879\u76EE\uFF1A<a href="https://github.com/qiyuor2/chrome-extension-getimage">qiyuor2/chrome-extension-getimage</a></li></ul><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://developer.chrome.com/docs/extensions/mv3/getstarted/">\u8C37\u6B4C\u5B98\u65B9\u6587\u6863</a></li><li><a href="https://juejin.cn/post/6844903740646899720">\u4E00\u7BC7\u6587\u7AE0\u6559\u4F60\u987A\u5229\u5165\u95E8\u548C\u5F00\u53D1 chrome \u6269\u5C55\u7A0B\u5E8F\uFF08\u63D2\u4EF6\uFF09</a></li><li><a href="https://juejin.cn/post/6844903985711677453">\u5165\u95E8\u7CFB\u5217 3 - background\u3001content\u3001popup \u7684\u901A\u4FE1</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2021/chrome-ext-get-image.md");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
var __glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$a,
  date: date$a,
  tags: tags$6,
  category: category$6,
  summary: summary$a,
  meta: meta$a,
  "default": _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));
const title$9 = "\u6D45\u8C08src\u4E0Ehref\u7684\u533A\u522B";
const date$9 = "2021/05/09 16:04:33";
const tags$5 = ["html"];
const category$5 = "\u6280\u672F";
const summary$9 = "src \u548C href \u90FD\u662F\u7528\u6765\u5F15\u5165\u5916\u90E8\u8D44\u6E90\u7684\u5C5E\u6027\uFF0C\u4F8B\u5982\uFF1A\u56FE\u7247\u3001\u89C6\u9891\u3001CSS \u6587\u4EF6\u3001JavaScript \u6587\u4EF6\u7B49\u3002\u90A3\u4E48\u5B83\u4EEC\u4E24\u8005\u4E4B\u95F4\u7A76\u7ADF\u6709\u4EC0\u4E48\u6837\u7684\u533A\u522B\u5462\uFF1F";
const meta$9 = [{ "property": "og:title", "content": "\u6D45\u8C08src\u4E0Ehref\u7684\u533A\u522B" }];
const _sfc_main$m = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u6D45\u8C08src\u4E0Ehref\u7684\u533A\u522B", "date": "2021/05/09 16:04:33", "tags": ["html"], "category": "\u6280\u672F", "summary": "src \u548C href \u90FD\u662F\u7528\u6765\u5F15\u5165\u5916\u90E8\u8D44\u6E90\u7684\u5C5E\u6027\uFF0C\u4F8B\u5982\uFF1A\u56FE\u7247\u3001\u89C6\u9891\u3001CSS \u6587\u4EF6\u3001JavaScript \u6587\u4EF6\u7B49\u3002\u90A3\u4E48\u5B83\u4EEC\u4E24\u8005\u4E4B\u95F4\u7A76\u7ADF\u6709\u4EC0\u4E48\u6837\u7684\u533A\u522B\u5462\uFF1F", "meta": [{ "property": "og:title", "content": "\u6D45\u8C08src\u4E0Ehref\u7684\u533A\u522B" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u6D45\u8C08src\u4E0Ehref\u7684\u533A\u522B", "meta": [{ "property": "og:title", "content": "\u6D45\u8C08src\u4E0Ehref\u7684\u533A\u522B" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>src \u548C href \u90FD\u662F\u7528\u6765\u5F15\u5165\u5916\u90E8\u8D44\u6E90\u7684\u5C5E\u6027\uFF0C\u4F8B\u5982\uFF1A\u56FE\u7247\u3001\u89C6\u9891\u3001CSS \u6587\u4EF6\u3001JavaScript \u6587\u4EF6\u7B49\u3002 \u90A3\u4E48\u5B83\u4EEC\u4E24\u8005\u4E4B\u95F4\u7A76\u7ADF\u6709\u4EC0\u4E48\u6837\u7684\u533A\u522B\u5462\uFF1F</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>style.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>script.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><p><strong>href</strong>(Hypertext Reference \u8D85\u6587\u672C\u5F15\u7528)\u5C5E\u6027\u901A\u8FC7\u6307\u5B9A Web \u8D44\u6E90\u7684\u4F4D\u7F6E\uFF0C\u6765\u5B9A\u4E49\u5F53\u524D\u5143\u7D20\u6216\u8005\u5F53\u524D\u6587\u6863\u4E0E\u76EE\u6807\u8D44\u6E90\u4E4B\u95F4\u7684\u94FE\u63A5\u6216\u5173\u7CFB\u3002\u5F53\u6211\u4EEC\u5F15\u5165 CSS \u6587\u4EF6\u65F6\uFF1A</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>style.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><p>\u6D4F\u89C8\u5668\u4F1A\u660E\u767D\u8FD9\u662F\u4E00\u4E2A\u6837\u5F0F\u8868\u8D44\u6E90\uFF0C\u8FD9\u65F6\u6D4F\u89C8\u5668\u5BF9\u4E8E\u9875\u9762\uFF08HTML\uFF09\u7684\u89E3\u6790\u4E0D\u4F1A\u6682\u505C\uFF08\u6E32\u67D3\u53EF\u80FD\u4F1A\u6682\u505C\uFF0C\u56E0\u4E3A\u6D4F\u89C8\u5668\u9700\u8981\u4F7F\u7528\u6837\u5F0F\u8868\u7684\u6837\u5F0F\u6765\u7ED8\u5236\u9875\u9762\uFF09\uFF0C\u8FD9\u662F\u56E0\u4E3A\u5B83\u5E76\u4E0D\u4F1A\u50CF<code>@import</code>\u4E00\u6837\u5C06\u6574\u4E2A CSS \u6587\u4EF6\u5D4C\u5165\u5230<code>style</code>\u6807\u7B7E\u4E2D\u3002</p><p><strong>src</strong>(Source)\u5C5E\u6027\u4F1A\u5C06\u8D44\u6E90\u5D4C\u5165\u5230\u5F53\u524D\u6587\u6863\u4E2D\u5143\u7D20\u6240\u5728\u4F4D\u7F6E\u3002\u5F53\u6211\u4EEC\u5F15\u5165 JavaScript \u6587\u4EF6\u65F6\uFF1A</p><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>script.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u6D4F\u89C8\u5668\u89E3\u6790\u5230\u8FD9\u53E5\u4EE3\u7801\u65F6\uFF0C\u9875\u9762\u7684\u52A0\u8F7D\u548C\u89E3\u6790\u90FD\u4F1A\u6682\u505C\uFF0C\u76F4\u5230\u6D4F\u89C8\u5668\u62FF\u5230\u5E76\u6267\u884C\u5B8C\u8FD9\u4E2A JavaScript \u6587\u4EF6\uFF0C\u8FD9\u5C31\u76F8\u5F53\u4E8E\u5C06 JavaScript \u6587\u4EF6\u4E2D\u7684\u5185\u5BB9\u5168\u90E8\u5D4C\u5165\u5230<code>script</code>\u6807\u7B7E\u4E2D\u3002</p><p>\u7F51\u4E0A\u6709\u8BB8\u591A\u6587\u7AE0\u4F9D\u6B21\u5C31\u8BA4\u5B9A\u4E3A\u4F7F\u7528<code>src</code>\u5C5E\u6027\u5C31\u4EE3\u8868\u4E86\u8D44\u6E90\u4F1A\u963B\u585E\u9875\u9762\uFF0C\u6211\u5E76\u4E0D\u8BA4\u540C\u8FD9\u4E2A\u89C2\u70B9\u3002</p><p>\u5728 HTML5 \u51FA\u73B0\u4E4B\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u7ED9<code>script</code>\u6807\u7B7E\u6DFB\u52A0<code>async</code>\u6216<code>defer</code>\u5C5E\u6027\u6765\u4F7F JavaScript \u811A\u672C\u5F02\u6B65\u52A0\u8F7D\u3002\u56FE\u7247\u7684\u5F15\u5165\u4E5F\u80FD\u5F88\u597D\u7684\u8BC1\u660E\u5E76\u975E\u4F7F\u7528<code>src</code>\u5C5E\u6027\u5C31\u4EE3\u8868\u4E86\u8BE5\u8D44\u6E90\u4F1A\u963B\u585E\u9875\u9762\uFF0C\u6211\u4EEC\u5728\u5F15\u5165\u56FE\u7247\u65F6\u4E5F\u662F\u4F7F\u7528\u7684<code>src</code>\u5C5E\u6027\uFF0C\u5728\u5B9E\u9645\u4F53\u9A8C\u4E2D\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\uFF0C\u5982\u679C\u56FE\u7247\u52A0\u8F7D\u8F83\u6162\u4F1A\u4EA7\u751F\u4E00\u79CD\u9875\u9762\u52A0\u8F7D\u5B8C\u6210\uFF0C\u53EA\u6709\u56FE\u7247\u6240\u5728\u7684\u90E8\u5206\u662F\u7A7A\u767D\u3002</p><p>\u56E0\u6B64\u6211\u8BA4\u4E3A\uFF0C<code>src</code>\u548C<code>href</code>\u7684\u533A\u522B\u4EC5\u5728\u4E8E<code>src</code>\u4F1A\u5C06\u8D44\u6E90\u5D4C\u5165\u5230\u5F53\u524D\u6587\u6863\u4E2D\uFF0C\u800C<code>href</code>\u4F1A\u5EFA\u7ACB\u4E00\u4E2A\u5173\u8054\u6307\u5411\u8D44\u6E90\uFF08\u5C31\u50CF<code>&lt;a href=&quot;https://www.baidu.com&quot;&gt;&lt;/a&gt;</code>\u5E76\u4E0D\u4F1A\u5C06\u767E\u5EA6\u5D4C\u5165\u5230\u5F53\u524D\u9875\u9762\u4E2D\uFF0C\u800C<code>&lt;iframe src=&quot;https://www.baidu.com&quot;&gt;&lt;/iframe&gt;</code>\u5C31\u4F1A\uFF09\u3002</p><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://stackoverflow.com/questions/3395359/difference-between-src-and-href">Difference between SRC and HREF</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2021/difference-between-src-href.md");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
var __glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$9,
  date: date$9,
  tags: tags$5,
  category: category$5,
  summary: summary$9,
  meta: meta$9,
  "default": _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const title$8 = "\u4F7F\u7528Github Actions\u81EA\u52A8\u5316\u53D1\u5E03npm\u5305\u7684\u63A2\u7D22";
const date$8 = "2021/05/28 16:31:54";
const tags$4 = ["Github Actions", "CI"];
const category$4 = "\u5DE5\u5177";
const summary$8 = "\u6700\u8FD1\u7F16\u5199\u4E86\u4E00\u4E2A\u5C01\u88C5\u4E86\u524D\u7AEF\u5B58\u50A8 API \u7684\u5DE5\u5177\u5E93\uFF0C\u51C6\u5907\u5C06\u5B83\u53D1\u5E03\u5728 npm \u4E0A\u65B9\u4FBF\u4EE5\u540E\u4F7F\u7528\uFF0C\u4E0D\u8FC7\u5982\u679C\u6BCF\u6B21\u90FD\u624B\u52A8\u4ECE\u672C\u5730\u6253\u5305\u53D1\u5E03\u7684\u8BDD\u5C31\u4F1A\u975E\u5E38\u9EBB\u70E6\uFF0C\u56E0\u6B64\u8FD9\u6B21\u5C1D\u8BD5\u4E00\u4E0B\u81EA\u52A8\u5316\u53D1\u5E03\u3002";
const meta$8 = [{ "property": "og:title", "content": "\u4F7F\u7528Github Actions\u81EA\u52A8\u5316\u53D1\u5E03npm\u5305\u7684\u63A2\u7D22" }];
const _sfc_main$l = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u4F7F\u7528Github Actions\u81EA\u52A8\u5316\u53D1\u5E03npm\u5305\u7684\u63A2\u7D22", "date": "2021/05/28 16:31:54", "tags": ["Github Actions", "CI"], "category": "\u5DE5\u5177", "summary": "\u6700\u8FD1\u7F16\u5199\u4E86\u4E00\u4E2A\u5C01\u88C5\u4E86\u524D\u7AEF\u5B58\u50A8 API \u7684\u5DE5\u5177\u5E93\uFF0C\u51C6\u5907\u5C06\u5B83\u53D1\u5E03\u5728 npm \u4E0A\u65B9\u4FBF\u4EE5\u540E\u4F7F\u7528\uFF0C\u4E0D\u8FC7\u5982\u679C\u6BCF\u6B21\u90FD\u624B\u52A8\u4ECE\u672C\u5730\u6253\u5305\u53D1\u5E03\u7684\u8BDD\u5C31\u4F1A\u975E\u5E38\u9EBB\u70E6\uFF0C\u56E0\u6B64\u8FD9\u6B21\u5C1D\u8BD5\u4E00\u4E0B\u81EA\u52A8\u5316\u53D1\u5E03\u3002", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528Github Actions\u81EA\u52A8\u5316\u53D1\u5E03npm\u5305\u7684\u63A2\u7D22" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u4F7F\u7528Github Actions\u81EA\u52A8\u5316\u53D1\u5E03npm\u5305\u7684\u63A2\u7D22", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528Github Actions\u81EA\u52A8\u5316\u53D1\u5E03npm\u5305\u7684\u63A2\u7D22" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u6700\u8FD1\u7F16\u5199\u4E86\u4E00\u4E2A\u5C01\u88C5\u4E86\u524D\u7AEF\u5B58\u50A8 API \u7684\u5DE5\u5177\u5E93<a href="https://www.npmjs.com/package/symstorage">symstorage</a>\uFF0C\u51C6\u5907\u5C06\u5B83\u53D1\u5E03\u5728 npm \u4E0A\u65B9\u4FBF\u4EE5\u540E\u4F7F\u7528\uFF0C\u4E0D\u8FC7\u5982\u679C\u6BCF\u6B21\u90FD\u624B\u52A8\u4ECE\u672C\u5730\u6253\u5305\u53D1\u5E03\u7684\u8BDD\u5C31\u4F1A\u975E\u5E38\u9EBB\u70E6\uFF0C\u56E0\u6B64\u8FD9\u6B21\u5C1D\u8BD5\u4E00\u4E0B\u81EA\u52A8\u5316\u53D1\u5E03\u3002</p><p>\u67E5\u770B\u4E86\u8BB8\u591A\u76F8\u5173\u6587\u7AE0\u540E\uFF0C\u6211\u51B3\u5B9A\u4F7F\u7528 Github Actions \u914D\u5408 semantic-release \u8FDB\u884C\u81EA\u52A8\u5316\u53D1\u5E03\u3002 \u6709\u5173<a href="https://semantic-release.gitbook.io/semantic-release/">semantic-release</a>\u7684\u8BE6\u7EC6\u4ECB\u7ECD\u53EF\u4EE5\u9605\u8BFB\u5B98\u65B9\u6587\u6863\uFF0C\u8FD9\u91CC\u53EA\u505A\u4E00\u4E9B\u6982\u8FF0\u6027\u7684\u603B\u7ED3\u3002</p><h2 id="semantic-release" tabindex="-1">semantic-release</h2><p>semantic-release \u7684\u5927\u81F4\u5DE5\u4F5C\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><ul><li>\u63D0\u4EA4\u5230\u7279\u5B9A\u7684\u5206\u652F\u89E6\u53D1 release \u6D41\u7A0B</li><li>\u9A8C\u8BC1 commit \u4FE1\u606F\uFF0C\u751F\u6210 release note\uFF0C\u6253 git tag</li><li>\u5176\u4ED6\u540E\u7EED\u6D41\u7A0B\uFF0C\u5982\u751F\u6210 CHANGELOG.md\uFF0Cnpm publish \u7B49\u7B49\uFF08\u901A\u8FC7\u63D2\u4EF6\u5B8C\u6210\uFF09</li></ul><p>\u5B83\u4F1A\u6839\u636E\u89C4\u8303\u5316\u7684 commit \u4FE1\u606F\u8FDB\u884C\u53D1\u5E03\u5E76\u751F\u6210\u53D1\u5E03\u4FE1\u606F\uFF0C\u9ED8\u8BA4\u89C4\u5219\uFF1A</p><pre class="language-bash"><code class="language-bash"><span class="token comment"># \u4FEE\u590Dbug\uFF0C\u66F4\u65B0\u5C0F\u7248\u672C1.0.x</span>
fix: <span class="token operator">&lt;</span>message<span class="token operator">&gt;</span>

<span class="token comment"># \u6DFB\u52A0\u65B0\u529F\u80FD\uFF0C\u66F4\u65B0\u6B21\u7248\u672C\u53F71.x.0</span>
feat: <span class="token operator">&lt;</span>message<span class="token operator">&gt;</span>

<span class="token comment"># \u5982\u679Cfeat\u4E2D\u5305\u542BBREAKING CHANGE\u5219\u4F1A\u66F4\u65B0\u4E3B\u7248\u672Cx.0.0</span>
</code></pre><p>\u5F53\u7136\u4E5F\u53EF\u4EE5\u901A\u8FC7\u63D2\u4EF6\u914D\u7F6E\u81EA\u5B9A\u4E49\u89C4\u5219</p><h2 id="%E9%85%8D%E7%BD%AE%E8%87%AA%E5%8A%A8%E5%8C%96%E5%8F%91%E5%B8%83" tabindex="-1">\u914D\u7F6E\u81EA\u52A8\u5316\u53D1\u5E03</h2><h3 id="%E9%85%8D%E7%BD%AE-github-actions" tabindex="-1">\u914D\u7F6E Github Actions</h3><blockquote><p>\u5F80\u671F Github Actions \u76F8\u5173\u6587\u7AE0\uFF1A<a href="https://qiyuor2.github.io/categories/%E5%B7%A5%E5%85%B7/useactionstopages/">\u4F7F\u7528 Github Actions \u5C06 Vue \u9879\u76EE\u90E8\u7F72\u5230 Github Pages</a></p></blockquote><p>\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA<code>.github/workflows/release.yml</code>\uFF0C\u5E76\u586B\u5165\u5982\u4E0B\u5185\u5BB9\uFF1A</p><pre class="language-yml"><code class="language-yml"><span class="token key atrule">name</span><span class="token punctuation">:</span> Release
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">release</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Release
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">12</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm ci
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Release
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">NPM_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NPM_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npx semantic<span class="token punctuation">-</span>release
</code></pre><p>\u5B98\u65B9\u53C2\u8003\u6587\u6863\uFF1A<a href="https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/github-actions.md">Using semantic-release with GitHub Actions</a></p><h3 id="%E9%85%8D%E7%BD%AE-semantic-release" tabindex="-1">\u914D\u7F6E semantic-release</h3><p>\u9996\u5148\u9700\u8981\u5B89\u88C5 semantic-release\uFF1A</p><pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> i -D semantic-release @semantic-release/changelog @semantic-release/git
</code></pre><ul><li><code>@semantic-release/changelog</code> \u7528\u6765\u751F\u6210 CHANGELOG.md \u65E5\u5FD7\u6587\u4EF6</li><li><code>@semantic-release/git</code> \u7528\u6765\u81EA\u52A8\u4FEE\u6539 package.json \u7248\u672C\u53F7\uFF0C\u5E76\u63D0\u4EA4\u5230 Github \u4E0A</li></ul><p>\u4E4B\u540E\u5728\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA<code>.releaserc</code>\uFF0C\u5E76\u586B\u5165\u5982\u4E0B\u5185\u5BB9\uFF1A</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">&quot;branches&quot;</span><span class="token operator">:</span> <span class="token string">&quot;main&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;@semantic-release/commit-analyzer&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;@semantic-release/release-notes-generator&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;@semantic-release/changelog&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;@semantic-release/npm&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
      <span class="token string">&quot;@semantic-release/git&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;assets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;package.json&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CHANGELOG.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;chore(release): \${nextRelease.version} [skip ci]\\n\\n\${nextRelease.notes}&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string">&quot;@semantic-release/github&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><p>\u914D\u7F6E\u4E2D\u6709\u4E00\u4E9B\u6211\u4EEC\u6CA1\u6709\u624B\u52A8\u5B89\u88C5\u7684\u5305\u5DF2\u7ECF\u5728\u5B89\u88C5 semantic-release \u65F6\u81EA\u52A8\u5B89\u88C5\u4E86</p><h3 id="%E6%8E%88%E6%9D%83" tabindex="-1">\u6388\u6743</h3><p>\u5728 npm \u5B98\u7F51\u767B\u9646\u540E\uFF0C\u70B9\u51FB\u5934\u50CF\uFF0C\u9009\u62E9 Access Tokens\uFF0C\u70B9\u51FB Generate New Token \u6309\u94AE\uFF0C\u4E4B\u540E\u9009\u62E9\u7C7B\u578B\u4E3A Publish \u751F\u6210</p><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/npmaccesstoken.png" alt="npm\u6388\u6743"></p><p>\u7136\u540E\u5230\u4ED3\u5E93\u7684<code>Settings/Secret</code>\u4E0B\uFF0C\u70B9\u51FB<code>New repository secret</code>\u5C06\u521A\u624D\u4FDD\u5B58\u7684\u5BC6\u94A5\u4FDD\u5B58\uFF0C\u5E76\u547D\u540D\u4E3A<code>NPM_TOKEN</code></p><blockquote><p>\u5982\u679C\u8FD9\u91CC\u547D\u540D\u4E0D\u4E3A NPM_TOKEN\uFF0C\u4E0A\u9762\u7684 release.yml \u4E2D\u7684<code>\${{ secrets.NPM_TOKEN }}</code>\u4E5F\u9700\u8981\u4FEE\u6539\u3002GITHUB_TOKEN \u4F1A\u81EA\u52A8\u751F\u6210\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u914D\u7F6E</p></blockquote><h2 id="%E6%89%A7%E8%A1%8C" tabindex="-1">\u6267\u884C</h2><p>\u914D\u7F6E\u5B8C\u6210\u540E\u5C31\u53EF\u4EE5\u5C1D\u8BD5\u63D0\u4EA4\u53D1\u5E03\u4E86</p><pre class="language-bash"><code class="language-bash"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m <span class="token string">&#39;feat: semantic-release&#39;</span> <span class="token comment"># \u6CE8\u610Ffeat:\u540E\u9700\u8981\u4E00\u4E2A\u7A7A\u683C</span>
<span class="token function">git</span> push
</code></pre><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://blog.dteam.top/posts/2020-05/semantic-release.html">\u56E2\u961F\u654F\u6377\u5B9E\u8DF5 \u2014\u2014 \u4F7F\u7528 semantic-release \u81EA\u52A8\u7BA1\u7406\u53D1\u5E03\u7248\u672C</a></li><li><a href="https://meixg.cn/2021/01/20/semantic-release-guide/">Github \u81EA\u52A8\u53D1\u7248\u673A\u5668\u4EBA semantic-release \u914D\u7F6E\u6559\u7A0B</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2021/github-actions-publish-package.md");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
var __glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$8,
  date: date$8,
  tags: tags$4,
  category: category$4,
  summary: summary$8,
  meta: meta$8,
  "default": _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const title$7 = "JavaScript\u7684\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\uFF08Event Loop\uFF09";
const date$7 = "2021/05/17 17:12:32";
const tags$3 = ["JavaScript"];
const category$3 = "\u6280\u672F";
const summary$7 = "\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\u662FJavaScript\u8FD0\u884C\u7684\u6838\u5FC3\uFF0C\u56E0\u6B64\u8981\u60F3\u5199\u51FAbug\u5C11\u7684js\u4EE3\u7801\u5C31\u5FC5\u987B\u8981\u4E86\u89E3\u8FD9\u4E2A\u673A\u5236\u662F\u5982\u4F55\u8FD0\u4F5C\u7684\uFF0C\u4EE5\u53CA\u4E3A\u4EC0\u4E48\u4F1A\u6709\u8FD9\u4E2A\u673A\u5236\u3002\u672C\u7BC7\u6587\u7AE0\u662F\u6211\u5BF9Event Loop\u7684\u7406\u89E3";
const meta$7 = [{ "property": "og:title", "content": "JavaScript\u7684\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\uFF08Event Loop\uFF09" }];
const _sfc_main$k = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "JavaScript\u7684\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\uFF08Event Loop\uFF09", "date": "2021/05/17 17:12:32", "tags": ["JavaScript"], "category": "\u6280\u672F", "summary": "\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\u662FJavaScript\u8FD0\u884C\u7684\u6838\u5FC3\uFF0C\u56E0\u6B64\u8981\u60F3\u5199\u51FAbug\u5C11\u7684js\u4EE3\u7801\u5C31\u5FC5\u987B\u8981\u4E86\u89E3\u8FD9\u4E2A\u673A\u5236\u662F\u5982\u4F55\u8FD0\u4F5C\u7684\uFF0C\u4EE5\u53CA\u4E3A\u4EC0\u4E48\u4F1A\u6709\u8FD9\u4E2A\u673A\u5236\u3002\u672C\u7BC7\u6587\u7AE0\u662F\u6211\u5BF9Event Loop\u7684\u7406\u89E3", "meta": [{ "property": "og:title", "content": "JavaScript\u7684\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\uFF08Event Loop\uFF09" }] };
    expose({ frontmatter });
    const head$1 = { "title": "JavaScript\u7684\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\uFF08Event Loop\uFF09", "meta": [{ "property": "og:title", "content": "JavaScript\u7684\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\uFF08Event Loop\uFF09" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\u662F JavaScript \u8FD0\u884C\u7684\u6838\u5FC3\uFF0C\u56E0\u6B64\u8981\u60F3\u5199\u51FA bug \u5C11\u7684 js \u4EE3\u7801\u5C31\u5FC5\u987B\u8981\u4E86\u89E3\u8FD9\u4E2A\u673A\u5236\u662F\u5982\u4F55\u8FD0\u4F5C\u7684\uFF0C\u4EE5\u53CA\u4E3A\u4EC0\u4E48\u4F1A\u6709\u8FD9\u4E2A\u673A\u5236\u3002</p><p>\u672C\u7BC7\u6587\u7AE0\u662F\u6211\u5BF9 Event Loop \u7684\u7406\u89E3</p><h2 id="%E5%8D%95%E7%BA%BF%E7%A8%8B" tabindex="-1">\u5355\u7EBF\u7A0B</h2><p>JavaScript \u662F\u4E00\u4E2A\u5355\u7EBF\u7A0B\u7684\u975E\u963B\u585E\u7684\u811A\u672C\u8BED\u8A00\uFF0C\u4E5F\u5C31\u662F\u8BF4 JavaScript \u5728\u540C\u4E00\u65F6\u95F4\u53EA\u80FD\u505A\u4E00\u4EF6\u4E8B\u3002\u90A3\u4E48\uFF0C\u4E3A\u4EC0\u4E48 JavaScript \u4E0D\u80FD\u6709\u591A\u4E2A\u7EBF\u7A0B\u5462\uFF1F</p><p>\u5728\u6700\u5F00\u59CB JavaScript \u8FD8\u4E0D\u50CF\u73B0\u5728\u662F\u4E00\u4E2A\u5168\u80FD\u7684\u8BED\u8A00\uFF0C\u90A3\u4E2A\u65F6\u5019\u5B83\u53EA\u6709\u4E00\u4E2A\u4EFB\u52A1\uFF0C\u5C31\u662F\u4F5C\u4E3A\u6D4F\u89C8\u5668\u7684\u811A\u672C\uFF0C\u4E0E\u7528\u6237\u4E92\u52A8\u548C\u64CD\u4F5C DOM\u3002\u8FD9\u5C31\u51B3\u5B9A\u4E86\u5B83\u53EA\u80FD\u662F\u5355\u7EBF\u7A0B\u7684\uFF0C\u4E0D\u7136\u4F1A\u5E26\u6765\u5F88\u590D\u6742\u7684\u95EE\u9898\u3002\u6BD4\u5982\uFF1A\u5982\u679C JavaScript \u6709\u4E24\u4E2A\u7EBF\u7A0B\uFF0C\u4E00\u4E2A\u7EBF\u7A0B\u5728\u67D0\u4E2A DOM \u8282\u70B9\u4E0A\u6DFB\u52A0\u4E86\u5185\u5BB9\uFF0C\u800C\u53E6\u4E00\u4E2A\u7EBF\u7A0B\u5220\u9664\u4E86\u8FD9\u4E2A\u8282\u70B9\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u65F6\u5019\u5E94\u8BE5\u4EE5\u54EA\u4E2A\u7EBF\u7A0B\u4E3A\u51C6\uFF1F</p><p>\u6240\u4EE5\u5728\u6700\u5F00\u59CB JavaScript \u547D\u4E2D\u6CE8\u5B9A\u662F\u5355\u7EBF\u7A0B\u7684\u8BED\u8A00\u3002</p><blockquote><p>HTML5 \u4E4B\u540E\u63D0\u51FA\u4E86 Web Worker\uFF0C\u4E3A JavaScript \u63D0\u4F9B\u4E86\u591A\u7EBF\u7A0B\u73AF\u5883\uFF0C\u4F46\u662F\u5B50\u7EBF\u7A0B\u5B8C\u5168\u53D7\u4E3B\u7EBF\u7A0B\u63A7\u5236\u5E76\u4E14\u4E0D\u80FD\u64CD\u4F5C DOM\uFF0C\u56E0\u6B64\u5E76\u6CA1\u6709\u6539\u53D8 JavaScript \u5355\u7EBF\u7A0B\u7684\u672C\u8D28</p></blockquote><h2 id="%E6%89%A7%E8%A1%8C%E6%A0%88%E4%B8%8E%E4%BB%BB%E5%8A%A1%E9%98%9F%E5%88%97" tabindex="-1">\u6267\u884C\u6808\u4E0E\u4EFB\u52A1\u961F\u5217</h2><p>\u4E3A\u4E86\u89E3\u51B3\u5355\u7EBF\u7A0B\u5BFC\u81F4\u7684 CPU \u5229\u7528\u7387\u4F4E\u4EE5\u53CA\u540E\u4E00\u4E2A\u4EFB\u52A1\u5FC5\u987B\u7B49\u5F85\u524D\u4E00\u4E2A\u4EFB\u52A1\u7ED3\u675F\u624D\u80FD\u6267\u884C\u7684\u95EE\u9898\uFF0CJavaScript \u5C06\u6240\u6709\u4EFB\u52A1\u5206\u6210\u4E86<strong>\u540C\u6B65\u4EFB\u52A1</strong>\u548C<strong>\u5F02\u6B65\u4EFB\u52A1</strong>\uFF0C\u540C\u6B65\u4EFB\u52A1\u4F1A\u5728\u8FDB\u5165\u4E3B\u7EBF\u7A0B<strong>\u6267\u884C\u6808</strong>\uFF0C\u800C\u5F02\u6B65\u4EFB\u52A1\u4F1A\u8FDB\u5165<strong>\u4EFB\u52A1\u961F\u5217</strong>\u7B49\u6267\u884C\u6808\u6240\u6709\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5\u540E\u624D\u4F1A\u8FDB\u5165\u6267\u884C\u6808\u6267\u884C\u3002</p><blockquote><p>JavaScript \u662F\u5355\u7EBF\u7A0B\u7684\uFF0C\u4F46\u662F JavaScript \u7684\u6267\u884C\u73AF\u5883\u4E0D\u662F\uFF0C\u6D4F\u89C8\u5668\u4F1A\u4E3A\u5F02\u6B65\u4EFB\u52A1\u5355\u72EC\u5F00\u4E00\u4E2A\u7EBF\u7A0B\uFF0C\u4E5F\u5C31\u662F\u4EFB\u52A1\u961F\u5217</p></blockquote><p>\u4E3B\u7EBF\u7A0B\u4F1A\u4E0D\u65AD\u91CD\u590D\u4EE5\u4E0B\u4E09\u4E2A\u6B65\u9AA4\uFF1A</p><ol><li>\u540C\u6B65\u4EFB\u52A1\u8FDB\u5165\u6267\u884C\u6808\u6267\u884C</li><li>\u5F02\u6B65\u4EFB\u52A1\u8FDB\u5165\u4E3B\u7EBF\u7A0B\u4E4B\u5916\u7684\u4EFB\u52A1\u961F\u5217</li><li>\u6267\u884C\u6808\u4E2D\u7684\u6240\u6709\u540C\u6B65\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u8BFB\u53D6\u4EFB\u52A1\u961F\u5217\u4E2D\u7684\u4EFB\u52A1\uFF0C\u653E\u5165\u6267\u884C\u6808\u4E2D\u6267\u884C</li></ol><h2 id="%E5%BE%AE%E4%BB%BB%E5%8A%A1%E4%B8%8E%E5%AE%8F%E4%BB%BB%E5%8A%A1" tabindex="-1">\u5FAE\u4EFB\u52A1\u4E0E\u5B8F\u4EFB\u52A1</h2><p>\u5F02\u6B65\u4EFB\u52A1\u53C8\u88AB\u5206\u4E3A<strong>\u5FAE\u4EFB\u52A1</strong>\u548C<strong>\u5B8F\u4EFB\u52A1</strong>\uFF0C\u5B83\u4EEC\u4E4B\u95F4\u7684\u6267\u884C\u4F18\u5148\u7EA7\u5E76\u4E0D\u76F8\u540C\uFF0C\u5FAE\u4EFB\u52A1\u603B\u4F1A\u5728\u5B8F\u4EFB\u52A1\u4E4B\u524D\u6267\u884C\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF1A\u540C\u6B65\u4EFB\u52A1&gt;\u5FAE\u4EFB\u52A1&gt;\u5B8F\u4EFB\u52A1\u3002</p><blockquote><p>\u5728\u6D4F\u89C8\u5668\u4E2D\uFF0C\u5FAE\u4EFB\u52A1\u7684\u4EFB\u52A1\u961F\u5217\u4F1A\u5728\u6BCF\u4E2A\u5B8F\u4EFB\u52A1\u6267\u884C\u5B8C\u540E\u6267\u884C</p><p>\u8001\u7248\u672C\u7684 Nodejs \u4E2D\u6709\u6240\u4E0D\u540C\uFF0C\u5FAE\u4EFB\u52A1\u4F1A\u5728\u4E8B\u4EF6\u5FAA\u73AF\u7684\u5404\u4E2A\u9636\u6BB5\u4E4B\u95F4\u6267\u884C</p><p>Nodejs V11 \u4E4B\u540E\u5C31\u4E0E\u6D4F\u89C8\u5668\u7684\u673A\u5236\u76F8\u540C\u4E86</p></blockquote><p>\u5FAE\u4EFB\u52A1\uFF1A</p><ul><li>Promise \u7684<code>Promise.then</code>\`Promise.catch<code>\\</code>Promise.finally\`</li><li>MutationObserver\uFF08\u53EF\u4EE5\u7528\u6765\u76D1\u542C DOM \u53D8\u52A8\uFF09</li><li><code>proccess.nextTick</code>\uFF08nodejs \u72EC\u6709\uFF09</li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask">queueMicrotask</a></li></ul><p>\u5B8F\u4EFB\u52A1\uFF1A</p><ul><li>script \u6807\u7B7E\u4E2D\u7684\u4EE3\u7801</li><li>\u4E8B\u4EF6\u89E6\u53D1\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u5982\uFF1ADOM \u7684\u4E8B\u4EF6\u56DE\u8C03\u3001<code>requestAnimationFrame</code>\u3001IO \u64CD\u4F5C</li><li>\u5B9A\u65F6\u5668\u7684\u56DE\u8C03\u51FD\u6570</li></ul><p>\u53EF\u80FD\u8FD8\u4F1A\u5B8C\u5584\u2026</p></div>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2021/js-event-loop.md");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
var __glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$7,
  date: date$7,
  tags: tags$3,
  category: category$3,
  summary: summary$7,
  meta: meta$7,
  "default": _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const title$6 = "React Native\u4E2D\u4F7F\u7528Markdown\u7F16\u8F91\u5668";
const date$6 = "2021/02/17 11:31:32";
const tags$2 = ["React Native", "WebView"];
const category$2 = "\u6280\u672F";
const summary$6 = "\u6700\u8FD1\u5728\u7814\u7A76`React Native`\uFF0C\u51C6\u5907\u7528\u5B83\u5199\u4E00\u4E2A\u7B14\u8BB0APP\uFF0C\u4F46\u662F\u5E76\u6CA1\u6709\u641C\u5230\u5F88\u597D\u7528\u7684\u7F16\u8F91\u5668\u63D2\u4EF6\uFF0C\u56E0\u6B64\u51C6\u5907\u4F7F\u7528`WebView`\u548C\u5DF2\u6709\u7684Web\u7AEF\u7F16\u8F91\u5668\u81EA\u5DF1\u5C01\u88C5\u4E00\u4E2A\u3002";
const meta$6 = [{ "property": "og:title", "content": "React Native\u4E2D\u4F7F\u7528Markdown\u7F16\u8F91\u5668" }];
const _sfc_main$j = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "React Native\u4E2D\u4F7F\u7528Markdown\u7F16\u8F91\u5668", "date": "2021/02/17 11:31:32", "tags": ["React Native", "WebView"], "category": "\u6280\u672F", "summary": "\u6700\u8FD1\u5728\u7814\u7A76`React Native`\uFF0C\u51C6\u5907\u7528\u5B83\u5199\u4E00\u4E2A\u7B14\u8BB0APP\uFF0C\u4F46\u662F\u5E76\u6CA1\u6709\u641C\u5230\u5F88\u597D\u7528\u7684\u7F16\u8F91\u5668\u63D2\u4EF6\uFF0C\u56E0\u6B64\u51C6\u5907\u4F7F\u7528`WebView`\u548C\u5DF2\u6709\u7684Web\u7AEF\u7F16\u8F91\u5668\u81EA\u5DF1\u5C01\u88C5\u4E00\u4E2A\u3002", "meta": [{ "property": "og:title", "content": "React Native\u4E2D\u4F7F\u7528Markdown\u7F16\u8F91\u5668" }] };
    expose({ frontmatter });
    const head$1 = { "title": "React Native\u4E2D\u4F7F\u7528Markdown\u7F16\u8F91\u5668", "meta": [{ "property": "og:title", "content": "React Native\u4E2D\u4F7F\u7528Markdown\u7F16\u8F91\u5668" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u6700\u8FD1\u5728\u7814\u7A76<code>React Native</code>\uFF0C\u51C6\u5907\u7528\u5B83\u5199\u4E00\u4E2A\u7B14\u8BB0 APP\uFF0C\u4F46\u662F\u5E76\u6CA1\u6709\u641C\u5230\u5F88\u597D\u7528\u7684\u7F16\u8F91\u5668\u63D2\u4EF6\uFF0C\u56E0\u6B64\u51C6\u5907\u4F7F\u7528<code>WebView</code>\u548C\u5DF2\u6709\u7684 Web \u7AEF\u7F16\u8F91\u5668\u81EA\u5DF1\u5C01\u88C5\u4E00\u4E2A\u3002</p><blockquote><p>\u56E0\u672C\u4EBA\u6CA1\u6709\u82F9\u679C\u7535\u8111\uFF0C\u56E0\u6B64\u53EA\u5C1D\u8BD5\u5B89\u5353\u7248\u672C</p></blockquote><p>\u5B8C\u6574\u9879\u76EE\u5730\u5740\uFF1A<a href="https://github.com/qiyuor2/rn-xnote">qiyuor2/rn-xnote</a></p><h2 id="react-native-webview" tabindex="-1">React Native WebView</h2><p><code>WebView</code>\u662F\u4E00\u4E2A\u80FD\u591F\u5728\u539F\u751F APP \u4E0A\u52A0\u8F7D HTML \u9875\u9762\u7684\u7EC4\u4EF6\uFF0C\u4E0D\u8FC7\u5B83\u6CA1\u6709\u63D0\u4F9B\u6D4F\u89C8\u5668\u7684\u5730\u5740\u680F\u3001\u5BFC\u822A\u680F\u7B49\u529F\u80FD\u3002\u5728\u539F\u751F APP \u7684\u5F00\u53D1\u4E2D\u7ECF\u5E38\u4F1A\u7528\u5230\u3002</p><h3 id="%E5%AE%89%E8%A3%85" tabindex="-1">\u5B89\u88C5</h3><pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> react-native-webview
<span class="token comment"># or yarn add react-native-webview</span>
</code></pre><h3 id="%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8" tabindex="-1">\u57FA\u672C\u4F7F\u7528</h3><h4 id="%E5%BC%95%E5%85%A5-url" tabindex="-1">\u5F15\u5165 URL</h4><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> WebView <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-native&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">MyWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">WebView</span></span> <span class="token attr-name">source</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&#39;https://github.com/facebook/react-native&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h4 id="%E5%BC%95%E5%85%A5%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6" tabindex="-1">\u5F15\u5165\u672C\u5730\u6587\u4EF6</h4><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> WebView<span class="token punctuation">,</span> Platform <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-native&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">MyWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">WebView</span></span>
      <span class="token attr-name">source</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>
        Platform<span class="token punctuation">.</span><span class="token constant">OS</span> <span class="token operator">===</span> <span class="token string">&#39;ios&#39;</span>
          <span class="token operator">?</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../../../assets/vditor.html&#39;</span><span class="token punctuation">)</span>
          <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&#39;file:///android_asset/vditor.html&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span></span>
    <span class="token punctuation">/&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="web-%E5%92%8C-react-native-%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1" tabindex="-1">Web \u548C React Native \u4E4B\u95F4\u7684\u901A\u4FE1</h3><p><strong>Web \u5230 React Native</strong></p><p><code>window.ReactNativeWebView.postMessage(message)</code>\u8BE5\u65B9\u6CD5\u63A5\u6536\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u5E76\u5C06\u8BE5\u5B57\u7B26\u4E32\u53D1\u9001\u5230 React Native \u4E2D\u3002\u5728 React Native \u4E2D\u4F7F\u7528<code>WebView</code>\u7EC4\u4EF6\u7684<code>onMessage</code>\u5C5E\u6027\u63A5\u6536</p><p><strong>React Native \u5230 Web</strong></p><ul><li><code>injectedJavaScript</code>\u5411\u7F51\u9875\u4E2D\u6CE8\u5165 js</li><li><code>injectedJavaScriptBeforeContentLoaded</code>\u5728\u7F51\u9875\u52A0\u8F7D\u4E4B\u524D\u5411\u7F51\u9875\u4E2D\u6CE8\u5165 js</li><li><code>postMessage(message)</code>\u5411\u7F51\u9875\u4E2D\u53D1\u9001\u6D88\u606F\uFF0C\u4E0E<code>window.ReactNativeWebView.postMessage(message)</code>\u76F8\u5BF9\u5E94\u3002\u7F51\u9875\u53EF\u4EE5\u901A\u8FC7\u76D1\u542C<code>message</code>\u4E8B\u4EF6\u6536\u5230\u6D88\u606F\u3002</li></ul><blockquote><p>\u66F4\u591A API \u8BF7\u67E5\u770B<a href="https://reactnative.cn/docs/webview">WebView \u6587\u6863</a></p></blockquote><h2 id="%E5%B0%81%E8%A3%85-vditor" tabindex="-1">\u5C01\u88C5 Vditor</h2><h3 id="%E5%87%86%E5%A4%87-html-%E6%96%87%E4%BB%B6" tabindex="-1">\u51C6\u5907 HTML \u6587\u4EF6</h3><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span>
      <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0, user-scalable=no<span class="token punctuation">&quot;</span></span>
    <span class="token punctuation">/&gt;</span></span>
    <span class="token comment">&lt;!-- \u4EE5\u4E0B\u6587\u4EF6\u5EFA\u8BAE\u653E\u5230\u672C\u5730\u4F7F\u7528 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
      <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/vditor/dist/index.css<span class="token punctuation">&quot;</span></span>
    <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/vditor/dist/index.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>vditor<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
      <span class="token comment">// window.options \u4F1A\u5728React Native\u4E2D\u901A\u8FC7injectedJavaScriptBeforeContentLoaded\u6CE8\u5165</span>
      <span class="token keyword">const</span> vditor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vditor</span><span class="token punctuation">(</span><span class="token string">&#39;vditor&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>window<span class="token punctuation">.</span>options<span class="token punctuation">,</span>
        <span class="token comment">// \u5411\u7F16\u8F91\u5668\u8F93\u5165\u65F6\uFF0C\u901A\u8FC7postMessage\u5411React Native\u53D1\u9001\u6D88\u606F\uFF0C\u89E6\u53D1onMessage</span>
        <span class="token function-variable function">input</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;onChange&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">message</span><span class="token operator">:</span> value<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">;</span>
          window<span class="token punctuation">.</span>ReactNativeWebView<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// \u76D1\u542CReact Native\u53D1\u9001\u6765\u7684\u6D88\u606F</span>
      window<span class="token punctuation">.</span>document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        vditor<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u5982\u679C\u662F\u5B89\u5353\u5F00\u53D1\uFF0C\u9700\u8981\u5C06\u8BE5\u6587\u4EF6\u653E\u5230<code>your-project/android/app/src/main/assets/</code>\u4E0B\uFF0C\u4E4B\u540E\u901A\u8FC7<code>{uri: &#39;file:///android_asset/xxxx.html&#39;}</code>\u5F15\u5165</p><h3 id="react-native-%E7%BB%84%E4%BB%B6" tabindex="-1">React Native \u7EC4\u4EF6</h3><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useRef<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> WebView<span class="token punctuation">,</span> WebViewMessageEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-native-webview&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Vditor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> webviewRef <span class="token operator">=</span> useRef <span class="token operator">&lt;</span> WebView <span class="token operator">&gt;</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>content<span class="token punctuation">,</span> setContent<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u6CE8\u5165\u5230\u7F51\u9875\u4E2D\u7684vditor\u914D\u7F6E\u6570\u636E</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">window.options=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;ir&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">toolbar</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">outline</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token keyword">debugger</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">&#39;\u53EF\u4F7F\u7528markdown\u8BED\u6CD5...&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

  <span class="token comment">//#region \u521D\u59CB\u5316\u7F16\u8F91\u5668\u5185\u5BB9</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">fetchData</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u83B7\u53D6\u521D\u59CB\u5316\u7684\u6570\u636E</span>
      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">setContent</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    webviewRef<span class="token punctuation">.</span>current<span class="token operator">?.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>content<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//#endregion</span>

  <span class="token keyword">const</span> <span class="token function-variable function">onMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">e</span><span class="token operator">:</span> WebViewMessageEvent</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>nativeEvent<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;onChange&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setContent</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">WebView</span></span>
      <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>webviewRef<span class="token punctuation">}</span></span>
      <span class="token attr-name">onMessage</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>onMessage<span class="token punctuation">}</span></span>
      <span class="token attr-name">javaScriptEnabled</span>
      <span class="token attr-name">source</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>
        Platform<span class="token punctuation">.</span><span class="token constant">OS</span> <span class="token operator">===</span> <span class="token string">&#39;ios&#39;</span>
          <span class="token operator">?</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../../../assets/vditor.html&#39;</span><span class="token punctuation">)</span>
          <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&#39;file:///android_asset/vditor.html&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span></span>
      <span class="token attr-name">injectedJavaScriptBeforeContentLoaded</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>options<span class="token punctuation">}</span></span>
      <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>
        <span class="token literal-property property">height</span><span class="token operator">:</span> Dimensions<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;window&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>height<span class="token punctuation">,</span>
        <span class="token literal-property property">width</span><span class="token operator">:</span> Dimensions<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;window&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
    <span class="token punctuation">/&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><blockquote><p>\u6CE8\u610F\uFF1AReact Native \u4E2D\u4F7F\u7528 WebView \u5FC5\u987B\u8981\u7ED9\u4ED6\u8BBE\u7F6E\u5BBD\u548C\u9AD8\uFF0C\u4E0D\u7136\u53EF\u80FD\u4F1A\u5BFC\u81F4\u5E94\u7528\u5361\u6B7B</p></blockquote><p>\u5B8C\u6574\u9879\u76EE\u5730\u5740\uFF1A<a href="https://github.com/qiyuor2/rn-xnote">qiyuor2/rn-xnote</a></p><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://juejin.cn/post/6867945949788897288">\u624B\u6478\u624B\u5E26\u4F60\u5C01\u88C5 React Native \u5BCC\u6587\u672C\u7F16\u8F91\u5668</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2021/package-md-editor-for-rn.md");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
var __glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$6,
  date: date$6,
  tags: tags$2,
  category: category$2,
  summary: summary$6,
  meta: meta$6,
  "default": _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const title$5 = "\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668";
const date$5 = "2021/02/07 19:55:00";
const tags$1 = ["nodejs", "JavaScript", "blog", "website", "cli"];
const category$1 = "\u6280\u672F";
const summary$5 = "\u4F5C\u4E3A\u4E00\u540D\u7A0B\u5E8F\u5458\uFF0C\u5199\u535A\u5BA2\u662F\u79EF\u7D2F\u77E5\u8BC6\u3001\u63D0\u5347\u6C34\u5E73\u5FC5\u4E0D\u53EF\u5C11\u7684\u4E00\u4E2A\u65B9\u6CD5\u3002\u6211\u4EEC\u5199\u535A\u5BA2\u4E3B\u8981\u6709\u4E09\u79CD\u65B9\u6CD5\uFF0C\u4E00\u79CD\u662F\u4F7F\u7528\u6398\u91D1\u3001\u535A\u5BA2\u56ED\u3001CSDN \u7B49\u535A\u5BA2\u7F51\u7AD9\uFF0C\u7B2C\u4E8C\u79CD\u662F\u81EA\u5DF1\u642D\u5EFA\u7F51\u7AD9\uFF0C\u5B58\u653E\u81EA\u5DF1\u7684\u535A\u5BA2\uFF0C\u7B2C\u4E09\u79CD\u5C31\u662F\u4F7F\u7528\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668\uFF0C\u5C06\u751F\u6210\u7684\u7F51\u9875\u90E8\u7F72\u5230\u670D\u52A1\u5668\u6216\u8005 github pages\u3001gitee pages \u7B49\u670D\u52A1\u4E0A\u3002\u8FD9...";
const meta$5 = [{ "property": "og:title", "content": "\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668" }];
const _sfc_main$i = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668", "date": "2021/02/07 19:55:00", "tags": ["nodejs", "JavaScript", "blog", "website", "cli"], "category": "\u6280\u672F", "summary": "\u4F5C\u4E3A\u4E00\u540D\u7A0B\u5E8F\u5458\uFF0C\u5199\u535A\u5BA2\u662F\u79EF\u7D2F\u77E5\u8BC6\u3001\u63D0\u5347\u6C34\u5E73\u5FC5\u4E0D\u53EF\u5C11\u7684\u4E00\u4E2A\u65B9\u6CD5\u3002\u6211\u4EEC\u5199\u535A\u5BA2\u4E3B\u8981\u6709\u4E09\u79CD\u65B9\u6CD5\uFF0C\u4E00\u79CD\u662F\u4F7F\u7528\u6398\u91D1\u3001\u535A\u5BA2\u56ED\u3001CSDN \u7B49\u535A\u5BA2\u7F51\u7AD9\uFF0C\u7B2C\u4E8C\u79CD\u662F\u81EA\u5DF1\u642D\u5EFA\u7F51\u7AD9\uFF0C\u5B58\u653E\u81EA\u5DF1\u7684\u535A\u5BA2\uFF0C\u7B2C\u4E09\u79CD\u5C31\u662F\u4F7F\u7528\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668\uFF0C\u5C06\u751F\u6210\u7684\u7F51\u9875\u90E8\u7F72\u5230\u670D\u52A1\u5668\u6216\u8005 github pages\u3001gitee pages \u7B49\u670D\u52A1\u4E0A\u3002\u8FD9...", "meta": [{ "property": "og:title", "content": "\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668", "meta": [{ "property": "og:title", "content": "\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u4F5C\u4E3A\u4E00\u540D\u7A0B\u5E8F\u5458\uFF0C\u5199\u535A\u5BA2\u662F\u79EF\u7D2F\u77E5\u8BC6\u3001\u63D0\u5347\u6C34\u5E73\u5FC5\u4E0D\u53EF\u5C11\u7684\u4E00\u4E2A\u65B9\u6CD5\u3002\u6211\u4EEC\u5199\u535A\u5BA2\u4E3B\u8981\u6709\u4E09\u79CD\u65B9\u6CD5\uFF0C\u4E00\u79CD\u662F\u4F7F\u7528\u6398\u91D1\u3001\u535A\u5BA2\u56ED\u3001CSDN \u7B49\u535A\u5BA2\u7F51\u7AD9\uFF0C\u7B2C\u4E8C\u79CD\u662F\u81EA\u5DF1\u642D\u5EFA\u7F51\u7AD9\uFF0C\u5B58\u653E\u81EA\u5DF1\u7684\u535A\u5BA2\uFF0C\u7B2C\u4E09\u79CD\u5C31\u662F\u4F7F\u7528\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668\uFF0C\u5C06\u751F\u6210\u7684\u7F51\u9875\u90E8\u7F72\u5230\u670D\u52A1\u5668\u6216\u8005 github pages\u3001gitee pages \u7B49\u670D\u52A1\u4E0A\u3002</p><p>\u8FD9\u4E09\u79CD\u65B9\u6CD5\u4E2D\uFF0C\u7B2C\u4E00\u79CD\u81EA\u7531\u5EA6\u592A\u4F4E\uFF0C\u5E76\u4E14\u5B9A\u5236\u6837\u5F0F\u5F88\u9EBB\u70E6\uFF1B\u7B2C\u4E8C\u79CD\u6BCF\u5199\u4E00\u7BC7\u535A\u5BA2\u90FD\u8981\u65B0\u5EFA\u4E2A\u9875\u9762\uFF0C\u975E\u5E38\u9EBB\u70E6\u3002\u56E0\u6B64\u6211\u9009\u62E9\u4E86\u7B2C\u4E09\u79CD\u65B9\u6CD5\uFF0C\u5728\u4F7F\u7528\u4E86 hexo\u3001vuepress\uFF0Cgridea \u7B49\u591A\u79CD\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668\u540E\uFF0C\u6211\u51B3\u5B9A\u81EA\u5DF1\u5199\u4E00\u4E2A\u6765\u63D0\u5347\u81EA\u5DF1\u7684\u80FD\u529B\u3002</p><blockquote><p>\u9879\u76EE\u5730\u5740\uFF1A<a href="https://github.com/qiyuor2/CoinRailgun">https://github.com/qiyuor2/CoinRailgun</a></p></blockquote><h2 id="%E6%98%8E%E7%A1%AE%E9%9C%80%E6%B1%82" tabindex="-1">\u660E\u786E\u9700\u6C42</h2><p>\u9996\u5148\u6211\u4EEC\u8981\u660E\u786E\u9700\u6C42\uFF0C\u786E\u5B9A\u6211\u4EEC\u60F3\u8981\u7684\u6548\u679C</p><ul><li>\u521D\u59CB\u5316\u535A\u5BA2\u6587\u4EF6\u5939\uFF0C\u8F7D\u5165\u6A21\u677F<code>crn init</code></li><li>\u6839\u636E\u6A21\u677F\u521B\u5EFA markdown \u6587\u4EF6\uFF0C<code>crn new &quot;Hello CoinRailgun&quot;</code></li><li>\u6839\u636E markdown \u6587\u4EF6\u751F\u6210 html \u6587\u4EF6\uFF0C<code>crn build</code></li><li>\u672C\u5730\u8FD0\u884C\u7F51\u7AD9\uFF0C<code>crn server</code></li></ul><h2 id="%E5%BC%80%E5%A7%8B%E7%BC%96%E5%86%99" tabindex="-1">\u5F00\u59CB\u7F16\u5199</h2><h3 id="%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96" tabindex="-1">\u5B89\u88C5\u4F9D\u8D56</h3><p>\u6839\u636E\u4E0A\u9762\u6211\u4EEC\u5206\u6790\u51FA\u6765\u7684\u9700\u6C42\uFF0C\u786E\u5B9A\u51FA\u6211\u4EEC\u6240\u9700\u8981\u7684\u4F9D\u8D56\uFF0C\u5E76\u4E14\u5B89\u88C5\u597D\u4ED6\u4EEC</p><ul><li><code>art-template</code>\u7F16\u5199\u6A21\u677F\u6240\u7528\u7684\u6A21\u677F\u5F15\u64CE</li><li><code>commander</code>\u7528\u6765\u7F16\u5199 cli</li><li><code>dayjs</code>\u5904\u7406\u65F6\u95F4</li><li><code>front-matter</code>\u5904\u7406 markdown \u9876\u90E8\u7684 yml \u58F0\u660E</li><li><code>fs-extra</code>fs \u7684\u6269\u5145\u6A21\u5757</li><li><code>glob</code>\u5339\u914D\u6307\u5B9A\u6587\u4EF6\u540D</li><li><code>highlight.js</code>\u9AD8\u4EAE\u4EE3\u7801\u5757</li><li><code>koa</code>\u548C<code>koa-static</code>\u542F\u52A8\u672C\u5730\u670D\u52A1</li><li><code>markdown-it</code>\u3001<code>markdown-it-anchor</code>\u3001<code>markdown-it-toc-done-right</code>\u89E3\u6790 markdown</li><li><code>uslug</code>\u89E3\u6790\u951A\u70B9\u7684\u6C49\u5B57</li></ul><pre class="language-json"><code class="language-json"><span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;art-template&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.13.2&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;commander&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dayjs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.10.4&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;front-matter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.2&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;fs-extra&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^9.1.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;glob&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.1.6&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;highlight.js&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^10.5.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;koa&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.13.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;koa-static&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^5.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;markdown-it&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^12.0.4&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;markdown-it-anchor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.0.1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;markdown-it-toc-done-right&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.2.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;uslug&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.0.4&quot;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84" tabindex="-1">\u642D\u5EFA\u9879\u76EE\u7ED3\u6784</h3><pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">.</span>
\u251C\u2500 bin
\u2502    \u2514\u2500 crn.js  <span class="token comment"># \u6267\u884C\u6587\u4EF6</span>
\u251C\u2500 lib	<span class="token comment"># crn.js\u8C03\u7528\u7684\u5404\u4E2A\u51FD\u6570</span>
\u2502    \u251C\u2500 build.js
\u2502    \u251C\u2500 clean.js
\u2502    \u251C\u2500 new.js
\u2502    \u251C\u2500 preview.js
\u2502    \u2514\u2500 init.js
\u251C\u2500 package.json
\u2514\u2500 template <span class="token comment"># \u6A21\u677F</span>
       \u251C\u2500 site.config.json <span class="token comment"># \u914D\u7F6E\u6587\u4EF6</span>
       \u2514\u2500 theme <span class="token comment"># \u4E3B\u9898</span>
              \u2514\u2500 default <span class="token comment"># \u9ED8\u8BA4\u4E3B\u9898</span>
                     \u251C\u2500 assets
                     \u2514\u2500 layout
</code></pre><h3 id="crn.js" tabindex="-1">crn.js</h3><p>\u540C\u6837\uFF0C\u6839\u636E\u9700\u6C42\u5C06\u5404\u4E2A\u547D\u4EE4\u3001\u547D\u4EE4\u7684\u53C2\u6570\u548C\u8BF4\u660E\u5148\u5199\u51FA\u6765</p><p>\u5173\u4E8E<code>commander</code>\u5177\u4F53\u5982\u4F55\u4F7F\u7528\uFF0C\u53EF\u4EE5\u67E5\u770B<a href="https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md">commander \u6587\u6863</a></p><pre class="language-js"><code class="language-js"><span class="token hashbang comment">#! /usr/bin/env node</span>

<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;commander&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> version <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../package.json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>version<span class="token punctuation">;</span>

program
  <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span>version<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;init [dir]&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&#39;\u521D\u59CB\u5316\u535A\u5BA2&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../lib/init&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;new &lt;name&gt;&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&#39;\u521B\u5EFA\u65B0\u7684\u6587\u7AE0&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../lib/new.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;server [dir]&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&#39;\u672C\u5730\u9884\u89C8\u7F51\u7AD9&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">&#39;-d, --dir &lt;dir&gt;&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;build\u65F6\u8F93\u51FA\u7684\u76EE\u5F55&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../lib/preview.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;build [dir]&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&#39;\u5C06\u6587\u7AE0\u6E32\u67D3\u4E3Ahtml&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">&#39;-o, --output &lt;dir&gt;&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u8F93\u51FA\u76EE\u5F55&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../lib/build&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;clean&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&#39;\u6E05\u7A7Abuild\u51FA\u6765\u7684\u9759\u6001\u6587\u4EF6&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">&#39;-d, --dir &lt;dir&gt;&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;build\u65F6\u8F93\u51FA\u7684\u76EE\u5F55&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;../lib/clean.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="init" tabindex="-1">init</h3><p>\u521D\u59CB\u5316\u7684\u65F6\u5019\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A\u76EE\u5F55\uFF0C\u8868\u793A\u51C6\u5907\u521D\u59CB\u5316\u7684\u76EE\u5F55\uFF0C\u8FD9\u91CC\u6211\u7528\u4E86<code>ES2020</code>\u7684\u65B0\u8BED\u6CD5<code>dir = dir ?? &#39;.&#39;</code>\uFF0C\u5F53<code>dir</code>\u4E3A<code>null</code>\u6216<code>undefined</code>\u65F6\uFF0C\u4F7F\u7528\u95EE\u53F7\u53F3\u8FB9\u7684\u503C\u3002</p><p>\u5728\u521D\u59CB\u5316\u7684\u65F6\u5019\uFF0C\u9700\u8981\u660E\u786E\u597D\u7528\u6237\u4F7F\u7528\u7684\u76EE\u5F55\u5E94\u8BE5\u662F\u4EC0\u4E48\u6837\u7684</p><pre class="language-bash"><code class="language-bash">Blog
\u251C\u2500 build
\u251C\u2500 site.config.json
\u251C\u2500 <span class="token builtin class-name">source</span>
\u2502    \u2514\u2500 _posts
\u2502           \u2514\u2500 blog.md
\u2514\u2500 theme
       \u2514\u2500 default
              \u251C\u2500 assets
              \u2514\u2500 layout
</code></pre><p>\u5C06\u9884\u5148\u51C6\u5907\u597D\u7684\u6A21\u677F\u6839\u636E\u8BBE\u8BA1\u7684\u76EE\u5F55\u62F7\u8D1D\u5230\u76EE\u6807\u76EE\u5F55\u4E0B\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u8C03\u7528\u9879\u76EE\u4E2D\u7684\uFF0C\u56E0\u4E3A\u62F7\u8D1D\u5230\u76EE\u6807\u76EE\u5F55\u4E0B\u540E\uFF0C\u4F7F\u7528\u8005\u5C31\u53EF\u4EE5\u66F4\u65B9\u4FBF\u7684\u81EA\u5B9A\u4E49\u6A21\u677F\uFF0C\u53EF\u4EE5\u66F4\u65B9\u4FBF\u7684\u5199\u81EA\u5DF1\u7684\u6837\u5F0F\u3002</p><p>\u5173\u4E8E<code>fs-extra</code>\u6A21\u5757\u7684\u5404\u79CD API \u53EF\u4EE5\u67E5\u770B<a href="https://github.com/jprichardson/node-fs-extra">fs-extra \u6587\u6863</a></p><p>\u5173\u4E8E<code>dayjs</code>\u53EF\u4EE5\u67E5\u770B<a href="https://dayjs.gitee.io/zh-CN/">dayjs \u6587\u6863</a></p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs-extra&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> dayjs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;dayjs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  dir <span class="token operator">=</span> dir <span class="token operator">??</span> <span class="token string">&#39;.&#39;</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> templateDir <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;..&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  fs<span class="token punctuation">.</span><span class="token function">copySync</span><span class="token punctuation">(</span>templateDir<span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  fs<span class="token punctuation">.</span><span class="token function">ensureDirSync</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> <span class="token string">&#39;source&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">newPost</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">newPost</span><span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> firstPost <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;---&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;title: Hello World&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;date: &#39;</span> <span class="token operator">+</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&#39;YYYY/MM/DD HH:mm:ss&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">&#39;tags: &#39;</span> <span class="token operator">+</span> <span class="token string">&#39;[blog,CoinRailgunn]&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;category: &#39;</span> <span class="token operator">+</span> <span class="token string">&#39;welcome&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;---&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;Welcome to my blog, this is my first post&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;&lt;!-- more --&gt;&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> file <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> <span class="token string">&#39;source&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;_posts&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hello.md&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  fs<span class="token punctuation">.</span><span class="token function">outputFileSync</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> firstPost<span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u535A\u5BA2\u521D\u59CB\u5316\u5B8C\u6210\uFF0C\u952E\u5165&#39;crn new &lt;postName&gt;&#39;\u5373\u53EF\u521B\u5EFA\u65B0\u7684\u6587\u7AE0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="new" tabindex="-1">new</h3><p>\u521B\u5EFA\u65B0\u6587\u7AE0\u7684\u51FD\u6570\u548C\u521D\u59CB\u5316\u51FD\u6570\u6709\u90E8\u5206\u7684\u903B\u8F91\u662F\u76F8\u540C\u7684\uFF0C\u8FD9\u91CC\u6211\u6CA1\u6709\u5C06\u4ED6\u4EEC\u5C01\u88C5\u8D77\u6765\uFF0C\u5982\u679C\u611F\u5174\u8DA3\u7684\u8BDD\u4F60\u4EEC\u53EF\u4EE5\u8BD5\u8BD5\u3002\u521B\u5EFA\u6587\u7AE0\u9700\u8981\u4F20\u5165\u4E00\u4E2A name\uFF0C\u4E3A\u521B\u5EFA\u7684\u6587\u7AE0\u540D\uFF0C\u7136\u540E\u5C06\u5176\u4FDD\u5B58\u81F3<code>source/_post</code>\u4E0B</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs-extra&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> dayjs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;dayjs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> post <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;---&#39;</span><span class="token punctuation">,</span>
    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">title: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token string">&#39;date: &#39;</span> <span class="token operator">+</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&#39;YYYY/MM/DD HH:mm:ss&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">&#39;tags: &#39;</span> <span class="token operator">+</span> <span class="token string">&#39;[blog]&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;category: &#39;</span> <span class="token operator">+</span> <span class="token string">&#39;code&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;---&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> file <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;source&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;_posts&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.md</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  fs<span class="token punctuation">.</span><span class="token function">outputFileSync</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> post<span class="token punctuation">)</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">source/_posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.md \u521B\u5EFA\u6210\u529F\uFF01</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><h3 id="build" tabindex="-1">build</h3><p>\u751F\u6210\u9759\u6001\u9875\u662F\u6574\u4E2A\u9879\u76EE\u6700\u5173\u952E\u7684\u90E8\u5206\uFF0C\u56E0\u4E3A\u4EE3\u7801\u5F88\u591A\u8FD9\u91CC\u8BB2\u4E00\u4E0B\u6211\u7684\u601D\u8DEF\uFF0C\u8BE6\u7EC6\u4EE3\u7801\u53EF\u4EE5\u67E5\u770B<a href="https://github.com/qiyuor2/CoinRailgun">\u9879\u76EE\u4ED3\u5E93</a></p><p>\u9996\u5148\u6211\u4EEC\u8981\u8BBE\u8BA1\u597D\u5404\u4E2A\u9875\u9762\u7684 url\uFF0C\u4EE5\u4E0B\u4E3A\u6211\u7684\u8BBE\u8BA1\uFF1A</p><ul><li>\u9996\u9875\uFF1A<code>/index.html</code>\u548C<code>/page/1/index.html</code></li><li>\u4E0D\u540C\u9875\u7801\uFF1A<code>/page/\u9875\u7801/index.html</code></li><li>\u6587\u7AE0\u9875\uFF1A<code>/categories/\u5206\u7C7B\u540D/\u6587\u7AE0\u540D/index.html</code></li><li>\u5173\u4E8E\u6211\u9875\u9762\uFF1A<code>/about/index.html</code></li><li>\u5F52\u6863\u9875\uFF1A<code>/archives/index.html</code></li><li>\u5206\u7C7B\u9875\uFF1A<code>/categories/index.html</code></li><li>\u6807\u7B7E\u9875\uFF1A<code>/tags/index.html</code></li><li>404 \u9875\uFF1A<code>/404/index.html</code>\uFF08\u8FD9\u4E2A\u6211\u5FD8\u4E86\u505A\u4E86</li></ul><p>\u76EE\u524D\u7684\u6D4F\u89C8\u5668\u4F1A\u81EA\u52A8\u9690\u85CF<code>index.html</code>\uFF0C\u56E0\u6B64\u4F7F\u7528<code>\u76EE\u5F55\u540D/index.html</code>\u7684\u65B9\u5F0F\u53EF\u4EE5\u7F8E\u5316\u9875\u9762\u7684\u5730\u5740\u680F</p><p>\u7B2C\u4E00\u6B65\uFF0C\u6839\u636E\u8BBE\u8BA1\u597D\u7684 url \u7F16\u5199\u597D\u5404\u4E2A\u9875\u9762<a href="https://github.com/qiyuor2/CoinRailgun/tree/main/template/theme/default/layout">\u6A21\u677F</a>\uFF0C\u8FD9\u91CC\u6211\u4F7F\u7528\u7684\u662F<a href="https://aui.github.io/art-template/zh-cn/docs/index.html">art-template</a></p><ul><li><code>template/theme/default/layout/layout.art</code></li><li><code>template/theme/default/layout/page.art</code></li><li>\u5176\u4ED6\u8BF7\u67E5\u770B<a href="https://github.com/qiyuor2/CoinRailgun/tree/main/template/theme/default/layout">CoinRailgun \u9ED8\u8BA4\u4E3B\u9898\u6A21\u677F</a></li></ul><p>\u7136\u540E\uFF0C\u4E00\u4E9B\u7F51\u7AD9\u7684\u57FA\u7840\u6570\u636E\uFF0C\u6BD4\u5982 author\u3001keywords\u3001description \u7B49\uFF0C\u662F\u4E0D\u4F1A\u53D1\u751F\u6539\u53D8\u7684\uFF0C\u56E0\u6B64\u9700\u8981\u5C06\u4ED6\u4EEC\u5199\u5728\u7EDF\u4E00\u7684\u914D\u7F6E\u6587\u4EF6\u91CC<a href="https://github.com/qiyuor2/CoinRailgun/blob/main/template/site.config.json">site.config.json</a>\uFF0C\u4E0B\u9762\u662F\u6211\u7684\u90E8\u5206\u914D\u7F6E\u6587\u4EF6</p><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">&quot;basic&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avatar&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;keywords&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;theme&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;highlight&quot;</span><span class="token operator">:</span> <span class="token string">&quot;github-gist&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;pageSize&quot;</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
    <span class="token property">&quot;exclude&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;life&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;friends&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;about&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;about me.&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/about&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;nav&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;archives&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u5F52\u6863&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/archives&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;categories&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u5206\u7C7B&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/categories&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tags&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u6807\u7B7E&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/tags&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;links&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;footer&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;beian&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;copyright&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;year&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2019-2021&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dev_server&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">3000</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>\u5728\u6839\u636E markdown \u548C\u6A21\u677F\u751F\u6210 html \u65F6\uFF0C\u6211\u4EEC\u8981\u786E\u5B9A\u6A21\u677F\u4E0A\u9700\u8981\u7684\u6570\u636E\uFF0C\u5E76\u4E14\u5C06\u914D\u7F6E\u6587\u4EF6\u548C markdown \u7684\u5185\u5BB9\u8F6C\u6362\u4E3A\u6A21\u677F\u4E0A\u7684\u6570\u636E</p><pre class="language-html"><code class="language-html"><span class="token comment">&lt;!-- layout/post_item.art --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post-item__title<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{url}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post-item__desc<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post-item__desc-date<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fa fa-calendar<span class="token punctuation">&quot;</span></span> <span class="token attr-name">aria-hidden</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">&gt;</span></span>
    {{date}}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post-item__desc-category<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fa fa-folder-o<span class="token punctuation">&quot;</span></span> <span class="token attr-name">aria-hidden</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/categories<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{category || &#39;&#39;}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post-item__abstract<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post-item__abstract-content<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{@ abstracts}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>more<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span>none<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{url}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u67E5\u770B\u66F4\u591A<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>post-item__tags<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  {{each tags}}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/tags<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fa fa-tag<span class="token punctuation">&quot;</span></span> <span class="token attr-name">aria-hidden</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">&gt;</span></span>
    {{$value}}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
  {{/each}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><p>\u4EE5\u6587\u7AE0\u5217\u8868\u9879\u4E3A\u4F8B\uFF0C\u8FD9\u4E2A\u6A21\u677F\u9700\u8981<code>title</code>\u3001<code>date</code>\u3001<code>category</code>\u3001<code>url</code>\u3001<code>abstracts</code>\u548C<code>tags</code>\uFF0C\u5176\u4E2D<code>url</code>\u662F\u6839\u636E\u8BBE\u8BA1\u597D\u7684<code>/categories/\u5206\u7C7B\u540D/\u6587\u7AE0\u540D/index.html</code>\u751F\u6210\u51FA\u6765\u7684\uFF0C\u5176\u4ED6\u7684\u53C2\u6570\u90FD\u662F\u4ECE markdown \u6587\u4EF6\u4E2D\u89E3\u6790\u51FA\u6765\u7684\uFF0C\u5E76\u4E14\u8FD9\u4E9B\u53C2\u6570\u90FD\u5199\u5728\u6587\u4EF6\u5934\u90E8\u7684 yml \u914D\u7F6E\u4E2D\uFF0C\u800C<code>abstracts</code>\u4E00\u822C\u662F\u4F7F\u7528<code>&lt;!--more--&gt;</code>\u5206\u5272\u51FA\u6765\u3002</p><p>\u660E\u786E\u4E86\u4EE5\u4E0A\u5185\u5BB9\u540E\uFF0C\u6211\u4EEC\u5C31\u9700\u8981\u83B7\u53D6\u8FD9\u4E9B\u53C2\u6570\u7136\u540E\u4F20\u9012\u7ED9\u6A21\u677F\u6E32\u67D3\u51FA\u6765</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> template <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>postTemplate<span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> content <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fm <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;front-matter&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">renderAbstracts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ....</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> postItem <span class="token operator">=</span> art<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span><span class="token function">fm</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">.</span>attributes<span class="token punctuation">,</span>
  <span class="token literal-property property">abstracts</span><span class="token operator">:</span> <span class="token function">renderAbstracts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>\u8FD9\u6837\u6211\u4EEC\u5C31\u5F97\u5230\u4E86\u6E32\u67D3\u540E\u7684\u6587\u7AE0\u5217\u8868\u9879\uFF0C\u7136\u540E\u518D\u4F20\u5165<code>post_list.art</code> \u6E32\u67D3\u51FA\u6765\u6587\u7AE0\u5217\u8868\u540E\u4F20\u5165<code>page.art</code>\u4E2D\uFF0C\u4E0E\u5176\u4ED6\u7684\u6570\u636E\u76F8\u7EC4\u5408\u62FF\u5230\u5B8C\u6574\u7684\u4E00\u4E2A\u9875\u9762\u3002\u6E32\u67D3\u51FA\u9875\u9762\u540E\u4F7F\u7528<code>fs.outputFileSync</code>\u5C06\u9875\u9762\u4FDD\u5B58\u5230\u4E00\u5F00\u59CB\u8BBE\u8BA1\u597D\u7684\u76EE\u5F55\u4E2D<code>build/page/1/index.html</code></p><p>\u5927\u81F4\u601D\u8DEF\u5C31\u662F\u8FD9\u6837\uFF0C\u66F4\u591A\u5177\u4F53\u5B9E\u73B0\u53EF\u4EE5\u67E5\u770B<a href="https://github.com/qiyuor2/CoinRailgun">\u9879\u76EE\u4ED3\u5E93</a></p><h3 id="server" tabindex="-1">server</h3><p>\u751F\u6210\u6240\u6709\u9875\u9762\u540E\uFF0C\u5C31\u53EF\u4EE5\u5F00\u542F\u672C\u5730\u9884\u89C8\u4E86\uFF0C\u8FD9\u91CC\u6211\u4F7F\u7528\u7684\u662F<code>koa</code>\uFF0C\u4F7F\u7528<code>express</code>\u6216\u8005\u5176\u4ED6\u7684\u6846\u67B6\u90FD\u662F\u5927\u5DEE\u4E0D\u5DEE\u7684\u3002\u76F4\u63A5\u5C06 build \u76EE\u5F55\u8BBE\u7F6E\u4E3A\u9759\u6001\u8D44\u6E90\u5373\u53EF\u8BBF\u95EE\u3002</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;koa&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> staticServe <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;koa-static&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">dir<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  dir <span class="token operator">=</span> dir <span class="token operator">??</span> <span class="token string">&#39;.&#39;</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> siteConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> <span class="token string">&#39;site.config.json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> outputDir <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> options<span class="token punctuation">.</span>dir <span class="token operator">??</span> <span class="token string">&#39;build&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">staticServe</span><span class="token punctuation">(</span>outputDir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>siteConfig<span class="token punctuation">.</span>dev_server<span class="token punctuation">.</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\u5728\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00 http://localhost:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>siteConfig<span class="token punctuation">.</span>dev_server<span class="token punctuation">.</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> \u4EE5\u9884\u89C8\u7F51\u9875</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>\u8FD9\u6837\u6211\u4EEC\u5C31\u4E86\u89E3\u4E86\u5236\u4F5C\u4E00\u4E2A\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668\u7684\u601D\u8DEF\u548C\u8FC7\u7A0B\u3002</p><h2 id="%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0" tabindex="-1">\u53C2\u8003\u6587\u7AE0</h2><ul><li><a href="https://qiankaijie.com/13.%E6%89%8B%E6%91%B8%E6%89%8B%E6%95%99%E4%BD%A0%E6%92%B8%E4%B8%80%E4%B8%AA%E9%9D%99%E6%80%81%E7%BD%91%E7%AB%99%E7%94%9F%E6%88%90%E5%99%A8.html">\u624B\u6478\u624B\u6559\u4F60\u64B8\u4E00\u4E2A\u9759\u6001\u7F51\u7AD9\u751F\u6210\u5668</a></li><li><a href="https://juejin.cn/post/6844903503651930119">\u81EA\u5DF1\u52A8\u624B\u64B8\u4E00\u4E2A\u9759\u6001\u535A\u5BA2\u751F\u6210\u5668</a></li></ul></div>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2021/simple-blog-generate.md");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
var __glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$5,
  date: date$5,
  tags: tags$1,
  category: category$1,
  summary: summary$5,
  meta: meta$5,
  "default": _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const title$4 = "\u4F7F\u7528Webpack\u6784\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F";
const date$4 = "2021/03/15 20:32:48";
const tags = ["webpack", "JavaScript"];
const category = "\u6280\u672F";
const summary$4 = "\u4F7F\u7528webpack\u642D\u5EFA\u5355\u9875\u9762\u7A0B\u5E8F\u5341\u5206\u5E38\u89C1\uFF0C\u4F46\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\u6211\u4EEC\u53EF\u80FD\u8FD8\u4F1A\u6709\u5F00\u53D1\u591A\u9875\u9762\u7A0B\u5E8F\u7684\u9700\u6C42\uFF0C\u56E0\u6B64\u6211\u7814\u7A76\u4E86\u4E00\u4E0B\u5982\u4F55\u4F7F\u7528webpack\u642D\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F\u3002";
const meta$4 = [{ "property": "og:title", "content": "\u4F7F\u7528Webpack\u6784\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F" }];
const _sfc_main$h = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u4F7F\u7528Webpack\u6784\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F", "date": "2021/03/15 20:32:48", "tags": ["webpack", "JavaScript"], "category": "\u6280\u672F", "summary": "\u4F7F\u7528webpack\u642D\u5EFA\u5355\u9875\u9762\u7A0B\u5E8F\u5341\u5206\u5E38\u89C1\uFF0C\u4F46\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\u6211\u4EEC\u53EF\u80FD\u8FD8\u4F1A\u6709\u5F00\u53D1\u591A\u9875\u9762\u7A0B\u5E8F\u7684\u9700\u6C42\uFF0C\u56E0\u6B64\u6211\u7814\u7A76\u4E86\u4E00\u4E0B\u5982\u4F55\u4F7F\u7528webpack\u642D\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F\u3002", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528Webpack\u6784\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u4F7F\u7528Webpack\u6784\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F", "meta": [{ "property": "og:title", "content": "\u4F7F\u7528Webpack\u6784\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>\u4F7F\u7528 webpack \u642D\u5EFA\u5355\u9875\u9762\u7A0B\u5E8F\u5341\u5206\u5E38\u89C1\uFF0C\u4F46\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\u6211\u4EEC\u53EF\u80FD\u8FD8\u4F1A\u6709\u5F00\u53D1\u591A\u9875\u9762\u7A0B\u5E8F\u7684\u9700\u6C42\uFF0C\u56E0\u6B64\u6211\u7814\u7A76\u4E86\u4E00\u4E0B\u5982\u4F55\u4F7F\u7528 webpack \u642D\u5EFA\u591A\u9875\u9762\u7A0B\u5E8F\u3002</p><h2 id="%E5%8E%9F%E7%90%86" tabindex="-1">\u539F\u7406</h2><p>\u5C06\u6BCF\u4E2A\u9875\u9762\u6240\u5728\u7684\u6587\u4EF6\u5939\u90FD\u770B\u4F5C\u662F\u4E00\u4E2A\u5355\u72EC\u7684\u5355\u9875\u9762\u7A0B\u5E8F\u76EE\u5F55\uFF0C\u914D\u7F6E\u591A\u4E2A<code>entry</code>\u4EE5\u53CA<code>html-webpack-plugin</code>\u5373\u53EF\u5B9E\u73B0\u591A\u9875\u9762\u6253\u5305\u3002</p><p>\u4E0B\u9762\u4E3A\u672C\u9879\u76EE\u76EE\u5F55\u7ED3\u6784</p><pre><code>.
\u251C\u2500 src
\u2502  \u2514\u2500 pages
\u2502       \u251C\u2500 about
\u2502       \u2502    \u251C\u2500 index.css
\u2502       \u2502    \u251C\u2500 index.html
\u2502       \u2502    \u2514\u2500 index.js
\u2502       \u2514\u2500 index
\u2502            \u251C\u2500 index.css
\u2502            \u251C\u2500 index.html
\u2502            \u2514\u2500 index.js
\u2514\u2500 webpack.config.js
</code></pre><h2 id="%E5%8D%95%E9%A1%B5%E9%9D%A2%E6%89%93%E5%8C%85%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE" tabindex="-1">\u5355\u9875\u9762\u6253\u5305\u57FA\u7840\u914D\u7F6E</h2><p>\u9996\u5148\u6211\u4EEC\u6765\u770B\u4E00\u4E0B\u5355\u9875\u9762\u7A0B\u5E8F\u7684 webpack \u57FA\u7840\u914D\u7F6E</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.html&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>\u8981\u60F3\u5C06\u5176\u6539\u4E3A\u591A\u9875\u9762\u7A0B\u5E8F\uFF0C\u5C31\u8981\u5C06\u5B83\u7684\u5355\u5165\u53E3\u548C\u5355 HTML \u6A21\u677F\u6539\u4E3A\u591A\u5165\u53E3\u548C\u591A HTML \u6A21\u677F</p><h2 id="%E5%A4%9A%E9%A1%B5%E9%9D%A2%E6%89%93%E5%8C%85%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE" tabindex="-1">\u591A\u9875\u9762\u6253\u5305\u57FA\u7840\u914D\u7F6E</h2><h3 id="%E6%94%B9%E9%80%A0%E5%85%A5%E5%8F%A3" tabindex="-1">\u6539\u9020\u5165\u53E3</h3><p>\u4F20\u7EDF\u7684\u591A\u5165\u53E3\u5199\u6CD5\u53EF\u4EE5\u5199\u6210\u952E\u503C\u5BF9\u7684\u5F62\u5F0F</p><pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token string">&#39;./src/pages/index/index.js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">about</span><span class="token operator">:</span> <span class="token string">&#39;./src/pages/about/index.js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><p>\u8FD9\u6837\u5199\u7684\u8BDD\uFF0C\u6BCF\u589E\u52A0\u4E00\u4E2A\u9875\u9762\u5C31\u9700\u8981\u624B\u52A8\u6DFB\u52A0\u4E00\u4E2A\u5165\u53E3\uFF0C\u6BD4\u8F83\u9EBB\u70E6\uFF0C\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u5B9A\u4E49\u4E00\u4E2A\u6839\u636E\u76EE\u5F55\u751F\u6210\u5165\u53E3\u7684\u51FD\u6570\u6765\u7B80\u5316\u6211\u4EEC\u7684\u64CD\u4F5C</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> glob <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;glob&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> entry <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  glob<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token string">&#39;./src/pages/**/index.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> name <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\/pages\\/(.+)\\/index.js</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    entry<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> file<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> entry<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E6%94%B9%E9%80%A0%E8%BE%93%E5%87%BA" tabindex="-1">\u6539\u9020\u8F93\u51FA</h3><p>\u5728\u8F93\u51FA\u7684\u914D\u7F6E\u9879\u4E2D\uFF0C\u518D\u5C06\u8F93\u51FA\u7684\u6587\u4EF6\u540D\u5199\u6B7B\u663E\u793A\u5DF2\u7ECF\u4E0D\u5408\u9002\u4E86\uFF0C\u56E0\u6B64\u6211\u4EEC\u8981\u5C06\u540D\u5B57\u6539\u4E3A\u4E0E\u6E90\u6587\u4EF6\u76F8\u5339\u914D\u7684\u540D\u5B57</p><pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;js/[name].[contenthash].js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="%E9%85%8D%E7%BD%AE%E5%A4%9A%E4%B8%AA-html-webpack-plugin" tabindex="-1">\u914D\u7F6E\u591A\u4E2A html-webpack-plugin</h3><p>\u4E0E\u5165\u53E3\u76F8\u540C\uFF0C\u53EF\u4EE5\u5C06\u4E0D\u540C\u7684 html \u6A21\u677F\u76F4\u63A5\u5199\u5165\u63D2\u4EF6\u914D\u7F6E\u4E2D\uFF0C\u8FD9\u91CC\u6211\u4EEC\u9700\u8981\u4E3A\u6BCF\u4E2A\u63D2\u4EF6\u914D\u7F6E\u4E0D\u540C\u7684<code>chunks</code>\uFF0C\u9632\u6B62 js \u6CE8\u5165\u5230\u9519\u8BEF\u7684 html \u4E2D</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;./src/pages/index/index.html&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;index&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;./src/pages/about/index.html&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;about&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;about.html&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>\u8FD9\u6837\u7684\u505A\u6CD5\u4E0E\u5165\u53E3\u6709\u7740\u540C\u6837\u7684\u6BDB\u75C5\uFF0C\u56E0\u6B64\u6211\u4EEC\u518D\u5B9A\u4E49\u4E00\u4E2A\u51FD\u6570\u6765\u751F\u6210\u8FD9\u4E2A\u914D\u7F6E</p><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> glob <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;glob&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getHtmlTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> glob
    <span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token string">&#39;./src/pages/**/index.html&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> file<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\/pages\\/(.+)\\/index.html</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">path</span><span class="token operator">:</span> file <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span><span class="token parameter">template</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">template</span><span class="token operator">:</span> template<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
          <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span>template<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>template<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.html</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">getHtmlTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>\u8FD9\u6837\u4E00\u4E2A\u7B80\u5355\u7684\u591A\u9875\u9762\u9879\u76EE\u5C31\u914D\u7F6E\u5B8C\u6210\u4E86\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u5728\u6B64\u57FA\u7840\u4E0A\u6DFB\u52A0\u70ED\u66F4\u65B0\u3001\u4EE3\u7801\u5206\u5272\u7B49\u529F\u80FD\uFF0C\u6709\u5174\u8DA3\u7684\u53EF\u4EE5\u81EA\u5DF1\u5C1D\u8BD5\u4E00\u4E0B</p><h2 id="%E5%AE%8C%E6%95%B4%E9%85%8D%E7%BD%AE" tabindex="-1">\u5B8C\u6574\u914D\u7F6E</h2><p>\u9879\u76EE\u5730\u5740\uFF1A<a href="https://github.com/qiyuor2/webpack-multipage">qiyuor2/webpack-multipage</a></p><pre class="language-js"><code class="language-js"><span class="token comment">// webpack.config.js</span>

<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> glob <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;glob&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> CleanWebpackPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;clean-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u591A\u9875\u5165\u53E3</span>
<span class="token keyword">function</span> <span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> entry <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  glob<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token string">&#39;./src/pages/**/index.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> name <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\/pages\\/(.+)\\/index.js</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    entry<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> file<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> entry<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u591A\u9875\u6A21\u677F</span>
<span class="token keyword">function</span> <span class="token function">getHtmlTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> glob
    <span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token string">&#39;./src/pages/**/index.html&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> file<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\/pages\\/(.+)\\/index.html</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">path</span><span class="token operator">:</span> file <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span><span class="token parameter">template</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">template</span><span class="token operator">:</span> template<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
          <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token punctuation">[</span>template<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>template<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.html</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;js/[name].[contenthash].js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CleanWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token function">getHtmlTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">contentBase</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> config<span class="token punctuation">;</span>
</code></pre></div>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2021/webpack-multipage.md");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
var __glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$4,
  date: date$4,
  tags,
  category,
  summary: summary$4,
  meta: meta$4,
  "default": _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const title$3 = "\u5B8C\u5168\u6CA1\u6709\u6599\u5230\u7684\u751F\u6D3B - 2021";
const date$3 = "2022/01/10 11:44:01";
const summary$3 = "2021\u5E74\u4E00\u8F6C\u773C\u5C31\u8FC7\u5B8C\u4E86\u3002\u611F\u89C9\u81EA\u4ECE\u65B0\u51A0\u75AB\u60C5\u5F00\u59CB\u540E\uFF0C\u65F6\u95F4\u7684\u6D41\u901D\u901F\u5EA6\u5C31\u53D8\u5FEB\u4E86\uFF0C\u4EFF\u4F5B\u6628\u5929\u8FD8\u5728\u5B66\u6821\u91CC\u4E0A\u8BFE\u73A9\u624B\u673A\uFF0C\u4ECA\u5929\u5C31\u5728\u516C\u53F8\u4E0A\u73ED\u6478\u9C7C\u3002\u55EF\uFF0C\u5982\u4F60\u6240\u89C1\u8FD9\u662F\u4E00\u7BC7\u5168\u662F\u5E9F\u8BDD\u548C\u5783\u573E\u7684\u5E74\u7EC8\u603B\u7ED3";
const meta$3 = [{ "property": "og:title", "content": "\u5B8C\u5168\u6CA1\u6709\u6599\u5230\u7684\u751F\u6D3B - 2021" }];
const _sfc_main$g = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u5B8C\u5168\u6CA1\u6709\u6599\u5230\u7684\u751F\u6D3B - 2021", "date": "2022/01/10 11:44:01", "summary": "2021\u5E74\u4E00\u8F6C\u773C\u5C31\u8FC7\u5B8C\u4E86\u3002\u611F\u89C9\u81EA\u4ECE\u65B0\u51A0\u75AB\u60C5\u5F00\u59CB\u540E\uFF0C\u65F6\u95F4\u7684\u6D41\u901D\u901F\u5EA6\u5C31\u53D8\u5FEB\u4E86\uFF0C\u4EFF\u4F5B\u6628\u5929\u8FD8\u5728\u5B66\u6821\u91CC\u4E0A\u8BFE\u73A9\u624B\u673A\uFF0C\u4ECA\u5929\u5C31\u5728\u516C\u53F8\u4E0A\u73ED\u6478\u9C7C\u3002\u55EF\uFF0C\u5982\u4F60\u6240\u89C1\u8FD9\u662F\u4E00\u7BC7\u5168\u662F\u5E9F\u8BDD\u548C\u5783\u573E\u7684\u5E74\u7EC8\u603B\u7ED3", "meta": [{ "property": "og:title", "content": "\u5B8C\u5168\u6CA1\u6709\u6599\u5230\u7684\u751F\u6D3B - 2021" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u5B8C\u5168\u6CA1\u6709\u6599\u5230\u7684\u751F\u6D3B - 2021", "meta": [{ "property": "og:title", "content": "\u5B8C\u5168\u6CA1\u6709\u6599\u5230\u7684\u751F\u6D3B - 2021" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Hide = vue.resolveComponent("Hide");
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p>2021 \u5E74\u4E00\u8F6C\u773C\u5C31\u8FC7\u5B8C\u4E86\u3002\u611F\u89C9\u81EA\u4ECE\u65B0\u51A0\u75AB\u60C5\u5F00\u59CB\u540E\uFF0C\u65F6\u95F4\u7684\u6D41\u901D\u901F\u5EA6\u5C31\u53D8\u5FEB\u4E86\uFF0C\u4EFF\u4F5B\u6628\u5929\u8FD8\u5728\u5B66\u6821\u91CC\u4E0A\u8BFE\u73A9\u624B\u673A\uFF0C\u4ECA\u5929\u5C31\u5728\u516C\u53F8\u4E0A\u73ED\u6478\u9C7C\u3002\u55EF\uFF0C\u5982\u4F60\u6240\u89C1\u8FD9\u662F\u4E00\u7BC7\u5168\u662F\u5E9F\u8BDD\u548C\u5783\u573E\u7684\u5E74\u7EC8\u603B\u7ED3\u3002</p><p>\u6709\u4E00\u8BF4\u4E00\uFF0C\u867D\u7136\u6211\u4E4B\u524D\u4E00\u76F4\u6709\u5199\u5E74\u7EC8\u603B\u7ED3\u7684\u60F3\u6CD5\uFF0C\u4F46\u6BCF\u6B21\u90FD\u4F1A\u4E0D\u4E86\u4E86\u4E4B\uFF0C\u6BCF\u6B21\u60F3\u8981\u52A8\u7B14\uFF08\u952E\u76D8\uFF09\u7684\u65F6\u5019\u90FD\u4E0D\u77E5\u9053\u8981\u5199\u4EC0\u4E48\u3001\u4E0D\u77E5\u9053\u5982\u4F55\u53BB\u5199\uFF0C\u6240\u4EE5\u8FD9\u6B21\u4E5F\u7B97\u662F\u5BF9\u81EA\u5DF1\u7684\u4E00\u4E2A\u6311\u6218\u5427\uFF08\u7B11\uFF09\u3002</p><hr><p>\u4E0D\u5F97\u4E0D\u8BF4\uFF0C\u4ECA\u5E74\u5BF9\u6211\u6765\u8BF4\u662F\u5F88\u7279\u522B\u7684\u4E00\u5E74\uFF0C\u9762\u8BD5\u3001\u79DF\u623F\u3001\u5DE5\u4F5C\u3001\u81EA\u5DF1\u751F\u6D3B\uFF0C\u4E4B\u524D\u6211\u8FD8\u6CA1\u600E\u4E48\u53BB\u60F3\u8FC7\u8FD9\u4E9B\u4E8B\u60C5\uFF0C\u603B\u89C9\u5F97\u8FD9\u4E9B\u4E8B\u60C5\u8DDD\u79BB\u6211\u8FD8\u5F88\u8FDC\uFF0C\u7ED3\u679C\u4ECE 21 \u5E74 7 \u6708\u4E2D\u65EC\u5230\u73B0\u5728 22 \u5E74 1 \u6708\uFF0C\u5DF2\u7ECF\u51FA\u6765\u5DE5\u4F5C\u534A\u5E74\u4E86\uFF0C\u65F6\u95F4\u8FC7\u5F97\u771F\u5FEB\u554A\u3002</p><h2 id="%E6%B1%82%E8%81%8C" tabindex="-1">\u6C42\u804C</h2><p>\u6211\u5927\u6982\u662F\u4ECE 5 \u6708\u4EFD\u5F00\u59CB\u6B63\u5F0F\u6295\u7B80\u5386\u7684\uFF0C\u56E0\u4E3A\u4E4B\u524D\u5B8C\u5168\u6CA1\u6709\u4E86\u89E3\u8FC7\u6625\u62DB\u8FD9\u56DE\u4E8B\u5BFC\u81F4\u6211 4\u30015 \u6708\u624D\u5F00\u59CB\u51C6\u5907\u7B80\u5386\u3001\u9762\u8BD5\u9898\u8FD9\u4E9B\u4E1C\u897F\u3002\u4E0D\u8FC7\u6211\u5230\u662F\u4E5F\u4E0D\u662F\u5F88\u60F3\u80CC\u9898\uFF0C\u7B80\u5386\u5927\u6982\u53EA\u6295\u4E86\u4E94\u516D\u5BB6\u5427\uFF0C\u5927\u5382\u5C31\u53EA\u5C1D\u8BD5\u4E86\u963F\u91CC\uFF0C\u4F53\u9A8C\u4E86\u4E00\u4E0B\u5927\u5382\u9762\u8BD5\u7684\u96BE\u5EA6\u4E4B\u540E\u5C31\u4E0D\u592A\u60F3\u53BB\u9762\u5927\u5382\u4E86\uFF0C\u4E00\u65B9\u9762\u662F\u6211\u7B97\u6CD5\u771F\u7684\u5F88\u70C2\uFF0C\u53E6\u4E00\u65B9\u9762\u5C31\u662F\u5B8C\u5168\u4E0D\u60F3\u80CC\u9898\u3002\u6240\u4EE5\u6700\u7EC8\u5C31\u53BB\u4E86\u4E00\u4E2A\u6BD4\u8F83\u6EE1\u610F\u7684\u5C0F\u516C\u53F8\uFF0C\u73B0\u5728\u6765\u770B\u4E5F\u8FD8\u633A\u6EE1\u610F\u7684\uFF0C\u52A0\u73ED\u4E0D\u591A\uFF0C\u6C1B\u56F4\u4E5F\u5F88\u597D\u3002</p><h2 id="%E5%B7%A5%E4%BD%9C" tabindex="-1">\u5DE5\u4F5C</h2><p>\u5DE5\u4F5C\u548C\u81EA\u6211\u4ECB\u7ECD\u771F\u7684\u662F\u793E\u6050\u7684\u5669\u68A6\uFF01\uFF01\uFF01</p><p>\u8FD0\u6C14\u5E94\u8BE5\u7B97\u662F\u6BD4\u8F83\u597D\u5427\uFF0C\u521A\u5165\u804C\u5C31\u8D76\u4E0A\u4E86\u90E8\u95E8\u56E2\u5EFA\uFF0C\u867D\u7136\u6211\u4F9D\u65E7\u4E0D\u559C\u6B22\u8FD9\u79CD\u573A\u5408\u3002</p><p>\u4E0D\u5F97\u4E0D\u8BF4\uFF0C\u5DE5\u4F5C\u4E2D\u7684\u4F1A\u8BAE\u662F\u771F\u7684\u591A\uFF0C\u5927\u4F1A\u5C0F\u4F1A\u5404\u79CD\u8BC4\u5BA1\u4E09\u5929\u4E24\u5934\u4E00\u5F00\uFF0C\u8FD8\u5F97\u81EA\u5DF1\u8BC4\u4F30\u5DE5\u671F\uFF0C\u8BF4\u5B9E\u8BDD\u521A\u5F00\u59CB\u90A3\u4E2A\u6708\u786E\u5B9E\u633A\u8BA9\u6211\u4E3A\u96BE\u7684\u3002</p><p>`);
      _push(serverRenderer.ssrRenderComponent(_component_Hide, { tips: "\u56E0\u6D89\u53CA\u5230\u4E00\u4E9B\u9690\u79C1/\u654F\u611F\u6570\u636E\uFF0C\u4F5C\u8005\u9690\u85CF\u4E86\u8FD9\u90E8\u5206\u5185\u5BB9 :D" }, null, _parent));
      _push(`</p><p>\u603B\u4E4B\uFF0C\u7528\u9886\u5BFC\u7684\u8BDD\u6765\u8BF4\u6211\u5C5E\u4E8E\u5B9E\u4E60\u751F\u4E2D\u5E72\u6D3B\u6BD4\u8F83\u591A\u7684\u4E86\uFF0C\u800C\u4E14\u4ED6\u4E5F\u6BD4\u8F83\u8BA4\u53EF\u6211\u7684\u80FD\u529B\uFF0C\u987A\u5229\u8F6C\u6B63\u4E86\u3002</p><blockquote><p>\u4ECA\u5E74\u88C1\u5458\u771F\u591A\u554A</p></blockquote><h2 id="%E7%94%9F%E6%B4%BB%EF%BC%88%E5%A4%A7%E6%A6%82%EF%BC%89" tabindex="-1">\u751F\u6D3B\uFF08\u5927\u6982\uFF09</h2><p>\u6709\u4E86\u81EA\u5DF1\u7684\u6536\u5165\u4E4B\u540E\u4E70\u4E86\u5F88\u591A\u4E4B\u524D\u60F3\u8981\u4F46\u662F\u6CA1\u5356\u7684\u4E1C\u897F\uFF0C\u4F46\u662F\u4E5F\u53D8\u5F97\u8D8A\u6765\u8D8A\u4E0D\u820D\u5F97\u82B1\u94B1\u4E86\uFF0C\u8D5A\u94B1\u771F\u7684\u5F88\u8F9B\u82E6\u554A\u3002</p><p>\u4E1A\u4F59\u65F6\u95F4\u505A\u4E86\u5F88\u591A\u4E8B\u60C5\uFF0C\u6BD4\u5982\u514B\u82CF\u9C81\u7CFB\u5217\uFF08\u770B\u4E86\u6D1B\u592B\u514B\u62C9\u592B\u7279\u7684\u5C0F\u8BF4\u96C6\uFF09\u3001\u53EA\u72FC\uFF08\u622A\u6B62 21.01.14 \u6253\u5230\u72EE\u5B50\u733F\u4E86\uFF09\u3001\u53EF\u89C6\u5316\u642D\u5EFA\u9879\u76EE\u3001\u5B66\u4E60\u4E86\u65E5\u8BED\uFF08\u4F46\u662F\u4E94\u5341\u97F3\u90FD\u4E0D\u719F\uFF09\u3001\u5B66\u4E60\u4E86\u50CF\u7D20\u753B\uFF08\u5F88\u70C2\uFF09\u3001\u7B2C\u4E00\u6B21\u53C2\u4E0E\u4E86\u4E00\u4E2A\u5F00\u6E90\u9879\u76EE\uFF0C\u603B\u4E4B\u5C31\u662F\u63A5\u89E6\u4E86\u5F88\u591A\u65B0\u9C9C\u7684\u4E1C\u897F\uFF0C\u751F\u6D3B\u4F3C\u4E4E\u4E5F\u5F88\u5145\u5B9E\u3002\u9664\u6B64\u4E4B\u5916\uFF0C\u7EC8\u4E8E\u53C8\u91CD\u65B0\u7684\u53BB\u770B\u4E86\u4E00\u4E9B\u52A8\u753B\uFF0C\u81EA\u4ECE\u6211\u4E0A\u5927\u5B66\u4E4B\u540E\u5C31\u5F88\u5C11\u53BB\u770B\u52A8\u753B\u4E86\uFF0C\u603B\u662F\u5728\u5199\u4EE3\u7801\u3001\u6253\u6E38\u620F\u3002\u54E6\u5BF9\uFF0C\u6211\u8FD8\u5728\u5C1D\u8BD5\u5199\u4E00\u4E9B\u6F2B\u8BC4\uFF08\u89C2\u540E\u611F\uFF09\uFF0C\u5E0C\u671B\u4EE5\u6B64\u63D0\u5347\u4E00\u4E0B\u81EA\u5DF1\u7684\u6587\u5B57\u8868\u8FBE\u80FD\u529B\u3002</p><h3 id="21-%E5%B9%B4%E6%88%91%E6%9C%80%E5%96%9C%E6%AC%A2%E7%9A%84-xxx" tabindex="-1">21 \u5E74\u6211\u6700\u559C\u6B22\u7684 XXX</h3><p>\u52A8\u753B\uFF1A\u5C0F\u6797\u5BB6\u7684\u9F99\u5973\u4EC6\u3001\u9F99\u4E0E\u864E\uFF08\u8001\u756A\u4F46\u6211\u624D\u770B\uFF09</p><p>\u6E38\u620F\uFF1A\u53EA\u72FC\u3001For The King</p><p>\u5C0F\u8BF4\uFF1A\u5370\u65AF\u8305\u65AF\u7684\u9634\u973E</p><p>\u7535\u5F71\uFF1A\u6CA1\u600E\u4E48\u770B\u7535\u5F71\u6240\u4EE5\u5C31\u7D2B\u7F57\u5170\u6C38\u6052\u82B1\u56ED\u7684\u5267\u573A\u7248\u4E86</p><p>\u4EBA\uFF1A\u5979</p><h2 id="%E5%85%B3%E4%BA%8E%E6%9C%AA%E6%9D%A5" tabindex="-1">\u5173\u4E8E\u672A\u6765</h2><p>\u5B8C\u5168\u6CA1\u6709\u8003\u8651\u672A\u6765\u5462 :D</p></div>`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2022/2021-review.md");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
var __glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$3,
  date: date$3,
  summary: summary$3,
  meta: meta$3,
  "default": _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const title$2 = "\u64C5\u957F\u6349\u5F04\u7684\u9AD8\u6728\u540C\u5B66";
const date$2 = "2022/01/19 23:50:17";
const summary$2 = "\u64C5\u957F\u8C03\u60C5\u7684\u897F\u7247\u592A\u592A";
const isTalk$2 = true;
const cover$2 = "https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122takagai-san.jpeg";
const meta$2 = [{ "property": "og:title", "content": "\u64C5\u957F\u6349\u5F04\u7684\u9AD8\u6728\u540C\u5B66" }];
const _sfc_main$f = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u64C5\u957F\u6349\u5F04\u7684\u9AD8\u6728\u540C\u5B66", "date": "2022/01/19 23:50:17", "summary": "\u64C5\u957F\u8C03\u60C5\u7684\u897F\u7247\u592A\u592A", "isTalk": true, "cover": "https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122takagai-san.jpeg", "meta": [{ "property": "og:title", "content": "\u64C5\u957F\u6349\u5F04\u7684\u9AD8\u6728\u540C\u5B66" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u64C5\u957F\u6349\u5F04\u7684\u9AD8\u6728\u540C\u5B66", "meta": [{ "property": "og:title", "content": "\u64C5\u957F\u6349\u5F04\u7684\u9AD8\u6728\u540C\u5B66" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122takagai-san.jpeg" alt=""></p><p>\u5BF9\u4E8E\u8FD9\u90E8\u756A\u6211\u8FD8\u80FD\u8BF4\u4EC0\u4E48\uFF1F\uFF01\u592A\u751C\u4E86\u5427\uFF01\u5018\u82E5\u6709\u4EBA\u8981\u95EE\u6211\u4EC0\u4E48\u624D\u7B97\u53CC\u5411\u5954\u8D74\u7684\u7231\u60C5\uFF0C\u6211\u4E00\u5B9A\u4F1A\u63A8\u8350\u4ED6\u53BB\u770B\u770B\u9AD8\u6728\u540C\u5B66\u3002</p><p>\u7231\u8C03\u60C5\u7684\u9AD8\u6728\u540C\u5B66\u548C\u72D7\u76F4\u7537\u897F\u7247\uFF0C\u8FD9\u662F\u6211\u521A\u770B\u8FD9\u90E8\u756A\u65F6\u5BF9\u7537\u5973\u4E3B\u7684\u8BC4\u4EF7\uFF0C\u4F46\u662F\u5F53\u5267\u60C5\u4E00\u6B65\u6B65\u63A8\u8FDB\uFF0C\u6211\u6C89\u4E0B\u5FC3\u6765\u53BB\u4EAB\u53D7\u72D7\u7CAE\u7684\u65F6\u5019\uFF0C\u5C31\u53D1\u73B0\u897F\u7247\u867D\u7136\u72D7\u76F4\u7537\u4F46\u603B\u80FD\u4EE5\u72D7\u76F4\u7537\u7684\u65B9\u5F0F\u7ED9\u4E88\u9AD8\u6728\u8DB3\u591F\u7684\u56DE\u5E94\u3002\u9AD8\u6728\u5728\u897F\u7247\u623F\u95F4\u91CC\u770B\u5230\u90A3\u4E9B\u6709\u7740\u5979\u7684\u75D5\u8FF9\u7684\u7269\u54C1\u3001\u653E\u5B66\u8DEF\u4E0A\u65E0\u610F\u4E2D\u7684\u300C\u4F1A\u5FC3\u4E00\u51FB\u300D\u3001\u53CA\u65F6\u53D1\u73B0\u9AD8\u6728\u4E0D\u6B63\u5E38\u7684\u60C5\u7EEA\u5E76\u4E14\u7ED9\u5979\u5B89\u6170\u3001\u6797\u95F4\u6821\u56ED\u7684\u5DE7\u5408\u3001\u590F\u65E5\u796D\u7684\u9080\u8BF7\u2026\u2026\u8FD9\u4E00\u5207\u7684\u4E00\u5207\u90FD\u662F\u897F\u7247\u5BF9\u4E8E\u9AD8\u6728\u60C5\u611F\u7684\u771F\u8BDA\u56DE\u5E94\u3002</p><p>\u7231\u60C5\u5E76\u4E0D\u662F\u4E00\u65B9\u8F6E\u9504\u5934\u54D0\u54D0\u51FF\u5FC3\u4E4B\u58C1\u5C31\u5B8C\u4E8B\u4E86\uFF0C\u53EA\u6709\u53CC\u65B9\u6709\u6765\u6709\u56DE\u624D\u80FD\u771F\u6B63\u63A8\u52A8\u8FDB\u5EA6\u6761\u524D\u8FDB\u3002</p></div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2022/takagai-san.md");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
var __glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$2,
  date: date$2,
  summary: summary$2,
  isTalk: isTalk$2,
  cover: cover$2,
  meta: meta$2,
  "default": _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const title$1 = "\u9F99\u4E0E\u864E";
const date$1 = "2022/01/11 11:03:33";
const summary$1 = "\u300C\u30DB\u30FC\u30EA\u30FC\u30CA\u30A4\u30C8\u300D";
const isTalk$1 = true;
const cover$1 = "https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122tiger.jpeg";
const meta$1 = [{ "property": "og:title", "content": "\u9F99\u4E0E\u864E" }];
const _sfc_main$e = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u9F99\u4E0E\u864E", "date": "2022/01/11 11:03:33", "summary": "\u300C\u30DB\u30FC\u30EA\u30FC\u30CA\u30A4\u30C8\u300D", "isTalk": true, "cover": "https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122tiger.jpeg", "meta": [{ "property": "og:title", "content": "\u9F99\u4E0E\u864E" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u9F99\u4E0E\u864E", "meta": [{ "property": "og:title", "content": "\u9F99\u4E0E\u864E" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122tiger.jpeg" alt=""></p><p>\u5728\u6211\u770B\u6765\uFF0C\u9F99\u4E0E\u864E\u7684\u9752\u6625\u53EF\u4EE5\u8BF4\u662F\u6700\u63A5\u8FD1\u4E8E\u73B0\u5B9E\u7684\u9752\u6625\u3002\u6CA1\u9519\uFF0C\u6211\u8BA4\u4E3A\u8FD9\u90E8\u52A8\u753B\u5E76\u4E0D\u662F\u4E00\u90E8\u771F\u6B63\u610F\u4E49\u4E0A\u7684\u604B\u7231\u756A\uFF0C\u66F4\u50CF\u662F\u4E00\u90E8\u8BB2\u8FF0\u4E3B\u89D2\u5728\u7231\u60C5\u3001\u53CB\u60C5\u3001\u4EB2\u60C5\u4E2D\u4E92\u76F8\u6276\u6301\u9010\u6E10\u6210\u957F\u7684\u52A8\u753B\uFF0C\u9752\u6625\u7684\u5E7C\u7A1A\u3001\u8FF7\u832B\u3001\u6210\u957F\u3001\u7F8E\u597D\uFF0C\u90FD\u4E00\u4E00\u5448\u73B0\u5728\u4E86\u9F99\u4E0E\u864E\u4E24\u4E2A\u4EBA\u4E00\u6B65\u6B65\u8D70\u5411\u76F8\u604B\u7684\u65C5\u9014\u4E4B\u4E2D\u3002</p><p>\u4E0D\u5F97\u4E0D\u8BF4\uFF0C\u9F99\u4E0E\u864E\u7684\u5267\u60C5\u8BA9\u6211\u5341\u5206\u96BE\u53D7\u3002\u65E0\u8BBA\u662F\u5927\u6CB3\u5728\u9F99\u513F\u6EBA\u6C34\u65F6\u548C\u5723\u8BDE\u591C\u9F99\u513F\u79BB\u53BB\u65F6\u7684\u4E24\u6B21\u60C5\u611F\u7206\u53D1\uFF0C\u8FD8\u662F\u5979\u5728\u96EA\u5C71\u88AB\u6551\u65F6\u7684\u5462\u5583\u4EE5\u53CA\u731C\u5230\u771F\u76F8\u540E\u5374\u9009\u62E9\u76F8\u4FE1\u8C0E\u8A00\u7684\u538B\u6291\uFF0C\u90FD\u4EE4\u6211\u5FC3\u75DB\u3002\u7231\u60C5\u548C\u53CB\u60C5\u4E4B\u95F4\u7684\u6289\u62E9\u603B\u4F1A\u8BA9\u5584\u826F\u7684\u4EBA\u53D7\u4F24\uFF0C\u6211\u4EEC\u603B\u5728\u82DB\u6C42\u4E00\u4E2A\u5B8C\u7F8E\u7684\u6545\u4E8B\uFF0C\u4F46\u73B0\u5B9E\u5374\u603B\u662F\u4E0D\u5C3D\u4EBA\u610F\uFF0C\u5C31\u50CF\u9F99\u864E\u4E4B\u95F4\u7684\u53CC\u5411\u5954\u8D74\uFF0C\u8DCC\u8DCC\u649E\u649E\u7684\u6B65\u4F10\u548C\u5D0E\u5C96\u4E0D\u5E73\u7684\u9053\u8DEF\u3002</p><p>\u4EBA\u4EEC\u603B\u4F1A\u5BF9\u4F24\u75DB\u523B\u9AA8\u94ED\u5FC3\uFF0C\u98CE\u96E8\u540E\u7684\u5F69\u8679\u5219\u662F\u6700\u5B8C\u7F8E\u7684\u6CBB\u6108\u5242\uFF0C\u4E4B\u540E\u7684\u6545\u4E8B\u5F88\u7F8E\u597D\u5374\u53C8\u544A\u8BC9\u6211\u4EEC\u4EC0\u4E48\u662F\u6210\u957F\u3002\u56E0\u4E3A\u5F7C\u6B64\u5BB6\u5EAD\u5185\u7684\u77DB\u76FE\uFF0C\u5927\u6CB3\u548C\u9F99\u513F\u53C8\u4E00\u6B21\u6709\u4E86\u5171\u540C\u7684\u201C\u76EE\u6807\u201D\u3002\u79C1\u5954\u5BF9\u4E8E\u6211\u6765\u8BF4\u662F\u4E00\u4E2A\u5145\u6EE1\u9B54\u529B\u7684\u8BCD\u8BED\uFF0C\u5C31\u50CF\u662F\u4F20\u7EDF\u52C7\u8005\u6545\u4E8B\u4E2D\u7684\u5192\u9669\u8005\u4E00\u6837\uFF0C\u5728\u65C5\u9014\u4E2D\u6210\u957F\uFF0C\u9010\u6E10\u6210\u719F\uFF0C\u9010\u6E10\u627F\u62C5\u8D77\u81EA\u5DF1\u7684\u8D23\u4EFB\uFF0C\u7F8E\u597D\u53C8\u4E0D\u73B0\u5B9E\u3002\u4EE4\u4EBA\u6B23\u6170\u7684\u662F\uFF0C\u9F99\u513F\u4E0E\u6BCD\u4EB2\u548C\u597D\u4E86\uFF0C\u6CF0\u6CF0\u4E5F\u548C\u5979\u7684\u7236\u6BCD\u548C\u597D\u4E86\uFF0C\u5728\u76EE\u7779\u4E86\u8FD9\u4E00\u5207\u4E4B\u540E\u7684\u5927\u6CB3\uFF0C\u6700\u7EC8\u4E5F\u9009\u62E9\u4E86\u5411\u524D\u8FC8\u51FA\u90A3\u4E00\u6B65\u3002\u4E0D\u8FC7\u8FD9\u91CC\u6211\u8FD8\u662F\u8981\u63D0\u4E00\u53E5\uFF0C\u76F8\u6BD4\u4E8E\u52A8\u753B\u91CC\u5927\u6CB3\u8D70\u4E86\u4E00\u4E2A\u5B66\u671F\uFF0C\u6211\u66F4\u559C\u6B22\u5C0F\u8BF4\u4E2D\u5927\u6CB3\u53EA\u662F\u5047\u671F\u79BB\u5F00\u4E86\uFF0C\u6BD5\u7ADF\u4ED6\u4EEC\u5DF2\u7ECF\u7ECF\u5386\u4E86\u592A\u591A\u4E86\u3002</p><p>\u4E00\u5207\u6545\u4E8B\u7684\u5F00\u5934\uFF0C\u662F\u6765\u81EA\u5317\u6751\u7684\u201C\u62EF\u6551\u201D\u3002\u7B80\u5355\u5730\u8BF4\uFF0C\u6211\u4E0D\u8BA4\u4E3A\u5927\u6CB3\u5BF9\u4E8E\u5317\u6751\u7684\u611F\u60C5\u662F\u7231\uFF0C\u5E76\u4E14\u6211\u4E5F\u5F88\u8BA8\u538C\u5317\u6751\u8FD9\u6837\u5728\u6CA1\u6709\u66F4\u6DF1\u5C42\u6B21\u7684\u4E86\u89E3\u5BF9\u65B9\u65F6\u5C31\u8868\u767D\u7684\u884C\u4E3A\u3002\u8868\u767D\u5728\u6211\u770B\u6765\u65E2\u662F\u5F00\u59CB\u4E5F\u662F\u7ED3\u675F\uFF0C\u5B83\u5E94\u8BE5\u7528\u6765\u627F\u63A5\u201C\u4E0A\u4E0B\u6587\u201D\u7684\uFF0C\u800C\u4E0D\u662F\u7528\u6765\u4F5C\u4E3A\u51B2\u950B\u7684\u53F7\u89D2\u3002\u5927\u6CB3\u56E0\u4E3A\u5BB6\u5EAD\u548C\u6027\u683C\u539F\u56E0\uFF0C\u8BA9\u5979\u4EE5\u4E3A\u6CA1\u6709\u4EBA\u4F1A\u559C\u6B22\u5979\uFF0C\u800C\u5317\u6751\u7684\u544A\u767D\u5C31\u50CF\u662F\u6F2B\u6F2B\u957F\u591C\u91CC\u7684\u66D9\u5149\uFF0C\u8BA9\u5979\u8D70\u51FA\u9634\u973E\uFF0C\u4F46\u8FD9\u4EFD\u53EF\u4EE5\u79F0\u4E4B\u4E3A\u201C\u6551\u8D4E\u201D\u7684\u5149\u53C8\u5F88\u5FEB\u6D88\u5931\u4E86\uFF0C\u5979\u53C8\u8FF7\u832B\u4E86\uFF0C\u5927\u6CB3\u60F3\u53BB\u63E1\u4F4F\u8FD9\u9053\u5149\uFF0C\u4E8E\u662F\u5979\u8BA4\u4E3A\u8FD9\u662F\u7231\u3002\u8FD9\u91CC\u6211\u6709\u4E2A\u7591\u95EE\uFF0C\u5317\u6751\u4E3A\u4EC0\u4E48\u4F1A\u5728\u6587\u5316\u796D\u53BB\u7EA6\u5927\u6CB3\u8DF3\u821E\uFF1F\u6216\u8BB8\u5C0F\u8BF4\u4E2D\u4F1A\u6709\u66F4\u7EC6\u81F4\u7684\u63CF\u5199\uFF0C\u4E4B\u540E\u6211\u4F1A\u53BB\u518D\u770B\u4E00\u904D\u5C0F\u8BF4\u3002</p><p>\u300C\u4EBA\u751F\u4E0D\u5982\u610F\u5341\u4E4B\u516B\u4E5D\u3002\u300D</p><p>\u5B9E\u4E43\u68A8\u548C\u4E9A\u7F8E\u7684\u9009\u62E9\u5C31\u50CF\u8001\u5E08\u5728\u9ED1\u677F\u4E0A\u5199\u7684\u8FD9\u53E5\u8BDD\u4E00\u6837\uFF0C\u6BCF\u4E2A\u4EBA\u90FD\u4F1A\u6709\u81EA\u5DF1\u4F20\u8FBE\u4E0D\u5230\u7684\u60C5\u611F\uFF0C\u73B0\u5B9E\u548C\u68A6\u60F3\u4EA4\u7EC7\u5728\u4E00\u8D77\u65F6\uFF0C\u6211\u4EEC\u4E5F\u4F1A\u8FF7\u832B\uFF0C\u4E5F\u4F1A\u6124\u6012\uFF0C\u4E5F\u4F1A\u9EEF\u7136\uFF0C\u4E5F\u4F1A\u4E0D\u7518\uFF0C\u4F46\u8FD9\u5C31\u662F\u9752\u6625\u672C\u6765\u9762\u8C8C\u3002\u5B9E\u4E43\u68A8\u62D2\u7EDD\u4E86\u9F99\u513F\u3001\u4E9A\u7F8E\u9009\u62E9\u4E86\u52A9\u653B\uFF0C\u5979\u4EEC\u5411\u73B0\u5B9E\u53D1\u51FA\u6012\u543C\u5374\u53C8\u4E0D\u5F97\u4E0D\u7684\u9009\u62E9\u59A5\u534F\uFF0C\u6216\u8BB8\u662F\u4E0D\u6210\u719F\u7684\u9009\u62E9\uFF0C\u6216\u8BB8\u662F\u65E0\u53EF\u5948\u4F55\u7684\u9009\u62E9\u3002\u56E0\u53CB\u60C5\u800C\u653E\u624B\u3001\u56E0\u6210\u719F\u800C\u6C89\u9ED8\uFF0C\u8FD9\u4E2A\u6545\u4E8B\u4E5F\u56E0\u6B64\u53D8\u5F97\u6C89\u91CD\u3002</p><p>\u9752\u6625\u5C31\u662F\u8FD9\u6837\uFF0C\u4E0D\u6B62\u6709\u751C\u5473\u3002</p></div>`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2022/tiger-and-dragon.md");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
var __glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title: title$1,
  date: date$1,
  summary: summary$1,
  isTalk: isTalk$1,
  cover: cover$1,
  meta: meta$1,
  "default": _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const title = "\u65E0\u804C\u8F6C\u751F";
const date = "2022/01/19 23:10:11";
const summary = "\u82E5\u6279\u8BC4\u4E0D\u518D\u662F\u6279\u8BC4";
const isTalk = true;
const cover = "https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122wuzhizhuansheng.jpeg";
const meta = [{ "property": "og:title", "content": "\u65E0\u804C\u8F6C\u751F" }];
const _sfc_main$d = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "title": "\u65E0\u804C\u8F6C\u751F", "date": "2022/01/19 23:10:11", "summary": "\u82E5\u6279\u8BC4\u4E0D\u518D\u662F\u6279\u8BC4", "isTalk": true, "cover": "https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122wuzhizhuansheng.jpeg", "meta": [{ "property": "og:title", "content": "\u65E0\u804C\u8F6C\u751F" }] };
    expose({ frontmatter });
    const head$1 = { "title": "\u65E0\u804C\u8F6C\u751F", "meta": [{ "property": "og:title", "content": "\u65E0\u804C\u8F6C\u751F" }] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><p><img src="https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/20210122wuzhizhuansheng.jpeg" alt=""></p><p>\u8D85\u9AD8\u7684\u5236\u4F5C\u6C34\u51C6\u3001\u4F18\u79C0\u7684\u914D\u4E50\u3001\u4E30\u6EE1\u7684\u4EBA\u7269\u5F62\u8C61\u3001\u6709\u8DB3\u591F\u6DF1\u5EA6\u7684\u5267\u60C5\uFF0C\u5728\u6211\u770B\u6765\u8FD9\u662F\u4E00\u90E8\u5341\u5206\u4F18\u79C0\u7684\u4F5C\u54C1\u3002</p><p>\u4E0D\u77E5\u4ECE\u4F55\u65F6\u8D77\uFF0C\u6211\u53D8\u5F97\u5341\u5206\u8BA8\u538C\u540E\u5BAB\u5411\u7684\u4F5C\u54C1\uFF0C\u6216\u8BB8\u662F\u56E0\u4E3A\u81EA\u5DF1\u5185\u5FC3\u6BD4\u8F83\u654F\u611F\u8106\u5F31\u7684\u539F\u56E0\uFF0C\u89C1\u5230\u559C\u6B22\u7684\u89D2\u8272\u5728\u611F\u60C5\u65B9\u9762\u53D7\u632B\u5C31\u4F1A\u5F88\u96BE\u53D7\uFF08\u4F46\u662F\u6253\u67B6\u53D7\u4F24\u5C31\u89C9\u5F97\u65E0\u6240\u8C13\uFF09\uFF0C\u4F46\u4F9D\u65E7\u4E0D\u53EF\u5426\u8BA4\uFF0C\u65E0\u804C\u8F6C\u751F\u6240\u8BB2\u8FF0\u7684\u6545\u4E8B\u5341\u5206\u52A8\u4EBA\u3002</p><p>\u9C81\u8FEA\u6240\u8868\u73B0\u51FA\u7684\u4E00\u4E9B\u884C\u4E3A\u65E0\u7591\u662F\u5341\u5206\u6DF7\u86CB\u7684\uFF0C\u6211\u5230\u76EE\u524D\u4E3A\u6B62\u4E5F\u8BA4\u4E3A\u4F5C\u8005\u4E0D\u8BE5\u8FC7\u591A\u7684\u53BB\u63CF\u5199\u90A3\u4E9B\u884C\u4E3A\uFF0C\u6216\u8005\u662F\u4E0D\u8BE5\u8BA9\u4ED6\u201C\u6709\u6240\u884C\u52A8\u201D\uFF0C\u4E0B\u6D41\u7684\u60F3\u6CD5\u4EBA\u4EBA\u90FD\u6709\uFF0C\u4F46\u6B63\u5982\u53E4\u8BED\u6240\u8BF4\u201C\u4E07\u6076\u6DEB\u4E3A\u9996\uFF0C\u8BBA\u8FF9\u4E0D\u8BBA\u5FC3\uFF0C\u8BBA\u5FC3\u4E16\u4E0A\u65E0\u5B8C\u4EBA\u201D\uFF0C\u4F5C\u8005\u4E0D\u4EC5\u5C06\u9C81\u8FEA\u7684\u5185\u5FC3\u7EC6\u81F4\u5730\u523B\u753B\u51FA\u6765\u4E86\uFF0C\u8FD8\u8BA9\u4ED6\u4ED8\u8BF8\u4E86\u884C\u52A8\uFF0C\u8FD9\u4E5F\u5BFC\u81F4\u4E86\u73B0\u5728\u65E0\u804C\u8F6C\u751F\u5982\u6B64\u5DE8\u5927\u7684\u4E89\u8BAE\u3002</p><p>\u4E0D\u8FC7\u6B63\u56E0\u4F5C\u8005\u5BF9\u9C81\u8FEA\u5185\u5FC3\u4E16\u754C\u7684\u63CF\u5199\uFF0C\u4F7F\u5F97\u89C2\u4F17\u5F97\u4EE5\u4E86\u89E3\u4ED6\u7684\u906D\u9047\u548C\u6210\u957F\u3002\u524D\u4E16\u7684\u9C81\u8FEA\u56E0\u6C89\u8FF7\u6253\u6E38\u620F\u5BFC\u81F4\u6CA1\u80FD\u8003\u4E0A\u4E00\u6240\u597D\u7684\u9AD8\u4E2D\uFF0C\u5728\u4E00\u6B21\u5348\u996D\u65F6\uFF0C\u963B\u6B62\u4E86\u6821\u9738\u63D2\u961F\u6253\u996D\u7684\u884C\u4E3A\u800C\u906D\u5230\u6821\u56ED\u66B4\u529B\uFF0C\u4E0D\u4EC5\u88AB\u6BD2\u6253\uFF0C\u8FD8\u88AB\u6252\u5149\u4E86\u8863\u670D\u6302\u5728\u6821\u95E8\u53E3\u88AB\u62CD\u4E0B\u4E86\u7167\u7247\uFF0C\u4ECE\u90A3\u4E4B\u540E\u5C31\u518D\u4E5F\u6CA1\u6709\u52C7\u6C14\u56DE\u5230\u5B66\u6821\u3002\u90A3\u6015\u7236\u6BCD\u3001\u5F1F\u5F1F\u4EE5\u53CA\u66FE\u7ECF\u7684\u597D\u670B\u53CB\u60F3\u8981\u5E2E\u52A9\u4ED6\uFF0C\u4E5F\u88AB\u4ED6\u62D2\u4E4B\u95E8\u5916\u3002\u7236\u6BCD\u53BB\u4E16\u4E3E\u884C\u846C\u793C\u65F6\uFF0C\u4ED6\u4E5F\u6CA1\u6709\u53C2\u52A0\uFF0C\u53CD\u800C\u662F\u5728\u5BB6\u770B\u6210\u4EBA\u7247\uFF0C\u6700\u7EC8\u88AB\u5F1F\u5F1F\u8D76\u51FA\u5BB6\u95E8\uFF0C\u4E4B\u540E\u4ED6\u4E3A\u4E86\u6551 3 \u540D\u9AD8\u4E2D\u751F\u800C\u8F66\u7978\u8EAB\u4EA1\u3002\u4ECE\u6211\u7684\u89C6\u89D2\u6765\u770B\uFF0C\u9C81\u8FEA\u4E5F\u7B97\u662F\u4E00\u4E2A\u79F0\u5F97\u4E0A\u5584\u826F\u7684\u4EBA\uFF0C\u9020\u6210\u4ED6\u60B2\u60E8\u8FC7\u53BB\u7684\u884C\u4E3A\u662F\u51FA\u4E8E\u5584\u610F\u7684\uFF0C\u4F46\u662F\u5728\u5584\u610F\u7684\u884C\u4E3A\u6362\u6765\u4E0D\u516C\u7684\u5F85\u9047\u65F6\u4ED6\u9009\u62E9\u4E86\u9003\u907F\u3002\u5F53\u7136\uFF0C\u6709\u4E9B\u4EBA\u4F1A\u8BF4\u8FD9\u662F\u6D17\u767D\uFF0C\u4F46\u662F\u5F53\u4E00\u4E2A\u6545\u4E8B\u80FD\u591F\u81EA\u5706\u5176\u8BF4\u65F6\uFF0C\u6240\u8C13\u6D17\u767D\u7684\u90E8\u5206\u6210\u4E3A\u8FD9\u4E2A\u6545\u4E8B\u5FC5\u4E0D\u53EF\u5C11\u7684\u4E00\u90E8\u5206\u65F6\uFF0C\u6216\u8BB8\u5B83\u5C31\u4E0D\u8BE5\u88AB\u79F0\u4F5C\u6D17\u767D\u4E86\u3002</p><p>\u52A8\u753B\u7684\u524D\u4E24\u90E8\u5206\u6240\u8BB2\u8FF0\u7684\u6B63\u662F\u9C81\u8FEA\u8D70\u51FA\u524D\u4E16\u9634\u5F71\u7684\u6545\u4E8B\uFF0C\u4ED6\u52AA\u529B\u7684\u7EF4\u62A4\u5BB6\u5EAD\u5173\u7CFB\u3001\u52AA\u529B\u7684\u505A\u4E00\u4E2A\u597D\u5B69\u5B50\u3001\u5411\u7740\u5916\u9762\u7684\u4E16\u754C\u8FC8\u51FA\u90A3\u4E00\u6B65\u4EE5\u53CA\u627F\u62C5\u8D77\u672C\u4E0D\u8BE5\u7531\u4ED6\u627F\u62C5\u7684\u8D23\u4EFB\u3002\u5728\u5BB6\u5EAD\u5373\u5C06\u7834\u88C2\u65F6\u5C06\u77DB\u76FE\u8F6C\u79FB\uFF0C\u9047\u5230\u5371\u9669\u65F6\u633A\u8EAB\u4FDD\u62A4\u7231\u4E3D\u4E1D\uFF0C\u9762\u5BF9\u9F99\u795E\u65F6\u5373\u662F\u6BEB\u65E0\u80DC\u7B97\u4E5F\u8981\u6218\u6597\u5230\u6700\u540E\u4E00\u523B\u2026\u2026\u4F46\u6700\u4EE4\u6211\u52A8\u5BB9\u7684\u662F\u4ED6\u548C\u4ED6\u7236\u4EB2\u7684\u548C\u89E3\uFF0C\u6216\u8BB8\u6211\u6C38\u8FDC\u4E5F\u4E0D\u53EF\u80FD\u8FD9\u4E48\u5766\u8BDA\u3002</p><p>\u201C\u82E5\u6279\u8BC4\u4E0D\u81EA\u7531\uFF0C\u5219\u8D5E\u7F8E\u65E0\u610F\u4E49\u201D\uFF0C\u5BF9\u4E8E\u4E00\u4E2A\u5386\u53F2\u4EBA\u7269\u7684\u540D\u8A00\u7684\u5206\u6790\u5FC5\u7136\u8131\u4E0D\u5F00\u5F53\u65F6\u7684\u793E\u4F1A\u73B0\u72B6\uFF0C\u8FD9\u53E5\u8BDD\u5F88\u6709\u9053\u7406\uFF0C\u4F46\u662F\u8FD9\u4E2A\u9053\u7406\u662F\u6709\u524D\u63D0\u7684\u300218 \u4E16\u7EAA\u5E76\u6CA1\u6709\u4E92\u8054\u7F51\uFF0C\u6279\u8BC4\u4ECE\u4F55\u800C\u6765\uFF1F\u4EBA\u4EEC\u9700\u8981\u628A\u4ED6\u4EEC\u7684\u89C2\u70B9\u5199\u6210\u4FE1\u5BC4\u7ED9\u4F5C\u8005/\u51FA\u7248\u65B9/\u62A5\u793E\uFF0C\u8FD9\u5C31\u5DF2\u7ECF\u5F62\u6210\u4E86\u4E00\u5B9A\u7684\u95E8\u69DB\u3002\u800C\u73B0\u5728\u5462\uFF1F\u96F6\u6210\u672C\u7684\u201C\u6279\u8BC4\u201D\u968F\u5904\u53EF\u89C1\uFF0C\u751A\u81F3\u5B83\u4EEC\u90FD\u4E0D\u914D\u88AB\u6210\u4E3A\u6279\u8BC4\uFF0C\u6CA1\u6709\u9605\u8BFB\u5168\u6587\u7684\u65AD\u7AE0\u53D6\u4E49\u3001\u5E26\u7740\u4EB2\u4EBA\u7684\u56FD\u9A82\u3001\u56E0\u4E3A\u522B\u4EBA\u4E0D\u559C\u6B22\u81EA\u5DF1\u4E5F\u8981\u4E0D\u559C\u6B22\u7684\u8DDF\u98CE\uFF0C\u6587\u827A\u4F5C\u54C1\u4E0D\u8BE5\u88AB\u8FD9\u80A1\u98CE\u6C14\u6240\u88F9\u631F\u3002</p></div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/posts/2022/wu-zhi-zhuan-sheng.md");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
var __glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title,
  date,
  summary,
  isTalk,
  cover,
  meta,
  "default": _sfc_main$d
}, Symbol.toStringTag, { value: "Module" }));
const formatter = (modules) => {
  console.log(modules);
  return Object.keys(modules).map((modulePath) => {
    const page = modules[modulePath];
    const name = modulePath.match(/[0-9]\/(.*)*.md$/)[1];
    return {
      title: page.title,
      name,
      path: `/posts/${name}`,
      component: page.default,
      date: page.date,
      summary: page.summary,
      isTalk: page.isTalk
    };
  });
};
const posts$1 = formatter({ "../../posts/2019/chsarp-sql-helper.md": __glob_0_0, "../../posts/2019/csharp-html-agility-pack-selenium.md": __glob_0_1, "../../posts/2019/csharp-html-agility-pack.md": __glob_0_2, "../../posts/2019/csharp-use-xml.md": __glob_0_3, "../../posts/2019/git-tutorial.md": __glob_0_4, "../../posts/2019/hexo-blog.md": __glob_0_5, "../../posts/2019/js-closure.md": __glob_0_6, "../../posts/2019/js-count-down.md": __glob_0_7, "../../posts/2019/js-move-pic-by-slider.md": __glob_0_8, "../../posts/2019/t-sql-note.md": __glob_0_9, "../../posts/2020/about-http.md": __glob_0_10, "../../posts/2020/build-vue-for-webpack.md": __glob_0_11, "../../posts/2020/deep-in-js-data-type.md": __glob_0_12, "../../posts/2020/electron-learn.md": __glob_0_13, "../../posts/2020/js-datastructure.md": __glob_0_14, "../../posts/2020/node-spider-csdn.md": __glob_0_15, "../../posts/2020/picgo-jsdelivr-github.md": __glob_0_16, "../../posts/2020/ts-builder.md": __glob_0_17, "../../posts/2020/ts-factory.md": __glob_0_18, "../../posts/2020/ts-observer.md": __glob_0_19, "../../posts/2020/ts-singleton.md": __glob_0_20, "../../posts/2020/ts-strategy.md": __glob_0_21, "../../posts/2020/use-github-actions.md": __glob_0_22, "../../posts/2021/chrome-ext-get-image.md": __glob_0_23, "../../posts/2021/difference-between-src-href.md": __glob_0_24, "../../posts/2021/github-actions-publish-package.md": __glob_0_25, "../../posts/2021/js-event-loop.md": __glob_0_26, "../../posts/2021/package-md-editor-for-rn.md": __glob_0_27, "../../posts/2021/simple-blog-generate.md": __glob_0_28, "../../posts/2021/webpack-multipage.md": __glob_0_29, "../../posts/2022/2021-review.md": __glob_0_30, "../../posts/2022/takagai-san.md": __glob_0_31, "../../posts/2022/tiger-and-dragon.md": __glob_0_32, "../../posts/2022/wu-zhi-zhuan-sheng.md": __glob_0_33 });
function useNav() {
  const r = vueRouter.useRouter();
  const toDetail = (to) => {
    r.push(to);
  };
  const toOut = (to) => {
    open(to, "__blank");
  };
  return { toDetail, toOut };
}
const injectKey = {
  POSTS: Symbol("posts")
};
var List_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const PAGE_SIZE = 7;
const _sfc_main$c = {
  setup() {
    const { toDetail } = useNav();
    const getPosts = vue.inject(injectKey.POSTS, () => []);
    const page = vue.ref(pageCache.read());
    const list = vue.computed(() => getPosts().filter((item) => !item.isTalk).slice(0, page.value * PAGE_SIZE));
    const hasMore = vue.computed(() => page.value * PAGE_SIZE <= getPosts().filter((item) => !item.isTalk).length);
    const loadMore = () => {
      if (hasMore.value) {
        page.value += 1;
        pageCache.increase();
      }
    };
    return {
      list,
      page,
      loadMore,
      hasMore,
      toDetail
    };
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_fe_button = vue.resolveComponent("fe-button");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "posts-list" }, _attrs))}><ul><!--[-->`);
  serverRenderer.ssrRenderList($setup.list, (post, i) => {
    _push(`<li class="posts-list__item"><h2 class="oneline">${serverRenderer.ssrInterpolate(post.title)}</h2><p>${serverRenderer.ssrInterpolate(post.summary)}</p></li>`);
  });
  _push(`<!--]--></ul><div class="posts-list__pagination">`);
  if ($setup.hasMore) {
    _push(serverRenderer.ssrRenderComponent(_component_fe_button, { size: "large" }, {
      default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`\u67E5\u770B\u66F4\u591A`);
        } else {
          return [
            vue.createTextVNode("\u67E5\u770B\u66F4\u591A")
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/List.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
var List = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$b]]);
var Article_vue_vue_type_style_index_0_lang = "";
const _sfc_main$b = {
  setup() {
    runtimeCore.onMounted(() => {
      window.scrollTo({ top: 0 });
    });
  }
};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<article${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "article heti custom" }, _attrs))}>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`</article>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Article.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var Article = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$a = {
  __ssrInlineRender: true,
  setup(__props, { expose }) {
    const frontmatter = { "me": ["\u4EBA\u7C7B", "\u80A5\u5B85", "\u7A0B\u5E8F\u5458", "\u4E8C\u6B21\u5143", "\u77DB/\u76FE", "\u793E\u6050", "\u514B\u82CF\u9C81", "\u6E38\u620F\u73A9\u5BB6", "\u65C1\u89C2\u8005", "\u591C\u732B\u5B50", "\u6446\u70C2"], "meta": [] };
    expose({ frontmatter });
    const head$1 = { "meta": [] };
    head.useHead(head$1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "markdown-body" }, _attrs))}><hr><p>\u5982\u4F60\u6240\u89C1\uFF0C\u5DEE\u4E0D\u591A\u662F\u4E2A\u5783\u573E\u3002</p><p>\u5F88\u4EAB\u53D7\u5199\u4EE3\u7801\u7684\u8FC7\u7A0B\uFF0C\u5F88\u559C\u6B22\u901A\u5173\u6E38\u620F\u7684\u6210\u5C31\u611F\uFF0C\u5F88\u8BA8\u538C\u6545\u4E8B\u5B8C\u7ED3\u540E\u7684\u7A7A\u865A\u611F\u3002</p><p>\u4EBA\u751F\u603B\u4F53\u4E0A\u662F\u6CA1\u6709\u610F\u4E49\u7684\uFF0C\u6240\u4EE5\u6211\u5E0C\u671B\u80FD\u8FC7\u4E0A\u4E0D\u7528\u52AA\u529B\u4E5F\u4E0D\u6101\u5403\u559D\u8FD9\u79CD\u6CA1\u6709\u610F\u4E49\u65E5\u5B50\uFF0C\u4F46\u662F\u5728\u4E0D\u540C\u7684\u4EBA\u751F\u9636\u6BB5\u6211\u4EEC\u53EF\u4EE5\u7ED9\u81EA\u5DF1\u7684\u4EBA\u751F\u8D4B\u4E88\u4E00\u4E9B\u610F\u4E49\uFF0C\u6240\u4EE5\u6211\u8FD8\u5728\u52AA\u529B\u7740\uFF0C\u52AA\u529B\u7740\u5411\u6CA1\u6709\u610F\u4E49\u7684\u751F\u6D3B\u524D\u8FDB\u3002</p><p>\u559C\u6B22\u5F53\u4E00\u4E2A\u89C2\u4F17\uFF0C\u867D\u7136\u4E5F\u5E0C\u671B\u5F97\u5230\u522B\u4EBA\u7684\u8BA4\u53EF\uFF0C\u4F46\u81EA\u5DF1\u5E94\u8BE5\u662F\u4E0D\u9002\u5408\u7AD9\u5728\u821E\u53F0\u4E2D\u592E\u3002\u548C\u4EBA\u76F8\u5904\u65F6\u5927\u90E8\u5206\u60C5\u51B5\u4E0B\u4E5F\u90FD\u662F\u5728\u8F93\u5165\uFF0C\u56E0\u4E3A\u4E0D\u77E5\u9053\u5982\u4F55\u7EC4\u7EC7\u8BED\u8A00\u53BB\u8F93\u51FA\u3002</p><hr><p>\u8FD9\u4E2A\u535A\u5BA2\u662F\u505A\u7ED9\u81EA\u5DF1\u770B\u7684\uFF0C\u5F53\u7136\u4E5F\u5E0C\u671B\u80FD\u8BA9\u522B\u4EBA\u770B\u5230\u5E76\u4E14\u80FD\u8BA9\u5927\u5BB6\u6709\u6240\u6536\u83B7\uFF0C\u4E0D\u8FC7\u5199\u7684\u4E1C\u897F\u90FD\u6CA1\u5565\u542B\u91D1\u91CF\u3002\u5E0C\u671B\u80FD\u591F\u5728\u7F51\u7EDC\u4E0A\u7559\u4E0B\u81EA\u5DF1\u7684\u75D5\u8FF9\u5427\u3002</p></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/md/about.md");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
var About_vue_vue_type_style_index_0_lang = "";
const _sfc_main$9 = {
  components: { AboutContent: _sfc_main$a },
  setup() {
    const about = vue.ref();
    return { about };
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_fe_tag = vue.resolveComponent("fe-tag");
  const _component_about_content = vue.resolveComponent("about-content");
  _push(`<article${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "about heti" }, _attrs))}><p>\u5148\u7ED9\u81EA\u5DF1\u8D34\u70B9\u6807\u7B7E</p>`);
  if ($setup.about) {
    _push(`<div class="about__tags"><!--[-->`);
    serverRenderer.ssrRenderList($setup.about.frontmatter.me, (tag, i) => {
      _push(serverRenderer.ssrRenderComponent(_component_fe_tag, {
        key: i,
        text: tag
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(serverRenderer.ssrRenderComponent(_component_about_content, { ref: "about" }, null, _parent));
  _push(`</article>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/About.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var About = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9]]);
var Archives_vue_vue_type_style_index_0_lang = "";
const _sfc_main$8 = {
  setup() {
    const { toDetail } = useNav();
    const getPosts = vue.inject(injectKey.POSTS, () => []);
    return {
      posts: getPosts(),
      toDetail
    };
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "archives" }, _attrs))}><ul><!--[-->`);
  serverRenderer.ssrRenderList($setup.posts, (item, i) => {
    _push(`<li class="archives-item"><span class="archives-item__date">${serverRenderer.ssrInterpolate(item.date)}</span><span class="archives-item__title oneline">${serverRenderer.ssrInterpolate(item.title)}</span></li>`);
  });
  _push(`<!--]--></ul></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Archives.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Archives = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);
var Hide_vue_vue_type_style_index_0_lang = "";
const _sfc_main$7 = {
  props: {
    tips: {
      type: String,
      default: "\u4F5C\u8005\u9690\u85CF\u4E86\u8FD9\u6BB5\u5185\u5BB9"
    }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_fe_card = vue.resolveComponent("fe-card");
  _push(`<p${serverRenderer.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_card, { class: "hide" }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${serverRenderer.ssrInterpolate($props.tips)} `);
        {
          _push2(`<!---->`);
        }
      } else {
        return [
          vue.createTextVNode(vue.toDisplayString($props.tips) + " ", 1),
          vue.createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</p>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Hide.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var Hide = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);
const friends = [
  {
    name: "Fect UI",
    desc: "\u535A\u5BA2\u6240\u4F7F\u7528\u7684\u7EC4\u4EF6\u5E93",
    avatar: "https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png",
    link: "https://vue.miaya.art/zh-cn/guide/introduction"
  },
  {
    name: "Kanno",
    desc: "Fect UI \u4F5C\u8005",
    avatar: "https://avatars.githubusercontent.com/u/52351095?s=100&v=4",
    link: "https://blog.miaya.art/"
  }
];
var linksConfig = {
  friends
};
var Links_vue_vue_type_style_index_0_lang = "";
const _sfc_main$6 = {
  components: { Hide },
  setup() {
    const { toOut } = useNav();
    return {
      friends: linksConfig.friends,
      toOut
    };
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_fe_grid_group = vue.resolveComponent("fe-grid-group");
  const _component_fe_grid = vue.resolveComponent("fe-grid");
  const _component_fe_card = vue.resolveComponent("fe-card");
  const _component_fe_user = vue.resolveComponent("fe-user");
  const _component_hide = vue.resolveComponent("hide");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "links" }, _attrs))}>`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_grid_group, { gap: 2 }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        serverRenderer.ssrRenderList($setup.friends, (f, i) => {
          _push2(serverRenderer.ssrRenderComponent(_component_fe_grid, {
            xs: 24,
            sm: 12,
            md: 8,
            key: i
          }, {
            default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(serverRenderer.ssrRenderComponent(_component_fe_card, {
                  style: { "cursor": "pointer" },
                  hoverable: ""
                }, {
                  default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(serverRenderer.ssrRenderComponent(_component_fe_user, {
                        name: f.name,
                        src: f.avatar,
                        "alt-text": f.link
                      }, {
                        default: vue.withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${serverRenderer.ssrInterpolate(f.desc)}`);
                          } else {
                            return [
                              vue.createTextVNode(vue.toDisplayString(f.desc), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        vue.createVNode(_component_fe_user, {
                          name: f.name,
                          src: f.avatar,
                          "alt-text": f.link
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(vue.toDisplayString(f.desc), 1)
                          ]),
                          _: 2
                        }, 1032, ["name", "src", "alt-text"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  vue.createVNode(_component_fe_card, {
                    onClick: ($event) => $setup.toOut(f.link),
                    style: { "cursor": "pointer" },
                    hoverable: ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_fe_user, {
                        name: f.name,
                        src: f.avatar,
                        "alt-text": f.link
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(f.desc), 1)
                        ]),
                        _: 2
                      }, 1032, ["name", "src", "alt-text"])
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($setup.friends, (f, i) => {
            return vue.openBlock(), vue.createBlock(_component_fe_grid, {
              xs: 24,
              sm: 12,
              md: 8,
              key: i
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_fe_card, {
                  onClick: ($event) => $setup.toOut(f.link),
                  style: { "cursor": "pointer" },
                  hoverable: ""
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_fe_user, {
                      name: f.name,
                      src: f.avatar,
                      "alt-text": f.link
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(f.desc), 1)
                      ]),
                      _: 2
                    }, 1032, ["name", "src", "alt-text"])
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_hide, {
    class: "links__hide",
    tips: "\u8BD5\u9A8C\u533A\uFF0C\u6682\u672A\u5F00\u653E"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Links.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var Links = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6]]);
var Talk_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$5 = {
  setup() {
    const { toDetail } = useNav();
    const getPosts = vue.inject(injectKey.POSTS, () => []);
    return {
      posts: getPosts().filter((item) => item.isTalk),
      toDetail
    };
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_fe_grid_group = vue.resolveComponent("fe-grid-group");
  const _component_fe_grid = vue.resolveComponent("fe-grid");
  const _component_fe_card = vue.resolveComponent("fe-card");
  const _component_fe_image = vue.resolveComponent("fe-image");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "talk" }, _attrs))} data-v-3cf93f48>`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_grid_group, { gap: 2 }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        serverRenderer.ssrRenderList($setup.posts, (p, i) => {
          _push2(serverRenderer.ssrRenderComponent(_component_fe_grid, {
            xs: 24,
            sm: 12,
            md: 8,
            key: i
          }, {
            default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(serverRenderer.ssrRenderComponent(_component_fe_card, {
                  class: "card",
                  style: { "cursor": "pointer" },
                  hoverable: ""
                }, {
                  default: vue.withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="card__cover" data-v-3cf93f48${_scopeId3}>`);
                      _push4(serverRenderer.ssrRenderComponent(_component_fe_image, {
                        src: p.cover
                      }, null, _parent4, _scopeId3));
                      _push4(`</div><div class="card__desc" data-v-3cf93f48${_scopeId3}><p class="title" data-v-3cf93f48${_scopeId3}>${serverRenderer.ssrInterpolate(p.title)}</p><p class="summary" data-v-3cf93f48${_scopeId3}>${serverRenderer.ssrInterpolate(p.summary)}</p></div>`);
                    } else {
                      return [
                        vue.createVNode("div", { class: "card__cover" }, [
                          vue.createVNode(_component_fe_image, {
                            src: p.cover
                          }, null, 8, ["src"])
                        ]),
                        vue.createVNode("div", { class: "card__desc" }, [
                          vue.createVNode("p", { class: "title" }, vue.toDisplayString(p.title), 1),
                          vue.createVNode("p", { class: "summary" }, vue.toDisplayString(p.summary), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  vue.createVNode(_component_fe_card, {
                    class: "card",
                    onClick: ($event) => $setup.toDetail(p.to),
                    style: { "cursor": "pointer" },
                    hoverable: ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode("div", { class: "card__cover" }, [
                        vue.createVNode(_component_fe_image, {
                          src: p.cover
                        }, null, 8, ["src"])
                      ]),
                      vue.createVNode("div", { class: "card__desc" }, [
                        vue.createVNode("p", { class: "title" }, vue.toDisplayString(p.title), 1),
                        vue.createVNode("p", { class: "summary" }, vue.toDisplayString(p.summary), 1)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($setup.posts, (p, i) => {
            return vue.openBlock(), vue.createBlock(_component_fe_grid, {
              xs: 24,
              sm: 12,
              md: 8,
              key: i
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_fe_card, {
                  class: "card",
                  onClick: ($event) => $setup.toDetail(p.to),
                  style: { "cursor": "pointer" },
                  hoverable: ""
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode("div", { class: "card__cover" }, [
                      vue.createVNode(_component_fe_image, {
                        src: p.cover
                      }, null, 8, ["src"])
                    ]),
                    vue.createVNode("div", { class: "card__desc" }, [
                      vue.createVNode("p", { class: "title" }, vue.toDisplayString(p.title), 1),
                      vue.createVNode("p", { class: "summary" }, vue.toDisplayString(p.summary), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Talk.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Talk = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-3cf93f48"]]);
const routes = [
  { path: "/", name: "list", component: List },
  {
    path: "/posts",
    name: "article",
    component: Article,
    children: posts$1
  },
  {
    path: "/talk",
    name: "talk",
    component: Talk
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/archives",
    name: "archives",
    component: Archives
  },
  {
    path: "/links",
    name: "links",
    component: Links
  }
];
function createRouter(history) {
  return vueRouter.createRouter({
    history,
    routes
  });
}
var NavBar_vue_vue_type_style_index_0_lang = "";
const LOGO_LINK = "https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/pixelartoc_1.png";
const _sfc_main$4 = {
  components: { Moon: vueIcons.Moon, Sun: vueIcons.Sun },
  setup() {
    const { theme, themeChange } = FectUI.useTheme();
    const r = vueRouter.useRouter();
    const isActive = (name) => {
      return r.currentRoute.value.name === name;
    };
    return {
      LOGO_LINK,
      theme,
      themeChange,
      isActive
    };
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_fe_avatar = vue.resolveComponent("fe-avatar");
  const _component_fe_button = vue.resolveComponent("fe-button");
  const _component_moon = vue.resolveComponent("moon");
  const _component_sun = vue.resolveComponent("sun");
  const _component_fe_link = vue.resolveComponent("fe-link");
  _push(`<header${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "nav-bar" }, _attrs))}><div class="nav-bar__info"><div class="profile">`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_avatar, {
    class: "profile__logo",
    src: $setup.LOGO_LINK
  }, null, _parent));
  _push(`<h1 class="profile__title">\u67D2\u5B87\u7684\u535A\u5BA2</h1></div>`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_button, {
    size: "small",
    auto: ""
  }, {
    icon: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($setup.theme === "light-theme") {
          _push2(serverRenderer.ssrRenderComponent(_component_moon, null, null, _parent2, _scopeId));
        } else {
          _push2(serverRenderer.ssrRenderComponent(_component_sun, null, null, _parent2, _scopeId));
        }
      } else {
        return [
          $setup.theme === "light-theme" ? (vue.openBlock(), vue.createBlock(_component_moon, { key: 0 })) : (vue.openBlock(), vue.createBlock(_component_sun, { key: 1 }))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><nav class="nav-bar__links"><ul><li class="link">`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_link, {
    to: "/",
    block: "",
    color: $setup.isActive("list")
  }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u4E3B\u9875`);
      } else {
        return [
          vue.createTextVNode("\u4E3B\u9875")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="link">`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_link, {
    to: "/talk",
    block: "",
    color: $setup.isActive("talk")
  }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u968F\u60F3`);
      } else {
        return [
          vue.createTextVNode("\u968F\u60F3")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="link">`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_link, {
    to: "/archives",
    block: "",
    color: $setup.isActive("archives")
  }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u5F52\u6863`);
      } else {
        return [
          vue.createTextVNode("\u5F52\u6863")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="link">`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_link, {
    to: "/links",
    block: "",
    color: $setup.isActive("links")
  }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u94FE\u63A5`);
      } else {
        return [
          vue.createTextVNode("\u94FE\u63A5")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="link">`);
  _push(serverRenderer.ssrRenderComponent(_component_fe_link, {
    to: "/about",
    block: "",
    color: $setup.isActive("about")
  }, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u5173\u4E8E`);
      } else {
        return [
          vue.createTextVNode("\u5173\u4E8E")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav></header>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/NavBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
var Footer_vue_vue_type_style_index_0_lang = "";
const _sfc_main$3 = {
  components: { Github: vueIcons.Github, Rss: vueIcons.Rss },
  setup() {
    const { toOut } = useNav();
    return {
      toOut
    };
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_github = vue.resolveComponent("github");
  const _component_rss = vue.resolveComponent("rss");
  _push(`<footer${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "footer" }, _attrs))}><div class="footer__copyright">QIYUOR2 \xA9 2021</div><div class="footer__links">`);
  _push(serverRenderer.ssrRenderComponent(_component_github, {
    class: "icon",
    size: "16"
  }, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_rss, {
    class: "icon",
    size: "16"
  }, null, _parent));
  _push(`</div></footer>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Footer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
var Layout_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
  components: { NavBar, "x-footer": Footer },
  setup() {
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nav_bar = vue.resolveComponent("nav-bar");
  const _component_router_view = vue.resolveComponent("router-view");
  const _component_x_footer = vue.resolveComponent("x-footer");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "layout" }, _attrs))}>`);
  _push(serverRenderer.ssrRenderComponent(_component_nav_bar, null, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<div class="layout__footer">`);
  _push(serverRenderer.ssrRenderComponent(_component_x_footer, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Layout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Layout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
var Link_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  components: { "icon-link": vueIcons.Link }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_icon_link = vue.resolveComponent("icon-link");
  _push(`<a${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "custom-link" }, _attrs))}>`);
  _push(serverRenderer.ssrRenderComponent(_component_icon_link, {
    class: "custom-link__icon",
    size: "12"
  }, null, _parent));
  serverRenderer.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</a>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Link.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Link = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
var App_vue_vue_type_style_index_0_lang = "";
const FONT_LINK = "https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap";
const HETI_LINK = "//unpkg.com/heti/umd/heti.min.css";
const posts = posts$1.sort((pre, cur) => new Date(cur.date).getTime() - new Date(pre.date).getTime());
const _sfc_main = {
  components: {
    Layout
  },
  setup() {
    const customComponents = {
      a: Link
    };
    vue.provide(injectKey.POSTS, () => posts);
    return { FONT_LINK, HETI_LINK, customComponents };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Layout = vue.resolveComponent("Layout");
  _push(`<!--[--><link${serverRenderer.ssrRenderAttr("href", $setup.FONT_LINK)}><link rel="stylesheet"${serverRenderer.ssrRenderAttr("href", $setup.HETI_LINK)}>`);
  _push(serverRenderer.ssrRenderComponent(_component_Layout, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var main$1 = "";
var main = "";
function createApp(routerType = "") {
  const app = vue.createSSRApp(App);
  const router = createRouter(routerType === "memory" ? vueRouter.createMemoryHistory() : vueRouter.createWebHistory());
  const head$1 = head.createHead();
  app.use(head$1);
  app.use(router);
  app.use(FectUI__default["default"]);
  app.component("Hide", Hide);
  return { app, router };
}
async function render(url, manifest) {
  const { app, router } = createApp("memory");
  router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await serverRenderer.renderToString(app, ctx);
  console.log(ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = path.basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
exports.render = render;
