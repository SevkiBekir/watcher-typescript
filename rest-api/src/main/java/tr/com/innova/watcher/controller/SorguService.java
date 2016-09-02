package tr.com.innova.watcher.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import tr.com.innova.watcher.SorguRepository;
import tr.com.innova.watcher.Sorgu;

@RestController
@RequestMapping("/SorguService")
@CrossOrigin
public class SorguService {

    private SorguRepository repository;

    @Autowired
    public void setSorguRepository(SorguRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/addSorgu", method = RequestMethod.POST)
    public ResponseEntity addSorgu(/*@Valid */@RequestBody Sorgu sorgu) {

        return ResponseEntity.ok(this.repository.save(sorgu));
    }
    @RequestMapping(value = "/addSorgu", method = RequestMethod.GET)
    public ResponseEntity addSorgu(/*@Valid */@RequestParam String id) {

        return ResponseEntity.ok(this.repository.findOne(id));
    }



}