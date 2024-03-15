package at.home.freezerlist.repository;

import at.home.freezerlist.repository.model.DrawerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawerRepository extends JpaRepository<DrawerModel, Long> {
    DrawerModel getByPhysicalOrder(int physicalOrder);
}
