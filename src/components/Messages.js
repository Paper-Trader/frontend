import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';


const Messages = props => {
  const errorToast = () => toast(props.error ,{
    className: css({
      background: '#DC4A7F'
    }),
    bodyClassName: css({
      fontSize: '1rem',
      color: 'white'
    }),
    progressClassName: css({
      background: "#ffb7b7"
    })
  });

  const successToast = () => toast(props.success ,{
    className: css({
      background: '#00D1C5'
    }),
    bodyClassName: css({
      fontSize: '1rem',
      color: 'white'
    }),
    progressClassName: css({
      background: "white"
    })
  });

  if (props.error) errorToast();
  if (props.success) successToast()

  return <ToastContainer autoClose={3000} />;
}

const mapStateToProps = state => ({
  error: state.error,
  success: state.success,
})

export default connect(mapStateToProps, {})(Messages)