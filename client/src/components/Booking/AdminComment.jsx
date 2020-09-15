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
      rating: 1,
      customerId: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.saving = this.saving.bind(this);
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
  saving() {
    if (this.state.addNew === true) {
      const id = this.state.customerId;
      const obj = {
        comment: this.state.comment,
        rating: this.state.rating,
      };
      userService.postReview(id, obj)
        .then(alert('Comment successfully'))
        .catch((error) => alert(error))
    } else {
      const id = this.state.customerId;
      const reviewId = this.state.reviewId;
      const obj = {
        comment: this.state.comment,
        rating: this.state.rating,
      };
      userService.editReview(id, reviewId, obj)
        .then((res) => console.log(res.data));
    }
  }

 
  delete(customerId,reviewId) {
    if (window.confirm('Do you want to cancel?')) {
      reviewService
        .deleteReview(customerId,reviewId)
        .then(() => this.fetchData());
      
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
                  <center>Reply The Customers</center>
                </strong>
              </h2>
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
              <div className="footer">
                <center>
                  <button onClick={this.save} className="w3-button w3-green">
                    Save
                    </button>
                </center>
              </div>
            </div>
          </div>
          <div className="w3-main w3-white" style={{ marginLeft: 360 }}>
            <div className="w3-container">
              <div>
                {this.state.reviewList.map((review, index) => (

                  <tr key={index}>
                    <br></br>
                    <div className="w3-container">
                      <div className="dialogbox">
                        <p><b>Name:</b> {review.account.firstName} {review.account.lastName}</p>
                        <p><b>Rating</b>: {review.rating} star</p>
                        <div className="body">
                          <span className="tip tip-up" />
                          <textarea style={{ width: 500, height: 100 }}>

                            {review.comment}

                          </textarea>
                        </div>
                      </div>
                     
                    </div>
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


                    <hr></hr>
                  </tr>

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminComment;
