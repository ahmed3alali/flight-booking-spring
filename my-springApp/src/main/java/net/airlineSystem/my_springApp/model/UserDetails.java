package net.airlineSystem.my_springApp.model;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

import org.hibernate.validator.constraints.UniqueElements;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "sub"))
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;

    @Column(unique = true)
    private String sub;
    private String email;
    private String familyName;
    private String givenName;
    private String locale;
    private String name;
    private String nickname;
    private String picture;
    private Instant updatedAt;

    @OneToMany
    private List<BookingDetails> allBookigs;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getSub() {
        return sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserDetails() {
        super();
        // TODO Auto-generated constructor stub
    }

    public List<BookingDetails> getAllBookigs() {
        return allBookigs;
    }

    public void setAllBookigs(List<BookingDetails> allBookigs) {
        this.allBookigs = allBookigs;
    }

    @Override
    public String toString() {
        return "UserDetails [userId=" + userId + ", sub=" + sub + ", email=" + email + ", familyName=" + familyName
                + ", givenName=" + givenName + ", locale=" + locale + ", name=" + name + ", nickname=" + nickname
                + ", picture=" + picture + ", updatedAt=" + updatedAt + ", allBookigs=" + allBookigs + "]";
    }

    public UserDetails(Integer userId, String sub, String email, String familyName, String givenName, String locale,
            String name, String nickname, String picture, Instant updatedAt, List<BookingDetails> allBookigs) {
        super();
        this.userId = userId;
        this.sub = sub;
        this.email = email;
        this.familyName = familyName;
        this.givenName = givenName;
        this.locale = locale;
        this.name = name;
        this.nickname = nickname;
        this.picture = picture;
        this.updatedAt = updatedAt;
        this.allBookigs = allBookigs;
    }

}
