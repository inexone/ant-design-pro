import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from './Result';
import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';

const { Step } = Steps;

const desc1 = (
  <div className={styles.title}>
    <div style={{ margin: '8px 0 4px' }}>
      <FormattedMessage id="result-success.success.step1-operator" defaultMessage="Qu Lili" />
      <Icon style={{ marginLeft: 8, color: '#00A0E9' }} type="dingding-o" />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42, textAlign: 'left' }}>
    <div style={{ margin: '8px 0 4px' }}>
      <FormattedMessage id="result-success.success.step2-operator" defaultMessage="Zhou Maomao" />
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div>
      <a href="">
        <FormattedMessage id="result-success.success.step2-extra" defaultMessage="Urge" />
      </a>
    </div>
  </div>
);

const extra = (
  <Fragment>
    <div className={styles['head-title']}>
      <FormattedMessage id="result-success.success.operate-title" defaultMessage="Project Name" />
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span>
          <FormattedMessage id="result-success.success.operate-id" defaultMessage="Project ID：" />
        </span>
        23421
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span>
          <FormattedMessage id="result-success.success.principal" defaultMessage="Principal：" />
        </span>
        <FormattedMessage id="result-success.success.step1-operator" defaultMessage="Qu Lili" />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <span>
          <FormattedMessage
            id="result-success.success.operate-time"
            defaultMessage="Effective time："
          />
        </span>
        2016-12-12 ~ 2017-12-12
      </Col>
    </Row>
    <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              id="result-success.success.step1-title"
              defaultMessage="Create project"
            />
          </span>
        }
        description={desc1}
      />
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              id="result-success.success.step2-title"
              defaultMessage="Departmental preliminary review"
            />
          </span>
        }
        description={desc2}
      />
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              id="result-success.success.step3-title"
              defaultMessage="Financial review"
            />
          </span>
        }
      />
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage id="result-success.success.step4-title" defaultMessage="Finish" />
          </span>
        }
      />
    </Steps>
  </Fragment>
);

const actions = (
  <Fragment>
    <Button type="primary">
      <FormattedMessage id="result-success.success.btn-return" defaultMessage="Back to list" />
    </Button>
    <Button>
      <FormattedMessage id="result-success.success.btn-project" defaultMessage="View project" />
    </Button>
    <Button>
      <FormattedMessage id="result-success.success.btn-print" defaultMessage="Print" />
    </Button>
  </Fragment>
);

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        type="success"
        title={formatMessage({ id: 'result-success.success.title' })}
        description={formatMessage({ id: 'result-success.success.description' })}
        extra={extra}
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </GridContent>
);
