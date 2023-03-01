import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const WaitTime = React.forwardRef((props, ref) => {

  const submitTime = useRef("");

  const [timeWaited, setTimeWaited] = useState(null);
  const [lastReview, setLastReview] = useState(null);
  const [value, setValue] = useState('');

  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showLeaveReview, setShowLeaveReview] = useState(true);

  const companyName = props.companyName;
  const companyIndustry = props.companyIndustry;


  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`https://localhost:7024/GetTime?name=${companyName}`);
      const data = await response.json();
      setTimeWaited(data.timeWaited);
      setLastReview(data.timeSinceLastReview);
    };
    fetchReview();
  }, [companyName]);

  function submitReview(event) {
    event.preventDefault();
    setShowThanksMessage(true);
    setShowLeaveReview(false)
    setShowReviewForm(false)
    setValue('');

    let checkTime = submitTime.current.value

    let payload = {
      timeWaited: checkTime,
      companyName: companyName,
      reviewDate: moment().format("DD/MM/YYYY"),
    }

    axios
      .post("https://localhost:7024/AddReview", payload)
      .then((response) => {
        console.log('Azure post successful.', response.status, response.text);
      }).catch((error) => {
        console.log('Azure post unsuccessful.', error.status, error.text);
      });

  }

  const valueForm = (e) => {
    e.target.value = e.target.value.slice(0, 3);
    setValue(e.target.value);
  }

  const handleReviewButton = () =>{
    setShowLeaveReview(false)
    setShowReviewForm(true)
  }

  return (
    <div className='companyResult'>
      <div className="backgroundDiv">
        <div className="waitTitle">The last reported wait time for {companyName} was {timeWaited}</div>

        <p className="review">Reviewed {lastReview}</p>
        <div className="industry">Industry: {companyIndustry}</div>
        <hr></hr>
        <div className="weekday">Average wait time by weekday:</div>
    
        <div className="weekTime">
          <li id="day">Monday</li>
          <li id="day">Tuesday</li>
          <li id="day">Wednesday</li>
          <li id="day">Thursday</li>
          <li id="day">Friday</li>
          <li id="day">Saturday</li>
          <li id="day">Sunday</li>
        </div>
        <hr></hr>
      </div>
      <div
          className="leaveReview"
          style={{ display: showLeaveReview ? "block" : "none" }}
          onClick={handleReviewButton}
        >Leave a review</div>

      <div style={{ display: showReviewForm ? "block" : "none" }} >
        <div className="bottom">
          <div className="contact">

            <Form onSubmit={submitReview}>
              <Form.Group>
                How long did you wait on the phone?
                <div className="submit-wait"><Form.Control required type="number" value={value} min="0" onInput={e => valueForm(e)} max="999" step="1" ref={submitTime} /><p>minutes</p></div>
              </Form.Group>
              <br></br>
              <div className="submit-button">
                <Button className="button-submit" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>

      </div>
      {showThanksMessage && <div className="thanksMessage">Thanks for leaving a review, your valued input helps other kiwis gain insight into the wait time of the desired company.</div>}
    </div>
  );
});

export default WaitTime;