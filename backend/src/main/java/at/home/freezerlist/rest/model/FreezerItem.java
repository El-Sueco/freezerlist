package at.home.freezerlist.rest.model;

import java.time.LocalDate;

public class FreezerItem {
    private Long id;

    private String content;

    private Drawer drawer;

    private LocalDate freezedate;

    public Drawer getDrawer() {
        return drawer;
    }

    public void setDrawer(Drawer drawer) {
        this.drawer = drawer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getFreezedate() {
        return freezedate;
    }

    public void setFreezedate(LocalDate freezedate) {
        this.freezedate = freezedate;
    }

    @Override
    public String toString() {
        return "{\"id\": " + id + "\", content\": " + content + ", \"date\": " + freezedate + "}";
    }

    public enum Drawer {
        TOP("Oben"), MIDDLE("Mitte"), BOTTOM("Unten");

        Drawer(String name) {
        }
    }

}
