export default class PhysicianService {
  static async getPhysicians() {
    try {
      const responses = await fetch(
        `${process.env.REACT_APP_API_URL}/physicians`
      );
      const data = await responses.json();
      return data;
    } catch (e) {
      console.log("getPhysicians", e);
      return null;
    }
  }

  static async getPhysician(id) {
    try {
      const responses = await fetch(
        `${process.env.REACT_APP_API_URL}/physicians/${id}`
      );
      const data = await responses.json();
      return data;
    } catch (e) {
      console.log("getPhysician", e);
      return null;
    }
  }
}
