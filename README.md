![Archived](https://img.shields.io/badge/Current_Status-archived-blue?style=flat)

# linagora.esn.emoticon

Adds Emoticon support into the OpenPaaS Enterprise Social Network. This module is part of https://open-paas.org/.

## Usage: directive

The **esn-emoticon** directive replaces a text emoticon with an image.

```html
<esn-emoticon emoticon='smiley'></esn-emoticon>
```
will be transformed to:
```html
<img class="esn-emoticon-image" src="...emoticon path.../smiley.png" title='smiley'>
```

## usage: filter

the esnEmoticonify filter will transform the emoticon "tags", such as :smiley:, to image tags.

```html
<div ng-bind-html="message.text | esnEmoticonify:{class: 'emoji'}"></div>
```

This filter takes an argument (if present), that is the additional properties to put in the img tag.
