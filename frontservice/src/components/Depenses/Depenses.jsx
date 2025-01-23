import { useEffect, useState } from "react";
import { fetchDepenses, createDepense, deleteDepense } from "../../api/depenses";

function Depenses() {
  const [depenses, setDepenses] = useState([]);
  const [newDepense, setNewDepense] = useState({ montant: "", date: "", description: "" });

  // Charger les dépenses au montage du composant
  useEffect(() => {
    const loadDepenses = async () => {
      const data = await fetchDepenses();
      setDepenses(data);
    };
    loadDepenses();
  }, []);

  // Créer une nouvelle dépense et l'ajouter à la liste
  const handleCreate = async () => {
    if (!newDepense.montant || !newDepense.date || !newDepense.description) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    // Appel à l'API pour créer la dépense
    const createdDepense = await createDepense(newDepense);

    // Ajoute la nouvelle dépense à la liste sans avoir à recharger l'ensemble
    setDepenses((prevDepenses) => [...prevDepenses, createdDepense]);

    // Réinitialise le formulaire
    setNewDepense({ montant: "", date: "", description: "" });
  };

  // Supprimer une dépense
  const handleDelete = async (id) => {
    await deleteDepense(id);
    const data = await fetchDepenses();
    setDepenses(data);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Liste des Dépenses</h1>

      {/* Liste des Dépenses */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Dépenses Actuelles</h5>
        </div>
        <ul className="list-group list-group-flush">
          {depenses.length > 0 ? (
            depenses.map((depense) => (
              <li key={depense.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{depense.description} - {depense.montant}€</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(depense.id)}
                >
                  Supprimer
                </button>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">Aucune dépense enregistrée</li>
          )}
        </ul>
      </div>

      {/* Formulaire pour ajouter une dépense */}
      <h2 className="text-center mb-4 text-success">Ajouter une Dépense</h2>
      <div className="card">
        <div className="card-body">
          <form>
            {/* Montant */}
            <div className="form-group mb-3">
              <label htmlFor="montant" className="form-label">Montant</label>
              <input
                type="number"
                id="montant"
                className="form-control"
                placeholder="Entrez le montant"
                value={newDepense.montant}
                onChange={(e) => setNewDepense({ ...newDepense, montant: e.target.value })}
              />
            </div>

            {/* Date */}
            <div className="form-group mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="datetime-local"
                id="date"
                className="form-control"
                value={newDepense.date}
                onChange={(e) => setNewDepense({ ...newDepense, date: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                id="description"
                className="form-control"
                placeholder="Entrez une description"
                value={newDepense.description}
                onChange={(e) => setNewDepense({ ...newDepense, description: e.target.value })}
              />
            </div>

            {/* Bouton Ajouter */}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleCreate}
            >
              Ajouter la Dépense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Depenses;
