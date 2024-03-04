package at.home.freezerlist.rest;

import at.home.freezerlist.rest.model.FreezerItem;
import at.home.freezerlist.service.FreezerItemImageService;
import at.home.freezerlist.service.FreezerItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("api/{id}/image")
public class FreezerItemImageController {

    private static final Logger log = LoggerFactory.getLogger(FreezerItemImageController.class);

    @Autowired
    private FreezerItemImageService freezerItemImageService;

    @RequestMapping(method = RequestMethod.PUT, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> addImage(@PathVariable("id") Long id, @RequestPart byte[] image) throws IOException {
        log.info("getFreezerItemList, getting freezerItemList");
        return ResponseEntity.ok(freezerItemImageService.addImage(id, image));
    }

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> getImage(@PathVariable("id") Long id) {
        log.info("getFreezerItemList, getting freezerItemList");
        return ResponseEntity.ok(freezerItemImageService.getImage(id));
    }
}