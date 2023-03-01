import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const WaitTime = React.forwardRef((props, ref) => {

  const submitTime = useRef("");

  const [timeWaited, setTimeWaited] = useState(null);
  const [lastReview, setLastReview] = useState(null);
  const [newReview, setNewReview] = useState(null);

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

  return (
    <div className="companyResult">
      <div className="waitTitle">The last reported wait time for {companyName} was {timeWaited}</div>

      <p className="review">Reviewed {lastReview}</p>
      <div className="industry">Industry: {companyIndustry}</div>
      <hr></hr>
      <div className="leaveReview">Leave a review</div>
      <div className="newReview">
        <div className="bottom">
          <div className="contact">

            <Form onSubmit={submitReview}>
              <Form.Group>
                How long did you wait on the phone?
                <Form.Control required className="submit-wait" type="number" placeholder="" ref={submitTime} /> minutes
              </Form.Group>
              <br></br>
              <Button variant="primary" className="button-submit" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>

      </div>
    </div>
  );
});

export default WaitTime;