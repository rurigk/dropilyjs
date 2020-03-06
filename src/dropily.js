class Dropily
{
	constructor(selector)
	{
		if(typeof selector == 'string')
		{
			this.originalSelect = document.querySelector(selector);			
		}
		else
		{
			this.originalSelect = selector;
		}

		this.originalDisplay = this.originalSelect.style.display;

		this.selectBox = document.createElement('div');
		this.selectBox.classList.add('Dropily_SelectBox');

		this.selectTitle = document.createElement('button');
		this.selectTitle.classList.add('Dropily_SelectBox_Title');

		this.selectTitle.addEventListener('click', () => {
			this.Toggle();
		})

		this.optionsBox = document.createElement('div');
		this.optionsBox.classList.add('Dropily_SelectBox_Options');
		this.optionsBox.setAttribute('hidden', '');

		this.selectBox.appendChild(this.selectTitle);
		this.selectBox.appendChild(this.optionsBox);
		this.originalSelect.parentNode.insertBefore(this.selectBox, this.originalSelect);

		window.addEventListener('click', (e) => {
			if(e.target.closest('.Dropily_SelectBox') != this.selectBox)
			{
				this.Close();
			}
		})

		this.optionsElementsCache = [];

		this._HideOriginalSelect();
		this.Update(true);
	}

	_ShowOriginalSelect()
	{
		this.originalSelect.style.display = this.originalDisplay;
	}

	_HideOriginalSelect()
	{
		this.originalSelect.style.display = 'none';
	}

	_SetTitleText(text)
	{
		this.selectTitle.innerText = text;
	}

	_DispatchChangeEvent()
	{
		var event = new CustomEvent('change');
		this.originalSelect.dispatchEvent(event);
	}

	_GenerateOptions()
	{
		this._RemoveElementsCache();
		for (let i = 0; i < this.originalSelect.options.length; i++) {
			const element = this.originalSelect.options[i];
			if(element.tagName == 'OPTION')
			{
				var innerContent = element.innerHTML;
				var value = element.getAttribute('value');
				var selected = this.originalSelect.selectedIndex == i;
				var disabled = element.hasAttribute('disabled');
				var hidden = element.hasAttribute('hidden');

				var option = document.createElement('div');
				option.classList.add('Dropily_SelectBox_Option');
				if(disabled) option.setAttribute('disabled', '');
				if(hidden) option.setAttribute('hidden', '');
				if(selected) option.setAttribute('selected', '');

				option.setAttribute('data-index', i);
				option.setAttribute('data-value', value);

				option.innerHTML = innerContent;

				var optionOnClickHandler = () => {this.Select(i);}

				option.addEventListener('click', optionOnClickHandler)

				this.optionsElementsCache.push([option, optionOnClickHandler]);
				this.optionsBox.appendChild(option);
			}
		}
	}

	_RemoveElementsCache()
	{
		for(var i = this.optionsElementsCache.length - 1; i >= 0; i--)
		{
			this.optionsElementsCache[i][0].removeEventListener('click', this.optionsElementsCache[i][1]);
			this.optionsElementsCache[i][0].remove();
		}
	}

	_RemoveDropdown()
	{
		this.selectBox.remove();
	}

	Open()
	{
		if(this.optionsBox.hasAttribute('hidden')) this.optionsBox.removeAttribute('hidden');
	}

	Close()
	{
		if(!this.optionsBox.hasAttribute('hidden')) this.optionsBox.setAttribute('hidden', '');
	}

	Toggle()
	{
		if(this.optionsBox.hasAttribute('hidden'))
		{
			this.Open();
		}
		else
		{
			this.Close();
		}
	}

	Update(defaultSelection = false)
	{
		this._GenerateOptions();
		if(defaultSelection && this.originalSelect.length > 0)
		{
			this.Select(0, true);
		}
	}

	Select(index, withoutEvent = false)
	{
		this.originalSelect.selectedIndex = index;
		this.selectTitle.innerHTML = this.originalSelect.options[index].innerHTML;
		if(!withoutEvent)
		{
			var event = new CustomEvent('change');
			this.originalSelect.dispatchEvent(event);
		}
		this.Close();
		this.Update();
	}

	Remove()
	{
		this._RemoveElementsCache();
		this._RemoveDropdown();
		this._ShowOriginalSelect();
	}
}