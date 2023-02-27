import React, { useState, useEffect } from "react";

const WaitTime = React.forwardRef((props, ref) => {

  const [timeWaited, setTimeWaited] = useState(null);
  const [lastReview, setLastReview] = useState(null);

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

  return (
    <div className="companyResult">
      <div className="waitTitle">The last reported wait time for {companyName} was {timeWaited}</div>
      
      <p className="review">Reviewed {lastReview}</p>
      <div className="industry">Industry: {companyIndustry}</div>
    </div>
  );
});

export default WaitTime;