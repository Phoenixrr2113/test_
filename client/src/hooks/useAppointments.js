// create a new hook that will be used to update a appointment
import { useState } from "react";
import AppointmentService from "../services/appointmentService";
export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listAppointments = async (params) => {
    setLoading(true);
    try {
      const data = await AppointmentService.getAppointments(params);
      setAppointments(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

    const listAppointmentsByPhysician = async (params) => {
        setLoading(true);
        try {
            const data = await AppointmentService.getAppointmentsByPhysician(params);
            setAppointments(data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };


  return {
    appointments,
    loading,
      error,
    listAppointmentsByPhysician,
    listAppointments,
  };
}
