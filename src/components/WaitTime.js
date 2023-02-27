import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";

const WaitTime = React.forwardRef((props, ref) => {

  const submitTime = useRef("");

  const [timeWaited, setTimeWaited] = useState(null);
  const [lastReview, setLastReview] = useState(null);
  const [newReview, setNewReview] = useState(null);

  const companyName = props.companyName;
  const companyIndustry = props.companyIndustry;
  console.log(companyIndustry)
  console.log(companyName)

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`https://localhost:7024/GetTime?name=${companyName}`);
      const data = await response.json();
      setTimeWaited(data.timeWaited);
      setLastReview(data.timeSinceLastReview);
    };
    fetchReview();
  }, [companyName]);

  const submitReview = () => {

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
        <h1 className="contactheader">Contact me:</h1>

        <Form onSubmit={submitReview}>
          <Form.Group>
            <Form.Control required type="email" placeholder="How long did you wait on the phone?" ref={submitTime} />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
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