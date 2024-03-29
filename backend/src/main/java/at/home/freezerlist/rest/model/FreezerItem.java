package at.home.freezerlist.rest.model;

import java.time.LocalDate;

public class FreezerItem {
    private Long id;

    private String content;

    private long drawerId;

    private LocalDate freezedate;

    public long getDrawerId() {
        return drawerId;
    }

    public void setDrawerId(long drawer) {
        this.drawerId = drawer;
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
        return "{\"id\": " + id + "\", content\": " + content + ", \"freezedate\": " + freezedate + ", \"drawer\": " + drawerId + "}";
    }
}
