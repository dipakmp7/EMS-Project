import React, { useEffect, useState } from "react";
import EmployeeServices from "../services/EmployeeServices";
import { Link, useNavigate ,useParams} from "react-router-dom";

const AddEmployee = () => {

    const [firstName,setfirstname] = useState('')
    const [lastName,setlastname] = useState('')
    const [email,setemail] = useState('')

    const navigate = useNavigate();

    
    const saveOrUpdateEmployee = (e) => {
        // In event handlers, an event object (often denoted as e or event) is automatically passed as an argument. This object contains information about the event, such as its type and any default actions associated with it.
        e.preventDefault();  // prevents default form submission

        // This is a method of the event object. When called, it prevents the browser's default behavior associated with the event. For a form submission, the default behavior is to send the form data to the server and reload the page. By calling e.preventDefault(), you're telling the browser not to perform this default action.

        const employee = {firstName,lastName,email}
        // console.log(employee);
        
        if(id){
            EmployeeServices.updateEmployee(id,employee).then((respose) =>{
                navigate('/employees');
            }).catch(error =>{
                console.log(error)
            })
        }
        else{
            EmployeeServices.addEmployee(employee).then((response) =>{
                // console.log(response.data);
                navigate('/employees');
            })
            .catch(error => {
                console.log(error);
            })
        }
        
    }
    
    const {id} = useParams();  // 'id' contains the value from the URL parameter

    // Assuming you have a route like /employees/:id in your application, and you navigate to a URL like /employees/123, this code would set the value of id to "123".

    useEffect(()=>{
        EmployeeServices.getEmployeeById(id).then((response) => {
            console.log(response);
            setfirstname(response.data.firstName);
            setlastname(response.data.lastName);
            setemail(response.data.email);

        })
        .catch(error => {
            console.log(error);
        })
    },[])

    //it is common page for add or update employee by title() method 
    const title = () =>{
        if(id)
        {
            return <h2 className="text-center">Update Employee</h2>
        }
        else{
            return <h2 className="text-center">Add Employee</h2>
        }
    }

    return(
        <div>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {/* <h2 className="text-center">Add Employee</h2> */}
                         {
                            title()
                         }   
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name : </label>
                                    <input 
                                        type="text"
                                        placeholder="Enter First Name"
                                        name="firstname"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setfirstname(e.target.value)}
                                    >
                                    </input>
<br/>
                                    <label className="form-label">Last Name : </label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Last Name"
                                        className="form-control"
                                        name="lastname"
                                        value={lastName}
                                        onChange={(e) => setlastname(e.target.value)}
                                    >                                        
                                    </input>
<br/>
                                    <label className="form-label">Email : </label>
                                    <input 
                                        type="text"
                                        placeholder="Enter Email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                    >                                        
                                    </input>
<br />
                                    <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)}>Save</button>
                                    <Link to="/employees" className="btn btn-danger">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;