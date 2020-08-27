import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import '../../style.scss';
import '../../w3school.css';
import userService from '../../services/userService';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      booking: [],
      startDateTime: '',
      endDateTime: '',
      type: '',
      addNew: true,
    };

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


  render() {
    return (
      <div className="w3-content w3-border-left w3-border-right">
     
        <div className="w3-main w3-white" >
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
            <i className="fa fa-envelope" style={{ width: 30 }}></i>
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

export default AdminPage;
