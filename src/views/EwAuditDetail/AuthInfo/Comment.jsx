import React from 'react';
import { Modal, Button, Steps, Spin, Icon, Card, Row, Col } from 'antd';
import { formatTime } from 'common/utils';
import DetailWrapper from 'layouts/DetailWrapper';

export default function Comment(props) {
  const { data = {}, bank = {} } = props;
  const {
    firstTrialName,
    firstTrialRemark,
    managerTrialName,
    managerTrialRemark,
    bankerTrialName,
    bankerTrialRemark,
    lastTrialName,
    lastTrialRemark,
  } = data;
  if (firstTrialRemark) {
    return (
      <DetailWrapper>
        <Row gutter={16}>
          <Col span={6}>
            <Card
              title="初审备注"
              extra={
                <span>
                  <Icon type="user" />
                  {firstTrialName}
                </span>
              }
              size="small"
            >
              <p>{firstTrialRemark}</p>
            </Card>
          </Col>
          {bank.cmAuditFlag === 1 && managerTrialRemark && (
            <Col span={6}>
              <Card
                title="客户经理备注"
                extra={
                  <span>
                    <Icon type="user" />
                    {managerTrialName}
                  </span>
                }
                size="small"
              >
                <p>{managerTrialRemark}</p>
              </Card>
            </Col>
          )}
          {bank.bpAuditFlag === 1 && bankerTrialRemark && (
            <Col
              span={6}
              extra={
                <span>
                  <Icon type="user" />
                  {bankerTrialName}
                </span>
              }
            >
              <Card title="支行行长备注" size="small">
                <p>{bankerTrialRemark}</p>
              </Card>
            </Col>
          )}
          {lastTrialRemark && (
            <Col
              span={6}
              extra={
                <span>
                  <Icon type="user" />
                  {lastTrialName}
                </span>
              }
            >
              <Card title="复审备注" size="small">
                <p>{lastTrialRemark}</p>
              </Card>
            </Col>
          )}
        </Row>
      </DetailWrapper>
    );
  }
  return null;
}
