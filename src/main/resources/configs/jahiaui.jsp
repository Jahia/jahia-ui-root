<%@ page import="org.jahia.settings.SettingsBean"%>
<%@ page import="org.jahia.settings.readonlymode.ReadOnlyModeController"%>
<%@ page language="java" contentType="text/javascript" %>
<%
  response.addHeader("Pragma", "no-cache");
  response.setHeader("Cache-Control", "no-cache");
%>
contextJsParameters.fullReadOnly = '<%= ReadOnlyModeController.getInstance().getReadOnlyStatus() %>'
contextJsParameters.readOnly = '<%= SettingsBean.getInstance().isReadOnlyMode() ? "ON" : "OFF" %>'
