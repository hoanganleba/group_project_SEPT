import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import '../../style.scss';
import '../../w3school.css';
import userService from '../../services/userService';
import bookingService from '../../services/bookingService';
import moment from 'moment';
class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      booking: [],
      startDateTime: '',
      endDateTime: '',
      type: 'Normal',
      status:'Pending',
      addNew: true,
      redirect: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  async fetchData() {
    const { data } = await userService.get();
    return this.setState({
      customerId: data.id,
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  save() {
    const obj = {
      startDateTime: moment(this.state.startDateTime).format(
        'YYYY-MM-DD hh:mm:ss'
      ),
      endDateTime: moment(this.state.endDateTime).format('YYYY-MM-DD hh:mm:ss'),
      type: this.state.type,
      status:this.state.status,
    };
    bookingService
      .postBooking(obj)
      .then(() => {
        alert('Booking successfully');
        this.setState({redirect: '/history'})
      })
      .catch((err) => {
        if(err.response.status === 403) {
          alert(err.response.data.message)
        }
        else {
          alert("There is something wrong with the server")
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="w3-content border-left border-right">
        <div
          className="w3-sidebar w3-light-grey w3-collapse"
          style={{ zIndex: 3, width: 260 }}
          id="mySidebar"
        >
          <div className="w3-container w3-display-container w3-padding-16">
            <div className="base-container">
              <div className="header">Booking Form</div>
              <div className="content">
                <div className="form">
                  <p>
                    <label>
                      <i className="fa fa-calendar-check-o" /> Check In
                    </label>
                  </p>
                  <input
                    className="w3-input w3-border"
                    type="datetime-local"
                    id="startDateTime"
                    name="startDateTime"
                    value={this.state.startDateTime}
                    onChange={this.handleChange}
                    placeholder="hh/mm"
                    required
                  />
                  <br/>
                  <p>
                    <label>
                      <i className="fa fa-calendar-o" /> Check Out
                    </label>
                  </p>
                  <input
                    className="w3-input w3-border"
                    type="datetime-local"
                    id="endDateTime"
                    name="endDateTime"
                    value={this.state.endDateTime}
                    onChange={this.handleChange}
                    placeholder="hh/mm"
                    required
                  />

                  <br></br>

                  <label>Court Type:</label>
                  <select
                    id="type"
                    name="type"
                    value={this.state.type}
                    defaultValue={this.state.type}
                    onChange={this.handleChange}
                  >
                    <option value="Normal" type="normal">
                      Normal
                    </option>
                    <option value="Premium" type="premium">
                      Premium
                    </option>
                  </select>
                </div>
                <div className="footer">
                  <center>
                  <button
                      className="w3-button w3-green"
                      onClick={this.save.bind(this)}
                      
                  >Submit
                  </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w3-main w3-white" style={{ marginLeft: 260 }}>
          <div className="w3-container">
            <h2 className="w3-text-green">Booking Tennis Court</h2>

            <Carousel>
              <Carousel.Item
                style={{ width: '100%', height: 500, marginBottom: -6 }}
              >
                <img
                  src={require('./images/tennis_court_1.jpg')}
                  style={{ width: '100%', height: 500, marginBottom: -6 }}
                  alt={'court 1'}
                />
                <Carousel.Caption>
                  <h3>Normal Court</h3>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  src={require('./images/tennis_court_3.jpg')}
                  style={{ width: '100%', height: 500, marginBottom: -6 }}
                  alt={'court 1'}
                />
                <Carousel.Caption>
                  <h3>Premium Court</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="w3-container">
            <h4>
              <strong>The space</strong>
            </h4>
            <div className="w3-row w3-large">
              <div className="w3-col s6">
                <p>
                  <i className="fa fa-fw fa-clock-o" /> Check In: After 7AM
                </p>
                <p>
                  <i className="fa fa-fw fa-clock-o" /> Check Out: 10PM
                </p>
              </div>
              <div className="w3-col s6">
                <p>
                  <i className="fa fa-fw fa-male" /> Max people: 10
                </p>
              </div>
            </div>
            <div className="w3-col s6">
              <p>
                <i className="fa fa-fw fa-male" /> Max people: 10
              </p>
            </div>

            <h4>
              <strong>Facilities</strong>
            </h4>
            <div className="w3-row w3-large">
              <div className="w3-col s6">
                <p>
                  <i className="fa fa-fw fa-shower" /> Bathroom
                </p>
                <p>
                  <i className="fa fa-fw fa-wifi" /> WiFi
                </p>
              </div>
              <div className="w3-col s6">
                <p>
                  <i className="fa fa-fw fa-cutlery" /> BBQ
                </p>
              </div>
            </div>
          </div>

          <div className="w3-container" id="contact">
            <h2>Contact</h2>
            <i className="fa fa-map-marker" style={{ width: 30 }} /> Vietnam, Ho
            Chi Minh City
            <br />
            <i className="fa fa-phone" style={{ width: 30 }} /> Phone: 123456789{' '}
            <br />
            <i className="fa fa-envelope" style={{ width: 30 }} />
            Email: nomail@mail.com
            <br />
            <p>Questions? Go ahead, ask them:</p>
            <form target="_blank">
              <p>
                <input
                  className="w3-input w3-border"
                  type="text"
                  placeholder="Name"
                  required
                  name="Name"
                />
              </p>
              <p>
                <input
                  className="w3-input w3-border"
                  type="text"
                  placeholder="Email"
                  required
                  name="Email"
                />
              </p>
              <p>
                <input
                  className="w3-input w3-border"
                  type="text"
                  placeholder="Message"
                  required
                  name="Message"
                />
              </p>
              <button type="submit" className="w3-button w3-green w3-third">
                Send a Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingForm;
