package at.home.freezerlist.service;

import at.home.freezerlist.repository.FreezerItemRepository;
import at.home.freezerlist.repository.model.FreezerItemModel;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Component
public class FreezerItemImageServiceImpl implements FreezerItemImageService {

    @Autowired
    private FreezerItemRepository freezerItemRepository;

    @Override
    public String addImage(Long id, byte[] image) throws IOException {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        String encodedFile = Base64.getEncoder().encodeToString(image);
        freezerItemModel.setImage(encodedFile);
        freezerItemModel = freezerItemRepository.save(freezerItemModel);
        return freezerItemModel.getImage();
    }

    @Override
    public void removeImage(Long id) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        freezerItemModel.setImage(null);
        freezerItemRepository.save(freezerItemModel);
    }

    @Override
    public String getImage(Long id) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        return optionalFreezerItemModel.get().getImage();
    }
}

