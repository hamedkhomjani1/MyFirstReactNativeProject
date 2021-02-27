import React, { useState } from 'react';
import { Alert, FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, } from 'react-native';
import AddTodo from './components/addTodo';
import Header from './components/header';
import SandBox from './components/sandBox';
import TodoItem from './components/todoItem';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'Watch series', key: '1' },
    { text: 'Create an app', key: '2' },
    { text: 'Practice sketch', key: '3' },
    { text: 'Play some game', key: '4' }
  ])

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    })
  }

  const submitHandler = (text) => {

    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ];
      });
    } else[
      Alert.alert('Ooops!', 'Todos must be over 3 chars long', [
        { text: 'Got it', onPress: () => console.log('alert closed') }
      ])
    ]
  }

  return (
    // <SandBox  />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 40,
    flex: 1,
  },

  list: {
    marginTop: 20,
    flex: 1,
  }
});
