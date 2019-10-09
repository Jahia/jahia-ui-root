<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="js" uri="http://www.jahia.org/tags/dxwebpack" %>
<%@ taglib prefix="internal" uri="http://www.jahia.org/tags/internalLib" %>

<html>

<head>
    <meta charset="utf-8">
    <title>Jahia</title>
    <script>
        window.contextJsParameters = {
            contextPath: '${renderContext.request.contextPath}',
            targetId: 'react-root'
        };
    </script>
    <script src="${renderContext.request.contextPath}/modules/jahia-ui-root/javascript/apps/jahia.bundle.js"></script>
</head>

<body style="overflow: hidden; margin: 0; box-sizing: border-box">

    <div id="react-root">loading..</div>

</body>
