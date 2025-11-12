import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';

function NewTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation : titre obligatoire
    if (!formData.title.trim()) {
      alert('Le titre est obligatoire');
      return;
    }

    setLoading(true);
    try {
      await createTask(formData);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de la tâche');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Créer une nouvelle tâche</h1>
      <TaskForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Créer la tâche"
        loading={loading}
      />
    </div>
  );
}

export default NewTask;
