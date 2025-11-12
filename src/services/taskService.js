import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

// Récupère toutes les tâches
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    throw error;
  }
};

// Récupère une tâche spécifique par son ID
export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la tâche ${id}:`, error);
    throw error;
  }
};

// Crée une nouvelle tâche
export const createTask = async (taskData) => {
  try {
    // Obtenir les tâches existantes pour calculer le prochain ordre
    const existingTasks = await getTasks();
    const tasksInSameStatus = existingTasks.filter(task => task.status === taskData.status);
    const maxOrder = tasksInSameStatus.length > 0 
      ? Math.max(...tasksInSameStatus.map(task => task.order || 0))
      : 0;

    const newTask = {
      ...taskData,
      createdAt: new Date().toISOString(),
      order: maxOrder + 1
    };
    const response = await axios.post(API_URL, newTask);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    throw error;
  }
};

// Met à jour une tâche existante
export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la tâche ${id}:`, error);
    throw error;
  }
};

// Supprime une tâche
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression de la tâche ${id}:`, error);
    throw error;
  }
};
