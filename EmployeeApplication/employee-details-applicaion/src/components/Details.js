import React, { useReducer, useState, useEffect } from 'react';

const Details = () => {
  const [employeeList, setEmployeeList] = useState([]);

  // Reducer function
  const employeeReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_EMPLOYEE':
        return [...state, action.payload];
      case 'EDIT_EMPLOYEE':
        return state.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        );
      case 'DELETE_EMPLOYEE':
        return state.filter((employee) => employee.id !== action.payload.id);
      default:
        return state;
    }
  };

  // Dispatch function
  const [dispatch] = useReducer(employeeReducer, employeeList);

  // Add employee function
  const addEmployee = (employee) => {
    dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
    saveToLocalStorage(employeeList);
  };

  // Edit employee function
  const editEmployee = (employee) => {
    dispatch({ type: 'EDIT_EMPLOYEE', payload: employee });
    saveToLocalStorage(employeeList);
  };

  // Delete employee function
  const deleteEmployee = (employee) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: employee });
    saveToLocalStorage(employeeList);
  };

  // Save employee list to local storage
  const saveToLocalStorage = (employeeList) => {
    localStorage.setItem('employeeList', JSON.stringify(employeeList));
  };

  // Retrieve employee list from local storage
  const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem('employeeList');
    if (storedData) {
      setEmployeeList(JSON.parse(storedData));
    }
  };

  // Load employee list from local storage on component mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <div>
      {/* Employee list rendering */}
      {employeeList.map((employee) => (
        <div key={employee.id}>
          {/* Employee details */}
          <button onClick={() => editEmployee(employee)}>Edit</button>
          <button onClick={() => deleteEmployee(employee)}>Delete</button>
        </div>
      ))}

      {/* Add employee form */}
      <form onSubmit={handleAddEmployee}>
        {/* Form fields */}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default Details;