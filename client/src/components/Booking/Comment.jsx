import '../../style.scss';
import React, { Component } from 'react';
import '../../w3school.css';

import userService from '../../services/userService';
import reviewService from '../../services/reviewService';

export default class Bookinghistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      reviewId: 0,
      addNew: true,
      comment: '',
      rating: 1,
      customerId: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  async fetchData() {
    const { data } = await reviewService.getAllReviews();
    const customerData = await userService.get();
    this.setState({
      reviewList: data,
      customerId: customerData.data.id
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  save() {
    const customerId = this.state.customerId;
    const reviewId = this.state.reviewId;
    const obj = {
      comment: this.state.comment,
      rating: this.state.rating,
    };
    if(this.state.addNew) {
      userService.postReview(customerId, obj)
          .then(alert('Comment successfully'))
          .then(this.fetchData())
          .catch((error) => alert(error))
          window.location.reload()
    }
    else {
      userService.editReview(customerId, reviewId, obj)
          .then(alert('Edit comment successfully'))
          .then(this.fetchData())
          .catch((error) => alert(error))
          window.location.reload()
    }
  }
  delete(customerId, reviewId) {
    if (window.confirm('Do you want to delete?')) {
      userService.deleteReview(customerId, reviewId)
          .then(alert('Delete comment successfully'))
          .then(this.fetchData())
          window.location.reload()
          .catch((error) => alert(error))
    }
  }
  edit(reviewId, comment, rating) {
    this.setState({
      reviewId: reviewId,
      comment: comment,
      rating: rating,
      addNew: false,
    });
  }
  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">
          <div
            className="w3-sidebar w3-pale-yellow w3-collapse "
            style={{ zIndex: 3, width: 360 }}
            id="mySidebar"
          >
            <div className="w3-container w3-display-container w3-padding-16">
              <h2 className="w3-text-gray">
                <strong style={{ textAlign: 'center' }}>
                  Rating the Service
                </strong>
              </h2>
              <div className="form">
                <div className="row">
                  <div className="w3-padding">
                    <div>
                      <label>Comment</label>
                    </div>

                    <textarea
                      id="comment"
                      name="comment"
                      value={this.state.comment}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="w3-padding">
                  <div className="row">
                    <div className="col-25">
                      <label>Rating</label>
                    </div>
                    <div className="col-75">
                      <select
                        id="rating"
                        name="rating"
                        value={this.state.rating}
                        defaultValue={this.state.rating}
                        onChange={this.handleChange}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <center></center>
            </div>
          </div>
          <div className="w3-main w3-white" style={{ marginLeft: 360 }}>
            <div className="w3-container">
              <div>
                <div className="w3-content w3-border-left w3-border-right">
                  <table className="w3-table-all">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.reviewList.map((review, index) => (
                        <tr key={index}>
                          <td>{review.account.firstName} {review.account.lastName}</td>
                          <td>{review.rating}</td>
                          <td>{review.comment}</td>
                          <td>
                            <button
                              className="btn-success w3-padding"
                              onClick={this.edit.bind(
                                this,
                                review.id,
                                review.comment,
                                review.rating
                              )}
                            >
                              Edit
                            </button>
                            <button
                              className="btn-danger w3-padding"
                              onClick={this.delete.bind(
                                this,
                                this.state.customerId,
                                review.id
                              )}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="w3-button w3-green"
                    onClick={this.save.bind(this)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
