import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTask, deleteTask } from '../services/taskService';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await getTask(id);
        setTask(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        alert('Erreur lors du chargement de la tâche');
        navigate('/');
      }
    };
    
    loadTask();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la tâche "${task.title}" ?\n\nCette action est irréversible.`
    );
    
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteTask(id);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la tâche');
      setDeleting(false);
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'todo': 'À faire',
      'inprogress': 'En cours',
      'done': 'Terminé'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'todo': '#3b82f6',
      'inprogress': '#f59e0b',
      'done': '#10b981'
    };
    return colorMap[status] || '#6b7280';
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

  if (!task) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '0.5rem',
            margin: 0
          }}>
            Tâche non trouvée
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Cette tâche n'existe pas ou a été supprimée.
          </p>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            ← Retour au tableau
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '700px',
        width: '100%'
      }}>
        {/* Bouton retour */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '0.5rem 0',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#2563eb'}
            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
          >
            <span>←</span> Retour au tableau
          </Link>
        </div>

        {/* Carte principale */}
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {/* En-tête avec titre et statut */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            color: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h1 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  lineHeight: '1.2'
                }}>
                  {task.title}
                </h1>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}>
                  {getStatusLabel(task.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div style={{ padding: '2rem' }}>
            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Description
              </h3>
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1.5rem',
                minHeight: '80px'
              }}>
                {task.description ? (
                  <p style={{
                    margin: 0,
                    lineHeight: '1.6',
                    color: '#4b5563',
                    fontSize: '1rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {task.description}
                  </p>
                ) : (
                  <p style={{
                    margin: 0,
                    color: '#9ca3af',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    padding: '1rem 0'
                  }}>
                    Aucune description fournie pour cette tâche
                  </p>
                )}
              </div>
            </div>

            {/* Informations */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Informations
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Date de création :</span>
                  <span style={{ color: '#111827', fontWeight: '600' }}>
                    {task.createdDate || new Date(task.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

              </div>
            </div>

            {/* Actions */}
            <div style={{ 
              display: 'flex',
              flexDirection: window.innerWidth < 640 ? 'column' : 'row',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <Link 
                to={`/edit/${id}`} 
                style={{
                  flex: 1,
                  display: 'block',
                  textDecoration: 'none'
                }}
              >
                <button style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1d4ed8';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'translateY(0)';
                }}
                >
                  Modifier
                </button>
              </Link>
              
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  flex: 1,
                  backgroundColor: deleting ? '#fca5a5' : '#ef4444',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!deleting) {
                    e.target.style.backgroundColor = '#dc2626';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!deleting) {
                    e.target.style.backgroundColor = '#ef4444';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {deleting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Suppression...
                  </>
                ) : (
                  "Supprimer"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
