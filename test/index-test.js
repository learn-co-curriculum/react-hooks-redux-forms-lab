import { expect } from 'chai';
import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import BandInput from '../src/components/BandInput'
import BandsContainer from '../src/components/BandsContainer'
import sinon from 'sinon'
import { renderer } from '../src/index'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import manageBand from '../src/reducers/manageBand'
import App from '../src/App'
import Bands from '../src/components/Bands'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('BandInput component', () => {
  it('has an text input field', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.find('input').first().type()).to.equal('input');
  });

  it('has an initial state with text key set to empty string', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.state('text')).to.equal('')
  });

  it('changes the local state on a keydown', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.state('text')).to.equal('')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(wrapper.state('text')).to.equal('Hello')
  })

  it('calls `this.props.addBand` on submitting the form', () => {
    const store = createStore(manageBand)

    let spy = sinon.spy(store, "dispatch")

    const addBand = band => store.dispatch({ type: 'ADD_BAND', band })

    const wrapper = shallow(<BandInput addBand={addBand}/>)


    let input = wrapper.find('input').first()
    let form = wrapper.find('form')

    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })
    expect(spy.calledOnce).to.equal(true);

  });
});

describe('Redux', () => {

  it('dispatches an action, updating the store when a form is submitted', () => {
    const store = createStore(manageBand)

    let spy = sinon.spy(store, "dispatch")

    const wrapper = mount(<Provider store={store}><App /></Provider>)

    let input = wrapper.find('input').first()
    let form = wrapper.find('form')

    expect(store.getState().bands, "'bands' not found in the store").to.exist
    expect(store.getState().bands, "Initial state of 'bands' should be an empty array").to.be.empty

    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })

    expect(store.getState().bands[0]).to.equal("Hello")

  });


})

describe('Bands Container', () => {
  it('is a child of the app component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(BandsContainer)).to.have.length(1);
  });

  it('renders a list element for each of the bands in ', () => {
    const store = createStore(manageBand)

    let spy = sinon.spy(store, "dispatch")

    const wrapper = mount(<Provider store={store}><App /></Provider>)

    let input = wrapper.find('input').first()
    let form = wrapper.find('form')

    expect(store.getState().bands, "'bands' not found in the store").to.exist
    expect(store.getState().bands, "Initial state of 'bands' should be an empty array").to.be.empty

    input.simulate('change', { target: { value: 'Flight 909' } })
    form.simulate('submit',  { preventDefault() {} })
    input.simulate('change', { target: { value: 'Gwar' } })
    form.simulate('submit',  { preventDefault() {} })

    expect(store.getState().bands.length, "There are " + store.getState().bands.length + " bands in the store, but " + wrapper.find('li').length + "li elements").to.equal(wrapper.find('li').length)

  });

  it('renders each li with the correct name', () => {
      const store = createStore(manageBand)
      sinon.stub(store, 'getState').returns({bands: ['hello', 'goodbye', 'ciao']});
      const wrapper = mount(<Provider store={store}><App /></Provider>)
      expect(wrapper.text()).to.contain('hello');
      expect(wrapper.text()).to.contain('goodbye');
      expect(wrapper.text()).to.contain('ciao');
  });
})
