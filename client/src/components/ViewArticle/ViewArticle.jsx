import "./view-article.css";

const ViewArticle = ({ article }) => {
  if (!article) {
    return <div className="view-article">Loading...</div>;
  }
  return (
    <div className="view-article">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>Author: {article.author}</p>
      <p>
        Published on: {new Date(article.publishedDate).toLocaleDateString()}
      </p>
    </div>
  );
};
export default ViewArticle;
