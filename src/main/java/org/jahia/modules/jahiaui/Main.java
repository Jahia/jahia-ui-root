package org.jahia.modules.jahiaui;

import org.jahia.services.content.JCRNodeWrapper;
import org.jahia.services.content.JCRSessionFactory;
import org.jahia.services.render.RenderContext;
import org.jahia.services.render.Resource;
import org.osgi.service.component.annotations.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component(
        service={javax.servlet.http.HttpServlet.class,javax.servlet.Servlet.class},
        property = {"alias=/moonstone", "jmx.objectname=graphql.servlet:type=root", "osgi.http.whiteboard.servlet.asyncSupported=true"}
)
public class Main extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            RenderContext context = new RenderContext(request, response, null);
            JCRNodeWrapper node = JCRSessionFactory.getInstance().getCurrentUserSession().getNode("/");
            Resource resource = new Resource(node, null, null, null);
            context.setMainResource(resource);
            request.setAttribute("renderContext", context);
            request.getRequestDispatcher("/modules/jahia-ui-root/root.jsp").include(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
