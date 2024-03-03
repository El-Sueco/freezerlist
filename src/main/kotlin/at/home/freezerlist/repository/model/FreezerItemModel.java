package at.home.freezerlist.repository.model;


import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.time.LocalDate;

@EntityScan
@Entity
@Table(name = "freezeritems")
public class FreezerItemModel {

    @Id
    @Column(name="ID", unique=true, updatable=false, nullable=false)
    @GeneratedValue
    private Long id;

    @Column(name="content", unique=false, updatable=true, nullable=false)
    private String content;

    @Column(name="drawer", unique=false, updatable=true, nullable=false)
    private DrawerModel drawer;

    @Column(name="username", unique=false, updatable=true, nullable=false)
    private LocalDate freezedate;

    public void setId(Long id) {
        this.id = id;
    }

    public DrawerModel getDrawer() {
        return drawer;
    }

    public void setDrawer(DrawerModel drawer) {
        this.drawer = drawer;
    }

    public Long getId() {
        return id;
    }

    public void setUuid(Long id) {
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
}
