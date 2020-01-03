import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';


const Messages = props => {
  if (props.error) {
    toast(props.error ,{
      toastId: 2,
      className: css({
        background: 'red'
      }),
      bodyClassName: css({
        fontSize: '1rem',
        color: 'white'
      }),
      progressClassName: css({
        background: "#ffb7b7"
      })
    })
  }

  if (props.success) {
    toast(props.success ,{
      toastId: 2,
      className: css({
        background: 'green'
      }),
      bodyClassName: css({
        fontSize: '1rem',
        color: 'white'
      }),
      progressClassName: css({
        background: "white"
      })
    })
  }

  return (
    <div>
      <ToastContainer 
        autoClose={3000}
        position="top-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}

const mapStateToProps = state => ({
  error: state.error,
  success: state.success,
})

export default connect(mapStateToProps, {})(Messages)