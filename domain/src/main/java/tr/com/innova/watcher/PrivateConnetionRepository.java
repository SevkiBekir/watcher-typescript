package tr.com.innova.watcher;

import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by SBK on 26.09.2016,
 */
public interface PrivateConnetionRepository extends MongoRepository<PrivateConnection, String> {

}
