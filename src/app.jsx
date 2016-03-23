var Wilddog = require('wilddog');
var WildReactMixin = require('wildreact');
var React = require('react');
var ReactDOM = require('react-dom');



var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  mixins: [WildReactMixin],
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
  e.preventDefault();
  this.wilddogRef.push({
    text: this.state.text
  });
  this.setState({text: ""});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  },
  componentWillMount: function() {
  this.wilddogRef = new Wilddog("https://test123.wilddogio.com/items");
  this.bindAsArray(this.wilddogRef, "items");
}
});

ReactDOM.render(<TodoApp />, document.getElementById('hello'));