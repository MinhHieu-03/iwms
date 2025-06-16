import { ColumnsType } from "antd/es/table";
import { TypeRenderForm } from "@/lib/render-form";
import { Tag } from "antd";

export const lang_key = "user_management";
export const title = "User Management";

export interface UserDataType {
  _id?: string;
  name: string;
  password: string;
  email: string;
  role: string;
  status: string;
  department: string;
  ent_dt?: string;
  upd_dt?: string;
  [key: string]: unknown;
}

export const domain = {
  list: "auth/list",
  create: "auth",
  update: "auth",
  remove: "auth",
};

export const RenderCol: ({ t }) => ColumnsType<UserDataType> = ({ t }) => {
  return [
    {
      dataIndex: "name",
      title: t(`${lang_key}.name`),
      width: 150,
      fixed: "left",
    },
    {
      dataIndex: "email",
      title: t(`${lang_key}.email`),
      width: 200,
    },
    {
      dataIndex: "role",
      title: t(`${lang_key}.role`),
      width: 120,
      render: (role: string) => (
        <Tag color={
          role === 'admin' ? 'red' : 
          role === 'manager' ? 'orange' : 
          role === 'operator' ? 'blue' : 'default'
        }>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      dataIndex: "status",
      title: t(`${lang_key}.status`),
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      dataIndex: "department",
      title: t(`${lang_key}.department`),
      width: 150,
    },
    {
      dataIndex: "ent_dt",
      title: t(`${lang_key}.created_date`),
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];
};

export const renderCreateForm: ({ t }) => TypeRenderForm[] = ({ t }) => {
  return [
    {
      label: t(`${lang_key}.name`),
      name: "name",
      placeholder: t(`${lang_key}.name_placeholder`),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.name_required`),
        },
      ],
      autoFocus: true,
    },
    {
      label: t(`${lang_key}.email`),
      name: "email",
      placeholder: t(`${lang_key}.email_placeholder`),
      type: "email",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.email_required`),
        },
        {
          type: "email",
          message: t(`${lang_key}.email_invalid`),
        },
      ],
    },
    {
      label: t(`${lang_key}.password`),
      name: "password",
      type: "password",
      placeholder: t(`${lang_key}.password_placeholder`),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.password_required`),
        },
        {
          min: 6,
          message: t(`${lang_key}.password_min_length`),
        },
      ],
      hasFeedback: true,
    },
    {
      label: t(`${lang_key}.role`),
      name: "role",
      type: "select",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.role_required`),
        },
      ],
      items: [
        { value: "admin", label: t(`${lang_key}.role_admin`) },
        { value: "manager", label: t(`${lang_key}.role_manager`) },
        { value: "operator", label: t(`${lang_key}.role_operator`) },
        { value: "viewer", label: t(`${lang_key}.role_viewer`) },
      ],
    },
    {
      label: t(`${lang_key}.status`),
      name: "status",
      type: "select",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.status_required`),
        },
      ],
      items: [
        { value: "active", label: t(`${lang_key}.status_active`) },
        { value: "inactive", label: t(`${lang_key}.status_inactive`) },
      ],
    },
    {
      label: t(`${lang_key}.department`),
      name: "department",
      placeholder: t(`${lang_key}.department_placeholder`),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.department_required`),
        },
      ],
    },
  ];
};

export const renderEditForm: ({ t }) => TypeRenderForm[] = ({ t }) => {
  return [
    {
      label: t(`${lang_key}.name`),
      name: "name",
      placeholder: t(`${lang_key}.name_placeholder`),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.name_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.email`),
      name: "email",
      placeholder: t(`${lang_key}.email_placeholder`),
      type: "email",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.email_required`),
        },
        {
          type: "email",
          message: t(`${lang_key}.email_invalid`),
        },
      ],
    },
    {
      label: t(`${lang_key}.role`),
      name: "role",
      type: "select",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.role_required`),
        },
      ],
      items: [
        { value: "admin", label: t(`${lang_key}.role_admin`) },
        { value: "manager", label: t(`${lang_key}.role_manager`) },
        { value: "operator", label: t(`${lang_key}.role_operator`) },
        { value: "viewer", label: t(`${lang_key}.role_viewer`) },
      ],
    },
    {
      label: t(`${lang_key}.status`),
      name: "status",
      type: "select",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.status_required`),
        },
      ],
      items: [
        { value: "active", label: t(`${lang_key}.status_active`) },
        { value: "inactive", label: t(`${lang_key}.status_inactive`) },
      ],
    },
    {
      label: t(`${lang_key}.department`),
      name: "department",
      placeholder: t(`${lang_key}.department_placeholder`),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.department_required`),
        },
      ],
    },
  ];
};
