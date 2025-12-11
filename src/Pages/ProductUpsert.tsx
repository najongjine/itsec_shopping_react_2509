// src/components/Header.tsx

/**
 * 컴포넌트 기본 골격:
 * import React from "react";    무조건 가져오고
 * css 필요한거 import 하고
 * const Header: React.FC = () => {
 * 에서 Header 요거는 내가 정하고 싶은 이름(파일이름이랑 똑같이)
 *
 * return (
 * ...
 * 여기 안에 html 태그로 내용 작성
 * )
 *
 * 마지막에 export default Header;
 * Header 를 내가 정하고 싶은 이름으로 변경(파일이음이랑 똑같이)
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useShallow } from "zustand/shallow";

const ProductUpsert: React.FC = () => {
  /**
   * 서버의 /api/shopping/upsert
   * 여기에 상품 올리기 해보기
   */
  const mode = import.meta.env.MODE;
  const userInfo = useAuthStore((state: any) => state.userInfo);

  // 2. 액션 함수 가져오기 (SET을 위한 함수)
  const { login, logout } = useAuthStore(
    useShallow((state: any) => ({
      login: state?.login,
      logout: state?.logout,
    }))
  );
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  async function onSave() {
    const formData = new FormData();

    // 2. 일반 텍스트 데이터 추가
    formData.append("product_name", productName);
    formData.append("description", productDetail);
    formData.append("category_id", String(categoryId)); // 숫자는 문자열로 변환하여 전송

    // 3. 파일 배열 추가 (반복문 사용)
    // 서버에서 받는 키 이름이 'images'라고 가정했을 때:
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      // 4. Fetch 요청 보내기
      const response = await fetch(`${API_BASE_URL}/api/shopping/upsert`, {
        method: "POST",
        headers: { Authorization: `Bearer ${userInfo?.token ?? ""}` },
        body: formData,
        // 주의: headers에 'Content-Type': 'multipart/form-data'를 설정하면 안 됩니다!
        // 브라우저가 자동으로 boundary를 포함하여 설정합니다.
      });
      let result = await response.json();
      if (!result?.success) {
        alert(`서버 에러. ${result?.msg ?? ""}`);
        return;
      }
      alert(`업로드 성공`);
      navigate("/");
    } catch (error: any) {
      alert(`에러. ${error?.message ?? ""}`);
      return;
    }
  }

  return (
    <div className="">
      <div>상품 업로드</div>
      <div>
        <label>카테고리 코드:</label>
        <input
          type="number"
          value={categoryId}
          onChange={(event) => {
            const value = Number(event?.target?.value ?? 1);
            setCategoryId(value);
          }}
        />
      </div>
      <div>
        <label>상품이름:</label>
        <input
          placeholder="상품 이름"
          value={productName}
          onChange={(event) => {
            const value = String(event?.target?.value ?? "");
            setProductName(value);
          }}
        />
      </div>
      <div>
        <label>상품 내용:</label>
        <textarea
          placeholder="상품 내용"
          cols={50}
          rows={50}
          value={productDetail}
          onChange={(event) => {
            const value = String(event?.target?.value ?? "");
            setProductDetail(value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="이미지선택"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => {
            const files = event.target.files;

            if (files && files.length > 0) {
              // FileList 객체를 일반 배열(Array)로 변환
              const fileArray = Array.from(files);

              // State 업데이트 (기존 파일을 덮어쓸지, 추가할지에 따라 로직 결정)
              setSelectedFiles(fileArray);

              // 만약 기존 파일에 '추가'하고 싶다면 아래 주석 해제:
              // setSelectedFiles((prev) => [...prev, ...fileArray]);
            }
          }}
        />
      </div>
      <br />
      <div>
        <button onClick={onSave}>저장</button>
      </div>
    </div>
  );
};

export default ProductUpsert;
