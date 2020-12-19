# Set List Lab

## Objectives

1. Use forms to create new elements and update the store.
2. Display a list of the new elements in a separate component.

## Overview

We want is an application that allows us to add band names, and then have those
band names instantly rendered below. We need to be incorporating Redux by
dispatching actions and updating the store each time someone submits a new band.

So we will be creating two different React components, and each of them need to
have access to our Redux store, either directly or through props. One of the
components will be a form where we input our band name, and the other component
will display the list of bands.

The basic Redux setup has already been implemented for you.

## Instructions

1. You will need to write the `BandsContainer` component. This component should
   act as your connection to the Redux store and should be a child of the App
   component. Any values we want to use from Redux as well as any actions we
   want to dispatch should be set up and available in `BandsContainer` so they
   can be passed down to other components.

2. You will need to write the `BandInput` component as a child of
   `BandsContainer`. This component should have a form with a text input and
   submit button. We would like to update this component's state each time the
   user types a new character in the input, stored as a state variable of
   `name`. We will only update the **Redux** store's state when the user hits
   the submit button. The dispatched action required to initiate this update
   should be set up in `BandsContainer` and passed down as the prop
   `onBandSubmit` to `BandInput`.

3. You will also need to fill in the reducer in the
   `./src/features/bands/bandsSlice.js` file. Make a method in that reducer
   called `bandsAdded` and export the action creator.

4. Once you've got a form successfully dispatching actions and adding bands to
   your **Redux** store, write the necessary code to display each band name from
   the store. Band names should be listed in individual `li` elements.
