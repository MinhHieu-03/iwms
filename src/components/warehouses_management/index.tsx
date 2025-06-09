import {
  DownloadOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Table, Upload } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2, Filter, Building2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

import BasePagination from "@/components/ui/antd-pagination";
import apiClient from "@/lib/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import ModalAdd from "./modal_create";
import ModalEdit from "./modal_update";
import { RenderCol, lang_key, title, domain } from "./const";
const { list, create, update, upload, download, remove } = domain;
interface DataType {
  _id?: string;
  sku: string;
  storage_model: string;
  action: string;
  production_name: string;
  carton_qty: number;
  box_qty: number;
  kit_qty: number;
  createdAt?: string;
}

const App = () => {
  const { i18n, t } = useTranslation();

  // const userResponse = useSelector(selectUser) as IUserResponse;
  // const dispatch = useDispatch<any>();
  // const userPermission = {};
  // const permission =
  //   get(userPermission, "permission['manage_account/list_account']") || "";
  // const { showMessage } = useMessage();

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formEdit, setFormEdit] = useState<{
    isOpen: boolean;
    data: DataType;
  }>({
    isOpen: false,
    data: {
      sku: "",
      storage_model: "",
      action: "",
      production_name: "",
      carton_qty: 0,
      box_qty: 0,
      kit_qty: 0
    },
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [dataRole, setDataRole] = useState<unknown[]>([]);

  const requestDataList = async () => {
    try {
      setLoading(true);
      const params = {
        limit: pageInfo.perPage,
        page: pageInfo.page,
      };
      console.log("params", params);
      const { data } = await apiClient.post(list, params);
      if (data) {
        setDataList(data.metaData);
        setTotal(data.total);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const _handleFinish = (values: {[key: string]: unknown}) => {
    const payload = {
      ...values,
    };

    apiClient
      .post(create, payload)
      .then((data) => {
        // showMessage('success', t('msg.add_acc'));
        setIsOpen(false);
        requestDataList();
      })
      .catch((err) => {
        // showMessage('error', err?.response?.data?.message || err.message);
      });
  };

  const _handleUpdateFinish = (values: {[key: string]: unknown}) => {
    const payload = {
      ...values,
    };

    apiClient
      .patch(`${update}/${formEdit?.data?._id}`, payload)
      .then((data) => {
        // showMessage('success', t('msg.edit_acc'));
        setFormEdit({
          isOpen: false,
          data: {},
        });
        requestDataList();
      })
      .catch((err) => {
        // showMessage('error', err?.response?.data?.message || err.message);
      });
  };

  const columns: ColumnsType<DataType> = useMemo(() => {
    const col =  RenderCol({t});
    console.log("col", col);
    return col || [];
  }, [pageInfo, i18n.language, t]);

  const itemsRender = (dataRole: unknown, dataList: unknown) => {
    return [
      {
        label: "SKU",
        name: "sku",
        rules: [
          {
            required: true,
            message: t("validate.blank_sku"),
          },
          () => ({
            validator(_: unknown, value: unknown) {
              const skuValid = dataList.find(
                (data: unknown) => data?.sku === value
              );
              if (value && skuValid) {
                return Promise.reject(new Error(t("validate.duplicate_sku")));
              }
              return Promise.resolve();
            },
          }),
        ],
        placeholder: `${t("common.input")} SKU`,
      },
      {
        label: t(`${lang_key}.production_name`),
        name: "production_name",
        rules: [
          {
            required: true,
            message: t("validate.blank_production_name"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.production_name`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.storage_model`),
        name: "storage_model",
        rules: [
          {
            required: true,
            message: t("validate.blank_storage_model"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.storage_model`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.carton_qty`),
        name: "carton_qty",
        type: "number",
        rules: [
          {
            required: true,
            message: t("validate.blank_carton_qty"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.carton_qty`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.box_qty`),
        name: "box_qty",
        type: "number",
        rules: [
          {
            required: true,
            message: t("validate.blank_box_qty"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.box_qty`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.kit_qty`),
        name: "kit_qty",
        type: "number",
        rules: [
          {
            required: true,
            message: t("validate.blank_kit_qty"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.kit_qty`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.action`),
        name: "action",
        rules: [
          {
            required: true,
            message: t("validate.blank_action"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.action`
        ).toLowerCase()}`,
      },
    ];
  };

  const itemsRenderEdit = (dataRole: unknown) => {
    return [
      {
        label: "SKU",
        name: "sku",
        rules: [
          {
            required: true,
            message: t("validate.blank_sku"),
          },
        ],
        placeholder: `${t("common.input")} SKU`,
      },
      {
        label: t(`${lang_key}.production_name`),
        name: "production_name",
        rules: [
          {
            required: true,
            message: t("validate.blank_production_name"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.production_name`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.storage_model`),
        name: "storage_model",
        rules: [
          {
            required: true,
            message: t("validate.blank_storage_model"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.storage_model`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.carton_qty`),
        name: "carton_qty",
        type: "number",
        rules: [
          {
            required: true,
            message: t("validate.blank_carton_qty"),
          },
          {
            type: "number",
            message: t("validate.number_carton_qty"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.carton_qty`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.box_qty`),
        name: "box_qty",
        type: "number",
        rules: [
          {
            required: true,
            message: t("validate.blank_box_qty"),
          },
          {
            type: "number",
            message: t("validate.number_box_qty"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.box_qty`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.kit_qty`),
        name: "kit_qty",
        type: "number",
        rules: [
          {
            required: true,
            message: t("validate.blank_kit_qty"),
          },
          {
            type: "number",
            message: t("validate.number_kit_qty"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.kit_qty`
        ).toLowerCase()}`,
      },
      {
        label: t(`${lang_key}.action`),
        name: "action",
        rules: [
          {
            required: true,
            message: t("validate.blank_action"),
          },
        ],
        placeholder: `${t("common.input")} ${t(
          `${lang_key}.action`
        ).toLowerCase()}`,
      },
    ];
  };

  useEffect(() => {
    // if (!permission.includes('r')) return;
    requestDataList();
  }, [pageInfo]);

  return (
    <Card>
      <Header setIsOpen={setIsOpen} requestDataList={requestDataList} />
      <CardContent>
        <Table
          size="middle"
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={dataList}
          pagination={false}
          scroll={{ x: 800, y: 800 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setFormEdit({
                  isOpen: true,
                  data: record,
                });
              },
            };
          }}
        />
        <BasePagination
          total={total}
          pageSize={pageInfo.perPage}
          currentPage={pageInfo.page}
          onChange={(page: number, perPage: number) =>
            setPageInfo({ page, perPage })
          }
        />
      </CardContent>
      <ModalAdd
        title={t("btn.add_acc")}
        itemsRender={itemsRender(dataRole, dataList)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        _handleFinish={_handleFinish}
      />
      <ModalEdit
        title={t("manager_acc.edit_acc")}
        itemsRender={itemsRenderEdit(dataRole)}
        formEdit={formEdit}
        setFormEdit={setFormEdit}
        _handleFinish={_handleUpdateFinish}
      />
    </Card>
  );
};

const Header = ({ setIsOpen, requestDataList }) => {
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
        <CardTitle>{t(`${lang_key}.${title}`)}</CardTitle>
        <div className="flex items-center">
          <>
            <Button variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Create New Warehouse
            </Button>
            <Upload {...uploadProps}>
              <Button className="ml-2" variant="outline">
                <UploadOutlined />
                {t("btn.import")}
              </Button>
            </Upload>
            <Button className="ml-2" onClick={handleDownload} variant="outline">
              <DownloadOutlined />
              {t("btn.download")}
            </Button>
          </>
        </div>
      </div>
    </CardHeader>
  );
};

export default App;
