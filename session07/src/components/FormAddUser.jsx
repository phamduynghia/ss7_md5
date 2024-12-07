import { Button, DatePicker, Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import { UserContext } from "../provider/GlobalState";

export default function FormAddUser({ open, onClose }) {
  const { handleConfirmAdd } = useContext(UserContext);

  // Tạo form instance
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const newUser = {
      fullName: values.fullName,
      birthday: values.birthday,
      email: values.email,
      address: values.address,
      status: true,
    };

    handleConfirmAdd(newUser);
    // Reset các trường trong form sau khi thêm thành công
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={<p className="text-[24px] font-semibold">Thêm nhân viên mới</p>}
      open={open} // Điều khiển hiển thị modal
      onCancel={onClose} // Đóng modal khi nhấn nút "X" hoặc bên ngoài
      footer={null} // Loại bỏ footer mặc định của Ant Design
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Họ và tên */}

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        {/* Ngày sinh */}

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[
            { required: true, message: "Vui lòng chọn ngày sinh!" },
            () => ({
              validator(_, value) {
                if (value && value.isAfter(new Date())) {
                  return Promise.reject(
                    "Ngày sinh không được lớn hơn ngày hiện tại!"
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <DatePicker placeholder="Chọn ngày sinh" style={{ width: "100%" }} />
          {/* Sử dụng DatePicker */}
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        {/* Địa chỉ */}
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input.TextArea placeholder="Nhập địa chỉ" />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Hủy</Button> {/* Đóng modal */}
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>{" "}
          {/* Xử lý thêm nhân viên */}
        </div>
      </Form>
    </Modal>
  );
}
