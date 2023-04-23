/*
 * @Author Osborn
 * @File index.tsx
 * @Created Date 2018-06-29 16-41
 * @Last Modified: 2018-06-29 16-41
 * @Modified By: Osborn
 */

import { Card, Col, Icon, Row } from 'antd';
import * as React from 'react';

export default (props: any) => {
  return (
    <Row>
      <Col span={6} />
      <Col span={6}>
        <Card style={{ margin: '20px auto' }}>
          <Icon type="link" />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ margin: '20px auto' }}>
          <Icon type="link" />
        </Card>
      </Col>
      <Col span={6} />
    </Row>
  );
};
