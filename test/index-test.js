import { expect } from 'chai';
import React from 'react'
import { shallow, mount } from 'enzyme'
import BandInput from '../src/components/BandInput'
import sinon from 'sinon'
import { renderer } from '../src/index'
import createStore from '../src/createStore'
import manageBand from '../src/reducers/manageBand'
import { App } from '../src/App'
import Bands from '../src/components/Bands'

describe('BandInput component', () => {
  it('has an text input field', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.find('input').first().type()).to.equal('input');
  });

  it('has an initial state with text key set to empty string', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.state('text')).to.equal('')
  });

  it('has changes the state on a keydown', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.state('text')).to.equal('')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(wrapper.state('text')).to.equal('Hello')
  })
});

describe('Redux', () => {

  it('dispatches an action on submitting the form', () => {
    const store = createStore(manageBand)
    sinon.stub(store, "dispatch");
    const wrapper = shallow(<BandInput store={store} />)
    let input = wrapper.find('input').first()
    let form = wrapper.find('form')
    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })
    // need an expect
    store.dispatch.restore();
  });

  it('updates the state of the store after submitting the form', () => {
    const store = createStore(manageBand)
    const wrapper = shallow(<BandInput store={store}/>)
    sinon.stub(renderer, "render");
    let form = wrapper.find('form')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })
    expect(store.getState().bands[0]).to.equal('Hello')
  });
})

describe('Bands Component', () => {
  it('is a child of the app component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Bands)).to.have.length(1);
  });

  it('renders a list element for each of the bands', () => {
      const store = createStore(manageBand)
      sinon.stub(store, 'getState').returns({bands: ['hello', 'goodbye', 'ciao']});
      const wrapper = shallow(<Bands store={store}/>)
      expect(wrapper.find('li')).to.have.length(3);
  });

  it('renders each li with the correct name', () => {
      const store = createStore(manageBand)
      sinon.stub(store, 'getState').returns({bands: ['hello', 'goodbye', 'ciao']});
      const wrapper = shallow(<Bands store={store}/>)
      expect(wrapper.text()).to.contain('hello');
      expect(wrapper.text()).to.contain('goodbye');
      expect(wrapper.text()).to.contain('ciao');
  });
})
