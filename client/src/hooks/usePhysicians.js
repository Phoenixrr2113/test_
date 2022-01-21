// create a new hook that will be used to update a physician
import { useState } from "react";
import PhysicianService from "../services/physicianService";
export default function usePhysicians() {
  const [physicians, setPhysicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listPhysicians = async (params) => {
    setLoading(true);
    try {
      const data = await PhysicianService.getPhysicians(params);
      setPhysicians(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return {
    physicians,
    loading,
    error,
    listPhysicians,
  };
}
