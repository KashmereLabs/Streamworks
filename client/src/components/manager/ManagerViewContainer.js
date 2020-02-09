import ManagerView from './ManagerView';
import { listInvoices, listInvoicesSuccess, listInvoicesFailure } from '../../actions/manager';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listInvoices: () => {
      dispatch(listInvoices()).then(function(response) {
        if (response.payload.status === 200) {
          dispatch(listInvoicesSuccess(response.payload.data));
        }
      }).catch(function(err) {
        dispatch(listInvoicesFailure(err));
      })
    },

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerView);
