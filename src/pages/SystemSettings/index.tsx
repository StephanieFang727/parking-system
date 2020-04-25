import React, {useEffect, useState} from 'react';
import { Link, connect, Dispatch } from 'umi';
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

const ThresholdSettings = ({threshold, loading, dispatch}) => {
  const [form] = Form.useForm();
  const [formInfo, setFormValue] = useState({});
  const onFinish = values => {
    setFormValue({...threshold,...values});

  };
  useEffect(() => {
    if(!Object.keys(formInfo).length){
      return;
    }
    if (dispatch) {
      dispatch({
        type: 'user/updateThreshold',
        payload: formInfo,
      });
    }
  }, [formInfo]);
  if(loading || !Object.keys(threshold).length){
    return <Spin></Spin>
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={threshold}
      scrollToFirstError
    >
      <Form.Item
        name="threshold_light"
        label="光照阈值"
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          更新
        </Button>
      </Form.Item>
    </Form>
  );
};

export default  connect(({ user, loading }: ConnectState) => ({
  threshold: user.threshold,
  loading: loading.effects['user/fetchThreshold']
}))(ThresholdSettings);
