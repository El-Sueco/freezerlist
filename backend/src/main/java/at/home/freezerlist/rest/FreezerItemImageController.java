package at.home.freezerlist.rest;

import at.home.freezerlist.rest.model.FreezerItemImage;
import at.home.freezerlist.service.FreezerItemImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("api/freezerItems/{id}/images")
public class FreezerItemImageController {

    private static final Logger log = LoggerFactory.getLogger(FreezerItemImageController.class);

    @Autowired
    private FreezerItemImageService freezerItemImageService;

    @PutMapping
    public ResponseEntity<FreezerItemImage> createOrUpdateImage(@PathVariable("id") Long id, @RequestBody FreezerItemImage freezerItemImage) {
        log.info("createOrUpdateImage, creating or updating freezerItemList image");
        if (!Objects.equals(id, freezerItemImage.getId())) {
            throw new UnsupportedOperationException("id of path and request did not match");
        }
        return ResponseEntity.ok(freezerItemImageService.createOrUpdateImage(id, freezerItemImage));
    }

    @GetMapping
    public ResponseEntity<FreezerItemImage> getImage(@PathVariable("id") Long id) {
        log.info("getImage, getting freezerItemList image");
        return ResponseEntity.ok(freezerItemImageService.getImage(id));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteImage(@PathVariable("id") Long id) {
        log.info("deleteImage, deleting freezerItemList image");
        freezerItemImageService.deleteImage(id);
        return ResponseEntity.ok().build();
    }
}