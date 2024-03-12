package at.home.freezerlist.service;

import at.home.freezerlist.repository.FreezerItemRepository;
import at.home.freezerlist.repository.model.FreezerItemModel;
import at.home.freezerlist.rest.model.FreezerItemImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class FreezerItemImageServiceImpl implements FreezerItemImageService {

    @Autowired
    private FreezerItemRepository freezerItemRepository;

    @Override
    public FreezerItemImage createOrUpdateImage(Long id, FreezerItemImage freezerItemImage) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        freezerItemModel.setImage(freezerItemImage.getImage());
        freezerItemModel = freezerItemRepository.save(freezerItemModel);
        freezerItemImage.setId(freezerItemModel.getId());
        freezerItemImage.setImage(freezerItemModel.getImage());
        return freezerItemImage;
    }

    @Override
    public void deleteImage(Long id) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        freezerItemModel.setImage(null);
        freezerItemRepository.save(freezerItemModel);
    }

    @Override
    public FreezerItemImage getImage(Long id) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        FreezerItemImage freezerItemImage = new FreezerItemImage();
        freezerItemImage.setId(freezerItemModel.getId());
        freezerItemImage.setImage(freezerItemModel.getImage());
        return freezerItemImage;
    }

}

