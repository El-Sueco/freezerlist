package at.home.freezerlist.rest.model;

import java.util.List;

public class Drawer {
    private Long id;

    private int physicalOrder;

    private List<FreezerItem> freezerItems;

    public List<FreezerItem> getFreezerItems() {
        return freezerItems;
    }

    public void setFreezerItems(List<FreezerItem> freezerItems) {
        this.freezerItems = freezerItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPhysicalOrder() {
        return physicalOrder;
    }

    public void setPhysicalOrder(int physicalOrder) {
        this.physicalOrder = physicalOrder;
    }
}
