import React from "react";
import Title from "./Header/Title";

export default class Header extends React.Component {
  handleChange(e) {
    console.log(e);
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  render() {
    return (
      <header>
        <Title title={this.props.title} />
        {/* 変更されたらthis.handleChangeが発火, 現在のpropsで新たな関数生成している */}
        <input value={this.props.title} onChange={this.handleChange.bind(this)}></input>
      </header>
    );
  }
}