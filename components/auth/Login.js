import React, { PureComponent } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

export class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    // this.onSignUp = this.onSignUp.bind(this);
  }
  /*
  onSignUp() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  <Button onPress={() => this.onSignUp()} title="Sign Up" />
  */

  render() {
    return (
      <View style={style.container}>
        <TextInput
          style={style.input}
          placeholder="이메일 주소"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={style.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button title="Sign Up" />
      </View>
    );
  }
}

const style = StyleSheet.create({
  input: {
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: "gray",
    borderWidth: 2,
    padding: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
