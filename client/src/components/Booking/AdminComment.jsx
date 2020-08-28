import '../../style.scss';
import React, { Component } from 'react';
import '../../w3school.css';

import userService from '../../services/userService';
import reviewService from '../../services/reviewService';

class AdminComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      reviewId: 0,
      addNew: true,
      comment: '',
      rating: '',
      customerId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  async fetchData() {
    const { data } = await reviewService.getAllReviews();
    return this.setState({
      reviewList: data,
      reviewId: data.reviewId,
      customerId: data.id,
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
  saving() {
    if (this.state.addNew === true) {
      const id = this.state.customerId;
      const obj = {
        comment: this.state.comment,
        rating: this.state.rating,
      };
      userService.postComment(id, obj).then((res) => console.log(res.data));
    } else {
      const id = this.state.customerId;
      const reviewId = this.state.reviewId;
      const obj = {
        comment: this.state.comment,
        rating: this.state.rating,
      };
      userService
        .editComment(id, reviewId, obj)
        .then((res) => console.log(res.data));
    }
  }
  save() {
    const id = this.state.customerId;
    const obj = {
      comment: this.state.comment,
      rating: this.state.rating,
    };
    userService.postComment(id, obj).then((res) =>
      console
        .log(res.data)
        .then(alert('Comment successfully'))
        .catch((error) => alert(error))
    );
  }
  editcomment() {
    const id = this.state.customerId;
    const reviewId = this.state.reviewId;
    const obj = {
      comment: this.state.comment,
      rating: this.state.rating,
    };
    userService
      .editComment(id, reviewId, obj)
      .then((res) => console.log(res.data));
  }
  delete(id, reviewId) {
    if (window.confirm('Do you want to cancel?')) {
      userService
        .deletecomment(id, reviewId)
        .then((res) => console.log(res.data));
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
  add() {
    this.setState({
      comment: '',
      rating: '',
      addNew: true,
    });
  }
  render() {
    console.log(this.state.reviewList);
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
                <strong>
                  <center>Rating the Service</center>
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
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.reviewList.map((review, index) => (
                        <tr key={index}>
                          <td>{review.rating}</td>
                          <td>{review.comment}</td>
                          <td>
                            <button
                              className="btn-success w3-padding"
                              onClick={this.edit.bind(
                                this,
                                review.reviewId,
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
                  <button
                    className="w3-button w3-green"
                    onClick={this.add.bind(this)}
                  >
                    Add
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
export default AdminComment;
