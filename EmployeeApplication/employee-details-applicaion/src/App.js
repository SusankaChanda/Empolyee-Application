import React, {useEffect, useReducer } from 'react';
import{v4 as uuidv4} from 'uuid'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';

const App = () => {
  const currentDate = new Date();
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

  // Initialize useReducer
  const [state, dispatch] = useReducer(employeeReducer, [], () => {
    const storedData = localStorage.getItem('employeeList');
    return storedData ? JSON.parse(storedData) : [];
  });

  // Add employee function
  const addEmployee = (employee) => {
    const currentDate = new Date();
    dispatch({ type: 'ADD_EMPLOYEE', payload: { ...employee, id: uuidv4(), date: currentDate } });
  };


  // Save employee list to local storage
  useEffect(() => {
    localStorage.setItem('employeeList', JSON.stringify(state));
  }, [state]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-details" element={<EmployeeList employeeList={state} dispatch={dispatch} />} />
          <Route path="/create-new-employee" element={<CreateEmployee addEmployee={addEmployee} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
