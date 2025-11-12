import { useState } from 'react';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../services/taskService';

function TestTaskService() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async (testName, testFn) => {
    setLoading(true);
    try {
      const data = await testFn();
      setResult({ success: true, testName, data });
      console.log(`${testName}:`, data);
    } catch (error) {
      setResult({ success: false, testName, error: error.message });
      console.error(`${testName}:`, error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Test TaskService</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Tests disponibles:</h3>
        
        <button onClick={() => handleTest('getTasks', getTasks)}>
          1. Récupérer toutes les tâches
        </button>
        <br /><br />
        
        <button onClick={() => handleTest('getTask(1)', () => getTask(1))}>
          2. Récupérer la tâche ID=1
        </button>
        <br /><br />
        
        <button onClick={() => handleTest('createTask', () => createTask({
          title: 'Test nouvelle tâche',
          description: 'Créée depuis le composant de test',
          status: 'todo'
        }))}>
          3. Créer une nouvelle tâche
        </button>
        <br /><br />
        
        <button onClick={() => handleTest('updateTask(2)', () => updateTask(2, {
          title: 'Tâche modifiée',
          description: 'Description mise à jour',
          status: 'done',
          createdAt: '2025-09-19T11:00:00Z'
        }))}>
          4. Modifier la tâche ID=2
        </button>
        <br /><br />
        
        <button onClick={() => handleTest('deleteTask(1)', () => deleteTask(1))}>
          5. Supprimer la tâche ID=1 
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Résultat:</h3>
        {loading && <p>Chargement...</p>}
        {result && (
          <div>
            <p><strong>Test:</strong> {result.testName}</p>
            <p><strong>Statut:</strong> {result.success ? 'Succès' : 'Erreur'}</p>
            <pre style={{ backgroundColor: '#fff', padding: '10px', overflow: 'auto' }}>
              {JSON.stringify(result.success ? result.data : result.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestTaskService;
