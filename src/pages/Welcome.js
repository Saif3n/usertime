import { useEffect } from "react";
import axios from "axios";

function Welcome() {
    let country = '';
    let ip = '';


    const getData = async () => {

        if (window.location.href !== "http://localhost:3000/stockapp") {
            const res = await axios.get('https://geolocation-db.com/json/')
            ip = res.data.IPv4;
            country = res.data.country_name;
            console.log(ip, country)

            axios.post("https://personalbackendreact.azurewebsites.net/wfh821h2e87hdsajnd217823", {
                message: ip + ' from ' + country + ' visited your call center website'
            }).then(response => {
            }).catch(error => {
                console.error(error);
            });
    }
}
useEffect(() => {
    getData()
}, [])
}

export default Welcome;