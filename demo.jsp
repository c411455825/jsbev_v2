<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String templete = (String) request.getParameter("templete");
if(templete == null){
	templete = "d1";
}
//String path = request.getRealPath("/");
//path += "config\\templete\\" + templete+".jsp";
String path = "/config/templete/"+templete+".jsp";
System.out.println("path is " + path);
request.getRequestDispatcher(path).forward(request,response);
%>
