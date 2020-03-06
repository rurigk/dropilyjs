## Dropily.js

VainillaJS Dropdown
Replace the html select  with a customizable dropdown

Customizable css theme with css vars
Supports hidden and disabled attributes in the options
optgroups is not supported yet

#### Usage

```javascript

// With CSS Selector
var dropdown = new Dropily('.cssSelector');

//With element reference
var select = document.querySelector('.cssSelector');
var dropdown = new Dropily(select);

// Change event is triggered in the original <select> element
select.addEventListener('change', () => {
	console.log(select.value);
})
```

#### Update the options

This is useful when you modify the options in the original select or when the selectedIndex is changed by code

```javascript
var select = document.querySelector('.cssSelector');
var dropdown = new Dropily(select);
// Add or remove options in the original <select> here ...
dropdown.Update();
```

#### Select a option

```javascript
var select = document.querySelector('.cssSelector');
var dropdown = new Dropily(select);
// Select the first option
dropdown.Select(0);
```

#### Open or close the dropdown

```javascript
// Open the dropdown
dropdown.Open();
// Close the dropdown
dropdown.Close();
// Toggle the state of the dropdown
dropdown.Toggle();
```

#### Remove the custom dropdown and restore the original select

```javascript
dropdown.Remove();
```

## For build

### Build lib

```console
$ yarn install ## or npm
$ yarn build
```

### Build example

```console
$ yarn install ## or npm
$ yarn build:example
```

## Authors

<table>
  <tr>
    <td align="center"><a href="https://github.com/rurigk"><img src="https://avatars3.githubusercontent.com/u/6665402?s=460&v=4" width="100px;" alt="Isaías Santana"/><br /><sub><b>rurigk</b></td>
 
   <td align="center"><a href="https://github.com/osirisfrik"><img src="https://avatars2.githubusercontent.com/u/9331532?s=400&v=4" width="100px;" alt="Will Filho"/><br /><sub><b>OsirisFrik</b></td>
  </tr>
</table>