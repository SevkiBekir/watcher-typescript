package tr.com.innova.watcher;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.List;

/**
 * Created by SBK on 10.09.2016
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Sorgu {

    @NotEmpty
    String _id;
    public String userName;
    public String anaSorgu;
    public String aciklama;
    public List<String> altSorguList;
    public Tetikleyici tetikleyici;
    public String sName;


}
