<%@ page import="org.jahia.settings.readonlymode.ReadOnlyModeController"%>
<%@ page language="java" contentType="text/javascript" %>
<%
  response.addHeader("Pragma", "no-cache");
  response.setHeader("Cache-Control", "no-cache");
%>
contextJsParameters.readOnly = '<%= ReadOnlyModeController.getInstance().getReadOnlyStatus() %>'
