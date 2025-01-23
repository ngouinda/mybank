import { useEffect, useState } from "react";
import { fetchCategories, createCategory, deleteCategory } from "../../api/categories";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: "" });

    useEffect(() => {
        // Charger les catégories au montage du composant
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    const handleCreate = async () => {
        await createCategory(newCategory);
        const data = await fetchCategories();
        setCategories(data);
        setNewCategory({ name: "" }); // Réinitialise le formulaire
    };

    const handleDelete = async (id) => {
        await deleteCategory(id);
        const data = await fetchCategories();
        setCategories(data);
    };

    return (
<div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Liste des Catégories</h1>

      {/* Liste des catégories */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Catégories Disponibles</h5>
        </div>
        <ul className="list-group list-group-flush">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{category.name}</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(category.id)}
                >
                  Supprimer
                </button>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">Aucune catégorie enregistrée</li>
          )}
        </ul>
      </div>

      {/* Formulaire pour ajouter une catégorie */}
      <h2 className="text-center mb-4 text-success">Ajouter une Catégorie</h2>
      <div className="card">
        <div className="card-body">
          <form>
            {/* Nom de la catégorie */}
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Nom de la catégorie</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Entrez le nom de la catégorie"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ name: e.target.value })}
              />
            </div>

            {/* Bouton Ajouter */}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleCreate}
            >
              Ajouter la Catégorie
            </button>
          </form>
        </div>
      </div>
    </div>
    );
}

export default Categories;
