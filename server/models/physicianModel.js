const physicianJson = require("../db/physicians.json");
const appointmentJson = require("../db/appointments.json");

module.exports = {
  addPhysician,
  getPhysician,
  editPhysician,
  findById,
  getPhysicians,
  findByEmail,
  getAppointmentsByPhysician,
};

const db = [...physicianJson];
const appointmentDb = [...appointmentJson];

async function getPhysicians() {
  try {
    const physicians = await db;
    return physicians;
  } catch (e) {
    console.log("getPhysicians", e);
    return null;
  }
}

async function findByEmail(email) {
  try {
    const physician = await db.find((physician) => physician.email === email);
    if (physician) {
      return { ...physician, role: "admin" };
    }
  } catch (e) {
    console.log("findEmail", e);
    return null;
  }
}

async function addPhysician(physician) {
  try {
    await db.push({
      ...physician,
    });

    return findByEmail(physician.email);
  } catch (e) {
    console.log("addPhysician", e);
    return null;
  }
}

async function getPhysician(id) {
  try {
    const physician = await db.find((physician) => physician.id == id);
    if (physician) {
      return { ...physician, role: "admin" };
    }
  } catch (e) {
    console.log("getPhysician", e);
    return null;
  }
}

async function editPhysician(id, changes) {
  try {
    const physician = db.find((physician) => physician.id == id);
    console.log('physician', physician);
    if (physician) {
      const updatedPhysician = { ...physician, ...changes, id };
      const index = db.indexOf(physician);
      db.splice(index, 1, updatedPhysician);
      return findById(id);
    }
  } catch (e) {
    console.log("editPhysician", e);
    return null;
  }
}

async function findById(id) {
  try {
    const physician = await db.find((physician) => physician.id == id);
    if (physician) {
      return { ...physician };
    }
  } catch (e) {
    console.log("findById", e);
    return null;
  }
}

async function deletePhysician(id) {
  try {
    const physician = await db.find((physician) => physician.id == id);
    if (physician) {
      const index = db.indexOf(physician);
      db.splice(index, 1);
      return physician;
    }
  } catch (e) {
    console.log("deletePhysician", e);
    return null;
  }
}

async function getAppointmentsByPhysician(id) {
  try {
    const appointments = await appointmentDb.filter(
      (appointment) => appointment.physician_id == id
    );
    if (appointments) {
      return appointments;
    }
  } catch (e) {
    console.log("getAppointmentsByPhysician", e);
    return null;
  }
}
