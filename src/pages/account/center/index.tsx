import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import Link from 'umi/link';
import { GridContent } from '@ant-design/pro-layout';
import { RouteChildrenProps } from 'react-router';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Input } from 'antd';
import styles from './Center.less';
import { ITag, CurrentUser } from './data';
import { ModalState } from './model';
import Articles from './components/Articles';
import Applications from './components/Applications';
import Projects from './components/Projects';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

interface accountCenterProps extends RouteChildrenProps {
  dispatch: Dispatch<any>;
  currentUser: CurrentUser;
  currentUserLoading: boolean;
}
interface accountCenterState {
  newTags: ITag[];
  tabKey: 'articles' | 'applications' | 'projects';
  inputVisible: boolean;
  inputValue: string;
}

@connect(
  ({ loading, accountCenter }: { loading: { effects: any }; accountCenter: ModalState }) => ({
    currentUser: accountCenter.currentUser,
    currentUserLoading: loading.effects['accountCenter/fetchCurrent'],
  }),
)
class Center extends PureComponent<accountCenterProps, accountCenterState> {
  // static getDerivedStateFromProps(
  //   props: accountCenterProps,
  //   state: accountCenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;

  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }

  //   return null;
  // }

  state: accountCenterState = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'articles',
  };

  input: Input | null | undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountCenter/fetchCurrent',
    });
    dispatch({
      type: 'accountCenter/fetch',
    });
  }

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as accountCenterState['tabKey'],
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input && this.input.focus());
  };

  saveInputRef = (input: Input | null) => {
    this.input = input;
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };
  renderChildrenByTabKey = (tabKey: accountCenterState['tabKey']) => {
    if (tabKey === 'projects') {
      return <Projects />;
    }
    if (tabKey === 'applications') {
      return <Applications />;
    }
    if (tabKey === 'articles') {
      return <Articles />;
    }
    return null;
  };
  render() {
    const { newTags, inputVisible, inputValue, tabKey } = this.state;
    const { currentUser, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
              {!dataLoading ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {currentUser.title}
                    </p>
                    <p>
                      <i className={styles.group} />
                      {currentUser.group}
                    </p>
                    <p>
                      <i className={styles.address} />
                      {currentUser.geographic.province.label}
                      {currentUser.geographic.city.label}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>标签</div>
                    {currentUser.tags.concat(newTags).map(item => {
                      return <Tag key={item.key}>{item.label}</Tag>;
                    })}
                    {inputVisible && (
                      <Input
                        ref={ref => this.saveInputRef(ref)}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map(item => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              ) : null}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
