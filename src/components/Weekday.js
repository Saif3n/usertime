import React, { useState, useEffect } from "react";

const Weekday = React.forwardRef((props, ref) => {
    const [data, setData] = useState({});
    const [dataWeekday, setDataweekday] = useState(null);
    const [classTernary, setClassTernary] = useState(true);
    const [activeDay, setActiveDay] = useState('');


    const companyName = props.companyName;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://localhost:7024/GetWeekDay/${companyName}`
            );
            const weekdayJson = await response.json();
            setDataweekday(weekdayJson);

        };
        fetchData();
    }, [companyName]);

    const weekArray = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const weekdayButton = async (day) => {
        setData(dataWeekday[day]);
        setActiveDay(day);

        setClassTernary(true);
        if (dataWeekday[day].numberOfReviews === '') {
            setClassTernary(false);
        }

    };

    return (
        <div className="weekday">
            <hr />
            <div className="weekTime">
                {weekArray.map((day, index) => {
                    const className = day === activeDay ? 'activeDay' : '';
                    return (
                        <li id="day" onClick={(e) => weekdayButton(day)} key={day} className={className}>
                            {day}
                        </li>
                    );
                })}
            </div>

            {data && (
                <div className="timeMessage" >
                    <h1 className={`average ${classTernary ? '' : 'active'}`} >{data.avgWaitTime}</h1>
                    <p>{data.numberOfReviews}</p>
                </div>
            )}

        </div>
    );
});

export default Weekday;
