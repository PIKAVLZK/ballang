import { LogIn } from "@/api/ballangAPI";
import { useAuthStore } from "@/zustand/auth.store";
import React, { useState } from "react";

function ModalPage() {
  // 로그인용 State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 상태 불러오기
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isModal = useAuthStore((state) => state.isModal);
  const setIsModal = useAuthStore((state) => state.setIsModal);

  // 바깥영역 클릭시 나가짐
  const handleToggleModal = () => {
    setIsModal(false);
  };

  // 로그인 버튼
  const handleClickSignUpButton = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      return alert("이메일 형식을 맞추어 입력해주세요!");
    }
    if (!password) {
      return alert("비밀번호를 입력해주세요!");
    }

    const result = await LogIn(email, password);
    console.log(result);

    if (!result) return alert("회원 정보가 없습니다!");

    setIsLoggedIn(true);
    setIsModal(false);
  };

  return (
    <>
      {/* true때 보임 */}
      {isModal && (
        <main
          className="bg-black/50 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-20"
          onClick={handleToggleModal}
        >
          <div
            className="absolute top-[50%] left-[50%] w-[500px] h-[530px] bg-black -translate-x-[50%] -translate-y-[50%] rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center mt-10 font-semibold text-3xl">로그인</h2>
            <section className="flex items-center justify-center flex-col gap-y-5">
              <div className="grid mt-10">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block border w-[400px] px-6 py-3 rounded focus:border-black outline-none transition border-slate-300"
                />
              </div>

              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block border w-[400px] px-6 py-3 rounded focus:border-black outline-none transition border-slate-300"
                />
              </div>

              <button
                className="border border-black bg-black text-white w-[400px] h-[60px] mt-20 hover:-translate-y-2 transition-all"
                onClick={handleClickSignUpButton}
              >
                로그인하기
              </button>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export default ModalPage;
