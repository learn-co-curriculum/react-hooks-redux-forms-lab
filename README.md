# Set List Lab

## Objectives
1. Use forms to create new elements and update the store.
2. Display a list of the new elements in a separate component.

## Overview

Guess what - the bands are back! What we want is an application that allows us to add band names, and then have those band names instantly rendered below. We need to be incorporating Redux by dispatching actions and updating the store each time someone submits a new band.

So we will be creating two different React components each of them need to connect to our Redux store. One of the components will be a form where we input our band name, and the other component will display the list of bands.

The createStore method and some basic setup has already been implemented for you.

## Instructions

1. You will need to write the `BandInput` component. The component should have a form with a text input and submit button. We would like to update the *component's* state each time the user types a new character in the input. However, we only update the store's state when the user hits the submit button. 
  * Note: To have access to the store's dispatch method, we pass through the entire store as a prop.

2. You will need to write the `Bands` component. This component should display a ul with a list element for each of the bands in the store's state. Each list element should have text with the corresponding name of the band.

3. You will also need to fill in the `manageBand` reducer located under `./src/reducers/manageBand.js`. It will need to respond to an action of `type 'ADD_BAND'` and correspondingly concatenate a new band each time the action is dispatched.
