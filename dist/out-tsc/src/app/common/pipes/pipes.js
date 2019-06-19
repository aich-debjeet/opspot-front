"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var abbr_1 = require("./abbr");
var domain_1 = require("./domain");
var tags_1 = require("./tags");
var sanitize_1 = require("./sanitize");
var safe_1 = require("./safe");
var listable_1 = require("./listable");
var excerpt_1 = require("./excerpt");
var token_pipe_1 = require("./token.pipe");
var utcdate_1 = require("./utcdate");
var address_excerpt_1 = require("./address-excerpt");
var timediff_pipe_1 = require("./timediff.pipe");
var friendlydatediff_1 = require("./friendlydatediff");
exports.OPSPOT_PIPES = [abbr_1.AbbrPipe, domain_1.DomainPipe, tags_1.TagsPipe, sanitize_1.SanitizePipe, safe_1.SafePipe, listable_1.ListablePipe, excerpt_1.ExcerptPipe, token_pipe_1.TokenPipe, utcdate_1.UtcDatePipe, address_excerpt_1.AddressExcerptPipe, timediff_pipe_1.TimediffPipe, friendlydatediff_1.FriendlyDateDiffPipe];
//# sourceMappingURL=pipes.js.map