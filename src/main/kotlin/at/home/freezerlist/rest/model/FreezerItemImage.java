package at.home.freezerlist.rest.model;

import java.time.LocalDate;

public class FreezerItemImage {
    private Long id;

    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
