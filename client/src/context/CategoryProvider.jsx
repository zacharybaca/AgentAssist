import { CategoryContext } from './CategoryContext';
import { useState, useEffect } from 'react';

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const [addedCategory, setAddedCategory] = useState({
        name: '',
        description: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddedCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: addedCategory.name,
                    description: addedCategory.description
                }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || 'Failed to Create Category');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const token = localStorage.getItem('token');

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories: ', err);
        }
    };

    const createCategory = async (category) => {
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(category),
            });

            if (!res.ok) throw new Error('Creating Category Failed');
            const newCategory = await res.json();
            setCategories((prev) => [...prev, newCategory]);
            setAddedCategory({
                name: newCategory.name,
                description: newCategory.description
            });
            return newCategory;
        } catch (err) {
            console.error(err);
        }
    };

    const updateCategory = async (id, updatedData) => {
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error('Updating Category Failed');
            const updatedCategory = await res.json();
            setCategories((prev) =>
                prev.map((category) => (category._id === id ? updatedCategory : category))
            );
            return updatedCategory;
        } catch (err) {
            console.error(err);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (!res.ok) throw new Error('Deletion of Category Failed');
            setCategories((prev) => prev.filter((category) => category._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                addedCategory,
                error,
                fetchCategories,
                createCategory,
                updateCategory,
                deleteCategory,
                handleChange,
                handleSubmit
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
