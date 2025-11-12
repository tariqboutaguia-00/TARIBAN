function TaskForm({ formData, onChange, onSubmit, onCancel, submitLabel, loading }) {
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
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          {/* En-tête */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '0.5rem',
              margin: 0
            }}>
              Modifier la tâche
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              margin: 0
            }}>
              Mettez à jour les informations de votre tâche
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={onSubmit}>
            {/* Titre */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Titre de la tâche <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                placeholder="Entrez le titre de la tâche"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#111827',
                  backgroundColor: 'white',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>
            
            {/* Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                placeholder="Décrivez la tâche (optionnel)"
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#111827',
                  backgroundColor: 'white',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            {/* Statut */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#111827',
                  backgroundColor: 'white',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="todo">À faire</option>
                <option value="inprogress">En cours</option>
                <option value="done">Terminé</option>
              </select>
            </div>
            
            {/* Boutons */}
            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth < 640 ? 'column' : 'row',
              gap: '1rem',
              paddingTop: '1rem'
            }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  flex: 1,
                  backgroundColor: loading ? '#93c5fd' : '#2563eb',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#1d4ed8';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    En cours...
                  </>
                ) : (
                  submitLabel
                )}
              </button>
              <button 
                type="button" 
                onClick={onCancel}
                style={{
                  flex: 1,
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
