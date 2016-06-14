/*****************************************************************************************************************
 *    Attributes for header, enables sorting
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-sort')
@inject(Element, VGrid)
export class vGridAttributesSort {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }



  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //get values
    let values = this.value.split("|");
    this.attribute = values[0];

  }


  attached() {
    this.sortIcon = document.createElement("SPAN");
    this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    this.element.appendChild(this.sortIcon);
    this.element.onclick = (e)=> {
      this.vGrid.vGridConfig.onOrderBy(this.attribute, e.shiftKey);
    };

    this.vGrid.element.addEventListener("sortIconUpdate", (e)=> {
      this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    })
  }


  getSortIconMarkup(attribute) {
    var css = this.vGrid.vGridConfig.css;

    var markup = `<span  class="${css.sortIcon} ${css.sortIconSort}"></span>`;
    var isAscHtml = `<span  class="${css.sortIcon} ${css.sortIconAsc}"></span>`;
    var isDescHtml = `<span  class="${css.sortIcon} ${css.sortIconDesc}"></span>`;


    this.vGrid.vGridSort.getFilter().forEach((x) => {
      if (x.attribute === this.attribute) {
        var block = x.asc === true ? isAscHtml : isDescHtml;
        var main = `<span $ class="${css.sortIconNo}" data-vgridsort="${x.no}"></span>`;
        markup = main + block;
      }
    });

    return markup;
  };


}
