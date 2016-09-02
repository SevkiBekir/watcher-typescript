package tr.com.innova.watcher;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;
/**
 * Created by ysatici on 03.08.2016.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BildirimGrubu {
    String emailMetni;
    String smsMetni;
    List<Alici> alici;
    enum EmailEkTipi{
       HICBIRI, EXCEL, PDF
    };
    EmailEkTipi ekTip;
    enum BildirimYontemi{
        EMAIL, SMS, HEPSI, HICBIRI
    };
    BildirimYontemi bildirimYont;
    int mesajSayisi;
    int mesajKarakter;
}
