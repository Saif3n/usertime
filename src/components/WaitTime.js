import React, { useState, useEffect } from "react";

const WaitTime = React.forwardRef((props, ref) => {

  const [timeWaited, setTimeWaited] = useState(null);
  const [lastReview, setLastReview] = useState(null);

  const companyName = props.companyName;
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
    <div>
      <h1>{timeWaited}</h1>
      <p>{lastReview}</p>
    </div>
  );
});

export default WaitTime;