package at.home.freezerlist.repository;

import at.home.freezerlist.repository.model.FreezerItemModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreezerItemRepository extends JpaRepository<FreezerItemModel, Long> {
}
