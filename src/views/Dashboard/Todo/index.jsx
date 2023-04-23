/*
 * @Author Osborn
 * @File index.tsx
 * @Created Date 2018-06-29 17-00
 * @Last Modified: 2018-06-29 17-00
 * @Modified By: Osborn
 */

import { Card, Col, Icon, Row } from 'antd';
import * as React from 'react';
import './style.less';

export default (props: any) => {
  const list = [
    { name: '币质押订单', value: '12笔' },
    { name: '待放款订单', value: '12笔' },
    { name: '待审核订单', value: '12笔' },
    { name: '待补仓订单', value: '4笔' },
    { name: '待平仓订单', value: '2笔' },
    { name: '待放款订单', value: '8笔' },
    { name: '确认还款订单', value: '2笔' },
  ];
  return (
    <Card style={{ margin: '20px 0' }} title="待办事项" className="todo">
      <Row gutter={16}>
        {list.map((l, i) => (
          <Col key={i} span={6}>
            <Card className="todoItem">
              <div className="left">
                <Icon type="calendar" />
              </div>
              <div className="right">
                <span>{l.name}</span>
                <br />
                <span style={{ fontSize: '18px' }}>{l.value}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
