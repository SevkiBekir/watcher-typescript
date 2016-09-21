package tr.com.innova.watcher.camel;

import org.apache.camel.spring.SpringRouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by SBK on 20/09/16.
 */
@Component
public class CronRouteBuilder extends SpringRouteBuilder {

    @Autowired
    private CronRunService cronRunService;
    @Override
    public void configure() throws Exception {
        from("quartz2://watcher/methodRun?cron=0+0+12+1/1+*+?+*") // Every day
                .bean(cronRunService,"methodRun");
    }


}
