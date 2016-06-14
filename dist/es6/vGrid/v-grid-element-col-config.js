/*****************************************************************************************************************
 *    VGridCol
 *    This is just for getting the params for v-grid-col to create the grid
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, noView, customElement, bindable, processContent, TargetInstruction} from 'aurelia-framework';
import {VGrid} from './v-grid';

@noView()
@processContent((compiler, resources, element, instruction) => {

  var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    instruction.colHeaderTemplate = headerTemplateHtml;
  }

  var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    instruction.colRowTemplate = rowTemplateHtml;
  }

  element.innerHTML = '';

  //we want to get this css attribute and use if later
  var css = element.getAttribute("col-css");
  if (css) {
    instruction.colCss = css;
  }


})
@customElement('v-grid-col')
@inject(Element, VGrid, TargetInstruction)
export class VGridElementColConfig {
  @bindable({attribute: "col-width"}) colWidth;
  @bindable({attribute: "col-field"}) colField;
  @bindable({attribute: "col-header-name"}) colHeaderName;
  @bindable({attribute: "col-sort"}) colSort;
  @bindable({attribute: "col-filter"}) colFilter;
  @bindable({attribute: "col-filter-top"}) colFilterTop;
  @bindable({attribute: "col-add-label-attributes"}) colAddLabelAttributes;
  @bindable({attribute: "col-add-filter-attributes"}) colAddFilterAttributes;
  @bindable({attribute: "col-add-row-attributes"}) colAddRowAttributes;
  @bindable({attribute: "col-type"}) colType;



  constructor(element, vGrid, targetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
    this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
    this.colCss = targetInstruction.elementInstruction.colCss;
  }


  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.columnLength++; //count columns

    this.vGrid.vGridConfig.colConfig.push({
      colWidth: this.colWidth || 100,
      colRowTemplate: this.colRowTemplate,
      colHeaderTemplate: this.colHeaderTemplate,
      colField: this.colField,
      colHeaderName: this.colHeaderName,
      colAddLabelAttributes: this.colAddLabelAttributes,
      colAddFilterAttributes: this.colAddFilterAttributes,
      colAddRowAttributes: this.colAddRowAttributes,
      colSort: this.colSort,
      colFilter: this.colFilter,
      colFilterTop: this.colFilterTop === "true" ? true : false,
      colCss: this.colCss,
      colType: this.colType || "text"
    });


  }


}
