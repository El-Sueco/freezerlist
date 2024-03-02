package at.home.freezerlist.rest;

import at.home.freezerlist.rest.model.FreezerItem;
import at.home.freezerlist.service.FreezerItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FreezerItemController {

    private static final Logger log = LoggerFactory.getLogger(FreezerItemController.class);

    @Autowired
    private FreezerItemService freezerItemService;

    @GetMapping
    public ResponseEntity<List<FreezerItem>> getFreezerItemList() {
        log.info("getFreezerItemList, getting freezerItemList");
        return ResponseEntity.ok(freezerItemService.getFreezerItemList());
    }

    @PostMapping
    public ResponseEntity<FreezerItem> createFreezerItem(@RequestBody FreezerItem freezerItem) {
        log.info("createFreezerItem, creating FreezerItem with {}", freezerItem);
        FreezerItem freezerItemCreated = freezerItemService.createFreezerItem(freezerItem);
        return ResponseEntity.ok(freezerItemCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FreezerItem> updateFreezerItem(@PathVariable("id") String id, @RequestBody FreezerItem freezerItem) {
        log.info("updateFreezerItem, update FreezerItem {} with {}", id, freezerItem);
        FreezerItem freezerItemUpdated = freezerItemService.updateFreezerItem(id, freezerItem);
        return ResponseEntity.ok(freezerItemUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFreezerItem(@PathVariable("id") String id) {
        log.info("deleteFreezerItem, delete FreezerItem {}", id);
        freezerItemService.deleteFreezerItem(id);
        return ResponseEntity.ok().build();
    }
}