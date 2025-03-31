import "../../../../styles/user/home/style.scss";
import { useState } from "react";
import { Form, Upload, Button, Image, Input, Spin } from "antd";
import {
  DeleteOutlined,
  PictureOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { VscGithubAction } from "react-icons/vsc";

import { UPLOAD_IMAGE, SAVE_CAPTION_IMAGE } from "../../../../api/constants";
import useApi from "../../../../hooks/useApi";

const CaptionImage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [preEditedCaption, setPreEditedCaption] = useState();
  const [idImage, setIdImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const Api = useApi();

  const handleUpload = (info) => {
    const uploadedFile = info.file;
    setFile(uploadedFile);
    setPreviewUrl(URL.createObjectURL(uploadedFile));
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setCaption("");
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please choose an image first!");
      return;
    }

    setIsLoading(true); // Set loading state to true before API call

    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await Api.Post(UPLOAD_IMAGE, formData);
      setPreEditedCaption(response.description);
      setCaption(response.description);
      setIdImage(response.id);
      setIsEditing(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      // You could add error handling here, like showing an error message
    } finally {
      setIsLoading(false); // Set loading state to false after API call completes
    }
  };

  const handleEditCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setCaption(preEditedCaption);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsLoading(true); // Set loading state for save operation

    try {
      const data = { description: caption };
      await Api.Put(SAVE_CAPTION_IMAGE(idImage), data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving caption:", error);
      // You could add error handling here
    } finally {
      setIsLoading(false);
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Form
        onFinish={handleSubmit}
        className="bg-white !ml-[30px] !mr-[30px] home-page h-[50%] !mt-[24px] shadow-md rounded-lg !p-6 flex flex-col justify-between"
      >
        {/* Preview Section */}
        <div className="flex flex-5 gap-4">
          <div className="flex-3 flex items-center justify-center bg-gray-100 p-4 text-center rounded-md min-h-[80px]">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Uploaded"
                className="max-w-full max-h-[250px] rounded-md mx-auto"
              />
            ) : (
              "No image uploaded (chỉ hỗ trợ .jpeg, .png)"
            )}
          </div>
          <div className="flex-1 flex items-center">
            <Button
              htmlType="submit"
              className="bg-purple-500 w-full text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-purple-600 disabled:opacity-50"
              disabled={!file || isLoading}
            >
              {isLoading ? <Spin indicator={antIcon} /> : <VscGithubAction />}
              {isLoading ? "Đang xử lý..." : "Thực hiện caption"}
            </Button>
          </div>
          <div className="flex-3  bg-gray-100 p-4 text-center rounded-md min-h-[80px]">
            <Input
              disabled={!isEditing}
              className="h-full text-center !text-[#4c4848]"
              value={caption}
              placeholder="Captions will appear here..."
              onChange={handleEditCaption}
            />
          </div>
        </div>

        {/* Buttons Section */}
        <Form.Item className="flex flex-1 !mb-0">
          <div className="flex justify-between gap-3">
            <div className="flex items-end">
              <Form.Item className="!w-full !mb-0">
                <Upload
                  beforeUpload={() => false}
                  onChange={handleUpload}
                  showUploadList={false}
                  disabled={isLoading}
                >
                  <Button
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <PictureOutlined />
                    Choose Image
                  </Button>
                </Upload>
              </Form.Item>
              <Button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 disabled:opacity-50"
                disabled={!file || isLoading}
                onClick={handleRemove}
              >
                <DeleteOutlined />
                Remove
              </Button>
            </div>
            <div className="flex">
              <Button
                type="button"
                className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-600 disabled:opacity-50"
                disabled={!file || !caption || isLoading}
                onClick={handleEdit}
              >
                ✏️ Edit
              </Button>
              <Button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
                disabled={!isEditing || isLoading}
                onClick={handleSave}
              >
                {isLoading && isEditing ? (
                  <Spin indicator={antIcon} size="small" />
                ) : (
                  "💾"
                )}{" "}
                Save
              </Button>
              <Button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-600 disabled:opacity-50"
                disabled={!isEditing || isLoading}
                onClick={handleCancel}
              >
                ❌ Cancel
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default CaptionImage;
