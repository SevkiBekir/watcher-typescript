package tr.com.innova.watcher;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.List;

/**
 * Created by SBK on 26.09.2016.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PrivateConnection {

    @NotEmpty
    String _id;
    public String connectionName;
    public String databaseName;
    public String host;
    public String port;
    public String serviceName;
    public String username;
    public String password;



}

