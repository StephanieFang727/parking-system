import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Switch, Button } from "antd";

import { TableListItem } from './data.d';
import { getParkInfo } from '../../services/user'
import {connect} from "umi";

const TableList = ({dispatch}) => {
  const actionRef = useRef<ActionType>();
  const onClick = (record) => {
    if (dispatch) {
      dispatch({
        type: 'user/updateBookStatus',
        parking_id: record.parking_id,
        book_action:1
      });
    }
    actionRef.current.reload();
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '车位ID',
      dataIndex: 'parking_id',
      width: '10%',
    },
    {
      title: '位置',
      dataIndex: 'location',
      width: '10%',
    },
    {
      title: '是否空闲',
      dataIndex: 'status',
      width: '10%',
      render: (item,record)=>
        item ? '否' : '是'
    },
    {
      title: '预约状态',
      dataIndex: 'isBooked',
      width: '10%',
      render: (item,record)=>
        item ? '已被预约' : '未被预约'
    },
    {
      title: '操作',
      width: '10%',
      render: (item,record)=>
        <Button
          disabled={record.isBooked}
          onClick={()=>onClick(record)}
        >预约
        </Button>
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="车位信息"
        search={false}
        actionRef={actionRef}
        request={()=>getParkInfo()}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default connect()(TableList);
