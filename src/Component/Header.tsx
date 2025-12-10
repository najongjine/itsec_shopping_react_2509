import { useState } from "react";
import "./Header.css";
// useLocation을 import 합니다.
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useShallow } from "zustand/shallow";

export default function Header() {
  const userInfo = useAuthStore((state) => state?.userInfo);
  const { login, logout } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
      logout: state.logout,
    }))
  );
  const navigate = useNavigate();
  // 1. 현재 라우트 정보를 가져옵니다.
  const location = useLocation();

  return (
    <div>
      <header>
        <h1>헤더에요 </h1>
        <div className="header-right">
          {userInfo?.id ? (
            // 로그인 상태일 때
            <>
              <span className="user-info">{userInfo?.id}님 환영합니다</span>
              <button
                className="auth-button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            // 로그아웃 상태일 때
            <button
              className="auth-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </button>
          )}
        </div>
      </header>
      <ul className="topnav">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            홈
          </Link>
        </li>

        <li>
          <Link to="/video_upload">비디오업로드</Link>
        </li>
      </ul>

      {/* 서브 메뉴가 Header.tsx 파일의 반환값에 포함되므로, ImgTest.tsx 파일은 수정할 필요가 없습니다. */}
    </div>
  );
}
