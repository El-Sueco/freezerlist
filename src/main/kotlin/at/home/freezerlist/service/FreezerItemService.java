package at.home.freezerlist.service;

import at.home.freezerlist.rest.model.FreezerItem;
import java.util.List;

public interface FreezerItemService {
    List<FreezerItem> getFreezerItemList();
    FreezerItem createFreezerItem(FreezerItem freezerItem);
    FreezerItem updateFreezerItem(String id, FreezerItem freezerItem);
    void deleteFreezerItem(String id);
}

