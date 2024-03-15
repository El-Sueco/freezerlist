package at.home.freezerlist.repository.model;


import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.util.List;

@EntityScan
@Entity
@Table(name = "drawers")
public class DrawerModel {

    @Id
    @Column(name = "ID", unique = true, updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(name = "physicalOrder", unique = false, updatable = false, nullable = false)
    private int physicalOrder;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "drawer")
    private List<FreezerItemModel> freezerItems;

    public List<FreezerItemModel> getFreezerItems() {
        return freezerItems;
    }

    public void setFreezerItems(List<FreezerItemModel> freezerItems) {
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
