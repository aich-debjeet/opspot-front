export default function getEntityType(entity) {

  let postType = 'post';

  if (entity.entity_type === 'opportunity') {
    postType = 'opportunity';
  } else if (entity.entity_type === 'event') {
    if (entity.end_time_date) {
      postType = 'bigevent';
    } else {
      postType = 'showtimez';
    }
  } else if (entity.entity_type === 'item') {
    postType = 'bluestore';
  } else if (entity.entity_type === 'blog') {
    postType = 'blog';
  } else if (entity.entity_type === 'talent') {
    postType = 'talent';
  } else if (entity.entity_type === 'post'
    || entity.entity_type === 'album'
    || entity.entity_type === 'video'
    || entity.entity_type === 'video'
  ) {
    if (entity.tags && entity.tags.length > 0) {
      for (var i = 0; i < entity['tags'].length; i++) {
        var isMyJourney = 'myjourney' + entity.ownerObj.username;
        var isPortfolio = 'portfolio' + entity.ownerObj.username;
        if (isMyJourney == entity['tags'][i]) {
          postType = 'myjourney';
          // console.log('myjourney');
          break;
        } else if (isPortfolio == entity['tags'][i]) {
          postType = 'portfolio';
          // console.log('portfolio');
          break;
        }
      }
    }
  } else if (entity.remind_object != false) {
    postType = 'repost';
  }

  return postType;
}
