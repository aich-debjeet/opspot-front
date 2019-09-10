export default class FileHandler{
    static fileSelector(e, cb){
        let img;
        let element: any = e.target ? e.target : e.srcElement;
        let file=element ? element.files[0] : null;
        let reader = new FileReader();
        reader.readAsDataURL(file)
        return reader.onloadend = () => {
          cb(img = typeof reader.result ===  'string' ? reader.result : reader.result.toString());
    
        }
    }
   static dataURItoBlob(dataURI) {
        var startIndex = dataURI.indexOf("base64,") + 7;
        var b64 = dataURI.substr(startIndex);
        const byteString = window.atob(b64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpeg/png' });    
        return blob;
     }

    static base64ToImage(img){
        const date = new Date().valueOf();
        let text = '';
        const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
          text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
        }
        // Replace extension according to your media type
        const imageName = date + '.' + text + '.jpeg';
        // call method that creates a blob from dataUri
        const imageBlob = FileHandler.dataURItoBlob(img);
        const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
        return imageFile;
       }


}


