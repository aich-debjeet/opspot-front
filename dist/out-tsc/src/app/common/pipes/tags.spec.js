"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tags_1 = require("./tags");
describe('TagPipe', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [tags_1.TagsPipe],
        });
    });
    it('should transform when # in the middle ', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring#name';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="/newsfeed/tag/name;ref=hashtag');
    });
    it('should transform when # preceded by space ', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring #name';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="/newsfeed/tag/name;ref=hashtag');
    });
    it('should transform when # preceded by [] ', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring [#name';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="/newsfeed/tag/name;ref=hashtag');
    });
    it('should transform when # preceded by () ', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring (#name)';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="/newsfeed/tag/name;ref=hashtag');
    });
    it('should correctly parse when duplicates substrings present', function () {
        var pipe = new tags_1.TagsPipe();
        var string = '#hash #hashlonger';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="/newsfeed/tag/hash;ref=hashtag');
        expect(transformedString).toContain('<a href="/newsfeed/tag/hashlonger;ref=hashtag');
    });
    it('should transform when @ preceded by () ', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring (@name';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a class="tag"');
    });
    it('should transform when @ preceded by [] ', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring [@name';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a class="tag"');
    });
    it('should transform when @ preceded by space', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring @name';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a class="tag"');
    });
    it('should transform to an email', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring@name.com';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="mailto:textstring@name.com"');
    });
    it('should not transform when @ not present', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring name';
        var transformedString = pipe.transform(string);
        expect(transformedString).toEqual(string);
        expect(transformedString).not.toContain('<a class="tag"');
    });
    it('should transform url http', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring http://ops.doesntexist.com/';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="http://ops.doesntexist.com/');
    });
    it('should transform url with https', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring https://ops.doesntexist.com/';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="https://ops.doesntexist.com/');
    });
    it('should transform url with ftp', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring ftp://ops.doesntexist.com/';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="ftp://ops.doesntexist.com/');
    });
    it('should transform url with file', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'textstring file://ops.doesntexist.com/';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="file://ops.doesntexist.com/');
    });
    it('should transform url with a hashtag', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'text http://ops.doesntexist.com/#position';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('text <a href="http://ops.doesntexist.com/#position"');
    });
    it('should transform url with a hashtag and @', function () {
        var pipe = new tags_1.TagsPipe();
        var string = 'text http://ops.doesntexist.com/#position@some';
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('text <a href="http://ops.doesntexist.com/#position@some"');
    });
    it('should transform many tags', function () {
        var pipe = new tags_1.TagsPipe();
        var string = "text http://ops.doesntexist.com/#position@some @name\n    @name1 #hash1#hash2 #hash3 ftp://s.com name@mail.com\n    ";
        var transformedString = pipe.transform(string);
        expect(transformedString).toContain('<a href="http://ops.doesntexist.com/#position@some"');
        expect(transformedString).toContain('<a class="tag" href="/name"');
        expect(transformedString).toContain('<a class="tag" href="/name1"');
        expect(transformedString).toContain('<a href="/newsfeed/tag/hash1;ref=hashtag');
        expect(transformedString).toContain('<a href="/newsfeed/tag/hash2;ref=hashtag');
        expect(transformedString).toContain('<a href="/newsfeed/tag/hash3;ref=hashtag');
        expect(transformedString).toContain('<a href="ftp://s.com"');
        expect(transformedString).toContain('<a href="mailto:name@mail.com"');
    });
});
//# sourceMappingURL=tags.spec.js.map