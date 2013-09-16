/*!
 * Page JavaScript Library v1.0.0
 *
 * Copyright 2013  Foundation and other contributors
 * license free
 *
 *【功能】：用来获取分页页面范围或者显示分页页码页面。
 *
 *【备注】：
 *[1]、如果只想使用getPageRange()函数，可以直接注释或者删除掉showSamplePageView()函数，
 *因为showSamplePageView()函数的页面表现能力有限，用户可以根据自己的情况来自定义css样式；
 *[2]、Page.js没有引用外部js库，都是使用的基本的js对象和函数，所以可以直接使用，
 *其中的__$(__id)()函数是自己封装了，如果项目中使用了JQuery的同学，
 *可以自行替换为JQuery自带的函数，但是要注意使用到了__$()函数的地方相应的方法也应该替换为JQuery支持的
 *方法。
 *
 *【联系】：QQ：151702314 新浪微博：BlueIceQ  如果您发现有bug或者不足之处，请联系我，并及时修改，谢谢。
 *
 * Date: Fri Sep 13 2013 16:20:33 (Shanghai Standard Time)
 */


	/**声明全局变量*/
	/**当前第几页*/
	var __page_pageNow = 1;
	/**总页数*/
	var __page_totalPages = 1;
	/**页面能够看到的显示的页码总数*/
	var __page_countPages = 10;
	/**开始页码*/
	var __page_begin = 1;
	/**结束页码*/
	var __page_end = __page_countPages;
	/**后台url地址，用来处理分页的请求*/
	var __page_url = "";


	/**
	*功能：简单样式显示页码操作页面
	*@param __pageNow 当前第几页
	*@param __totalPages 总共多少页
	*@param __countPages 页面能够看到的显示的页码数量
	*@param __url 后台url地址，用来处理分页请求
	*@param __cclazz 当前页样式的css
	*@param __oclazz 其他页显示的css
	*@return 返回用来显示到页面的字符串
	*/
	function showSamplePageView(__pageNow,__totalPages,__countPages,__url,__cclazz,__oclazz,__div)
	{
		try
		{
			/**获取页面设置的当前页面的值*/
			if(__url)
			{
				__page_url = __url;
			}
			else
			{
				alert("__url");
				return false;
			}
			/**用来动态获取当前页数*/
			__pageNow = __$("cp").value;
			var range = getPageRange(__pageNow,__totalPages,__countPages);
			/**显示页面的内容*/
			var pageContent = "";
			for(var i = range[0] ; i <= range[1] ; i++ )
			{
				/**突出显示当前页*/
				if(i == __page_pageNow)
				{
				   pageContent = pageContent + "<a href=" + __page_url + i + " class=" + __cclazz + "> " + i + " </a>";
				}
				else
				{
				   pageContent = pageContent + "<a href=" + __page_url + i + " class=" + __oclazz + "> " + i + " </a>";
				}
			}
			__$(__div).innerHTML = pageContent;
		}
		catch(e)
		{
			alert("Function.showSamplePageView：" + e);
		}
	}


	/**
	*功能：计算并返回需要显示的页面的页码范围（三个参数必须给出）
	*
	*@param __pageNow 当前第几页 required
	*@param __totalPages 总共多少页 required
	*@param __countPages 页面能够看到的显示的页码数量 required
	*
	*@return begin 页码开始值
	*@return end 页码结束值
	*
	*/
	function getPageRange(__pageNow,__totalPages,__countPages)
	{
		try
		{
			/**数据验证*/
			if(__pageNow)
			{
				__page_pageNow = __pageNow;
			}
			else
			{
				alert("__pageNow");
				return false;
			}
			if(__totalPages)
			{
				__page_totalPages = __totalPages;
			}
			else
			{
				alert("__totalPages");
				return false;
			}
			if(__countPages)
			{
				__page_countPages = __countPages;
			}
			else
			{
				alert("__countPages");
				return false;
			}
			if(__page_totalPages <= 0 ){return false;}
			/**先确定__page_begin的值*/
			/**只要确定了__page_begin，就很容易确定__page_end的值。*/
			if(__page_pageNow > __page_totalPages)
			{
			   __page_pageNow =  __page_totalPages;
			}

			if((__page_totalPages - __page_pageNow) < Math.floor(__page_countPages/2))
			{
				__page_begin =  __page_totalPages - __page_countPages + 1;
			}

			else
			{
			  __page_begin = __page_pageNow - Math.floor(__page_countPages/2);
			}

			if(__page_begin < 1)
			{
				__page_begin = 1;
			}
			/**确定__page_end的值*/
			__page_end = __page_begin + __page_countPages -1;
			if(__page_end > __page_totalPages)
			{
				__page_end = __page_totalPages;
			}
			/**Js中一次返回"两个"值的方法*/
			return [__page_begin, __page_end];
		}
		catch(e)
		{
			alert("Function.getPageRange : " + e);
		}	
	}

	/**获取指定id的元素*/
	function __$(__id)
	{
		return document.getElementById(__id);
	}

	function updateTextInput(val)
	{
		  __$("cp").value = val;
	}

