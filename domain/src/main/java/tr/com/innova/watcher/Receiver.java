package tr.com.innova.watcher;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

/**
 * Created by SBK on 03.08.2016.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Receiver {
    public String label; //ad soyad
    public String value;       // email adresi
}
