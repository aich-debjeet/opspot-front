export default function getViewPageLink(type, guid) {
    var navigationUrl = `${type}/view/${guid}`;
    // switch (type) {
    //     case (type === 'opportunity'): navigationUrl = `${type}/view/${guid}`
    //     console.log("navigationUrl: ", navigationUrl);

    //         break;

    //     case (type === 'item'): navigationUrl = `${type}/view/${guid}`
    //         break;

    //     case (type === 'event'): navigationUrl = `${type}/view/${guid}`
    //         break;

    // }
    // console.log("navigationUrl: ", navigationUrl);
    
    return navigationUrl;
}