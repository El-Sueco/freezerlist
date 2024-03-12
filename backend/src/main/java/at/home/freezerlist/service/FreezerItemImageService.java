package at.home.freezerlist.service;

import at.home.freezerlist.rest.model.FreezerItemImage;

public interface FreezerItemImageService {

    FreezerItemImage createOrUpdateImage(Long id, FreezerItemImage freezerItemImage);

    void deleteImage(Long id);

    FreezerItemImage getImage(Long id);
}

