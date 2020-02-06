export default function getEntityType(entity) {

  let postType;

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
  } else if (entity.entity_type === 'post' || entity.entity_type === 'album' || entity.entity_type === 'video'
    || entity.entity_type === 'video') {
    postType = 'post';
  } else if (entity.remind_object != false) {
    postType = 'repost';
  } else {
    if (entity.tags && entity.tags.length > 0) {
      for (var i = 0; i < entity['tags'].length; i++) {
        var specialHashtag = 'myjourney' + entity.ownerObj.username;
        if (specialHashtag == entity['tags'][i]) {
          postType = 'myjourney';
          break;
        }
      }
    } else {
      postType = 'portfolio';
    }
  }

  return postType;
}
