<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String templete = (String) request.getParameter("templete");
if(templete == null){
	templete = "templete1";
}
System.out.println("templete is " + templete);
request.getRequestDispatcher(templete+".jsp").forward(request,response);
%>
