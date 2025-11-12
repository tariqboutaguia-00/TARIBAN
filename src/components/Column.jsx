import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

function Column({ title, columnId, tasks }) {
  // Fonction pour obtenir les couleurs selon le titre de la colonne
  const getHeaderStyle = (title) => {
    switch(title) {
      case 'À faire':
        return {
          backgroundColor: '#fee2e2', // red-100
          borderLeft: '4px solid #dc2626', // red-600
          color: '#991b1b' // red-800
        };
      case 'En cours':
        return {
          backgroundColor: '#fef3c7', // yellow-100
          borderLeft: '4px solid #d97706', // yellow-600
          color: '#92400e' // yellow-800
        };
      case 'Terminé':
        return {
          backgroundColor: '#dcfce7', // green-100
          borderLeft: '4px solid #16a34a', // green-600
          color: '#166534' // green-800
        };
      default:
        return {
          backgroundColor: '#f3f4f6', // gray-100
          borderLeft: '4px solid #6b7280', // gray-500
          color: '#374151' // gray-700
        };
    }
  };

  return (
    <div style={{
      flex: 1,
      minWidth: '300px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <div style={{
        ...getHeaderStyle(title),
        padding: '1rem',
        marginBottom: '1rem',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>{title}</span>
        <span style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '0.25rem 0.5rem',
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }}>
          {tasks.length}
        </span>
      </div>
      
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ 
              padding: '0 1rem 1rem 1rem',
              minHeight: '200px',
              backgroundColor: snapshot.isDraggingOver ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              borderRadius: '8px',
              transition: 'background-color 0.2s ease'
            }}
          >
            {tasks.length === 0 ? (
              <p style={{ color: '#999', fontStyle: 'italic', padding: '2rem 0', textAlign: 'center' }}>
                Aucune tâche
              </p>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
