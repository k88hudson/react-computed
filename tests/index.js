import assert from 'assert';
import Computed from '../src/computed';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe('Compute', function () {

  it('should only recalculate when changes detected in relevant props', function () {
    let computeCount = 0;

    const Test = React.createClass({
      mixins: [Computed],
      getComputed: {
        upperFoo: {
          props: ['foo'],
          get: function (props) {
            computeCount++;
            return props.foo && props.foo.toUpperCase();
          }
        }
      },
      render() {
        return (<div />);
      }
    });

    const Wrapper = React.createClass({
      getInitialState: function () {
        return {};
      },
      render() {
        return (<Test ref="test" foo={this.state.foo} bar={this.state.bar} />);
      }
    });

    const t = TestUtils.renderIntoDocument(<Wrapper/>);

    assert.equal(t.refs.test.computed.upperFoo, undefined);
    assert.equal(computeCount, 1);
    t.setState({foo: 'foo'});
    assert.equal(t.refs.test.computed.upperFoo, 'FOO');
    assert.equal(computeCount, 2);
    t.setState({bar: 'foo'});
    t.setState({bar: 'asdasdas'});
    t.setState({bar: 'BLAH'});
    t.setState({bar: 'foo'});
    t.setState({bar: 'asdasdas'});
    t.setState({bar: 'BLAH'});
    t.setState({bar: 'foo'});
    t.setState({bar: 'asdasdas'});
    t.setState({bar: 'BLAH'});
    t.setState({bar: 'foo'});
    t.setState({bar: 'asdasdas'});
    t.setState({bar: 'BLAH'});
    t.setState({bar: 'foo'});
    t.setState({bar: 'asdasdas'});
    t.setState({bar: 'BLAH'});
    assert.equal(t.refs.test.computed.upperFoo, 'FOO');
    assert.equal(computeCount, 2);
  });
});

