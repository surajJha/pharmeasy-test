import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import partial from 'lodash/partial';

import { Row, Col, Table, Button, Modal, FormGroup, Form, FormControl, ControlLabel } from 'react-bootstrap';

import actions from '../actions';
import { getQueryParamFromSearch } from "../utils/urlHelper";
import { getCookie } from "../utils/cookieStorage";

class SuperUser extends Component {
  state = {
    openModal: false,
    openCreateModal: false,
    medicines: {},
    requestingId: '',
    approvingId: '',
    approvingType: '',
    saveError: '',
    saveMedicines: [{
      name: '',
      dosage: '',
      qty: ''
    }, {
      name: '',
      dosage: '',
      qty: ''
    }]
  };

  componentWillMount () {
    const cookieValue = getCookie("username");
    if (cookieValue === '') {
      this.props.history.push(`/login`);
    }

    const type = getQueryParamFromSearch("type");
    if (['patient', 'doctor', 'pharmacist'].indexOf(type) !== -1) {
      this.props.actions.fetchPrescriptions();
    }
  };

  componentWillReceiveProps(nextProps) {
    if ((
      this.props.isRequesting !== nextProps.isRequesting &&
      !nextProps.isRequesting &&
      !nextProps.isRequestingError
    ) || (
      this.props.isApproving !== nextProps.isApproving &&
      !nextProps.isApproving &&
      !nextProps.isApprovingError
    ) || (
      this.props.isSaving !== nextProps.isSaving &&
      !nextProps.isSaving &&
      !nextProps.isSavingError
    )) {
      this.closeCreateModal();
      this.props.actions.fetchPrescriptions();
    }
  }

  onStateUpdate = (index, type, e) => {
    let medicines = [...this.state.saveMedicines];
    medicines[index][type] = e.target.value;
    this.setState({
      saveMedicines: medicines
    });
  };

  openCreateModal = () => {
    this.setState({
      openCreateModal: true
    });
  };

  closeCreateModal = () => {
    this.setState({
      openCreateModal: false
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false,
      medicines: {}
    });
  };

  openModal = (medicines) => {
    this.setState({
      openModal: true,
      medicines
    });
  };

  createPrescription = () => {
    let saveError = '';
    const medicines = [...this.state.saveMedicines];
    for (let index = 0; index < medicines.length; index++) {
      if (medicines[index].name.trim() === '' ||
        medicines[index].dosage.trim() === '' ||
        medicines[index].qty.trim() === '') {
        saveError = 'Some field(s) are empty';
        this.setState({
          saveError
        });
        break;
      }
    }
    if (saveError === '') {
      const body = {
        'isApprovedForDoctor': 'no',
        'isApprovedForPharmacist': 'no',
        'period': 'June 2018 - June 2018',
        medicines
      };
      this.props.actions.createPrescription(body);
    }
  };

  requestPrescription = (id, requestor) => {
    if (this.props.isRequesting) return;
    this.setState({
      requestingId: id
    });

    this.props.actions.requestPrescription({
      id,
      isApproved: 'pending',
      requestor
    });
  };

  approvePrescription = (id, approveFor, approvingType) => {
    if (this.props.isApproving) return;
    this.setState({
      approvingId: id,
      approvingType
    });
    this.props.actions.approvePrescription({
      id,
      [approveFor]: 'yes'
    });
  };

  renderLoading = () => {
    return (
      <div className="radialLoader radialLoader--red radialLoader--medium" />
    )
  };

  renderError = () => {
    return (
      <Col sm={6} smOffset={3} className="error">
        {this.props.error}
      </Col>
    )
  };

  renderModal = () => {
    return (
      <Modal show={true} onHide={this.closeModal}>
        <Modal.Body>
          <Table responsive>
            <thead>
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.medicines.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine.get('name')}</td>
                  <td>{medicine.get('dosage')}</td>
                  <td>{medicine.get('qty')}</td>
                </tr>
              ))
            }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  renderCreateModal = () => {
    return (
      <Modal show={true} bsSize="large" onHide={this.closeCreateModal}>
        <Modal.Body>
          <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Name</ControlLabel>{'    '}
              <FormControl type="text" placeholder="Combiflam"
                           value={this.state.saveMedicines[0].name}
                           onChange={partial(this.onStateUpdate, 0, 'name')} />
            </FormGroup>{'    '}
            <FormGroup controlId="formInlineDosage">
              <ControlLabel>Dosage</ControlLabel>{'    '}
              <FormControl type="text" placeholder="twice a day"
                           value={this.state.saveMedicines[0].dosage}
                           onChange={partial(this.onStateUpdate, 0, 'dosage')} />
            </FormGroup>{'    '}
            <FormGroup controlId="formInlineQty">
              <ControlLabel>Quantity</ControlLabel>{'    '}
              <FormControl type="number" placeholder="1"
                           value={this.state.saveMedicines[0].qty}
                           onChange={partial(this.onStateUpdate, 0, 'qty')} />
            </FormGroup>
          </Form>
          <Form inline className="mt">
            <FormGroup controlId="formInlineName">
              <ControlLabel>Name</ControlLabel>{'    '}
              <FormControl type="text" placeholder="Combiflam"
                           value={this.state.saveMedicines[1].name}
                           onChange={partial(this.onStateUpdate, 1, 'name')} />
            </FormGroup>{'    '}
            <FormGroup controlId="formInlineDosage">
              <ControlLabel>Dosage</ControlLabel>{'    '}
              <FormControl type="text" placeholder="twice a day"
                           value={this.state.saveMedicines[1].dosage}
                           onChange={partial(this.onStateUpdate, 1, 'dosage')} />
            </FormGroup>{'    '}
            <FormGroup controlId="formInlineQty">
              <ControlLabel>Quantity</ControlLabel>{'    '}
              <FormControl type="number" placeholder="1"
                           value={this.state.saveMedicines[1].qty}
                           onChange={partial(this.onStateUpdate, 1, 'qty')} />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Row className="pr">
            <Button onClick={this.createPrescription} bsStyle="primary">
              {this.props.isSaving ? <div className="radialLoader"/> : 'Save'}
            </Button>
            <Button onClick={this.closeCreateModal}>Close</Button>
          </Row>
          {
            this.state.saveError || true ?
              <Row className="pt pr">
                <div className="text-danger">{this.state.saveError}</div>
              </Row> : null
          }
          {
            this.props.isSavingError ?
              <Row className="pt pr">
                <div className="text-danger">{this.props.saveError}</div>
              </Row> : null
          }
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    const type = getQueryParamFromSearch("type");
    if (['patient', 'doctor', 'pharmacist'].indexOf(type) === -1) {
      return (
        <Col sm={6} smOffset={3} className="error">
          <span>Unsupported User type</span>
        </Col>
      )
    }
    if (this.props.isFetching) {
      return this.renderLoading();
    } else if (!this.props.isFetching &&
      this.props.isFetchingError) {
      return this.renderError();
    }
    if (type === 'patient') {
      return (
        <Row>
          <Row>
            <Col sm={6} smOffset={3}>
              {this.state.openCreateModal ? this.renderCreateModal() : null}
              <span className="text-primary pointer create" onClick={this.openCreateModal}>Create New +</span>
            </Col>
          </Row>
          <Col sm={6} smOffset={3}>
            <h3>Prescriptions</h3>
            <Table responsive>
              <thead>
              <tr>
                <th>#</th>
                <th>Period</th>
                <th>Pharmacist Status</th>
                <th>Doctor Status</th>
              </tr>
              </thead>
              <tbody>
              {this.state.openModal ? this.renderModal() : null}
              {
                this.props.prescriptions.map((prescription, index) => {
                  return (
                    <tr key={index}>
                      <td>{prescription.get('id')}</td>
                      <td className="pointer text-info" onClick={partial(this.openModal, prescription.get('medicines'))}>{prescription.get('period')}</td>
                      <td>
                        {(() => {
                          if (prescription.get('isApprovedForPharmacist') === 'yes') {
                            return <span className="text-success">Approved</span>;
                          } else if (prescription.get('isApprovedForPharmacist') === 'no') {
                            return <span className="text-danger">Not Approved</span>;
                          } else {
                            return (
                              <Button bsStyle="info" onClick={partial(this.approvePrescription, prescription.get('id'), 'approveForPharmacist', 'pharmacist')}>
                                {(this.props.isApproving && prescription.get('id') === this.state.approvingId && this.state.approvingType === 'pharmacist') ? <div className="radialLoader" /> : 'Pending'}
                              </Button>
                            );
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (prescription.get('isApprovedForDoctor') === 'yes') {
                            return <span className="text-success">Approved</span>;
                          } else if (prescription.get('isApprovedForDoctor') === 'no') {
                            return <span className="text-danger">Not Approved</span>;
                          } else {
                            return (
                              <Button bsStyle="info" onClick={partial(this.approvePrescription, prescription.get('id'), 'approveForDoctor', 'doctor')}>
                                {(this.props.isApproving && prescription.get('id') === this.state.approvingId && this.state.approvingType === 'doctor') ? <div className="radialLoader" /> : 'Pending'}
                              </Button>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
          </Col>
        </Row>
      )
    }
    return (
      <Row>
        <Col sm={6} smOffset={3}>
          <h3>Prescriptions</h3>
          <Table responsive>
            <thead>
            <tr>
              <th>id</th>
              <th>Period</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {this.state.openModal ? this.renderModal() : null}
            {
              this.props.prescriptions.map((prescription, index) => {
                return (
                  <tr key={index}>
                    <td>{prescription.get('id')}</td>
                    <td>{prescription.get('period')}</td>
                    <td>
                      {(() => {
                        if (type === 'doctor') {
                          if (prescription.get('isApprovedForDoctor') === 'yes') {
                            return (
                              <Button bsStyle="info" onClick={partial(this.openModal, prescription.get('medicines'))}>
                                View
                              </Button>
                            );
                          } else if (prescription.get('isApprovedForDoctor') === 'pending') {
                            return 'Requested'
                          }
                          return (
                            <Button bsStyle="success" onClick={partial(this.requestPrescription, prescription.get('id'), type)}>
                              {
                                (this.props.isRequesting && prescription.get('id') === this.state.requestingId) ? <div className="radialLoader" /> : 'Request'
                              }
                            </Button>
                          )
                        } else if (type === 'pharmacist') {
                          if (prescription.get('isApprovedForPharmacist') === 'yes') {
                            return (
                              <Button bsStyle="info" onClick={partial(this.openModal, prescription.get('medicines'))}>
                                View
                              </Button>
                            );
                          } else if (prescription.get('isApprovedForPharmacist') === 'pending') {
                            return 'Requested'
                          }
                          return (
                            <Button bsStyle="success" onClick={partial(this.requestPrescription, prescription.get('id'), type)}>
                              {
                                (this.props.isRequesting && prescription.get('id') === this.state.requestingId) ? <div className="radialLoader" /> : 'Request'
                              }
                            </Button>
                          )
                        }
                      })()}
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.Prescriptions.get('isFetching'),
    isFetchingError: state.Prescriptions.get('isFetchingError'),
    isRequesting: state.Prescriptions.get('isRequesting'),
    isRequestingError: state.Prescriptions.get('isRequestingError'),
    isApproving: state.Prescriptions.get('isApproving'),
    isApprovingError: state.Prescriptions.get('isApprovingError'),
    isSaving: state.Prescriptions.get('isSaving'),
    isSavingError: state.Prescriptions.get('isSavingError'),
    prescriptions: state.Prescriptions.get('prescriptions'),
    error: state.Prescriptions.get('error'),
    saveError: state.Prescriptions.get('saveError')
  };
};

const mapDispatchToProps = (dispatch) => ({
  'actions': bindActionCreators(actions, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SuperUser));
