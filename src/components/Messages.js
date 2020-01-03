import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';


const Messages = props => {
  const notify = () => toast(props.error ,{
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
  });

  const successToast = () => toast(props.success ,{
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
  });

  return (
    <div>
      {props.error && <p>{notify()}</p>}
      {props.success && <p>{successToast()}</p>}
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

const mapStateToProps = state => ({
  error: state.error,
  success: state.success,
})

export default connect(mapStateToProps, {})(Messages)