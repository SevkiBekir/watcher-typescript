package tr.com.innova.watcher;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

/**
 * Created by SBK on 03.09.2016.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationGroup {
    public String emailText;
    public String smsText;
    public List<Receiver> receiver;
    public enum EmailEkTipi{
       HICBIRI, EXCEL, PDF
    }

    public EmailEkTipi emailAttachType;
    public enum BildirimYontemi{
        EMAIL, SMS, WATCHER
    }

    public List<BildirimYontemi> notificationMethod;
}
