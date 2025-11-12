import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { getTasks, updateTask, createTask } from '../services/taskService';
import Column from '../components/Column';
import Toolbar from '../components/Toolbar';

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Charger les tâches au montage du composant
  useEffect(() => {
    loadTasks();
  }, []);

  // Initialiser les ordres pour les tâches existantes qui n'en ont pas
  const initializeTaskOrders = async (tasksList) => {
    let needsUpdate = false;
    const statusGroups = {
      'todo': [],
      'inprogress': [],
      'done': []
    };

    // Grouper les tâches par statut
    tasksList.forEach(task => {
      if (statusGroups[task.status]) {
        statusGroups[task.status].push(task);
      }
    });

    // Assigner des ordres si manquants
    const updatedTasks = [];
    for (const [status, tasks] of Object.entries(statusGroups)) {
      tasks.forEach((task, index) => {
        if (task.order === undefined || task.order === null) {
          updatedTasks.push({ ...task, order: index + 1 });
          needsUpdate = true;
        } else {
          updatedTasks.push(task);
        }
      });
    }

    // Mettre à jour les tâches qui n'avaient pas d'ordre
    if (needsUpdate) {
      try {
        for (const task of updatedTasks) {
          if (task.order !== undefined && (
            tasksList.find(t => t.id === task.id)?.order === undefined ||
            tasksList.find(t => t.id === task.id)?.order === null
          )) {
            await updateTask(task.id, task);
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des ordres:', error);
      }
    }

    return updatedTasks;
  };

  // Debounce pour la recherche (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      const tasksWithOrders = await initializeTaskOrders(data);
      setTasks(tasksWithOrders);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };



  // Mettre à jour le statut d'une tâche
  const moveTask = async (task, newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      await updateTask(task.id, updatedTask);
      
      // Mettre à jour l'état local
      setTasks(tasks.map(t => 
        t.id === task.id ? updatedTask : t
      ));
    } catch (err) {
      console.error('Erreur lors du déplacement de la tâche:', err);
      alert('Erreur lors du déplacement de la tâche');
    }
  };

  // Fonction pour réorganiser les tâches avec nouvel ordre
  const reorderTasks = (tasksList, sourceIndex, destIndex, status) => {
    const columnTasks = tasksList.filter(task => task.status === status);
    const otherTasks = tasksList.filter(task => task.status !== status);
    
    // Réorganiser dans la colonne
    const [reorderedTask] = columnTasks.splice(sourceIndex, 1);
    columnTasks.splice(destIndex, 0, reorderedTask);
    
    // Recalculer les ordres pour cette colonne
    const reorderedColumnTasks = columnTasks.map((task, index) => ({
      ...task,
      order: index + 1
    }));
    
    return [...otherTasks, ...reorderedColumnTasks];
  };

  // Gérer le drag and drop
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Pas de destination = drop annulé
    if (!destination) {
      return;
    }

    // Même position = pas de changement
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Trouver la tâche déplacée
    const draggedTask = tasks.find(task => task.id.toString() === draggableId);
    if (!draggedTask) {
      return;
    }

    // Mapper les IDs des colonnes aux statuts
    const columnStatusMap = {
      'todo-column': 'todo',
      'inprogress-column': 'inprogress', 
      'done-column': 'done'
    };

    const newStatus = columnStatusMap[destination.droppableId];
    if (!newStatus) {
      return;
    }

    let newTasks;

    // Si c'est juste un réordonnancement dans la même colonne
    if (destination.droppableId === source.droppableId) {
      // Réorganiser avec nouveaux ordres
      newTasks = reorderTasks(tasks, source.index, destination.index, draggedTask.status);
      
      // Mettre à jour l'état local
      setTasks(newTasks);
      
      // Persister le nouvel ordre
      try {
        const updatedTask = newTasks.find(t => t.id === draggedTask.id);
        await updateTask(draggedTask.id, updatedTask);
      } catch (error) {
        // Restaurer en cas d'erreur
        setTasks(tasks);
        console.error('Erreur lors du réordonnancement:', error);
        alert('Erreur lors du réordonnancement de la tâche');
      }
      return;
    }

    // Si le statut a changé (déplacement vers une autre colonne)
    if (draggedTask.status !== newStatus) {
      // Calculer le nouvel ordre dans la colonne de destination
      const destinationTasks = tasks.filter(t => t.status === newStatus);
      const newOrder = destination.index + 1;
      
      // Mettre à jour les tâches
      newTasks = tasks.map(t => {
        if (t.id === draggedTask.id) {
          return { ...t, status: newStatus, order: newOrder };
        }
        // Réajuster les ordres dans la colonne de destination
        if (t.status === newStatus && t.order >= newOrder) {
          return { ...t, order: t.order + 1 };
        }
        // Réajuster les ordres dans la colonne source
        if (t.status === draggedTask.status && t.order > (draggedTask.order || 0)) {
          return { ...t, order: t.order - 1 };
        }
        return t;
      });
      
      // Mettre à jour l'état local immédiatement
      setTasks(newTasks);
      
      // Persister le changement
      try {
        const updatedTask = { ...draggedTask, status: newStatus, order: newOrder };
        await updateTask(draggedTask.id, updatedTask);
      } catch (error) {
        // Restaurer en cas d'erreur
        setTasks(tasks);
        console.error('Erreur lors du déplacement de la tâche:', error);
        alert('Erreur lors du déplacement de la tâche');
      }
    }
  };

  // Créer une tâche rapidement avec Enter
  const handleCreateTask = async (e) => {
    if (e.key === 'Enter' && newTaskTitle.trim()) {
      try {
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        
        const newTask = {
          title: newTaskTitle.trim(),
          description: '',
          status: 'todo',
          createdDate: formattedDate
        };
        
        const createdTask = await createTask(newTask);
        setTasks(prev => [...prev, createdTask]);
        setNewTaskTitle('');
      } catch (error) {
        console.error('Erreur lors de la création de la tâche:', error);
        alert('Erreur lors de la création de la tâche');
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }}></div>
          <h2 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e293b'
          }}>
            Chargement du tableau
          </h2>
          <p style={{
            margin: 0,
            color: '#64748b',
            fontSize: '1rem'
          }}>
            Préparation de vos tâches...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '3rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #fee2e2'
        }}>

          <h2 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#dc2626'
          }}>
            Erreur de chargement
          </h2>
          <p style={{
            margin: '0 0 2rem 0',
            color: '#6b7280',
            fontSize: '1rem'
          }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Filtrer les tâches selon la recherche et le statut
  const filteredTasks = tasks.filter(task => {
    // Filtre par recherche (titre ou description)
    const matchesSearch = 
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      task.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    // Filtre par statut
    const matchesStatus = 
      statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Filtrer les tâches par statut et trier par ordre
  const todoTasks = filteredTasks
    .filter(t => t.status === 'todo')
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const inProgressTasks = filteredTasks
    .filter(t => t.status === 'inprogress' || t.status === 'en cours')
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const doneTasks = filteredTasks
    .filter(t => t.status === 'done')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      {/* Container principal avec largeur limitée */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* En-tête avec titre */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}>
            TARIBAN
          </h1>
          <p style={{
            margin: 0,
            color: '#64748b',
            fontSize: '1.125rem',
            fontWeight: '500'
          }}>
            Organisez vos tâches efficacement
          </p>
        </div>

        {/* Barre de recherche, filtre et création rapide */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <Toolbar
            newTaskTitle={newTaskTitle}
            onNewTaskTitleChange={setNewTaskTitle}
            onCreateTask={handleCreateTask}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </div>

        {/* Affichage du nombre de résultats */}
        {(debouncedSearch || statusFilter !== 'all') && (
          <div style={{
            marginBottom: '1.5rem',
            color: '#64748b',
            fontSize: '0.875rem',
            fontWeight: '500',
            textAlign: 'center',
            padding: '0.75rem 1rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            display: 'inline-block',
            marginLeft: '50%',
            transform: 'translateX(-50%)'
          }}>
            {filteredTasks.length} tâche{filteredTasks.length > 1 ? 's' : ''} trouvée{filteredTasks.length > 1 ? 's' : ''}
          </div>
        )}

        {/* Colonnes Kanban */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            overflowX: 'auto',
            paddingBottom: '2rem',
            minHeight: '600px'
          }}>
            <Column
              title="À faire"
              columnId="todo-column"
              tasks={todoTasks}
            />
            
            <Column
              title="En cours"
              columnId="inprogress-column"
              tasks={inProgressTasks}
            />
            
            <Column
              title="Terminé"
              columnId="done-column"
              tasks={doneTasks}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default KanbanBoard;
