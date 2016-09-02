package tr.com.innova.watcher;

/**
 * Created by ysatici on 01.08.2016.
 */
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AltSorgu {
    public String sorguMetni;
}
