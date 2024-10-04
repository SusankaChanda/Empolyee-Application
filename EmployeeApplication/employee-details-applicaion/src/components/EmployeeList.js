import React, { useState } from 'react';
import '../styling/employeeList.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import CreateEmployee from './CreateEmployee';

const EmployeeList = ({ employeeList, dispatch }) => {
    console.log(employeeList.fileAddress)
  const [editingEmployee, setEditingEmployee] = useState(null);
  const numberOfEmployees = employeeList.length;

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/create-new-employee');
  };

  const deleteEmployee = (id) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: { id } });
  };

  const saveEmployee = (employee) => {
    dispatch({ type: 'EDIT_EMPLOYEE', payload: employee });
    setEditingEmployee(null);
  };

  return (
    <div className='main-container'>
      <div className='sub-container'>
        <Header />
        <div className='employee-list-heading-container'>
          <h1 className='heading-name'>Employee List</h1>
        </div>
        <div className='employee-list-details-container'>
          <div className='employee-list-taskbar'>
            <div className='count-container'>Total Count- {numberOfEmployees}</div>
            <div>
              <button className='btn btn-secondary new-button' onClick={handleButtonClick}>
                Create New Employee
              </button>
            </div>
            <div className='search-bar-container'>
              <input type="text" className='search-bar' placeholder='Search for employee name' />
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
          </div>
          <div className='table-container'>
            <table className="employee-list-table" border="1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile number</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Create-Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee,i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>
                      <img src={employee.profile} alt="Profile" />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.selectedSkills?.join(',')}</td>
                    <td>{new Date(employee.date).toLocaleDateString()}</td>
                    <td>
                      <div>
                        <button
                          className="btn btn-secondary edit-button"
                          onClick={() => setEditingEmployee(employee)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger delete-button"
                          onClick={() => deleteEmployee(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
