function Toolbar({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  newTaskTitle,
  onNewTaskTitleChange,
  onCreateTask
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      flexWrap: 'wrap'
    }}>
      {/* Section gauche : Création rapide */}
      <div style={{ 
        flex: '1',
        minWidth: '300px',
        maxWidth: '400px'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>

          <input
            type="text"
            placeholder="Créer une nouvelle tâche..."
            value={newTaskTitle}
            onChange={(e) => onNewTaskTitleChange(e.target.value)}
            onKeyPress={onCreateTask}
            style={{
              width: '100%',
              fontSize: '1rem',
              padding: '0.875rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: '#f8fafc',
              color: '#1e293b',
              fontWeight: '500',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            }}
          />
        </div>
      </div>

      {/* Section droite : Recherche et filtre */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'center',
        flex: '1',
        justifyContent: 'flex-end',
        minWidth: '400px'
      }}>
        {/* Barre de recherche */}
        <div style={{ width: '250px' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>

            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: '#374151',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Filtre par statut */}
        <div style={{ width: '160px' }}>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">Tous les statuts</option>
            <option value="todo">À faire</option>
            <option value="inprogress">En cours</option>
            <option value="done">Terminé</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
