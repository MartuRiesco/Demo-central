import React from 'react';
import { useNavigate } from 'react-router-dom';

function Employee({ employee }) {
    const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/book-appointment/${employee._id}`)}
    >
        <h2>{employee.name}</h2>
        <p>Lúnes a Sábado de</p>
        <h3>{employee.timings[0]}:00 - {employee.timings[1]}:00</h3>
        <i class="arrow ri-arrow-right-line"></i>
    </div>
  )
}

export default Employee;