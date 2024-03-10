package at.home.freezerlist.rest;

import at.home.freezerlist.service.FreezerItemImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/{id}/image")
public class FreezerItemImageController {

    private static final Logger log = LoggerFactory.getLogger(FreezerItemImageController.class);

    @Autowired
    private FreezerItemImageService freezerItemImageService;

    @RequestMapping(method = RequestMethod.PUT, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<byte[]> createOrUpdateImage(@PathVariable("id") Long id, @RequestPart MultipartFile image) {
        log.info("createOrUpdateImage, creating or updating freezerItemList image");
        return ResponseEntity.ok(freezerItemImageService.createOrUpdateImage(id, image));
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) {
        log.info("getImage, getting freezerItemList image");
        return ResponseEntity.ok(freezerItemImageService.getImage(id));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteImage(@PathVariable("id") Long id) {
        log.info("deleteImage, deleting freezerItemList image");
        freezerItemImageService.deleteImage(id);
        return ResponseEntity.ok().build();
    }
}