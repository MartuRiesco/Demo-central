import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';


function AppointmentBooked() {
    const location = useLocation()
    const { state } = location;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const bookedAppointment = state ? state.bookedAppointment : null;
    const goBack = async ()=>{
            dispatch(showLoading());
            dispatch(hideLoading())
              navigate('/');
                
            
    }
    const goToAppointments = async ()=>{
        dispatch(showLoading());
        dispatch(hideLoading())
          navigate('/appointments');
            
        
}
    return (
        <div className='booked-container'>
                <div className='title-container'>
                    <h1 className='title-notifications'>Su reserva. Día y hora.</h1>
                    <i class="ri-calendar-check-line"></i>
                </div>
                {bookedAppointment ? (
                    <div>
                        <section className='green-dot-container booked'>
                            <div className='green-dot'></div>
                        </section>
                        <div className='booked-notification'>
                            <h2 className='title-appiointment-notifications'>Su reserva ha sido solicitada para el  {bookedAppointment.date} a las {bookedAppointment.time}:00.</h2>
                            <div className='buttons-appointment'>
                                <h1 className='button-booked' onClick={goBack}>
                                    Volver
                                </h1>
                                <h1  className='button-booked' onClick={goToAppointments}>
                                Mis turnos
                                </h1>
                            </div>
                        </div>
                
                    </div>
                ) : (
                    <p>No se han proporcionado datos de turno.</p>
                )}
        </div>
    );
};

export default AppointmentBooked;