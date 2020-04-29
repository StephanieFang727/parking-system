import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Switch, Button } from "antd";

import { TableListItem } from './data.d';
import { getUserInfo } from '../../services/user'
import {connect} from "umi";

const TableList = ({dispatch}) => {
  const actionRef = useRef<ActionType>();
  const onClick = (record) => {
    if (dispatch) {
      dispatch({
        type: 'user/deleteUser',
        payload: {
          userid: record.userid,
        }
      });
    }
    actionRef.current.reload();
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户ID',
      dataIndex: 'userid',
      width: '10%',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: '10%',
    },
    {
      title: '车牌号',
      dataIndex: 'carnumber',
      width: '10%',
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
      width: '10%',
    },
    {
      title: '操作',
      width: '10%',
      render: (item,record)=>
        <Button
          style={{marginRight:4}}
          onClick={()=>onClick(record)}
        >删除
        </Button>
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="用户信息"
        search={false}
        actionRef={actionRef}
        request={()=>getUserInfo()}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default connect()(TableList);
