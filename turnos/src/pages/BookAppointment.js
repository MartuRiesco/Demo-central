import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { Button, DatePicker, TimePicker } from 'antd';
import toast from 'react-hot-toast';
import dayjs from 'dayjs'
function BookAppointment() {

  const [ isAvailable, setIsAvailable ] = useState(false);
  const navigate = useNavigate();
  const [ date, setDate ] = useState();
  const [ time, setTime ] = useState();
  const { user } = useSelector((state) => state.user);
  const [ employee, setEmployee ] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const disabledTime = (now) => {
    const hour = now.hour();
    const disabled = {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
          if (i < 10 || i > 19) {
            hours.push(i);
          }
        }
        return hours;
      },
      disabledMinutes: (selectedHour) => {
        // Si la hora seleccionada está fuera del rango, deshabilita todos los minutos
        if (selectedHour < 10 || selectedHour > 19) {
          return [...Array(60).keys()];
        }
        return [];
      },
      disabledSeconds: (selectedHour, selectedMinute) => {
        if (selectedHour < 10 || selectedHour > 19 || selectedMinute !== 0) {
          return [...Array(60).keys()];
        }
        return [];
      },
    };
    return disabled;
  };
  const getEmployeeData = async() => {
    try {
        dispatch(showLoading());
        const response = await axios.post(
            '/api/employee/get-employee-info-by-id', 
            {
              employeeId: params.employeeId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
        dispatch(hideLoading())
        if(response.data.success) {
            setEmployee(response.data.data);
        }
       } catch (error) {
        dispatch(hideLoading());
    }
  }

  const bookNow = async () => {

    setIsAvailable(false);

    try {
      dispatch(showLoading());
      const response = await axios.post(
          '/api/user/book-appointment', 
          {
            employeeId: params.employeeId,
            userId: user._id,
            employeeInfo: employee,
            userInfo: user,
            date: date,
            time: time
          },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          }); console.log(response);
          console.log(time);

          
      dispatch(hideLoading())
      if(response.data.success) {
          toast.success(response.data.message);
          console.log(time);
          const bookedAppointment = {
            date: date,
            time: time
        };
        navigate('/appointment-booked', { state: { bookedAppointment } });
          
      }
     
      } catch (error) {
          toast.error('Algo se rompio')
          console.log(error);
          dispatch(hideLoading());
      }
  }

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
          '/api/user/check-booking-availability', 
          {
            employeeId: params.employeeId,
            date: date,
            time: time,
          },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
      dispatch(hideLoading())
      if(response.data.success) {
          toast.success(response.data.message);
          setIsAvailable(true)
      } else {
        toast.error(response.data.message)
      }
     } catch (error) {
      toast.error('Algo se rompio')
      dispatch(hideLoading());
  }
  }
  
  useEffect(() => {
        getEmployeeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
    <div className='title-container'>
            <h1 className='title-notifications'>Seleccione la fecha y horario a reservar.</h1>
            <i class="ri-time-line"></i>
        </div>
    <div className='calendar'>
      
      {employee && (
          <div className='mb-2'>
              <div className='d-flex flex-column mt-2'>
                  <DatePicker 
                    format='DD-MM-YYYY' 
                    className='mt-3 p-3' 
                    placeholder='Seleccione fecha'
                    onChange={(value) => {
                        setDate(
                          dayjs(value).format('DD-MM-YYYY'),
                          )
                          setIsAvailable(false);
                          }}
                  />
                   <TimePicker
                      format='HH'
                      className='mt-3 p-3'
                      placeholder='Seleccione Hora'
                      onChange={value => {
                        setIsAvailable(false);
                        setTime(dayjs(value).format('HH'));
                      }}
                      disabledTime={disabledTime}
                    />

                   <Button 
                        className='primary-button mt-4' 
                        onClick={checkAvailability}>
                          Consultar disponibilidad
                  </Button>
                  

                  { isAvailable && 
                    <Button 
                        className='primary-button mt-4'
                        onClick={ bookNow }>
                          Reservar
                  </Button>
                  }

              </div>

            
              
           </div>
      )}
    </div>

    </>
  )
}

export default BookAppointment