package tr.com.innova.watcher;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

/**
 * Created by ysatici on 03.08.2016.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Alici {
    String label; //ad soyad
    String value;       // email adresi
}
