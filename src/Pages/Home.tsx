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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductType } from "../types/global_types";

const Home: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const mode = import.meta.env.MODE;

  const [productList, setProductList] = useState<ProductType[]>([]);

  async function getProduct() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/shopping/list`, {
        method: "GET",
      });
      let result = await response.json();
      if (!result?.success) {
        alert(`서버 에러. ${result?.msg ?? ""}`);
        return;
      }
      result = result?.data;
      setProductList(result);
    } catch (error: any) {
      alert(`에러. ${error?.message ?? ""}`);
      return;
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="">
      <div>Home</div>
      <div>mode: {mode}</div>
      <div>
        {productList?.length &&
          productList?.map((item) => {
            return (
              <div>
                <span>
                  <img src={item?.imgurl ?? "/vite.svg"} />
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{item?.product_name}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{item?.createdDt}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
