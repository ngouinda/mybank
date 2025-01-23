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
        <div>
            <h1>Liste des catégories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleDelete(category.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <h2>Ajouter une catégorie</h2>
            <input
                type="text"
                placeholder="Nom de la catégorie"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ name: e.target.value })}
            />
            <button onClick={handleCreate}>Ajouter</button>
        </div>
    );
}

export default Categories;
