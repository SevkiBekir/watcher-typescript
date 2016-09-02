package tr.com.innova.watcher.config;

import org.apache.camel.spring.SpringRouteBuilder;

/**
 * Created by mersoy on 29.04.2016.
 */

//@Component
public class RouteConfiguration extends SpringRouteBuilder {

    @Override
    public void configure() throws Exception {
        //        from("cxf:bean:icraOlusturWS")
        //            .to("log:deneme")
        //            .bean(icraOlusturService);
    }
}
