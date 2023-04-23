import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuditDetailView from './AuditDetailView';
import { repoDetailFetch as fetch, auditFirstRepo } from 'redux/modules/repoAudit';

const mapStateToProps = state => ({
  store: state.repoAudit.repoDetail,
  loading: state.repoAudit.loading,
  auditProcess: 'first',
});

const mapDispatchToProps = dispatch => {
  return {
    fetch: data => dispatch(fetch(data)),
    auditRepo: data => dispatch(auditFirstRepo(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditDetailView);
