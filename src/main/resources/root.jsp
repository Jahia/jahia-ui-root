<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="contextPath" type="java.lang.String"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="currentUser" type="org.jahia.services.usermanager.JahiaUser"--%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="user" uri="http://www.jahia.org/tags/user" %>
<%@ taglib prefix="js" uri="http://www.jahia.org/tags/dxwebpack" %>
<%@ taglib prefix="internal" uri="http://www.jahia.org/tags/internalLib" %>

<html>

<head>
    <meta charset="utf-8">
    <title>${fn:escapeXml(renderContext.mainResource.node.displayableName)}</title>
<%--    TODO remove this and fix /modules/modules issue in dx-commons--%>
    <script src="/modules/dx-commons-webpack/javascript/js-load.js"></script>
    <js:loader target="jahia-extends"/>
</head>

<body style="overflow: hidden; margin: 0; box-sizing: border-box">


<%--<internal:gwtGenerateDictionary/>--%>
<%--<internal:gwtInit/>--%>
<%--<internal:gwtImport module="empty"/>--%>

<c:set var="targetId" value="reactComponent${fn:replace(currentNode.identifier,'-','_')}"/>
<div id="${targetId}">loading..</div>

<div id="gwt-root"></div>
<script type="text/javascript">
    window.contextJsParameters = {
        targetId: '${targetId}',
        contextPath: '${contextPath}',
        locale: '${currentResource.locale}',
        user: {
            fullname:'${user:fullName(currentUser)}',
            email:'${userEmail}'
        }
    };
    window['jahia-extends'].push('/modules/jahia-ui-root/javascript/apps/jahia.bundle.js');
    bootstrap(window['jahia-extends']);
</script>

</body>
