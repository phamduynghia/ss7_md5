import { Button } from "antd";
import React, { useState } from "react";
import FormAddUser from "./FormAddUser";

export default function Header() {
  const [isShowForm, setIsShowForm] = useState(false);

  const handleAddUser = () => {
    setIsShowForm(true);
  };

  const handleCancelForm = () => {
    setIsShowForm(false);
  };
  return (
    <>
      <div className="flex justify-between items-center px-4">
        <p className="text-[28px] font-semibold mb-3">Nhân viên</p>
        <Button onClick={handleAddUser} type="primary">
          Thêm nhân viên mới
        </Button>
        {/* Gọi ra Modal */}
        <FormAddUser open={isShowForm} onClose={handleCancelForm} />
      </div>
    </>
  );
}
