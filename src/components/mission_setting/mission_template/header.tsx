import type { UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import apiClient from "@/lib/axios";


const Header = ({
  setIsOpen,
  requestDataList,
  handleReload,
  selectedRowKeys = [],
  onDelete,
}) => {
  const { t } = useTranslation();
  const uploadProps: UploadProps = {
    name: "file",
    accept: ".xlsx,.xls", // Only allow Excel files
    fileList: [],
    beforeUpload: (file) => {
      const formData = new FormData();
      formData.append("file", file);
      apiClient
        .upload(`${upload}`, formData)
        .then(() => {
          requestDataList();
          message.success("File uploaded successfully!");
        })
        .catch((err) => {
          console.error("Upload error:", err);
          message.error("File upload failed.");
        });

      return false;
    },
  };

  const handleDownload = async () => {
    try {
      const response = await apiClient.get(`${download}`, {
        responseType: "blob", // Important for binary files÷ßß
      });

      // Create a Blob URL
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "sku.xlsx"); // Replace with your desired file name
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      message.success("File downloaded successfully!");
    } catch (error) {
      message.error("File download failed.");
      console.error("Download error:", error);
    }
  };
  return (
    <CardHeader>
      <div
        className="flex items-center justify-between"
        style={{ padding: "10px 0" }}
      >
        <CardTitle>{t(lang_key)}</CardTitle>
        <div className="flex items-center">
          <>
            <Button onClick={() => setIsOpen(true)} variant="default">
              <Plus className="mr-2 h-4 w-4" />
              {t("btn.create_new")}
            </Button>
            {selectedRowKeys.length > 0 && (
              <Button onClick={onDelete} variant="destructive" className="ml-2">
                <DeleteOutlined className="mr-2" />
                {t("btn.delete")} ({selectedRowKeys.length})
              </Button>
            )}
            {/* <Upload {...uploadProps}>
                <Button className="ml-2" variant="outline">
                  <UploadOutlined />
                  {t("btn.import")}
                </Button>
              </Upload> */}
            {/* <Button className="ml-2" onClick={handleDownload} variant="outline"> */}
            <Button className="ml-2" onClick={handleReload} variant="outline">
              <ReloadOutlined />
              {t("btn.reload")}
            </Button>
          </>
        </div>
      </div>
    </CardHeader>
  );
};