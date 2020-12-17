import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { useTransition, animated } from 'react-spring';

import './styles.css';

const TodoContainer = styled(animated.div)`
  padding: 5px;
  background: lightgrey;
  width: 90%;
  border-radius: 0.25em;
  margin: 5px;

  button {
    width: 30px;
    height: 20px;
    border: 0;
    border-radius: 1em;
    margin-left: 1em;
  }
`;
// item
const Todo = ({ todo, onDeleteClick, transition }) => {
  return (
    <TodoContainer style={transition}>
      <span>{todo}</span>
      <button onClick={onDeleteClick}>X</button>
    </TodoContainer>
  );
};

//list
const App = () => {
  const [todos, setTodos] = useState(['Do this', 'Do that']);

  const addTodo = todo => {
    setTodos([...todos, todo]);
    ref.current.value = '';
  };

  const deleteTodo = idx => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  const ref = useRef();
  const transition = useTransition(todos, s => s, {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(10px)' }
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input type="text" ref={ref} />
      <input type="submit" onClick={() => addTodo(ref.current.value)} />
      {/*  */}
      {transition.map(
        ({ item, props, key }, i) =>
          item && (
            <Todo
              transition={props}
              todo={item}
              onDeleteClick={() => deleteTodo(i)}
              key={key}
            />
          )
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
