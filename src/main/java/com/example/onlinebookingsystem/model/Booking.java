package com.example.onlinebookingsystem.model;

import lombok.EqualsAndHashCode;
import lombok.ToString;
import net.minidev.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "start_date_time")
    private String startDateTime;

    @Column(name = "end_date_time")
    private String endDateTime;

    @Column(name = "status")
    private String status;

    @Column(name = "type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Account account;

    public Booking() {
    }

    public Booking(String startDateTime, String endDateTime, String type, Account account) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.type = type;
        this.account = account;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(String startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(String endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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


