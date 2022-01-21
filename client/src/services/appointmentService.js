export default class AppointmentService {
  static async getAppointments() {
    try {
      const responses = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments`
      );
      const data = await responses.json();
      return data;
    } catch (e) {
      console.log("getAppointments", e);
      return null;
    }
  }

  static async getAppointment(id) {
    try {
      const responses = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments/${id}`
      );
      const data = await responses.json();
      return data;
    } catch (e) {
      console.log("getAppointment", e);
      return null;
    }
  }

  static async getAppointmentsByPhysician(id) {
    try {
      const responses = await fetch(
        `${process.env.REACT_APP_API_URL}/physicians/${id}/appointments`
      );
      const data = await responses.json();
      return data;
    } catch (e) {
      console.log("getAppointmentsByPhysician", e);
      return null;
    }
  }
}
