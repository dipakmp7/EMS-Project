import axios from 'axios';

class EmployeeService{
    getAllEmployees()
    {
        return axios.get('http://localhost:2023/employees')
    }

    addEmployee(employee)
    {
        return axios.post('http://localhost:2023/employees',employee)
    }

    getEmployeeById(id)
    {
        return axios.get('http://localhost:2023/employees/'+id)
    }

    updateEmployee(id,employee)
    {
        return axios.put('http://localhost:2023/employees/'+id,employee)
    }

    deleteEmployee(id)
    {
        return axios.delete('http://localhost:2023/employees/'+id)
    }
}

export default new EmployeeService();