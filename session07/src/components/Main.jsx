import { Input, Table, Button, Modal } from "antd";
import React, { useContext, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { UserContext } from "../provider/GlobalState";
import dayjs from "dayjs";

export default function Main() {
  const { users, handleConfirmBlock, handleConfirmDelete } =
    useContext(UserContext);
  console.log(users);

  // Modal xác nhận chặn
  const [isShowModal, setIsShowModal] = useState(false);

  // Modal xác nhận xóa
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  // userId đang được thao tác
  const [userId, setUserId] = useState(null);

  // Kiểm tra là đang xử lý xóa hay chặn
  const [isDelete, setIsDelete] = useState(false);

  //Hàm gọi ra thông báo chặn user
  const handleBlockUser = (id) => {
    setUserId(id);
    setIsDelete(false); // Đảm bảo là không phải xóa
    setIsShowModal(true); // Hiển thị Modal Chặn
  };

  // Hàm gọi ra thông báo xóa user
  const handleDeleteUser = (id) => {
    setUserId(id);
    setIsDelete(true); // Đảm bảo là đang xử lý xóa
    setIsShowDeleteModal(true); // Hiển thị Modal Xóa
  };

  //Hàm Block user
  const handleConfirmBlockUser = () => {
    handleConfirmBlock(userId);
    setIsShowModal(false);
    setUserId(null);
  };

  //Hàm xác nhận xóa
  const handleConfirmDeleteUser = () => {
    handleConfirmDelete(userId);
    setIsShowDeleteModal(false);
    setUserId(null);
  };

  // Hủy hành động trong Modal
  const handleCancel = () => {
    setIsShowModal(false);
    setIsShowDeleteModal(false);
    setUserId(null); // Xóa trạng thái ID
  };

  //Tìm kiếm user dựa theo id
  const findUserById = (id, users) => {
    return users.find((user) => user.id === id);
  };

  const dataSource = users.map((user) => {
    return {
      key: user.id,
      id: user.id,
      fullName: user.fullName,
      birthday: user.birthday,
      email: user.email,
      address: user.address,
      status: user.status,
    };
  });

  const columns = [
    { title: "STT", key: "id", render: (_, __, index) => index + 1 },
    { title: "Họ và tên", dataIndex: "fullName", key: "fullName" },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday) => {
        // Đảm bảo ngày sinh là một đối tượng ngày hợp lệ trước khi format
        return birthday
          ? dayjs(birthday).isValid()
            ? dayjs(birthday).format("DD/MM/YYYY")
            : ""
          : "";
      },
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <p className="flex items-center">
          <span
            className={`inline-block w-2 h-2 mr-2 rounded-full ${
              record.status ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {record.status ? "Đang hoạt động" : "Ngừng hoạt động"}
        </p>
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          {/* Nút "Chặn" với màu đỏ */}
          <Button
            key={`block-${record.id}`}
            className={
              record.status
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }
            onClick={() => handleBlockUser(record.id)}
          >
            {record.status ? "Chặn" : "Bỏ chặn"}
          </Button>

          {/* Nút "Sửa" với màu vàng (tùy chỉnh) */}
          <Button
            key={`edit-${record.id}`}
            className="bg-orange-300  text-white"
          >
            Sửa
          </Button>

          {/* Nút "Xóa" với đường viền xanh (tùy chỉnh) */}
          <Button
            key={`delete-${record.id}`}
            type="primary"
            danger
            onClick={() => handleDeleteUser(record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex gap-2 items-center justify-end px-4 pb-3">
        <Input className="w-[350px]" placeholder="Tìm kiếm theo email" />
        <TbRefresh className="size-5" />
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* Modal xác nhận */}
      <Modal
        title="Cảnh báo"
        open={isShowModal}
        onOk={handleConfirmBlockUser}
        onCancel={handleCancel}
        okText={
          userId
            ? findUserById(userId, users).status
              ? "Chặn"
              : "Bỏ chặn"
            : "Chặn"
        }
        cancelText="Hủy"
      >
        {userId
          ? findUserById(userId, users).status
            ? "Bạn có chắc chắn muốn chặn người dùng này không?"
            : "Bạn có chắc chắn muốn bỏ chặn người dùng này không?"
          : ""}
      </Modal>

      {/* Modal xác nhận Xóa */}
      <Modal
        title="Cảnh báo"
        open={isShowDeleteModal}
        onOk={handleConfirmDeleteUser}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
    </>
  );
}
