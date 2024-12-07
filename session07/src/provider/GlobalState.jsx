import React, { useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";

//B1: Tạo ngữ cảnh
export const UserContext = React.createContext();
export default function GlobalState() {
  //Tạo state để lưu users lên local
  const [users, setUsers] = useState(() => {
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];
    // Gán id tự động nếu chưa có
    return userLocal.map((user, index) => ({ id: index + 1, ...user }));
  });

  //Thêm mới user

  const handleConfirmAdd = (newUser) => {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const updateUsers = [...users, { ...newUser, id: newId }];
    setUsers(updateUsers);

    localStorage.setItem("users", JSON.stringify(updateUsers));
  };

  //Hành động chặn user

  const handleConfirmBlock = (id) => {
    const updateUsers = users.map((user) => {
      return user.id === id ? { ...user, status: !user.status } : user;
    });

    setUsers(updateUsers);
    localStorage.setItem("users", JSON.stringify(updateUsers));
  };

  //Hàm xóa user
  const handleConfirmDelete = (id) => {
    const updateUsers = users.filter((user) => user.id !== id);
    setUsers(updateUsers);
    localStorage.setItem("users", JSON.stringify(updateUsers));
  };

  return (
    <div>
      <UserContext.Provider
        value={{
          users,
          handleConfirmAdd,
          handleConfirmBlock,
          handleConfirmDelete,
        }}
      >
        <Header />
        <Main />
      </UserContext.Provider>
    </div>
  );
}
