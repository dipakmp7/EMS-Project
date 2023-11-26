import React, { useEffect, useState } from "react";
import EmployeeServices from "../services/EmployeeServices";
import { Link } from "react-router-dom";


const EmployeeList = () => {

    const [employees, setemployees] = useState([]);

    useEffect(() => {

        // put the below data in getAllEmps() bcoz after deleting we write same logic in deletEmp also to avoid that i write one common method 
        // EmployeeServices.getAllEmployees().then((response) => {
        //     setemployees(response.data);
        //     // console.log(response.data);
        // })
        // .catch(error => {
        //     console.log(error);
        // })

        getAllEmps()
    },[])

    const getAllEmps = () =>{
        EmployeeServices.getAllEmployees().then((response) => {
            setemployees(response.data);
            // console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

const deleteEmp = (id) => {
    // console.log(id);
    EmployeeServices.deleteEmployee(id).then((response) => {
        getAllEmps();
    }).catch(error => {
        console.log(error);
    })
}

    return(
        <div>
        <br/><br/>
        <div className="container">
            <h2 className="text-center">Employee List</h2>
            <Link to="/addEmployee" className="btn btn-primary mb-2">Add Employee</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th>ID</th>    
                    <th>First Name</th>    
                    <th>Last Name</th>    
                    <th>Email</th>  
                    <th>Actions</th>    

                </thead>    

                <tbody>
                    {
                        employees.map(
                            employee => 
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <Link to={`/editEmployee/${employee.id}`} className="btn btn-info">Update</Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>deleteEmp(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </div>
    )

}

export default EmployeeList;