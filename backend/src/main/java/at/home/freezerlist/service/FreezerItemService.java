package at.home.freezerlist.service;

import at.home.freezerlist.rest.model.FreezerItem;
import java.util.List;

public interface FreezerItemService {
    List<FreezerItem> getFreezerItem();

    FreezerItem getFreezerItem(Long id);

    FreezerItem createFreezerItem(FreezerItem freezerItem);

    FreezerItem updateFreezerItem(Long id, FreezerItem freezerItem);

    void deleteFreezerItem(Long id);

}

