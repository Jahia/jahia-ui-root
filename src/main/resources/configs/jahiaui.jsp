<%@ page import="org.jahia.settings.readonlymode.ReadOnlyModeController"%>
<%@ page language="java" contentType="text/javascript" %>
contextJsParameters.readOnly = '<%= ReadOnlyModeController.getInstance().getReadOnlyStatus() %>'
