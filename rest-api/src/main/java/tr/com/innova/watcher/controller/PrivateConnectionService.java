package tr.com.innova.watcher.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.innova.watcher.PrivateConnection;
import tr.com.innova.watcher.PrivateConnetionRepository;

/**
 * Created by SBK on 26/09/2016.
 */

@RestController
@RequestMapping("/PrivateConnectionService")
@CrossOrigin
public class PrivateConnectionService {

    private PrivateConnetionRepository repository;

    @Autowired
    public void setRepository(PrivateConnetionRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value="/save",method = RequestMethod.POST)
    public ResponseEntity save (@RequestBody PrivateConnection privateConnection){
        return ResponseEntity.ok(this.repository.save(privateConnection));
    }

}
