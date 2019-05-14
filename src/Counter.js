import React from "react";
import { connect } from "react-redux";
import { increment, decrement, reset } from "./actions";

function Counter({ count, dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(reset())}>reset</button>
    </div>
  );
}

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(Counter);
