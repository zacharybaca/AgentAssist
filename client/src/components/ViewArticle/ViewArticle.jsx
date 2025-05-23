import "./view-article.css";

const ViewArticle = ({ article }) => {
  if (!article) {
    return <div className="view-article">Loading...</div>;
  }

  return (
    <div className="view-article">
      <h1>Title: {article.title}</h1>
      <p>{article.body}</p>
      <p>Category: {article.category}</p>
      <p>Tags: {article.tags?.join(", ")}</p>
      <p>Author: {article.createdBy}</p>
      <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>
      {article.coverImage && (
        <img src={article.coverImage} alt="Article cover" />
      )}
      <p>Status: {article.status}</p>
    </div>
  );
};

export default ViewArticle;
