package org.jahia.modules.jahiaui;

import org.jahia.services.content.JCRNodeWrapper;
import org.jahia.services.content.JCRSessionFactory;
import org.jahia.services.render.RenderContext;
import org.jahia.services.render.Resource;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Main implements Controller {

    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            RenderContext context = new RenderContext(request, response, null);
            JCRNodeWrapper node = JCRSessionFactory.getInstance().getCurrentUserSession().getNode("/");
            Resource resource = new Resource(node, null, null, null);
            context.setMainResource(resource);
            request.setAttribute("renderContext", context);
            request.getRequestDispatcher("/modules/jahia-ui-root/root.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
