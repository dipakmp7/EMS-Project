package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.ems.dao.EmployeeDao;
import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")  // is used to handle Cross-Origin Resource Sharing (CORS) by specifying the allowed origins.
//@CrossOrigin("*")
@RestController                   // indicates that this class is a controller that handles HTTP requests.
@RequestMapping ("/employees")    //  specifies the base URL for all the request mappings in this class.
public class EmployeeController {
	
	@Autowired          // is used for automatic dependency injection of the EmployeeDao bean, which is responsible for data access operations related to employees.
	private EmployeeDao employeeDao;  // if we want to create the reference or object of any class in controller we have @Autowired annotation
	
	
/*	This method is mapped to handle HTTP GET requests to the base URL /employees. 
	It retrieves and returns a list of all employees using the findAll method of the employeeDao.
*/
	@GetMapping
	public List<Employee> getAllEmployee()
	{
		return employeeDao.findAll();
	}
	
	
/*
  This method is mapped to handle HTTP POST requests to the base URL /employees. 
  It creates a new employee by accepting a JSON request body (@RequestBody) and saves it using the save method of employeeDao.
*/
	@PostMapping
	public Employee saveEmployee(@RequestBody Employee emp)   // is used for extracting entire request body
	{
		return employeeDao.save(emp);
	}
	
	
/*
 This method is mapped to handle HTTP GET requests with a specific employee ID. 
 It retrieves an employee by ID using the findById method of employeeDao. 
 If the employee is not found, it throws a ResourceNotFoundException, which results in an HTTP 404 response.
*/
	@GetMapping("{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable int id)  //pathvariable means it gets id from url  and it gets the values from url
	{
		Employee emp = employeeDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee not Found"));
		return ResponseEntity.ok(emp);
	}
	
/*
	This method is mapped to handle HTTP PUT requests with a specific employee ID. 
	It updates the details of an existing employee based on the provided request body (empDtls). 
	It throws a ResourceNotFoundException if the employee with the specified ID is not found.
*/	

	@PutMapping("{id}")
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee empDtls,@PathVariable int id)
	{
		Employee updateEmp = employeeDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Employee Not Found"));
		
		updateEmp.setFirstName(empDtls.getFirstName());
		updateEmp.setLastName(empDtls.getLastName());
		updateEmp.setEmail(empDtls.getEmail());
		
		employeeDao.save(updateEmp);
		
		return ResponseEntity.ok(updateEmp); 
	}
	
/*
	This method is mapped to handle HTTP DELETE requests with a specific employee ID. 
	It deletes an employee by ID using the deleteById method of employeeDao. 
	If the employee is not found, it throws a ResourceNotFoundException. 
	The response is a message indicating that the employee has been deleted.
*/
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable int id)
	{
		Employee emp = employeeDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee not Found"));
		employeeDao.deleteById(id);
		return ResponseEntity.ok("Employee Deleted");
	}
}
