import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import CreateArticle from "./components/AdminPanel/CreateArticle/CreateArticle.jsx";
import CreateCategory from "./components/CreateCategory/CreateCategory.jsx";
import AdminArticlesView from "./components/AdminPanel/AdminArticlesView/AdminArticlesView.jsx";
import ArticleList from "./components/ArticleList/ArticleList.jsx";
import { Toaster } from "react-hot-toast";
import Logo from "./assets/agent-assist-icon-no-background.png";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal.jsx";
import ArticleRating from "./components/ArticleRating/ArticleRating.jsx";
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import ViewArticle from "./components/ViewArticle/ViewArticle.jsx";
import UserInfoDashboard from "./components/UserInfoDashboard/UserInfoDashboard.jsx";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const loader = document.getElementById("loader");
  const loaderContainer = document.getElementById("loader-container");
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (loading && loader && loaderContainer) {
      setTimeout(() => {
        loader.style.display = "none";
        loaderContainer.style.display = "none";
        setLoading(false);
      }, 6000);
    }
  }, [loader, loaderContainer, loading]);

  return (
    !loading && (
      <div id="main-app-container">
        <ConfirmModal
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          rejectButton="No"
          confirmButton="Yes"
          message="Are You Sure You Want to Close This Dialog Box?"
        />
        <div id="nav-bar-app-container">
          <NavBar />
        </div>
        <div id="logo-container">
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <img src={Logo} alt="logo" />
          <h1>☎️"Answers at the speed of your next call"☎️</h1>
        </div>

        <UserInfoDashboard />

        <Routes>
          <Route exact path="/" element={<SignInForm />} />

          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/articles" element={<ArticleList />} />

          <Route path="/articles/:id" element={<ViewArticle />} />

          <Route
            path="/articles/article-rating/:id"
            element={<ArticleRating />}
          />

          <Route
            path="/admin/articles/create"
            element={
              <CreateArticle
                onSuccess={() => {
                  navigate("/admin/articles");
                }}
              />
            }
          />

          <Route path="/admin/categories/create" element={<CreateCategory />} />

          <Route path="/admin/articles" element={<AdminArticlesView />} />

          <Route path="/admin/admin-panel" element={<AdminPanel />} />
        </Routes>
      </div>
    )
  );
}

export default App;
