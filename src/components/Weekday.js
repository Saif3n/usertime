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



    return (
        <>
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
        </>

    );
});

export default WaitTime;