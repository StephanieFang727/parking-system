import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {getUserParkInfo, updatePay} from '../../services/user'
import {connect} from "umi";
import {ConnectState} from "@/models/connect";


/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updatePay({user_id: fields.user_id, ispay: fields.isPay, record_id:fields.record_id});
    hide();

    message.success('缴费成功');
    return true;
  } catch (error) {
    hide();
    message.error('缴费失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = ({user:{currentUser}}) => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const userId = localStorage.getItem('userid');
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'record_id',
      width: '5%',
    },
    {
      title: '用户ID',
      dataIndex: 'user_id',
      width: '8%',
    },
    {
      title: '停车位置',
      dataIndex: 'location',
     // valueType: 'textarea',
      width: '20%',
    },
    {
      title: '开始时间',
      dataIndex: 'starttime',
      valueType: 'dateTime',
      hideInForm: true,
      width: '20%',
    },
    {
      title: '结束时间',
      dataIndex: 'endtime',
      width: '20%',
    },
    {
      title: '应付（元）',
      dataIndex: 'money',
      width: '10%',
    },
    {
      title: '付款状态',
      dataIndex: 'isPay',
      hideInForm: true,
      width: '10%',
      render:(item)=>
        item ? '已付款' : '未付款'
    },
  ];

  const flag = currentUser.userid !== 2;
  if (flag) {
    columns.push(
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            <a
              disabled={record.isPay}
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
            >
              缴费
            </a>
          </>
        ),
      },
    )
  }
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="停车信息"
        search={false}
        actionRef={actionRef}
        rowKey="bulletin_id"
        request={()=>getUserParkInfo(userId)}
        columns={columns}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate({...stepFormValues,...value});
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(TableList);
