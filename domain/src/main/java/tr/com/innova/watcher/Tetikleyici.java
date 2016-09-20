package tr.com.innova.watcher;

/**
 * Created by SBK on 20.09.2016.
 */
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Tetikleyici {

    public String tetikleyiciAdi;
    public String aciklama;
    public String tetikleyiciIcerik;
    public boolean durum;
    //public BildirimGrubu bildirimGrubu;
    public NotificationGroup notificationGroup;
    public enum TetikleyiciTipi{
        CRON, SIMPLE
    }

    public TetikleyiciTipi tip;
    public boolean bildirimEkle;
}
