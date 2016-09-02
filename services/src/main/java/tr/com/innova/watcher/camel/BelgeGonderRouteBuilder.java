package tr.com.innova.watcher.camel;

import org.apache.camel.spring.SpringRouteBuilder;
import org.springframework.stereotype.Component;

/**
 * Created by tozyurek on 27.04.2016.
 */
//@Component
public class BelgeGonderRouteBuilder extends SpringRouteBuilder {

    @Override
    public void configure() throws Exception {
        from("direct:legaliteDocumentRecieved")
            .to("direct:ebysSendDocument");
    }
}
