/** @jsx React.DOM */
var AppMixins = require('./mixins');

module.exports = React.createClass({
  mixins: [AppMixins],

  getInitialState: function() {
    return {showDropdown: this.props.showDropdown};
  },

  componentWillReceiveProps: function() {
    this.setState({showDropdown: this.props.showDropdown});
  },

  minimize: function(e) {
    e.preventDefault();
    this.props.onHeaderAction({type: 'minimize'});
  },

  expand: function(e) {
    e.preventDefault();
    this.props.onHeaderAction({type: 'expand'});
  },

  collapse: function(e) {
    e.preventDefault();
    this.props.onHeaderAction({type: 'collapse'});
  },

  logout: function(e) {
    e.preventDefault();
    this.props.onHeaderAction({type: 'logout'});
  },

  toggle: function(e) {
    e.preventDefault();
    this.setState({showDropdown: !this.state.showDropdown})
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var field = this.refs.url.getDOMNode();
    var url = field.value.trim();

    if(url) {
      this.props.onHeaderAction({
        type: 'url',
        url: url
      });

      field.blur();
    }
  },

  render: function() {
    pclass = this.prefixClass;

    return (
      <div className="forge-stealth-header">
        <div className={pclass('logo')}>
          <h1>V</h1>
        </div>

        {function(){
          if(this.props.url) {
            return (
              <form className="forge-stealth-header-extras" onSubmit={this.handleSubmit}>
                <input type="text" defaultValue={this.props.url} ref="url" />

                <div className={pclass('dropdown')} onClick={this.toggle}>
                  <a href="#" className={pclass('dropdown-link')}></a>

                  {function(){
                    if(this.state.showDropdown) {
                      return (
                        <ul className={pclass('dropdown-list')}>
                          <li><a onClick={this.minimize}>Minimize</a></li>
                          <li><a onClick={this.expandAll}>Expand All</a></li>
                          <li><a onClick={this.collapseAll}>Collapse All</a></li>
                          <li><a onClick={this.logout}>Logout</a></li>
                        </ul>
                      )
                    }
                  }.bind(this)()}
                </div>
              </form>
            )
          }
          else {
            //show alt here
          }
        }.bind(this)()}
      </div>
    )
  }
});