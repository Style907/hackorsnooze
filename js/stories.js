"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class ="favorite">fav</span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// allows logged in user to add a new story
async function addNewStory(evt){
  evt.preventDefault()
  console.debug(addNewStory, evt);

  const title = $('#story-title').val()
  const author = $('#story-author').val()
  const url = $('#story-url').val()

  let newStory = await storyList.addStory(currentUser,{title, author, url})
  $newStoryForm.trigger("reset")
  location.reload()
}

$newStoryForm.on('submit', addNewStory)

// adds favorite stories to favorites page

function putFavStoriesOnPage(){
  $favStoriesList.empty()
  for(let story of currentUser.favorites){
  
  const hostName = story.getHostName()
  $favStoriesList.append(
    $(`
      <li id="${story.storyId}">
      <span class ="delete">delete</span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `)
    );
  }
}
// evt handler for clicking on story to favorite
$allStoriesList.on('click', '.favorite', async function(evt){
  let id = this.parentNode.id; await User.addFavStory(id)})

  // evt handler for clicking to delete story

  $favStoriesList.on('click', '.delete', async function(evt){
    let id = this.parentNode.id; await User.removeStory(id)})