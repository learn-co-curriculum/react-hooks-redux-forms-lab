import { expect } from 'chai';
import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import BandInput from '../src/components/BandInput'
import BandsContainer from '../src/containers/BandsContainer'
import sinon from 'sinon'
import { renderer } from '../src/index'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import manageBand from '../src/reducers/manageBand'
import App from '../src/App'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('BandInput component', () => {
  it('has an text input field', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.find('input').first().type()).to.equal('input');
  });

  it('has an initial state with text key set to empty string', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.state(), "BandInput state was not found").to.exist
    expect(wrapper.state('name')).to.equal('')
  });

  it('changes the local state on input change', () => {
    const wrapper = shallow(<BandInput />)
    expect(wrapper.state('name'), "BandInput should mount with this.state.text equal to ''").to.equal('')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { name: 'name', value: 'Hello' } })
    expect(wrapper.state('name'), "BandInput state did not contain the correct value").to.equal('Hello')
  })

  it('has a prop, addBand, that is called when the form is submitted', () => {
    let test = 0
    function addBand() {
      test = 1
    }

    const wrapper = shallow(<BandInput addBand={addBand}/>)
    let input = wrapper.find('input').first()
    let form = wrapper.find('form')
    expect(test).to.eql(0)
    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })
    expect(test).to.eql(1)
  })

  it('using addBand, calls dispatch when form is submitted', () => {
    const store = createStore(manageBand)

    let spy = sinon.spy(store, "dispatch")

    const wrapper = mount(<Provider store={store}><App /></Provider>)

    expect(wrapper.find('input').length > 0, "No input elements found in the application").to.equal(true)
    let input = wrapper.find('input').first()
    let form = wrapper.find('form')

    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })

    expect(spy.calledOnce).to.equal(true);

  });
});

describe('Redux', () => {

  it('updates the store when a form is submitted', () => {
    const store = createStore(manageBand)

    let spy = sinon.spy(store, "dispatch")

    const wrapper = mount(<Provider store={store}><App /></Provider>)

    expect(wrapper.find('input').length > 0, "No input elements found in the application").to.equal(true)
    let input = wrapper.find('input').first()
    let form = wrapper.find('form')

    expect(store.getState().bands, "'bands' not found in the store").to.exist
    expect(store.getState().bands, "Initial state of 'bands' should be an empty array").to.be.empty

    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })

    expect(store.getState().bands[0].name).to.equal("Hello")

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

    expect(wrapper.find('input').length > 0, "No input elements found in the application").to.equal(true)
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
      sinon.stub(store, 'getState').returns({bands: [{ name: 'The Black Keys' }, { name: 'The White Stripes' }, { name: 'Black Moth Super Rainbow' }]});
      const wrapper = mount(<Provider store={store}><App /></Provider>)
      expect(wrapper.text()).to.contain('The Black Keys');
      expect(wrapper.text()).to.contain('The White Stripes');
      expect(wrapper.text()).to.contain('Black Moth Super Rainbow');
  });
})
