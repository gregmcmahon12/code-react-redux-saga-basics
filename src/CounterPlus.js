import React from "react";
import { connect } from "react-redux";
import { increment, decrement, reset } from "./actions";

const CounterPlusInternal = ({ count, decrement, increment, reset }) => {
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

function CounterPlus({ count, decrement, increment, reset }) {
  return (
    <CounterPlusInternal
      count={count}
      increment={increment}
      decrement={decrement}
      reset={reset}
    />
  );
}

const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  decrement: () => dispatch(decrement()),
  increment: () => dispatch(increment()),
  reset: () => dispatch(reset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPlus);
