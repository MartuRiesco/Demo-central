import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Appoinments() {
  const {user }= useSelector(state=> state.user)
  const [ appointments, setAppointments ] = useState();
  const dispatch = useDispatch()
    const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      if(user.isAdmin){
        const response = await axios.get('/api/admin/get-all-appointments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }})
          dispatch(hideLoading());
          if(response.data.success) {
            setAppointments(response.data.data)
          }
      }else{
        const response = await axios.get('/api/user/get-appointments-by-user-id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
      
        dispatch(hideLoading());
        if(response.data.success) {
          setAppointments(response.data.data)
        }
      }
    } catch (error) {
        dispatch(hideLoading());
    }
  }

  
    useEffect(() => {
        getAppointmentsData()
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const statusTitle = user?.isAdmin ? ', revise los turnos pendientes.' : user?.isEmployee ? ', revise los turnos pendientes.' : ', corrobore el estado de su turno.';
  
  return (
    <div className='service'>
        <div className='title-container'>
            <h1 className='title-notifications'>{user.name}{statusTitle}</h1>
            <i class="ri-calendar-check-line"></i>
        </div>
        <div className='service-container'>
        {appointments?.map((employee) => (
                            <div className='employee-card'>
                            {console.log(moment(employee.time).utcOffset(0).format('HH:mm'))}
                            <h2>{user.isAdmin ? employee.employeeInfo.name : 'Turno'}</h2>
                            <p className='employee-status'>{employee.status}</p>
                            {user.isAdmin && <p>Cliente: {employee.userInfo.name}</p>}
                            <p>Email: {employee.employeeInfo.email}</p>
                            <p>Fecha: {moment(employee.date).format('DD-MM-YYYY')}</p>
                            <p>Hora: {moment(employee.time).utcOffset(0).format('HH:mm')}</p>
                            {
                              employee.status === 'cancelado'  && user.isEmployee === false ?
                              <Link to={'/home'}> <p className='employee-reserved'>
                                Reservar otro turno
                               </p></Link>: ''
                            }
                          </div>
                        )) 
                        }
        </div>
    </div>
  )
}

export default Appoinments