import { useNavigate } from 'react-router-dom';
import { Draggable } from '@hello-pangea/dnd';

function TaskCard({ task, index }) {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={handleDoubleClick}
          className="task-card-hover"
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: snapshot.isDragging ? '#f0f9ff' : '#fff',
            color: '#000',
            transition: 'all 0.3s ease',
            cursor: snapshot.isDragging ? 'grabbing' : 'grab',
            transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
            boxShadow: snapshot.isDragging ? '0 8px 25px rgba(0, 0, 0, 0.25)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            ...provided.draggableProps.style
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0' }}>
            {task.title}
          </h3>
          
          <p style={{ margin: '0', color: '#666' }}>
            {task.description?.substring(0, 50)}
            {task.description?.length > 50 ? '...' : ''}
          </p>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
