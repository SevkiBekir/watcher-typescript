package tr.com.innova.watcher;

import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Created by tozyurek on 17.06.2016.
 */
public interface SorguRepository extends MongoRepository<Sorgu, String> {

}
