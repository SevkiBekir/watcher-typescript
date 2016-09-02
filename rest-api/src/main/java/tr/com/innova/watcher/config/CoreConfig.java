package tr.com.innova.watcher.config;

import org.apache.cxf.transport.servlet.CXFServlet;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Created by herdemir on 08.04.2016.
 */
@Configuration
public class CoreConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ServletRegistrationBean servletRegistrationBean() {
        CXFServlet servlet = new CXFServlet();
        return new ServletRegistrationBean(servlet, "/services/*");
    }
}
