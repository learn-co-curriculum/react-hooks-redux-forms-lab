# Set List Lab

## Objectives

1. Use forms to create new elements and update the store.
2. Display a list of the new elements in a separate component.

## Overview

Guess what - the bands are back! What we want is an application that allows us
to add band names, and then have those band names instantly rendered below. We
need to be incorporating Redux by dispatching actions and updating the store
each time someone submits a new band.

So we will be creating two different React components, and each of them need to
connect to our Redux store. One of the components will be a form where we input
our band name, and the other component will display the list of bands.

The createStore method and some basic setup has already been implemented for you.

## Instructions

1. You will need to write the `BandsContainer` component. This component should
act as your connection to the Redux store and should be a child of the App
component.

2. You will need to write the `BandInput` component as a child of
`BandsContainer`. The component should have a form with a text input and submit
button. We would like to update the *component's* state each time the user types
a new character in the input. However, we only update the __Redux__ store's
state when the user hits the submit button.

3. You will also need to fill in the `manageBand` reducer located under
`./src/reducers/manageBand.js`. It will need to respond to an action of `type
'ADD_BAND'` and correspondingly concatenate a new band each time the action is
dispatched.

4. Once you've got a form successfully dispatching actions and adding bands to
your __Redux__ store, write the necessary code to display each band name from
the store. Band names should be listed in individual `li` elements.
