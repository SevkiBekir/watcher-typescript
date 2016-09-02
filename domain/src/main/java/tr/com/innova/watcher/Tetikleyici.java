package tr.com.innova.watcher;

/**
 * Created by ysatici on 01.08.2016.
 */
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Tetikleyici {

    String tetikleyiciAdi;
    String aciklama;
    String tetikleyiciIcerik;
    boolean durum;
    BildirimGrubu bildirimGrubu;
    public enum TetikleyiciTipi{
        CRON, SIMPLE
    };
    TetikleyiciTipi tip;
    boolean bildirimEkle;
}
