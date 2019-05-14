/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

const CounterSaga = ({ value, onIncrement, onDecrement, onIncrementAsync }) => {
  return (
    <div>
      <button onClick={onIncrementAsync}>Increment after 1 second</button>{" "}
      <button onClick={onIncrement}>Increment</button>{" "}
      <button onClick={onDecrement}>Decrement</button>
      <hr />
      <div>Clicked: {value} times</div>
    </div>
  );
};

const mapStateToProps = state => ({
  value: state.count
});

export default connect(mapStateToProps)(CounterSaga);
