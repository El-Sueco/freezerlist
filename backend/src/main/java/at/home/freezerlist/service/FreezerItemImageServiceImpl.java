package at.home.freezerlist.service;

import at.home.freezerlist.repository.FreezerItemRepository;
import at.home.freezerlist.repository.model.FreezerItemModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Component
public class FreezerItemImageServiceImpl implements FreezerItemImageService {

    @Autowired
    private FreezerItemRepository freezerItemRepository;

    @Override
    public byte[] createOrUpdateImage(Long id, MultipartFile image) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        String encodedFile = null;
        try {
            encodedFile = Base64.getEncoder().encodeToString(image.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        freezerItemModel.setImage(encodedFile.getBytes());
        freezerItemModel = freezerItemRepository.save(freezerItemModel);
        return freezerItemModel.getImage();
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
    public byte[] getImage(Long id) {
        Optional<FreezerItemModel> optionalFreezerItemModel = freezerItemRepository.findById(id);
        if (optionalFreezerItemModel.isEmpty()) {
            throw new UnsupportedOperationException("item with id " + id + " not found");
        }
        FreezerItemModel freezerItemModel = optionalFreezerItemModel.get();
        return freezerItemModel.getImage();
    }

}

