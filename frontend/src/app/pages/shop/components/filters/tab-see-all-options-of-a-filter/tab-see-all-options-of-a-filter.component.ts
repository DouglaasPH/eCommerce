import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, output } from "@angular/core";

@Component({
    selector: 'tab-see-all-options-of-a-filter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tab-see-all-options-of-a-filter.component.html',
    styleUrl: './tab-see-all-options-of-a-filter.component.scss'
})
export class TabSeeAllOptionsOfAFilter {
    @Input() filterOptions: string[] = [];
    @Input() filter: string[] = ['', ''];
    @Output() closeTab = new EventEmitter();
    @Output() onSelectOption = new EventEmitter<[string, string]>();

    onCloseTab() {
        this.closeTab.emit();
    }

    getHeight() {
        if (this.filter[0] !== 'sizes') {
            return (this.filterOptions.length - 3) + 'vw';
        } else {
            return (Math.ceil(this.filterOptions.length / 17) + 3) + 'vw';
        } 
    }

    selectOption(currentKey: string, currentOption: string) {
        this.onSelectOption.emit([currentKey, currentOption]);
        this.onCloseTab();
    }
}