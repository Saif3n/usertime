import React, { useState, useEffect } from "react";

const WaitTime = React.forwardRef((props, ref) => {
    
    const companyName = props.stockName;

    const fetchReview = () => {
        fetch(`https://localhost:7024/GetTime?name${companyName}`)

    }
    return(
        <div>
            <li>2wdawd</li>
        </div>
    );
})
export default WaitTime;