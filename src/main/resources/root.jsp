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
<%@ taglib prefix="jur" uri="http://www.jahia.org/tags/jahia-ui-root/functions" %>

<%--Get namespaces of dependant modules--%>
<c:set var="i18nNamespaces" value="${jur:getI18nNamespaces()}"/>

<html>

<head>
    <meta charset="utf-8">
    <title>${fn:escapeXml(renderContext.mainResource.node.displayableName)}</title>
    <script src="${contextPath}/modules/dx-commons-webpack/javascript/js-load.js"></script>
    <js:loader target="jahia-extends"/>

    <link rel="stylesheet" type="text/css" media="screen" href="<c:url value='/engines/jahia-anthracite/css/edit_en.css'/>" />
    <script type="text/javascript" src="<c:url value='/engines/jahia-anthracite/js/dist/build/anthracite-min.js'/>"></script>
</head>

<body style="overflow: hidden; margin: 0; box-sizing: border-box">

<internal:gwtGenerateDictionary/>
<internal:gwtInit/>
<internal:gwtImport module="empty"/>

<c:set var="targetId" value="reactComponent${fn:replace(currentNode.identifier,'-','_')}"/>
<div id="${targetId}">loading..</div>


<div id="gwt-root"></div>

<script type="text/javascript">
    window.contextJsParameters = window.contextJsParameters || {};
    window.contextJsParameters = Object.assign({}, window.contextJsParameters, {
        config: {
            actions: []
        },
        targetId: '${targetId}',
        contextPath: '${contextPath}',
        locale: '${currentResource.locale}',
        user: {
            fullname:'${user:fullName(currentUser)}',
            email:'${userEmail}',
            path:'${currentUser.localPath}'
        },
        links: ${links},
        environment: '${environment}',
        i18nNamespaces: ${i18nNamespaces},
        namespaceResolvers: {},
        siteKey:'${renderContext.site.siteKey}'
    });

    window['jahia-extends'].push('/modules/jahia-ui-root/javascript/apps/jahia.bundle.js');
    bootstrap(window['jahia-extends']);
</script>

</body>
