package at.home.freezerlist.service;

import java.io.File;
import java.io.IOException;

public interface FreezerItemImageService {

    String addImage(Long id, byte[] image) throws IOException;

    void removeImage(Long id);

    String getImage(Long id);
}

