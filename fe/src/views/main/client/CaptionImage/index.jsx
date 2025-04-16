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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    try {
      const data = { description: caption };
      await Api.Put(SAVE_CAPTION_IMAGE(idImage), data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving caption:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="h-screen !p-4 lg:p-6">
      <Form
        onFinish={handleSubmit}
        className="bg-white shadow-md rounded-lg !p-4 lg:p-6 flex flex-col gap-6"
      >
        {/* Top Section: Uploads + Button + Caption */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left: Upload + Remove */}
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {/* Upload & Remove Buttons */}
            <div className="flex gap-2 flex-wrap responsive-buttons1">
              <Upload
                beforeUpload={() => false}
                onChange={handleUpload}
                showUploadList={false}
                disabled={isLoading}
              >
                <Button
                  type="button"
                  className="bg-green-600 text-white !px-4 !py-2 rounded-md flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  <PictureOutlined />
                  Choose Image
                </Button>
              </Upload>

              <Button
                type="button"
                className="bg-red-500 text-white !px-4 !py-2 rounded-md flex items-center gap-2 hover:bg-red-600 disabled:opacity-50"
                disabled={!file || isLoading}
                onClick={handleRemove}
              >
                <DeleteOutlined />
                Remove
              </Button>
            </div>

            {/* Image Preview */}
            <div className="bg-gray-100 text-center rounded-md min-h-[120px] flex items-center justify-center p-2">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Uploaded"
                  className="max-w-full max-h-[250px] rounded-md"
                />
              ) : (
                "No image uploaded (chỉ hỗ trợ .jpeg, .png)"
              )}
            </div>
          </div>

          {/* Middle: Submit Button */}
          <div className="w-full lg:w-1/6 flex items-center">
            <Button
              htmlType="submit"
              className="bg-purple-500 w-full text-white !px-4 !py-2 rounded-md flex items-center justify-center gap-2 hover:bg-purple-600 disabled:opacity-50"
              disabled={!file || isLoading}
            >
              {isLoading ? <Spin indicator={antIcon} /> : <VscGithubAction />}
              {isLoading ? "Đang xử lý..." : "Thực hiện caption"}
            </Button>
          </div>

          {/* Right: Caption Input */}
          <div className="w-full lg:w-1/2 bg-gray-100 !p-4 text-center rounded-md min-h-[80px] flex items-center">
            <Input
              disabled={!isEditing}
              className="h-full text-center !text-[#4c4848]"
              value={caption}
              placeholder="Captions will appear here..."
              onChange={handleEditCaption}
            />
          </div>
        </div>

        {/* Bottom: Edit/Save/Cancel */}
        <Form.Item className="!mb-0">
          <div className="flex flex-wrap gap-2 justify-end responsive-buttons2">
            <Button
              type="button"
              className="bg-yellow-500 text-white !px-4 !py-2 rounded-md flex items-center gap-2 hover:bg-yellow-600 disabled:opacity-50"
              disabled={!file || !caption || isLoading}
              onClick={handleEdit}
            >
              ✏️ Edit
            </Button>
            <Button
              type="button"
              className="bg-blue-500 text-white !px-4 !py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
              disabled={!isEditing || isLoading}
              onClick={handleSave}
            >
              {isLoading && isEditing ? (
                <Spin indicator={antIcon} size="small" />
              ) : (
                "💾"
              )}
              Save
            </Button>
            <Button
              type="button"
              className="bg-gray-500 text-white !px-4 !py-2 rounded-md flex items-center gap-2 hover:bg-gray-600 disabled:opacity-50"
              disabled={!isEditing || isLoading}
              onClick={handleCancel}
            >
              ❌ Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CaptionImage;
