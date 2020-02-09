import UserView from './UserView';
import { submitInvoice, submitInvoiceSuccess, submitInvoiceFailure } from '../../actions/user';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitInvoice: (payload) => {
      dispatch(submitInvoice(payload)).then(function(response) {
        if (response.payload.status === 200) {
          dispatch(submitInvoiceSuccess(response.payload.data));
        }
      }).catch(function(err) {
        dispatch(submitInvoiceFailure(err));
      })
    },

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
