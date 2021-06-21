/*********************************************/
/*  USER STORY -> As a user, I want [action] so  that [benefit]
    
  MVC ARCHITECTURE
  -> structure - organization of code
  -> maintainability - can be easily changed
  -> expandability - to easily add new features

  COMPONENTS OF ARCHITECTURE
  -> Business logic - code that solves the business problem
  -> State - stores all the data about the application / single source of truth kept in sync with UI
  -> HTTP Library - responsible for making and receiving AJAX requests
  -> Application logic (Router) - implementation of the application
  -> Presentation logic (UI layer) - visible part of the application / displays application state

  MODEL
  -> Business logic / state / http library

  VIEW
  -> Presentation logic

  CONTROLLER
  -> application logic / bridge between view and model
  -> dispatches tasks to model and view

/*********************************************/
//import from model and view
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; //polyfill
import 'regenerator-runtime/runtime'; //polyfill async/await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //get ID from the hash
    const id = window.location.hash.slice(1);

    //guard clause if there is no ID from hash
    if (!id) return;

    //render spinner
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

//hash change event and load event listener
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('hashchange', controlRecipes);
