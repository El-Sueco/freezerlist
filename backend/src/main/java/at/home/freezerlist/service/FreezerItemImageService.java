package at.home.freezerlist.service;

import org.springframework.web.multipart.MultipartFile;

public interface FreezerItemImageService {

    byte[] createOrUpdateImage(Long id, MultipartFile image);

    void deleteImage(Long id);

    byte[] getImage(Long id);
}

