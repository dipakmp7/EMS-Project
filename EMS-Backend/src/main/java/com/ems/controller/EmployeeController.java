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

@CrossOrigin(origins = "http://localhost:3000/")
//@CrossOrigin("*")
@RestController
@RequestMapping ("/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeDao employeeDao;
	
	@GetMapping
	public List<Employee> getAllEmployee()
	{
		return employeeDao.findAll();
	}
	
	//build create employee rest API
	@PostMapping
	public Employee saveEmployee(@RequestBody Employee emp)
	{
		return employeeDao.save(emp);
	}
	
	//build get employee by id rest API
	@GetMapping("{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) //pathvariable means it gets id from url
	{
		Employee emp = employeeDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee not Found"));
		return ResponseEntity.ok(emp);
	}
	
	//build update employee rest API
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
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable int id)
	{
		Employee emp = employeeDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee not Found"));
		employeeDao.deleteById(id);
		return ResponseEntity.ok("Employee Deleted");
	}
}
