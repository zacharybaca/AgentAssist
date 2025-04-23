import './create-category.css';
import { useCategory } from '../../hooks/useCategory.js';

const CreateCategory = () => {
    const { categories, addedCategory, fetchCategories, createCategory, updateCategory, deleteCategory, handleChange, handleSubmit, error } = useCategory();


    return (
        <form submit={handleSubmit} id="createCategoryForm">
            <h2>Create A Category</h2>

            <label htmlFor="name">Create A Category Name: </label>

            <input
                type="text"
                name="name"
                placeholder="Category Name"
                onChange={handleChange}
                value={addedCategory.name}
                required
            />

            <label htmlFor="description">Enter A Description For Category: </label>

            <textarea
                id="description"
                name="description"
                placeholder="Enter A Category Description"
                rows="10"
                cols="50"
                wrap="hard"
                form="createCategoryForm"
                onChange={handleChange}
                value={addedCategory.description}
                required
            >

            </textarea>

            <button type="submit">Add Category</button>
        </form>
    )
}


export default CreateCategory;
