package tr.com.innova.watcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * Created by herdemir on 21.03.2016.
 */
@SpringBootApplication(scanBasePackages = "tr.com.innova.watcher")
public class Application extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Application.class).web(true);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
