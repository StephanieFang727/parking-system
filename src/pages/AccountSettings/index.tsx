import React, {useEffect, useState} from 'react';
import { connect } from 'umi';
import {
  Form,
  Input,
  Button,
  Spin,
} from 'antd';
import {ConnectState} from "@/models/connect";


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

const AccountSettings = ({currentUser, loading, dispatch}) => {
  const [form] = Form.useForm();
  const [formInfo, setFormValue] = useState({});
  const onFinish = values => {
    setFormValue({...currentUser,...values});

  };
  useEffect(() => {
    if(!Object.keys(formInfo).length){
      return;
    }
    delete formInfo.book_status;
    delete formInfo.register_time;
    if (dispatch) {
      dispatch({
        type: 'user/updateUserInfo',
        payload: formInfo,
      });
    }
  }, [formInfo]);
  if(loading || !Object.keys(currentUser).length){
    return <Spin></Spin>
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        username: currentUser.username,
        carnumber: currentUser.carnumber,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="用户名"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="carnumber"
        label="车牌号"
      >
        <Input />
      </Form.Item>
      {/*"register_time": "2020-04-25 00:00:00",*/}
      {/*"book_status":*/}
      {/*<Form.Item*/}
      {/*  name="username"*/}
      {/*  label="用户名"*/}
      {/*>*/}
      {/*  <Input />*/}
      {/*</Form.Item>*/}
      {/*<Form.Item*/}
      {/*  name="carnumber"*/}
      {/*  label="车牌号"*/}
      {/*>*/}
      {/*  <Input />*/}
      {/*</Form.Item>*/}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          更新
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ user,loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.effects['user/fetchCurrent']
}))(AccountSettings);
