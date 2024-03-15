package at.home.freezerlist.rest;

import at.home.freezerlist.rest.model.Drawer;
import at.home.freezerlist.service.DrawerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/drawers")
public class DrawerController {

    private static final Logger log = LoggerFactory.getLogger(DrawerController.class);

    @Autowired
    private DrawerService drawerService;

    @GetMapping
    public ResponseEntity<List<Drawer>> getDrawers() {
        log.info("getDrawers, getting drawers with freezeritems");
        return ResponseEntity.ok(drawerService.getDrawers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Drawer> getDrawer(@PathVariable("id") Long id) {
        log.info("getDrawer, getting drawer {} with freezeritems", id);
        return ResponseEntity.ok(drawerService.getDrawer(id));
    }
}