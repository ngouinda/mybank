import  { useEffect, useState } from "react";
import { fetchDepenses, createDepense, deleteDepense } from "../../api/depenses";

function Depenses() {
    const [depenses, setDepenses] = useState([]);
    const [newDepense, setNewDepense] = useState({ montant: "", date: "", description: "" });

    useEffect(() => {
        // Charger les dépenses au montage du composant
        const loadDepenses = async () => {
            const data = await fetchDepenses();
            setDepenses(data);
        };
        loadDepenses();
    }, []);

    const handleCreate = async () => {
        await createDepense(newDepense);
        const data = await fetchDepenses();
        setDepenses(data);
    };

    const handleDelete = async (id) => {
        await deleteDepense(id);
        const data = await fetchDepenses();
        setDepenses(data);
    };

    return (
        <div>
            <h1>Liste des dépenses</h1>
            <ul>
                {depenses.map((depense) => (
                    <li key={depense.id}>
                        {depense.description} - {depense.montant}€
                        <button onClick={() => handleDelete(depense.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <h2>Ajouter une dépense</h2>
            <input
                type="text"
                placeholder="Montant"
                value={newDepense.montant}
                onChange={(e) => setNewDepense({ ...newDepense, montant: e.target.value })}
            />
            <input
                type="text"
                placeholder="Date (YYYY-MM-DD HH:MM:SS)"
                value={newDepense.date}
                onChange={(e) => setNewDepense({ ...newDepense, date: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newDepense.description}
                onChange={(e) => setNewDepense({ ...newDepense, description: e.target.value })}
            />
            <button onClick={handleCreate}>Ajouter</button>
        </div>
    );
}

export default Depenses;
