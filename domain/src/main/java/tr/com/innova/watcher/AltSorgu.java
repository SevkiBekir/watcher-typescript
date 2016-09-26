package tr.com.innova.watcher;

/**
 * Created by SBK on 10.09.2016
 */
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AltSorgu {
    public String sorguMetni;
}
