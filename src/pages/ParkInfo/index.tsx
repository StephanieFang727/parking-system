import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Switch, Button } from "antd";

import { TableListItem } from './data.d';
import { getParkInfo } from '../../services/user'
import {connect} from "umi";
import {ConnectState} from "@/models/connect";

const TableList = ({dispatch, user:{currentUser}}) => {
  const actionRef = useRef<ActionType>();
  const onClick = (record) => {
    if (dispatch) {
      dispatch({
        type: 'user/bookParking',
        payload: {
          parking_id: record.parking_id,
          user_id:localStorage.getItem('userid')
        }
      });
    }
    location.reload();
  }

  const oncancelClick = (record) => {
    if (dispatch) {
      dispatch({
        type: 'user/cancelBooking',
        payload: {
          parking_id: record.parking_id,
          user_id:localStorage.getItem('userid')
        }
      });
    }
    location.reload();
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

  ];

  const flag = currentUser.userid !== 2;
  if (flag) {
    columns.push(
      {
        title: '操作',
        width: '10%',
        render: (item,record)=>
          currentUser.parking_id === record.parking_id ?
            (
              <Button
            style={{marginRight: 4}}
            onClick={() => oncancelClick(record)}
          >取消预约
          </Button>
            ):(
              <Button
                style={{marginRight: 4}}
                onClick={() => onClick(record)}
              >预约
              </Button>
            )
      },
    )
  }
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

export default connect(({ user }: ConnectState) => ({
 user,
}))(TableList);;
