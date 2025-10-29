
<!--#echo json="package.json" key="name" underline="=" -->
find-up-package-json-cjs
========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
A CommonJS module to find the closest `package.json`, read it, and report its
content along with paths and goodies.
<!--/#echo -->


There are many modules that find the closest `package.json`,
but usually they only report one of the useful things you may want to know.
This one tries to give you all of the low-hanging fruit.



API
---

This module exports one function, which carries two methods:

### findUpPackageJson(from)

Like its `.sync` method (see below), but works asynchronously and returns
a promise for the report.


### findUpPackageJson.sync(from)

If `from` is false-y, start searching at the current working directory.
Otherwise, it should be a local directory path, as a string, where to start.

Throws an Error if no `package.json` is found, or it cannot be read.

Returns a report object with these keys:

* `fullPath`: The full path to `package.json`.
* `dirPath`: The full path to the directory where `package.json` was found.
* `text()`: A getter for the text of the `package.json`,
  assuming UTF-8 encoding.
* `parse()`: A getter for the revived (JSON-parsed) data from `text`,
  or `false` in case of a parsing error.
  Choosing `false` over `undefined` is so you can always safely access
  top-level properties.
* `isEsModule`: Boolean, whether the project seems to be an ES module.
* `resolve(relPath)`: A function that naively resolves `relPath` relative
  to `dirPath`, without any actual file system interaction,
  thus not checking for existence, symlinks, or anything the like.
* `mainPath`: The full path to the package's entrypoint.


### findUpPackageJson.report(fullPath, rawContent, from)

Given the `fullPath` to a `package.json` file, and its `rawContent`
as a string or Buffer, construct a report object and return it.
For better debugging, you may provide `from`, the initial search directory.






Usage
-----

:TODO:





Known issues
------------

* Needs more/better tests and docs.





<!--#toc stop="scan" -->

&nbsp;


License
-------
<!--#echo json="package.json" key="license" -->
ISC
<!--/#echo -->
