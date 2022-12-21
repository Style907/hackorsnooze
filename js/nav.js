"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navNewStory.show();
  $navFavStories.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


// brings up the page for a user to submit their story
function navSubmitClick(evt){
  console.debug("navSubmitClick")
  hidePageComponents();
  $newStoryForm.show()
}

$navNewStory.on("click", navSubmitClick);

// hides all stories and shows only user favorite stories
function showFavoriteStories(evt){
  console.debug("showFavoriteStories");
  hidePageComponents();
  $favStoriesList.show();
}

$navFavStories.on("click", showFavoriteStories);
