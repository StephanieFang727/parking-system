import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { history, ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        person_name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <span className={`${styles.action} ${styles.account}`}>
          <span className={styles.name}>{currentUser.person_name}</span>
          <HeaderDropdown overlay={menuHeaderDropdown}>
            <LogoutOutlined />
          </HeaderDropdown>
        </span>
      </div>
    );
    // : (
    //     <span className={`${styles.action} ${styles.account}`}>
    //       <Spin
    //         size="small"
    //         style={{
    //           marginLeft: 8,
    //           marginRight: 8,
    //         }}
    //       />
    //     </span>
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
