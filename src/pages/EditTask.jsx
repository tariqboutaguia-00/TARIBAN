import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    createdAt: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const task = await getTask(id);
        setFormData(task);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        alert('Erreur lors du chargement de la tâche');
        navigate('/');
      }
    };
    
    loadTask();
  }, [id, navigate]);

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

    setSaving(true);
    try {
      await updateTask(id, formData);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      alert('Erreur lors de la modification de la tâche');
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Chargement de la tâche...
          </p>
        </div>
      </div>
    );
  }

  return (
    <TaskForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitLabel="Enregistrer les modifications"
      loading={saving}
    />
  );
}

export default EditTask;
