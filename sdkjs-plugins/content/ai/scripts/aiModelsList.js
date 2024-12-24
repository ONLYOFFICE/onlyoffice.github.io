var aiModelsList = {
	_listEl: document.getElementById('ai-models-list'),
	_list: [],
	_selected: null,

	_render: function() {
		var me = this;
		this._listEl.innerHTML = '';
		this._list.forEach(function(model, index) {
			var createdEl = document.createElement('div');
			createdEl.classList.add('item');
			if(me._selected && me._selected.id == model.id) {
				createdEl.classList.add('selected');
			}
			createdEl.innerText = model.name;
			createdEl.addEventListener('click', function() {
				me.setSelected(index);
			});
			me._listEl.appendChild(createdEl);
		});
	},

	set: function(list) {
		this._list = list;
		this._render();
		if(list.length > 0) {
			this.setSelected(0);
		} else {
			this.deselect();
		}
		scrollbarList.update();
		scrollbarList.update();
	},
	add: function(model) {
		this._list.push(model);
		this._render();
		this.setSelected(this._list.length - 1);

		var aiModelsListEl = document.getElementById('ai-models-list');
		aiModelsListEl.scrollTop = aiModelsListEl.scrollHeight;
		scrollbarList.update();
		scrollbarList.update();
	},
	edit: function(model) {
		var findedItem = this._list.filter(function(el) {
			return el.id == model.id;
		})[0];

		if(!findedItem) return;

		for (var key in model) {
			if (findedItem[key]) {
				findedItem[key] = model[key];
			}
		}
		this._render();
	},
	delete: function(item) {
		var indexDeletedItem = this._list.indexOf(item);
		if(indexDeletedItem != -1) {
			this._list = this._list.filter(function(el) {
				return el != item;
			});
			this._render();

			if(this._list.length == 0) {
				this.deselect();
			} else if(indexDeletedItem < this._list.length) {
				this.setSelected(indexDeletedItem);
			} else {
				this.setSelected(this._list.length - 1);
			}
		}
	},
	deleteByIndex: function(index) {
		if(!this._list[index]) return;

		this.delete(this._list[index]);
	},
	setSelected: function(index) {
		if(this._list.length == 0) return;
	
		if(index == -1) {
			index = this._list.length - 1; 
		}
		if(!this._list[index]) return;

		this.deselect();
		this._selected = this._list[index];
		this._listEl.children[index].classList.add('selected');

		editBtnEl.removeAttribute('disabled');
		deleteBtnEl.removeAttribute('disabled');
	},
	getSelected: function() {
		return this._selected;
	},
	deselect: function() {
		this._selected = null;

		var itemsEl = this._listEl.getElementsByClassName('item');
		for (var i = 0; i < itemsEl.length; i++) {
			itemsEl[i].classList.remove('selected');
		}

		editBtnEl.setAttribute('disabled', true);
		deleteBtnEl.setAttribute('disabled', true);
	}
};

var addBtnEl = document.getElementById('add-btn');
addBtnEl.addEventListener('click', function() {
	window.Asc.plugin.sendToPlugin("onOpenEditModal", {
		type: 'add'
	});
});

var editBtnEl = document.getElementById('edit-btn');
editBtnEl.addEventListener('click', function() {
	window.Asc.plugin.sendToPlugin("onOpenEditModal", {
		type: 'edit', 
		model: aiModelsList.getSelected()
	});
});

var deleteBtnEl = document.getElementById('delete-btn');
deleteBtnEl.addEventListener('click', function() {
	if(aiModelsList.getSelected()) {
		window.Asc.plugin.sendToPlugin("onDeleteAiModel", aiModelsList.getSelected());
		aiModelsList.delete(aiModelsList.getSelected());
	}
});

var scrollbarList = new PerfectScrollbar("#ai-models-list", {});

window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");
	window.Asc.plugin.attachEvent("onUpdateModels", function(list) {
		aiModelsList.set(list);
	});
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);
}
window.Asc.plugin.onThemeChanged = onThemeChanged;

window.Asc.plugin.onTranslate = function () {
	let elements = document.querySelectorAll('.i18n');
	elements.forEach(function(element) {
		element.innerText = window.Asc.plugin.tr(element.innerText);
	});
};

function onThemeChanged(theme) {
	window.Asc.plugin.onThemeChangedBase(theme);
	themeType = theme.type || 'light';
	
	var classes = document.body.className.split(' ');
	classes.forEach(function(className) {
		if (className.indexOf('theme-') != -1) {
			document.body.classList.remove(className);
		}
	});
	document.body.classList.add(theme.name);
	document.body.classList.add('theme-type-' + themeType);
}