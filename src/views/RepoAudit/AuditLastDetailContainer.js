import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuditDetailView from './AuditDetailView';
import { repoDetailFetch as fetch, auditLastRepo } from 'redux/modules/repoAudit';

const mapStateToProps = state => ({
  store: state.repoAudit.repoDetail,
  loading: state.repoAudit.loading,
  auditProcess: 'last',
});

const mapDispatchToProps = dispatch => {
  return {
    fetch: data => dispatch(fetch(data)),
    auditRepo: data => dispatch(auditLastRepo(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditDetailView);
