package at.home.freezerlist.service;

import at.home.freezerlist.rest.model.Drawer;

import java.util.List;

public interface DrawerService {
    List<Drawer> getDrawers();

    Drawer getDrawer(Long id);

}

