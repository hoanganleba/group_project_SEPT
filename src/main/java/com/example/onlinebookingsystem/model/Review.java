package com.example.onlinebookingsystem.model;

import lombok.EqualsAndHashCode;
import lombok.ToString;
import net.minidev.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "rating")
    private Number rating;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Account account;

    public Review(){
    }

    public Review(Number rating, String comment, Account account) {
        this.rating = rating;
        this.comment = comment;
        this.account = account;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Number getRating() {
        return rating;
    }

    public void setRating(Number rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Object getAccount() {
        JSONObject accountObject = new JSONObject();
        accountObject.put("customer_id", account.getId());
        accountObject.put("firstName", account.getFirstName());
        accountObject.put("lastName", account.getLastName());
        accountObject.put("email", account.getEmail());
        return accountObject;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
