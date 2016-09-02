package tr.com.innova.watcher;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.List;

/**
 * Created by ysatici on 03.08.2016.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Sorgu {

    @NotEmpty
    String _id;
    public String userName;
    String anaSorgu;
    String aciklama;
    List<String> altSorguList;
    Tetikleyici tetikleyici;

}
