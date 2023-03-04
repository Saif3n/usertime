import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Navigation from "../Navigation";

function AddCompany() {
    const [valIndustry, setValIndustry] = useState('');
    const [valName, setValName] = useState('');
    const [valNumber, setValNumber] = useState('');

    const companyIndustry = useRef("");
    const companyName = useRef("");
    const companyPhoneNumber = useRef("");

    function submitReview(event) {
        event.preventDefault();

        setValIndustry('');
        setValName('');
        setValNumber('');

        let payload = {
            companyIndustry: companyIndustry.current.value,
            companyName: companyName.current.value,
            companyPhoneNumber: companyPhoneNumber.current.value
        }

        axios
            .post("https://personalbackendreact.azurewebsites.net/AddCompany", payload)
            .then((response) => {
                console.log('Azure post successful.', response.status, response.data);
                alert(response.data)
            }).catch((error) => {
                console.log('Azure post unsuccessful.', error.status, error.message);
            });

    }

    const handleCompanyNameChange = (event) => {
        setValName(event.target.value);
      };
    
      const handleCompanyIndustryChange = (event) => {
        setValIndustry(event.target.value);
      };
    
      const handleCompanyPhoneNumberChange = (event) => {
        setValNumber(event.target.value);
      };


    return (

        <div className="companyForm">
            <Navigation></Navigation>
            <div className="contact">

                <Form onSubmit={submitReview}>
                    Add a company using the form below:
                    <br></br>
                    <br></br>
                    <Form.Group>
                        <div className="submit-company">Company Name:
                            <Form.Control
                                required
                                className="form-company"
                                type="text"
                                value={valName}
                                onChange={handleCompanyNameChange}
                                ref={companyName} 
                            />
                            <p></p>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div className="submit-company">Company Industry:
                            <Form.Control
                                required
                                className="form-company"
                                type="text"
                                value={valIndustry}
                                onChange={handleCompanyIndustryChange}
                                ref={companyIndustry} 
                            />
                            <p></p>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div className="submit-company">Phone Number:
                            <Form.Control
                                required
                                className="form-company"
                                type="number"
                                value={valNumber}
                                onChange={handleCompanyPhoneNumberChange}
                                ref={companyPhoneNumber} 
                            />
                            <p></p>
                        </div>
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
    );
}
export default AddCompany;
