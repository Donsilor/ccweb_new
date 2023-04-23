import React, { Fragment } from 'react';
import { withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';

function OperationColumn(props) {
  const path = props.location.pathname;
  const match = matchPath(path, {
    path: '/:menuId/:subMenuId/:tab',
  });
  const { params: { menuId, tab } = {} } = match;
  return {
    title: '操作',
    align: 'center',
    fixed: 'right',
    render: (text, record) => (
      <Fragment>
        <Link
          to={{
            pathname: `/${menuId}/detail/authInfo/${record.id}`,
            search: `?tab=${tab}`,
          }}
        >
          审核
        </Link>
      </Fragment>
    ),
  };
}

export default withRouter(OperationColumn);
