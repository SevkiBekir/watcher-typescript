package tr.com.innova.watcher;

import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by SBK on 10.09.2016,
 */
public interface SorguRepository extends MongoRepository<Sorgu, String> {

}
